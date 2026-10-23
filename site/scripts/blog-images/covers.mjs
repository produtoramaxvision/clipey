/** Deterministic cover (1600x900 webp) and social card (1200x630 png) for every article key, plus the landing card. */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import encodeWebp from "@jsquash/webp/encode.js";
import { chromium } from "playwright";
import { PNG } from "pngjs";
import { getCompletePosts } from "../../src/blog/content.mjs";
import { artworkHtml, landingHtml } from "./artwork.mjs";
import {
	BROWSER_ARGS,
	CONTEXT_OPTIONS,
	COVER_BUDGET,
	COVER_SIZE,
	COVERS_DIR,
	ensureWebp,
	LANDING_OG,
	OG_BUDGET,
	OG_DIR,
	OG_SIZE,
} from "./common.mjs";
import { encodeOgPng } from "./og-png.mjs";

async function render(browser, html, size) {
	const context = await browser.newContext({
		...CONTEXT_OPTIONS,
		viewport: size,
	});
	try {
		const page = await context.newPage();
		await page.setContent(html);
		await page.evaluate(() => document.fonts.ready);
		return PNG.sync.read(await page.screenshot({ type: "png" }));
	} finally {
		await context.close();
	}
}

function within(bytes, budget, name) {
	if (bytes > budget)
		throw new Error(`${name} is ${bytes} bytes, over its budget of ${budget}`);
}

mkdirSync(COVERS_DIR, { recursive: true });
mkdirSync(OG_DIR, { recursive: true });
mkdirSync(path.dirname(LANDING_OG), { recursive: true });

await ensureWebp();
const posts = getCompletePosts();
const browser = await chromium.launch({ args: BROWSER_ARGS });
try {
	for (const post of posts) {
		const art = {
			key: post.translationKey,
			order: post.order,
			total: posts.length,
		};
		const cover = await render(
			browser,
			artworkHtml({ ...art, kind: "cover" }),
			COVER_SIZE,
		);
		const webp = Buffer.from(
			await encodeWebp(
				{
					data: new Uint8ClampedArray(cover.data),
					width: cover.width,
					height: cover.height,
				},
				{ quality: 84, method: 6 },
			),
		);
		within(webp.length, COVER_BUDGET, `${art.key} cover`);
		writeFileSync(path.join(COVERS_DIR, `${art.key}.webp`), webp);
		const card = encodeOgPng(
			await render(browser, artworkHtml({ ...art, kind: "og" }), OG_SIZE),
		);
		within(card.length, OG_BUDGET, `${art.key} card`);
		writeFileSync(path.join(OG_DIR, `${art.key}.png`), card);
		console.log(`${art.key}: cover ${webp.length} B, card ${card.length} B`);
	}
	const landing = encodeOgPng(await render(browser, landingHtml(), OG_SIZE));
	within(landing.length, OG_BUDGET, "landing card");
	writeFileSync(LANDING_OG, landing);
	console.log(`landing: card ${landing.length} B`);
} finally {
	await browser.close();
}
