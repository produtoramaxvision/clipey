import { createHash } from "node:crypto";
import {
	blogBase,
	CONTACT_EMAIL,
	LANDING_ANCHORS,
	LANDING_PATH,
	LANGUAGE_LABEL,
	LANGUAGES,
	LEGAL_PATHS,
	OG_LOCALE,
	OWNER,
	OWNER_CNPJ,
	RELEASES_URL,
	REPO_URL,
	SITE_NAME,
	SITE_URL,
	THEME_KEY,
} from "./config.mjs";
import { escapeHtml as esc } from "./content.mjs";
import { UI } from "./i18n.mjs";

/** The theme bootstrap runs before first paint. It is the only inline script, so the CSP names its hash. */
export const THEME_SCRIPT = `try{if(localStorage.getItem("${THEME_KEY}")==="light")document.documentElement.dataset.theme="light"}catch{}`;
export const THEME_SCRIPT_HASH = `sha256-${createHash("sha256").update(THEME_SCRIPT).digest("base64")}`;

/** JSON for a script data block: "<" is written as a unicode escape, so no text can close the block or open a tag. */
export function jsonForScript(value) {
	return JSON.stringify(value)
		.replace(/</g, "\\u003c")
		.replace(/\u2028/g, "\\u2028")
		.replace(/\u2029/g, "\\u2029");
}

