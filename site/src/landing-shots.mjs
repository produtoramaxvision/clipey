import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { escapeHtml as esc } from "./blog/content.mjs";

const manifestFile = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"../public/shots/manifest.json",
);

/** Widths the screenshot pipeline writes as /shots/<name>-<locale>-<width>.webp; narrow sources stop below the largest. */
export const SHOT_WIDTHS = [800, 1400, 2400];

/** The app starts in English, so English captures always exist; a page whose UI language is not captured uses them. */
export const SHOT_FALLBACK_LOCALE = "en";

/** The UI language a page's screenshots are shown in: its own when the pipeline produced it, English otherwise. */
export const shotLocale = (manifest, lang) =>
	manifest.locales?.[lang] ? lang : SHOT_FALLBACK_LOCALE;

export const readShotManifest = (file = manifestFile) =>
	JSON.parse(fs.readFileSync(file, "utf8"));

/**
 * The responsive set of one shot in a page's UI language: `src` is the poster, `small` the narrowest file (for
 * thumbnails), `srcset` lists each distinct width
 * once (a source narrower than 2400 has the same file at 1400 and 2400), and width/height are the poster's, so the
 * box is reserved.
 */
export function shotSet(manifest, name, lang) {
	const base = `${name}-${shotLocale(manifest, lang)}`;
	const poster = manifest.files[`${base}-poster.webp`];
	if (!poster) throw new Error(`the shot ${base} is missing from the manifest`);
	const seen = new Set();
	const srcset = [];
	for (const width of SHOT_WIDTHS) {
		const file = manifest.files[`${base}-${width}.webp`];
		if (!file || seen.has(file.width)) continue;
		seen.add(file.width);
		srcset.push(`/shots/${base}-${width}.webp ${file.width}w`);
	}
	return {
		src: `/shots/${base}-poster.webp`,
		small: `/shots/${base}-${SHOT_WIDTHS[0]}.webp`,
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
	{ lang, alt = "", sizes, className, priority = false },
) {
	const set = shotSet(manifest, name, lang);
	const loading = priority
		? 'fetchpriority="high"'
		: 'loading="lazy" decoding="async"';
	return `<img${className ? ` class="${className}"` : ""} src="${set.src}" srcset="${set.srcset}" sizes="${sizes}" width="${set.width}" height="${set.height}" alt="${esc(alt)}" ${loading}>`;
}

/** The shots of one page, all in its UI language: `set(name)` and `img(name, options)` with the language bound. */
export const pageShots = (manifest, lang) => ({
	set: (name) => shotSet(manifest, name, lang),
	img: (name, options) => shotImg(manifest, name, { ...options, lang }),
});
