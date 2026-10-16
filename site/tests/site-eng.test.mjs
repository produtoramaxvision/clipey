import {
	mkdtempSync,
	readdirSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import { describe, expect, it } from "vitest";
import {
	APP_VERSION,
	blogBase,
	CATEGORIES,
	categoryUrl,
	LANDING_PATH,
	LANGUAGES,
	OWNER,
	RELEASES_URL,
	SITE_NAME,
	SITE_URL,
} from "../src/blog/config.mjs";
import {
	getCompletePosts,
	parsePostFile,
	renderMarkdown,
} from "../src/blog/content.mjs";
import { UI } from "../src/blog/i18n.mjs";
import { THEME_SCRIPT_HASH } from "../src/blog/shell.mjs";
import { usedCategories } from "../src/blog/template.mjs";
import { STORY } from "../src/landing-copy.mjs";
import {
	fileForUrl,
	LEGAL_OUTPUT_FILES,
	renderSite,
} from "../src/render-site.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const legalSourceDir = path.join(root, "legal-source");

const assets = {
	landing: {
		css: ["/assets/landing.css", "/assets/chrome.css"],
		font: "/assets/Geist-Variable.woff2",
		script: "/assets/landing.js",
	},
	blog: {
		css: ["/assets/blog.css", "/assets/chrome.css"],
		font: "/assets/Geist-Variable.woff2",
		script: "/assets/blog.js",
	},
};

const posts = getCompletePosts();
const files = renderSite(posts, assets);
const htmlFiles = [...files].filter(([name]) => name.endsWith(".html"));

describe("1. Legal pages byte-identical output", () => {
	for (const fileName of LEGAL_OUTPUT_FILES) {
		it(`matches legal source byte-for-byte: ${fileName}`, () => {
			const source = readFileSync(path.join(legalSourceDir, fileName));
			const output = Buffer.from(files.get(fileName));
			expect(output.equals(source)).toBe(true);
		});
	}
});

describe("2. robots.txt and sitemap.xml", () => {
	it("robots.txt allows all and specifies Sitemap", () => {
		const robots = readFileSync(path.join(root, "public/robots.txt"), "utf8");
		expect(robots).toContain("User-agent: *");
		expect(robots).toContain("Allow: /");
		expect(robots).toContain("Sitemap: https://clipey.com.br/sitemap.xml");
	});

	it("sitemap contains landings, blog indexes, categories, articles, legal pages and x-default", () => {
		const sitemap = files.get("sitemap.xml");
		expect(sitemap).toContain(
			'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
		);
		expect(sitemap).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');

		for (const lang of LANGUAGES) {
			expect(sitemap).toContain(`<loc>${SITE_URL}${LANDING_PATH[lang]}</loc>`);
			expect(sitemap).toContain(`<loc>${SITE_URL}${blogBase(lang)}</loc>`);
		}

		for (const post of posts) {
			for (const lang of LANGUAGES) {
				const url = `${SITE_URL}${post.content[lang].url}`;
				expect(sitemap).toContain(`<loc>${url}</loc>`);
			}
		}

		expect(sitemap).toContain(`<loc>${SITE_URL}/privacidade/</loc>`);
		expect(sitemap).toContain(`<loc>${SITE_URL}/en/privacy/</loc>`);
		expect(sitemap).toContain(`<loc>${SITE_URL}/termos/</loc>`);
		expect(sitemap).toContain(`<loc>${SITE_URL}/en/terms/</loc>`);
		expect(sitemap).toContain(`<loc>${SITE_URL}/exclusao-de-dados/</loc>`);
		expect(sitemap).toContain(`<loc>${SITE_URL}/en/data-deletion/</loc>`);

		expect(sitemap).toContain('hreflang="x-default"');
		expect(sitemap).toContain(`href="${SITE_URL}/"`);
		expect(sitemap).not.toMatch(/\{\{[A-Z_]+\}\}/);
	});
});

describe("3. Head tags on every page", () => {
	it("includes robots, canonical, hreflang alternates, og:*, twitter:*, theme-color, and icons", () => {
		for (const [name, html] of htmlFiles) {
			if (LEGAL_OUTPUT_FILES.includes(name)) continue;

			expect(html).toContain('name="robots"');
			expect(html).toContain('rel="canonical"');
			expect(html).toContain('hreflang="x-default"');
			expect(html).toContain('property="og:type"');
			expect(html).toContain('property="og:title"');
			expect(html).toContain('property="og:description"');
			expect(html).toContain('property="og:image"');
			expect(html).toContain(
				'name="twitter:card" content="summary_large_image"',
			);
			expect(html).toContain(
				'name="theme-color" media="(prefers-color-scheme: light)" content="#eaeef3"',
			);
			expect(html).toContain(
				'name="theme-color" media="(prefers-color-scheme: dark)" content="#0c0d0b"',
			);
			expect(html).toContain('rel="icon"');
			expect(html).toContain('rel="apple-touch-icon"');
			expect(html).toContain('rel="preload"');
		}
	});
});

describe("4. JSON-LD structure and validation", () => {
	it("has exactly one JSON-LD block per page with valid @graph", () => {
		for (const [name, html] of htmlFiles) {
			if (LEGAL_OUTPUT_FILES.includes(name)) continue;

			const matches = [
				...html.matchAll(
					/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
				),
			];
			expect(matches.length, `${name} must have exactly 1 JSON-LD script`).toBe(
				1,
			);

			const data = JSON.parse(matches[0][1]);
			expect(data["@context"]).toBe("https://schema.org");
			expect(Array.isArray(data["@graph"])).toBe(true);

			const types = data["@graph"].map((item) => item["@type"]);
			expect(types).toContain("Organization");
			expect(types).toContain("WebSite");

			const org = data["@graph"].find(
				(item) => item["@type"] === "Organization",
			);
			expect(org.name).toBe(OWNER);
			expect(org.logo?.url).toBe(`${SITE_URL}/clipey-256.png`);

			const rawString = JSON.stringify(data);
			expect(rawString).not.toMatch(/\{\{[A-Z_]+\}\}/);
			expect(rawString).not.toContain("undefined");
			expect(rawString).not.toContain("null");
		}
	});

	it("landings have SoftwareApplication with offers and FAQPage", () => {
		for (const lang of LANGUAGES) {
			const html = files.get(fileForUrl(LANDING_PATH[lang]));
			const jsonText = html.match(
				/<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
			)[1];
			const data = JSON.parse(jsonText);
			const app = data["@graph"].find(
				(item) => item["@type"] === "SoftwareApplication",
			);
			expect(app).toBeDefined();
			expect(app.name).toBe(SITE_NAME);
			expect(app.operatingSystem).toBe("Windows 10, Windows 11");
			expect(app.applicationCategory).toBe("MultimediaApplication");
			expect(app.softwareVersion).toBe(APP_VERSION);
			expect(app.offers).toEqual({
				"@type": "Offer",
				price: "0",
				priceCurrency: "USD",
				url: RELEASES_URL,
			});

			const faq = data["@graph"].find((item) => item["@type"] === "FAQPage");
			expect(faq).toBeDefined();
			expect(faq.mainEntity.length).toBeGreaterThan(0);
			expect(faq.mainEntity[0]["@type"]).toBe("Question");
			expect(faq.mainEntity[0].acceptedAnswer["@type"]).toBe("Answer");
		}
	});

	it("blog indexes have CollectionPage", () => {
		for (const lang of LANGUAGES) {
			const html = files.get(fileForUrl(blogBase(lang)));
			const jsonText = html.match(
				/<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
			)[1];
			const data = JSON.parse(jsonText);
			const collection = data["@graph"].find(
				(item) => item["@type"] === "CollectionPage",
			);
			expect(collection).toBeDefined();
			expect(collection.mainEntity["@type"]).toBe("ItemList");
			expect(collection.mainEntity.itemListElement.length).toBe(18);
		}
	});

	it("articles have BlogPosting and BreadcrumbList with speakable", () => {
		for (const post of posts) {
			for (const lang of LANGUAGES) {
				const html = files.get(fileForUrl(post.content[lang].url));
				const jsonText = html.match(
					/<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
				)[1];
				const data = JSON.parse(jsonText);

				const postItem = data["@graph"].find(
					(item) => item["@type"] === "BlogPosting",
				);
				expect(postItem).toBeDefined();
				expect(postItem.headline).toBe(post.content[lang].title);
				expect(postItem.datePublished).toBe(post.date);
				expect(postItem.dateModified).toBe(post.updated);
				expect(postItem.inLanguage).toBe(lang);
				expect(postItem.speakable).toEqual({
					"@type": "SpeakableSpecification",
					cssSelector: [".article-title", ".prose > p:first-of-type"],
				});

				const breadcrumbs = data["@graph"].find(
					(item) => item["@type"] === "BreadcrumbList",
				);
				expect(breadcrumbs).toBeDefined();
				expect(breadcrumbs.itemListElement.at(-1)).toMatchObject({
					name: post.content[lang].title,
					item: `${SITE_URL}${post.content[lang].url}`,
				});
			}
		}
	});
});

describe("5. AEO/GEO: llms.txt and llms-full.txt", () => {
	it("generates /llms.txt adhering to llmstxt.org", () => {
		const llms = files.get("llms.txt");
		expect(llms.startsWith("# Clipey\n\n> ")).toBe(true);
		expect(llms).toContain("## Páginas Principais");
		expect(llms).toContain("## Blog e Tutoriais (Português)");
		expect(llms).toContain("## Blog and Tutorials (English)");
		expect(llms).toContain("## Blog y Tutoriales (Español)");
		expect(llms).toContain("## Informações Legais");
		expect(llms).toContain("## Documentação Completa");
		expect(llms).toContain("/llms-full.txt");
	});

	it("generates /llms-full.txt concatenating landing copy and all 18 pt-BR articles", () => {
		const full = files.get("llms-full.txt");
		expect(full).toContain("CLIPEY: ESTÚDIO DE VÍDEO PARA WINDOWS");
		expect(full).toContain("PERGUNTAS FREQUENTES (FAQ):");
		for (let i = 1; i <= 18; i++) {
			expect(full).toContain(`ARTIGO ${i}: `);
		}
		expect(full).not.toMatch(/\{\{[A-Z_]+\}\}/);
	});
});

describe("6. Feeds: RSS 2.0 and Atom 1.0", () => {
	it("serves both RSS 2.0 and Atom feeds per language", () => {
		for (const lang of LANGUAGES) {
			const base = fileForUrl(blogBase(lang)).replace("index.html", "");
			const rss = files.get(`${base}feed.xml`);
			expect(rss).toContain('<rss version="2.0"');
			expect(rss).toContain("<channel>");
			expect(rss).toContain("<title>");
			expect(rss).toContain(`<language>${lang}</language>`);

			const atom = files.get(`${base}atom.xml`);
			expect(atom).toContain('<feed xmlns="http://www.w3.org/2005/Atom">');
			expect(atom).toContain("<entry>");
			expect(atom).toContain("<id>");
			expect(atom).toContain("<updated>");

			// Legacy rss.xml for backward compat
			expect(files.get(`${base}rss.xml`)).toContain("<rss");
		}
	});
});

describe("7. Security headers in _headers", () => {
	it("includes all required security headers and cache policies", () => {
		const headers = files.get("_headers");
		expect(headers).toContain("Content-Security-Policy:");
		expect(headers).toContain(`'${THEME_SCRIPT_HASH}'`);
		expect(headers).toContain("X-Content-Type-Options: nosniff");
		expect(headers).toContain(
			"Referrer-Policy: strict-origin-when-cross-origin",
		);
		expect(headers).toContain(
			"Permissions-Policy: camera=(), microphone=(), geolocation=()",
		);
		expect(headers).toContain("Cross-Origin-Opener-Policy: same-origin");
		expect(headers).toContain("X-Frame-Options: DENY");

		// Cache policies
		expect(headers).toContain(
			"/assets/*\n  Cache-Control: public, max-age=31536000, immutable",
		);
		expect(headers).toContain("/announcements.json\n  Cache-Control: no-store");
	});
});

describe("8. Performance budget", () => {
	it("verifies landing page JS and CSS gzip sizes within budget", () => {
		const landingCss = readFileSync(path.join(root, "src/landing.css"), "utf8");
		const baseCss = readFileSync(path.join(root, "src/base.css"), "utf8");
		const tokensCss = readFileSync(path.join(root, "src/tokens.css"), "utf8");
		const framesCss = readFileSync(path.join(root, "src/frames.css"), "utf8");
		const fontsCss = readFileSync(path.join(root, "src/fonts.css"), "utf8");

		const totalCssRaw = landingCss + baseCss + tokensCss + framesCss + fontsCss;
		const cssGzip = gzipSync(Buffer.from(totalCssRaw)).length;

		expect(cssGzip).toBeLessThanOrEqual(30 * 1024);

		const landingJs = readFileSync(
			path.join(root, "src/entry-landing.js"),
			"utf8",
		);
		const chromeJs = readFileSync(path.join(root, "src/chrome.js"), "utf8");
		const jsGzip = gzipSync(Buffer.from(landingJs + chromeJs)).length;

		expect(jsGzip).toBeLessThanOrEqual(35 * 1024);
	});

	it("verifies font is preloaded, woff2 only, and has font-display: swap", () => {
		const fontsCss = readFileSync(path.join(root, "src/fonts.css"), "utf8");
		expect(fontsCss).toContain('format("woff2")');
		expect(fontsCss).not.toContain("woff;");
		expect(fontsCss).not.toContain("ttf");
		expect(fontsCss).toContain("font-display: swap;");

		const landingHtml = files.get("index.html");
		expect(landingHtml).toContain(
			'rel="preload" href="/assets/Geist-Variable.woff2" as="font" type="font/woff2" crossorigin',
		);
	});
});

describe("9. SEO: robots and canonical on every generated page (S4)", () => {
	it("emits both robots and canonical independently", () => {
		for (const [name, html] of htmlFiles) {
			if (LEGAL_OUTPUT_FILES.includes(name)) continue;
			expect(html, name).toContain('<meta name="robots" content="index,follow,max-image-preview:large">');
			expect(html, name).toContain('rel="canonical"');
		}
	});
});

describe("10. SEO: sitemap lastmod only for posts (S5)", () => {
	it("omits lastmod for landing, blog index, category, and legal entries", () => {
		const sitemap = files.get("sitemap.xml");
		for (const lang of LANGUAGES) {
			const landingLoc = `<loc>${SITE_URL}${LANDING_PATH[lang]}</loc>`;
			const landingEntry = sitemap.slice(
				sitemap.indexOf(landingLoc) - 20,
				sitemap.indexOf("</url>", sitemap.indexOf(landingLoc)) + 6,
			);
			expect(landingEntry, `landing ${lang}`).not.toContain("<lastmod>");

			const blogLoc = `<loc>${SITE_URL}${blogBase(lang)}</loc>`;
			const blogEntry = sitemap.slice(
				sitemap.indexOf(blogLoc) - 20,
				sitemap.indexOf("</url>", sitemap.indexOf(blogLoc)) + 6,
			);
			expect(blogEntry, `blog index ${lang}`).not.toContain("<lastmod>");
		}
	});

	it("includes lastmod for post entries using post.updated", () => {
		const sitemap = files.get("sitemap.xml");
		for (const post of posts) {
			for (const lang of LANGUAGES) {
				const loc = `<loc>${SITE_URL}${post.content[lang].url}</loc>`;
				const entry = sitemap.slice(
					sitemap.indexOf(loc) - 20,
					sitemap.indexOf("</url>", sitemap.indexOf(loc)) + 6,
				);
				expect(entry, post.content[lang].url).toContain(
					`<lastmod>${post.updated}</lastmod>`,
				);
			}
		}
	});
});

describe("11. SEO: blog posts have real dates (S6)", () => {
	const articleFile = (post, lang) =>
		path.join(root, "content", "blog", lang, `${post.content[lang].slug}.md`);

	it("uses literal per-article dates, with updated never before date", () => {
		for (const post of posts) {
			expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
			expect(post.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
			expect(post.updated >= post.date, post.translationKey).toBe(true);
		}
	});

	it("each article's page history opens with its own publication date", () => {
		for (const post of posts) {
			for (const lang of LANGUAGES) {
				const raw = readFileSync(articleFile(post, lang), "utf8");
				const history = raw.match(
					/^## (?:Histórico desta página|Page history|Historial de esta página)\r?\n\r?\n- (\S+): /m,
				);
				expect(history, articleFile(post, lang)).not.toBeNull();
				expect(history[1], articleFile(post, lang)).toBe(post.date);
				expect(files.get(fileForUrl(post.content[lang].url))).toContain(
					`${post.date}: `,
				);
			}
		}
	});

	it("rejects an article that still carries a template token", () => {
		const dir = mkdtempSync(path.join(tmpdir(), "clipey-post-"));
		try {
			const valid = readFileSync(articleFile(posts[0], "en"), "utf8");
			const file = path.join(dir, "post.md");
			writeFileSync(file, valid.replace(/- \S+: published\./, "- {{RELEASE_DATE}}: published."));
			expect(() => parsePostFile(file, "en")).toThrow(/unreplaced template token/);
			writeFileSync(file, valid.replace(/^date: .*$/m, 'date: "{{RELEASE_DATE}}"'));
			expect(() => parsePostFile(file, "en")).toThrow(/invalid applicability, feature flag, or dates/);
			writeFileSync(file, valid);
			expect(parsePostFile(file, "en").date).toBe(posts[0].date);
		} finally {
			rmSync(dir, { recursive: true, force: true });
		}
	});

	it("no shared release date remains anywhere in the site sources or output", () => {
		// The legal pages are protected byte-for-byte and legitimately state their own effective date; Wrangler's
		// compatibility_date is a runtime flag, not an editorial date. Everything else must be clean.
		const FORBIDDEN = /2026-09-29|29 SET|29 de setembro|September 29|Sep 29|29 de septiembre|RELEASE_DATE|\{\{[A-Z_]+\}\}/;
		const skipDirs = new Set(["node_modules", "dist", "legal-source", ".git"]);
		const textFile = /\.(mjs|js|json|jsonc|md|css|html|txt|xml)$/;
		const self = fileURLToPath(import.meta.url);
		const walk = (dir) =>
			readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
				const full = path.join(dir, entry.name);
				if (entry.isDirectory()) return skipDirs.has(entry.name) ? [] : walk(full);
				return textFile.test(entry.name) && full !== self ? [full] : [];
			});
		const hits = [];
		for (const file of walk(root)) {
			const lines = readFileSync(file, "utf8").split(/\r?\n/);
			lines.forEach((line, index) => {
				if (!FORBIDDEN.test(line)) return;
				if (path.basename(file) === "wrangler.jsonc" && /"compatibility_date"/.test(line)) return;
				hits.push(`${path.relative(root, file)}:${index + 1}`);
			});
		}
		for (const [name, content] of files) {
			if (LEGAL_OUTPUT_FILES.includes(name)) continue;
			if (FORBIDDEN.test(content)) hits.push(`output:${name}`);
		}
		expect(hits).toEqual([]);
	});
});

