/**
 * The v2 landing, "the site is a Clipey recording": a title bar, the hero told over a real Clipey timeline,
 * a sticky timeline whose chapters are the sections, and the export at the end. Server-side HTML only:
 * no inline styles and no inline scripts (the CSP forbids both), every colour comes from tokens.css.
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
	RELEASE_DATE,
	RELEASES_URL,
} from "./blog/config.mjs";
import { escapeHtml as esc } from "./blog/content.mjs";
import { UI } from "./blog/i18n.mjs";
import { icon, renderHead, renderPage } from "./blog/shell.mjs";
import { STORY } from "./landing-copy.mjs";
import { pageShots, readShotManifest } from "./landing-shots.mjs";

/**
 * The one picture of the hero: a real timeline crop with the zoom regions and no recording in it. The demo recording
 * replaces it here, under this name; the overlay positions in landing.css (--hero-focus-*) follow the picture.
 */
export const HERO_SHOT = "timeline-zoom-regions-dark";
export const HERO_SIZES = "(max-width: 1000px) 100vw, 60vw";
/** The full editor further down; the light theme shows the light editor, lazy, so dark visitors never download it. */
export const EDITOR_SHOT = "editor-full-speed-zoom-lanes-dark";
export const EDITOR_SHOT_LIGHT = "editor-full-light";

/** Section ids of the v2 page in each language, keyed by chapter. */
export const SECTION_IDS = {
	"pt-BR": {
		hero: "topo",
		record: "gravar",
		clicks: "editar",
		overlays: "overlays",
		vertical: "vertical",
		publish: "publicar",
		local: "seu-pc",
		faq: "faq",
		export: "exportar",
	},
	en: {
		hero: "top",
		record: "record",
		clicks: "edit",
		overlays: "overlays",
		vertical: "vertical",
		publish: "publish",
		local: "your-pc",
		faq: "faq",
		export: "export",
	},
	es: {
		hero: "inicio",
		record: "grabar",
		clicks: "editar",
		overlays: "overlays",
		vertical: "vertical",
		publish: "publicar",
		local: "tu-pc",
		faq: "faq",
		export: "exportar",
	},
};

/** The chapter that answers each landing anchor the blog and older links use (LANDING_ANCHORS keys). */
const ANCHOR_CHAPTER = {
	features: "record",
	ai: "clicks",
	publish: "publish",
	privacy: "local",
	requirements: "export",
	download: "export",
	faq: "faq",
};

/** The older anchors a chapter also answers to in one language, without its own id and without repeats. */
export function sectionAliases(lang, chapter) {
	const ids = Object.entries(ANCHOR_CHAPTER)
		.filter(([, target]) => target === chapter)
		.flatMap(([key]) => [
			LANDING_ANCHORS[lang][key],
			...(LANDING_ALIASES[lang][key] ?? []),
		]);
	return [...new Set(ids)].filter((id) => id !== SECTION_IDS[lang][chapter]);
}

/** The id attribute of a chapter section, with the alias markers in front of it. */
const sectionAnchor = (lang, chapter) => `id="${SECTION_IDS[lang][chapter]}"`;

const aliasMarkers = (lang, chapter) =>
	sectionAliases(lang, chapter)
		.map((id) => `<span id="${id}" class="anchor-alias"></span>`)
		.join("");

/** The "00:01:00 · Cliques e zoom" marker over a section title, in the lane colour of its chapter. */
const marker = (tc, lane) => `<p class="marker marker--${lane}">${esc(tc)}</p>`;

