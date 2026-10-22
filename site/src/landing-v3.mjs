/**
 * The v3 landing (owner-approved Claude Design canvas: Main.dc.html at 1440, Mobile.dc.html at 390). One document for
 * every width; landing.css switches the phone layout. Server-side HTML only: no inline styles and no inline scripts
 * (the CSP forbids both), every colour comes from tokens.css, every position of the recording bar tour from classes.
 */
import {
	APP_VERSION,
	blogBase,
	CONTACT_EMAIL,
	LANDING_ALIASES,
	LANDING_ANCHORS,
	LANDING_PATH,
	LANGUAGE_LABEL,
	LANGUAGES,
	LEGAL_PATHS,
	OWNER,
	RELEASES_URL,
} from "./blog/config.mjs";
import { escapeHtml as esc } from "./blog/content.mjs";
import { UI } from "./blog/i18n.mjs";
import { icon, renderHead, renderPage } from "./blog/shell.mjs";
import { pageMedia, readMediaManifest, VIDEOS } from "./landing-media.mjs";
import { LANDING } from "./landing-v3-copy.mjs";

/** "1.15.0" is shown as "1.15", as the design writes it. */
export const VERSION_LABEL = APP_VERSION.split(".").slice(0, 2).join(".");

/** The footer's MaxVision link (a tracked short link, so it keeps exactly rel="noopener"). */
export const OWNER_LINK = "https://link.produtoramaxvision.com.br/maxvision-clipey";

/** Section ids of the page in each language, keyed by chapter, in page order. */
export const SECTION_IDS = {
	"pt-BR": {
		hero: "topo",
		compat: "compatibilidade",
		record: "gravar",
		edit: "editar",
		publish: "publicar",
		phone: "celular",
		local: "seu-pc",
		download: "baixar",
	},
	en: {
		hero: "top",
		compat: "compatibility",
		record: "record",
		edit: "edit",
		publish: "publish",
		phone: "phone",
		local: "your-pc",
		download: "download",
	},
	es: {
		hero: "inicio",
		compat: "compatibilidad",
		record: "grabar",
		edit: "editar",
		publish: "publicar",
		phone: "movil",
		local: "tu-pc",
		download: "descargar",
	},
};

/** The chapter that answers each landing anchor the blog and older links use (LANDING_ANCHORS keys). */
const ANCHOR_CHAPTER = {
	features: "record",
	ai: "edit",
	publish: "publish",
	privacy: "local",
	requirements: "compat",
	download: "download",
	faq: "download",
};

/** Section ids of the v2 landing that have no section of their own any more, by chapter that now answers them. */
const V2_IDS = {
	"pt-BR": { download: ["exportar"], edit: ["overlays", "vertical"] },
	en: { download: ["export"], edit: ["overlays", "vertical"] },
	es: { download: ["exportar"], edit: ["overlays", "vertical"] },
};

/** The older anchors a chapter also answers to in one language, without its own id and without repeats. */
export function sectionAliases(lang, chapter) {
	const ids = Object.entries(ANCHOR_CHAPTER)
		.filter(([, target]) => target === chapter)
		.flatMap(([key]) => [
			LANDING_ANCHORS[lang][key],
			...(LANDING_ALIASES[lang][key] ?? []),
		])
		.concat(V2_IDS[lang][chapter] ?? []);
	return [...new Set(ids)].filter((id) => id !== SECTION_IDS[lang][chapter]);
}

const aliasMarkers = (lang, chapter) =>
	sectionAliases(lang, chapter)
		.map((id) => `<span id="${id}" class="anchor-alias"></span>`)
		.join("");

const withVersion = (text) => text.replaceAll("{version}", VERSION_LABEL);

const ICON = {
	download:
		'<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>',
	rec: '<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="7"/></svg>',
	zoom: '<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="6"/><path d="m20 20-4.3-4.3"/><path d="M11 8.5v5M8.5 11h5"/></svg>',
	up: '<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>',
	alert:
		'<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5"/><path d="M12 16h.01"/></svg>',
	rotate:
		'<svg class="rotate-icon" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M3 14a9 9 0 0 0 6 6"/><path d="m3 18 0-4 4 0"/></svg>',
	check:
		'<svg class="rotate-check" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
	cursor:
		'<svg class="hud-cursor" aria-hidden="true" viewBox="0 0 24 24"><path d="M5 3l14 8.2-6.1 1.4L10 19z"/></svg>',
	menu: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
	pause:
		'<svg class="icon-pause" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
	play: '<svg class="icon-play" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z"/></svg>',
};

