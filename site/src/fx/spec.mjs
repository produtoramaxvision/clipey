/**
 * Values copied from the Clipey 1.15 overlays so the site draws what the app draws.
 * The DOM parts read them as --fx-* custom properties that mountFx sets on its own elements.
 */
export const CLICK = {
	durationMs: 450,
	size: 1,
	radiusFactor: 0.045,
	strokePx: 3.5,
	innerRing: 0.65,
	rippleFill: 0.35,
	styles: ["ripple", "rings", "pulse"],
};

/** PointerEvent.button: 0 left, 1 middle, 2 right. */
export const BUTTONS = {
	0: { name: "left", shape: "ring", color: "#A2D305" },
	1: { name: "middle", shape: "square", color: "#FFB547" },
	2: { name: "right", shape: "double", color: "#5AB4FF" },
};

export const HALO = { radius: 0.06, opacity: 0.25, color: "#FFFFFF" };

export const SPOTLIGHT = { radius: 0.18, dim: 0.55, edge: 0.75 };

export const KEYS = {
	durationMs: 1200,
	repeatMs: 400,
	order: ["ctrl", "win", "alt", "shift"],
	labels: { ctrl: "Ctrl", win: "Win", alt: "Alt", shift: "Shift" },
	joiner: " + ",
};

export const DRAW = {
	color: "#A2D305",
	widthPx: 6,
	highlighterAlpha: 0.35,
	holdMs: 4000,
	fadeMs: 2500,
	fadeSteps: 5,
	tools: ["pen", "highlighter", "eraser"],
};

export const PAD = {
	width: 320,
	height: 200,
	leftDeadzone: 0.24,
	rightDeadzone: 0.265,
	trigger: 0.12,
	minPressFrames: 2,
	colors: {
		body: "#1B1D18",
		bodyBorder: "#2C2F27",
		button: "#20231D",
		buttonBorder: "#3D4136",
		pressed: "#A2D305",
		pressedInk: "#0C0D0B",
		label: "#ECEEE6",
		muted: "#9AA091",
	},
};

/** Colours of the DOM overlays (pill, toolbar, still pictures), published on the stage as custom properties. */
export const CSS_VARS = {
	"--fx-left": BUTTONS[0].color,
	"--fx-middle": BUTTONS[1].color,
	"--fx-right": BUTTONS[2].color,
	"--fx-pill-bg": "rgba(12, 13, 11, 0.88)",
	"--fx-pill-border": "#2c2f27",
	"--fx-pill-text": "#eceee6",
	"--fx-bar-bg": "rgba(20, 22, 18, 0.85)",
	"--fx-bar-border": "rgba(255, 255, 255, 0.08)",
	"--fx-bar-shadow": "rgba(0, 0, 0, 0.55)",
	"--fx-bar-soft": "rgba(162, 211, 5, 0.14)",
	"--fx-bar-ring": "rgba(162, 211, 5, 0.3)",
	"--fx-accent": "#a2d305",
	"--fx-accent-ink": "#0c0d0b",
	"--fx-edge": "#141612",
};
