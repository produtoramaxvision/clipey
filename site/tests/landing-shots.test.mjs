import { describe, expect, it } from "vitest";
import {
	pageShots,
	SHOT_FALLBACK_LOCALE,
	shotImg,
	shotLocale,
	shotSet,
} from "../src/landing-shots.mjs";
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
});
