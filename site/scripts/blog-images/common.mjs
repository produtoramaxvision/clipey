import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { init as initWebp } from "@jsquash/webp/encode.js";

export const SITE_ROOT = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"../..",
);
export const COVERS_DIR = path.join(SITE_ROOT, "public/blog/covers");
export const OG_DIR = path.join(SITE_ROOT, "public/blog/og");
export const LANDING_OG = path.join(SITE_ROOT, "public/og/landing.png");

/** Covers are fetched by the page, cards only by social crawlers, so a card may weigh more than a cover. */
export const COVER_BUDGET = 120_000;
export const OG_BUDGET = 200 * 1024;

export const COVER_SIZE = { width: 1600, height: 900 };
export const OG_SIZE = { width: 1200, height: 630 };

/**
 * Small text is rendered with greyscale antialiasing: LCD (subpixel) antialiasing paints a colour fringe tuned to
 * one monitor and is the most platform-specific part of a render.
 */
export const BROWSER_ARGS = ["--disable-lcd-text"];
export const CONTEXT_OPTIONS = {
	deviceScaleFactor: 1,
	locale: "pt-BR",
	colorScheme: "dark",
	reducedMotion: "reduce",
	offline: true,
};

const base64 = (file) =>
	readFileSync(path.join(SITE_ROOT, file)).toString("base64");
export const FONT_SANS = base64("src/fonts/Geist-Variable.woff2");
export const FONT_MONO = base64("src/fonts/GeistMono-Variable.woff2");
export const ICON = base64("public/clipey-256.png");

/** The dark `:root` token block, so the artwork uses the same custom properties as the site and no colour of its own. */
export const DARK_TOKENS = readFileSync(
	path.join(SITE_ROOT, "src/tokens.css"),
	"utf8",
).match(/:root\s*\{[^}]*\}/)[0];

let webpReady = false;

/** Node has no fetch for file URLs, so the encoder gets its WebAssembly module compiled from disk. */
export async function ensureWebp() {
	if (webpReady) return;
	const wasmPath = fileURLToPath(
		import.meta.resolve("@jsquash/webp/codec/enc/webp_enc.wasm"),
	);
	await initWebp(new WebAssembly.Module(readFileSync(wasmPath)));
	webpReady = true;
}