describe("11b. SEO: single canonical host (S7)", () => {
	it("every canonical URL uses the apex host, never www", () => {
		for (const [name, html] of htmlFiles) {
			const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
			if (canonical) expect(canonical[1], name).toMatch(/^https:\/\/clipey\.com\.br\//);
			expect(html, name).not.toContain("www.clipey.com.br");
		}
	});
});

describe("12. SEO: hero definition and BYOK FAQ (S8)", () => {
	it("renders a factual definition near the hero in each locale", () => {
		for (const lang of LANGUAGES) {
			const html = files.get(fileForUrl(LANDING_PATH[lang]));
			expect(html, lang).toContain('class="story-def"');
			expect(html, lang).toContain(STORY[lang].hero.definition);
		}
	});

	it("styles the definition with design tokens", () => {
		const css = readFileSync(path.join(root, "src", "landing.css"), "utf8");
		const rule = css.match(/\.story-def\s*\{([^}]*)\}/);
		expect(rule, ".story-def rule").not.toBeNull();
		expect(rule[1]).toMatch(/color:\s*var\(--[a-z-]+\)/);
		expect(rule[1]).not.toMatch(/#[0-9a-f]{3,8}\b/i);
	});

	it("has a BYOK FAQ entry in each locale", () => {
		for (const lang of LANGUAGES) {
			const byokEntry = STORY[lang].faq.find(([q]) =>
				/nuvem|cloud|nube/i.test(q),
			);
			expect(byokEntry, `${lang} BYOK FAQ missing`).toBeDefined();
			expect(byokEntry[1]).toMatch(/chave|key|clave/i);
		}
	});

	it("includes the BYOK FAQ in the landing JSON-LD", () => {
		for (const lang of LANGUAGES) {
			const html = files.get(fileForUrl(LANDING_PATH[lang]));
			const ld = JSON.parse(
				html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1],
			);
			const faq = ld["@graph"].find((node) => node["@type"] === "FAQPage");
			expect(faq.mainEntity.length).toBe(STORY[lang].faq.length);
		}
	});
});

