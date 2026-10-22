/**
 * Pre-commit browser gate for the built site. Serves dist/ with `pnpm preview` and:
 * - loads every landing at desktop (1440) and phone (390) widths, plus spot checks (768, 1024, 360, reduced motion,
 *   light theme), and fails on console errors, page errors, failed requests, broken images, horizontal scroll, any
 *   element outside the viewport (also with the phone section turned to landscape), unequal widths inside a button
 *   group, layout shift, or a phone menu that does not open, close on Escape and return focus. The light run also
 *   fails unless the page is in the light theme; the reduced-motion runs fail if the hero video plays or any
 *   animation is running. Every run logs the source the hero video picked;
 * - loads every other page of dist/ once at desktop width, scrolls through it, and fails on console errors, failed
 *   requests, broken images or horizontal scroll.
 * `vite preview` does not apply dist/_headers, so the production CSP is read from that file and added to every
 * document response: a style="" attribute or an inline script the CSP blocks fails here as it would in production.
 * Screenshots go to tests/artifacts/ (gitignored).
 *
 * Usage: pnpm gate (vite build, then this script)
 */
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const artifacts = path.join(root, "tests/artifacts");
fs.mkdirSync(artifacts, { recursive: true });

const PORT = 4173;
const ORIGIN = `http://localhost:${PORT}`;
const csp = fs
	.readFileSync(path.join(dist, "_headers"), "utf8")
	.match(/Content-Security-Policy: (.+)/)[1];

const DESKTOP = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 };
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
	{ name: "pt-BR-tablet-768", url: "/", context: { viewport: { width: 768, height: 1024 } } },
	{ name: "pt-BR-laptop-1024", url: "/", context: { viewport: { width: 1024, height: 768 } } },
	{ name: "pt-BR-laptop-1280", url: "/", context: { viewport: { width: 1280, height: 800 } } },
	{ name: "pt-BR-phone-360", url: "/", context: { ...PHONE, viewport: { width: 360, height: 780 } } },
	{ name: "pt-BR-desktop-reduced-motion", url: "/", context: { ...DESKTOP, reducedMotion: "reduce" } },
	{ name: "pt-BR-phone-reduced-motion", url: "/", context: { ...PHONE, reducedMotion: "reduce" } },
	{ name: "pt-BR-desktop-light", url: "/", context: DESKTOP, light: true },
];

/** Every other HTML page of the build, as its URL. */
function otherPages() {
	const pages = [];
	const walk = (dir) => {
		for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
			const file = path.join(dir, entry.name);
			if (entry.isDirectory()) walk(file);
			else if (entry.name.endsWith(".html")) {
				const rel = path.relative(dist, file).split(path.sep).join("/");
				pages.push(rel.endsWith("index.html") ? `/${rel.slice(0, -10)}` : `/${rel}`);
			}
		}
	};
	walk(dist);
	const landings = new Set(LANDINGS.map(([, url]) => url));
	return pages.filter((url) => !landings.has(url)).sort();
}

async function waitForServer() {
	for (let attempt = 0; attempt < 60; attempt++) {
		try {
			if ((await fetch(`${ORIGIN}/`)).ok) return;
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

async function newPage(browser, contextOptions, { light = false } = {}) {
	const context = await browser.newContext(contextOptions);
	if (light)
		await context.addInitScript(() => localStorage.setItem("clipey-theme", "light"));
	// Layout shifts not caused by input, summed over the whole visit.
	await context.addInitScript(() => {
		window.__cls = 0;
		new PerformanceObserver((list) => {
			for (const entry of list.getEntries())
				if (!entry.hadRecentInput) window.__cls += entry.value;
		}).observe({ type: "layout-shift", buffered: true });
	});
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
		if (request.resourceType() === "media" && failure.includes("ERR_ABORTED")) return;
		problems.push(`requestfailed: ${request.url()} ${failure}`);
	});
	page.on("response", (response) => {
		if (response.status() >= 400) problems.push(`http ${response.status()}: ${response.url()}`);
	});
	return { context, page, problems };
}

/** Scrolls through the page so every lazy image and video slot is reached, then back to the top, instantly. */
async function scrollThrough(page) {
	await page.evaluate(async () => {
		const step = Math.round(window.innerHeight * 0.8);
		for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
			window.scrollTo({ top: y, behavior: "instant" });
			await new Promise((resolve) => setTimeout(resolve, 120));
		}
		window.scrollTo({ top: 0, behavior: "instant" });
	});
	await page.waitForFunction(() => window.scrollY === 0);
	await page.waitForLoadState("networkidle");
}

