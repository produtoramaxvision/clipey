import { describe, expect, it } from "vitest";
import { readingTime } from "../src/blog/content.mjs";
import { buildTeasers } from "../src/blog/teasers.mjs";
import { missingCaptures, readCaptureManifest } from "../src/blog/manifest.mjs";
import { renderSitemap } from "../src/blog/template.mjs";

describe("blog pure helpers", () => {
	it("estimates reading time with a one-minute floor", () => {
		expect(readingTime("")).toBe(1);
		expect(readingTime(Array(201).fill("word").join(" "))).toBe(2);
	});

	it("builds localized teaser lists and excludes missing translations", () => {
		const posts = [{ translationKey: "launch", content: {
			"pt-BR": { title: "Lançamento", description: "Resumo", category: "novidades", url: "/blog/lancamento/" },
			en: { title: "Launch", description: "Summary", category: "news", url: "/blog/en/launch/" },
			es: { title: "Lanzamiento", description: "Resumen", category: "novedades", url: "/blog/es/lanzamiento/" },
		} }];
		const teasers = buildTeasers(posts);
		expect(teasers["pt-BR"]).toHaveLength(1);
		expect(teasers.en[0].title).toBe("Launch");
		expect(buildTeasers([{ translationKey: "draft", content: { "pt-BR": posts[0].content["pt-BR"] } }]).en).toHaveLength(0);
	});

	it("lists each public page and article in the sitemap", () => {
		const sitemap = renderSitemap([{ content: { "pt-BR": { url: "/blog/launch/" }, en: { url: "/blog/en/launch/" } } }]);
		expect(sitemap).toContain("https://clipey.com.br/privacidade/");
		expect(sitemap).toContain("https://clipey.com.br/blog/en/launch/");
	});

	it("returns an empty capture index and finds missing canonical captures", () => {
		const manifest = readCaptureManifest(new URL("../public/blog/images.json", import.meta.url).pathname);
		expect(manifest.size).toBe(0);
		expect(missingCaptures(["/blog/img/launch/editor.webp"], manifest, "/tmp/no-public")).toEqual(["/blog/img/launch/editor.webp"]);
	});
});
