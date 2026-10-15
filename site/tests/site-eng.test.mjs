import { readFileSync } from "node:fs";
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
	RELEASE_DATE,
	RELEASES_URL,
	SITE_NAME,
	SITE_URL,
} from "../src/blog/config.mjs";
import { getCompletePosts, renderMarkdown } from "../src/blog/content.mjs";
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
		expect(sitemap).not.toContain("{{RELEASE_DATE}}");
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
			expect(rawString).not.toContain("{{RELEASE_DATE}}");
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
	it("uses actual editorial dates, not the release date constant", () => {
		for (const post of posts) {
			expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
			expect(post.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
			expect(post.date, post.translationKey).not.toBe(RELEASE_DATE);
			expect(post.updated >= post.date, post.translationKey).toBe(true);
		}
	});

	it("front matter carries literal dates, never the release placeholder", () => {
		for (const post of posts) {
			for (const lang of LANGUAGES) {
				const file = path.join(
					root,
					"content",
					"blog",
					lang,
					`${post.content[lang].slug}.md`,
				);
				const frontMatter = readFileSync(file, "utf8").split(/\r?\n---/)[0];
				expect(frontMatter, file).not.toContain("{{RELEASE_DATE}}");
			}
		}
	});
});

describe("11b. SEO: single canonical host (S7)", () => {
	it("binds only the apex domain; www is redirected at the zone", () => {
		const wrangler = readFileSync(path.join(root, "wrangler.jsonc"), "utf8");
		expect(wrangler).toContain('"pattern": "clipey.com.br"');
		expect(wrangler).not.toContain("www.clipey.com.br");
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

describe("13. SEO: blog index/category BreadcrumbList (S9)", () => {
	it("blog index has visible breadcrumbs and BreadcrumbList JSON-LD", () => {
		for (const lang of LANGUAGES) {
			const html = files.get(fileForUrl(blogBase(lang)));
			expect(html).toContain('class="breadcrumb"');
			expect(html).toContain(`<a href="${LANDING_PATH[lang]}">${SITE_NAME}</a>`);

			const ld = JSON.parse(
				html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1],
			);
			const breadcrumbs = ld["@graph"].find(
				(item) => item["@type"] === "BreadcrumbList",
			);
			expect(breadcrumbs).toBeDefined();
			expect(breadcrumbs.itemListElement).toHaveLength(2);
			expect(breadcrumbs.itemListElement[0].name).toBe(SITE_NAME);
		}
	});

	it("category pages have 3-level breadcrumbs matching the visible nav", () => {
		for (const lang of LANGUAGES) {
			for (const key of usedCategories(posts)) {
				const html = files.get(fileForUrl(categoryUrl(lang, key)));
				expect(html).toContain('class="breadcrumb"');
				expect(html).toContain(`<a href="${blogBase(lang)}">Blog</a>`);

				const ld = JSON.parse(
					html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1],
				);
				const breadcrumbs = ld["@graph"].find(
					(item) => item["@type"] === "BreadcrumbList",
				);
				expect(breadcrumbs).toBeDefined();
				expect(breadcrumbs.itemListElement).toHaveLength(3);
				expect(breadcrumbs.itemListElement[2].name).toBe(
					CATEGORIES[key][lang].label,
				);
			}
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

describe("15. SEO: Content-Type headers (S12)", () => {
	it("includes explicit Content-Type rules for json, xml, and txt", () => {
		const headers = files.get("_headers");
		expect(headers).toContain("/*.json\n  Content-Type: application/json; charset=utf-8");
		expect(headers).toContain("/*.xml\n  Content-Type: application/xml; charset=utf-8");
		expect(headers).toContain("/*.txt\n  Content-Type: text/plain; charset=utf-8");
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
