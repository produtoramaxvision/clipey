import {
	blogBase,
	CATEGORIES,
	categoryUrl,
	LANDING_PATH,
	LANGUAGES,
	LEGAL_PATHS,
	SITE_URL,
} from "./config.mjs";
import { UI } from "./i18n.mjs";
import { xmlEscape } from "./shell.mjs";
import { usedCategories } from "./template.mjs";

const decodeEntities = (text) =>
	text.replace(
		/&(?:lt|gt|quot|#39|amp);/g,
		(entity) =>
			({ "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&amp;": "&" })[
				entity
			],
	);

export function renderRss(lang, posts, selfUrl) {
	const blog = UI[lang].blog;
	const feedHref = selfUrl ?? `${SITE_URL}${blogBase(lang)}feed.xml`;
	const items = posts
		.filter((post) => post.content[lang])
		.map((post) => {
			const item = post.content[lang];
			const url = `${SITE_URL}${item.url}`;
			return `\t\t<item>
			<title>${xmlEscape(item.title)}</title>
			<link>${url}</link>
			<guid isPermaLink="true">${url}</guid>
			<pubDate>${new Date(`${post.date}T12:00:00Z`).toUTCString()}</pubDate>
			<category>${xmlEscape(CATEGORIES[post.categoryKey][lang].label)}</category>
			<description>${xmlEscape(item.description)}</description>
		</item>`;
		})
		.join("\n");
	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${xmlEscape(blog.title)}</title>
		<link>${SITE_URL}${blogBase(lang)}</link>
		<description>${xmlEscape(blog.description)}</description>
		<language>${lang}</language>
		<atom:link href="${feedHref}" rel="self" type="application/rss+xml"/>
${items}
	</channel>
</rss>
`;
}

export function renderAtom(lang, posts, selfUrl) {
	const blog = UI[lang].blog;
	const feedHref = selfUrl ?? `${SITE_URL}${blogBase(lang)}atom.xml`;
	const blogHref = `${SITE_URL}${blogBase(lang)}`;
	const filtered = posts.filter((post) => post.content[lang]);
	// An empty feed has no article date to report; the build time is the only true "updated" value then.
	const latestUpdated = filtered.length
		? `${filtered[0].updated}T12:00:00Z`
		: `${new Date().toISOString().slice(0, 19)}Z`;

	const entries = filtered
		.map((post) => {
			const item = post.content[lang];
			const url = `${SITE_URL}${item.url}`;
			const published = `${post.date}T12:00:00Z`;
			const updated = `${post.updated}T12:00:00Z`;
			return `\t<entry>
		<title>${xmlEscape(item.title)}</title>
		<link href="${url}" rel="alternate" type="text/html"/>
		<id>${url}</id>
		<published>${published}</published>
		<updated>${updated}</updated>
		<summary>${xmlEscape(item.description)}</summary>
		<author>
			<name>${xmlEscape(item.author)}</name>
		</author>
		<category term="${CATEGORIES[post.categoryKey][lang].slug}" label="${xmlEscape(CATEGORIES[post.categoryKey][lang].label)}"/>
	</entry>`;
		})
		.join("\n");

	return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
	<title>${xmlEscape(blog.title)}</title>
	<subtitle>${xmlEscape(blog.description)}</subtitle>
	<link href="${feedHref}" rel="self" type="application/atom+xml"/>
	<link href="${blogHref}" rel="alternate" type="text/html"/>
	<id>${blogHref}</id>
	<updated>${latestUpdated}</updated>
${entries}
</feed>
`;
}

/** The search index of one language: title, description and the first 300 characters of the text. */
export function renderSearchIndex(lang, posts) {
	const entries = posts
		.filter((post) => post.content[lang])
		.map((post) => {
			const item = post.content[lang];
			const text = decodeEntities(
				item.html
					.replace(/<[^>]+>/g, " ")
					.replace(/\s+/g, " ")
					.trim(),
			).slice(0, 300);
			return {
				title: item.title,
				description: item.description,
				url: item.url,
				category: CATEGORIES[post.categoryKey][lang].label,
				text,
			};
		});
	return JSON.stringify(entries);
}

function entry(loc, alternates, lastmod) {
	const links = alternates
		.map(
			([code, href]) =>
				`\t\t<xhtml:link rel="alternate" hreflang="${code}" href="${SITE_URL}${href}"/>`,
		)
		.join("\n");
	const lastmodTag = lastmod ? `\n\t\t<lastmod>${lastmod}</lastmod>` : "";
	return `\t<url>
\t\t<loc>${SITE_URL}${loc}</loc>${lastmodTag}${links ? `\n${links}` : ""}
\t</url>`;
}

/** Every public page: the landing in three languages, the blog, its categories, all articles and the legal texts. */
export function sitemapEntries(posts) {
	const withDefault = (pairs) => {
		const ptBr = pairs.find(([code]) => code === "pt-BR")?.[1] ?? pairs[0][1];
		return [...pairs, ["x-default", ptBr]];
	};
	const entries = [];
	const landing = LANGUAGES.map((lang) => [lang, LANDING_PATH[lang]]);
	for (const [, loc] of landing) entries.push(entry(loc, withDefault(landing)));
	const index = LANGUAGES.map((lang) => [lang, blogBase(lang)]);
	for (const [, loc] of index) entries.push(entry(loc, withDefault(index)));
	for (const key of usedCategories(posts)) {
		const pairs = LANGUAGES.map((lang) => [lang, categoryUrl(lang, key)]);
		for (const [, loc] of pairs) entries.push(entry(loc, withDefault(pairs)));
	}
	for (const post of posts) {
		const pairs = LANGUAGES.filter((lang) => post.content[lang]).map((lang) => [
			lang,
			post.content[lang].url,
		]);
		for (const [, loc] of pairs)
			entries.push(entry(loc, withDefault(pairs), post.updated));
	}
	for (const kind of ["privacy", "terms", "deletion"]) {
		const pairs = [
			["pt-BR", LEGAL_PATHS["pt-BR"][kind]],
			["en", LEGAL_PATHS.en[kind]],
		];
		for (const [, loc] of pairs) entries.push(entry(loc, withDefault(pairs)));
	}
	return entries;
}

export function renderSitemap(posts) {
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries(posts).join("\n")}
</urlset>
`;
}
