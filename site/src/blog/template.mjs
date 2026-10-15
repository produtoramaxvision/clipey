import {
	insertBeforeSecondSection,
	markShortAnswer,
	markShortcuts,
} from "./article-html.mjs";
import {
	blogBase,
	CATEGORIES,
	CATEGORY_KEYS,
	categoryUrl,
	LANDING_PATH,
	LANGUAGE_NAME,
	LANGUAGES,
	OWNER,
	RELEASES_URL,
	SITE_NAME,
	SITE_URL,
} from "./config.mjs";
import { escapeHtml as esc } from "./content.mjs";
import { articleFigure } from "./figures.mjs";
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

/** Short date for the timecode column: "29 set. 2026". */
export function formatShortDate(isoDate, lang) {
	return new Date(`${isoDate}T12:00:00Z`)
		.toLocaleDateString(DATE_LOCALE[lang], {
			year: "numeric",
			month: "short",
			day: "2-digit",
			timeZone: "UTC",
		})
		.replace(/ de /g, " ");
}

/** The Geist Mono meta of a row: date · reading time · category. */
function entryMeta(post, lang) {
	const ui = UI[lang];
	return [
		formatShortDate(post.date, lang),
		`${post.content[lang].readMinutes} ${ui.blog.readShort}`,
		CATEGORIES[post.categoryKey][lang].label,
	]
		.map((part) => `<span>${esc(part)}</span>`)
		.join("");
}

/** One row of the editorial list: a timecode-like meta column, the title in large type and a one-line description. */
function entryRow(post, lang) {
	const item = post.content[lang];
	return `<li class="entry" data-category="${post.categoryKey}">
				<a class="entry-link" href="${item.url}">
					<span class="entry-tc" aria-hidden="true">${padOrder(post.order)}</span>
					<span class="entry-meta">${entryMeta(post, lang)}</span>
					<h3 class="entry-title">${esc(item.title)}</h3>
					<span class="entry-desc">${esc(item.description)}</span>
				</a>
			</li>`;
}

/** The closing call to action, with the download link styled as the app's Export button. */
function closeBand(lang) {
	const ui = UI[lang].blog;
	return `<section class="close-band" aria-labelledby="close-title">
		<p class="tc"><span class="tc-dot" aria-hidden="true"></span>Clipey 1.15</p>
		<h2 id="close-title" class="close-title">${esc(ui.closeTitle)}</h2>
		<p class="close-sub">${esc(ui.closeSub)}</p>
		<div class="close-actions">
			<a class="export-btn" href="${RELEASES_URL}" rel="noopener noreferrer">${icon("download")}${esc(ui.closeDownload)}</a>
			<a class="close-rss" href="${blogBase(lang)}rss.xml">${esc(ui.closeRss)}</a>
		</div>
	</section>`;
}

function categoryNav(lang, posts, active) {
	const ui = UI[lang].blog;
	const links = [
		`<a href="${blogBase(lang)}" class="seg-item"${active === "all" ? ' aria-current="page"' : ""}>${esc(ui.all)}</a>`,
		...usedCategories(posts).map(
			(key) =>
				`<a href="${categoryUrl(lang, key)}" class="seg-item"${active === key ? ' aria-current="page"' : ""}>${esc(CATEGORIES[key][lang].label)}</a>`,
		),
	];
	return `<nav class="seg" aria-label="${esc(ui.categoriesNav)}">${links.join("")}</nav>`;
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

function blogJsonLd(lang, posts, canonical, categoryKey = "all") {
	const ui = UI[lang].blog;
	const title =
		categoryKey === "all"
			? ui.title
			: `${CATEGORIES[categoryKey][lang].label} | ${ui.title}`;
	const description =
		categoryKey === "all"
			? ui.description
			: `${CATEGORIES[categoryKey][lang].label}: ${ui.description}`;
	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"@id": `${SITE_URL}/#organization`,
				name: OWNER,
				url: `${SITE_URL}/`,
				logo: {
					"@type": "ImageObject",
					"@id": `${SITE_URL}/#logo`,
					url: `${SITE_URL}/clipey-256.png`,
					caption: SITE_NAME,
				},
			},
			{
				"@type": "WebSite",
				"@id": `${SITE_URL}/#website`,
				name: SITE_NAME,
				url: `${SITE_URL}/`,
				publisher: { "@id": `${SITE_URL}/#organization` },
				inLanguage: lang,
			},
			{
				"@type": "CollectionPage",
				"@id": `${SITE_URL}${canonical}#collection`,
				url: `${SITE_URL}${canonical}`,
				name: title,
				description,
				isPartOf: { "@id": `${SITE_URL}/#website` },
				inLanguage: lang,
				mainEntity: {
					"@type": "ItemList",
					itemListElement: posts.map((post, index) => ({
						"@type": "ListItem",
						position: index + 1,
						url: `${SITE_URL}${post.content[lang].url}`,
						name: post.content[lang].title,
					})),
				},
			},
		],
	};
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
	const list = featured ? shown.filter((post) => post !== featured) : shown;
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
	const body = `<main class="blog blog-index" id="main">
		<section class="blog-hero" aria-labelledby="blog-title">
			<div class="blog-hero-copy">
				<p class="tc"><span class="tc-dot" aria-hidden="true"></span>${esc(copy.kicker)}</p>
				<h1 id="blog-title" class="display">${categoryKey === "all" ? esc(copy.heroTitle) : esc(label)}</h1>
				<p class="blog-lede">${esc(description)}</p>
			</div>
			${searchBar(lang)}
		</section>
		<div class="filter-bar">${categoryNav(lang, posts, categoryKey)}<span class="filter-count tc" aria-hidden="true">${padOrder(shown.length)}/${padOrder(total)}</span></div>
		${
			featured
				? `<article class="featured" aria-labelledby="featured-title">
			<a class="featured-frame" href="${featuredItem.url}" tabindex="-1" aria-hidden="true">${frame(featured, lang, { eager: true, sizes: "(max-width: 900px) 100vw, 760px", total })}</a>
			<div class="featured-copy">
				<p class="entry-meta"><span class="entry-flag">${esc(copy.featured)}</span>${entryMeta(featured, lang)}</p>
				<h2 id="featured-title" class="featured-title"><a href="${featuredItem.url}">${esc(featuredItem.title)}</a></h2>
				<p class="featured-desc">${esc(featuredItem.description)}</p>
				<a class="featured-more" href="${featuredItem.url}">${esc(copy.readArticle)}${icon("arrow")}</a>
			</div>
		</article>`
				: ""
		}
		<section class="entries" aria-labelledby="entries-title">
			<h2 id="entries-title" class="sr-only">${esc(categoryKey === "all" ? copy.allPosts : label)}</h2>
			${list.length ? `<ol class="entry-list">${list.map((post) => entryRow(post, lang)).join("\n\t\t\t")}</ol>` : `<p class="empty">${esc(copy.emptyCategory)}</p>`}
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
			jsonLd: blogJsonLd(lang, shown, canonical, categoryKey),
			feedRss: `${blogBase(lang)}feed.xml`,
			feedAtom: `${blogBase(lang)}atom.xml`,
			lcpImage: featuredItem?.cover || undefined,
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
		<ol class="entry-list entry-list--compact">${others.map((other) => entryRow(other, lang)).join("\n\t\t\t")}</ol>
	</section>`;
}