/** A pause/play toggle. Scripts show it and keep its label in step; without scripts it stays hidden. */
const toggle = (className, attr, pause, play) =>
	`<button type="button" class="media-toggle ${className}" ${attr} data-label-pause="${esc(pause)}" data-label-play="${esc(play)}" aria-label="${esc(pause)}" hidden>${ICON.pause}${ICON.play}</button>`;

function header(lang, copy, alternates) {
	const ui = UI[lang];
	const ids = SECTION_IDS[lang];
	const links = copy.nav.items
		.map(([chapter, label]) => `<a href="#${ids[chapter]}">${esc(label)}</a>`)
		.concat(`<a href="${blogBase(lang)}">${esc(copy.nav.blog)}</a>`)
		.join("");
	const switcher = LANGUAGES.map(
		(code) =>
			`<a href="${alternates[code]}" lang="${code}" hreflang="${code}"${code === lang ? ' aria-current="page"' : ""}>${LANGUAGE_LABEL[code]}</a>`,
	).join("");
	const langGroup = `<div class="lang-switch" role="group" aria-label="${esc(ui.langLabel)}">${switcher}</div>`;
	return `<header class="lp-header">
		<div class="lp-header-bar">
			<a class="lp-brand" href="#${ids.hero}" aria-label="${esc(ui.homeLabel)}"><img src="/clipey-256.png" width="28" height="28" alt=""><span>Clipey</span></a>
			<nav class="lp-nav" aria-label="${esc(copy.nav.aria)}">${links}</nav>
			${langGroup}
			<button type="button" class="icon-btn lp-theme-toggle" data-theme-toggle aria-label="${esc(ui.themeToLight)}" data-label-light="${esc(ui.themeToLight)}" data-label-dark="${esc(ui.themeToDark)}">${icon("moon")}${icon("sun")}</button>
			<a class="lp-header-cta" href="#${ids.download}">${ICON.download}<span class="lp-cta-long">${esc(copy.nav.download)}</span><span class="lp-cta-short">${esc(copy.nav.downloadShort)}</span></a>
			<button type="button" class="lp-menu-toggle" id="menu-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="${esc(ui.menu)}" data-label-menu="${esc(ui.menu)}" data-label-close="${esc(ui.closeMenu)}">${ICON.menu}</button>
		</div>
		<div class="lp-mobile-menu" id="mobile-menu" hidden>
			<nav class="lp-mobile-nav" aria-label="${esc(copy.nav.aria)}">${links}</nav>
			${langGroup}
		</div>
	</header>`;
}

/**
 * A slot is shown only once its recording exists. A poster alone would describe a video that is not there (the
 * captions poster is the editor without captions), so a slot without sources renders nothing until they are added.
 */
const hasVideo = (video) => video.sources.length > 0;

/** The hero video slot and, further down, the captions slot. `lazy` slots keep their sources as data-src until seen. */
function videoSlot(copy, media, video, { label, lazy = false, className = "" }) {
	const poster = media.poster(video);
	const srcAttr = lazy ? "data-src" : "src";
	const sources = video.sources
		.map(([src, type]) => `<source ${srcAttr}="${src}" type="${type}">`)
		.join("");
	// Lazy slots carry the same attributes; their sources wait in data-src, so nothing loads before the slot is near.
	const attrs = 'autoplay muted loop playsinline preload="metadata"';
	return `<div class="vslot ${className}" data-vslot${lazy ? " data-vslot-lazy" : ""}>
					<video class="vslot-video" ${attrs} poster="${poster}" width="${video.width}" height="${video.height}" aria-label="${esc(label)}">${sources}</video>
					${toggle("vslot-toggle", "data-vslot-toggle", copy.video.pause, copy.video.play)}
				</div>`;
}

