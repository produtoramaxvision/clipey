/**
 * The v2 landing, "the site is a Clipey recording": a title bar, the hero told as a timeline over the real editor,
 * a sticky timeline whose chapters are the sections, and the export at the end. Server-side HTML only:
 * no inline styles and no inline scripts (the CSP forbids both), every colour comes from tokens.css.
 */
import {
	APP_VERSION,
	blogBase,
	CONTACT_EMAIL,
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
import { readShotManifest, shotImg, shotSet } from "./landing-shots.mjs";

export const HERO_SHOT = "editor-full-speed-zoom-lanes-dark";
/** The light theme shows the light editor; it stays lazy, so dark visitors never download it. */
export const HERO_SHOT_LIGHT = "editor-full-light";
export const HERO_SIZES = "(max-width: 1000px) 100vw, 60vw";

/** Section ids of the v2 page, and the older anchors (linked by the blog and the header) each section answers to. */
export const STORY_SECTIONS = {
	record: { id: "gravar", aliases: ["recursos"] },
	clicks: { id: "editar", aliases: ["ia"] },
	overlays: { id: "overlays", aliases: [] },
	vertical: { id: "vertical", aliases: [] },
	publish: { id: "publicar", aliases: [] },
	local: { id: "seu-pc", aliases: ["privacidade"] },
	faq: { id: "faq", aliases: [] },
	export: { id: "exportar", aliases: ["download", "requisitos"] },
};

const aliasMarkers = (key) =>
	STORY_SECTIONS[key].aliases
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
		<a class="titlebar-brand" href="#topo" aria-label="${esc(ui.homeLabel)}"><img src="/clipey-256.png" width="24" height="24" alt=""><span>Clipey</span></a>
		<span class="titlebar-sep" aria-hidden="true"></span>
		<span class="titlebar-host">${esc(bar.host)}<span class="rec-dot" role="img" aria-label="${esc(bar.recording)}"></span></span>
		<nav class="chapters" aria-label="${esc(bar.chaptersAria)}">${bar.chapters
			.map(
				([id, label]) =>
					`<a class="chapter" href="#${id}" data-chapter="${id}">${esc(label)}</a>`,
			)
			.join("")}</nav>
		<div class="titlebar-actions">
			<div class="lang-switch" role="group" aria-label="${esc(ui.langLabel)}">${switcher}</div>
			<button type="button" class="icon-btn" data-theme-toggle aria-label="${esc(ui.themeToLight)}" data-label-light="${esc(ui.themeToLight)}" data-label-dark="${esc(ui.themeToDark)}">${icon("moon")}${icon("sun")}</button>
			<a class="titlebar-link" href="${blogBase(lang)}">${esc(bar.blog)}</a>
			<a class="export-btn export-btn--bar" href="#${STORY_SECTIONS.export.id}">${icon("download")}<span>${esc(bar.export)}</span></a>
		</div>
	</header>`;
}

/** The silence cut: two kept stretches with the hatched gap between them. */
const cutStrip = (copy, attrs = "") =>
	`<span class="cut-strip"${attrs}><span class="cut-keep"></span><span class="cut-gap"></span><span class="cut-keep"></span><span class="cut-tag">${esc(copy.cutTag)}</span></span>`;

/** The hero picture with the overlays the scroll story switches on: click rings, zoom box, cut, caption, 9:16 mask. */
function heroStage(copy, manifest) {
	const hero = copy.hero;
	const [lead, keyword] = copy.captionText;
	return `<figure class="hero-stage">
				<div class="hero-shot">
					<div class="hero-cam">
						${shotImg(manifest, HERO_SHOT, { alt: hero.imageAlt, sizes: HERO_SIZES, className: "hero-img", priority: true })}
						${shotImg(manifest, HERO_SHOT_LIGHT, { alt: hero.imageAlt, sizes: HERO_SIZES, className: "hero-img hero-img--light" })}
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
function storyStills(copy, manifest) {
	const set = shotSet(manifest, HERO_SHOT);
	return `<ol class="story-stills" aria-label="${esc(copy.storyAria)}">${copy.frames
		.map(
			([tc, title, text], index) => `<li class="still still--${index + 1}">
					<span class="still-frame" aria-hidden="true"><span class="still-cam"><img src="/shots/${HERO_SHOT}-800.webp" width="${set.width}" height="${set.height}" alt="" loading="lazy" decoding="async"></span>${stillOverlay(copy, index)}<span class="still-tc">${esc(tc)}</span></span>
					<span class="still-title">${esc(title)}</span>
					<span class="still-text">${esc(text)}</span>
				</li>`,
		)
		.join("")}</ol>`;
}

function hero(copy, manifest) {
	const hero = copy.hero;
	return `<section class="story-hero" id="topo" aria-labelledby="hero-title">
			<div class="story-hero-grid">
				<div class="story-copy">
					<h1 class="stair" id="hero-title">${hero.lines
						.map(
							([lane, tc, label, text]) =>
								`<span class="stair-line stair-line--${lane}"><span class="stair-tc" aria-hidden="true"><span class="lane-bar lane-bar--${lane}"></span>${esc(tc)} · ${esc(label)}</span><span class="stair-text">${esc(text)}</span></span>`,
						)
						.join(" ")}</h1>
					<p class="story-sub">${esc(hero.sub)}</p>
					<div class="story-actions">
						<a class="export-btn export-btn--hero" href="#${STORY_SECTIONS.export.id}">${esc(hero.download)}</a>
						<p class="meta">${esc(hero.platform)}<br>${esc(hero.noAccount)}</p>
					</div>
				</div>
				${heroStage(copy, manifest)}
			</div>
			${storyStills(copy, manifest)}
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

function recordSection(copy, manifest) {
	const s = copy.record;
	return `<section class="chapter-section split split--even" id="${STORY_SECTIONS.record.id}" aria-labelledby="record-title">
			${aliasMarkers("record")}
			<div class="copy">
				${marker(s.tc, "clip")}
				<h2 class="h2" id="record-title">${s.title.map(esc).join("<br>")}</h2>
				<p class="lede">${esc(s.text)}</p>
			</div>
			<figure class="hud-figure">
				${shotImg(manifest, "launch-hud-recording-bar", { alt: s.imageAlt, sizes: "(max-width: 1000px) 90vw, 560px" })}
				<figcaption class="meta">${esc(s.caption)}</figcaption>
			</figure>
		</section>`;
}

function clicksSection(copy, manifest) {
	const s = copy.clicks;
	return `<section class="chapter-section chapter-section--bleed" id="${STORY_SECTIONS.clicks.id}" aria-labelledby="clicks-title">
			${aliasMarkers("clicks")}
			<div class="clicks-head">
				<div class="copy">
					${marker(s.tc, "zoom")}
					<h2 class="h2" id="clicks-title">${esc(s.title)}</h2>
				</div>
				<p class="lede">${esc(s.text)}</p>
			</div>
			<figure class="timeline-figure">
				<svg class="ink ink--timeline" viewBox="0 0 420 150" aria-hidden="true"><path d="M20 20 C 140 10, 300 40, 360 120"/><path d="M344 112 l18 12 2 -22"/></svg>
				${shotImg(manifest, "timeline-zoom-regions-dark", { alt: s.imageAlt, sizes: "100vw" })}
				<figcaption class="meta">${esc(s.caption)}</figcaption>
			</figure>
		</section>`;
}

function overlaysSection(copy, manifest) {
	const s = copy.overlays;
	return `<section class="chapter-section split split--overlays" id="${STORY_SECTIONS.overlays.id}" aria-labelledby="overlays-title">
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
				<div class="pane-crop">${shotImg(manifest, "pane-mouse-effects-dark", { alt: s.imageAlt, sizes: "(max-width: 1000px) 90vw, 380px" })}</div>
				<figcaption class="meta">${esc(s.caption)}</figcaption>
			</figure>
		</section>`;
}

function verticalSection(copy, manifest) {
	const s = copy.vertical;
	const [lead, keyword] = s.captionText;
	const half = "(max-width: 1000px) 90vw, 45vw";
	return `<section class="chapter-section" id="${STORY_SECTIONS.vertical.id}" aria-labelledby="vertical-title">
			<div class="split split--vertical">
				<div class="copy">
					${marker(s.tc, "speed")}
					<h2 class="h2" id="vertical-title">${s.title.map(esc).join("<br>")}</h2>
					<p class="lede">${esc(s.text)}</p>
				</div>
				<div class="reframe">
					<span class="reframe-wide">${shotImg(manifest, HERO_SHOT, { alt: s.wideAlt, sizes: "(max-width: 1000px) 50vw, 30vw" })}<span class="reframe-mask" aria-hidden="true"></span></span>
					<svg class="reframe-arrow" viewBox="0 0 56 24" aria-hidden="true"><path d="M2 12h48"/><path d="m42 4 9 8-9 8"/></svg>
					<span class="reframe-tall">${shotImg(manifest, HERO_SHOT, { alt: s.tallAlt, sizes: "(max-width: 1000px) 60vw, 40vw" })}<span class="reframe-caption" aria-hidden="true">${esc(lead)} <em>${esc(keyword)}</em></span></span>
				</div>
			</div>
			<div class="dialogs">
				${shotImg(manifest, "export-dialog-presets-publish-dark", { alt: s.exportAlt, sizes: half })}
				${shotImg(manifest, "export-dialog-tiktok-schedule-dark", { alt: s.scheduleAlt, sizes: half })}
			</div>
		</section>`;
}

function publishSection(copy) {
	const s = copy.publish;
	return `<section class="chapter-section" id="${STORY_SECTIONS.publish.id}" aria-labelledby="publish-title">
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

function localSection(lang, copy, manifest) {
	const s = copy.local;
	const legal = LEGAL_PATHS[lang];
	return `<section class="chapter-section split split--even" id="${STORY_SECTIONS.local.id}" aria-labelledby="local-title">
			${aliasMarkers("local")}
			<figure class="settings-figure">
				${shotImg(manifest, "settings-transcription-media-dark", { alt: s.imageAlt, sizes: "(max-width: 1000px) 90vw, 45vw" })}
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

function faqSection(copy) {
	return `<section class="chapter-section faq-section" id="${STORY_SECTIONS.faq.id}" aria-labelledby="faq-title">
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

function exportSection(copy) {
	const s = copy.export;
	return `<section class="chapter-section export-section" id="${STORY_SECTIONS.export.id}" aria-labelledby="export-title">
			${aliasMarkers("export")}
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

/** The whole v2 page for a language that has STORY copy. `jsonLd` is built by the caller, shared with the other layout. */
export function renderStory(lang, { assets, alternates, jsonLd }) {
	const ui = UI[lang];
	const copy = STORY[lang];
	const manifest = readShotManifest();
	const lcp = shotSet(manifest, HERO_SHOT);
	const body = `<main id="main" class="story">
		${hero(copy, manifest)}
		${timeline(copy)}
		${recordSection(copy, manifest)}
		${clicksSection(copy, manifest)}
		${overlaysSection(copy, manifest)}
		${verticalSection(copy, manifest)}
		${publishSection(copy)}
		${localSection(lang, copy, manifest)}
		${faqSection(copy)}
		${exportSection(copy)}
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
