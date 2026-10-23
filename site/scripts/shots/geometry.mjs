/**
 * Pure pixel math for the product screenshots: finding the preview card of an editor capture, painting the placeholder
 * that replaces it, and resizing. Images are `{ width, height, data }` with 8-bit RGBA rows, the shape pngjs returns.
 */

/** Smallest channel step that counts as an edge: the card border is sharp, its shadow and the stage grid are softer. */
export const EDGE_STEP = 12;

/** Corner radius of the editor preview card at 2x, measured on the captures. */
export const CARD_RADIUS = 24;

const offset = (image, x, y) => (y * image.width + x) * 4;

function sameColour(image, a, b) {
	const { data } = image;
	return (
		data[a] === data[b] &&
		data[a + 1] === data[b + 1] &&
		data[a + 2] === data[b + 2]
	);
}

function step(image, a, b) {
	const { data } = image;
	return Math.max(
		Math.abs(data[a] - data[b]),
		Math.abs(data[a + 1] - data[b + 1]),
		Math.abs(data[a + 2] - data[b + 2]),
	);
}

function longestRowRun(image, y) {
	let best = 1;
	let run = 1;
	for (let x = 1; x < image.width; x++) {
		if (sameColour(image, offset(image, x, y), offset(image, x - 1, y))) {
			run++;
			if (run > best) best = run;
		} else run = 1;
	}
	return best;
}

function longestColumnRun(image, x, from, to) {
	let best = 1;
	let run = 1;
	for (let y = from + 1; y < to; y++) {
		if (sameColour(image, offset(image, x, y), offset(image, x, y - 1))) {
			run++;
			if (run > best) best = run;
		} else run = 1;
	}
	return best;
}

/** The value seen most often, ignoring misses (-1); ties keep the first value seen. */
export function mostCommon(values) {
	const counts = new Map();
	for (const value of values)
		if (value >= 0) counts.set(value, (counts.get(value) ?? 0) + 1);
	let best = -1;
	let bestCount = 0;
	for (const [value, count] of counts)
		if (count > bestCount) {
			best = value;
			bestCount = count;
		}
	return best;
}

/**
 * The stage of an editor capture: the band between the top bar and the timeline, left of the inspector.
 * Only app chrome decides it, never the recording: the top bar ends at the last row of the top quarter that is flat for
 * 90% of the width; the timeline starts at the first row flat across the whole width; the inspector starts at the first
 * column right of centre that is flat for 85% of the stage height (its border line; flat areas of a recording stay
 * well below that).
 */
export function findStage(image) {
	let top = 0;
	for (let y = 0; y < image.height / 4; y++)
		if (longestRowRun(image, y) >= image.width * 0.9) top = y + 1;
	let bottom = -1;
	for (let y = Math.floor(image.height / 3); y < image.height; y++)
		if (longestRowRun(image, y) >= image.width * 0.99) {
			bottom = y;
			break;
		}
	if (bottom < 0) throw new Error("no timeline edge found");
	let right = -1;
	for (let x = Math.floor(image.width / 2); x < image.width; x++)
		if (longestColumnRun(image, x, top, bottom) >= (bottom - top) * 0.85) {
			right = x;
			break;
		}
	if (right < 0) throw new Error("no inspector edge found");
	return { x: 0, y: top, width: right, height: bottom - top };
}

/**
 * The preview card inside the stage, as `{ x, y, width, height }` in pixels. Every few rows the first sharp step from
 * each side is an edge candidate, and the most common candidate wins, so a photo inside the card cannot move it.
 * Top and bottom are read on columns away from the rounded corners.
 */
export function findPreviewRect(image, threshold = EDGE_STEP) {
	const stage = findStage(image);
	const stageBottom = stage.y + stage.height;
	const lefts = [];
	const rights = [];
	for (let y = stage.y; y < stageBottom; y += 4) {
		let left = -1;
		for (let x = 1; x < stage.width; x++)
			if (
				step(image, offset(image, x, y), offset(image, x - 1, y)) > threshold
			) {
				left = x;
				break;
			}
		lefts.push(left);
		let right = -1;
		for (let x = stage.width - 1; x > 0; x--)
			if (
				step(image, offset(image, x, y), offset(image, x - 1, y)) > threshold
			) {
				right = x;
				break;
			}
		rights.push(right);
	}
	const left = mostCommon(lefts);
	const right = mostCommon(rights);
	const tops = [];
	const bottoms = [];
	for (let x = left + 2 * CARD_RADIUS; x < right - 2 * CARD_RADIUS; x += 4) {
		let top = -1;
		for (let y = stage.y + 1; y < stageBottom; y++)
			if (
				step(image, offset(image, x, y), offset(image, x, y - 1)) > threshold
			) {
				top = y;
				break;
			}
		tops.push(top);
		let bottom = -1;
		for (let y = stageBottom - 1; y > stage.y; y--)
			if (
				step(image, offset(image, x, y), offset(image, x, y - 1)) > threshold
			) {
				bottom = y;
				break;
			}
		bottoms.push(bottom);
	}
	const top = mostCommon(tops);
	const bottom = mostCommon(bottoms);
	if (left < 0 || right <= left || top < 0 || bottom <= top)
		throw new Error("no preview card found");
	return { x: left, y: top, width: right - left, height: bottom - top };
}