function titleBar(lang, copy, alternates) {
	const ui = UI[lang];
	const bar = copy.bar;
	const switcher = LANGUAGES.map(
		(code) =>
			`<a href="${alternates[code]}" lang="${code}" hreflang="${code}"${code === lang ? ' aria-current="page"' : ""}>${LANGUAGE_LABEL[code]}</a>`,
	).join("");
	return `<header class="titlebar" data-header>
		<a class="titlebar-brand" href="#${SECTION_IDS[lang].hero}" aria-label="${esc(ui.homeLabel)}"><img src="/clipey-256.png" width="24" height="24" alt=""><span>Clipey</span></a>
		<span class="titlebar-sep" aria-hidden="true"></span>
		<span class="titlebar-host">${esc(bar.host)}<span class="rec-dot" role="img" aria-label="${esc(bar.recording)}"></span></span>
		<nav class="chapters" aria-label="${esc(bar.chaptersAria)}">${bar.chapters
			.map(
				([chapter, label]) =>
					`<a class="chapter" href="#${SECTION_IDS[lang][chapter]}">${esc(label)}</a>`,
			)
			.join("")}</nav>
		<div class="titlebar-actions">
			<div class="lang-switch" role="group" aria-label="${esc(ui.langLabel)}">${switcher}</div>
			<button type="button" class="icon-btn" data-theme-toggle aria-label="${esc(ui.themeToLight)}" data-label-light="${esc(ui.themeToLight)}" data-label-dark="${esc(ui.themeToDark)}">${icon("moon")}${icon("sun")}</button>
			<a class="titlebar-link" href="${blogBase(lang)}">${esc(bar.blog)}</a>
			<a class="export-btn export-btn--bar" href="#${SECTION_IDS[lang].export}">${icon("download")}<span>${esc(bar.export)}</span></a>
		</div>
	</header>`;
}

/** The silence cut: two kept stretches with the hatched gap between them. */
const cutStrip = (copy, attrs = "") =>
	`<span class="cut-strip"${attrs}><span class="cut-keep"></span><span class="cut-gap"></span><span class="cut-keep"></span><span class="cut-tag">${esc(copy.cutTag)}</span></span>`;

/** The hero picture with the overlays the scroll story switches on: click rings, zoom box, cut, caption, 9:16 mask. */
function heroStage(copy, shots) {
	const hero = copy.hero;
	const [lead, keyword] = copy.captionText;
	return `<figure class="hero-stage">
				<div class="hero-shot">
					<div class="hero-cam">
						${shots.img(HERO_SHOT, { alt: hero.imageAlt, sizes: HERO_SIZES, className: "hero-img", priority: true })}
						<span class="click-ring" aria-hidden="true"></span>
					</div>
					<span class="zoom-box" aria-hidden="true"><span class="zoom-tag">${esc(hero.zoomTag)}</span></span>
					${cutStrip(copy, ' aria-hidden="true"')}
					<span class="burn-caption" aria-hidden="true">${esc(lead)} <em>${esc(keyword)}</em></span>
					<span class="vertical-mask" aria-hidden="true"></span>
				</div>
				<svg class="ink ink--hero" viewBox="0 0 300 170" aria-hidden="true"><path d="M10 30 C 80 10, 170 20, 230 70 S 280 140, 286 152"/><path d="M268 140 l19 14 4 -22"/></svg>
				<span class="ink-note" aria-hidden="true">${esc(hero.drawNote)}</span>
				<figcaption class="meta">${esc(hero.caption)}</figcaption>
			</figure>`;
}

/** What each still draws over the picture, in frame order: raw, click, zoom, cut, caption, 9:16. */
const stillOverlay = (copy, index) => {
	const [lead, keyword] = copy.captionText;
	return [
		"",
		'<span class="click-ring"></span>',
		'<span class="click-ring"></span>',
		cutStrip(copy),
		`<span class="burn-caption">${esc(lead)} <em>${esc(keyword)}</em></span>`,
		'<span class="vertical-mask"></span>',
	][index];
};

/** The six scroll states as captioned stills: the reduced-motion and no-support view, and the captions of the story. */
function storyStills(copy, shots) {
	const set = shots.set(HERO_SHOT);
	return `<ol class="story-stills" aria-label="${esc(copy.storyAria)}">${copy.frames
		.map(
			([tc, title, text], index) => `<li class="still still--${index + 1}">
					<span class="still-frame" aria-hidden="true"><span class="still-cam"><img src="${set.small}" width="${set.width}" height="${set.height}" alt="" loading="lazy" decoding="async"></span>${stillOverlay(copy, index)}<span class="still-tc">${esc(tc)}</span></span>
					<span class="still-title">${esc(title)}</span>
					<span class="still-text">${esc(text)}</span>
				</li>`,
		)
		.join("")}</ol>`;
}

