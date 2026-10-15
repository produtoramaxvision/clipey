/**
 * Live overlay demo: the visitor's clicks, keys, drawing and gamepad drawn the way Clipey draws them.
 * mountFx(stage, { lang, controls }) returns { destroy }; `controls` is where the control row goes
 * (default: right after the stage). Until the visitor turns on page-wide mode every listener sits on
 * the stage; gamepad listeners exist only while the visitor has the gamepad overlay on.
 */
import { copyFor } from "./copy.mjs";
import { createStroke, hitStroke, pruneStrokes, strokeAlpha } from "./draw.mjs";
import { createKeyPill, formatKeys, isTypingTarget } from "./keys.mjs";
import {
	buttonFx,
	clickFrame,
	haloRadius,
	spotlightGeometry,
} from "./math.mjs";
import { motionMode, prefersReducedMotion, reactsToInput } from "./motion.mjs";
import { padKey, readPad } from "./pad.mjs";
import {
	paintClick,
	paintHalo,
	paintPad,
	paintSpotlight,
	paintStroke,
} from "./render.mjs";
import { CLICK, CSS_VARS, DRAW, PAD } from "./spec.mjs";

const POOL = 24;
const IDLE_PAD = {
	buttons: new Set(),
	leftStick: { x: 0, y: 0 },
	rightStick: { x: 0, y: 0 },
};
const TOGGLES = ["clicks", "keys", "draw", "pad", "halo", "spotlight", "page"];
/** The reduced-motion playback: the three buttons where the still picture shows them, then the pill. */
const SCRIPT = [
	[0, 0.3, 0.66, 0],
	[500, 0.52, 0.72, 2],
	[1000, 0.72, 0.62, 1],
];

function el(doc, tag, className, text) {
	const node = doc.createElement(tag);
	if (className) node.className = className;
	if (text) node.textContent = text;
	return node;
}

function button(doc, label, className = "fx-chip") {
	const node = el(doc, "button", className, label);
	node.type = "button";
	return node;
}

