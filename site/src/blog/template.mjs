import {
	CATEGORIES,
	CATEGORY_KEYS,
	LANDING_PATH,
	LANGUAGE_NAME,
	LANGUAGES,
	OWNER,
	RELEASES_URL,
	SITE_NAME,
	SITE_URL,
	blogBase,
	categoryUrl,
} from "./config.mjs";
import { escapeHtml as esc } from "./content.mjs";
import { UI } from "./i18n.mjs";
import {
	icon,
	renderFooter,
	renderHead,
	renderHeader,
	renderPage,
} from "./shell.mjs";

const DATE_LOCALE = { "pt-BR": "pt-BR", en: "en-US", es: "es-ES" };

export function formatDate(isoDate, lang) {
	return new Date(`${isoDate}T12:00:00Z`).toLocaleDateString(
		DATE_LOCALE[lang],
		{ year: "numeric", month: "long", day: "numeric", timeZone: "UTC" },
	);
}

const padOrder = (value) => String(value).padStart(2, "0");

/** The URL of a post in each language, for hreflang and the language switch. */
export function postAlternates(post) {
	return Object.fromEntries(
		LANGUAGES.map((lang) => [lang, post.content[lang].url]),
	);
}

/** Category keys that have at least one post, in the declared order. */
export function usedCategories(posts) {
	return CATEGORY_KEYS.filter((key) =>
		posts.some((post) => post.categoryKey === key),
	);
}

/**
 * A cover shown as a film frame: the image when it exists, otherwise a placeholder that keeps the 16:9 box.
 * The index number and the reading time sit on a timeline ruler.
 */
function frame(
	post,
	lang,
	{ eager = false, sizes = "(max-width: 760px) 100vw, 380px", total },
) {
	const item = post.content[lang];
	const ui = UI[lang];
	const media = item.cover
		? `<img class="frame-img" src="${esc(item.cover)}" width="1600" height="900" alt="${esc(item.coverAlt)}" sizes="${sizes}" decoding="async" ${eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'}>`
		: `<span class="frame-empty" role="img" aria-label="${esc(item.coverAlt)}"></span>`;
	return `<span class="frame">
		${media}
		<span class="frame-ruler" aria-hidden="true"></span>
		<span class="frame-tc frame-tc--start" aria-hidden="true">${padOrder(post.order)}/${padOrder(total)}</span>
		<span class="frame-tc frame-tc--end">${item.readMinutes} ${esc(ui.readTime)}</span>
	</span>`;
}

function postCard(post, lang, total) {
	const item = post.content[lang];
	const category = CATEGORIES[post.categoryKey][lang].label;
	return `<article class="card" data-category="${post.categoryKey}">
			<a class="card-link" href="${item.url}">
				${frame(post, lang, { total })}
				<span class="card-cat">${esc(category)}</span>
				<h3 class="card-title">${esc(item.title)}</h3>
				<p class="card-desc">${esc(item.description)}</p>
				<span class="card-meta">${esc(formatDate(post.date, lang))}</span>
			</a>
		</article>`;
}

function closeBand(lang) {
	const ui = UI[lang].blog;
	return `<section class="close-band" aria-labelledby="close-title">
		<p class="tc"><span class="tc-dot" aria-hidden="true"></span>Clipey 1.15</p>
		<h2 id="close-title" class="close-title">${esc(ui.closeTitle)}</h2>
		<p class="close-sub">${esc(ui.closeSub)}</p>
		<div class="close-actions">
			<a class="btn btn--primary" href="${RELEASES_URL}" rel="noopener noreferrer">${icon("download")}${esc(ui.closeDownload)}</a>
			<a class="btn btn--ghost" href="${blogBase(lang)}rss.xml">${esc(ui.closeRss)}</a>
		</div>
	</section>`;
}

function categoryNav(lang, posts, active) {
	const ui = UI[lang].blog;
	const links = [
		`<a href="${blogBase(lang)}" class="pill"${active === "all" ? ' aria-current="page"' : ""}>${esc(ui.all)}</a>`,
		...usedCategories(posts).map(
			(key) =>
				`<a href="${categoryUrl(lang, key)}" class="pill"${active === key ? ' aria-current="page"' : ""}>${esc(CATEGORIES[key][lang].label)}</a>`,
		),
	];
	return `<nav class="pills" aria-label="${esc(ui.categoriesNav)}">${links.join("")}</nav>`;
}

