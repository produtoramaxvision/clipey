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
			locale === "pt-BR"
				? "mkt2/editor-3s.png"
				: `mkt2/${locale}/editor-3s.png`,
	},
	{
		// The demo project's board, behind the camera layouts and the games cards. Captured in pt-BR only.
		name: "ui-board",
		source: (locale) => `mkt3/${locale}/ui-board.png`,
	},
	{
		// The preview of the captions tab without its burned-in line: the page draws the caption over it.
		name: "captions-clean",
		source: (locale) => `mkt3/${locale}/captions-clean.png`,
	},
	{
		// The phone remote's real screens, upright (Home) and sideways (editor), per language. Shown once
		// FLAGS.phoneScreens is on.
		name: "phone-portrait",
		source: (locale) => `mkt3/${locale}/phone-portrait.png`,
	},
	{
		name: "phone-landscape",
		source: (locale) => `mkt3/${locale}/phone-landscape.png`,
	},
	{
		// The app's Captions pane in each language, at 2x, with that language's translation selected.
		name: "captions-pane",
		source: (locale) => `mkt3/${locale}/captions-pane.png`,
	},
];

/** Files copied as they are (videos and their poster), source relative to MEDIA_SRC -> name in OUT_DIR. */
export const COPIES = [
	// The editor tour, recorded with the app and its demo project in each language.
	["tour7/clipey-editor-tour.mp4", "clipey-editor-tour-pt-BR.mp4"],
	["tour7/clipey-editor-tour.webm", "clipey-editor-tour-pt-BR.webm"],
	[
		"tour7/clipey-editor-tour-poster.jpg",
		"clipey-editor-tour-pt-BR-poster.jpg",
	],
	...["en", "es"].flatMap((locale) => [
		[
			`hero-${locale}/web/clipey-editor-tour-${locale}.mp4`,
			`clipey-editor-tour-${locale}.mp4`,
		],
		[
			`hero-${locale}/web/clipey-editor-tour-${locale}.webm`,
			`clipey-editor-tour-${locale}.webm`,
		],
		[
			`hero-${locale}/web/clipey-editor-tour-${locale}-poster.jpg`,
			`clipey-editor-tour-${locale}-poster.jpg`,
		],
	]),
	// The Edit tab: the same walkthrough recorded in each language of the app.
	...[
		["pt", "pt-BR"],
		["en", "en"],
		["es", "es"],
	].flatMap(([take, locale]) => [
		[
			`takes/edit-${take}/web/clipey-tab-edit-${take}.mp4`,
			`clipey-tab-edit-${locale}.mp4`,
		],
		[
			`takes/edit-${take}/web/clipey-tab-edit-${take}.webm`,
			`clipey-tab-edit-${locale}.webm`,
		],
		[
			`takes/edit-${take}/web/clipey-tab-edit-${take}-poster.jpg`,
			`clipey-tab-edit-${locale}-poster.jpg`,
		],
	]),
	// No games gameplay is copied: the Session: Skate Sim and MTG trailers are not cleared for publication (see
	// VIDEOS.games and FLAGS in landing-media.mjs). A cleared loop is added here with its poster.
	// mvcode's mark (the MaxVision aperture), from the mvcode site's brand folder.
	["logos/mvcode-roda.png", "mvcode-mark.png"],
];

export const stillFileName = (name, locale, width) =>
	`${name}-${locale}-${width}.webp`;
