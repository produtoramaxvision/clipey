import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

export const OUT_DIR = path.resolve(here, "../../public/media");

/** Languages of the landing, in fallback order: a still missing in a language is shown from pt-BR, the source of truth. */
export const LOCALES = ["pt-BR", "en", "es"];
export const FALLBACK_LOCALE = "pt-BR";

/** Every still is exported as WebP at these widths, never upscaled (a narrower source stops at its own width). */
export const WIDTHS = [800, 1400, 1920];
export const QUALITY = 82;
/** The recording bar keeps its alpha; it is drawn over the page background. */
export const ALPHA_QUALITY = 100;

/**
 * The stills of the v3 landing, by output name. `source(locale)` is the capture path relative to MEDIA_SRC; a locale
 * whose capture does not exist is skipped and its page falls back to FALLBACK_LOCALE.
 */
export const STILLS = [
	{
		name: "hud-bar",
		// The pt-BR recording bar, captured at 3x on a transparent background. en and es are not captured yet.
		source: (locale) =>
			locale === "pt-BR" ? "mkt2/hud-bar.png" : `mkt2/${locale}/hud-bar.png`,
		widths: [800, 1400, 1941],
	},
	{ name: "export", source: (locale) => `mkt/${locale}/05-export.png` },
	{
		name: "settings-transcription",
		source: (locale) => `mkt/${locale}/08-settings-3.png`,
	},
	{
		// Provisional poster of the captions video slot until its recording arrives.
		name: "captions-poster",
		source: (locale) =>
			locale === "pt-BR" ? "mkt2/editor-3s.png" : `mkt2/${locale}/editor-3s.png`,
	},
];

/** Files copied as they are (videos and their poster), source relative to MEDIA_SRC -> name in OUT_DIR. */
export const COPIES = [
	["tour4/clipey-editor-tour.mp4", "clipey-editor-tour.mp4"],
	["tour4/clipey-editor-tour.webm", "clipey-editor-tour.webm"],
	["tour4/clipey-editor-tour-poster.jpg", "clipey-editor-tour-poster.jpg"],
];

export const stillFileName = (name, locale, width) =>
	`${name}-${locale}-${width}.webp`;
