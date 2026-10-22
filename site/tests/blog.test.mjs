import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
	blogBase,
	LANDING_PATH,
	LANGUAGES,
	LEGAL_PATHS,
	SITE_URL,
} from "../src/blog/config.mjs";
import {
	getCompletePosts,
	getPosts,
	readingTime,
} from "../src/blog/content.mjs";
import { renderSitemap } from "../src/blog/feeds.mjs";
import { missingCaptures, readCaptureManifest } from "../src/blog/manifest.mjs";
import { THEME_SCRIPT, THEME_SCRIPT_HASH } from "../src/blog/shell.mjs";
import { ANALYTICS_BEACON_SRC } from "../src/headers.mjs";
import {
	fileForUrl,
	LEGAL_OUTPUT_FILES,
	renderSite,
} from "../src/render-site.mjs";

const assets = {
	css: ["/assets/x.css"],
	font: "/assets/font.woff2",
	script: "/assets/x.js",
};
const bundles = { landing: assets, blog: assets };
const posts = getCompletePosts();
const files = renderSite(posts, bundles);
const htmlFiles = [...files].filter(([name]) => name.endsWith(".html"));
const renderedHtmlFiles = htmlFiles.filter(
	([name]) => !LEGAL_OUTPUT_FILES.includes(name),
);

describe("blog pure helpers", () => {
	it("estimates reading time with a one-minute floor", () => {
		expect(readingTime("")).toBe(1);
		expect(readingTime(Array(201).fill("word").join(" "))).toBe(2);
	});

	it("lists each public page and article in the sitemap", () => {
		const sitemap = renderSitemap([
			{
				categoryKey: "news",
				date: "2026-10-15",
				updated: "2026-10-15",
				content: {
					"pt-BR": { url: "/blog/launch/" },
					en: { url: "/blog/en/launch/" },
					es: { url: "/blog/es/launch/" },
				},
			},
		]);
		expect(sitemap).toContain(`${SITE_URL}/privacidade/`);
		expect(sitemap).toContain(`${SITE_URL}/blog/en/launch/`);
	});

	it("returns an empty capture index and finds missing canonical captures", () => {
		const manifest = readCaptureManifest(
			new URL("../public/blog/images.json", import.meta.url).pathname,
		);
		expect(manifest.size).toBe(0);
		expect(
			missingCaptures(
				["/blog/img/launch/editor.webp"],
				manifest,
				"/tmp/no-public",
			),
		).toEqual(["/blog/img/launch/editor.webp"]);
	});
});