function hero(lang, copy, media) {
	const ids = SECTION_IDS[lang];
	const h = copy.hero;
	const [line1, brand, verb] = h.title;
	const lanes = h.lanes
		.map(
			([chapter, label, tag]) =>
				`<a class="lane lane--${chapter}" href="#${ids[chapter]}">${ICON[{ record: "rec", edit: "zoom", publish: "up" }[chapter]]}<span>${esc(label)}</span>${tag ? `<span class="lane-tag">${esc(tag)}</span>` : ""}</a>`,
		)
		.join("");
	return `<section class="lp-hero" id="${ids.hero}" aria-labelledby="hero-title">
			<div class="lp-hero-inner">
				<p class="rec-pill"><span class="rec-dot" aria-hidden="true"></span>${esc(h.rec)}<span class="rec-sep" aria-hidden="true">/</span><span>Clipey ${VERSION_LABEL}<span class="rec-platforms"> ${esc(h.platforms)}</span></span></p>
				<h1 class="lp-h1" id="hero-title">${esc(line1)}<br>${esc(brand)} <span class="accent">${esc(verb)}</span></h1>
				<p class="lp-sub">${esc(h.sub)}</p>
				<div class="cta-group cta-group--pair cta-group--wide">
					<a class="cta cta--primary" href="#${ids.download}">${ICON.download}<span>${esc(h.cta[0])}</span></a>
					<a class="cta cta--ghost" href="#${ids.download}">${esc(h.cta[1])}</a>
				</div>
				<div class="cta-group cta-group--pair cta-group--phone">
					<a class="cta cta--primary" href="#${ids.download}">${esc(h.ctaPhone[0])}</a>
					<a class="cta cta--ghost" href="#${ids.phone}">${esc(h.ctaPhone[1])}</a>
				</div>
				<p class="lp-meta">${esc(withVersion(h.meta))}</p>
				<nav class="lp-timeline" aria-label="${esc(h.timelineAria)}">
					<div class="lp-ticks" aria-hidden="true">${h.ticks.map((tick) => `<span>${esc(tick)}</span>`).join("")}</div>
					<div class="lp-ruler" aria-hidden="true"></div>
					<div class="lp-lanes">${lanes}<span class="lp-playhead" aria-hidden="true"></span></div>
				</nav>
				<figure class="lp-hero-figure">
					<div class="media-frame">
						${videoSlot(copy, media, VIDEOS.tour, { label: h.videoLabel, className: "vslot--hero" })}
					</div>
					<figcaption class="lp-caption">${esc(withVersion(h.caption))}</figcaption>
				</figure>
			</div>
		</section>`;
}

function compat(lang, copy) {
	const groups = copy.compat.groups
		.map(
			([label, items], index) =>
				`${index ? '<span class="compat-sep" aria-hidden="true"></span>' : ""}<div class="compat-group"><span class="compat-label" id="compat-${index}">${esc(label)}</span><ul class="compat-items" role="list" aria-labelledby="compat-${index}">${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div>`,
		)
		.join("");
	return `<section class="lp-compat" id="${SECTION_IDS[lang].compat}" aria-label="${esc(copy.compat.aria)}">
			${aliasMarkers(lang, "compat")}
			<div class="lp-wrap compat-row">${groups}</div>
		</section>`;
}

const marker = (text, lane) => `<p class="marker marker--${lane}">${esc(text)}</p>`;

/** The recording bar tour: the real bar, a highlight ring, a tooltip and the cursor per button, in the app's words. */
function hud(copy, media) {
	const h = copy.record.hud;
	const slots = h.labels.map((_, index) => index + 1);
	return `<figure class="hud" data-hud>
				<div class="hud-stage" data-hud-stage>
					<div class="hud-track">
						${media.img("hud-bar", { alt: h.alt, sizes: "(max-width: 640px) 760px, (max-width: 1144px) calc(100vw - 64px), 1080px", className: "hud-img" })}
						${slots.map((slot) => `<span class="hud-ring hud-slot--${slot}" aria-hidden="true"></span>`).join("")}
						${h.labels.map((label, index) => `<span class="hud-tip hud-slot--${index + 1}" aria-hidden="true">${esc(label)}</span>`).join("")}
						<span class="hud-cursor-track" aria-hidden="true">${ICON.cursor}</span>
					</div>
				</div>
				<ol class="hud-legend" aria-label="${esc(h.legendAria)}">${h.labels.map((label) => `<li>${esc(label)}</li>`).join("")}</ol>
				<figcaption class="lp-caption hud-caption">${esc(withVersion(h.caption))}${toggle("hud-toggle", "data-hud-toggle", h.pause, h.play)}</figcaption>
			</figure>`;
}