/** Coverage (0..1) of the pixel at (x, y) by a rectangle with rounded corners, sampled 4x4 for a soft edge. */
export function roundedCoverage(rect, radius, x, y) {
	let inside = 0;
	for (let sy = 0; sy < 4; sy++)
		for (let sx = 0; sx < 4; sx++) {
			const px = x + (sx + 0.5) / 4 - rect.x;
			const py = y + (sy + 0.5) / 4 - rect.y;
			if (px < 0 || py < 0 || px > rect.width || py > rect.height) continue;
			const cx = Math.min(Math.max(px, radius), rect.width - radius);
			const cy = Math.min(Math.max(py, radius), rect.height - radius);
			if ((px - cx) ** 2 + (py - cy) ** 2 <= radius * radius) inside++;
		}
	return inside / 16;
}

/**
 * Paints the placeholder over `rect`, in place: a flat card with a grid of fine lines, corners rounded like the real
 * card. Pixels outside the card keep their value, so the app chrome around it stays untouched.
 */
export function paintPlaceholder(
	image,
	rect,
	{ fill, grid, gridStep, radius },
) {
	const { data } = image;
	const x0 = Math.floor(rect.x);
	const y0 = Math.floor(rect.y);
	const x1 = Math.ceil(rect.x + rect.width);
	const y1 = Math.ceil(rect.y + rect.height);
	const centreX = rect.x + rect.width / 2;
	const centreY = rect.y + rect.height / 2;
	for (let y = y0; y < y1; y++)
		for (let x = x0; x < x1; x++) {
			const coverage = roundedCoverage(rect, radius, x, y);
			if (coverage === 0) continue;
			const onGrid =
				Math.abs(
					Math.round((x + 0.5 - centreX) / gridStep) * gridStep -
						(x + 0.5 - centreX),
				) < 1 ||
				Math.abs(
					Math.round((y + 0.5 - centreY) / gridStep) * gridStep -
						(y + 0.5 - centreY),
				) < 1;
			const colour = onGrid ? grid : fill;
			const i = (y * image.width + x) * 4;
			for (let c = 0; c < 3; c++)
				data[i + c] = Math.round(
					data[i + c] * (1 - coverage) + colour[c] * coverage,
				);
			data[i + 3] = Math.max(data[i + 3], Math.round(255 * coverage));
		}
}

/** Alpha-composites `overlay` (straight RGBA) onto `image` with its top-left corner at (x, y), in place. */
export function composite(image, overlay, x, y) {
	for (let oy = 0; oy < overlay.height; oy++)
		for (let ox = 0; ox < overlay.width; ox++) {
			const tx = x + ox;
			const ty = y + oy;
			if (tx < 0 || ty < 0 || tx >= image.width || ty >= image.height) continue;
			const s = (oy * overlay.width + ox) * 4;
			const d = (ty * image.width + tx) * 4;
			const a = overlay.data[s + 3] / 255;
			if (a === 0) continue;
			const da = image.data[d + 3] / 255;
			const outA = a + da * (1 - a);
			for (let c = 0; c < 3; c++)
				image.data[d + c] = Math.round(
					(overlay.data[s + c] * a + image.data[d + c] * da * (1 - a)) / outA,
				);
			image.data[d + 3] = Math.round(outA * 255);
		}
}

/** Output size for a target width, keeping the aspect ratio; never upscales. */
export function fitWidth(width, height, target) {
	const outWidth = Math.min(width, target);
	return {
		width: outWidth,
		height: Math.max(1, Math.round((height * outWidth) / width)),
	};
}

/**
 * Box-filter (area average) resize, exact for any ratio: every source pixel contributes by the area it shares with
 * the destination pixel. Colour is averaged premultiplied by alpha, so transparent pixels do not darken edges.
 */
export function resizeArea(image, width, height) {
	const out = new Uint8ClampedArray(width * height * 4);
	const sx = image.width / width;
	const sy = image.height / height;
	for (let y = 0; y < height; y++) {
		const top = y * sy;
		const bottom = top + sy;
		for (let x = 0; x < width; x++) {
			const left = x * sx;
			const right = left + sx;
			let r = 0;
			let g = 0;
			let b = 0;
			let a = 0;
			let area = 0;
			for (let iy = Math.floor(top); iy < Math.ceil(bottom); iy++) {
				const wy = Math.min(bottom, iy + 1) - Math.max(top, iy);
				for (let ix = Math.floor(left); ix < Math.ceil(right); ix++) {
					const wx = Math.min(right, ix + 1) - Math.max(left, ix);
					const weight = wx * wy;
					const i = (iy * image.width + ix) * 4;
					const alpha = image.data[i + 3];
					r += image.data[i] * alpha * weight;
					g += image.data[i + 1] * alpha * weight;
					b += image.data[i + 2] * alpha * weight;
					a += alpha * weight;
					area += weight;
				}
			}
			const o = (y * width + x) * 4;
			if (a > 0) {
				out[o] = Math.round(r / a);
				out[o + 1] = Math.round(g / a);
				out[o + 2] = Math.round(b / a);
			}
			out[o + 3] = Math.round(a / area);
		}
	}
	return { width, height, data: out };
}

/** Bounding box of the pixels whose alpha is above `minAlpha`, or null when the image is fully transparent. */
export function opaqueBounds(image, minAlpha = 0) {
	let x0 = image.width;
	let y0 = image.height;
	let x1 = -1;
	let y1 = -1;
	for (let y = 0; y < image.height; y++)
		for (let x = 0; x < image.width; x++)
			if (image.data[(y * image.width + x) * 4 + 3] > minAlpha) {
				if (x < x0) x0 = x;
				if (y < y0) y0 = y;
				if (x > x1) x1 = x;
				if (y > y1) y1 = y;
			}
	if (x1 < 0) return null;
	return { x: x0, y: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 };
}
