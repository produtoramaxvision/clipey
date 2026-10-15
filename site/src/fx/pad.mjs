/* Gamepad state from the Gamepad API "standard" mapping, filtered like the app's capture. */
import { PAD } from "./spec.mjs";

/** Standard-mapping button index -> control id; 6 and 7 are the analogue triggers. */
export const PAD_BUTTONS = [
	"a",
	"b",
	"x",
	"y",
	"lb",
	"rb",
	"lt",
	"rt",
	"back",
	"start",
	"ls",
	"rs",
	"dpadUp",
	"dpadDown",
	"dpadLeft",
	"dpadRight",
	"guide",
];

/** Generic layout glyphs of the face buttons, as the app labels them. */
export const PAD_GLYPHS = { y: "4", b: "2", a: "1", x: "3" };

function stick(x = 0, y = 0, deadzone) {
	return Math.hypot(x, y) < deadzone ? { x: 0, y: 0 } : { x, y };
}

const isDown = (button, index) =>
	index === 6 || index === 7
		? (button?.value ?? 0) > PAD.trigger
		: Boolean(button?.pressed);

/**
 * Pressed controls and stick positions. `frames` counts consecutive frames per control and is
 * updated in place; a control counts as pressed after PAD.minPressFrames frames.
 */
export function readPad(gamepad, frames) {
	const buttons = new Set();
	PAD_BUTTONS.forEach((control, index) => {
		const count = isDown(gamepad.buttons[index], index)
			? (frames.get(control) ?? 0) + 1
			: 0;
		frames.set(control, count);
		if (count >= PAD.minPressFrames) buttons.add(control);
	});
	const [lx, ly, rx, ry] = gamepad.axes;
	return {
		buttons,
		leftStick: stick(lx, ly, PAD.leftDeadzone),
		rightStick: stick(rx, ry, PAD.rightDeadzone),
	};
}

/** Cheap equality so the canvas only repaints when something changed. */
export function padKey(state) {
	const { leftStick: l, rightStick: r } = state;
	return `${[...state.buttons].join()}|${l.x.toFixed(2)},${l.y.toFixed(2)}|${r.x.toFixed(2)},${r.y.toFixed(2)}`;
}