describe("13. SEO: breadcrumb schema equals the visible breadcrumb (S9)", () => {
	const decode = (text) =>
		text
			.replace(/&quot;/g, '"')
			.replace(/&#39;/g, "'")
			.replace(/&lt;/g, "<")
			.replace(/&gt;/g, ">")
			.replace(/&amp;/g, "&");

	/** Reads the rendered <nav class="breadcrumb"> independently of the template: one crumb per link or current span. */
	function visibleCrumbs(html, pageUrl) {
		const nav = html.match(/<nav class="breadcrumb"[^>]*>([\s\S]*?)<\/nav>/);
		expect(nav, pageUrl).not.toBeNull();
		return [
			...nav[1].matchAll(
				/<a href="([^"]+)">([^<]*)<\/a>|<span aria-current="page">([^<]*)<\/span>/g,
			),
		].map((match, index) => ({
			position: index + 1,
			name: decode(match[2] ?? match[3]),
			item: `${SITE_URL}${match[1] ?? pageUrl}`,
		}));
	}

	function schemaCrumbs(html) {
		const ld = JSON.parse(
			html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1],
		);
		const list = ld["@graph"].filter((node) => node["@type"] === "BreadcrumbList");
		expect(list).toHaveLength(1);
		return list[0].itemListElement.map(({ position, name, item }) => ({
			position,
			name,
			item,
		}));
	}

	const pages = () => {
		const out = [];
		for (const lang of LANGUAGES) {
			out.push({ lang, kind: "index", url: blogBase(lang), depth: 2 });
			for (const key of usedCategories(posts))
				out.push({ lang, kind: "category", url: categoryUrl(lang, key), depth: 3, key });
			for (const post of posts)
				out.push({ lang, kind: "article", url: post.content[lang].url, depth: 4, post });
		}
		return out;
	};

	it("every item matches the visible nav in position, name and URL on index, category and article pages", () => {
		let checked = 0;
		for (const page of pages()) {
			const html = files.get(fileForUrl(page.url));
			const visible = visibleCrumbs(html, page.url);
			expect(schemaCrumbs(html), `${page.lang} ${page.url}`).toEqual(visible);
			expect(visible, page.url).toHaveLength(page.depth);
			checked += 1;
		}
		expect(checked).toBe(LANGUAGES.length * (1 + usedCategories(posts).length + posts.length));
	});

	it("uses the localized labels a reader sees, root to current page", () => {
		for (const page of pages()) {
			const names = visibleCrumbs(files.get(fileForUrl(page.url)), page.url).map(
				(crumb) => crumb.name,
			);
			expect(names[0]).toBe(SITE_NAME);
			expect(names[1]).toBe(UI[page.lang].nav.blog);
			if (page.kind === "category")
				expect(names[2]).toBe(CATEGORIES[page.key][page.lang].label);
			if (page.kind === "article") {
				expect(names[2]).toBe(CATEGORIES[page.post.categoryKey][page.lang].label);
				expect(names[3]).toBe(page.post.content[page.lang].title);
			}
		}
	});

	it("links the root crumb to the landing of the same language", () => {
		for (const page of pages()) {
			const [root] = visibleCrumbs(files.get(fileForUrl(page.url)), page.url);
			expect(root.item).toBe(`${SITE_URL}${LANDING_PATH[page.lang]}`);
		}
	});
});

