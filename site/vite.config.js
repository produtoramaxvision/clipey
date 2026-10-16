import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, normalizePath } from "vite";
import { LANGUAGES } from "./src/blog/config.mjs";
import { getCompletePosts, getPosts } from "./src/blog/content.mjs";
import { missingCaptures, readCaptureManifest } from "./src/blog/manifest.mjs";
import {
	fileForUrl,
	LEGAL_STYLESHEET,
	renderSite,
} from "./src/render-site.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(root, "public");

const ENTRIES = {
	landing: "src/entry-landing.js",
	blog: "src/entry-blog.js",
};

const FONT_FILE = "Geist-Variable";

/** Stylesheets an entry needs: its own and those of every chunk it imports. */
function collectCss(bundle, entry) {
	const css = new Set();
	const seen = new Set();
	const visit = (fileName) => {
		if (seen.has(fileName)) return;
		seen.add(fileName);
		const chunk = bundle[fileName];
		if (!chunk || chunk.type !== "chunk") return;
		for (const file of chunk.viteMetadata?.importedCss ?? []) css.add(file);
		for (const imported of chunk.imports) visit(imported);
	};
	visit(entry.fileName);
	return [...css].map((file) => `/${file}`);
}

function builtAssets(bundle) {
	const font = Object.keys(bundle).find((fileName) =>
		new RegExp(`^assets/${FONT_FILE}-.*\\.woff2$`).test(fileName),
	);
	if (!font) throw new Error("the Geist sans font is missing from the bundle");
	const assets = {};
	for (const [name, input] of Object.entries(ENTRIES)) {
		const entry = Object.values(bundle).find(
			(chunk) =>
				chunk.type === "chunk" &&
				chunk.isEntry &&
				(chunk.name === name ||
					chunk.facadeModuleId === normalizePath(path.join(root, input))),
		);
		if (!entry) throw new Error(`the ${name} entry is missing from the bundle`);
		assets[name] = {
			css: collectCss(bundle, entry),
			font: `/${font}`,
			script: `/${entry.fileName}`,
		};
	}
	return assets;
}

/** In development the stylesheets arrive through the entry module and the font from its source path. */
function devAssets() {
	return Object.fromEntries(
		Object.entries(ENTRIES).map(([name, input]) => [
			name,
			{
				css: [],
				font: `/src/fonts/${FONT_FILE}.woff2`,
				script: `/${input}`,
			},
		]),
	);
}

function checkCaptures(posts) {
	const manifest = readCaptureManifest(
		path.join(publicDir, "blog/images.json"),
	);
	const captures = posts.flatMap((post) =>
		LANGUAGES.flatMap(
			(lang) =>
				post.content[lang].markdown.match(
					/\/blog\/img\/[a-z0-9-]+\/[a-z0-9-]+\.webp/g,
				) ?? [],
		),
	);
	const missing = missingCaptures(captures, manifest, publicDir);
	if (missing.length && process.env.CLIPEY_STRICT_IMAGES === "1")
		throw new Error(`Missing capture manifest entries: ${missing.join(", ")}`);
	if (missing.length)
		console.warn(`[blog] ${missing.length} capture(s) are not produced yet`);
}

function sitePlugin() {
	return {
		name: "clipey-site",
		configureServer(server) {
			server.middlewares.use(async (req, res, next) => {
				const { pathname } = new URL(req.url, "http://localhost");
				const url =
					pathname.endsWith("/") || pathname.includes(".")
						? pathname
						: `${pathname}/`;
				const files = renderSite(getCompletePosts(), devAssets());
				const source = files.get(fileForUrl(url));
				if (source !== undefined && fileForUrl(url) === LEGAL_STYLESHEET) {
					res.setHeader("content-type", "text/css; charset=utf-8");
					return res.end(source);
				}
				if (source === undefined || !fileForUrl(url).endsWith(".html"))
					return next();
				res.setHeader("content-type", "text/html; charset=utf-8");
				res.end(await server.transformIndexHtml(url, source));
			});
		},
		generateBundle(_options, bundle) {
			const incomplete = getPosts().filter((post) =>
				LANGUAGES.some((lang) => !post.content[lang]),
			);
			if (incomplete.length)
				console.warn(
					`[blog] excluded incomplete translations: ${incomplete.map((post) => post.translationKey).join(", ")}`,
				);
			const posts = getCompletePosts();
			checkCaptures(posts);
			const files = renderSite(posts, builtAssets(bundle));
			for (const [fileName, source] of files)
				this.emitFile({ type: "asset", fileName, source });
		},
	};
}

export default defineConfig({
	root,
	plugins: [sitePlugin()],
	appType: "mpa",
	build: {
		outDir: "dist",
		emptyOutDir: true,
		rollupOptions: {
			input: Object.fromEntries(
				Object.entries(ENTRIES).map(([name, input]) => [
					name,
					path.join(root, input),
				]),
			),
		},
	},
});
