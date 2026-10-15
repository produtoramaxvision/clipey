import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import { describe, expect, it } from "vitest";
import {
	blogBase,
	LANDING_PATH,
	LANGUAGES,
	OWNER,
	RELEASE_DATE,
	SITE_NAME,
	SITE_URL,
} from "../src/blog/config.mjs";
import { getCompletePosts } from "../src/blog/content.mjs";
import { THEME_SCRIPT_HASH } from "../src/blog/shell.mjs";
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
		expect(sitemap).not.toContain("{{RELEASE_DATE}}");
	});
});

describe("3. Head tags on every page", () => {
	it("includes canonical, hreflang alternates, og:*, twitter:*, theme-color, and icons", () => {
		for (const [name, html] of htmlFiles) {
			if (LEGAL_OUTPUT_FILES.includes(name)) continue;

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
			expect(rawString).not.toContain("{{RELEASE_DATE}}");
			expect(rawString).not.toContain("undefined");
			expect(rawString).not.toContain("null");
		}
	});

	it("landings have SoftwareApplication and FAQPage without offers", () => {
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
			expect(app.offers).toBeUndefined();

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
				expect(postItem.datePublished).toBe(RELEASE_DATE);
				expect(postItem.dateModified).toBe(RELEASE_DATE);
				expect(postItem.inLanguage).toBe(lang);
				expect(postItem.speakable).toEqual({
					"@type": "SpeakableSpecification",
					cssSelector: [".article-title", ".prose > p:first-of-type"],
				});

				const breadcrumbs = data["@graph"].find(
					(item) => item["@type"] === "BreadcrumbList",
				);
				expect(breadcrumbs).toBeDefined();
				expect(breadcrumbs.itemListElement).toHaveLength(3);
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
		expect(full).not.toContain("{{RELEASE_DATE}}");
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