function searchBar(lang) {
	const ui = UI[lang].blog;
	return `<div class="search" role="search" aria-label="${esc(ui.searchLabel)}" data-search data-index="${blogBase(lang)}search-index.json" data-msg-none="${esc(ui.searchNone)}" data-msg-one="${esc(ui.searchOne)}" data-msg-many="${esc(ui.searchMany)}">
		<svg class="search-icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 10.5 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
		<label class="sr-only" for="blog-search">${esc(ui.searchLabel)}</label>
		<input id="blog-search" type="text" inputmode="search" enterkeyhint="search" placeholder="${esc(ui.searchPlaceholder)}" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" role="combobox" aria-expanded="false" aria-controls="search-results" aria-autocomplete="list">
		<kbd class="search-kbd" title="${esc(ui.searchHint)}">/</kbd>
		<div class="search-results" id="search-results" role="listbox" aria-label="${esc(ui.searchResults)}" hidden></div>
		<p class="search-results search-empty" id="search-empty" aria-hidden="true" hidden></p>
		<p class="sr-only" id="search-status" role="status"></p>
	</div>`;
}

function blogJsonLd(lang, posts, canonical) {
	const ui = UI[lang].blog;
	return [
		{
			"@context": "https://schema.org",
			"@type": "Blog",
			name: ui.title,
			description: ui.description,
			url: `${SITE_URL}${canonical}`,
			inLanguage: lang,
			publisher: { "@type": "Organization", name: OWNER, url: SITE_URL },
			blogPost: posts.map((post) => ({
				"@type": "BlogPosting",
				headline: post.content[lang].title,
				url: `${SITE_URL}${post.content[lang].url}`,
			})),
		},
	];
}

/** The blog index (`categoryKey` "all") or one category page. Every page lists the same posts in the three languages. */
export function renderBlogIndex(lang, posts, assets, categoryKey = "all") {
	const ui = UI[lang];
	const copy = ui.blog;
	const total = posts.length;
	const shown =
		categoryKey === "all"
			? posts
			: posts.filter((post) => post.categoryKey === categoryKey);
	const featured =
		categoryKey === "all"
			? (posts.find((post) => post.featured) ?? posts[0])
			: undefined;
	const grid = featured ? shown.filter((post) => post !== featured) : shown;
	const label =
		categoryKey === "all" ? copy.title : CATEGORIES[categoryKey][lang].label;
	const canonical =
		categoryKey === "all" ? blogBase(lang) : categoryUrl(lang, categoryKey);
	const alternates = Object.fromEntries(
		LANGUAGES.map((code) => [
			code,
			categoryKey === "all" ? blogBase(code) : categoryUrl(code, categoryKey),
		]),
	);
	const title = categoryKey === "all" ? copy.title : `${label} | ${copy.title}`;
	const description =
		categoryKey === "all" ? copy.description : `${label}: ${copy.description}`;
	const featuredItem = featured?.content[lang];
	const body = `<main class="blog" id="main">
		<section class="blog-hero" aria-labelledby="blog-title">
			<p class="tc"><span class="tc-dot" aria-hidden="true"></span>${esc(copy.kicker)}</p>
			<h1 id="blog-title" class="display">${categoryKey === "all" ? esc(copy.heroTitle) : esc(label)}</h1>
			<p class="blog-lede">${esc(description)}</p>
			<div class="blog-hero-actions">
				${featured ? `<a class="btn btn--primary" href="${featuredItem.url}">${esc(copy.readLatest)}${icon("arrow")}</a>` : ""}
			</div>
			${searchBar(lang)}
		</section>
		<div class="pills-bar">${categoryNav(lang, posts, categoryKey)}</div>
		${
			featured
				? `<article class="featured" aria-labelledby="featured-title">
			<a class="featured-frame" href="${featuredItem.url}" tabindex="-1" aria-hidden="true">${frame(featured, lang, { eager: true, sizes: "(max-width: 900px) 100vw, 640px", total })}</a>
			<div class="featured-copy">
				<p class="tc"><span class="tc-dot" aria-hidden="true"></span>${esc(copy.featured)} / ${esc(CATEGORIES[featured.categoryKey][lang].label)}</p>
				<h2 id="featured-title" class="featured-title"><a href="${featuredItem.url}">${esc(featuredItem.title)}</a></h2>
				<p class="featured-desc">${esc(featuredItem.description)}</p>
				<p class="card-meta">${esc(formatDate(featured.date, lang))} · ${featuredItem.readMinutes} ${esc(ui.readTime)}</p>
				<a class="btn btn--ghost btn--small" href="${featuredItem.url}">${esc(copy.readArticle)}${icon("arrow")}</a>
			</div>
		</article>`
				: ""
		}
		<section class="grid" aria-labelledby="grid-title">
			<h2 id="grid-title" class="sr-only">${esc(categoryKey === "all" ? copy.allPosts : label)}</h2>
			${grid.length ? grid.map((post) => postCard(post, lang, total)).join("\n\t\t\t") : `<p class="empty">${esc(copy.emptyCategory)}</p>`}
		</section>
		${closeBand(lang)}
	</main>`;
	return renderPage({
		lang,
		head: renderHead({
			lang,
			title,
			description,
			canonical,
			alternates,
			assets,
			jsonLd: blogJsonLd(lang, shown, canonical),
			feed: `${blogBase(lang)}rss.xml`,
		}),
		header: renderHeader({ lang, switchUrls: alternates, current: "blog" }),
		body,
		footer: renderFooter({ lang }),
		script: assets.script,
	});
}

