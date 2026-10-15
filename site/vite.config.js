import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { RELEASE_DATE } from "./src/blog/config.mjs";
import { getPosts } from "./src/blog/content.mjs";
import { renderBlogIndex, renderBlogArticle, renderSitemap, renderFeed } from "./src/blog/template.mjs";
import { missingCaptures, readCaptureManifest } from "./src/blog/manifest.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const languages = ["pt-BR", "en", "es"];
const legal = {};

function blogPlugin() {
	const virtualId = "virtual:clipey-blog-teasers";
	const resolvedVirtualId = `\0${virtualId}`;
	return {
		name: "clipey-blog",
		transformIndexHtml(html, context) {
			const lang = context.filename.endsWith(`${path.sep}en${path.sep}index.html`) ? "en" : context.filename.endsWith(`${path.sep}es${path.sep}index.html`) ? "es" : "pt-BR";
			const pathByLanguage = { "pt-BR": "/", en: "/en/", es: "/es/" };
			const alternates = languages.map((locale) => `<link rel="alternate" hreflang="${locale}" href="https://clipey.com.br${pathByLanguage[locale]}">`).join("") + `<link rel="alternate" hreflang="x-default" href="https://clipey.com.br/">`;
			return html.replace("</head>", `${alternates}</head>`);
		},
		resolveId(id) {
			if (id === virtualId) return resolvedVirtualId;
		},
		async load(id) {
			if (id === resolvedVirtualId) return `export default ${JSON.stringify((await import("./src/blog/teasers.mjs")).buildTeasers())}`;
		},
		configureServer(server) {
			server.middlewares.use((req, res, next) => {
				const pathname = new URL(req.url, "http://localhost").pathname;
				const posts = getPosts().filter((post) => languages.every((lang) => post.content[lang]));
				for (const lang of languages) {
					const base = lang === "pt-BR" ? "/blog/" : `/blog/${lang}/`;
					if (pathname === base || pathname === base.slice(0, -1)) {
						res.setHeader("content-type", "text/html; charset=utf-8");
						res.end(renderBlogIndex(lang, posts));
						return;
					}
					for (const post of posts) {
						const item = post.content[lang];
						if (item && pathname === item.url) {
							res.setHeader("content-type", "text/html; charset=utf-8");
							res.end(renderBlogArticle(post, lang, posts));
							return;
						}
					}
				}
				next();
			});
		},
		generateBundle() {
			if (process.env.CLIPEY_STRICT_IMAGES === "1" && !existsSync(path.join(root, "public/img/hero-editor.webp"))) throw new Error("RELEASE GATE: /img/hero-editor.webp is missing");
			const allPosts = getPosts();
			const incomplete = allPosts.filter((post) => languages.some((lang) => !post.content[lang]));
			if (incomplete.length) console.warn(`[blog] excluded incomplete translations: ${incomplete.map((post) => post.translationKey).join(", ")}`);
			const posts = allPosts.filter((post) => languages.every((lang) => post.content[lang]));
			const manifest = readCaptureManifest(path.join(root, "public/blog/images.json"));
			const captures = posts.flatMap((post) => languages.flatMap((lang) => post.content[lang]?.markdown.match(/!\[[^\]]*\]\((\/blog\/img\/[^)]+)\)/g)?.map((match) => match.match(/\((\/blog\/img\/[^)]+)\)/)?.[1] || "") || []).filter(Boolean));
			const missing = missingCaptures(captures, manifest, path.join(root, "public"));
			if (process.env.CLIPEY_STRICT_IMAGES === "1" && missing.length) throw new Error(`Missing capture manifest entries: ${missing.join(", ")}`);
			if (missing.length) console.warn(`[blog] ${missing.length} capture(s) are not produced yet`);
			for (const file of ["src/site.css", "src/blog/blog.css"]) {
				this.emitFile({ type: "asset", fileName: file === "src/site.css" ? "site.css" : "blog.css", source: readFileSync(path.join(root, file), "utf8") });
			}
			if (existsSync(path.join(root, "public/og/landing.png"))) this.emitFile({ type: "asset", fileName: "og/landing.png", source: readFileSync(path.join(root, "public/og/landing.png")) });
			for (const asset of ["clipey-256.png", "favicon.png"]) {
				this.emitFile({ type: "asset", fileName: asset, source: readFileSync(path.join(root, asset)) });
			}
			this.emitFile({ type: "asset", fileName: "blog.js", source: `const button=document.querySelector('[data-theme-toggle]');button?.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='light'?'dark':'light';document.documentElement.dataset.theme=next;localStorage.setItem('clipey-theme',next)});const saved=localStorage.getItem('clipey-theme');if(saved)document.documentElement.dataset.theme=saved;const params=new URLSearchParams(location.search);const category=params.get('categoria');const tag=params.get('tag');if(category||tag)document.querySelectorAll('.post-card').forEach(card=>{card.hidden=Boolean((category&&card.dataset.category!==category)||(tag&&!card.dataset.tags.split('|').includes(tag)))})` });
			for (const lang of languages) {
				const prefix = lang === "pt-BR" ? "blog/" : `blog/${lang}/`;
				this.emitFile({ type: "asset", fileName: `${prefix}index.html`, source: renderBlogIndex(lang, posts) });
				this.emitFile({ type: "asset", fileName: `${prefix}rss.xml`, source: renderFeed(lang, "rss", posts) });
				this.emitFile({ type: "asset", fileName: `${prefix}atom.xml`, source: renderFeed(lang, "atom", posts) });
				for (const post of posts) {
					const item = post.content[lang];
					if (item) this.emitFile({ type: "asset", fileName: `${prefix}${item.slug}/index.html`, source: renderBlogArticle(post, lang, posts) });
				}
			}
			this.emitFile({ type: "asset", fileName: "sitemap.xml", source: renderSitemap(posts) });
			for (const [fileName, source] of Object.entries(legal)) {
				const styled = source.replace(/<link rel="preconnect"[^>]*>\s*/g, "").replace(/<link href="https:\/\/fonts\.googleapis\.com[^>]*>\s*/g, "").replace(/<style>[\s\S]*?<\/style>/, "<link rel=\"stylesheet\" href=\"/site.css\">");
				this.emitFile({ type: "asset", fileName, source: styled });
			}
			for (const file of ["announcements.json", "robots.txt", "favicon.png", "clipey-256.png"]) {
				this.emitFile({ type: "asset", fileName: file, source: readFileSync(path.join(root, file)) });
			}
			this.emitFile({ type: "asset", fileName: "_headers", source: headers });
			this.emitFile({ type: "asset", fileName: "404.html", source: `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="stylesheet" href="/site.css"><title>Página não encontrada · Clipey</title><main class="not-found"><span class="eyebrow">404 / CLIPEY</span><h1>Esta página não está aqui.</h1><p>O endereço pode ter mudado ou não existe.</p><a href="/">Voltar ao início</a> · <a href="/en/">Home</a></main></html>` });
		},
	};
}

const headers = `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'\n  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload\n  Cache-Control: public, max-age=0, must-revalidate\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n/announcements.json\n  Cache-Control: public, max-age=300\n`;

// Keep the legal body generated from the existing source of truth, unchanged.
execFileSync("python3", [path.join(root, "build.py")], { cwd: root, stdio: "ignore" });
for (const file of ["privacidade/index.html", "termos/index.html", "exclusao-de-dados/index.html", "en/privacy/index.html", "en/terms/index.html", "en/data-deletion/index.html"]) {
	legal[file] = readFileSync(path.join(root, "dist", file), "utf8");
}

const inputs = Object.fromEntries([
	["index", "index.html"], ["en", "en/index.html"], ["es", "es/index.html"], ["blog-entry", "src/blog/entry.js"],
].map(([name, file]) => [name, path.resolve(root, file)]));

export default defineConfig({
	root,
	plugins: [blogPlugin()],
	build: { outDir: "dist", emptyOutDir: true, rollupOptions: { input: inputs } },
});

export { RELEASE_DATE };
