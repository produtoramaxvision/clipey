import { CATEGORY_LABELS, LANGUAGES, SITE_NAME, SITE_URL } from "./config.mjs";
import { escapeHtml } from "./content.mjs";

const copy = {
	"pt-BR": { title: "Notas para criar melhor.", back: "Blog", read: "min de leitura", related: "Leia também", previous: "Anterior", next: "Próximo", empty: "Novos artigos em breve.", filters: "Filtrar por categoria" },
	en: { title: "Notes for making better.", back: "Blog", read: "min read", related: "Read next", previous: "Previous", next: "Next", empty: "New articles coming soon.", filters: "Filter by category" },
	es: { title: "Ideas para crear mejor.", back: "Blog", read: "min de lectura", related: "Sigue leyendo", previous: "Anterior", next: "Siguiente", empty: "Pronto habrá artículos nuevos.", filters: "Filtrar por categoría" },
};
const base = (lang) => lang === "pt-BR" ? "/blog/" : `/blog/${lang}/`;
const shell = (lang, title, description, body, canonical, alternates = "") => `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${escapeHtml(description)}"><link rel="canonical" href="${SITE_URL}${canonical}">${alternates}<link rel="stylesheet" href="/site.css"><link rel="stylesheet" href="/blog.css"><title>${escapeHtml(title)} · Clipey</title></head><body><a class="skip" href="#content">${lang === "en" ? "Skip to content" : lang === "es" ? "Saltar al contenido" : "Pular para o conteúdo"}</a><header class="site-header"><a class="brand" href="${lang === "pt-BR" ? "/" : `/${lang}/`}"><img src="/clipey-256.png" width="32" height="32" alt="">Clipey</a><nav aria-label="${lang === "en" ? "Main navigation" : lang === "es" ? "Navegación principal" : "Navegação principal"}"><a href="${lang === "pt-BR" ? "/" : `/${lang}/`}">${lang === "en" ? "Home" : lang === "es" ? "Inicio" : "Início"}</a><a href="${base(lang)}">${copy[lang].back}</a><button data-theme-toggle type="button" aria-label="${lang === "en" ? "Toggle theme" : lang === "es" ? "Cambiar tema" : "Alternar tema"}">◐</button></nav></header><main id="content">${body}</main><footer><a href="/privacidade/">${lang === "en" ? "Privacy" : lang === "es" ? "Privacidad" : "Privacidade"}</a><a href="/termos/">${lang === "en" ? "Terms" : lang === "es" ? "Términos" : "Termos"}</a><span>© 2026 Clipey</span></footer><script type="module" src="/blog.js"></script></body></html>`;

export function renderBlogIndex(lang, posts = undefined) {
	const items = posts || [];
	const rows = items.filter((post) => post.content[lang]).map((post) => { const item = post.content[lang]; return `<article class="post-card" data-category="${escapeHtml(item.category)}" data-tags="${escapeHtml(item.tags.join("|"))}"><a href="${item.url}">${item.cover ? `<img src="${item.cover}" width="1600" height="900" alt="${escapeHtml(item.coverAlt)}">` : "<div class=\"cover-placeholder\" aria-hidden=\"true\"></div>"}<span class="eyebrow">${escapeHtml(CATEGORY_LABELS[lang][item.category] || item.category)}</span><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.description)}</p><span>${item.readMinutes} ${copy[lang].read}</span></a></article>`; }).join("");
	const cats = Object.entries(CATEGORY_LABELS[lang]).filter(([key]) => key !== "all").map(([key, label]) => `<a href="${base(lang)}?categoria=${encodeURIComponent(key)}">${label}</a>`).join("");
	const tags = [...new Set(items.filter((post) => post.content[lang]).flatMap((post) => post.content[lang].tags))].map((tag) => `<a href="${base(lang)}?tag=${encodeURIComponent(tag)}">${escapeHtml(tag)}</a>`).join("");
	const body = `<section class="blog-hero"><p class="eyebrow">Clipey / ${copy[lang].back}</p><h1>${copy[lang].title}</h1><p>${items.length ? copy[lang].filters : copy[lang].empty}</p><div class="filter-list"><a href="${base(lang)}">${CATEGORY_LABELS[lang].all}</a>${cats}${tags}</div></section><section class="post-grid">${rows}</section>`;
	return shell(lang, copy[lang].back, copy[lang].title, body, base(lang));
}