function tableOfContents(item, lang) {
	if (!item.headings.length) return "";
	const ui = UI[lang].blog;
	return `<nav class="toc" aria-label="${esc(ui.articleContents)}">
		<details open data-toc>
			<summary class="aside-title">${esc(ui.articleContents)}</summary>
			<ol>${item.headings.map((heading) => `<li><a href="#${esc(heading.id)}">${esc(heading.text)}</a></li>`).join("")}</ol>
		</details>
	</nav>`;
}

function shareBlock(item, lang) {
	const ui = UI[lang].blog;
	const url = `${SITE_URL}${item.url}`;
	const mail = `mailto:?subject=${encodeURIComponent(item.title)}&body=${encodeURIComponent(url)}`;
	return `<div class="share">
		<p class="aside-title">${esc(ui.share)}</p>
		<div class="share-actions">
			<button type="button" class="chip" data-copy-link data-copied="${esc(ui.copied)}">${esc(ui.copyLink)}</button>
			<a class="chip" href="${mail}">${esc(ui.shareEmail)}</a>
		</div>
		<p class="share-status" role="status" data-copy-status></p>
	</div>`;
}

function languageLinks(post, lang) {
	const ui = UI[lang].blog;
	const others = LANGUAGES.filter((code) => code !== lang);
	return `<p class="translations"><span class="tc">${esc(ui.languages)}</span>${others
		.map(
			(code) =>
				`<a href="${post.content[code].url}" lang="${code}" hreflang="${code}">${LANGUAGE_NAME[code]}</a>`,
		)
		.join("")}</p>`;
}

function neighbours(post, lang, posts) {
	const ui = UI[lang].blog;
	const at = posts.indexOf(post);
	const previous = posts[at - 1];
	const next = posts[at + 1];
	const cell = (target, label, side) =>
		target
			? `<a class="pager-link pager-link--${side}" href="${target.content[lang].url}"><span class="tc">${esc(label)}</span><span class="pager-title">${esc(target.content[lang].title)}</span></a>`
			: "<span></span>";
	return `<nav class="pager" aria-label="${esc(ui.articleNavAria)}">${cell(previous, ui.previous, "prev")}${cell(next, ui.next, "next")}</nav>`;
}

