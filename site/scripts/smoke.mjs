import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const shotsDir = "/home/maxvision/clipey-site/evidence/site-eng-shots";
fs.mkdirSync(shotsDir, { recursive: true });

const PAGES = [
	{ path: "/", file: "landing-pt.png" },
	{ path: "/en/", file: "landing-en.png" },
	{ path: "/blog/", file: "blog-index.png" },
	{ path: "/blog/clipey-1-15-novidades/", file: "article-novidades.png" },
	{ path: "/privacidade/", file: "legal-privacidade.png", legal: true },
	{ path: "/termos/", file: "legal-termos.png", legal: true },
	{
		path: "/exclusao-de-dados/",
		file: "legal-exclusao-de-dados.png",
		legal: true,
	},
	{ path: "/en/privacy/", file: "legal-en-privacy.png", legal: true },
	{ path: "/en/terms/", file: "legal-en-terms.png", legal: true },
	{
		path: "/en/data-deletion/",
		file: "legal-en-data-deletion.png",
		legal: true,
	},
];

const PORT = 4173;
const PREVIEW_ORIGIN = `http://localhost:${PORT}`;

async function runSmoke() {
	console.log("Starting vite preview...");
	const preview = spawn("npx", ["vite", "preview", "--port", String(PORT)], {
		cwd: root,
		detached: true,
		stdio: "ignore",
	});

	// Wait for server to start
	await new Promise((resolve) => setTimeout(resolve, 1500));

	let browser;
	const results = [];

	try {
		browser = await chromium.launch({
			args: ["--disable-lcd-text"],
		});
		const context = await browser.newContext({
			viewport: { width: 1440, height: 900 },
			deviceScaleFactor: 1,
			reducedMotion: "reduce",
		});

		// Fulfill Google Fonts locally to keep zero network egress during preview
		await context.route(
			/^https:\/\/(fonts\.googleapis\.com|fonts\.gstatic\.com)\/.*/,
			(route) =>
				route.fulfill({
					status: 200,
					contentType: "text/css",
					body: "/* mock */",
				}),
		);

		for (const item of PAGES) {
			const page = await context.newPage();
			const consoleErrors = [];
			const externalRequests = [];

			page.on("console", (msg) => {
				if (msg.type() === "error") {
					consoleErrors.push(msg.text());
				}
			});
			page.on("pageerror", (err) => {
				consoleErrors.push(err.message);
			});

			page.on("request", (req) => {
				const url = new URL(req.url());
				if (
					url.origin !== PREVIEW_ORIGIN &&
					!url.hostname.includes("fonts.googleapis.com") &&
					!url.hostname.includes("fonts.gstatic.com")
				) {
					externalRequests.push(req.url());
				}
			});

			const targetUrl = `${PREVIEW_ORIGIN}${item.path}`;
			const response = await page.goto(targetUrl, {
				waitUntil: "networkidle",
			});

			const status = response.status();
			const shotPath = path.join(shotsDir, item.file);
			await page.screenshot({ path: shotPath, fullPage: true });
			await page.close();

			const ok =
				status === 200 &&
				consoleErrors.length === 0 &&
				externalRequests.length === 0;
			results.push({
				path: item.path,
				status,
				errors: consoleErrors.length,
				external: externalRequests.length,
				file: item.file,
				ok,
			});

			console.log(
				`Page ${item.path.padEnd(32)} -> status: ${status}, errors: ${consoleErrors.length}, external: ${externalRequests.length} [${ok ? "PASS" : "FAIL"}]`,
			);
			if (consoleErrors.length) console.error("Errors:", consoleErrors);
			if (externalRequests.length)
				console.error("External requests:", externalRequests);
		}
	} finally {
		if (browser) await browser.close();
		try {
			process.kill(-preview.pid);
		} catch {}
	}

	const allOk = results.every((r) => r.ok);
	console.log(`\nSmoke test finished. All pages passed: ${allOk}`);
	if (!allOk) process.exit(1);
}

runSmoke();
