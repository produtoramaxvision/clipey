import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { escapeHtml as esc } from "./blog/content.mjs";

const manifestFile = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"../public/media/manifest.json",
);

/** Stills come in the page's language when captured; otherwise in pt-BR, the language the design was approved in. */
export const MEDIA_FALLBACK_LOCALE = "pt-BR";

export const readMediaManifest = (file = manifestFile) =>
	JSON.parse(fs.readFileSync(file, "utf8"));

/** The language a still is shown in on a page: its own when captured, pt-BR otherwise. */
export const stillLocale = (manifest, name, lang) => {
	const locales = manifest.stills?.[name];
	if (!locales?.length)
		throw new Error(`the still ${name} is missing from the manifest`);
	return locales.includes(lang) ? lang : MEDIA_FALLBACK_LOCALE;
};

/**
 * The responsive set of one still: every width the pipeline wrote, in the page's language (or the fallback), with the
 * largest file as `src` and its size as the reserved box.
 */
export function stillSet(manifest, name, lang) {
	const locale = stillLocale(manifest, name, lang);
	const prefix = `${name}-${locale}-`;
	const entries = Object.entries(manifest.files)
		.filter(([file]) => file.startsWith(prefix) && /-\d+\.webp$/.test(file))
		.sort(([, a], [, b]) => a.width - b.width);
	if (!entries.length) throw new Error(`the still ${prefix}* has no files`);
	const [largestFile, largest] = entries.at(-1);
	const mid = entries.find(([, file]) => file.width >= 1400) ?? entries.at(-1);
	return {
		locale,
		src: `/media/${largestFile}`,
		/** A mid-size file for places that take one URL, such as a video poster. */
		poster: `/media/${mid[0]}`,
		srcset: entries
			.map(([file, { width }]) => `/media/${file} ${width}w`)
			.join(", "),
		width: largest.width,
		height: largest.height,
	};
}

/** An <img> for a still. Every still of the landing is below the fold, so it is lazy unless `priority` is passed. */
export function stillImg(
	manifest,
	name,
	{ lang, alt = "", sizes, className, priority = false },
) {
	const set = stillSet(manifest, name, lang);
	const loading = priority
		? 'fetchpriority="high"'
		: 'loading="lazy" decoding="async"';
	return `<img${className ? ` class="${className}"` : ""} src="${set.src}" srcset="${set.srcset}" sizes="${sizes}" width="${set.width}" height="${set.height}" alt="${esc(alt)}" ${loading}>`;
}

/**
 * The video slots. Replacing a recording is a change to its entry here (and the files in public/media/). A slot with
 * no `sources` is not rendered at all (its figure returns with the first source); `poster` is a URL or `{ still }`, a
 * still resolved per language.
 * The editor tour is PROVISIONAL: a re-recorded take replaces these files.
 */
export const VIDEOS = {
	tour: {
		sources: Object.fromEntries(
			["pt-BR", "en", "es"].map((locale) => [
				locale,
				[
					[`/media/clipey-editor-tour-${locale}.mp4`, "video/mp4"],
					[`/media/clipey-editor-tour-${locale}.webm`, "video/webm"],
				],
			]),
		),
		poster: Object.fromEntries(
			["pt-BR", "en", "es"].map((locale) => [
				locale,
				`/media/clipey-editor-tour-${locale}-poster.jpg`,
			]),
		),
		width: 1600,
		height: 860,
	},
	// The captions recording has not been made yet, so its figure is not rendered; the poster waits for the sources.
	captions: {
		sources: [],
		poster: { still: "captions-poster" },
		width: 1600,
		height: 860,
	},
	// The Edit tab: one walkthrough per language of the app, so `sources` and `poster` are keyed by locale.
	editTab: {
		sources: Object.fromEntries(
			["pt-BR", "en", "es"].map((locale) => [
				locale,
				[
					[`/media/clipey-tab-edit-${locale}.mp4`, "video/mp4"],
					[`/media/clipey-tab-edit-${locale}.webm`, "video/webm"],
				],
			]),
		),
		poster: Object.fromEntries(
			["pt-BR", "en", "es"].map((locale) => [
				locale,
				`/media/clipey-tab-edit-${locale}-poster.jpg`,
			]),
		),
		width: 1440,
		height: 774,
	},
	// Games: gameplay recorded with the controller overlay. Third-party footage is not shipped until its rights are
	// cleared: no file is in public/media and the stage draws its own scene. A cleared loop goes here as
	// [["/media/clipey-games.mp4", "video/mp4"], ["/media/clipey-games.webm", "video/webm"]] with its poster, its copies
	// in scripts/media/config.mjs and FLAGS.gamesFootage set to true.
	games: {
		sources: [],
		poster: null,
		width: 960,
		height: 600,
	},
};

/**
 * Switches for media whose use depends on a decision outside the code:
 * - `gamesFootage`: gameplay video in the games section. False (rights not cleared) draws the stage and the controller
 *   card instead, with no video, no poster and no credit line.
 * - `phoneScreens`: the real phone screens in the "on your phone" section (stills phone-portrait and phone-landscape).
 *   False leaves the phone out and the copy takes the card, so no placeholder frame is ever shown.
 */
export const FLAGS = {
	gamesFootage: false,
	phoneScreens: true,
};

/** The sources of a video slot on a page of one language (a slot keyed by locale falls back to pt-BR). */
export const videoSources = (video, lang) =>
	Array.isArray(video.sources)
		? video.sources
		: (video.sources[lang] ?? video.sources[MEDIA_FALLBACK_LOCALE]);

/** The poster URL of a video slot on a page of one language. */
export const videoPoster = (manifest, video, lang) =>
	typeof video.poster === "string" || video.poster === null
		? video.poster
		: video.poster.still
			? stillSet(manifest, video.poster.still, lang).poster
			: (video.poster[lang] ?? video.poster[MEDIA_FALLBACK_LOCALE]);

/** The media of one page, with its language bound. */
export const pageMedia = (manifest, lang) => ({
	set: (name) => stillSet(manifest, name, lang),
	img: (name, options) => stillImg(manifest, name, { ...options, lang }),
	poster: (video) => videoPoster(manifest, video, lang),
	sources: (video) => videoSources(video, lang),
	locale: (name) => stillLocale(manifest, name, lang),
});