function hero(lang, copy, shots) {
	const hero = copy.hero;
	return `<section class="story-hero" ${sectionAnchor(lang, "hero")} aria-labelledby="hero-title">
			<div class="story-hero-grid">
				<div class="story-copy">
					<h1 class="stair" id="hero-title">${hero.lines
						.map(
							([lane, tc, label, text]) =>
								`<span class="stair-line stair-line--${lane}"><span class="stair-tc" aria-hidden="true"><span class="lane-bar lane-bar--${lane}"></span>${esc(tc)} · ${esc(label)}</span><span class="stair-text">${esc(text)}</span></span>`,
						)
						.join(" ")}</h1>
					<p class="story-sub">${esc(hero.sub)}</p>
					<p class="story-def">${esc(hero.definition)}</p>
					<div class="story-actions">
						<a class="export-btn export-btn--hero" href="#${SECTION_IDS[lang].export}">${esc(hero.download)}</a>
						<p class="meta">${esc(hero.platform)}<br>${esc(hero.noAccount)}</p>
					</div>
				</div>
				${heroStage(copy, shots)}
			</div>
			${storyStills(copy, shots)}
		</section>`;
}

/** The sticky timeline: the ruler, one pill per chapter in its lane colour, and the violet playhead. */
function timeline(copy) {
	const tl = copy.timeline;
	return `<div class="timeline" aria-hidden="true">
		<div class="timeline-inner">
			<div class="timeline-ticks">${tl.ticks.map((tick) => `<span>${esc(tick)}</span>`).join("")}</div>
			<div class="timeline-lane">${tl.chapters
				.map(
					([lane, label], index) =>
						`<span class="lane-pill lane-pill--${lane} lane-pill--${index + 1}">${esc(label)}</span>`,
				)
				.join("")}</div>
			<span class="playhead"></span>
		</div>
	</div>`;
}

function recordSection(lang, copy, shots) {
	const s = copy.record;
	return `<section class="chapter-section record-section split split--even" ${sectionAnchor(lang, "record")} aria-labelledby="record-title">
			${aliasMarkers(lang, "record")}
			<div class="copy">
				${marker(s.tc, "clip")}
				<h2 class="h2" id="record-title">${s.title.map(esc).join("<br>")}</h2>
				<p class="lede">${esc(s.text)}</p>
			</div>
			<figure class="hud-figure">
				${shots.img("launch-hud-recording-bar", { alt: s.imageAlt, sizes: "(max-width: 1000px) 90vw, 560px" })}
				<figcaption class="meta">${esc(s.caption)}</figcaption>
			</figure>
		</section>`;
}

function clicksSection(lang, copy, shots) {
	const s = copy.clicks;
	return `<section class="chapter-section chapter-section--bleed" ${sectionAnchor(lang, "clicks")} aria-labelledby="clicks-title">
			${aliasMarkers(lang, "clicks")}
			<div class="clicks-head">
				<div class="copy">
					${marker(s.tc, "zoom")}
					<h2 class="h2" id="clicks-title">${esc(s.title)}</h2>
				</div>
				<p class="lede">${esc(s.text)}</p>
			</div>
			<figure class="timeline-figure">
				<svg class="ink ink--timeline" viewBox="0 0 420 150" aria-hidden="true"><path d="M20 20 C 140 10, 300 40, 360 120"/><path d="M344 112 l18 12 2 -22"/></svg>
				${shots.img(EDITOR_SHOT, { alt: s.imageAlt, sizes: "(max-width: 1000px) 100vw, 92vw", className: "editor-img" })}
				${shots.img(EDITOR_SHOT_LIGHT, { alt: s.imageAlt, sizes: "(max-width: 1000px) 100vw, 92vw", className: "editor-img editor-img--light" })}
				<figcaption class="meta">${esc(s.caption)}</figcaption>
			</figure>
		</section>`;
}

