import { describe, expect, it } from "vitest";
import {
	APP_VERSION,
	LANDING_ANCHORS,
	LEGAL_PATHS,
	RELEASES_URL,
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
import { HERO_SHOT, STORY_SECTIONS } from "../src/landing-story.mjs";
import { renderSite } from "../src/render-site.mjs";

const bundle = {
	css: ["/assets/landing.css"],
	font: "/assets/Geist-Variable.woff2",
	script: "/assets/landing.js",
};
const html = renderSite(getCompletePosts(), {
	landing: bundle,
	blog: bundle,
}).get("index.html");
const main = html.slice(html.indexOf("<main"), html.indexOf("</main>"));
const copy = STORY["pt-BR"];

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

describe("v2 pt-BR landing structure", () => {
	it("has one h1, a main landmark, a header and a footer", () => {
		expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
		expect(html.match(/<main id="main" class="story">/g)).toHaveLength(1);
		expect(html).toContain('<header class="titlebar" data-header>');
		expect(html).toContain('<footer class="story-footer">');
		expect(html).toContain('aria-label="Capítulos"');
	});

	it("renders the chapters in the artboard order", () => {
		const order = [
			"topo",
			...Object.values(STORY_SECTIONS).map((section) => section.id),
		];
		const positions = order.map((id) => main.indexOf(`id="${id}"`));
		for (const position of positions) expect(position).toBeGreaterThan(-1);
		expect([...positions].sort((a, b) => a - b)).toEqual(positions);
	});

	it("keeps every landing anchor the blog and the header link to", () => {
		for (const id of Object.values(LANDING_ANCHORS["pt-BR"]).filter(
			(id) => id !== "blog",
		))
			expect(html).toContain(`id="${id}"`);
	});

	it("links the legal pages from the footer", () => {
		const footer = html.slice(html.indexOf('<footer class="story-footer">'));
		for (const url of Object.values(LEGAL_PATHS["pt-BR"]))
			expect(footer).toContain(`href="${url}"`);
	});

	it("preloads the hero poster with its srcset and fetches it first", () => {
		const hero = `${HERO_SHOT}-${shotLocale(readShotManifest(), "pt-BR")}`;
		expect(html).toContain(
			`<link rel="preload" as="image" href="/shots/${hero}-poster.webp" imagesrcset="/shots/${hero}-800.webp 800w,`,
		);
		expect(main).toMatch(
			new RegExp(
				`<img class="hero-img" src="/shots/${hero}-poster.webp"[^>]*fetchpriority="high"`,
			),
		);
	});

	it("downloads from the latest release and shows the one version constant", () => {
		const cta = main.slice(main.indexOf('id="exportar"'));
		expect(cta).toContain(`href="${RELEASES_URL}"`);
		expect(cta).toContain("Windows 10 e 11 · 64 bits");
		expect(cta).toContain(`Versão ${APP_VERSION}`);
		expect(cta).not.toMatch(/\d+(,\d+)?\s?MB/);
	});

	it("never says the whole product is free", () => {
		const text = main.replace(/<[^>]+>/g, " ");
		expect(text).toContain("O download é gratuito");
		expect(text).not.toMatch(
			/Clipey é gratuito\.|totalmente gratuito|100% grátis/i,
		);
		expect(copy.export.pricing).toMatch(/própria chave/);
	});

	it("has no inline style attributes and no inline script besides the theme bootstrap", () => {
		expect(html).not.toMatch(/\sstyle="/);
		const inline = [...html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>/g)].filter(
			(match) => !match[1].includes("application/ld+json"),
		);
		expect(inline).toHaveLength(1);
	});

	it("gives every image a size, and every one but the hero is lazy", () => {
		const images = [...main.matchAll(/<img [^>]*>/g)].map((match) => match[0]);
		for (const image of images) {
			expect(image).toMatch(/width="\d+" height="\d+"/);
			if (!image.includes("hero-img"))
				expect(image).toContain('loading="lazy"');
		}
	});

	it("marks the overlay stage for the live demo", () => {
		expect(main).toContain("data-fx-stage");
		expect(main).toContain("data-fx-controls");
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