describe("the generated site", () => {
	it("renders all 54 articles, 18 per language", () => {
		expect(getPosts()).toHaveLength(18);
		expect(posts).toHaveLength(18);
		let rendered = 0;
		for (const post of posts) {
			for (const lang of LANGUAGES) {
				const html = files.get(fileForUrl(post.content[lang].url));
				expect(html, post.content[lang].url).toContain(
					`<h1 class="article-title">`,
				);
				expect(html).toContain(`<html lang="${lang}"`);
				rendered++;
			}
		}
		expect(rendered).toBe(54);
	});

	it("links the en and es alternates of every pt-BR article", () => {
		for (const post of posts) {
			const html = files.get(fileForUrl(post.content["pt-BR"].url));
			for (const lang of LANGUAGES) {
				expect(html).toContain(
					`<link rel="alternate" hreflang="${lang}" href="${SITE_URL}${post.content[lang].url}">`,
				);
			}
			expect(html).toContain(
				`<link rel="alternate" hreflang="x-default" href="${SITE_URL}${post.content["pt-BR"].url}">`,
			);
		}
	});

	it("lists every generated page in the sitemap", () => {
		const sitemap = files.get("sitemap.xml");
		const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
			(match) => match[1],
		);
		const pages = htmlFiles
			.map(([name]) => name)
			.filter((name) => name !== "404.html")
			.map((name) => `${SITE_URL}/${name.replace(/index\.html$/, "")}`);
		expect(pages.length).toBeGreaterThan(54);
		expect(locations.filter((loc) => !pages.includes(loc))).toEqual([]);
		expect(pages.filter((page) => !locations.includes(page))).toEqual([]);
		for (const lang of LANGUAGES)
			expect(locations).toContain(`${SITE_URL}${LANDING_PATH[lang]}`);
		expect(locations).toContain(`${SITE_URL}${LEGAL_PATHS["pt-BR"].privacy}`);
		expect(locations).toContain(`${SITE_URL}${LEGAL_PATHS.en.deletion}`);
	});

	it("serves a feed and a search index per language", () => {
		for (const lang of LANGUAGES) {
			const base = fileForUrl(blogBase(lang)).replace("index.html", "");
			expect(files.get(`${base}rss.xml`)).toContain("<rss");
			const index = JSON.parse(files.get(`${base}search-index.json`));
			expect(index).toHaveLength(18);
			expect(index[0].url.startsWith(blogBase(lang))).toBe(true);
		}
	});

	it("prints no placeholder text from a missing string", () => {
		for (const [name, html] of htmlFiles) {
			expect(html, name).not.toMatch(/undefined|\[object Object\]|NaN/);
		}
	});

	it("loads nothing from another origin", () => {
		const own = new URL(SITE_URL).host;
		for (const [name, html] of renderedHtmlFiles) {
			const resources = [
				...html.matchAll(
					/<(?:link|script|img|iframe|source|video|audio)\b[^>]*>/g,
				),
			]
				.map((match) => match[0])
				.filter((tag) => !/rel="(?:canonical|alternate)"/.test(tag));
			for (const tag of resources) {
				for (const [, url] of tag.matchAll(
					/\b(?:src|href)="(https?:\/\/[^"]+)"/g,
				))
					expect(new URL(url).host, `${name}: ${tag}`).toBe(own);
			}
			expect(html, name).not.toMatch(
				/googletagmanager|google-analytics|gtag\(|fonts\.googleapis|turnstile/,
			);
		}
	});

	it("keeps every inline script to the theme bootstrap", () => {
		for (const [name, html] of renderedHtmlFiles) {
			const inline = [
				...html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g),
			];
			for (const [, attributes, body] of inline) {
				if (attributes.includes("application/ld+json")) continue;
				expect(body, name).toBe(THEME_SCRIPT);
			}
		}
	});

	it("names the theme bootstrap hash in the CSP script-src", () => {
		const recomputed = `sha256-${createHash("sha256").update(THEME_SCRIPT).digest("base64")}`;
		expect(THEME_SCRIPT_HASH).toBe(recomputed);
		const headers = files.get("_headers");
		const csp = headers.match(/Content-Security-Policy: (.+)/)[1];
		const scriptSrc = csp
			.split(";")
			.find((part) => part.trim().startsWith("script-src"));
		expect(scriptSrc).toContain(`'${THEME_SCRIPT_HASH}'`);
		// The one other origin is the Cloudflare Web Analytics beacon, as a path prefix in script-src only.
		expect(scriptSrc).toContain(
			" https://static.cloudflareinsights.com/beacon.min.js/ ",
		);
		expect(csp.replace(ANALYTICS_BEACON_SRC, "")).not.toMatch(/https?:/);
		const connectSrc = csp
			.split(";")
			.find((part) => part.trim().startsWith("connect-src"));
		expect(connectSrc.trim()).toBe("connect-src 'self'");
		for (const [name, html] of renderedHtmlFiles) {
			const bootstrap = html.match(/<script>([^<]*)<\/script>/)?.[1];
			expect(bootstrap, name).toBeDefined();
			expect(
				`sha256-${createHash("sha256").update(bootstrap).digest("base64")}`,
				name,
			).toBe(THEME_SCRIPT_HASH);
		}
	});

	it("never sets one header in two overlapping rules", () => {
		const headers = files.get("_headers");
		const rules = headers
			.split(/\n(?=\S)/)
			.filter((rule) => !rule.startsWith("#"));
		const cacheRules = rules.filter((rule) => rule.includes("Cache-Control"));
		expect(cacheRules.every((rule) => !rule.startsWith("/*"))).toBe(true);
	});

	it("keeps announcements.json byte-identical to round 1", () => {
		const published = readFileSync(
			new URL("../public/announcements.json", import.meta.url),
		);
		expect(createHash("sha256").update(published).digest("hex")).toBe(
			"da6fa0fb6dc64a3faf1f81f830b8696ccf02b9c654135111429090fa240870f8",
		);
	});
});