const horizontalOverflow = (page) =>
	page.evaluate(() => {
		const doc = document.documentElement;
		return doc.scrollWidth > doc.clientWidth ? `${doc.scrollWidth} > ${doc.clientWidth}` : "";
	});

/**
 * Visible elements reaching outside the viewport. overflow-x: clip on the page would hide them from the scroll
 * check, so each element is measured. The phone recording bar (760 px, panned) overflows by design, and the
 * cursor track is an empty bar-wide layer moved by transform; the cursor inside it is measured instead.
 */
const outOfBounds = (page) =>
	page.evaluate(() => {
		const width = document.documentElement.clientWidth;
		const phone = window.innerWidth <= 640;
		const out = [];
		for (const element of document.querySelectorAll("header *, main *, footer *")) {
			if (phone && element.closest(".hud-stage")) continue;
			if (element.classList.contains("hud-cursor-track")) continue;
			const style = getComputedStyle(element);
			if (style.visibility === "hidden" || style.display === "none") continue;
			const rect = element.getBoundingClientRect();
			if (!rect.width || !rect.height) continue;
			if (rect.left < -1 || rect.right > width + 1)
				out.push(`${element.tagName.toLowerCase()}.${[...element.classList].join(".")} ${Math.round(rect.left)}..${Math.round(rect.right)}`);
		}
		return out.slice(0, 8);
	});

/** Button groups whose visible buttons differ in width. */
const unequalGroups = (page) =>
	page.evaluate(() => {
		const out = [];
		for (const group of document.querySelectorAll(".cta-group")) {
			if (getComputedStyle(group).display === "none") continue;
			const widths = [...group.querySelectorAll(".cta")].map((cta) => cta.getBoundingClientRect().width);
			if (Math.max(...widths) - Math.min(...widths) > 1)
				out.push(`${group.className}: ${widths.map(Math.round).join("/")}`);
		}
		return out;
	});

async function checkMenu(page, problems) {
	const toggle = page.locator("#menu-toggle");
	if (!(await toggle.isVisible())) return;
	await toggle.click();
	if ((await toggle.getAttribute("aria-expanded")) !== "true" || !(await page.locator("#mobile-menu").isVisible()))
		problems.push("menu: does not open");
	await page.keyboard.press("Escape");
	if (await page.locator("#mobile-menu").isVisible()) problems.push("menu: Escape does not close it");
	if (!(await page.evaluate(() => document.activeElement?.id === "menu-toggle")))
		problems.push("menu: focus does not return to the toggle");
}

/** Images that finished loading without any pixels. */
const brokenImages = (page) =>
	page.evaluate(() =>
		[...document.images]
			.filter((image) => image.complete && image.naturalWidth === 0)
			.map((image) => image.currentSrc || image.src),
	);

