/* Live drawing model: strokes in stage-relative units (0..1), their fade and the eraser hit test. */
import { DRAW } from "./spec.mjs";

/**
 * Opacity `age` ms after the stroke was finished: full for DRAW.holdMs, then the app's stepped
 * fade (1, 0.8, ... 0) over DRAW.fadeMs. 0 means the stroke can be dropped.
 */
export function strokeAlpha(age) {
	if (age < DRAW.holdMs) return 1;
	const p = (age - DRAW.holdMs) / DRAW.fadeMs;
	if (p >= 1) return 0;
	return 1 - Math.floor(p * DRAW.fadeSteps) / DRAW.fadeSteps;
}

export function createStroke(tool, x, y) {
	return { tool, points: [x, y], doneAt: Number.POSITIVE_INFINITY };
}

/** Distance from (px, py) to the segment a-b, all in pixels. */
function segmentDistance(px, py, ax, ay, bx, by) {
	const dx = bx - ax;
	const dy = by - ay;
	const len = dx * dx + dy * dy;
	const t = len
		? Math.min(1, Math.max(0, ((px - ax) * dx + (py - ay) * dy) / len))
		: 0;
	return Math.hypot(px - ax - t * dx, py - ay - t * dy);
}

/** Whether the eraser at (x, y) px touches the stroke, on a stage of w x h px. */
export function hitStroke(stroke, x, y, w, h, tolerance = DRAW.widthPx * 2) {
	const p = stroke.points;
	if (p.length === 2)
		return Math.hypot(p[0] * w - x, p[1] * h - y) <= tolerance;
	for (let i = 2; i < p.length; i += 2) {
		const d = segmentDistance(
			x,
			y,
			p[i - 2] * w,
			p[i - 1] * h,
			p[i] * w,
			p[i + 1] * h,
		);
		if (d <= tolerance) return true;
	}
	return false;
}

/** Strokes still visible at `now`, keeping the array instance. */
export function pruneStrokes(strokes, now) {
	let kept = 0;
	for (const stroke of strokes)
		if (strokeAlpha(now - stroke.doneAt) > 0) strokes[kept++] = stroke;
	strokes.length = kept;
	return strokes;
}
