import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import { buildSync } from "esbuild";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FX_COPY } from "../src/fx/copy.mjs";
import {
	createStroke,
	hitStroke,
	pruneStrokes,
	strokeAlpha,
} from "../src/fx/draw.mjs";
import {
	createKeyPill,
	formatKeys,
	isTypingTarget,
	keyName,
} from "../src/fx/keys.mjs";
import {
	buttonFx,
	clickFrame,
	easeOutQuad,
	haloRadius,
	rgb,
	spotlightGeometry,
} from "../src/fx/math.mjs";
import {
	motionMode,
	prefersReducedMotion,
	reactsToInput,
} from "../src/fx/motion.mjs";
import { PAD_BUTTONS, padKey, readPad } from "../src/fx/pad.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const press = (key, code, mods = {}) => ({
	key,
	code,
	ctrlKey: false,
	metaKey: false,
	altKey: false,
	shiftKey: false,
	...mods,
});

describe("click effect maths", () => {
	it("eases out quadratically", () => {
		expect(easeOutQuad(0)).toBe(0);
		expect(easeOutQuad(0.5)).toBe(0.75);
		expect(easeOutQuad(1)).toBe(1);
	});

	it("grows to 0.045 x minDim over 450 ms with alpha 1 - p and a 3.5 px stroke", () => {
		const start = clickFrame(0, 1080);
		expect(start).toEqual({ p: 0, alpha: 1, radius: 0, stroke: 3.5 });
		const mid = clickFrame(225, 1080);
		expect(mid.alpha).toBeCloseTo(0.5);
		expect(mid.radius).toBeCloseTo(1080 * 0.045 * 0.75);
		expect(clickFrame(449.9, 1080).radius).toBeCloseTo(48.6, 1);
		expect(clickFrame(450, 1080)).toBeNull();
		expect(clickFrame(-1, 1080)).toBeNull();
	});

	it("scales radius and stroke with size", () => {
		const frame = clickFrame(225, 1000, 2);
		expect(frame.radius).toBeCloseTo(1000 * 0.045 * 2 * 0.75);
		expect(frame.stroke).toBe(7);
	});

	it("maps each mouse button to its shape and colour", () => {
		expect(buttonFx(0)).toEqual({
			name: "left",
			shape: "ring",
			color: "#A2D305",
		});
		expect(buttonFx(2)).toEqual({
			name: "right",
			shape: "double",
			color: "#5AB4FF",
		});
		expect(buttonFx(1)).toEqual({
			name: "middle",
			shape: "square",
			color: "#FFB547",
		});
		expect(buttonFx(3)).toBeNull();
		expect(buttonFx(4)).toBeNull();
	});

	it("sizes halo and spotlight from the smaller stage side", () => {
		expect(haloRadius(1000)).toBeCloseTo(60);
		expect(spotlightGeometry(1000)).toEqual({
			radius: 180,
			inner: 135,
			dim: 0.55,
		});
	});

	it("splits hex colours into rgb channels", () => {
		expect(rgb("#A2D305")).toBe("162,211,5");
		expect(rgb("#5AB4FF")).toBe("90,180,255");
	});
});