function articleJsonLd(post, lang) {
	const item = post.content[lang];
	const ui = UI[lang].blog;
	const url = `${SITE_URL}${item.url}`;
	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"@id": `${SITE_URL}/#organization`,
				name: OWNER,
				url: `${SITE_URL}/`,
				logo: {
					"@type": "ImageObject",
					"@id": `${SITE_URL}/#logo`,
					url: `${SITE_URL}/clipey-256.png`,
					caption: SITE_NAME,
				},
			},
			{
				"@type": "WebSite",
				"@id": `${SITE_URL}/#website`,
				name: SITE_NAME,
				url: `${SITE_URL}/`,
				publisher: { "@id": `${SITE_URL}/#organization` },
				inLanguage: lang,
			},
			{
				"@type": "BlogPosting",
				"@id": `${url}#article`,
				headline: item.title,
				description: item.description,
				url,
				datePublished: post.date,
				dateModified: post.updated,
				inLanguage: lang,
				wordCount: item.wordCount,
				articleSection: CATEGORIES[post.categoryKey][lang].label,
				keywords: item.tags.join(", "),
				author: {
					"@type": "Organization",
					name: OWNER,
					url: `${SITE_URL}/`,
				},
				publisher: { "@id": `${SITE_URL}/#organization` },
				mainEntityOfPage: { "@type": "WebPage", "@id": url },
				image: item.ogImage
					? `${SITE_URL}${item.ogImage}`
					: `${SITE_URL}/og/landing.png`,
				speakable: {
					"@type": "SpeakableSpecification",
					cssSelector: [".article-title", ".prose > p:first-of-type"],
				},
			},
			{
				"@type": "BreadcrumbList",
				"@id": `${url}#breadcrumb`,
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
					{
						"@type": "ListItem",
						position: 3,
						name: item.title,
						item: url,
					},
				],
			},
		],
	};
}

/** The article HTML with the short-answer panel, keystroke pills and the screenshot of the UI area it covers. */
function articleBody(post, lang) {
	const ui = UI[lang].blog;
	const html = markShortAnswer(
		markShortcuts(post.content[lang].html),
		ui.shortAnswer,
	);
	return insertBeforeSecondSection(
		html,
		articleFigure(post.translationKey, lang, ui.figureCaption),
	);
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
			<article class="prose">${articleBody(post, lang)}</article>
		</div>
		${related(post, lang, posts)}
		${neighbours(post, lang, posts)}
		${closeBand(lang)}
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
			jsonLd: articleJsonLd(post, lang),
			feedRss: `${blogBase(lang)}feed.xml`,
			feedAtom: `${blogBase(lang)}atom.xml`,
			lcpImage: item.cover || undefined,
		}),
		header: renderHeader({ lang, switchUrls: alternates, current: "blog" }),
		body,
		footer: renderFooter({ lang }),
		script: assets.script,
	});
}
