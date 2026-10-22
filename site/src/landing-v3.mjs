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
import {
	brandMark,
	dualsense,
	gameScene,
	person,
	waveform,
} from "./landing-art.mjs";
import {
	FLAGS,
	pageMedia,
	readMediaManifest,
	VIDEOS,
} from "./landing-media.mjs";
import { LANDING } from "./landing-v3-copy.mjs";

/** "1.15.0" is shown as "1.15", as the design writes it. */
export const VERSION_LABEL = APP_VERSION.split(".").slice(0, 2).join(".");

/** The footer's MaxVision link (a tracked short link, so it keeps exactly rel="noopener"). */
export const OWNER_LINK =
	"https://link.produtoramaxvision.com.br/maxvision-clipey";

/** Section ids of the page in each language, keyed by chapter, in page order. */
export const SECTION_IDS = {
	"pt-BR": {
		hero: "topo",
		compat: "compatibilidade",
		record: "gravar",
		edit: "editar",
		agents: "agentes",
		games: "jogos",
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
		agents: "agents",
		games: "games",
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
		agents: "agentes",
		games: "juegos",
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
	clip: '<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><rect x="3" y="4" width="5" height="16" rx="1.5"/><rect x="9.5" y="4" width="5" height="16" rx="1.5"/><rect x="16" y="4" width="5" height="16" rx="1.5"/></svg>',
	play: '<svg class="icon-play" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z"/></svg>',
};

/**
 * A pause/play toggle. Scripts show it and keep its label in step; without scripts it stays hidden, and a video slot
 * keeps its native controls instead.
 */
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
const hasVideo = (video) =>
	Array.isArray(video.sources)
		? video.sources.length > 0
		: Object.keys(video.sources).length > 0;

/** The hero video slot and, further down, the captions slot. `lazy` slots keep their sources as data-src until seen. */
function videoSlot(
	copy,
	media,
	video,
	{ label, lazy = false, className = "" },
) {
	const poster = media.poster(video);
	const srcAttr = lazy ? "data-src" : "src";
	const sources = media
		.sources(video)
		.map(([src, type]) => `<source ${srcAttr}="${src}" type="${type}">`)
		.join("");
	// No autoplay and nothing preloaded: landing-v3.js starts playback when the slot is on screen and motion is not
	// reduced. Without scripts the native controls are the way to play and pause; the script swaps them for the
	// toggle. Lazy slots also keep their sources in data-src until the slot is near.
	const attrs = 'muted loop playsinline preload="none" controls';
	return `<div class="vslot ${className}" data-vslot${lazy ? " data-vslot-lazy" : ""}>
					<video class="vslot-video" ${attrs} poster="${poster}" width="${video.width}" height="${video.height}" aria-label="${esc(label)}">${sources}</video>
					${toggle("vslot-toggle", "data-vslot-toggle", copy.video.pause, copy.video.play)}
				</div>`;
}

function hero(lang, copy, media) {
	const ids = SECTION_IDS[lang];
	const h = copy.hero;
	const [line1, brand, verb, shine] = h.title;
	const lanes = h.lanes
		.map(
			([chapter, label, tag]) =>
				`<a class="lane lane--${chapter}" href="#${ids[chapter === "clip" ? "edit" : chapter]}">${ICON[{ record: "rec", edit: "zoom", clip: "clip", publish: "up" }[chapter]]}<span>${esc(label)}</span>${tag ? `<span class="lane-tag">${esc(tag)}</span>` : ""}</a>`,
		)
		.join("");
	return `<section class="lp-hero" id="${ids.hero}" aria-labelledby="hero-title">
			<div class="lp-hero-inner">
				<p class="rec-pill"><span class="rec-dot" aria-hidden="true"></span>${esc(h.rec)}<span class="rec-sep" aria-hidden="true">/</span><span>Clipey ${VERSION_LABEL}<span class="rec-platforms"> ${esc(h.platforms)}</span></span></p>
				<h1 class="lp-h1" id="hero-title">${esc(line1)}<br>${esc(brand)} ${esc(verb)} <span class="accent shine" data-anim>${esc(shine)}</span></h1>
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

/** The marks of the compatibility strip, by group and item position (the same in every language). */
const COMPAT_MARKS = [
	["youtube", "tiktok", "instagram", "facebook"],
	[null, "apple", "linux"],
	[null],
];

/**
 * Platforms, systems and languages as one strip that scrolls sideways. The first copy is the real list; the second
 * (aria-hidden) closes the loop. It moves only once landing-v3.js has shown its pause button; without scripts, or
 * with reduced motion, the copy wraps and stands still.
 */
function compat(lang, copy) {
	const c = copy.compat;
	const groups = c.groups
		.map(
			([label, items], group) =>
				`<li class="mq-group"><span class="mq-k" id="compat-${group}">${esc(label)}</span><ul class="mq-items" role="list" aria-labelledby="compat-${group}">${items
					.map((item, index) => {
						const mark = COMPAT_MARKS[group][index];
						return `<li class="mq-i">${mark ? brandMark(mark, mark === "apple" ? 17 : 18) : ""}${esc(item)}</li>`;
					})
					.join(
						"",
					)}${group === c.groups.length - 1 ? `<li class="mq-lang" aria-hidden="true">${c.langs.map((code) => `<span>${esc(code)}</span>`).join("")}</li>` : ""}</ul></li>`,
		)
		.join("");
	return `<section class="lp-compat" id="${SECTION_IDS[lang].compat}" aria-label="${esc(c.aria)}">
			${aliasMarkers(lang, "compat")}
			<div class="lp-wrap mq-row" data-demo>
				<div class="mq">
					<div class="mq-track">
						<ul class="mq-g" role="list" aria-label="${esc(c.list)}">${groups}</ul>
						<ul class="mq-g mq-dup" role="list" aria-hidden="true">${groups.replaceAll(/ id="compat-\d+"/g, "").replaceAll(/ aria-labelledby="compat-\d+"/g, "")}</ul>
					</div>
				</div>
				${toggle("demo-toggle", "data-demo-toggle", c.pause, c.play)}
			</div>
		</section>`;
}

const marker = (text, lane) =>
	`<p class="marker marker--${lane}">${esc(text)}</p>`;

/** The recording bar tour: the real bar, a highlight ring, a tooltip and the cursor per button, in the app's words. */
function hud(copy, media) {
	const h = copy.record.hud;
	const slots = h.labels.map((_, index) => index + 1);
	return `<figure class="hud hud--${media.locale("hud-bar")}" data-hud>
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

/** The feature tabs, in the order of the tab bar. */
const TABS = ["edit", "clip", "cap", "voice", "cam"];

/** The colour of each tab's dot and numbered steps, as the app colours the feature. */
const TAB_TONE = {
	edit: "zoom",
	clip: "clip",
	cap: "annotation",
	voice: "accent",
	cam: "speed",
};

const STAGE_SIZES = "(max-width: 1000px) calc(100vw - 32px), 700px";

/** The three numbered steps and the short list under them. */
const tabCopy = (tab) => `<div class="ft-copy">
						<h3 class="ft-title">${esc(tab.title)}</h3>
						<ol class="steps">${tab.steps.map(([title, text]) => `<li><b>${esc(title)}</b><span>${esc(text)}</span></li>`).join("")}</ol>
						<ul class="also" role="list">${tab.also.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
					</div>`;

/** Auto Clip scores of the three highlights, in transcript order. */
const CLIP_SCORES = [92, 87, 84];

/** A clip's caption: the highlighted words on their own line, the rest around them. */
const clipCaption = ([before, strong, after]) =>
	after
		? `${esc(before)}<b>${esc(strong)}</b><br>${esc(after)}`
		: `${esc(before)}<br><b>${esc(strong)}</b>`;

/** Auto Clip: the transcript is read, three sentences are marked, each becomes a clip, one is rejected. */
function clipStage(s) {
	let mark = 0;
	const lines = s.lines
		.map(([text, reason]) => {
			if (!reason) return `<p>${esc(text)}</p>`;
			mark += 1;
			return `<p class="ac2-h ac2-h--${mark}"><span>${esc(text)}</span><em>${esc(reason)}</em></p>`;
		})
		.join("");
	const art = [
		person("a"),
		`<span class="ac2-split">${person("b")}${person("c")}</span>`,
		person("c", "#2f3f2a"),
	];
	const clips = s.clips
		.map(
			(caption, index) => `<li class="ac2-card ac2-card--${index + 1}">
								<span class="ac2-ph">${art[index]}<span class="ac2-cap${index === 1 ? " ac2-cap--mid" : ""}">${clipCaption(caption)}</span><span class="ac2-sc">${CLIP_SCORES[index]}</span></span>
								<span class="ac2-bd ${index === 1 ? "ac2-bd--no" : "ac2-bd--ok"}">${esc(index === 1 ? s.reject : s.keep)}</span>
							</li>`,
		)
		.join("");
	return `<div class="stage-in ac2">
						<div class="ac2-top"><span class="ac2-file"><b>${esc(s.file)}</b> · ${esc(s.duration)}</span><span class="ac2-st" aria-hidden="true">${s.status.map((text, index) => `<i class="ac2-st--${index + 1}">${esc(text)}</i>`).join("")}</span></div>
						<div class="ac2-body">
							<div class="ac2-tr" role="group" aria-label="${esc(s.transcriptAria)}">${lines}</div>
							<div class="ac2-clipwrap">
								<ol class="ac2-clips" aria-label="${esc(s.clipsAria)}">${clips}</ol>
								<span class="ac2-apply">${esc(s.apply)}</span>
							</div>
						</div>
						<div class="ac2-tl" aria-hidden="true"><span class="ac2-wave">${waveform(3, 90, 20)}</span><span class="ac2-rg ac2-rg--1"></span><span class="ac2-rg ac2-rg--2"></span><span class="ac2-rg ac2-rg--3"></span><span class="ac2-scan"></span><span class="ac2-t0">0:00</span><span class="ac2-t1">42:18</span></div>
					</div>`;
}

/** Each word of a caption line, so the spoken word can light up in turn (delays come from the word's class). */
const captionWords = (text) =>
	text
		.split(" ")
		.map(
			(word, index) => `<span class="cw cw--${index + 1}">${esc(word)}</span>`,
		)
		.join(" ");

/** The language a caption is translated into on each page: the page's pane shows that translation selected. */
const CAPTION_TARGET = { "pt-BR": "pt-BR", en: "es", es: "es" };

/** Captions: the original line, then the translated one, as the pane switches from Original to the translation. */
function captionStage(lang, s, media) {
	const target = CAPTION_TARGET[lang];
	const button = target === "pt-BR" ? "pt" : "es";
	return `<div class="stage-in cap2">
						${media.img("captions-clean", { alt: s.shotAlt, sizes: STAGE_SIZES, className: "cap2-shot" })}
						<span class="cap2-tag" aria-hidden="true"><span class="cap2-tag--en">${esc(s.tagOriginal)}</span><span class="cap2-tag--tr">${esc(s.tagTranslated)}</span></span>
						<p class="cap2-line cap2-line--en" lang="en"><span class="cl">${captionWords(s.original)}</span></p>
						<p class="cap2-line cap2-line--tr" lang="${target}"><span class="cl">${captionWords(s.translated)}</span></p>
						<div class="cap2-pane cap2-pane--${lang}">
							${media.img("captions-pane", { alt: s.paneAlt, sizes: "260px" })}
							<span class="cap2-o" aria-hidden="true"></span>
							<span class="cap2-p cap2-p--${button}" aria-hidden="true">${esc(s.target)}</span>
							<span class="cap2-tap cap2-tap--${button}" aria-hidden="true"></span>
						</div>
					</div>`;
}

/** Voice: the quote in the original and in the dub, and two timeline lanes where the dub replaces the original. */
function voiceStage(s) {
	const [original, dub] = s.lanes;
	const [[playing, replaced], [generating, ready]] = s.states;
	return `<div class="stage-in vz2">
						<p class="vz2-q"><span class="vz2-tag">${esc(s.tagOriginal)}</span><span class="vz2-quote vz2-quote--en" lang="en">${esc(s.original)}</span></p>
						<p class="vz2-q"><span class="vz2-tag vz2-tag--dub">${esc(s.tagDub)}</span><span class="vz2-quote vz2-quote--dub">${esc(s.dub)}</span></p>
						<div class="vz2-tracks" role="img" aria-label="${esc(s.tracksAria)}">
							<span class="vz2-row"><span class="vz2-lbl">${esc(original)}</span><span class="vz2-wave vz2-wave--o">${waveform(7)}</span><span class="vz2-st"><span class="vz2-st--a">${esc(playing)}</span><span class="vz2-st--b">${esc(replaced)}</span></span></span>
							<span class="vz2-row"><span class="vz2-lbl vz2-lbl--dub">${esc(dub)}</span><span class="vz2-wave vz2-wave--d"><span class="vz2-ghost">${waveform(11)}</span><span class="vz2-fill">${waveform(11)}</span></span><span class="vz2-st vz2-st--dub"><span class="vz2-st--a">${esc(generating)}</span><span class="vz2-st--b">${esc(ready)}</span></span></span>
							<span class="vz2-head"></span>
						</div>
						<p class="vz2-meta">${esc(s.meta)}</p>
					</div>`;
}

/** Camera: the same recording in the three layouts, one after the other. */
function cameraStage(s, media) {
	const screen = (className) =>
		`<span class="cam2-scr ${className}">${media.img("ui-board", { sizes: "480px" })}</span>`;
	const [corner, stacked, side] = s.layouts;
	return `<div class="stage-in cam2" role="group" aria-label="${esc(s.aria)}">
						<div class="cam-l cam-l--1">${screen("cam2-scr--full")}<span class="cam2-pip cam2-pip--round">${person("a")}</span><span class="cam2-lbl">${esc(corner)}</span></div>
						<div class="cam-l cam-l--2"><span class="cam2-phone">${screen("cam2-scr--top")}<span class="cam2-face">${person("a")}</span></span><span class="cam2-lbl">${esc(stacked)}</span></div>
						<div class="cam-l cam-l--3">${screen("cam2-scr--side")}<span class="cam2-pip cam2-pip--side">${person("a")}</span><span class="cam2-lbl">${esc(side)}</span></div>
						<span class="cam2-dots" aria-hidden="true"><i></i><i></i><i></i></span>
					</div>`;
}

/**
 * What the Clipey editor does, as radio tabs: each works without scripts (a checked radio shows its panel) and with
 * the keyboard (arrow keys move between radios). The demos move only once landing-v3.js has shown their pause button.
 */
function editSection(lang, copy, media) {
	const s = copy.edit;
	const tabs = s.tabs;
	const stage = {
		edit: () => `<div class="stage-in stage-in--video">
						${videoSlot(copy, media, VIDEOS.editTab, { label: tabs.edit.videoLabel, lazy: true, className: "vslot--tab" })}
					</div>`,
		clip: () => clipStage(tabs.clip.stage),
		cap: () =>
			hasVideo(VIDEOS.captions)
				? `<div class="stage-in stage-in--video captions-figure">
						${videoSlot(copy, media, VIDEOS.captions, { label: s.captionsLabel, lazy: true, className: "vslot--tab" })}
					</div>`
				: captionStage(lang, tabs.cap.stage, media),
		voice: () => voiceStage(tabs.voice.stage),
		cam: () => cameraStage(tabs.cam.stage, media),
	};
	return `<section class="lp-section lp-edit" id="${SECTION_IDS[lang].edit}" aria-labelledby="edit-title">
			${aliasMarkers(lang, "edit")}
			<div class="lp-wrap">
				<div class="edit-head">
					<div class="edit-copy">
						${marker(s.marker, "edit")}
						<h2 class="lp-h2 lp-h2--wide" id="edit-title">${s.title.map(esc).join("<br>")}</h2>
					</div>
					<p class="lp-lede edit-lede">${esc(s.text)}</p>
				</div>
				<div class="ft" data-demo>
					${TABS.map((key, index) => `<input type="radio" name="ft" id="ft-${key}" class="ft-input" aria-controls="ft-panel-${key}"${index ? "" : " checked"}>`).join("")}
					<div class="ft-head">
						<div class="ft-bar" role="radiogroup" aria-label="${esc(s.tabsAria)}">${TABS.map((key) => `<label for="ft-${key}" class="ft-tab ft-tab--${TAB_TONE[key]}"><i aria-hidden="true"></i>${esc(tabs[key].label)}</label>`).join("")}</div>
						${toggle("demo-toggle", "data-demo-toggle", s.pause, s.play)}
					</div>
					${TABS.map(
						(
							key,
						) => `<div class="ft-panel ft-panel--${key} tone--${TAB_TONE[key]}" id="ft-panel-${key}" role="group" aria-label="${esc(tabs[key].label)}">
					<div class="stage">
					${stage[key]()}
					</div>
					${tabCopy(tabs[key])}
				</div>`,
					).join("")}
				</div>
			</div>
		</section>`;
}

const IMAGE_SIZES = "(max-width: 1000px) calc(100vw - 32px), 700px";

/** The agents that speak MCP, in the order the chat header cycles through them. */
const AGENTS = [
	["Claude Code", "claude"],
	["Codex", "codex"],
	["Cursor", "cursor"],
	["OpenCode", "opencode"],
	["Antigravity", "antigravity"],
	["Grok", "grok"],
	["mvcode", null],
];

/** An agent's mark; mvcode's is its own picture. */
const agentMark = (mark, size) =>
	mark
		? brandMark(mark, size)
		: `<img class="agent-img" src="/media/mvcode-mark.png" width="24" height="24" alt="" loading="lazy" decoding="async">`;

/**
 * The agents section: a chat with a generic assistant on the left (its name and mark cycle through the agents),
 * the real editor on the right, and the agents as a rail whose tile lights up with the chat header.
 */
function agentsSection(lang, copy, media) {
	const s = copy.agents;
	const names = AGENTS.map(([name]) => name);
	const cycle = [...AGENTS, AGENTS[0]]
		.map(
			([name, mark]) =>
				`<span class="aid-i"><span class="aid-ic">${agentMark(mark, 20)}</span>${esc(name)}</span>`,
		)
		.join("");
	const tools = s.tools
		.map(
			([label, result], index) =>
				`<li class="tool tl tl--${index + 2}"><span class="tool-dot" aria-hidden="true"></span>${esc(label)}<span class="ok">${esc(result)}</span></li>`,
		)
		.join("");
	const rail = AGENTS.map(
		([name, mark]) =>
			`<li class="rail-t"><span class="ri">${agentMark(mark, 22)}</span><b>${esc(name)}</b><small>MCP</small></li>`,
	).join("");
	const clips = ["a", "b", "c"]
		.map((look) => `<span class="ag-clip">${person(look)}</span>`)
		.join("");
	return `<section class="lp-section lp-agents" id="${SECTION_IDS[lang].agents}" aria-labelledby="agents-title">
			<div class="lp-wrap" data-demo>
				<div class="edit-head">
					<div class="edit-copy">
						${marker(s.marker, "record")}
						<h2 class="lp-h2 lp-h2--wide" id="agents-title">${s.title.map(esc).join("<br>")}</h2>
					</div>
					<p class="lp-lede edit-lede">${esc(s.text)}</p>
				</div>
				<div class="ag-grid">
					<div class="chat" role="group" aria-label="${esc(s.chatAria)}">
						<div class="chat-head">
							<span class="aid"><span class="sr-only">${esc(s.assistant)}: ${esc(names.join(", "))}</span><span class="aid-track" aria-hidden="true">${cycle}</span></span>
							<span class="chat-live"><span class="chat-live-dot" aria-hidden="true"></span>${esc(s.connected)}</span>
						</div>
						<ul class="chat-body" role="list">
							<li class="bub bub--user tl tl--1">${esc(s.ask)}</li>
							<li class="bub tl tl--2">${esc(s.reply)}</li>
							${tools}
							<li class="bub tl tl--8">${esc(s.done)}</li>
						</ul>
					</div>
					<figure class="ag-stage">
						<div class="ag-screen">
							<img src="${media.poster(VIDEOS.tour)}" width="1600" height="860" alt="${esc(s.editorAlt)}" loading="lazy" decoding="async">
							<span class="ag-pills" aria-hidden="true"><span class="ag-pill ag-pill--1"></span><span class="ag-pill ag-pill--2"></span><span class="ag-pill ag-pill--3"></span></span>
							<span class="ag-clips" aria-hidden="true">${clips}</span>
						</div>
						<figcaption class="lp-caption">${esc(s.caption)}</figcaption>
					</figure>
				</div>
				<p class="ag-rail-title" id="agents-rail">${esc(s.railTitle)}</p>
				<ul class="rail" role="list" aria-labelledby="agents-rail">${rail}</ul>
				<div class="ag-foot">
					<p class="ag-note">${esc(s.note)}</p>
					${toggle("demo-toggle", "data-demo-toggle", s.pause, s.play)}
				</div>
			</div>
		</section>`;
}

/** The face buttons of the controller, in the order they light up, with the symbol printed on each. */
const PAD_BUTTONS = ["✕", "○", "□", "△"];

/**
 * Where the drawing lands on each language's board: the centre and half width of its Share button, in the card's
 * 400 x 300 box (the 991 x 611 board covers the card from 85% of its width). The arrow ends at the circle's lower left.
 */
const DRAW_TARGET = {
	"pt-BR": [328, 46, 30],
	en: [338, 46, 24],
	es: [330, 46, 28],
};

function drawPaths(lang) {
	const [cx, cy, rx] = DRAW_TARGET[lang];
	const [x, y] = [cx - rx - 4, cy + 10];
	const line = `M64 236C120 170 ${x - 82} ${y + 42} ${x} ${y}`;
	const head = `M${x - 18} ${(y - 0.3).toFixed(1)}L${x} ${y}L${(x - 10.3).toFixed(1)} ${(y + 14.8).toFixed(1)}`;
	const ring = `cx="${cx}" cy="${cy}" rx="${rx}" ry="15"`;
	return [
		`<path class="dp dp--line halo" pathLength="100" d="${line}"/>`,
		`<path class="dp dp--line ink" pathLength="100" d="${line}"/>`,
		`<path class="dp dp--head halo" d="${head}"/>`,
		`<path class="dp dp--head ink" d="${head}"/>`,
		`<ellipse class="dp dp--ring halo" pathLength="100" ${ring}/>`,
		`<ellipse class="dp dp--ring ink" pathLength="100" ${ring}/>`,
	].join("");
}

const PAD_GAME_TITLES = {
	session: "Session: Skate Sim",
	mtg: "MTG – Motocross The Game",
};

/**
 * Games, webcam and drawings: gameplay on a tilted stage with the controller overlay, then three cards that each show
 * one overlay at work. The gameplay is third-party footage behind FLAGS.gamesFootage (see landing-media.mjs).
 */
function gamesSection(lang, copy, media) {
	const s = copy.games;
	const footage = FLAGS.gamesFootage && hasVideo(VIDEOS.games);
	const pressed = (className) =>
		PAD_BUTTONS.map(
			(symbol, index) =>
				`<span class="pad-lbl pad-lbl--${index + 1} ${className}" aria-hidden="true">${symbol} ${esc(s.pad.pressed)}</span>`,
		).join("");
	const credit = s.credit
		.replace("{session}", `<i>${esc(PAD_GAME_TITLES.session)}</i>`)
		.replace("{mtg}", `<i>${esc(PAD_GAME_TITLES.mtg)}</i>`);
	const [chipForce, chipLit, chipStick] = s.pad.chips;
	const [chipCorner, chipZoom] = s.cam.chips;
	return `<section class="lp-section lp-games" id="${SECTION_IDS[lang].games}" aria-labelledby="games-title">
			<div class="lp-wrap" data-demo>
				<div class="games-grid">
					<div class="games-copy">
						${marker(s.marker, "publish")}
						<h2 class="lp-h2 lp-h2--wide" id="games-title">${esc(s.title)}</h2>
						<p class="lp-lede">${esc(s.text)}</p>
						<ul class="also games-list" role="list">${s.list.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
					</div>
					<div class="games-media">
						<div class="g3d">
							<div class="g3d-in">
								<div class="g3d-screen">
									${footage ? videoSlot(copy, media, VIDEOS.games, { label: s.videoLabel, lazy: true, className: "vslot--games" }) : `<span class="g3d-drawn">${gameScene()}</span>`}
									<span class="g3d-rec" aria-hidden="true">● ${esc(s.rec)}</span>
									<svg class="g3d-pad" aria-hidden="true" viewBox="0 0 240 150">${dualsense()}</svg>
								</div>
							</div>
						</div>
						<p class="games-keys"><span class="key">Ctrl</span>+<span class="key">Shift</span>+<span class="key">O</span><span class="games-keys-text">${esc(s.keys)}</span></p>
						${footage ? `<p class="games-credit">${credit}</p>` : ""}
					</div>
				</div>
				<div class="games-cards">
					<figure class="gcard">
						<div class="scene scene--left">
							${footage ? `<img class="scene-bg scene-bg--dim" src="${VIDEOS.games.poster}" width="960" height="600" alt="" loading="lazy" decoding="async">` : `<span class="scene-bg scene-bg--dim">${gameScene()}</span>`}
							<svg class="scene-art" aria-hidden="true" viewBox="0 0 400 300"><g class="scene-leaders" fill="none"><path d="M262 168L322 250"/><path d="M272 112L326 52"/><path d="M174 190L84 252"/></g><g transform="translate(80 98)">${dualsense()}</g></svg>
							<span class="scene-chip scene-chip--tr">${esc(chipForce)}</span>
							<span class="scene-chip scene-chip--br">${esc(chipLit)}</span>
							<span class="scene-chip scene-chip--bl">${esc(chipStick)}</span>
							${pressed("scene-pressed")}
						</div>
						<figcaption class="gcap"><b>${esc(s.pad.title)}</b><span>${esc(s.pad.body)}</span></figcaption>
					</figure>
					<figure class="gcard">
						<div class="scene">
							<span class="wz wz--${lang}">${media.img("ui-board", { alt: s.cam.alt, sizes: "(max-width: 640px) calc(100vw - 32px), 400px", className: "wz-img" })}</span>
							<span class="wz-tap wz-tap--${lang}" aria-hidden="true"></span>
							<span class="wp">${person("a")}</span>
							<span class="scene-chip scene-chip--tl wz-c wz-c--a">${esc(chipCorner)}</span>
							<span class="scene-chip scene-chip--tl scene-chip--on wz-c wz-c--b" aria-hidden="true">${esc(chipZoom)}</span>
						</div>
						<figcaption class="gcap"><b>${esc(s.cam.title)}</b><span>${esc(s.cam.body)}</span></figcaption>
					</figure>
					<figure class="gcard">
						<div class="scene scene--right">
							${media.img("ui-board", { alt: s.draw.alt, sizes: "(max-width: 640px) calc(100vw - 32px), 400px", className: "scene-bg scene-bg--board" })}
							<svg class="scene-art draw-art" aria-hidden="true" viewBox="0 0 400 300" fill="none" stroke-linecap="round" stroke-linejoin="round">
								${drawPaths(lang)}
							</svg>
							<span class="draw-label">${esc(s.draw.label)}</span>
							<span class="draw-keys" aria-hidden="true"><span class="key dk dk--1">Ctrl</span><span class="key dk dk--2">C</span></span>
						</div>
						<figcaption class="gcap"><b>${esc(s.draw.title)}</b><span>${esc(s.draw.body)}</span></figcaption>
					</figure>
				</div>
				<div class="games-foot">${toggle("demo-toggle", "data-demo-toggle", s.pause, s.play)}</div>
			</div>
		</section>`;
}

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

/**
 * The phone remote. The phone shows the real screens (stills phone-portrait and phone-landscape) once FLAGS.phoneScreens
 * is on; until then the phone and its rotate button are left out and the copy takes the card, so no placeholder frame
 * is ever published.
 */
function phoneSection(lang, copy, media) {
	const s = copy.phone;
	const demo = FLAGS.phoneScreens
		? `<div class="phone-demo">
						<input type="checkbox" id="rotate-phone" class="rotate-input">
						<label for="rotate-phone" class="rotate-btn">${ICON.rotate}${ICON.check}<span>${esc(s.rotate)}</span></label>
						<div class="phone-stage" data-anim>
							<div class="phone-float">
								<div class="phone">
									<div class="phone-face phone-face--portrait">${media.img("phone-portrait", { alt: s.portrait, sizes: "300px" })}</div>
									<div class="phone-face phone-face--landscape">${media.img("phone-landscape", { alt: s.landscape, sizes: "620px" })}</div>
								</div>
							</div>
						</div>
					</div>`
		: "";
	return `<section class="lp-section lp-phone" id="${SECTION_IDS[lang].phone}" aria-labelledby="phone-title">
			<div class="lp-wrap">
				<div class="phone-card${demo ? "" : " phone-card--copy"}">
					<div class="phone-copy">
						${marker(s.marker, "record")}
						<h2 class="lp-h2 lp-h2--card" id="phone-title">${esc(s.title)}</h2>
						<p class="lp-lede">${esc(s.text)}</p>
					</div>
					${demo}
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
		${agentsSection(lang, copy, media)}
		${gamesSection(lang, copy, media)}
		${publishSection(lang, copy, media)}
		${phoneSection(lang, copy, media)}
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