describe("14. SEO: footer year from build date (S10)", () => {
	it("uses the current UTC year in the footer", () => {
		const year = new Date().getUTCFullYear();
		for (const lang of LANGUAGES) {
			const html = files.get(fileForUrl(LANDING_PATH[lang]));
			expect(html).toContain(`© ${year}`);
		}
		const blogHtml = files.get(fileForUrl(blogBase("pt-BR")));
		expect(blogHtml).toContain(`© ${year}`);
	});
});

describe("15. SEO: Content-Type comes from the platform, not _headers (S12)", () => {
	// Workers Static Assets stores each file's Content-Type at upload from its extension (wrangler 4.145
	// getContentType: mime@4 lookup, "; charset=utf-8" appended to text/*). Measured on this build output:
	// .json -> application/json, .xml -> application/xml, .txt -> text/plain; charset=utf-8. That is correct under
	// nosniff, so _headers must not override it: a wildcard rule would also rewrite any future special-case file.
	const PLATFORM_TYPE = {
		json: "application/json",
		xml: "application/xml",
		txt: "text/plain; charset=utf-8",
		html: "text/html; charset=utf-8",
	};

	/** Applies the generated _headers to a path the way Workers does: every matching rule contributes its headers. */
	function headersFor(pathname) {
		const rules = [];
		let current;
		for (const line of files.get("_headers").split("\n")) {
			if (!line.trim() || line.startsWith("#")) continue;
			if (!/^\s/.test(line)) {
				current = { pattern: line.trim(), headers: {} };
				rules.push(current);
			} else if (current) {
				const [name, ...value] = line.trim().split(":");
				current.headers[name.trim().toLowerCase()] = value.join(":").trim();
			}
		}
		const matches = (pattern) =>
			new RegExp(
				`^${pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*")}$`,
			).test(pathname);
		return Object.assign({}, ...rules.filter((r) => matches(r.pattern)).map((r) => r.headers));
	}

	// Served = rendered files plus the copied public/ directory (robots.txt, announcements.json, manifests).
	const publicFiles = (dir, prefix = "") =>
		readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
			entry.isDirectory()
				? publicFiles(path.join(dir, entry.name), `${prefix}${entry.name}/`)
				: [`${prefix}${entry.name}`],
		);
	const servedFiles = () =>
		[...new Set([...files.keys(), ...publicFiles(path.join(root, "public"))])]
			.filter((name) => /\.(json|xml|txt)$/.test(name) && !name.startsWith("_"))
			.map((name) => `/${name}`)
			.sort();

	it("leaves every served json, xml and txt file to the platform's correct type under nosniff", () => {
		const served = servedFiles();
		expect(served).toEqual(
			expect.arrayContaining([
				"/sitemap.xml",
				"/robots.txt",
				"/llms.txt",
				"/announcements.json",
				"/blog/rss.xml",
				"/blog/search-index.json",
			]),
		);
		for (const pathname of served) {
			const headers = headersFor(pathname);
			expect(headers["x-content-type-options"], pathname).toBe("nosniff");
			expect(headers["content-type"], pathname).toBeUndefined();
			const ext = pathname.split(".").pop();
			expect(PLATFORM_TYPE[ext], pathname).toBeDefined();
		}
	});

	it("serves XML whose encoding is declared in-document, so application/xml needs no charset", () => {
		const xml = servedFiles().filter((p) => p.endsWith(".xml"));
		expect(xml.length).toBeGreaterThan(0);
		for (const pathname of xml) {
			const body =
				files.get(pathname.slice(1)) ?? readFileSync(path.join(root, "public", pathname), "utf8");
			expect(body, pathname).toMatch(
				/^<\?xml version="1\.0" encoding="(?:UTF|utf)-8"\?>/,
			);
		}
	});

	it("keeps the announcements cache rule intact and sets no Content-Type anywhere", () => {
		expect(headersFor("/announcements.json")["cache-control"]).toBe("no-store");
		expect(files.get("_headers")).not.toMatch(/^\s+Content-Type:/im);
	});
});

describe("16. SEO: empty image alt rejection (S11)", () => {
	it("rejects empty or whitespace-only alt text in the article renderer", () => {
		expect(() => renderMarkdown("![](/blog/img/x.webp)")).toThrow(
			/empty image alt text/,
		);
		expect(() => renderMarkdown("![   ](/blog/img/x.webp)")).toThrow(
			/empty image alt text/,
		);
		expect(() =>
			renderMarkdown("![Timeline with cuts](/blog/img/x.webp)"),
		).not.toThrow();
	});

	it("all authored blog images have non-empty alt text", () => {
		for (const post of posts) {
			for (const lang of LANGUAGES) {
				const html = files.get(fileForUrl(post.content[lang].url));
				const images = [...html.matchAll(/<img class="article-image"[^>]*alt="([^"]*)"[^>]*>/g)];
				for (const match of images) {
					expect(match[1].trim(), `empty alt in ${post.content[lang].url}`).not.toBe("");
				}
			}
		}
	});
});
