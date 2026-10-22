/**
 * Pre-commit browser gate for the built site. Serves dist/ with `npm run preview`, loads every landing at desktop
 * (1440) and phone (390) widths, plus a few spot checks, and fails on any console error, page error, failed request or
 * horizontal scroll. `vite preview` does not apply dist/_headers, so the production CSP is read from that file and
 * added to every document response: a style="" attribute or an inline script the CSP blocks fails here as it would in
 * production. Screenshots go to tests/artifacts/ (gitignored).
 *
 * Usage: npm run build && node scripts/gate.mjs
 */
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const artifacts = path.join(root, "tests/artifacts");
fs.mkdirSync(artifacts, { recursive: true });

const PORT = 4173;
const ORIGIN = `http://localhost:${PORT}`;
const csp = fs
	.readFileSync(path.join(root, "dist/_headers"), "utf8")
	.match(/Content-Security-Policy: (.+)/)[1];

const DESKTOP = {
	viewport: { width: 1440, height: 900 },
	deviceScaleFactor: 1,
};
const PHONE = {
	viewport: { width: 390, height: 844 },
	deviceScaleFactor: 2,
	isMobile: true,
	hasTouch: true,
};

const LANDINGS = [
	["pt-BR", "/"],
	["en", "/en/"],
	["es", "/es/"],
];
const RUNS = [
	...LANDINGS.flatMap(([lang, url]) => [
		{ name: `${lang}-desktop-1440`, url, context: DESKTOP },
		{ name: `${lang}-phone-390`, url, context: PHONE },
	]),
	{
		name: "pt-BR-tablet-768",
		url: "/",
		context: { viewport: { width: 768, height: 1024 } },
	},
	{
		name: "pt-BR-laptop-1024",
		url: "/",
		context: { viewport: { width: 1024, height: 768 } },
	},
	{
		name: "pt-BR-phone-360",
		url: "/",
		context: { ...PHONE, viewport: { width: 360, height: 780 } },
	},
	{
		name: "pt-BR-desktop-reduced-motion",
		url: "/",
		context: { ...DESKTOP, reducedMotion: "reduce" },
	},
	{
		name: "pt-BR-phone-reduced-motion",
		url: "/",
		context: { ...PHONE, reducedMotion: "reduce" },
	},
	{ name: "pt-BR-desktop-light", url: "/", context: DESKTOP, light: true },
	{ name: "blog-desktop", url: "/blog/", context: DESKTOP },
	{ name: "blog-phone", url: "/blog/", context: PHONE },
];

async function waitForServer() {
	for (let attempt = 0; attempt < 60; attempt++) {
		try {
			const response = await fetch(`${ORIGIN}/`);
			if (response.ok) return;
		} catch {
			/* not up yet */
		}
		await new Promise((resolve) => setTimeout(resolve, 250));
	}
	throw new Error("vite preview did not start");
}

function stop(server) {
	if (process.platform === "win32")
		spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"]);
	else process.kill(-server.pid);
}

/** Scrolls through the page so every lazy image and video slot is reached, then back to the top. */
async function scrollThrough(page) {
	await page.evaluate(async () => {
		const step = Math.round(window.innerHeight * 0.8);
		for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
			window.scrollTo(0, y);
			await new Promise((resolve) => setTimeout(resolve, 120));
		}
		window.scrollTo(0, 0);
	});
	await page.waitForLoadState("networkidle");
}

const horizontalOverflow = (page) =>
	page.evaluate(() => {
		const doc = document.documentElement;
		return doc.scrollWidth > doc.clientWidth
			? `${doc.scrollWidth} > ${doc.clientWidth}`
			: "";
	});

async function check(browser, run) {
	const context = await browser.newContext(run.context);
	if (run.light)
		await context.addInitScript(() =>
			localStorage.setItem("clipey-theme", "light"),
		);
	await context.route("**/*", async (route) => {
		if (route.request().resourceType() !== "document") return route.continue();
		const response = await route.fetch();
		await route.fulfill({
			response,
			headers: { ...response.headers(), "content-security-policy": csp },
		});
	});
	const page = await context.newPage();
	const problems = [];
	page.on("console", (message) => {
		if (message.type() === "error") problems.push(`console: ${message.text()}`);
	});
	page.on("pageerror", (error) => problems.push(`pageerror: ${error.message}`));
	page.on("requestfailed", (request) => {
		const failure = request.failure()?.errorText ?? "";
		// A paused or replaced video aborts its range request; that is not an error.
		if (request.resourceType() === "media" && failure.includes("ERR_ABORTED"))
			return;
		problems.push(`requestfailed: ${request.url()} ${failure}`);
	});
	page.on("response", (response) => {
		if (response.status() >= 400)
			problems.push(`http ${response.status()}: ${response.url()}`);
	});

	const response = await page.goto(`${ORIGIN}${run.url}`, {
		waitUntil: "networkidle",
	});
	if (response.status() !== 200) problems.push(`status ${response.status()}`);
	await scrollThrough(page);

	const broken = await page.evaluate(() =>
		[...document.images]
			.filter((image) => image.complete && image.naturalWidth === 0)
			.map((image) => image.currentSrc || image.src),
	);
	for (const src of broken) problems.push(`broken image: ${src}`);

	const overflow = await horizontalOverflow(page);
	if (overflow) problems.push(`horizontal scroll: ${overflow}`);

	await page.screenshot({
		path: path.join(artifacts, `${run.name}.png`),
		fullPage: true,
	});

	// The phone section's rotation must not widen the page either.
	const rotate = page.locator('label[for="rotate-phone"]');
	if (await rotate.count()) {
		await rotate.scrollIntoViewIfNeeded();
		await rotate.click();
		await page.waitForTimeout(1600);
		const rotated = await horizontalOverflow(page);
		if (rotated) problems.push(`horizontal scroll (rotated): ${rotated}`);
		await page
			.locator("#celular, #phone, #movil")
			.first()
			.screenshot({ path: path.join(artifacts, `${run.name}-rotated.png`) });
	}

	await context.close();
	return problems;
}

const server = spawn(`npm run preview -- --port ${PORT} --strictPort`, {
	cwd: root,
	shell: true,
	detached: process.platform !== "win32",
	stdio: "ignore",
});

let failed = false;
try {
	await waitForServer();
	const browser = await chromium.launch({ args: ["--disable-lcd-text"] });
	for (const run of RUNS) {
		const problems = await check(browser, run);
		const status = problems.length ? "FAIL" : "PASS";
		console.log(`${status} ${run.name.padEnd(30)} ${run.url}`);
		for (const problem of problems) console.log(`     ${problem}`);
		if (problems.length) failed = true;
	}
	await browser.close();
} finally {
	stop(server);
}
console.log(`gate: ${failed ? "FAILED" : "passed"} (${RUNS.length} runs, screenshots in tests/artifacts/)`);
process.exit(failed ? 1 : 0);
