/**
 * Renders the placeholder label ("Gravação de demonstração", Geist Mono) once to a transparent PNG at 2x.
 * The PNG is committed, so `npm run shots` needs no browser and gives the same bytes on every machine.
 */
import { writeFileSync } from "node:fs";
import { chromium } from "playwright";
import {
	BROWSER_ARGS,
	CONTEXT_OPTIONS,
	DARK_TOKENS,
	FONT_MONO,
} from "../blog-images/common.mjs";
import { LABEL_FILE, LABEL_TEXT } from "./config.mjs";

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>
@font-face { font-family: "Geist Mono"; src: url(data:font/woff2;base64,${FONT_MONO}) format("woff2"); font-weight: 100 900; }
${DARK_TOKENS}
html, body { margin: 0; background: transparent; }
.label { display: inline-flex; align-items: center; gap: 18px; padding: 6px 8px; font: 500 26px/1 var(--font-mono); letter-spacing: 0.04em; color: var(--muted); }
.dot { width: 13px; height: 13px; border-radius: 50%; background: var(--accent); }
</style></head><body><span class="label"><span class="dot"></span>${LABEL_TEXT}</span></body></html>`;

const browser = await chromium.launch({ args: BROWSER_ARGS });
try {
	const context = await browser.newContext({
		...CONTEXT_OPTIONS,
		deviceScaleFactor: 2,
		viewport: { width: 900, height: 120 },
	});
	const page = await context.newPage();
	await page.setContent(html);
	await page.evaluate(() => document.fonts.ready);
	const png = await page
		.locator(".label")
		.screenshot({ type: "png", omitBackground: true });
	writeFileSync(LABEL_FILE, png);
	console.log(`label: ${png.length} B`);
	await context.close();
} finally {
	await browser.close();
}
