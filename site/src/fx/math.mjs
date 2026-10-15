/* Pure maths of the click, halo and spotlight overlays (no DOM). */
import { BUTTONS, CLICK, HALO, SPOTLIGHT } from "./spec.mjs";

export const clamp01 = (v) => Math.min(1, Math.max(0, v));

export const easeOutQuad = (p) => 1 - (1 - p) * (1 - p);

/** Shape and colour of the effect for a PointerEvent.button; other buttons draw nothing. */
export const buttonFx = (button) => BUTTONS[button] ?? null;

/** State of one click effect `elapsed` ms after the press, or null once it is over. */
export function clickFrame(elapsed, minDim, size = CLICK.size) {
	if (elapsed < 0 || elapsed >= CLICK.durationMs) return null;
	const p = clamp01(elapsed / CLICK.durationMs);
	return {
		p,
		alpha: 1 - p,
		radius: minDim * CLICK.radiusFactor * size * easeOutQuad(p),
		stroke: CLICK.strokePx * size,
	};
}

export const haloRadius = (minDim) => HALO.radius * minDim;

/** Spotlight hole: fully lit inside `inner`, dimmed to `dim` from `radius` outwards. */
export function spotlightGeometry(minDim) {
	const radius = SPOTLIGHT.radius * minDim;
	return { radius, inner: radius * SPOTLIGHT.edge, dim: SPOTLIGHT.dim };
}

/** "#A2D305" -> "162,211,5" for rgba() gradient stops. */
export function rgb(hex) {
	const n = Number.parseInt(hex.slice(1), 16);
	return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}