function recordSection(lang, copy, media) {
	const s = copy.record;
	return `<section class="lp-section lp-record" id="${SECTION_IDS[lang].record}" aria-labelledby="record-title">
			${aliasMarkers(lang, "record")}
			<div class="lp-wrap record-grid">
				<div class="record-copy">
					${marker(s.marker, "record")}
					<h2 class="lp-h2" id="record-title">${esc(s.title)}</h2>
					<p class="lp-lede">${esc(s.text)}</p>
				</div>
				<ul class="dot-list" role="list">${s.list.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
			</div>
			<div class="lp-wrap">${hud(copy, media)}</div>
		</section>`;
}

function editSection(lang, copy, media) {
	const s = copy.edit;
	const chip = (kind, text) =>
		kind === "langs"
			? `<span class="langs" data-anim aria-hidden="true">${s.langs.map((code, index) => `<span class="lang-chip lang-chip--${index + 1}">${esc(code)}</span>`).join("")}</span>`
			: `<span class="chip chip--${kind}" aria-hidden="true">${esc(text)}</span>`;
	return `<section class="lp-section lp-edit" id="${SECTION_IDS[lang].edit}" aria-labelledby="edit-title">
			${aliasMarkers(lang, "edit")}
			<div class="lp-wrap">
				<div class="edit-head">
					<div class="edit-copy">
						${marker(s.marker, "edit")}
						<h2 class="lp-h2" id="edit-title">${esc(s.title)}</h2>
					</div>
					<p class="lp-lede edit-lede">${esc(s.text)}</p>
				</div>
				<div class="cards">${s.cards
					.map(
						([kind, text, title, body]) => `<article class="card">
						${chip(kind, text)}
						<h3>${esc(title)}</h3>
						<p>${esc(body)}</p>
					</article>`,
					)
					.join("")}</div>
				${hasVideo(VIDEOS.captions) ? `<figure class="captions-figure">
					<div class="media-frame">
						${videoSlot(copy, media, VIDEOS.captions, { label: s.captionsLabel, lazy: true })}
					</div>
					<figcaption class="lp-caption">${esc(s.captionsCaption)}</figcaption>
				</figure>` : ""}
			</div>
		</section>`;
}

const IMAGE_SIZES = "(max-width: 1000px) calc(100vw - 32px), 700px";

function publishSection(lang, copy, media) {
	const s = copy.publish;
	return `<section class="lp-section lp-publish" id="${SECTION_IDS[lang].publish}" aria-labelledby="publish-title">
			${aliasMarkers(lang, "publish")}
			<div class="lp-wrap split">
				<div class="split-media shot-frame">${media.img("export", { alt: s.alt, sizes: IMAGE_SIZES })}</div>
				<div class="split-copy">
					${marker(s.marker, "publish")}
					<h2 class="lp-h2" id="publish-title">${esc(s.title)}</h2>
					<p class="lp-lede">${esc(s.text)}</p>
					<p class="note">${ICON.alert}<span>${esc(s.note)}</span></p>
				</div>
			</div>
		</section>`;
}

function phoneSection(lang, copy) {
	const s = copy.phone;
	return `<section class="lp-section lp-phone" id="${SECTION_IDS[lang].phone}" aria-labelledby="phone-title">
			<div class="lp-wrap">
				<div class="phone-card">
					<div class="phone-copy">
						${marker(s.marker, "record")}
						<h2 class="lp-h2 lp-h2--card" id="phone-title">${esc(s.title)}</h2>
						<p class="lp-lede">${esc(s.text)}</p>
					</div>
					<div class="phone-demo">
						<input type="checkbox" id="rotate-phone" class="rotate-input">
						<label for="rotate-phone" class="rotate-btn">${ICON.rotate}${ICON.check}<span>${esc(s.rotate)}</span></label>
						<div class="phone-stage" data-anim aria-hidden="true">
							<div class="phone-float">
								<div class="phone">
									<div class="phone-face phone-face--portrait">${esc(s.portrait)}</div>
									<div class="phone-face phone-face--landscape"><span>${esc(s.landscape)}</span></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>`;
}