export function renderBlogArticle(post, lang, allPosts = []) {
	const item = post.content[lang];
	if (!item) return "";
	const languages = LANGUAGES.map((locale) => post.content[locale] ? `<a lang="${locale}" href="${post.content[locale].url}">${locale}</a>` : "").join("");
	const alternates = LANGUAGES.filter((locale) => post.content[locale]).map((locale) => `<link rel="alternate" hreflang="${locale}" href="${SITE_URL}${post.content[locale].url}">`).join("") + `<link rel="alternate" hreflang="x-default" href="${SITE_URL}${post.content["pt-BR"]?.url || item.url}">`;
	const index = allPosts.findIndex((entry) => entry.translationKey === post.translationKey);
	const prev = allPosts[index - 1]?.content[lang];
	const next = allPosts[index + 1]?.content[lang];
	const related = allPosts.filter((entry) => entry.translationKey !== post.translationKey && entry.content[lang]).slice(0, 3).map((entry) => `<a href="${entry.content[lang].url}">${escapeHtml(entry.content[lang].title)}</a>`).join("");
	const jsonLd = JSON.stringify({ "@context": "https://schema.org", "@type": "BlogPosting", headline: item.title, description: item.description, image: `${SITE_URL}${item.ogImage}`, datePublished: item.date, dateModified: item.updated, inLanguage: lang, mainEntityOfPage: `${SITE_URL}${item.url}`, author: { "@type": "Organization", name: item.author }, publisher: { "@type": "Organization", name: SITE_NAME } });
	const crumb = JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}${base(lang)}` }, { "@type": "ListItem", position: 3, name: item.title, item: `${SITE_URL}${item.url}` }] });
	const toc = [...item.html.matchAll(/<h([23]) id="([^"]+)">(.+?)<\/h\1>/g)].map((heading) => `<a href="#${heading[2]}">${heading[3]}</a>`).join("");
	const body = `<article class="article"><nav class="breadcrumbs"><a href="${base(lang)}">${copy[lang].back}</a><span>/</span>${escapeHtml(item.category)}</nav><div class="article-languages">${languages}</div><header><p class="eyebrow">${escapeHtml(item.author)} · ${item.readMinutes} ${copy[lang].read}</p><h1>${escapeHtml(item.title)}</h1><p class="article-lead">${escapeHtml(item.description)}</p><time datetime="${item.date}">${escapeHtml(item.date)}</time></header>${item.cover ? `<img class="article-cover" src="${item.cover}" width="1600" height="900" alt="${escapeHtml(item.coverAlt)}">` : ""}${toc ? `<nav class="article-toc" aria-label="${lang === "en" ? "Table of contents" : lang === "es" ? "Índice" : "Neste artigo"}"><strong>${lang === "en" ? "In this article" : lang === "es" ? "En este artículo" : "Neste artigo"}</strong>${toc}</nav>` : ""}<div class="article-body">${item.html}</div><nav class="prev-next" aria-label="${copy[lang].related}">${prev ? `<a href="${prev.url}">${copy[lang].previous}: ${escapeHtml(prev.title)}</a>` : ""}${next ? `<a href="${next.url}">${copy[lang].next}: ${escapeHtml(next.title)}</a>` : ""}</nav><section class="related"><h2>${copy[lang].related}</h2>${related}</section></article><script type="application/ld+json">${jsonLd.replaceAll("<", "\\u003c")}</script><script type="application/ld+json">${crumb.replaceAll("<", "\\u003c")}</script>`;
	return shell(lang, item.title, item.description, body, item.url, alternates);
}

export function renderFeed(lang, format = "rss", posts = []) {
	if (format === "atom") return `<?xml version="1.0" encoding="utf-8"?><feed xmlns="http://www.w3.org/2005/Atom"><title>${SITE_NAME}</title><id>${SITE_URL}${base(lang)}</id><updated>2026-09-29T00:00:00Z</updated>${posts.filter((post) => post.content[lang]).map((post) => { const item = post.content[lang]; return `<entry><title>${escapeHtml(item.title)}</title><id>${SITE_URL}${item.url}</id><link href="${SITE_URL}${item.url}"/><updated>${item.updated}T00:00:00Z</updated><summary>${escapeHtml(item.description)}</summary></entry>`; }).join("")}</feed>`;
	return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${SITE_NAME}</title><link>${SITE_URL}${base(lang)}</link><description>${copy[lang].title}</description>${posts.filter((post) => post.content[lang]).map((post) => { const item = post.content[lang]; return `<item><title>${escapeHtml(item.title)}</title><link>${SITE_URL}${item.url}</link><guid>${SITE_URL}${item.url}</guid><description>${escapeHtml(item.description)}</description><pubDate>${item.date}</pubDate></item>`; }).join("")}</channel></rss>`;
}

export function renderSitemap(posts = []) {
	const pages = ["/", "/en/", "/es/", "/privacidade/", "/termos/", "/exclusao-de-dados/", "/en/privacy/", "/en/terms/", "/en/data-deletion/", "/blog/", "/blog/en/", "/blog/es/"];
	for (const post of posts) for (const lang of LANGUAGES) if (post.content[lang]) pages.push(post.content[lang].url);
	return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((url) => `<url><loc>${SITE_URL}${url}</loc></url>`).join("")}</urlset>`;
}