function overlaysSection(lang, copy, shots) {
	const s = copy.overlays;
	return `<section class="chapter-section split split--overlays" ${sectionAnchor(lang, "overlays")} aria-labelledby="overlays-title">
			<div class="overlays-demo">
				<div class="overlays-stage" data-fx-stage role="group" aria-label="${esc(s.stageLabel)}">
					<div class="copy overlays-copy">
						${marker(s.tc, "annotation")}
						<h2 class="h2" id="overlays-title">${esc(s.title)}</h2>
						<p class="lede">${esc(s.text)}</p>
					</div>
				</div>
				<div class="overlays-controls" data-fx-controls></div>
			</div>
			<figure class="pane-figure">
				<div class="pane-crop">${shots.img("pane-mouse-effects-dark", { alt: s.imageAlt, sizes: "(max-width: 1000px) 90vw, 380px" })}</div>
				<figcaption class="meta">${esc(s.caption)}</figcaption>
			</figure>
		</section>`;
}

function verticalSection(lang, copy, shots) {
	const s = copy.vertical;
	const [lead, keyword] = s.captionText;
	const half = "(max-width: 1000px) 90vw, 45vw";
	return `<section class="chapter-section vertical-section" ${sectionAnchor(lang, "vertical")} aria-labelledby="vertical-title">
			<div class="split split--vertical">
				<div class="copy">
					${marker(s.tc, "speed")}
					<h2 class="h2" id="vertical-title">${s.title.map(esc).join("<br>")}</h2>
					<p class="lede">${esc(s.text)}</p>
				</div>
				<div class="reframe">
					<span class="reframe-wide">${shots.img(EDITOR_SHOT, { alt: s.wideAlt, sizes: "(max-width: 1000px) 50vw, 30vw" })}<span class="reframe-mask" aria-hidden="true"></span></span>
					<svg class="reframe-arrow" viewBox="0 0 56 24" aria-hidden="true"><path d="M2 12h48"/><path d="m42 4 9 8-9 8"/></svg>
					<span class="reframe-tall">${shots.img(EDITOR_SHOT, { alt: s.tallAlt, sizes: "(max-width: 1000px) 60vw, 40vw" })}<span class="reframe-caption" aria-hidden="true">${esc(lead)} <em>${esc(keyword)}</em></span></span>
				</div>
			</div>
			<div class="dialogs">
				${shots.img("export-dialog-presets-publish-dark", { alt: s.exportAlt, sizes: half })}
				${shots.img("export-dialog-tiktok-schedule-dark", { alt: s.scheduleAlt, sizes: half })}
			</div>
		</section>`;
}

function publishSection(lang, copy) {
	const s = copy.publish;
	return `<section class="chapter-section" ${sectionAnchor(lang, "publish")} aria-labelledby="publish-title">
			${aliasMarkers(lang, "publish")}
			<div class="copy publish-head">
				${marker(s.tc, "clip")}
				<h2 class="h2 h2--xl" id="publish-title">${esc(s.title)} <span class="h2-muted">${esc(s.titleMuted)}</span></h2>
			</div>
			<dl class="notes">${s.notes
				.map(
					([term, text]) =>
						`<div class="note"><dt class="meta">${esc(term)}</dt><dd>${esc(text)}</dd></div>`,
				)
				.join("")}</dl>
		</section>`;
}

function localSection(lang, copy, shots) {
	const s = copy.local;
	const legal = LEGAL_PATHS[lang];
	return `<section class="chapter-section local-section split split--even" ${sectionAnchor(lang, "local")} aria-labelledby="local-title">
			${aliasMarkers(lang, "local")}
			<figure class="settings-figure">
				${shots.img("settings-transcription-media-dark", { alt: s.imageAlt, sizes: "(max-width: 1000px) 90vw, 45vw" })}
				<figcaption class="meta">${esc(s.caption)}</figcaption>
			</figure>
			<div class="copy">
				${marker(s.tc, "clip")}
				<h2 class="h2" id="local-title">${esc(s.title)}</h2>
				<p class="lede">${esc(s.text)}</p>
				<p class="link-row"><a class="text-link" href="${legal.privacy}">${esc(s.privacyLink)}${icon("arrow")}</a><a class="text-link" href="${legal.deletion}">${esc(s.deletionLink)}${icon("arrow")}</a></p>
			</div>
		</section>`;
}

