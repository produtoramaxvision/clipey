import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { PNG } from "pngjs";

const root = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"../..",
);
const sourcePath = path.join(root, "clipey-appicon-1024.png");
const publicDir = path.join(root, "public");

if (!existsSync(sourcePath)) {
	throw new Error(`Source icon not found at ${sourcePath}`);
}

const source = readFileSync(sourcePath).toString("base64");
const html = `<!doctype html><html><head><style>*{margin:0;padding:0;}html,body{width:100%;height:100%;background:transparent;overflow:hidden;}img{width:100%;height:100%;display:block;}</style></head><body><img src="data:image/png;base64,${source}"></body></html>`;

const SIZES = [
	{ file: "apple-touch-icon.png", size: 180 },
	{ file: "favicon.png", size: 64 },
	{ file: "favicon-32x32.png", size: 32 },
];

export async function generateIcons() {
	const browser = await chromium.launch();
	try {
		for (const { file, size } of SIZES) {
			const page = await browser.newPage({
				viewport: { width: size, height: size },
			});
			await page.setContent(html);
			const buf = await page.screenshot({ type: "png", omitBackground: true });
			await page.close();
			const dest = path.join(publicDir, file);
			writeFileSync(dest, buf);
			const png = PNG.sync.read(buf);
			console.log(
				`Generated ${file} (${png.width}x${png.height}, ${buf.length} bytes)`,
			);
		}
	} finally {
		await browser.close();
	}
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	await generateIcons();
}
