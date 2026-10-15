import { describe, expect, it } from "vitest";
import {
	APP_VERSION,
	LANDING_ANCHORS,
	LANDING_PATH,
	LANGUAGES,
	LEGAL_PATHS,
	RELEASES_URL,
	SITE_URL,
} from "../src/blog/config.mjs";
import { getCompletePosts } from "../src/blog/content.mjs";
import { STORY } from "../src/landing-copy.mjs";
import {
	pageShots,
	readShotManifest,
	SHOT_FALLBACK_LOCALE,
	SHOT_WIDTHS,
	shotImg,
	shotLocale,
	shotSet,
} from "../src/landing-shots.mjs";
import {
	EDITOR_SHOT,
	EDITOR_SHOT_LIGHT,
	HERO_SHOT,
	SECTION_IDS,
	sectionAliases,
} from "../src/landing-story.mjs";
import { renderSite } from "../src/render-site.mjs";

const bundle = {
	css: ["/assets/landing.css"],
	font: "/assets/Geist-Variable.woff2",
	script: "/assets/landing.js",
};
const site = renderSite(getCompletePosts(), { landing: bundle, blog: bundle });
const pageOf = (lang) => site.get(`${LANDING_PATH[lang].slice(1)}index.html`);
const mainOf = (page) =>
	page.slice(page.indexOf("<main"), page.indexOf("</main>"));
const html = pageOf("pt-BR");
const main = mainOf(html);

const manifest = {
	locales: { en: { total: 1 }, es: { total: 1 } },
	files: {
		"wide-en-poster.webp": { width: 1400, height: 875 },
		"wide-en-800.webp": { width: 800, height: 500 },
		"wide-en-1400.webp": { width: 1400, height: 875 },
		"wide-en-2400.webp": { width: 2400, height: 1500 },
		"wide-es-poster.webp": { width: 1400, height: 875 },
		"wide-es-800.webp": { width: 800, height: 500 },
		"narrow-en-poster.webp": { width: 868, height: 2460 },
		"narrow-en-800.webp": { width: 800, height: 2267 },
		"narrow-en-1400.webp": { width: 868, height: 2460 },
		"narrow-en-2400.webp": { width: 868, height: 2460 },
	},
};

describe("landing shots", () => {
	it("lists every width of a wide shot and reserves the poster box", () => {
		expect(shotSet(manifest, "wide", "en")).toEqual({
			src: "/shots/wide-en-poster.webp",
			small: "/shots/wide-en-800.webp",
			srcset:
				"/shots/wide-en-800.webp 800w, /shots/wide-en-1400.webp 1400w, /shots/wide-en-2400.webp 2400w",
			width: 1400,
			height: 875,
		});
	});

	it("lists a capped width once when the source is narrower than 2400", () => {
		expect(shotSet(manifest, "narrow", "en").srcset).toBe(
			"/shots/narrow-en-800.webp 800w, /shots/narrow-en-1400.webp 868w",
		);
	});

	it("uses the page's UI language when it was captured and English otherwise", () => {
		expect(shotLocale(manifest, "es")).toBe("es");
		expect(shotLocale(manifest, "pt-BR")).toBe(SHOT_FALLBACK_LOCALE);
		expect(shotSet(manifest, "wide", "es").src).toBe(
			"/shots/wide-es-poster.webp",
		);
		expect(shotSet(manifest, "wide", "pt-BR").src).toBe(
			"/shots/wide-en-poster.webp",
		);
		expect(
			pageShots(manifest, "pt-BR").img("wide", { sizes: "1vw" }),
		).toContain('src="/shots/wide-en-poster.webp"');
	});

	it("fails loudly for a shot the pipeline did not produce", () => {
		expect(() => shotSet(manifest, "missing", "en")).toThrow(/missing/);
		expect(() => shotSet(manifest, "narrow", "es")).toThrow(/narrow-es/);
	});

	it("is lazy below the fold and high priority for the hero", () => {
		const lazy = shotImg(manifest, "wide", {
			lang: "en",
			alt: "A & B",
			sizes: "100vw",
		});
		expect(lazy).toContain('loading="lazy"');
		expect(lazy).toContain('alt="A &amp; B"');
		expect(lazy).toContain('width="1400" height="875"');
		const hero = shotImg(manifest, "wide", {
			lang: "en",
			sizes: "100vw",
			priority: true,
		});
		expect(hero).toContain('fetchpriority="high"');
		expect(hero).not.toContain("loading=");
	});

	it("every shot the page uses exists in the real manifest", () => {
		const real = readShotManifest();
		const names = new Set(
			[
				...html.matchAll(
					/\/shots\/([a-z0-9-]+?)-(pt-BR|en|es)-(?:poster|\d+)\.webp/g,
				),
			].map((match) => `${match[1]}|${match[2]}`),
		);
		expect(names.size).toBeGreaterThan(5);
		for (const entry of names) {
			const [name, locale] = entry.split("|");
			expect(locale).toBe(shotLocale(real, "pt-BR"));
			expect(() => shotSet(real, name, "pt-BR")).not.toThrow();
		}
		expect(SHOT_WIDTHS).toEqual([800, 1400, 2400]);
	});
});