describe("keystroke labels", () => {
	it("orders modifiers Ctrl, Win, Alt, Shift and joins with ' + '", () => {
		expect(
			formatKeys(press("D", "KeyD", { shiftKey: true, ctrlKey: true })),
		).toBe("Ctrl + Shift + D");
		expect(
			formatKeys(
				press("p", "KeyP", {
					shiftKey: true,
					altKey: true,
					metaKey: true,
					ctrlKey: true,
				}),
			),
		).toBe("Ctrl + Win + Alt + Shift + P");
		expect(formatKeys(press("F4", "F4", { altKey: true }))).toBe("Alt + F4");
	});

	it("uses arrows and short names", () => {
		expect(formatKeys(press("ArrowLeft", "ArrowLeft"))).toBe("←");
		expect(formatKeys(press("ArrowUp", "ArrowUp"))).toBe("↑");
		expect(formatKeys(press("ArrowRight", "ArrowRight"))).toBe("→");
		expect(formatKeys(press("ArrowDown", "ArrowDown"))).toBe("↓");
		expect(formatKeys(press("Escape", "Escape"))).toBe("Esc");
		expect(formatKeys(press(" ", "Space", { ctrlKey: true }))).toBe(
			"Ctrl + Space",
		);
	});

	it("names letters and digits by physical key", () => {
		expect(keyName("!", "Digit1")).toBe("1");
		expect(keyName("ç", "Semicolon")).toBe("Ç");
		expect(keyName("a", "KeyA")).toBe("A");
		expect(keyName("1", "Numpad1")).toBe("Num 1");
	});

	it("shows nothing for a lone modifier, a dead key or an IME composition", () => {
		expect(formatKeys(press("Control", "ControlLeft", { ctrlKey: true }))).toBe(
			null,
		);
		expect(formatKeys(press("Shift", "ShiftLeft", { shiftKey: true }))).toBe(
			null,
		);
		expect(formatKeys(press("Dead", "Quote"))).toBe(null);
		expect(formatKeys(press("Process", "KeyA"))).toBe(null);
	});

	it("ignores typing in fields", () => {
		expect(isTypingTarget({ tagName: "INPUT" })).toBe(true);
		expect(isTypingTarget({ tagName: "TEXTAREA" })).toBe(true);
		expect(isTypingTarget({ tagName: "DIV", isContentEditable: true })).toBe(
			true,
		);
		expect(isTypingTarget({ tagName: "DIV" })).toBe(false);
		expect(isTypingTarget(null)).toBe(false);
	});
});

describe("keystroke pill timing", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("hides 1200 ms after the press", () => {
		const render = vi.fn();
		const pill = createKeyPill(render);
		pill.press("Ctrl + K");
		expect(render).toHaveBeenLastCalledWith("Ctrl + K");
		vi.advanceTimersByTime(1199);
		expect(pill.label).toBe("Ctrl + K");
		vi.advanceTimersByTime(1);
		expect(render).toHaveBeenLastCalledWith(null);
		expect(pill.label).toBeNull();
	});

	it("replaces the pill on a new key, one at a time", () => {
		const render = vi.fn();
		const pill = createKeyPill(render);
		pill.press("A");
		vi.advanceTimersByTime(100);
		expect(pill.press("B")).toBe(true);
		expect(render.mock.calls).toEqual([["A"], ["B"]]);
		vi.advanceTimersByTime(1199);
		expect(pill.label).toBe("B");
		vi.advanceTimersByTime(1);
		expect(pill.label).toBeNull();
	});

	it("extends the same pill for repeats within 400 ms", () => {
		const render = vi.fn();
		const pill = createKeyPill(render);
		pill.press("↓");
		vi.advanceTimersByTime(400);
		expect(pill.press("↓")).toBe(false);
		vi.advanceTimersByTime(1000);
		expect(pill.label).toBe("↓");
		vi.advanceTimersByTime(200);
		expect(pill.label).toBeNull();
		expect(render.mock.calls).toEqual([["↓"], [null]]);
	});

	it("starts a new pill for the same key after the repeat window", () => {
		const render = vi.fn();
		const pill = createKeyPill(render);
		pill.press("A");
		vi.advanceTimersByTime(401);
		expect(pill.press("A")).toBe(true);
		expect(render.mock.calls).toEqual([["A"], ["A"]]);
	});

	it("cancels its timer on dispose", () => {
		const render = vi.fn();
		const pill = createKeyPill(render);
		pill.press("A");
		pill.dispose();
		vi.advanceTimersByTime(2000);
		expect(render).toHaveBeenCalledTimes(1);
	});
});

describe("reduced motion", () => {
	it("runs live without the preference", () => {
		expect(motionMode(false)).toBe("live");
		expect(motionMode(false, true)).toBe("live");
		expect(reactsToInput("live")).toBe(true);
	});

	it("shows still pictures and ignores input under the preference", () => {
		expect(motionMode(true)).toBe("static");
		expect(reactsToInput("static")).toBe(false);
	});

	it("plays once on request without reacting to input", () => {
		expect(motionMode(true, true)).toBe("once");
		expect(reactsToInput("once")).toBe(false);
	});

	it("reads the media query safely", () => {
		const win = (matches) => ({ matchMedia: () => ({ matches }) });
		expect(prefersReducedMotion(win(true))).toBe(true);
		expect(prefersReducedMotion(win(false))).toBe(false);
		expect(prefersReducedMotion({})).toBe(false);
		expect(prefersReducedMotion(undefined)).toBe(false);
	});
});

