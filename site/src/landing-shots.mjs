import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { escapeHtml as esc } from "./blog/content.mjs";

const manifestFile = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"../public/shots/manifest.json",
);

/** Widths the screenshot pipeline writes as /shots/<name>-<width>.webp; narrow sources stop below the largest. */
export const SHOT_WIDTHS = [800, 1400, 2400];

export const readShotManifest = (file = manifestFile) =>
	JSON.parse(fs.readFileSync(file, "utf8"));

/**
 * The responsive set of one shot: `src` is the poster, `srcset` lists each distinct width once (a source narrower
 * than 2400 has the same file at 1400 and 2400), and width/height are the poster's, so the box is reserved.
 */
export function shotSet(manifest, name) {
	const poster = manifest.files[`${name}-poster.webp`];
	if (!poster) throw new Error(`the shot ${name} is missing from the manifest`);
	const seen = new Set();
	const srcset = [];
	for (const width of SHOT_WIDTHS) {
		const file = manifest.files[`${name}-${width}.webp`];
		if (!file || seen.has(file.width)) continue;
		seen.add(file.width);
		srcset.push(`/shots/${name}-${width}.webp ${file.width}w`);
	}
	return {
		src: `/shots/${name}-poster.webp`,
		srcset: srcset.join(", "),
		width: poster.width,
		height: poster.height,
	};
}

/**
 * An <img> for a shot. Below the fold it is lazy; the hero image passes `priority` and is fetched first.
 * `alt` is empty for a decorative copy of a picture already described nearby.
 */
export function shotImg(
	manifest,
	name,
	{ alt = "", sizes, className, priority = false },
) {
	const set = shotSet(manifest, name);
	const loading = priority
		? 'fetchpriority="high"'
		: 'loading="lazy" decoding="async"';
	return `<img${className ? ` class="${className}"` : ""} src="${set.src}" srcset="${set.srcset}" sizes="${sizes}" width="${set.width}" height="${set.height}" alt="${esc(alt)}" ${loading}>`;
}
