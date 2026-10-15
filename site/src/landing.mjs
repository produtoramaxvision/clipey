import {
	blogBase,
	CATEGORIES,
	LANDING_ALIASES,
	LANDING_ANCHORS,
	LANDING_PATH,
	LANGUAGES,
	LEGAL_PATHS,
	RELEASES_URL,
} from "./blog/config.mjs";
import { escapeHtml as esc } from "./blog/content.mjs";
import { UI } from "./blog/i18n.mjs";
import {
	icon,
	renderFooter,
	renderHead,
	renderHeader,
	renderPage,
} from "./blog/shell.mjs";
import { LANDING } from "./landing-copy.mjs";

const GLYPHS = {
	record:
		'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="3.2" fill="currentColor"/></svg>',
	edit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M9 4v16M16 4v16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
	caption:
		'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7 11h4M13 11h4M7 15h7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
	export:
		'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V4m0 0L8 8m4-4 4 4M5 14v5h14v-5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
	ai: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.4 2.4M15.3 15.3l2.4 2.4M6.3 17.7l2.4-2.4M15.3 8.7l2.4-2.4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
	clip: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3" width="10" height="18" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M17 8h3M17 12h3M17 16h3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
	voice:
		'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
	mcp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
	calendar:
		'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 10h17M8 3v4M16 3v4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
	kit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16v12H4zM9 7V5h6v2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
	preset:
		'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h2M10 17h10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="16" cy="7" r="2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="8" cy="17" r="2" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
	check:
		'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
	chevron:
		'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
	windows:
		'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5 11 4.4v7H3zM12.5 4.2 21 3v8.4h-8.5zM3 12.6h8v7l-8-1.1zM12.5 12.6H21V21l-8.5-1.2z" fill="currentColor"/></svg>',
};

const FEATURE_GLYPHS = ["record", "edit", "caption", "export"];
const AI_GLYPHS = ["ai", "clip", "voice", "mcp"];
const PUBLISH_GLYPHS = ["calendar", "kit", "preset", "check"];

const ids = (lang, key) => LANDING_ANCHORS[lang][key];

function sectionHead(lang, key, extra = "") {
	const section = LANDING[lang].sections[key];
	return `<header class="section-head">
				<p class="tc"><span class="tc-dot" aria-hidden="true"></span>${section.tc} / ${esc(section.kicker)}</p>
				<h2 class="section-title" id="${ids(lang, key)}-title">${esc(section.title)}</h2>
				${section.sub ? `<p class="section-sub">${esc(section.sub)}</p>` : ""}
				${extra}
			</header>`;
}

function tileList(items, glyphs) {
	return `<ul class="tiles">${items
		.map(
			([title, text], index) => `<li class="tile">
					<span class="tile-glyph">${GLYPHS[glyphs[index]]}</span>
					<h3 class="tile-title">${esc(title)}</h3>
					<p class="tile-text">${esc(text)}</p>
				</li>`,
		)
		.join("")}</ul>`;
}

/** Anchors that older links use: an empty marker element placed right before the section that owns them. */
function aliasMarkers(lang, keyAliases) {
	return keyAliases
		.map((id) => `<span id="${id}" class="anchor-alias"></span>`)
		.join("");
}

function hero(lang, copy, newsUrl) {
	return `<section class="hero" aria-labelledby="hero-title">
			<div class="hero-copy">
				<p class="tc"><span class="tc-dot" aria-hidden="true"></span>${esc(copy.eyebrow)}</p>
				<h1 class="hero-title" id="hero-title">${esc(copy.hero)}</h1>
				<p class="hero-sub">${esc(copy.sub)}</p>
				<div class="hero-actions">
					<a class="btn btn--primary" href="${RELEASES_URL}" rel="noopener noreferrer">${icon("download")}${esc(copy.download)}</a>
					<a class="btn btn--ghost" href="${newsUrl}">${esc(copy.news)}</a>
				</div>
				<ul class="hero-notes">${copy.note.map((note) => `<li class="tc">${esc(note)}</li>`).join("")}</ul>
			</div>
			<figure class="hero-frame" aria-label="${esc(copy.frameLabel)}">
				<span class="frame">
					<span class="frame-empty" role="img" aria-label="${esc(copy.framePending)}">
						<span class="frame-track frame-track--video"></span>
						<span class="frame-track frame-track--audio"></span>
						<span class="frame-playhead"></span>
					</span>
					<span class="frame-ruler" aria-hidden="true"></span>
					<span class="frame-tc frame-tc--start" aria-hidden="true">00:00</span>
					<span class="frame-tc frame-tc--end" aria-hidden="true">00:30</span>
				</span>
				<figcaption class="tc">${esc(copy.frameCaption)}</figcaption>
			</figure>
		</section>`;
}

function faq(lang, copy) {
	return `<section class="section" id="${ids(lang, "faq")}" aria-labelledby="faq-title">
			${sectionHead(lang, "faq").replace(`id="${ids(lang, "faq")}-title"`, 'id="faq-title"')}
			<div class="faq">${copy.faq
				.map(
					([question, answer]) =>
						`<details class="faq-item"><summary><span>${esc(question)}</span>${GLYPHS.chevron}</summary><p>${esc(answer)}</p></details>`,
				)
				.join("")}</div>
		</section>`;
}

