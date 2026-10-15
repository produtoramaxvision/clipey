import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
	blogBase,
	categoryUrl,
	LANDING_PATH,
	LANGUAGES,
	LEGAL_PATHS,
} from "./blog/config.mjs";
import { escapeHtml as esc } from "./blog/content.mjs";
import { renderRss, renderSearchIndex, renderSitemap } from "./blog/feeds.mjs";
import { UI } from "./blog/i18n.mjs";
import {
	renderFooter,
	renderHead,
	renderHeader,
	renderPage,
} from "./blog/shell.mjs";
import {
	renderBlogArticle,
	renderBlogIndex,
	usedCategories,
} from "./blog/template.mjs";
import { renderHeaders } from "./headers.mjs";
import { renderLanding } from "./landing.mjs";

const siteRoot = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"..",
);

/** Legal texts as `{ lang, path, title, body }`, produced by build.py from the source of truth. */
export function readLegalPages() {
	return JSON.parse(
		execFileSync("python3", [path.join(siteRoot, "build.py")], {
			cwd: siteRoot,
			encoding: "utf8",
		}),
	);
}

/** The file a public URL is served from: `/blog/` is `blog/index.html`. */
export function fileForUrl(url) {
	return url.endsWith("/") ? `${url.slice(1)}index.html` : url.slice(1);
}

function summary(body) {
	const first = body.match(/<p>([\s\S]*?)<\/p>/)?.[1] ?? "";
	const text = first
		.replace(/<[^>]+>/g, "")
		.replace(/\s+/g, " ")
		.trim();
	if (text.length <= 155) return text;
	return `${text.slice(0, 155).replace(/\s+\S*$/, "")}…`;
}

/** One legal page. `pairs` maps both legal languages to the URL of the same text; Spanish reads the English text. */
function legalPage(page, pairs, assets) {
	const lang = page.lang;
	const switchUrls = { ...pairs, es: pairs.en };
	return renderPage({
		lang,
		head: renderHead({
			lang,
			title: page.title,
			description: summary(page.body),
			canonical: page.path,
			alternates: pairs,
			assets,
		}),
		header: renderHeader({ lang, switchUrls }),
		body: `<main class="page-main legal" id="main">
		${page.body}
	</main>`,
		footer: renderFooter({ lang }),
		script: assets.script,
	});
}

function notFoundPage(assets) {
	const lang = "pt-BR";
	const copy = UI[lang].notFound;
	const switchUrls = LANDING_PATH;
	return renderPage({
		lang,
		head: renderHead({
			lang,
			title: copy.title,
			description: copy.text,
			canonical: "/",
			assets,
			robots: "noindex",
		}),
		header: renderHeader({ lang, switchUrls }),
		body: `<main class="page-main not-found" id="main">
		<p class="tc"><span class="tc-dot" aria-hidden="true"></span>${esc(copy.code)}</p>
		<h1>${esc(copy.title)}</h1>
		<p>${esc(copy.text)}</p>
		<div class="not-found-actions">
			<a class="btn btn--primary" href="${LANDING_PATH[lang]}">${esc(copy.home)}</a>
			<a class="btn btn--ghost" href="${blogBase(lang)}">${esc(copy.blog)}</a>
		</div>
	</main>`,
		footer: renderFooter({ lang }),
		script: assets.script,
	});
}

/**
 * Every generated file of the site as `fileName -> source`.
 * `assets` is `{ landing, blog, pages }`, each `{ css: [urls], font, script }`.
 */
export function renderSite(posts, legalPages, assets) {
	const files = new Map();
	for (const lang of LANGUAGES) {
		files.set(
			fileForUrl(LANDING_PATH[lang]),
			renderLanding(lang, posts, assets.landing),
		);
		files.set(
			fileForUrl(blogBase(lang)),
			renderBlogIndex(lang, posts, assets.blog),
		);
		for (const key of usedCategories(posts)) {
			files.set(
				fileForUrl(categoryUrl(lang, key)),
				renderBlogIndex(lang, posts, assets.blog, key),
			);
		}
		for (const post of posts) {
			files.set(
				fileForUrl(post.content[lang].url),
				renderBlogArticle(post, lang, posts, assets.blog),
			);
		}
		files.set(
			`${fileForUrl(blogBase(lang)).replace("index.html", "")}rss.xml`,
			renderRss(lang, posts),
		);
		files.set(
			`${fileForUrl(blogBase(lang)).replace("index.html", "")}search-index.json`,
			renderSearchIndex(lang, posts),
		);
	}
	for (const kind of Object.keys(LEGAL_PATHS.en)) {
		const pairs = {
			"pt-BR": LEGAL_PATHS["pt-BR"][kind],
			en: LEGAL_PATHS.en[kind],
		};
		for (const page of legalPages.filter((entry) =>
			Object.values(pairs).includes(entry.path),
		)) {
			files.set(fileForUrl(page.path), legalPage(page, pairs, assets.pages));
		}
	}
	files.set("404.html", notFoundPage(assets.pages));
	files.set("sitemap.xml", renderSitemap(posts));
	files.set("_headers", renderHeaders());
	return files;
}
