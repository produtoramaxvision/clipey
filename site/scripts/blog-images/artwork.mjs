import { createHash } from "node:crypto";
import { DARK_TOKENS, FONT_MONO, FONT_SANS, ICON } from "./common.mjs";

/**
 * Language-neutral artwork: one image per article key serves pt-BR, en and es, so it carries no title text.
 * The film-frame language of the site is the subject: an index in Geist display type over a timeline ruler
 * whose clip blocks come from a hash of the key (the same key always draws the same timeline).
 */
const TRACKS = 3;
const CLIPS_PER_TRACK = 4;

function clipsFor(key) {
	const digest = createHash("sha256").update(key).digest();
	return Array.from({ length: TRACKS }, (_, track) => {
		let cursor = 0;
		return Array.from({ length: CLIPS_PER_TRACK }, (_, clip) => {
			const byte = digest[track * CLIPS_PER_TRACK + clip];
			const gap = 2 + (byte % 5);
			const width = 12 + ((byte >> 3) % 18);
			const left = Math.min(cursor + gap, 96 - width);
			cursor = left + width;
			return { left, width };
		});
	});
}

const pad = (value) => String(value).padStart(2, "0");

export function artworkHtml({ kind, key, order, total }) {
	const cover = kind === "cover";
	const margin = cover ? 88 : 56;
	const display = cover ? 560 : 330;
	const tracks = clipsFor(key)
		.map(
			(clips, track) =>
				`<div class="track">${clips
					.map(
						(clip, index) =>
							`<span class="${track === 0 && index === 1 ? "clip clip-hot" : "clip"}" style="left:${clip.left}%;width:${clip.width}%"></span>`,
					)
					.join("")}</div>`,
		)
		.join("");
	return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:"Geist";src:url(data:font/woff2;base64,${FONT_SANS}) format("woff2");font-weight:100 900}
@font-face{font-family:"Geist Mono";src:url(data:font/woff2;base64,${FONT_MONO}) format("woff2");font-weight:100 900}
${DARK_TOKENS}
*{box-sizing:border-box}
body{margin:0;width:100vw;height:100vh;display:grid;grid-template-rows:auto 1fr auto;padding:${margin}px;background:var(--bg);color:var(--text);font-family:var(--font-sans)}
.top{display:flex;align-items:center;justify-content:space-between}
.brand{display:flex;align-items:center;gap:14px;font:650 ${cover ? 34 : 26}px/1 var(--font-sans);letter-spacing:-.04em}
.brand img{width:${cover ? 46 : 36}px;height:${cover ? 46 : 36}px;border-radius:${cover ? 12 : 9}px}
.tc{font:500 ${cover ? 22 : 17}px/1 var(--font-mono);letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.index{align-self:center;font:650 ${display}px/.8 var(--font-sans);letter-spacing:-.075em;color:var(--text)}
.index span{color:var(--accent)}
.timeline{border:1px solid var(--line-strong);border-radius:${cover ? 18 : 14}px;background:var(--surface);overflow:hidden}
.ruler{height:${cover ? 34 : 26}px;border-bottom:1px solid var(--line);background-image:repeating-linear-gradient(90deg,var(--line-strong) 0 1px,transparent 1px ${cover ? 16 : 12}px);background-size:100% 50%;background-repeat:no-repeat}
.tracks{display:grid;gap:${cover ? 12 : 9}px;padding:${cover ? 20 : 14}px}
.track{position:relative;height:${cover ? 30 : 20}px;border-radius:6px;background:var(--surface-2)}
.clip{position:absolute;top:0;bottom:0;border-radius:6px;background:var(--line-strong)}
.clip-hot{background:var(--accent-soft);border:1px solid var(--accent)}
.foot{display:flex;justify-content:space-between;padding:${cover ? 14 : 10}px ${cover ? 20 : 14}px;border-top:1px solid var(--line)}
</style></head><body>
<div class="top"><div class="brand"><img src="data:image/png;base64,${ICON}" alt="">Clipey</div><div class="tc">v1.15</div></div>
<div class="index">${pad(order)}<span>/</span>${pad(total)}</div>
<div class="timeline"><div class="ruler"></div><div class="tracks">${tracks}</div><div class="foot"><span class="tc">00:00</span><span class="tc">clipey.com.br/blog</span><span class="tc">00:${pad(order)}</span></div></div>
</body></html>`;
}

/** The landing card: the wordmark over the same timeline, with the address instead of an index. */
export function landingHtml() {
	return artworkHtml({ kind: "og", key: "landing", order: 1, total: 1 })
		.replace(
			/<div class="index">[\s\S]*?<\/div>/,
			'<div class="index">Clipey</div>',
		)
		.replace('<div class="tc">v1.15</div>', '<div class="tc">Windows</div>');
}