function blogTeaser(lang, copy, posts) {
	const section = copy.sections.blog;
	const picks = posts.slice(0, 3);
	return `<section class="section" id="${ids(lang, "blog")}" aria-labelledby="teaser-title">
			${sectionHead(lang, "blog").replace(`id="${ids(lang, "blog")}-title"`, 'id="teaser-title"')}
			<ul class="teasers">${picks
				.map((post, index) => {
					const item = post.content[lang];
					return `<li class="teaser"><a href="${item.url}"><span class="tc">0${index + 1} / ${esc(CATEGORIES[post.categoryKey][lang].label)}</span><span class="teaser-title">${esc(item.title)}</span><span class="teaser-text">${esc(item.description)}</span></a></li>`;
				})
				.join("")}</ul>
			<a class="text-link" href="${blogBase(lang)}">${esc(section.link)}${icon("arrow")}</a>
		</section>`;
}

function downloadBand(lang, copy) {
	const section = copy.sections.download;
	return `<section class="download" id="${ids(lang, "download")}" aria-labelledby="download-title">
			<p class="tc"><span class="tc-dot" aria-hidden="true"></span>${section.tc} / ${esc(section.kicker)}</p>
			<h2 class="download-title" id="download-title">${esc(section.title)}</h2>
			<p class="download-sub">${esc(copy.note.join(" · "))}</p>
			<div class="download-actions">
				<a class="btn btn--primary" href="${RELEASES_URL}" rel="noopener noreferrer">${GLYPHS.windows.replace("<svg", '<svg width="18" height="18"')}${esc(copy.download)}</a>
			</div>
		</section>`;
}

function jsonLd(lang, canonical) {
	const ui = UI[lang];
	return [
		{
			"@context": "https://schema.org",
			"@type": "SoftwareApplication",
			name: "Clipey",
			applicationCategory: "MultimediaApplication",
			operatingSystem: "Windows 10, Windows 11",
			description: ui.landing.description,
			inLanguage: lang,
			url: `https://clipey.com.br${canonical}`,
			downloadUrl: RELEASES_URL,
			offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
		},
	];
}

export function renderLanding(lang, posts, assets) {
	const ui = UI[lang];
	const copy = LANDING[lang];
	const canonical = LANDING_PATH[lang];
	const alternates = Object.fromEntries(
		LANGUAGES.map((code) => [code, LANDING_PATH[code]]),
	);
	const privacy = copy.sections.privacy;
	const legal = LEGAL_PATHS[lang];
	const body = `<main id="main">
		${hero(lang, copy, (posts.find((post) => post.featured) ?? posts[0]).content[lang].url)}
		<section class="section" id="${ids(lang, "features")}" aria-labelledby="${ids(lang, "features")}-title">
			${aliasMarkers(lang, aliasesFor(lang, "features"))}
			${sectionHead(lang, "features")}
			${tileList(copy.features, FEATURE_GLYPHS)}
		</section>
		<section class="section" id="${ids(lang, "ai")}" aria-labelledby="${ids(lang, "ai")}-title">
			${sectionHead(lang, "ai")}
			${tileList(copy.ai, AI_GLYPHS)}
		</section>
		<section class="section" id="${ids(lang, "publish")}" aria-labelledby="${ids(lang, "publish")}-title">
			${sectionHead(lang, "publish")}
			${tileList(copy.publish, PUBLISH_GLYPHS)}
		</section>
		<section class="section section--split" id="${ids(lang, "privacy")}" aria-labelledby="${ids(lang, "privacy")}-title">
			${aliasMarkers(lang, aliasesFor(lang, "privacy"))}
			${sectionHead(lang, "privacy", `<p class="link-row"><a class="text-link" href="${legal.privacy}">${esc(privacy.link)}${icon("arrow")}</a><a class="text-link" href="${legal.deletion}">${esc(privacy.link2)}${icon("arrow")}</a></p>`)}
		</section>
		<section class="section section--split" id="${ids(lang, "requirements")}" aria-labelledby="${ids(lang, "requirements")}-title">
			${sectionHead(lang, "requirements")}
		</section>
		${blogTeaser(lang, copy, posts)}
		${faq(lang, copy)}
		${aliasMarkers(lang, aliasesFor(lang, "download"))}
		${downloadBand(lang, copy)}
	</main>`;
	const head = renderHead({
		lang,
		title: ui.landing.title,
		description: ui.landing.description,
		canonical,
		alternates,
		assets,
		jsonLd: jsonLd(lang, canonical),
		feed: `${blogBase(lang)}rss.xml`,
	});
	return renderPage({
		lang,
		head,
		header: renderHeader({ lang, switchUrls: alternates, current: "home" }),
		body,
		footer: renderFooter({ lang }),
		script: assets.landingScript,
	});
}

function aliasesFor(lang, key) {
	return LANDING_ALIASES[lang][key] ?? [];
}
