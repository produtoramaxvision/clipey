import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
	LANDING_ANCHORS,
	LANDING_PATH,
	LANGUAGES,
	LEGAL_PATHS,
	RELEASES_URL,
	SITE_URL,
} from "../src/blog/config.mjs";
import { getCompletePosts } from "../src/blog/content.mjs";
import { UI } from "../src/blog/i18n.mjs";
import { FLAGS, readMediaManifest, stillLocale, VIDEOS, videoPoster } from "../src/landing-media.mjs";
import {
	OWNER_LINK,
	SECTION_IDS,
	sectionAliases,
	VERSION_LABEL,
} from "../src/landing-v3.mjs";
import { LANDING } from "../src/landing-v3-copy.mjs";
import { renderSite } from "../src/render-site.mjs";

const bundle = {
	css: ["/assets/landing.css"],
	font: "/assets/Geist-Variable.woff2",
	script: "/assets/landing.js",
};
const site = renderSite(getCompletePosts(), { landing: bundle, blog: bundle });
const pageOf = (lang) => site.get(`${LANDING_PATH[lang].slice(1)}index.html`);
const between = (text, start, end) => {
	const from = text.indexOf(start);
	return text.slice(from, text.indexOf(end, from) + end.length);
};
const sectionOf = (page, id) =>
	page.slice(
		page.lastIndexOf("<section", page.indexOf(`id="${id}"`)),
		page.indexOf("</section>", page.indexOf(`id="${id}"`)),
	);

