/**
 * Builds the media of the v3 landing from the marketing captures: each still as responsive WebP per language (with
 * alpha kept for the recording bar), the editor tour video and its poster copied as they are, and
 * public/media/manifest.json with the size of every file, which the page reads to reserve each box.
 *
 * Usage: MEDIA_SRC=<folder> node scripts/media/build-media.mjs [--only <name,...>], where <folder> holds mkt/<locale>/*.png, mkt2/ and tour4/ (see config.mjs).
 * With --only, only the named stills are encoded and the rest of public/media and the manifest are left unchanged.
 */
import {
	copyFileSync,
	existsSync,
	mkdirSync,
	readFileSync,
	statSync,
	writeFileSync,
} from "node:fs";
import path from "node:path";
import encodeWebp from "@jsquash/webp/encode.js";
import { PNG } from "pngjs";
import { ensureWebp } from "../blog-images/common.mjs";
import { fitWidth, resizeArea } from "../shots/geometry.mjs";
import { parseOnlyArg, selectStills, stripStillFromManifest } from "./build-args.mjs";
import {
	ALPHA_QUALITY,
	COPIES,
	LOCALES,
	OUT_DIR,
	QUALITY,
	STILLS,
	stillFileName,
	WIDTHS,
} from "./config.mjs";

const source = process.env.MEDIA_SRC;
if (!source || !existsSync(source))
	throw new Error("set MEDIA_SRC to the folder with the marketing captures");

const onlyNames = parseOnlyArg(process.argv);
const toBuild = selectStills(STILLS, onlyNames);

function readPng(file) {
	const png = PNG.sync.read(readFileSync(file));
	return {
		width: png.width,
		height: png.height,
		data: new Uint8ClampedArray(png.data),
	};
}

mkdirSync(OUT_DIR, { recursive: true });
await ensureWebp();

const manifestPath = path.join(OUT_DIR, "manifest.json");
let files = {};
let stills = {};

if (onlyNames) {
	if (!existsSync(manifestPath))
		throw new Error("manifest.json is missing; run a full build before --only");
	const existing = JSON.parse(readFileSync(manifestPath, "utf8"));
	files = { ...existing.files };
	stills = { ...existing.stills };
	for (const still of toBuild) {
		({ stills, files } = stripStillFromManifest({ stills, files }, still.name));
	}
}

const missing = [];

for (const still of toBuild) {
	stills[still.name] = [];
	for (const locale of LOCALES) {
		const file = path.join(source, still.source(locale));
		if (!existsSync(file)) {
			missing.push(`${still.name} ${locale}`);
			continue;
		}
		const image = readPng(file);
		const seen = new Set();
		for (const width of still.widths ?? WIDTHS) {
			const size = fitWidth(image.width, image.height, width);
			if (seen.has(size.width)) continue;
			seen.add(size.width);
			const out =
				size.width === image.width
					? image
					: resizeArea(image, size.width, size.height);
			const bytes = Buffer.from(
				await encodeWebp(out, {
					quality: QUALITY,
					method: 6,
					alpha_quality: ALPHA_QUALITY,
					use_sharp_yuv: 1,
				}),
			);
			// Named after the width actually written: a narrower source stops at its own width, never upscaled.
			const name = stillFileName(still.name, locale, out.width);
			writeFileSync(path.join(OUT_DIR, name), bytes);
			files[name] = {
				width: out.width,
				height: out.height,
				bytes: bytes.length,
			};
			console.log(`${name}: ${out.width}x${out.height}, ${bytes.length} B`);
		}
		stills[still.name].push(locale);
	}
}

if (!onlyNames) {
	for (const [from, to] of COPIES) {
		copyFileSync(path.join(source, from), path.join(OUT_DIR, to));
		files[to] = { bytes: statSync(path.join(OUT_DIR, to)).size };
		console.log(`${to}: copied, ${files[to].bytes} B`);
	}
}

writeFileSync(manifestPath, `${JSON.stringify({ stills, files }, null, "\t")}\n`);
if (missing.length)
	console.log(`not captured yet (pages fall back to pt-BR): ${missing.join(", ")}`);
