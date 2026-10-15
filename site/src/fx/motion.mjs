/* Which mode the overlays run in: live, or still pictures that a button can play once. */

/**
 * "static" when the visitor asks for reduced motion and has not asked to see the animation;
 * "once" while that one requested playback runs; "live" otherwise.
 */
export function motionMode(reducedMotion, playOnce = false) {
	if (!reducedMotion) return "live";
	return playOnce ? "once" : "static";
}

/** Whether pointer, key and pad input should draw anything in this mode. */
export const reactsToInput = (mode) => mode === "live";

/** The query result, or false where matchMedia is missing. */
export function prefersReducedMotion(win) {
	return Boolean(win?.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
}