describe.each(LANGUAGES)("%s v3 landing", (lang) => {
	const page = pageOf(lang);
	const main = between(page, "<main", "</main>");
	const ids = SECTION_IDS[lang];
	const copy = LANDING[lang];

	it("has one h1, a main landmark, a header and a footer", () => {
		expect(page).toContain(`<html lang="${lang}"`);
		expect(page.match(/<h1[\s>]/g)).toHaveLength(1);
		expect(page.match(/<main id="main" class="lp">/g)).toHaveLength(1);
		expect(page).toContain('<header class="lp-header">');
		expect(page).toContain('<footer class="lp-footer">');
	});

	it("renders the sections in the artboard order", () => {
		const positions = Object.values(ids).map((id) => main.indexOf(`id="${id}"`));
		for (const position of positions) expect(position).toBeGreaterThan(-1);
		expect([...positions].sort((a, b) => a - b)).toEqual(positions);
	});

	it("keeps every landing anchor the blog and older links use, each id once", () => {
		for (const id of Object.values(LANDING_ANCHORS[lang]).filter((id) => id !== "blog"))
			expect(page).toContain(`id="${id}"`);
		const all = [...page.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
		expect(new Set(all).size).toBe(all.length);
	});

	it("links the header to this page's sections, the blog and the download", () => {
		const header = between(page, '<header class="lp-header">', "</header>");
		for (const [chapter] of copy.nav.items) expect(header).toContain(`href="#${ids[chapter]}"`);
		expect(header).toContain(`href="#${ids.download}"`);
		expect(header).toContain('id="menu-toggle"');
		expect(header).toContain('aria-controls="mobile-menu"');
	});

	it("offers the theme switch the blog has, since the page honours a saved light theme", () => {
		const header = between(page, '<header class="lp-header">', "</header>");
		const button = header.match(/<button type="button" class="icon-btn lp-theme-toggle" data-theme-toggle[^>]*>/)?.[0];
		expect(button).toBeDefined();
		expect(button).toContain(`data-label-light="${UI[lang].themeToLight}"`);
		expect(button).toContain(`data-label-dark="${UI[lang].themeToDark}"`);
		expect(header).toContain('class="theme-icon-dark"');
		expect(header).toContain('class="theme-icon-light"');
	});

	it("switches language to the other landings and marks the current one", () => {
		const group = page.match(/<div class="lang-switch"[\s\S]*?<\/div>/)[0];
		for (const code of LANGUAGES)
			expect(group).toContain(`<a href="${LANDING_PATH[code]}" lang="${code}" hreflang="${code}"`);
		expect(group.match(/aria-current/g)).toHaveLength(1);
	});

	it("declares every language as an hreflang alternate, x-default on pt-BR", () => {
		for (const code of LANGUAGES)
			expect(page).toContain(
				`<link rel="alternate" hreflang="${code}" href="${SITE_URL}${LANDING_PATH[code]}">`,
			);
		expect(page).toContain(
			`<link rel="alternate" hreflang="x-default" href="${SITE_URL}${LANDING_PATH["pt-BR"]}">`,
		);
	});

	it("gives each button group one shared width and names all three systems", () => {
		const pair = between(main, '<div class="cta-group cta-group--pair cta-group--wide">', "</div>");
		expect(pair).toContain(copy.hero.cta[0]);
		expect(pair).toContain(copy.hero.cta[1]);
		expect(`${copy.hero.cta.join(" ")}`).toMatch(/Windows[\s\S]*macOS[\s\S]*Linux/);
		const trio = between(main, '<div class="cta-group cta-group--trio"', "</div>");
		expect(trio.match(/<a /g)).toHaveLength(3);
		expect(trio.match(new RegExp(`href="${RELEASES_URL}"`, "g"))).toHaveLength(3);
		for (const [index, os] of ["Windows", "macOS", "Linux"].entries())
			expect(copy.download.buttons[index]).toContain(os);
	});

	it("preloads the editor tour poster first; the video has no autoplay, preloads nothing and keeps native controls for visitors without scripts", () => {
		expect(page).toContain(
			`<link rel="preload" as="image" href="${videoPoster(readMediaManifest(), VIDEOS.tour, lang)}" fetchpriority="high">`,
		);
		const video = between(main, '<video class="vslot-video"', "</video>");
		expect(video).toContain('muted loop playsinline preload="none" controls');
		expect(main).not.toContain("autoplay");
		expect(video).toContain(`poster="/media/clipey-editor-tour-${lang}-poster.jpg"`);
		expect(video).toContain(`src="/media/clipey-editor-tour-${lang}.mp4"`);
		expect(video).toContain('width="1600" height="860"');
		expect(video.indexOf("video/mp4")).toBeLessThan(video.indexOf("video/webm"));
		expect(main).toContain("data-vslot-toggle");
	});

	it("renders no captions video until its recording exists: the Captions tab shows its drawn demo instead", () => {
		expect(VIDEOS.captions.sources).toEqual([]);
		expect(main).not.toContain("captions-figure");
		expect(main).not.toContain("captions-poster");
		expect(main).toContain('class="stage-in cap2"');
		// The hero, the Edit tab and (while the footage flag is on) the games stage are the video slots.
		expect(main.match(/data-vslot[\s>]/g)).toHaveLength(FLAGS.gamesFootage ? 3 : 2);
	});

	it("shows the features as radio tabs that work without scripts, one panel each, the first checked", () => {
		const keys = ["edit", "clip", "cap", "voice", "cam"];
		const radios = [...main.matchAll(/<input type="radio" name="ft" id="ft-(\w+)" class="ft-input" aria-controls="ft-panel-\w+"( checked)?>/g)];
		expect(radios.map((m) => m[1])).toEqual(keys);
		expect(radios.map((m) => Boolean(m[2]))).toEqual([true, false, false, false, false]);
		for (const key of keys) {
			expect(main).toContain(`<label for="ft-${key}" class="ft-tab`);
			expect(main).toContain(`id="ft-panel-${key}"`);
			expect(main).toContain(copy.edit.tabs[key].title.replace(/"/g, "&quot;"));
		}
		expect(main.match(/<ol class="steps">/g)).toHaveLength(5);
		expect(main).toContain(`/media/clipey-tab-edit-${lang}.mp4`);
	});

	it("draws the Captions demo with this language's pane and target, and the transcript of the Auto Clip demo", () => {
		expect(main).toContain(`/media/captions-pane-${lang}-756.webp`);
		expect(main).toContain(`/media/captions-clean-${lang}-991.webp`);
		expect(main).toContain(`class="cap2-p cap2-p--${lang === "pt-BR" ? "pt" : "es"}"`);
		const clip = copy.edit.tabs.clip.stage;
		for (const [, reason] of clip.lines.filter(([, reason]) => reason)) expect(main).toContain(`<em>${reason}</em>`);
		expect(main).toContain(clip.apply);
	});

	it("lists the agents as a rail, with a pause button for every looping demo", () => {
		const agents = sectionOf(page, ids.agents);
		expect(agents.match(/<li class="rail-t">/g)).toHaveLength(7);
		for (const name of ["Claude Code", "Codex", "Cursor", "OpenCode", "Antigravity", "Grok", "mvcode"])
			expect(agents).toContain(`<b>${name}</b>`);
		expect(agents).toContain('<img class="agent-img" src="/media/mvcode-mark.png"');
		// The strip, the tabs, the agents and the games each move only with their own pause button.
		expect(main.match(/ data-demo>/g)).toHaveLength(4);
		expect(main.match(/data-demo-toggle/g)).toHaveLength(4);
	});

	it("credits the third-party gameplay whenever it is shown, and draws the controller over it", () => {
		const games = sectionOf(page, ids.games);
		expect(games).toContain('<svg class="g3d-pad" aria-hidden="true" viewBox="0 0 240 150">');
		expect(games.includes("games-credit")).toBe(FLAGS.gamesFootage);
		expect(games.includes("clipey-games")).toBe(FLAGS.gamesFootage);
		if (!FLAGS.gamesFootage) expect(games.match(/<svg class="game-scene"/g)).toHaveLength(2);
		if (FLAGS.gamesFootage) {
			expect(games).toContain("<i>Session: Skate Sim</i>");
			expect(games).toContain("<i>MTG – Motocross The Game</i>");
			expect(games).toContain("/media/clipey-games.mp4");
		}
		expect(games.match(/<figure class="gcard">/g)).toHaveLength(3);
		expect(games).toContain(`wz--${lang}`);
	});

	it("tours the recording bar with the app's own labels, decorative tips and a real list", () => {
		const hud = between(main, `<figure class="hud hud--${stillLocale(readMediaManifest(), "hud-bar", lang)}" data-hud>`, "</figure>");
		const tips = [...hud.matchAll(/<span class="hud-tip hud-slot--(\d+)" aria-hidden="true">([^<]*)<\/span>/g)];
		expect(tips.map((m) => Number(m[1]))).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
		expect(tips.map((m) => m[2])).toEqual(copy.record.hud.labels.map((label) => label.replace(/'/g, "&#39;")));
		const legend = between(hud, '<ol class="hud-legend"', "</ol>");
		expect(legend.match(/<li>/g)).toHaveLength(10);
		expect(hud.match(/class="hud-ring hud-slot--\d+" aria-hidden="true"/g)).toHaveLength(10);
		const locale = stillLocale(readMediaManifest(), "hud-bar", lang);
		expect(hud).toContain(`/media/hud-bar-${locale}-1941.webp`);
		expect(hud).toContain("data-hud-toggle");
	});

	it("never publishes a placeholder phone frame: the phone appears only with its real screens", () => {
		const phone = sectionOf(page, ids.phone);
		expect(phone).not.toMatch(/captura real|real capture/);
		expect(phone.includes('class="phone-demo"')).toBe(FLAGS.phoneScreens);
		if (!FLAGS.phoneScreens) expect(phone).toContain('class="phone-card phone-card--copy"');
	});

	it.runIf(FLAGS.phoneScreens)("rotates the phone with a real checkbox and its label", () => {
		const phone = sectionOf(page, ids.phone);
		expect(phone).toContain('<input type="checkbox" id="rotate-phone" class="rotate-input">');
		expect(phone).toContain(`<label for="rotate-phone" class="rotate-btn">`);
		expect(phone).toContain(copy.phone.rotate);
		expect(phone).toContain('class="phone-stage" data-anim>');
		expect(phone).toContain(`/media/phone-portrait-${stillLocale(readMediaManifest(), "phone-portrait", lang)}-`);
		// The checked state shows a check mark in place of the rotate icon, not only a colour.
		expect(phone).toContain('class="rotate-icon"');
		expect(phone).toContain('class="rotate-check"');
	});

	it("shows the publish and settings captures in this language", () => {
		for (const name of ["export", "settings-transcription"])
			expect(main).toContain(`/media/${name}-${stillLocale(readMediaManifest(), name, lang)}-1920.webp`);
		expect(stillLocale(readMediaManifest(), "export", lang)).toBe(lang);
	});

	it("links the legal pages and MaxVision from the footer, with rel=noopener exactly", () => {
		const footer = between(page, '<footer class="lp-footer">', "</footer>");
		for (const url of Object.values(LEGAL_PATHS[lang])) expect(footer).toContain(`href="${url}"`);
		expect(footer).toContain(`<a href="${OWNER_LINK}" rel="noopener">Produtora MaxVision</a>`);
		expect(OWNER_LINK).toBe("https://link.produtoramaxvision.com.br/maxvision-clipey");
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

	it("reserves the box of every image and video, and lazy-loads every image below the header", () => {
		for (const tag of main.match(/<(?:img|video) [^>]*>/g)) expect(tag).toMatch(/width="\d+" height="\d+"/);
		for (const tag of main.match(/<img [^>]*>/g)) expect(tag).toContain('loading="lazy"');
	});

	it("carries no FAQPage markup, since the page shows no FAQ", () => {
		const ld = JSON.parse(page.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
		const types = ld["@graph"].map((node) => node["@type"]);
		expect(types).toEqual(["Organization", "WebSite", "SoftwareApplication"]);
	});

	it("titles the download section in this language, with the accent dot added once by the markup", () => {
		const title = { "pt-BR": "Download", en: "Download", es: "Descarga" }[lang];
		expect(copy.download.title).toBe(title);
		expect(main).toContain(
			`<h2 class="mega" id="download-title">${title}<span class="accent" aria-hidden="true">.</span></h2>`,
		);
	});

	it("writes the version once, from the app version", () => {
		expect(main).toContain(`Clipey ${VERSION_LABEL}`);
		expect(main).not.toContain("{version}");
	});
});

describe("v3 landing captions slot", () => {
	it("becomes a lazy video slot with its caption as soon as the recording has a source", () => {
		VIDEOS.captions.sources.push(["/media/captions.mp4", "video/mp4"]);
		try {
			const page = renderSite(getCompletePosts(), { landing: bundle, blog: bundle }).get("index.html");
			const figure = between(page, '<div class="stage-in stage-in--video captions-figure">', "</video>");
			expect(figure).toContain("data-vslot-lazy");
			expect(figure).toContain('<source data-src="/media/captions.mp4" type="video/mp4">');
			expect(figure).toContain(`poster="/media/captions-poster-pt-BR-1400.webp"`);
			expect(figure).toContain(`aria-label="${LANDING["pt-BR"].edit.captionsLabel}"`);
			expect(page).not.toContain('class="stage-in cap2"');
		} finally {
			VIDEOS.captions.sources.length = 0;
		}
	});
});

describe("v3 landing rotate button", () => {
	const css = readFileSync(new URL("../src/landing.css", import.meta.url), "utf8");
	const tokens = readFileSync(new URL("../src/tokens.css", import.meta.url), "utf8");
	const block = (selector) => tokens.slice(tokens.indexOf(`${selector} {`), tokens.indexOf("}", tokens.indexOf(`${selector} {`)));
	const themes = { dark: block(":root"), light: block(':root[data-theme="light"]') };
	const token = (theme, name) =>
		(themes[theme].match(new RegExp(`--${name}: (#[0-9a-f]{6});`)) ?? themes.dark.match(new RegExp(`--${name}: (#[0-9a-f]{6});`)))[1];
	const luminance = (hex) => {
		const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
		return 0.2126 * r + 0.7152 * g + 0.0722 * b;
	};
	const contrast = (a, b) => {
		const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
		return (hi + 0.05) / (lo + 0.05);
	};

	it("marks the checked state in --accent-text on --accent-soft", () => {
		const checked = css.slice(css.indexOf(".rotate-input:checked + .rotate-btn {"), css.indexOf("}", css.indexOf(".rotate-input:checked + .rotate-btn {")));
		expect(checked).toContain("border-color: var(--accent-text)");
		expect(checked).toContain("background: var(--accent-soft)");
		expect(checked).toContain("color: var(--accent-text)");
	});

	it.each(["dark", "light"])("keeps the checked state at 3:1 or more in the %s theme", (theme) => {
		const ink = token(theme, "accent-text");
		for (const ground of ["accent-soft", "surface", "bg"])
			expect(contrast(ink, token(theme, ground)), `${ink} on --${ground}`).toBeGreaterThanOrEqual(3);
	});
});

describe("v3 landing anchors", () => {
	it("answers every older anchor from one section, never repeating a section id", () => {
		for (const lang of LANGUAGES) {
			const own = new Set(Object.values(SECTION_IDS[lang]));
			const aliases = Object.keys(SECTION_IDS[lang]).flatMap((chapter) => sectionAliases(lang, chapter));
			expect(new Set(aliases).size).toBe(aliases.length);
			for (const alias of aliases) expect(own.has(alias)).toBe(false);
		}
		expect(sectionAliases("pt-BR", "download")).toEqual(["download", "faq", "exportar"]);
		expect(sectionAliases("pt-BR", "compat")).toEqual(["requisitos"]);
		expect(sectionAliases("es", "local")).toEqual(["privacidad", "privacy"]);
	});
});

describe("v3 landing copy", () => {
	const shape = (value) =>
		Array.isArray(value)
			? value.map(shape)
			: value && typeof value === "object"
				? Object.fromEntries(Object.entries(value).map(([key, item]) => [key, shape(item)]))
				: typeof value;
	const strings = (value) =>
		typeof value === "string" ? [value] : Object.values(value).flatMap(strings);

	it("has the same structure in every language", () => {
		for (const lang of LANGUAGES) expect(shape(LANDING[lang])).toEqual(shape(LANDING["pt-BR"]));
	});

	it("keeps the facts: 15 languages, three systems, unsigned installers, private YouTube uploads", () => {
		const facts = {
			"pt-BR": [/15 idiomas/, /sem assinatura/, /privados, até a aprovação do Google/],
			en: [/15 languages/, /unsigned/, /private, until Google's approval/],
			es: [/15 idiomas/, /sin firmar/, /privados, hasta la aprobación de Google/],
		};
		for (const lang of LANGUAGES) {
			const all = strings(LANDING[lang]).join("\n");
			for (const fact of facts[lang]) expect(all).toMatch(fact);
			expect(`${LANDING[lang].hero.platforms} ${LANDING[lang].hero.cta.join(" ")}`).toMatch(/Windows[\s\S]*macOS[\s\S]*Linux/);
		}
	});

	it("only calls the download free, apart from the approved hero line about local files", () => {
		const free = /\b(gratuit[oa]|gratis|grátis|free)\b/i;
		const approved = /^(Gratuito|Free|Gratis), (com seus arquivos|with your files|con tus archivos)/;
		const download = /(download|baixar|descarga|descargar)/i;
		for (const lang of LANGUAGES) {
			const sentences = strings(LANDING[lang])
				.flatMap((text) => text.split(/(?<=[.!?])\s+|\s·\s/))
				.filter((sentence) => free.test(sentence));
			expect(sentences.length).toBeGreaterThan(0);
			for (const sentence of sentences) expect(approved.test(sentence) || download.test(sentence), sentence).toBe(true);
		}
	});
});
