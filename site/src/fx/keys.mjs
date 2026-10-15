/* Keystroke pill: the same labels and timing as the app's keystroke overlay. */
import { KEYS } from "./spec.mjs";

const NAMES = {
	" ": "Space",
	Escape: "Esc",
	ArrowLeft: "←",
	ArrowUp: "↑",
	ArrowRight: "→",
	ArrowDown: "↓",
	ContextMenu: "Apps",
};

/** Key name from a KeyboardEvent: letters and digits by physical key, so Shift + 1 reads "Shift + 1". */
export function keyName(key, code = "") {
	if (/^Key[A-Z]$/.test(code)) return code.slice(3);
	if (/^Digit\d$/.test(code)) return code.slice(5);
	if (/^Numpad\d$/.test(code)) return `Num ${code.slice(6)}`;
	if (NAMES[key]) return NAMES[key];
	return key.length === 1 ? key.toUpperCase() : key;
}

const SILENT =
	/^(Control|Shift|Alt|AltGraph|Meta|OS|Dead|Unidentified|Process)$/;

/**
 * "Ctrl + Shift + D": modifiers in the order Ctrl, Win, Alt, Shift, then the key. A modifier on its
 * own, a dead key or an IME composition gives null, so holding Ctrl + Shift does not flash two pills.
 */
export function formatKeys({ key, code, ctrlKey, metaKey, altKey, shiftKey }) {
	if (SILENT.test(key)) return null;
	const held = { ctrl: ctrlKey, win: metaKey, alt: altKey, shift: shiftKey };
	return [
		...KEYS.order.filter((mod) => held[mod]).map((mod) => KEYS.labels[mod]),
		keyName(key, code),
	].join(KEYS.joiner);
}

/** Typing into a field is the visitor's text, not a shortcut demo. */
export function isTypingTarget(target) {
	if (!target || typeof target !== "object") return false;
	if (target.isContentEditable) return true;
	return /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName ?? "");
}

/**
 * One pill at a time. A new label replaces the pill on screen; the same label again within the
 * repeat window keeps it and pushes its end to press + duration. `render(label)` gets null on hide.
 */
export function createKeyPill(render, now = Date.now) {
	let label = null;
	let last = Number.NEGATIVE_INFINITY;
	let timer = 0;
	const hide = () => {
		timer = 0;
		label = null;
		render(null);
	};
	return {
		press(next) {
			const t = now();
			const repeat = label === next && t - last <= KEYS.repeatMs;
			last = t;
			clearTimeout(timer);
			timer = setTimeout(hide, KEYS.durationMs);
			if (repeat) return false;
			label = next;
			render(next);
			return true;
		},
		get label() {
			return label;
		},
		dispose() {
			clearTimeout(timer);
			timer = 0;
			label = null;
		},
	};
}
