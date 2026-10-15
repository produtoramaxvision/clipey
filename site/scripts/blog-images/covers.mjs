import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import encodeWebp from "@jsquash/webp/encode.js";
import { PNG } from "pngjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const source = path.join(root, "content/blog");
const coverDir = path.join(root, "public/blog/covers");
const ogDir = path.join(root, "public/blog/og");
const landingDir = path.join(root, "public/og");
const appIcon = fs.readFileSync(path.join(root, "clipey-256.png")).toString("base64");
const articles = [];
for (const lang of ["pt-BR", "en", "es"]) {
	const folder = path.join(source, lang);
	if (!fs.existsSync(folder)) continue;
	for (const file of fs.readdirSync(folder).filter((name) => name.endsWith(".md"))) {
		const raw = fs.readFileSync(path.join(folder, file), "utf8");
		const title = raw.match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1];
		const translationKey = raw.match(/^translationKey:\s*["']?(.+?)["']?\s*$/m)?.[1];
		const category = raw.match(/^category:\s*["']?(.+?)["']?\s*$/m)?.[1] || "Clipey";
		if (title && translationKey && lang === "pt-BR") articles.push({ title, key: translationKey, category });
	}
}
fs.mkdirSync(coverDir, { recursive: true });
fs.mkdirSync(ogDir, { recursive: true });
fs.mkdirSync(landingDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
	for (const article of [...articles, { title: "Do primeiro clique ao vídeo pronto.", key: "landing", category: "Windows video studio" }]) {
		for (const kind of ["cover", "og"]) {
			const isLanding = article.key === "landing";
			if (isLanding && kind === "cover") continue;
			const width = kind === "cover" ? 1600 : 1200;
			const height = kind === "cover" ? 900 : 630;
			const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1, colorScheme: "dark", reducedMotion: "reduce" });
			await page.setContent(`<html><style>*{box-sizing:border-box}body{margin:0;width:${width}px;height:${height}px;background:#0c0d0b;color:#eceee6;font:500 ${kind === "cover" ? 76 : 62}px/1.02 system-ui,sans-serif;display:flex;flex-direction:column;justify-content:space-between;padding:${kind === "cover" ? 92 : 62}px;background-image:radial-gradient(ellipse at 84% 17%,#252a1b 0,transparent 46%)}.brand{display:flex;align-items:center;gap:14px;font:700 18px system-ui;color:#a2d305;letter-spacing:.12em}.brand img{width:38px;height:38px;border-radius:10px}.title{max-width:90%;letter-spacing:-.055em}.meta{font:600 14px system-ui;letter-spacing:.18em;text-transform:uppercase;color:#a2d305}</style><div class="brand"><img src="data:image/png;base64,${appIcon}"> CLIPEY / NOTAS</div><div class="title">${article.title}</div><div class="meta">${article.category} &nbsp;·&nbsp; ${article.key}</div></html>`);
			const png = PNG.sync.read(await page.screenshot({ type: "png" }));
			await page.close();
			if (kind === "cover") {
				const encoded = await encodeWebp({ data: new Uint8Array(png.data), width: png.width, height: png.height }, { quality: 84, method: 6 });
				fs.writeFileSync(path.join(coverDir, `${article.key}.webp`), Buffer.from(encoded));
			} else {
				fs.writeFileSync(path.join(isLanding ? landingDir : ogDir, `${article.key}.png`), PNG.sync.write(png));
			}
		}
		console.log(`Generated ${article.key}`);
	}
} finally {
	await browser.close();
}