export function mountFx(stage, options = {}) {
	const doc = stage.ownerDocument;
	const win = doc.defaultView;
	const t = copyFor(options.lang ?? doc.documentElement.lang);
	const on = {
		clicks: true,
		keys: true,
		draw: false,
		pad: false,
		halo: false,
		spotlight: false,
		page: false,
	};
	let style = CLICK.styles[0];
	let tool = DRAW.tools[0];
	let playing = false;
	let reduced = prefersReducedMotion(win);
	let mode = motionMode(reduced);
	let raf = 0;
	let padRaf = 0;
	let padSeen = "";
	let width = 0;
	let height = 0;
	let live = null;
	const timers = new Set();
	const frames = new Map();
	const pointer = { x: 0, y: 0, inside: false };
	const pool = Array.from({ length: POOL }, () => ({
		t: -1,
		x: 0,
		y: 0,
		fx: null,
	}));
	let next = 0;
	const strokes = [];
	const cleanups = [];

	const listen = (target, type, handler, opts) => {
		target.addEventListener(type, handler, opts);
		cleanups.push(() => target.removeEventListener(type, handler, opts));
	};

	const layer = el(doc, "div", "fx-layer");
	for (const [name, value] of Object.entries(CSS_VARS))
		layer.style.setProperty(name, value);
	const canvas = el(doc, "canvas", "fx-canvas");
	const ctx = canvas.getContext("2d");
	const pill = el(doc, "span", "fx-pill");
	pill.hidden = true;
	const padBox = el(doc, "div", "fx-pad");
	padBox.hidden = true;
	const padCanvas = el(doc, "canvas", "fx-pad-canvas");
	padCanvas.width = PAD.width * 2;
	padCanvas.height = PAD.height * 2;
	const padCtx = padCanvas.getContext("2d");
	padCtx.setTransform(2, 0, 0, 2, 0, 0);
	const padHint = el(doc, "span", "fx-pad-hint", t.padHint);
	padBox.append(padCanvas, padHint);
	const bar = el(doc, "div", "fx-bar");
	bar.setAttribute("role", "toolbar");
	bar.setAttribute("aria-label", t.draw);
	bar.hidden = true;
	const toolButtons = DRAW.tools.map((name) => {
		const node = button(doc, t[name], "");
		node.addEventListener("click", () => {
			tool = name;
			sync();
		});
		return node;
	});
	const clearButton = button(doc, t.clear, "");
	const exitButton = button(doc, t.exit, "");
	bar.append(
		...toolButtons,
		el(doc, "span", "fx-bar-sep"),
		clearButton,
		exitButton,
	);
	const still = el(doc, "div", "fx-still");
	still.setAttribute("aria-hidden", "true");
	for (const name of ["left", "right", "middle"]) {
		const mark = el(doc, "span", `fx-still-mark fx-still-${name}`);
		mark.append(el(doc, "span", "fx-still-label", t[name]));
		still.append(mark);
	}
	still.append(el(doc, "span", "fx-pill fx-still-pill", "Ctrl + Shift + D"));
	layer.append(canvas, still, pill, padBox, bar);
	stage.append(layer);
	stage.classList.add("fx-stage");
	const addedTabIndex = !stage.hasAttribute("tabindex");
	if (addedTabIndex) stage.tabIndex = 0;

	const controls = el(doc, "div", "fx-controls");
	controls.setAttribute("role", "group");
	controls.setAttribute("aria-label", t.controls);
	const styleGroup = el(doc, "div", "fx-group");
	styleGroup.setAttribute("role", "group");
	styleGroup.setAttribute("aria-label", t.style);
	styleGroup.append(el(doc, "span", "fx-group-label", t.style));
	const styleButtons = CLICK.styles.map((name) => {
		const node = button(doc, t[name]);
		node.addEventListener("click", () => {
			style = name;
			sync();
		});
		styleGroup.append(node);
		return node;
	});
	const toggleGroup = el(doc, "div", "fx-group");
	const toggleButtons = TOGGLES.map((name) => {
		const node = button(doc, t[name]);
		node.addEventListener("click", () => setToggle(name, !on[name]));
		toggleGroup.append(node);
		return node;
	});
	const playButton = button(doc, t.play, "fx-chip fx-play");
	controls.append(styleGroup, toggleGroup, playButton);
	if (options.controls) options.controls.append(controls);
	else stage.after(controls);

	function resize() {
		const box = on.page
			? { width: win.innerWidth, height: win.innerHeight }
			: stage.getBoundingClientRect();
		const dpr = win.devicePixelRatio || 1;
		width = box.width;
		height = box.height;
		canvas.width = Math.round(width * dpr);
		canvas.height = Math.round(height * dpr);
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		schedule();
	}

	function schedule() {
		if (!raf) raf = win.requestAnimationFrame(paint);
	}

	function paint(now) {
		raf = 0;
		ctx.clearRect(0, 0, width, height);
		const minDim = Math.min(width, height);
		const showPointer = pointer.inside && mode === "live";
		if (showPointer && on.spotlight)
			paintSpotlight(
				ctx,
				pointer.x,
				pointer.y,
				spotlightGeometry(minDim),
				width,
				height,
			);
		if (showPointer && on.halo)
			paintHalo(ctx, pointer.x, pointer.y, haloRadius(minDim));
		pruneStrokes(strokes, now);
		let busy = false;
		for (const stroke of strokes) {
			paintStroke(ctx, stroke, width, height, strokeAlpha(now - stroke.doneAt));
			if (Number.isFinite(stroke.doneAt)) busy = true;
		}
		for (const slot of pool) {
			if (slot.t < 0) continue;
			const frame = clickFrame(now - slot.t, minDim);
			if (!frame) {
				slot.t = -1;
				continue;
			}
			paintClick(ctx, slot.x, slot.y, slot.fx, frame, style);
			busy = true;
		}
		if (busy) schedule();
	}

	function local(event) {
		if (on.page) return { x: event.clientX, y: event.clientY };
		const box = stage.getBoundingClientRect();
		return { x: event.clientX - box.left, y: event.clientY - box.top };
	}

	function addClick(x, y, buttonIndex) {
		const fx = buttonFx(buttonIndex);
		if (!fx) return;
		const slot = pool[next];
		next = (next + 1) % POOL;
		slot.t = win.performance.now();
		slot.x = x;
		slot.y = y;
		slot.fx = fx;
		schedule();
	}

	const keyPill = createKeyPill((label) => {
		pill.hidden = label === null;
		if (label !== null) pill.textContent = label;
	});

	function onPointerDown(event) {
		if (!reactsToInput(mode) || bar.contains(event.target)) return;
		if (controls.contains(event.target)) return;
		const at = local(event);
		if (on.draw && event.target === canvas) {
			canvas.setPointerCapture(event.pointerId);
			if (tool === "eraser") erase(at);
			else {
				live = createStroke(tool, at.x / width, at.y / height);
				strokes.push(live);
			}
			schedule();
			return;
		}
		if (!on.clicks) return;
		// Middle-button autoscroll would hide the effect; only inside the stage, never page-wide.
		if (event.button === 1 && stage.contains(event.target))
			event.preventDefault();
		addClick(at.x, at.y, event.button);
	}

	function onPointerMove(event) {
		const at = local(event);
		pointer.x = at.x;
		pointer.y = at.y;
		pointer.inside = true;
		if (live) live.points.push(at.x / width, at.y / height);
		else if (on.draw && tool === "eraser" && event.buttons) erase(at);
		if (live || on.halo || on.spotlight) schedule();
	}

	function onPointerUp() {
		if (live) live.doneAt = win.performance.now();
		live = null;
		schedule();
	}

	function onPointerLeave() {
		pointer.inside = false;
		schedule();
	}

	function erase(at) {
		for (let i = strokes.length - 1; i >= 0; i--)
			if (hitStroke(strokes[i], at.x, at.y, width, height))
				strokes.splice(i, 1);
	}

	function onContextMenu(event) {
		if (on.clicks && reactsToInput(mode) && stage.contains(event.target))
			event.preventDefault();
	}

	function onKeyDown(event) {
		if (!reactsToInput(mode) || isTypingTarget(event.target)) return;
		const combo =
			(event.ctrlKey || event.metaKey) && event.shiftKey && !event.altKey;
		// The toggle is the stage's own shortcut: outside it the browser keeps Ctrl + Shift + D.
		if (combo && event.code === "KeyD" && stage.contains(event.target)) {
			event.preventDefault();
			setToggle("draw", !on.draw);
		} else if (on.draw && event.key === "Escape") setToggle("draw", false);
		else if (on.draw && combo && event.code === "KeyX") {
			strokes.length = 0;
			schedule();
		}
		if (!on.keys) return;
		const label = formatKeys(event);
		if (label) keyPill.press(label);
	}

	const inputListeners = [
		["pointerdown", onPointerDown],
		["pointermove", onPointerMove],
		["pointerup", onPointerUp],
		["pointercancel", onPointerUp],
		["pointerleave", onPointerLeave],
		["keydown", onKeyDown],
	];

	function bindInput(target, add) {
		for (const [type, handler] of inputListeners)
			if (add) target.addEventListener(type, handler);
			else target.removeEventListener(type, handler);
	}

	function pollPad() {
		padRaf = 0;
		const pad = [...(win.navigator.getGamepads?.() ?? [])].find(Boolean);
		padBox.classList.toggle("is-live", Boolean(pad));
		if (!pad || !on.pad) {
			paintPad(padCtx, IDLE_PAD, t);
			return;
		}
		const state = readPad(pad, frames);
		const seen = padKey(state);
		if (seen !== padSeen) {
			padSeen = seen;
			paintPad(padCtx, state, t);
		}
		padRaf = win.requestAnimationFrame(pollPad);
	}

	function onPadChange() {
		frames.clear();
		padSeen = "";
		if (!padRaf) pollPad();
	}

	function setPad(active) {
		const method = active ? "addEventListener" : "removeEventListener";
		win[method]("gamepadconnected", onPadChange);
		win[method]("gamepaddisconnected", onPadChange);
		if (active) onPadChange();
		else if (padRaf) {
			win.cancelAnimationFrame(padRaf);
			padRaf = 0;
		}
	}

	function setPage(active) {
		bindInput(active ? stage : doc, false);
		bindInput(active ? doc : stage, true);
		if (active) {
			doc.body.append(layer);
			win.addEventListener("resize", resize);
		} else {
			stage.append(layer);
			win.removeEventListener("resize", resize);
		}
		layer.classList.toggle("fx-layer--page", active);
		resize();
	}

	function setToggle(name, value) {
		if (on[name] === value) return;
		on[name] = value;
		if (name === "pad") setPad(value);
		if (name === "page") setPage(value);
		if (name === "draw") live = null;
		sync();
		schedule();
	}

	function sync() {
		const isStatic = mode === "static";
		layer.classList.toggle("is-static", isStatic);
		layer.classList.toggle("is-drawing", on.draw);
		still.hidden = !isStatic;
		bar.hidden = !on.draw;
		padBox.hidden = !on.pad;
		toggleGroup.hidden = reduced;
		playButton.hidden = !reduced;
		playButton.disabled = playing;
		styleButtons.forEach((node, i) => {
			node.setAttribute("aria-pressed", String(CLICK.styles[i] === style));
		});
		toggleButtons.forEach((node, i) => {
			node.setAttribute("aria-pressed", String(on[TOGGLES[i]]));
		});
		toolButtons.forEach((node, i) => {
			node.setAttribute("aria-pressed", String(DRAW.tools[i] === tool));
		});
	}

	function later(ms, run) {
		const id = win.setTimeout(() => {
			timers.delete(id);
			run();
		}, ms);
		timers.add(id);
	}

	function playOnce() {
		if (playing) return;
		playing = true;
		mode = motionMode(reduced, true);
		sync();
		for (const [at, fx, fy, which] of SCRIPT)
			later(at, () => addClick(fx * width, fy * height, which));
		later(1000, () => keyPill.press("Ctrl + Shift + D"));
		later(2400, () => {
			playing = false;
			mode = motionMode(reduced);
			sync();
		});
	}

	function onMotionChange(event) {
		reduced = event.matches;
		if (reduced) {
			setToggle("page", false);
			setToggle("pad", false);
			setToggle("draw", false);
		}
		mode = motionMode(reduced, playing);
		sync();
	}

	clearButton.addEventListener("click", () => {
		strokes.length = 0;
		schedule();
	});
	exitButton.addEventListener("click", () => {
		setToggle("draw", false);
		stage.focus();
	});
	playButton.addEventListener("click", playOnce);
	listen(stage, "contextmenu", onContextMenu);
	bindInput(stage, true);
	const query = win.matchMedia?.("(prefers-reduced-motion: reduce)");
	if (query) listen(query, "change", onMotionChange);
	const observer = new win.ResizeObserver(() => {
		if (!on.page) resize();
	});
	observer.observe(stage);
	sync();
	resize();

	return {
		destroy() {
			setToggle("pad", false);
			setToggle("page", false);
			bindInput(stage, false);
			for (const cleanup of cleanups) cleanup();
			for (const id of timers) win.clearTimeout(id);
			timers.clear();
			observer.disconnect();
			keyPill.dispose();
			if (raf) win.cancelAnimationFrame(raf);
			raf = 0;
			layer.remove();
			controls.remove();
			stage.classList.remove("fx-stage");
			if (addedTabIndex) stage.removeAttribute("tabindex");
		},
	};
}
