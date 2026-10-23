import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

export const OUT_DIR = path.resolve(here, "../../public/shots");

/**
 * UI languages of the app captures, one folder each under SHOTS_SRC (SHOTS_SRC/<locale>/<name>@2x.png). Captures
 * directly in SHOTS_SRC count as ROOT_LOCALE: the app starts in English, so an unsorted capture set is English UI.
 */
export const LOCALES = ["pt-BR", "en", "es"];
export const ROOT_LOCALE = "en";

/** The label centred in the placeholder, in the language of the UI around it. */
export const LABEL_TEXT = {
	"pt-BR": "Gravação de demonstração",
	en: "Demo recording",
	es: "Grabación de demostración",
};
export const labelFile = (locale) =>
	path.join(here, `placeholder-label-${locale}@2x.png`);

/** Output name of one export of a shot: /shots/<name>-<locale>-<width|poster|1x|2x>.webp. */
export const shotFileName = (name, locale, variant) =>
	`${name}-${locale}-${variant}.webp`;

/** Every shot is exported at these widths (never upscaled) and as a 1400-wide poster. */
export const WIDTHS = [800, 1400, 2400];
export const POSTER_WIDTH = 1400;

/** WebP quality for the width set, and the range searched (high to low) to fit a poster in its budget. */
export const QUALITY = 82;
export const POSTER_QUALITIES = [85, 82, 80, 78, 75, 72, 70];
export const POSTER_BUDGET = 120_000;
/** A page only loads the shots of its own language, so the budget holds per locale. */
export const LOCALE_BUDGET = 3_500_000;

/** The placeholder that hides the recording inside the preview card: site background, faint grid, label centred. */
export const PLACEHOLDER = {
	fill: [0x0c, 0x0d, 0x0b],
	grid: [0x17, 0x19, 0x15],
	gridStep: 48,
};

/**
 * The shots of the site, by source basename without "@2x". `preview: true` marks full editor captures whose preview
 * card shows a real recording; it is found from the pixels and replaced by the placeholder.
 */
export const SHOTS = [
	{ name: "editor-full-speed-zoom-lanes-dark", preview: true },
	{ name: "timeline-zoom-regions-dark" },
	{ name: "pane-mouse-effects-dark" },
	{ name: "export-dialog-presets-publish-dark" },
	{ name: "export-dialog-tiktok-schedule-dark" },
	{ name: "launch-hud-recording-bar" },
	{ name: "settings-transcription-media-dark" },
	{ name: "pane-audio-voice-autoclip-dark" },
	{ name: "editor-full-light", preview: true },
	{ name: "pane-cursor-style-dark" },
	{ name: "settings-ai-assistant-mcp-dark" },
];

/** The recording bar is also exported as a transparent overlay at its 1x and 2x sizes. */
export const HUD = "launch-hud-recording-bar";

/**
 * Which captures of SHOTS a locale folder holds, from the list of files in it. A locale is all or nothing: a page
 * must never mix UI languages, so a partial set is an error and an empty one means the locale is not captured yet.
 */
export function localeCaptures(locale, files) {
	const present = new Set(files);
	const missing = SHOTS.filter((shot) => !present.has(`${shot.name}@2x.png`));
	if (missing.length === SHOTS.length) return null;
	if (missing.length)
		throw new Error(
			`${locale} captures are incomplete, missing: ${missing.map((shot) => shot.name).join(", ")}`,
		);
	return SHOTS;
}
