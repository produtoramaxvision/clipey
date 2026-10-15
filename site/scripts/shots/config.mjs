import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

export const OUT_DIR = path.resolve(here, "../../public/shots");
export const LABEL_FILE = path.join(here, "placeholder-label@2x.png");
export const LABEL_TEXT = "Gravação de demonstração";

/** Every shot is exported at these widths (never upscaled) and as a 1400-wide poster. */
export const WIDTHS = [800, 1400, 2400];
export const POSTER_WIDTH = 1400;

/** WebP quality for the width set, and the range searched (high to low) to fit a poster in its budget. */
export const QUALITY = 82;
export const POSTER_QUALITIES = [85, 82, 80, 78, 75, 72, 70];
export const POSTER_BUDGET = 120_000;
export const TOTAL_BUDGET = 3_500_000;

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
