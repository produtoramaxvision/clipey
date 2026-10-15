/**
 * Builds the product screenshots of the site from the real 2x app captures: the preview card of full editor captures is
 * replaced by a neutral placeholder, then every shot is exported as WebP at fixed widths plus a poster, and the
 * recording bar as a transparent overlay. Same inputs, same bytes.
 *
 * Usage: SHOTS_SRC=<folder with the *@2x.png captures> npm run shots
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import encodeWebp from "@jsquash/webp/encode.js";
import { PNG } from "pngjs";
import { ensureWebp } from "../blog-images/common.mjs";
import {
	HUD,
	LABEL_FILE,
	OUT_DIR,
	PLACEHOLDER,
	POSTER_BUDGET,
	POSTER_QUALITIES,
	POSTER_WIDTH,
	QUALITY,
	SHOTS,
	TOTAL_BUDGET,
	WIDTHS,
} from "./config.mjs";
import {
	CARD_RADIUS,
	composite,
	findPreviewRect,
	fitWidth,
	opaqueBounds,
	paintPlaceholder,
	resizeArea,
} from "./geometry.mjs";

const source = process.env.SHOTS_SRC;
if (!source || !existsSync(source))
	throw new Error("set SHOTS_SRC to the folder with the *@2x.png app captures");

function readPng(file) {
	const png = PNG.sync.read(readFileSync(file));
	return {
		width: png.width,
		height: png.height,
		data: new Uint8ClampedArray(png.data),
	};
}

async function webp(image, quality) {
	return Buffer.from(
		await encodeWebp(image, {
			quality,
			method: 6,
			alpha_quality: 100,
			use_sharp_yuv: 1,
		}),
	);
}

const outputs = [];

function save(file, bytes, image) {
	writeFileSync(path.join(OUT_DIR, file), bytes);
	outputs.push({
		file,
		width: image.width,
		height: image.height,
		bytes: bytes.length,
	});
}

function sized(image, target) {
	const size = fitWidth(image.width, image.height, target);
	return size.width === image.width
		? image
		: resizeArea(image, size.width, size.height);
}

/** Hides the recording: placeholder over the preview card and the label centred in it. */
function hidePreview(image, label) {
	const rect = findPreviewRect(image);
	paintPlaceholder(image, rect, { ...PLACEHOLDER, radius: CARD_RADIUS });
	composite(
		image,
		label,
		Math.round(rect.x + (rect.width - label.width) / 2),
		Math.round(rect.y + (rect.height - label.height) / 2),
	);
	return rect;
}

mkdirSync(OUT_DIR, { recursive: true });
await ensureWebp();
const label = readPng(LABEL_FILE);
const previews = {};

for (const shot of SHOTS) {
	const image = readPng(path.join(source, `${shot.name}@2x.png`));
	if (shot.preview) previews[shot.name] = hidePreview(image, label);
	for (const width of WIDTHS) {
		const out = sized(image, width);
		save(`${shot.name}-${width}.webp`, await webp(out, QUALITY), out);
	}
	const poster = sized(image, POSTER_WIDTH);
	let posterBytes = null;
	for (const quality of POSTER_QUALITIES) {
		posterBytes = await webp(poster, quality);
		if (posterBytes.length <= POSTER_BUDGET) break;
	}
	if (posterBytes.length > POSTER_BUDGET)
		throw new Error(`${shot.name} poster is ${posterBytes.length} bytes`);
	save(`${shot.name}-poster.webp`, posterBytes, poster);
}

const hud2x = readPng(path.join(source, `${HUD}@2x.png`));
if (!opaqueBounds(hud2x)) throw new Error("the recording bar capture is empty");
const hud1x = sized(hud2x, Math.round(hud2x.width / 2));
save(`${HUD}-2x.webp`, await webp(hud2x, QUALITY), hud2x);
save(`${HUD}-1x.webp`, await webp(hud1x, QUALITY), hud1x);

const total = outputs.reduce((sum, output) => sum + output.bytes, 0);
if (total > TOTAL_BUDGET)
	throw new Error(`the shots weigh ${total} bytes, over ${TOTAL_BUDGET}`);

writeFileSync(
	path.join(OUT_DIR, "manifest.json"),
	`${JSON.stringify(
		{
			previews,
			files: Object.fromEntries(
				outputs.map(({ file, width, height, bytes }) => [
					file,
					{ width, height, bytes },
				]),
			),
			total,
		},
		null,
		"\t",
	)}\n`,
);
for (const { file, width, height, bytes } of outputs)
	console.log(`${file}: ${width}x${height}, ${bytes} B`);
console.log(`preview rectangles: ${JSON.stringify(previews)}`);
console.log(`total: ${total} B`);