function related(post, lang, posts) {
	const ui = UI[lang].blog;
	const others = posts
		.filter((candidate) => candidate !== post)
		.sort(
			(a, b) =>
				Number(b.categoryKey === post.categoryKey) -
					Number(a.categoryKey === post.categoryKey) || a.order - b.order,
		)
		.slice(0, 3);
	return `<section class="related" aria-labelledby="related-title">
		<h2 id="related-title" class="related-title">${esc(ui.continueReading)}</h2>
		<div class="grid grid--three">${others.map((other) => postCard(other, lang, posts.length)).join("\n\t\t\t")}</div>
	</section>`;
}

function articleJsonLd(post, lang, posts) {
	const item = post.content[lang];
	const ui = UI[lang].blog;
	const url = `${SITE_URL}${item.url}`;
	return [
		{
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			headline: item.title,
			description: item.description,
			url,
			datePublished: post.date,
			dateModified: post.updated,
			inLanguage: lang,
			wordCount: item.wordCount,
			articleSection: CATEGORIES[post.categoryKey][lang].label,
			keywords: item.tags.join(", "),
			author: { "@type": "Organization", name: item.author, url: SITE_URL },
			publisher: {
				"@type": "Organization",
				name: OWNER,
				url: SITE_URL,
				logo: { "@type": "ImageObject", url: `${SITE_URL}/clipey-256.png` },
			},
			mainEntityOfPage: { "@type": "WebPage", "@id": url },
			image: item.ogImage
				? `${SITE_URL}${item.ogImage}`
				: `${SITE_URL}/og/landing.png`,
		},
		{
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: [
				{
					"@type": "ListItem",
					position: 1,
					name: SITE_NAME,
					item: `${SITE_URL}${LANDING_PATH[lang]}`,
				},
				{
					"@type": "ListItem",
					position: 2,
					name: ui.title,
					item: `${SITE_URL}${blogBase(lang)}`,
				},
				{ "@type": "ListItem", position: 3, name: item.title, item: url },
			],
		},
	];
}

export function renderBlogArticle(post, lang, posts, assets) {
	const item = post.content[lang];
	const ui = UI[lang];
	const category = CATEGORIES[post.categoryKey][lang].label;
	const alternates = postAlternates(post);
	const body = `<main class="blog article-page" id="main">
		<nav class="breadcrumb" aria-label="${esc(ui.blog.breadcrumbAria)}">
			<a href="${blogBase(lang)}">Blog</a><span aria-hidden="true">/</span>
			<a href="${categoryUrl(lang, post.categoryKey)}">${esc(category)}</a><span aria-hidden="true">/</span>
			<span aria-current="page">${padOrder(post.order)}</span>
		</nav>
		<header class="article-head">
			<p class="tc"><span class="tc-dot" aria-hidden="true"></span>${esc(category)} / Clipey ${esc(item.appliesTo)}</p>
			<h1 class="article-title">${esc(item.title)}</h1>
			<p class="article-lede">${esc(item.description)}</p>
			<p class="article-meta"><span>${esc(item.author)}</span><span>${esc(formatDate(post.date, lang))}</span><span>${item.readMinutes} ${esc(ui.readTime)}</span></p>
			<div class="article-frame">${frame(post, lang, { eager: true, sizes: "(max-width: 900px) 100vw, 1100px", total: posts.length })}</div>
		</header>
		<div class="article-layout">
			<aside class="article-aside">
				${tableOfContents(item, lang)}
				${shareBlock(item, lang)}
				${languageLinks(post, lang)}
			</aside>
			<article class="prose">${item.html}</article>
		</div>
		${closeBand(lang)}
		${neighbours(post, lang, posts)}
		${related(post, lang, posts)}
	</main>`;
	return renderPage({
		lang,
		head: renderHead({
			lang,
			title: item.title,
			description: item.description,
			canonical: item.url,
			alternates,
			assets,
			ogType: "article",
			ogImage: item.ogImage,
			ogImageAlt: item.coverAlt,
			jsonLd: articleJsonLd(post, lang, posts),
			feed: `${blogBase(lang)}rss.xml`,
		}),
		header: renderHeader({ lang, switchUrls: alternates, current: "blog" }),
		body,
		footer: renderFooter({ lang }),
		script: assets.script,
	});
}