export const xmlEscape = (value) => esc(value).replace(/&#39;/g, "&apos;");

export const landingUrl = (lang, key) =>
	`${LANDING_PATH[lang]}#${LANDING_ANCHORS[lang][key]}`;

const ICONS = {
	moon: '<svg class="theme-icon-dark" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 15.1A8.5 8.5 0 0 1 8.9 3.5a8.5 8.5 0 1 0 11.6 11.6Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
	sun: '<svg class="theme-icon-light" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
	menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16M4 16h16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
	download:
		'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
	arrow:
		'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m0 0-5-5m5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

export const icon = (name) => ICONS[name];

/**
 * The document head. `alternates` maps a language to the URL of the same page in that language and drives hreflang;
 * `assets` holds the built stylesheet URLs and the sans font URL to preload.
 */
export function renderHead({
	lang,
	title,
	description,
	canonical,
	alternates,
	assets,
	ogType = "website",
	ogImage,
	ogImageAlt,
	jsonLd,
	robots,
	feedRss,
	feedAtom,
	feed,
	lcpImage,
	lcpSrcset,
	lcpSizes,
}) {
	const ui = UI[lang];
	const hreflang = alternates
		? [
				...Object.entries(alternates).map(
					([code, url]) =>
						`<link rel="alternate" hreflang="${code}" href="${SITE_URL}${url}">`,
				),
				`<link rel="alternate" hreflang="x-default" href="${SITE_URL}${alternates["pt-BR"]}">`,
			].join("\n\t\t")
		: "";
	const locales = Object.keys(alternates ?? {})
		.filter((code) => code !== lang)
		.map(
			(code) =>
				`<meta property="og:locale:alternate" content="${OG_LOCALE[code]}">`,
		)
		.join("\n\t\t");
	const image = ogImage
		? `${SITE_URL}${ogImage}`
		: `${SITE_URL}/og/landing.png`;

	let ldBlock = "";
	if (jsonLd) {
		const payload = Array.isArray(jsonLd)
			? { "@context": "https://schema.org", "@graph": jsonLd }
			: jsonLd;
		ldBlock = `<script type="application/ld+json">${jsonForScript(payload)}</script>`;
	}

	const fullTitle = title.includes(SITE_NAME)
		? title
		: `${title} | ${SITE_NAME}`;

	const rssHref = feedRss ?? feed;
	const atomHref = feedAtom;

	return `<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>${esc(fullTitle)}</title>
		<meta name="description" content="${esc(description)}">
		<meta name="theme-color" media="(prefers-color-scheme: light)" content="#eaeef3">
		<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0c0d0b">
		${robots ? `<meta name="robots" content="${robots}">` : `<meta name="robots" content="index,follow,max-image-preview:large">`}
		<link rel="canonical" href="${SITE_URL}${canonical}">
		${hreflang}
		<meta property="og:type" content="${ogType}">
		<meta property="og:site_name" content="${SITE_NAME}">
		<meta property="og:title" content="${esc(title)}">
		<meta property="og:description" content="${esc(description)}">
		<meta property="og:url" content="${SITE_URL}${canonical}">
		<meta property="og:locale" content="${OG_LOCALE[lang]}">
		${locales}
		<meta property="og:image" content="${image}">
		<meta property="og:image:width" content="1200">
		<meta property="og:image:height" content="630">
		<meta property="og:image:alt" content="${esc(ogImageAlt ?? ui.landing.title)}">
		<meta name="twitter:card" content="summary_large_image">
		<meta name="twitter:title" content="${esc(title)}">
		<meta name="twitter:description" content="${esc(description)}">
		<meta name="twitter:image" content="${image}">
		<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="64x64" href="/favicon.png">
		<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
		${rssHref ? `<link rel="alternate" type="application/rss+xml" title="${esc(ui.blog.title)} (RSS)" href="${rssHref}">` : ""}
		${atomHref ? `<link rel="alternate" type="application/atom+xml" title="${esc(ui.blog.title)} (Atom)" href="${atomHref}">` : ""}
		<link rel="preload" href="${assets.font}" as="font" type="font/woff2" crossorigin>
		${lcpImage ? `<link rel="preload" as="image" href="${lcpImage}"${lcpSrcset ? ` imagesrcset="${lcpSrcset}" imagesizes="${lcpSizes}"` : ""} fetchpriority="high">` : ""}
		<script>${THEME_SCRIPT}</script>
		${assets.css.map((href) => `<link rel="stylesheet" href="${href}">`).join("\n\t\t")}
		${ldBlock}
	</head>`;
}

/** The header. `switchUrls` gives the URL of the current page in every language. */
export function renderHeader({ lang, switchUrls, current }) {
	const ui = UI[lang];
	const nav = ["features", "ai", "publish", "privacy"]
		.map((key) => `<a href="${landingUrl(lang, key)}">${esc(ui.nav[key])}</a>`)
		.concat(
			`<a href="${blogBase(lang)}"${current === "blog" ? ' aria-current="page"' : ""}>${esc(ui.nav.blog)}</a>`,
		);
	const switcher = LANGUAGES.map(
		(code) =>
			`<a href="${switchUrls[code]}" lang="${code}" hreflang="${code}"${code === lang ? ' aria-current="page"' : ""}>${LANGUAGE_LABEL[code]}</a>`,
	).join("");
	const download = landingUrl(lang, "download");
	return `<header class="site-header" data-header>
		<div class="header-bar">
			<a class="wordmark" href="${LANDING_PATH[lang]}" aria-label="${esc(ui.homeLabel)}"><img src="/clipey-256.png" width="30" height="30" alt=""><span>Clipey</span></a>
			<nav class="header-nav" aria-label="${esc(ui.navAria)}">${nav.join("")}</nav>
			<div class="header-actions">
				<div class="lang-switch" role="group" aria-label="${esc(ui.langLabel)}">${switcher}</div>
				<button type="button" class="icon-btn" data-theme-toggle aria-label="${esc(ui.themeToLight)}" data-label-light="${esc(ui.themeToLight)}" data-label-dark="${esc(ui.themeToDark)}">${ICONS.moon}${ICONS.sun}</button>
				<a class="btn btn--primary btn--small" href="${download}">${esc(ui.nav.download)}</a>
				<button type="button" class="icon-btn menu-toggle" id="menu-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="${esc(ui.menu)}" data-label-menu="${esc(ui.menu)}" data-label-close="${esc(ui.closeMenu)}">${ICONS.menu}</button>
			</div>
		</div>
		<div class="mobile-menu" id="mobile-menu" hidden>
			<div class="mobile-menu-inner">
				${nav.join("")}
				<a class="btn btn--primary" href="${download}">${esc(ui.nav.download)}</a>
			</div>
		</div>
	</header>`;
}

export function renderFooter({ lang }) {
	const ui = UI[lang];
	const legal = LEGAL_PATHS[lang];
	const year = new Date().getUTCFullYear();
	return `<footer class="site-footer">
		<div class="footer-grid">
			<div>
				<a class="wordmark" href="${LANDING_PATH[lang]}" aria-label="${esc(ui.homeLabel)}"><img src="/clipey-256.png" width="30" height="30" alt=""><span>Clipey</span></a>
				<p class="footer-note">${esc(ui.footerNote)}</p>
			</div>
			<nav class="footer-col" aria-label="${esc(ui.footerAria)}">
				<h2>${esc(ui.footer.product)}</h2>
				<ul>
					<li><a href="${blogBase(lang)}">${esc(ui.footer.blog)}</a></li>
					<li><a href="${blogBase(lang)}feed.xml">${esc(ui.footer.rss)}</a></li>
					<li><a href="${RELEASES_URL}" rel="noopener noreferrer">${esc(ui.footer.releases)}</a></li>
					<li><a href="${REPO_URL}" rel="noopener noreferrer">${esc(ui.footer.repo)}</a></li>
				</ul>
			</nav>
			<nav class="footer-col" aria-label="${esc(ui.footer.legalHeading)}">
				<h2>${esc(ui.footer.legalHeading)}</h2>
				<ul>
					<li><a href="${legal.privacy}">${esc(ui.footer.privacy)}</a></li>
					<li><a href="${legal.terms}">${esc(ui.footer.terms)}</a></li>
					<li><a href="${legal.deletion}">${esc(ui.footer.deletion)}</a></li>
					<li><a href="mailto:${CONTACT_EMAIL}">${esc(ui.footer.contact)}</a></li>
				</ul>
			</nav>
		</div>
		<div class="footer-legal">
			<p>© ${year} ${OWNER} · CNPJ ${OWNER_CNPJ} · ${esc(ui.footer.location)}. ${esc(ui.footer.rights)}</p>
			${ui.legalNote ? `<p>${esc(ui.legalNote)}</p>` : ""}
		</div>
	</footer>`;
}

export function renderPage({ lang, head, header, body, footer, script }) {
	return `<!doctype html>
<html lang="${lang}" data-theme="dark">
	${head}
	<body>
		<a class="skip-link" href="#main">${esc(UI[lang].skip)}</a>
		${header}
		${body}
		${footer}
		<script type="module" src="${script}"></script>
	</body>
</html>
`;
}