describe("live drawing model", () => {
	it("holds strokes for 4 s, then fades in five steps", () => {
		expect(strokeAlpha(-Infinity)).toBe(1);
		expect(strokeAlpha(3999)).toBe(1);
		expect(strokeAlpha(4000)).toBe(1);
		expect(strokeAlpha(4500)).toBeCloseTo(0.8);
		expect(strokeAlpha(6400)).toBeCloseTo(0.2);
		expect(strokeAlpha(6500)).toBe(0);
	});

	it("drops faded strokes and keeps the live one", () => {
		const old = { ...createStroke("pen", 0, 0), doneAt: 0 };
		const fresh = { ...createStroke("pen", 0, 0), doneAt: 5000 };
		const live = createStroke("highlighter", 0, 0);
		const strokes = [old, fresh, live];
		expect(pruneStrokes(strokes, 7000)).toBe(strokes);
		expect(strokes).toEqual([fresh, live]);
	});

	it("hits a stroke near its segments only", () => {
		const stroke = createStroke("pen", 0.1, 0.5);
		stroke.points.push(0.9, 0.5);
		expect(hitStroke(stroke, 500, 205, 1000, 400)).toBe(true);
		expect(hitStroke(stroke, 500, 260, 1000, 400)).toBe(false);
		expect(hitStroke(createStroke("pen", 0.5, 0.5), 503, 200, 1000, 400)).toBe(
			true,
		);
	});
});

describe("gamepad state", () => {
	const pad = (pressed, values = {}, axes = [0, 0, 0, 0]) => ({
		buttons: PAD_BUTTONS.map((_, i) => ({
			pressed: pressed.includes(i),
			value: values[i] ?? (pressed.includes(i) ? 1 : 0),
		})),
		axes,
	});

	it("counts a press after two frames", () => {
		const frames = new Map();
		expect(readPad(pad([0]), frames).buttons.has("a")).toBe(false);
		expect(readPad(pad([0]), frames).buttons.has("a")).toBe(true);
		expect(readPad(pad([]), frames).buttons.size).toBe(0);
	});

	it("uses the 0.12 trigger threshold on analogue triggers", () => {
		const frames = new Map();
		readPad(pad([], { 6: 0.12, 7: 0.13 }), frames);
		const state = readPad(pad([], { 6: 0.12, 7: 0.13 }), frames);
		expect(state.buttons.has("lt")).toBe(false);
		expect(state.buttons.has("rt")).toBe(true);
	});

	it("applies stick deadzones", () => {
		const state = readPad(pad([], {}, [0.2, 0.1, 0.5, 0]), new Map());
		expect(state.leftStick).toEqual({ x: 0, y: 0 });
		expect(state.rightStick).toEqual({ x: 0.5, y: 0 });
		expect(padKey(state)).toBe("|0.00,0.00|0.50,0.00");
	});
});

describe("module set", () => {
	it("ships under 9 KB gzip, script and stylesheet minified as the build does", () => {
		const built = [
			path.join(root, "src/fx/index.mjs"),
			path.join(root, "src/fx.css"),
		].map(
			(entry) =>
				buildSync({
					entryPoints: [entry],
					bundle: true,
					minify: true,
					format: "esm",
					write: false,
				}).outputFiles[0].contents,
		);
		expect(gzipSync(Buffer.concat(built)).length).toBeLessThan(9 * 1024);
	});

	it("imports nothing outside src/fx", () => {
		const dir = path.join(root, "src/fx");
		for (const file of readdirSync(dir)) {
			const source = readFileSync(path.join(dir, file), "utf8");
			for (const [, spec] of source.matchAll(/from "([^"]+)"/g))
				expect(spec.startsWith("./")).toBe(true);
		}
	});

	it("has the same labels in every language", () => {
		const keys = Object.keys(FX_COPY["pt-BR"]).sort();
		for (const lang of ["en", "es"])
			expect(Object.keys(FX_COPY[lang]).sort()).toEqual(keys);
	});
});