async function checkLanding(browser, run, info) {
	const { context, page, problems } = await newPage(browser, run.context, run);
	const response = await page.goto(`${ORIGIN}${run.url}`, { waitUntil: "networkidle" });
	if (response.status() !== 200) problems.push(`status ${response.status()}`);
	await scrollThrough(page);

	for (const src of await brokenImages(page)) problems.push(`broken image: ${src}`);

	// Back at the top the hero slot is on screen again: give the script a moment to start or keep it paused.
	await page.waitForTimeout(800);
	const hero = await page.evaluate(() => {
		const video = document.querySelector(".vslot--hero video");
		return video && { src: video.currentSrc, paused: video.paused };
	});
	if (!hero) problems.push("hero video: missing");
	else info.push(`hero video: ${hero.src.replace(ORIGIN, "") || "(none)"}${hero.paused ? " (paused)" : " (playing)"}`);
	if (run.light) {
		const theme = await page.evaluate(() => document.documentElement.dataset.theme);
		if (theme !== "light") problems.push(`light run: data-theme="${theme}"`);
	}
	if (run.context.reducedMotion === "reduce") {
		if (hero && !hero.paused) problems.push("reduced motion: the hero video plays");
		const running = await page.evaluate(() =>
			document
				.getAnimations()
				.filter((animation) => animation.playState === "running")
				.map((animation) => {
					const target = animation.effect?.target;
					const name = animation.animationName ?? animation.transitionProperty ?? "animation";
					return `${name} on ${target?.tagName?.toLowerCase() ?? "?"}.${[...(target?.classList ?? [])].join(".")}${animation.effect?.pseudoElement ?? ""}`;
				}),
		);
		for (const animation of running) problems.push(`reduced motion: running ${animation}`);
	}

	const overflow = await horizontalOverflow(page);
	if (overflow) problems.push(`horizontal scroll: ${overflow}`);
	for (const element of await outOfBounds(page)) problems.push(`outside the viewport: ${element}`);
	for (const group of await unequalGroups(page)) problems.push(`unequal button widths: ${group}`);
	const cls = await page.evaluate(() => window.__cls);
	if (cls > 0.01) problems.push(`layout shift: CLS ${cls.toFixed(3)}`);

	await page.screenshot({ path: path.join(artifacts, `${run.name}.png`), fullPage: true });
	await checkMenu(page, problems);

	// The phone section turned to landscape must stay inside the viewport and inside its own column.
	const rotate = page.locator('label[for="rotate-phone"]');
	if (await rotate.count()) {
		await rotate.scrollIntoViewIfNeeded();
		await rotate.click();
		await page.waitForTimeout(1600);
		const rotated = await horizontalOverflow(page);
		if (rotated) problems.push(`horizontal scroll (rotated): ${rotated}`);
		for (const element of await outOfBounds(page)) problems.push(`outside the viewport (rotated): ${element}`);
		const overlap = await page.evaluate(() => {
			const phone = document.querySelector(".phone").getBoundingClientRect();
			const copy = document.querySelector(".phone-copy").getBoundingClientRect();
			const card = document.querySelector(".phone-card").getBoundingClientRect();
			const sideBySide = copy.right <= phone.left + phone.width;
			const hitsCopy = sideBySide && phone.left < copy.right && phone.top < copy.bottom && phone.bottom > copy.top;
			const outsideCard = phone.left < card.left || phone.right > card.right;
			return hitsCopy ? "phone overlaps the copy" : outsideCard ? "phone leaves the card" : "";
		});
		if (overlap) problems.push(`rotated: ${overlap}`);
		await page
			.locator(".lp-phone")
			.screenshot({ path: path.join(artifacts, `${run.name}-rotated.png`) });
	}
	await context.close();
	return problems;
}

async function checkPage(browser, url) {
	const { context, page, problems } = await newPage(browser, DESKTOP);
	const response = await page.goto(`${ORIGIN}${url}`, { waitUntil: "networkidle" });
	const expected = url === "/404.html" ? [200, 404] : [200];
	if (!expected.includes(response.status())) problems.push(`status ${response.status()}`);
	await scrollThrough(page);
	for (const src of await brokenImages(page)) problems.push(`broken image: ${src}`);
	const overflow = await horizontalOverflow(page);
	if (overflow) problems.push(`horizontal scroll: ${overflow}`);
	await context.close();
	return problems.filter((problem) => !(url === "/404.html" && problem.startsWith("http 404")));
}

// pnpm forwards these flags to vite preview as they are (a "--" would reach vite literally).
const server = spawn(`pnpm preview --port ${PORT} --strictPort`, {
	cwd: root,
	shell: true,
	detached: process.platform !== "win32",
	stdio: "ignore",
});

let failed = false;
let count = 0;
const report = (name, url, problems, info = []) => {
	count++;
	console.log(`${problems.length ? "FAIL" : "PASS"} ${name.padEnd(30)} ${url}`);
	for (const line of info) console.log(`     ${line}`);
	for (const problem of problems) console.log(`     ${problem}`);
	if (problems.length) failed = true;
};
try {
	await waitForServer();
	const browser = await chromium.launch({ args: ["--disable-lcd-text"] });
	for (const run of RUNS) {
		const info = [];
		report(run.name, run.url, await checkLanding(browser, run, info), info);
	}
	const pages = otherPages();
	let clean = 0;
	for (const url of pages) {
		const problems = await checkPage(browser, url);
		if (problems.length) report("page-desktop", url, problems);
		else {
			clean++;
			count++;
		}
	}
	console.log(`PASS ${clean}/${pages.length} other pages (console, requests, broken images, horizontal scroll)`);
	await browser.close();
} finally {
	stop(server);
}
console.log(`gate: ${failed ? "FAILED" : "passed"} (${count} runs, screenshots in tests/artifacts/)`);
process.exit(failed ? 1 : 0);