function localSection(lang, copy, media) {
	const s = copy.local;
	return `<section class="lp-section lp-local" id="${SECTION_IDS[lang].local}" aria-labelledby="local-title">
			${aliasMarkers(lang, "local")}
			<div class="lp-wrap split">
				<div class="split-media shot-frame">${media.img("settings-transcription", { alt: s.alt, sizes: IMAGE_SIZES })}</div>
				<div class="split-copy">
					${marker(s.marker, "record")}
					<h2 class="lp-h2 lp-h2--card" id="local-title">${esc(s.title)}</h2>
					<p class="lp-lede">${esc(s.text)}</p>
					<p class="text-link-row"><a href="${LEGAL_PATHS[lang].privacy}">${esc(s.link)}</a></p>
				</div>
			</div>
		</section>`;
}

function downloadSection(lang, copy) {
	const s = copy.download;
	const [win, mac, linux] = s.buttons;
	return `<section class="lp-section lp-download" id="${SECTION_IDS[lang].download}" aria-labelledby="download-title">
			${aliasMarkers(lang, "download")}
			<div class="lp-wrap">
				${marker(s.marker, "neutral")}
				<h2 class="mega" id="download-title">${esc(s.title)}<span class="accent" aria-hidden="true">.</span></h2>
				<div class="cta-group cta-group--trio" role="group" aria-label="${esc(s.aria)}">
					<a class="cta cta--primary" href="${RELEASES_URL}" rel="noopener noreferrer">${esc(win)}</a>
					<a class="cta cta--ghost" href="${RELEASES_URL}" rel="noopener noreferrer">${esc(mac)}</a>
					<a class="cta cta--ghost" href="${RELEASES_URL}" rel="noopener noreferrer">${esc(linux)}</a>
				</div>
			</div>
		</section>`;
}

function footer(lang, copy) {
	const ui = UI[lang];
	const legal = LEGAL_PATHS[lang];
	const year = new Date().getUTCFullYear();
	return `<footer class="lp-footer">
		<div class="lp-wrap lp-footer-row">
			<a class="lp-footer-brand" href="${LANDING_PATH[lang]}" aria-label="${esc(ui.homeLabel)}"><img src="/clipey-256.png" width="20" height="20" alt="" loading="lazy" decoding="async"><span>Clipey</span></a>
			<nav class="lp-footer-links" aria-label="${esc(ui.footerAria)}">
				<a href="${legal.privacy}">${esc(ui.footer.privacy)}</a>
				<a href="${legal.terms}">${esc(ui.footer.terms)}</a>
				<a href="${legal.deletion}">${esc(ui.footer.deletion)}</a>
				<a href="mailto:${CONTACT_EMAIL}">${esc(copy.footer.support)}</a>
			</nav>
			<p class="lp-footer-copy">© ${year} <a href="${OWNER_LINK}" rel="noopener">${OWNER}</a></p>
		</div>
	</footer>`;
}

/** The landing page of one language. `jsonLd` is built by the caller. */
export function renderLanding3(lang, { assets, alternates, jsonLd }) {
	const ui = UI[lang];
	const copy = LANDING[lang];
	const media = pageMedia(readMediaManifest(), lang);
	const body = `<main id="main" class="lp">
		${hero(lang, copy, media)}
		${compat(lang, copy)}
		${recordSection(lang, copy, media)}
		${editSection(lang, copy, media)}
		${publishSection(lang, copy, media)}
		${phoneSection(lang, copy)}
		${localSection(lang, copy, media)}
		${downloadSection(lang, copy)}
	</main>`;
	const head = renderHead({
		lang,
		title: ui.landing.title,
		description: ui.landing.description,
		canonical: LANDING_PATH[lang],
		alternates,
		assets,
		jsonLd,
		feedRss: `${blogBase(lang)}feed.xml`,
		feedAtom: `${blogBase(lang)}atom.xml`,
		lcpImage: media.poster(VIDEOS.tour),
	});
	return renderPage({
		lang,
		head,
		header: header(lang, copy, alternates),
		body,
		footer: footer(lang, copy),
		script: assets.script,
	});
}