function faqSection(lang, copy) {
	return `<section class="chapter-section faq-section" ${sectionAnchor(lang, "faq")} aria-labelledby="faq-title">
			${aliasMarkers(lang, "faq")}
			<div class="copy">
				${marker(copy.faqTc, "neutral")}
				<h2 class="h2" id="faq-title">${esc(copy.faqTitle)}</h2>
			</div>
			<div class="faq">${copy.faq
				.map(
					([question, answer]) =>
						`<details class="faq-item"><summary>${esc(question)}</summary><p>${esc(answer)}</p></details>`,
				)
				.join("")}</div>
		</section>`;
}

function exportSection(lang, copy) {
	const s = copy.export;
	return `<section class="chapter-section export-section" ${sectionAnchor(lang, "export")} aria-labelledby="export-title">
			${aliasMarkers(lang, "export")}
			${marker(s.tc, "neutral")}
			<h2 class="mega" id="export-title">${esc(s.title)}</h2>
			<div class="export-row">
				<a class="export-btn export-btn--cta" href="${RELEASES_URL}" rel="noopener noreferrer">${icon("download")}<span>${esc(s.download)}</span></a>
				<p class="meta">${esc(s.platform)}<br>${esc(s.version)} ${APP_VERSION}</p>
			</div>
			<p class="export-note">${esc(s.pricing)}</p>
			<p class="export-note">${esc(s.requirements)}</p>
		</section>`;
}

function footer(lang, copy) {
	const ui = UI[lang];
	const legal = LEGAL_PATHS[lang];
	const f = copy.footer;
	const year = new Date(`${RELEASE_DATE}T12:00:00Z`).getUTCFullYear();
	return `<footer class="story-footer">
		<a class="footer-brand" href="${LANDING_PATH[lang]}" aria-label="${esc(ui.homeLabel)}"><img src="/clipey-256.png" width="18" height="18" alt=""><span>Clipey</span></a>
		<nav class="footer-links" aria-label="${esc(ui.footerAria)}">
			<a href="${legal.privacy}">${esc(ui.footer.privacy)}</a>
			<a href="${legal.terms}">${esc(ui.footer.terms)}</a>
			<a href="${legal.deletion}">${esc(ui.footer.deletion)}</a>
			<a href="${blogBase(lang)}">${esc(f.blog)}</a>
			<a href="${RELEASES_URL}" rel="noopener noreferrer">${esc(f.releases)}</a>
			<a href="mailto:${CONTACT_EMAIL}">${esc(f.contact)}</a>
		</nav>
		<p class="meta footer-copy">© ${year} ${OWNER}</p>
	</footer>`;
}

/** The landing page of one language. `jsonLd` is built by the caller. */
export function renderStory(lang, { assets, alternates, jsonLd }) {
	const ui = UI[lang];
	const copy = STORY[lang];
	const shots = pageShots(readShotManifest(), lang);
	const lcp = shots.set(HERO_SHOT);
	const body = `<main id="main" class="story">
		${hero(lang, copy, shots)}
		${timeline(copy)}
		${recordSection(lang, copy, shots)}
		${clicksSection(lang, copy, shots)}
		${overlaysSection(lang, copy, shots)}
		${verticalSection(lang, copy, shots)}
		${publishSection(lang, copy)}
		${localSection(lang, copy, shots)}
		${faqSection(lang, copy)}
		${exportSection(lang, copy)}
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
		lcpImage: lcp.src,
		lcpSrcset: lcp.srcset,
		lcpSizes: HERO_SIZES,
	});
	return renderPage({
		lang,
		head,
		header: titleBar(lang, copy, alternates),
		body,
		footer: footer(lang, copy),
		script: assets.script,
	});
}
