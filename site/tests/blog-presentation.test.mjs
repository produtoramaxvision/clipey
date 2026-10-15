import { describe, expect, it } from "vitest";
import {
	formatShortcut,
	insertBeforeSecondSection,
	markShortAnswer,
	markShortcuts,
} from "../src/blog/article-html.mjs";
import { LANGUAGES } from "../src/blog/config.mjs";
import { getCompletePosts } from "../src/blog/content.mjs";
import {
	ARTICLE_FIGURES,
	articleFigure,
	SHOT_WIDTHS,
} from "../src/blog/figures.mjs";
import { formatShortDate } from "../src/blog/template.mjs";
import { fileForUrl, renderSite } from "../src/render-site.mjs";

const assets = {
	css: ["/assets/x.css"],
	font: "/assets/font.woff2",
	script: "/assets/x.js",
};
const posts = getCompletePosts();
const files = renderSite(posts, { landing: assets, blog: assets });

describe("article presentation helpers", () => {
	it("joins shortcut keys like the app's keystroke pill", () => {
		expect(formatShortcut("Ctrl+Shift+D")).toBe("Ctrl + Shift + D");
		expect(formatShortcut("Esc")).toBe("Esc");
	});

	it("turns bold shortcuts into kbd pills and leaves bold labels alone", () => {
		expect(
			markShortcuts(
				"<p>Use <strong>Ctrl+Shift+D</strong>, <strong>M</strong> and <strong>Caneta</strong>.</p>",
			),
		).toBe(
			'<p>Use <kbd class="key">Ctrl + Shift + D</kbd>, <kbd class="key">M</kbd> and <strong>Caneta</strong>.</p>',
		);
		expect(markShortcuts("<strong>Ajuste desativado (Shift)</strong>")).toBe(
			"<strong>Ajuste desativado (Shift)</strong>",
		);
	});

	it("labels the paragraph after the opening note as the short answer", () => {
		const html =
			"<blockquote>\n<p><strong>Aplica-se a:</strong> Clipey 1.15.</p>\n</blockquote>\n<p>Resposta.</p>\n<p>Depois.</p>";
		expect(markShortAnswer(html, 'Resposta "curta"')).toBe(
			'<blockquote>\n<p><strong>Aplica-se a:</strong> Clipey 1.15.</p>\n</blockquote>\n<p class="answer" data-label="Resposta &quot;curta&quot;">Resposta.</p>\n<p>Depois.</p>',
		);
		expect(markShortAnswer("<p>Sem nota.</p>", "x")).toBe("<p>Sem nota.</p>");
	});

	it("places a figure before the second section, or before the only one", () => {
		expect(
			insertBeforeSecondSection("<p>a</p><h2>1</h2><p>b</p><h2>2</h2>", "F"),
		).toBe("<p>a</p><h2>1</h2><p>b</p>F\n<h2>2</h2>");
		expect(insertBeforeSecondSection("<p>a</p><h2>1</h2>", "F")).toBe(
			"<p>a</p>F\n<h2>1</h2>",
		);
		expect(insertBeforeSecondSection("<p>a</p>", "F")).toBe("<p>a</p>F");
		expect(insertBeforeSecondSection("<p>a</p>", "")).toBe("<p>a</p>");
	});

	it("formats the short date of the timecode column", () => {
		expect(formatShortDate("2026-09-29", "en")).toBe("Sep 29, 2026");
		expect(formatShortDate("2026-09-29", "pt-BR")).not.toContain(" de ");
	});
});

describe("article figures", () => {
	it("maps only real articles and gives every figure an alt text per language", () => {
		const keys = new Set(posts.map((post) => post.translationKey));
		for (const [key, figure] of Object.entries(ARTICLE_FIGURES)) {
			expect(keys.has(key), key).toBe(true);
			expect(figure.shot).toMatch(/^[a-z0-9-]+$/);
			for (const lang of LANGUAGES) expect(figure.alt[lang]).toBeTruthy();
		}
	});

	it("renders nothing until the screenshot files exist", () => {
		expect(
			articleFigure("clipey-1-15-novidades", "pt-BR", "c", () => false),
		).toBe("");
		expect(articleFigure("unknown", "pt-BR", "c", () => true)).toBe("");
	});

	it("renders a lazy responsive figure from the widths that exist", () => {
		const html = articleFigure(
			"clipey-1-15-novidades",
			"en",
			"Real <screenshot>",
			() => true,
		);
		for (const width of SHOT_WIDTHS)
			expect(html).toContain(
				`/shots/editor-full-speed-zoom-lanes-dark-${width}.webp ${width}w`,
			);
		expect(html).toContain('width="1400" height="875"');
		expect(html).toContain('loading="lazy"');
		expect(html).toContain("Real &lt;screenshot&gt;");
		expect(html).not.toContain("style=");
		const tall = articleFigure(
			"efeitos-de-mouse-cliques-halo-spotlight",
			"es",
			"c",
			(_name, width) => width === 800,
		);
		expect(tall).toContain('class="shot shot--tall"');
		expect(tall).toContain('src="/shots/pane-mouse-effects-dark-800.webp"');
	});
});

describe("rendered blog pages", () => {
	it("gives every article a short-answer panel right after the opening note", () => {
		for (const post of posts)
			for (const lang of LANGUAGES) {
				const html = files.get(fileForUrl(post.content[lang].url));
				const prose = html.slice(html.indexOf('<article class="prose">'));
				const afterNote = prose.slice(prose.indexOf("</blockquote>"));
				expect(
					afterNote.match(/<p\b[^>]*>/)[0],
					post.content[lang].url,
				).toMatch(/^<p class="answer" data-label="/);
			}
	});

	it("lists the index as rows with a segmented category filter, no cards", () => {
		const html = files.get("blog/index.html");
		expect(html).toContain('<nav class="seg"');
		expect(html).toContain('class="seg-item" aria-current="page"');
		expect(html.match(/<li class="entry"/g)).toHaveLength(posts.length - 1);
		expect(html).not.toContain('class="card"');
		expect(html).toContain('class="export-btn"');
	});

	it("shows related articles as a list and the shortcuts as pills", () => {
		const html = files.get(
			fileForUrl(
				posts.find(
					(post) =>
						post.translationKey === "atalhos-e-produtividade-na-timeline",
				).content["pt-BR"].url,
			),
		);
		const related = html.slice(html.indexOf('<section class="related"'));
		expect(related).toContain('<ol class="entry-list entry-list--compact">');
		expect(html).toContain('<kbd class="key">Shift + F10</kbd>');
	});

	it("writes no inline style attribute", () => {
		for (const [name, html] of files)
			if (name.endsWith(".html") && name.startsWith("blog/"))
				expect(html, name).not.toMatch(/\sstyle=/);
	});
});