describe.each(LANGUAGES)("%s landing structure", (lang) => {
	const page = pageOf(lang);
	const body = mainOf(page);
	const ids = SECTION_IDS[lang];

	it("has one h1, a main landmark, a header and a footer", () => {
		expect(page).toContain(`<html lang="${lang}"`);
		expect(page.match(/<h1[\s>]/g)).toHaveLength(1);
		expect(page.match(/<main id="main" class="story">/g)).toHaveLength(1);
		expect(page).toContain('<header class="titlebar" data-header>');
		expect(page).toContain('<footer class="story-footer">');
		expect(page).toContain(`aria-label="${STORY[lang].bar.chaptersAria}"`);
	});

	it("renders the chapters in the artboard order", () => {
		const positions = Object.values(ids).map((id) =>
			body.indexOf(`id="${id}"`),
		);
		for (const position of positions) expect(position).toBeGreaterThan(-1);
		expect([...positions].sort((a, b) => a - b)).toEqual(positions);
	});

	it("keeps every landing anchor the blog and older links use, each id once", () => {
		for (const id of Object.values(LANDING_ANCHORS[lang]).filter(
			(id) => id !== "blog",
		))
			expect(page).toContain(`id="${id}"`);
		const all = [...page.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
		expect(new Set(all).size).toBe(all.length);
	});

	it("links the title bar chapters and the export buttons to this page's sections", () => {
		const bar = page.slice(
			page.indexOf('<header class="titlebar"'),
			page.indexOf("</header>"),
		);
		for (const [chapter] of STORY[lang].bar.chapters)
			expect(bar).toContain(`href="#${ids[chapter]}"`);
		expect(bar).toContain(`href="#${ids.export}"`);
		expect(bar).toContain(`href="#${ids.hero}"`);
	});

	it("links the legal pages from the footer", () => {
		const footer = page.slice(page.indexOf('<footer class="story-footer">'));
		for (const url of Object.values(LEGAL_PATHS[lang]))
			expect(footer).toContain(`href="${url}"`);
	});

	it("declares every language as an hreflang alternate, x-default on pt-BR", () => {
		for (const code of LANGUAGES)
			expect(page).toContain(
				`<link rel="alternate" hreflang="${code}" href="${SITE_URL}${LANDING_PATH[code]}">`,
			);
		expect(page).toContain(
			`<link rel="alternate" hreflang="x-default" href="${SITE_URL}${LANDING_PATH["pt-BR"]}">`,
		);
		expect(page).toContain(
			`<link rel="canonical" href="${SITE_URL}${LANDING_PATH[lang]}">`,
		);
	});

	it("switches language to the other landings and marks the current one", () => {
		const group = page.match(/<div class="lang-switch"[\s\S]*?<\/div>/)[0];
		for (const code of LANGUAGES)
			expect(group).toMatch(
				new RegExp(
					`<a href="${LANDING_PATH[code]}" lang="${code}" hreflang="${code}"${code === lang ? ' aria-current="page"' : ""}>`,
				),
			);
		expect(group.match(/aria-current/g)).toHaveLength(1);
	});

	it("shows the screenshots in this language's UI when captured, in English otherwise", () => {
		const locale = shotLocale(readShotManifest(), lang);
		const used = [
			...body.matchAll(/\/shots\/[a-z0-9-]+?-(pt-BR|en|es)-[a-z0-9]+\.webp/g),
		].map((m) => m[1]);
		expect(used.length).toBeGreaterThan(5);
		expect(new Set(used)).toEqual(new Set([locale]));
	});

	it("preloads the hero poster with its srcset and fetches it first", () => {
		const hero = `${HERO_SHOT}-${shotLocale(readShotManifest(), lang)}`;
		expect(page).toContain(
			`<link rel="preload" as="image" href="/shots/${hero}-poster.webp" imagesrcset="/shots/${hero}-800.webp 800w,`,
		);
		expect(body).toMatch(
			new RegExp(
				`<img class="hero-img" src="/shots/${hero}-poster.webp"[^>]*fetchpriority="high"`,
			),
		);
	});

	it("heads the page with the timeline crop, never a recorded frame, and shows the editor further down", () => {
		const locale = shotLocale(readShotManifest(), lang);
		expect(HERO_SHOT).toBe("timeline-zoom-regions-dark");
		const start = body.indexOf('<figure class="hero-stage">');
		const stage = body.slice(start, body.indexOf("</figure>", start));
		expect(stage.match(/<img /g)).toHaveLength(1);
		expect(stage).toContain(`/shots/${HERO_SHOT}-${locale}-poster.webp`);
		expect(stage).not.toContain(EDITOR_SHOT);
		expect(
			body.indexOf(`/shots/${EDITOR_SHOT}-${locale}-poster.webp`),
		).toBeGreaterThan(body.indexOf(`id="${ids.clicks}"`));
		expect(body).toContain(`/shots/${EDITOR_SHOT_LIGHT}-${locale}-poster.webp`);
	});

	it("downloads from the latest release and shows the one version constant", () => {
		const cta = body.slice(body.indexOf(`id="${ids.export}"`));
		expect(cta).toContain(`href="${RELEASES_URL}"`);
		expect(cta).toContain(STORY[lang].export.platform);
		expect(cta).toContain(`${STORY[lang].export.version} ${APP_VERSION}`);
		expect(cta).not.toMatch(/\d+([.,]\d+)?\s?MB/);
	});

	it("has no inline style attributes and no inline script besides the theme bootstrap", () => {
		expect(page).not.toMatch(/\sstyle="/);
		expect(page).not.toMatch(/<style[\s>]/);
		expect(page).not.toMatch(/\son[a-z]+="/);
		const inline = [...page.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>/g)].filter(
			(match) => !match[1].includes("application/ld+json"),
		);
		expect(inline).toHaveLength(1);
	});

	it("gives every image a size, and every one but the hero is lazy", () => {
		const images = [...body.matchAll(/<img [^>]*>/g)].map((match) => match[0]);
		for (const image of images) {
			expect(image).toMatch(/width="\d+" height="\d+"/);
			if (!image.includes("hero-img"))
				expect(image).toContain('loading="lazy"');
		}
	});

	it("marks the overlay stage for the live demo", () => {
		expect(body).toContain("data-fx-stage");
		expect(body).toContain("data-fx-controls");
	});

	it("puts the FAQ in the JSON-LD in this language", () => {
		const ld = JSON.parse(
			page.match(
				/<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
			)[1],
		);
		const faq = ld["@graph"].find((node) => node["@type"] === "FAQPage");
		expect(faq.mainEntity.map((q) => q.name)).toEqual(
			STORY[lang].faq.map(([question]) => question),
		);
	});
});

describe("landing section anchors", () => {
	it("answers every older anchor from one chapter, never repeating a section id", () => {
		for (const lang of LANGUAGES) {
			const own = new Set(Object.values(SECTION_IDS[lang]));
			const aliases = Object.keys(SECTION_IDS[lang]).flatMap((chapter) =>
				sectionAliases(lang, chapter),
			);
			expect(new Set(aliases).size).toBe(aliases.length);
			for (const alias of aliases) expect(own.has(alias)).toBe(false);
		}
		expect(sectionAliases("pt-BR", "export")).toEqual([
			"requisitos",
			"download",
		]);
		expect(sectionAliases("es", "local")).toEqual(["privacidad", "privacy"]);
		expect(sectionAliases("en", "publish")).toEqual(["publishing"]);
	});
});

describe("landing copy in every language", () => {
	const shape = (value) =>
		Array.isArray(value)
			? value.map(shape)
			: value && typeof value === "object"
				? Object.fromEntries(
						Object.entries(value).map(([key, item]) => [key, shape(item)]),
					)
				: typeof value;

	it("has the same structure as pt-BR", () => {
		for (const lang of LANGUAGES)
			expect(shape(STORY[lang])).toEqual(shape(STORY["pt-BR"]));
	});

	it("keeps the platform, the own key or credits and the build requirement", () => {
		const platform = {
			"pt-BR": "Windows 10 e 11 · 64 bits",
			en: "Windows 10 and 11 · 64-bit",
			es: "Windows 10 y 11 · 64 bits",
		};
		const credits = {
			"pt-BR": /própria chave de API ou créditos/,
			en: /own API key or credits/,
			es: /propia clave de API o créditos/,
		};
		for (const lang of LANGUAGES) {
			const story = STORY[lang];
			expect(story.hero.platform).toBe(platform[lang]);
			expect(story.export.platform).toBe(platform[lang]);
			expect(story.export.pricing).toMatch(credits[lang]);
			expect(story.faq[0][1]).toMatch(credits[lang]);
			expect(story.export.requirements).toContain("2004");
			expect(story.export.requirements).toContain("19041");
		}
	});

	it("never calls the whole product free, only the download", () => {
		const free = /\b(gratuit[oa]|gratis|grátis|free)\b/i;
		const strings = (value) =>
			typeof value === "string"
				? [value]
				: Object.values(value).flatMap(strings);
		for (const lang of LANGUAGES) {
			const { faq, ...rest } = STORY[lang];
			const answers = faq.map(([, answer]) => answer);
			const sentences = [...strings(rest), ...answers].flatMap((text) =>
				text.split(/(?<=[.!?])\s+/),
			);
			const claims = sentences.filter((sentence) => free.test(sentence));
			expect(claims.length).toBeGreaterThan(0);
			for (const sentence of claims)
				expect(sentence).toMatch(/^(O download|The download|La descarga)\b/);
		}
	});
});

describe("v2 pt-BR hero scroll story", () => {
	const stills =
		main.match(/<ol class="story-stills"[\s\S]*?<\/ol>/)?.[0] ?? "";

	it("lists one captioned still per scroll state, in storyboard order", () => {
		expect(stills.match(/<li class="still still--\d">/g)).toHaveLength(
			STORY["pt-BR"].frames.length,
		);
		const titles = [
			...stills.matchAll(/<span class="still-title">([^<]*)<\/span>/g),
		].map((m) => m[1]);
		expect(titles).toEqual(STORY["pt-BR"].frames.map(([, title]) => title));
	});

	it("draws each state's overlay on its still", () => {
		const items = stills.split('<li class="still ').slice(1);
		expect(items[0]).not.toMatch(
			/click-ring|cut-strip|burn-caption|vertical-mask/,
		);
		expect(items[1]).toContain("click-ring");
		expect(items[3]).toContain("cut-strip");
		expect(items[4]).toContain("burn-caption");
		expect(items[5]).toContain("vertical-mask");
	});

	it("keeps the hero overlays decorative", () => {
		const shot =
			main.match(/<div class="hero-shot">[\s\S]*?<\/figure>/)?.[0] ?? "";
		for (const name of [
			"click-ring",
			"zoom-box",
			"cut-strip",
			"burn-caption",
			"vertical-mask",
		]) {
			expect(shot).toMatch(new RegExp(`class="${name}" aria-hidden="true"`));
		}
	});
});
