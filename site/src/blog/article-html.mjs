/**
 * Presentation pass over the article HTML that marked produced. The text is unchanged: the short answer gets the
 * panel class and its label, and bold keyboard shortcuts become keystroke pills. Feeds keep the plain HTML.
 */
import { escapeHtml as esc } from "./content.mjs";

const KEY = String.raw`(?:Ctrl|Shift|Alt|Win|Esc|Enter|Tab|Space|F\d{1,2}|[A-Z0-9])`;
const SHORTCUT = new RegExp(
	String.raw`<strong>(${KEY}(?:\s*\+\s*${KEY})*)</strong>`,
	"g",
);

/** "Ctrl+Shift+D" as the app writes it on the keystroke pill: "Ctrl + Shift + D". */
export const formatShortcut = (keys) => keys.split(/\s*\+\s*/).join(" + ");

/** Bold text that is only a key or a key combination becomes `<kbd>`; other bold text stays bold. */
export const markShortcuts = (html) =>
	html.replace(
		SHORTCUT,
		(_match, keys) => `<kbd class="key">${formatShortcut(keys)}</kbd>`,
	);

/**
 * Every article opens with the "applies to" note and then the answer-first paragraph. That paragraph stays the first
 * `<p>` child of the prose (the speakable selector of the JSON-LD points at it) and is labelled through `data-label`.
 */
export function markShortAnswer(html, label) {
	const opening = html.match(/^\s*<blockquote>[\s\S]*?<\/blockquote>\s*<p>/);
	if (!opening) return html;
	const at = opening[0].length - "<p>".length;
	return `${html.slice(0, at)}<p class="answer" data-label="${esc(label)}">${html.slice(opening[0].length)}`;
}

/** Puts a figure before the second section, or before the first one when the article has only one. */
export function insertBeforeSecondSection(html, figure) {
	if (!figure) return html;
	const sections = [...html.matchAll(/<h2\b/g)].map((match) => match.index);
	const at = sections[1] ?? sections[0];
	if (at === undefined) return `${html}${figure}`;
	return `${html.slice(0, at)}${figure}\n${html.slice(at)}`;
}
