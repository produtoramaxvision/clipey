/**
 * Builds the product screenshots of the site from the real 2x app captures, once per UI language: the preview card
 * of full editor captures is replaced by a neutral placeholder labelled in that language, then every shot is exported
 * as WebP at fixed widths plus a poster, and the recording bar as a transparent overlay. Same inputs, same bytes.
 *
 * Usage: SHOTS_SRC=<folder> npm run shots, where <folder>/<locale>/ holds the *@2x.png captures of that UI language
 * (pt-BR, en, es). Captures directly in <folder> are the English UI. A locale without captures is reported and skipped.
 */
import {
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	writeFileSync,
} from "node:fs";
import path from "node:path";
import encodeWebp from "@jsquash/webp/encode.js";
import { PNG } from "pngjs";
import { ensureWebp } from "../blog-images/common.mjs";
import {
	HUD,
	LOCALE_BUDGET,
	LOCALES,
	labelFile,
	localeCaptures,
	OUT_DIR,
	PLACEHOLDER,
	POSTER_BUDGET,
	POSTER_QUALITIES,
	POSTER_WIDTH,
	QUALITY,
	ROOT_LOCALE,
	shotFileName,
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

const pngs = (folder) =>
	existsSync(folder)
		? readdirSync(folder).filter((file) => file.endsWith("@2x.png"))
		: [];

mkdirSync(OUT_DIR, { recursive: true });
await ensureWebp();
const previews = {};
const locales = {};
const skipped = [];

for (const locale of LOCALES) {
	const localeDir = path.join(source, locale);
	let folder = localeDir;
	let shots = localeCaptures(locale, pngs(localeDir));
	if (!shots && locale === ROOT_LOCALE) {
		folder = source;
		shots = localeCaptures(locale, pngs(source));
	}
	if (!shots) {
		skipped.push(locale);
		continue;
	}
	const label = readPng(labelFile(locale));
	const first = outputs.length;
	for (const shot of shots) {
		const image = readPng(path.join(folder, `${shot.name}@2x.png`));
		if (shot.preview)
			previews[`${shot.name}-${locale}`] = hidePreview(image, label);
		for (const width of WIDTHS) {
			const out = sized(image, width);
			save(
				shotFileName(shot.name, locale, width),
				await webp(out, QUALITY),
				out,
			);
		}
		const poster = sized(image, POSTER_WIDTH);
		let posterBytes = null;
		for (const quality of POSTER_QUALITIES) {
			posterBytes = await webp(poster, quality);
			if (posterBytes.length <= POSTER_BUDGET) break;
		}
		if (posterBytes.length > POSTER_BUDGET)
			throw new Error(
				`${shot.name} ${locale} poster is ${posterBytes.length} bytes`,
			);
		save(shotFileName(shot.name, locale, "poster"), posterBytes, poster);
	}

	const hud2x = readPng(path.join(folder, `${HUD}@2x.png`));
	if (!opaqueBounds(hud2x))
		throw new Error(`the ${locale} recording bar capture is empty`);
	const hud1x = sized(hud2x, Math.round(hud2x.width / 2));
	save(shotFileName(HUD, locale, "2x"), await webp(hud2x, QUALITY), hud2x);
	save(shotFileName(HUD, locale, "1x"), await webp(hud1x, QUALITY), hud1x);

	const total = outputs
		.slice(first)
		.reduce((sum, output) => sum + output.bytes, 0);
	if (total > LOCALE_BUDGET)
		throw new Error(
			`the ${locale} shots weigh ${total} bytes, over ${LOCALE_BUDGET}`,
		);
	locales[locale] = { total };
}

if (!Object.keys(locales).length) throw new Error(`no captures in ${source}`);

writeFileSync(
	path.join(OUT_DIR, "manifest.json"),
	`${JSON.stringify(
		{
			locales,
			previews,
			files: Object.fromEntries(
				outputs.map(({ file, width, height, bytes }) => [
					file,
					{ width, height, bytes },
				]),
			),
		},
		null,
		"\t",
	)}\n`,
);
for (const { file, width, height, bytes } of outputs)
	console.log(`${file}: ${width}x${height}, ${bytes} B`);
console.log(`preview rectangles: ${JSON.stringify(previews)}`);
console.log(`locales: ${JSON.stringify(locales)}`);
if (skipped.length)
	console.log(
		`not captured yet (pages fall back to ${ROOT_LOCALE}): ${skipped.join(", ")}`,
	);
