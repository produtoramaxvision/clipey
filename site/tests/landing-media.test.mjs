import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
	MEDIA_FALLBACK_LOCALE,
	pageMedia,
	readMediaManifest,
	stillImg,
	stillLocale,
	stillSet,
	VIDEOS,
	videoPoster,
} from "../src/landing-media.mjs";

const publicDir = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"../public",
);

const manifest = {
	stills: { bar: ["pt-BR"], shot: ["pt-BR", "en"] },
	files: {
		"bar-pt-BR-800.webp": { width: 800, height: 72 },
		"bar-pt-BR-1941.webp": { width: 1941, height: 174 },
		"shot-pt-BR-800.webp": { width: 800, height: 430 },
		"shot-pt-BR-1400.webp": { width: 1400, height: 753 },
		"shot-pt-BR-1920.webp": { width: 1920, height: 1032 },
		"shot-en-800.webp": { width: 800, height: 430 },
		"shot-en-1400.webp": { width: 1400, height: 753 },
		"shot-en-1920.webp": { width: 1920, height: 1032 },
	},
};

describe("landing media", () => {
	it("lists every width of a still, largest as src, and reserves its box", () => {
		expect(stillSet(manifest, "shot", "en")).toEqual({
			locale: "en",
			src: "/media/shot-en-1920.webp",
			poster: "/media/shot-en-1400.webp",
			srcset:
				"/media/shot-en-800.webp 800w, /media/shot-en-1400.webp 1400w, /media/shot-en-1920.webp 1920w",
			width: 1920,
			height: 1032,
		});
	});

	it("falls back to pt-BR for a language that was not captured", () => {
		expect(MEDIA_FALLBACK_LOCALE).toBe("pt-BR");
		expect(stillLocale(manifest, "bar", "es")).toBe("pt-BR");
		expect(stillSet(manifest, "bar", "en").src).toBe("/media/bar-pt-BR-1941.webp");
		expect(pageMedia(manifest, "es").img("shot", { sizes: "1vw" })).toContain(
			'src="/media/shot-pt-BR-1920.webp"',
		);
	});

	it("fails loudly for a still the pipeline did not produce", () => {
		expect(() => stillSet(manifest, "missing", "en")).toThrow(/missing/);
	});

	it("is lazy unless asked for priority, and escapes the alt text", () => {
		const lazy = stillImg(manifest, "shot", { lang: "en", alt: "A & B", sizes: "50vw" });
		expect(lazy).toContain('loading="lazy"');
		expect(lazy).toContain('alt="A &amp; B"');
		expect(lazy).toContain('width="1920" height="1032"');
		expect(stillImg(manifest, "shot", { lang: "en", sizes: "1vw", priority: true })).toContain(
			'fetchpriority="high"',
		);
	});

	it("resolves a still poster per language and keeps a URL poster as it is", () => {
		expect(videoPoster(manifest, { poster: { still: "shot" } }, "en")).toBe(
			"/media/shot-en-1400.webp",
		);
		expect(videoPoster(manifest, { poster: "/media/x.jpg" }, "en")).toBe("/media/x.jpg");
	});

	it("has every file the real manifest and the video slots name in public/media", () => {
		const real = readMediaManifest();
		for (const file of Object.keys(real.files))
			expect(fs.existsSync(path.join(publicDir, "media", file)), file).toBe(true);
		for (const video of Object.values(VIDEOS)) {
			for (const [src] of video.sources)
				expect(fs.existsSync(path.join(publicDir, src)), src).toBe(true);
			for (const lang of ["pt-BR", "en", "es"])
				expect(fs.existsSync(path.join(publicDir, videoPoster(real, video, lang)))).toBe(true);
		}
		expect(VIDEOS.tour.sources.map(([, type]) => type)).toEqual(["video/mp4", "video/webm"]);
	});
});
