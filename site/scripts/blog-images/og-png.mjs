import { PNG } from "pngjs";

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const BAYER_SIZE = 4;
export const RADIUS = 6;
/** Neighbours that differ from the centre by more than this (8-bit levels, on any channel) are edges, not glow. */
export const TOLERANCE = 2;
/** Only the dark tail is rebuilt, where a one-level step is visible as a ring: no channel may be brighter than this. */
export const DARK_LIMIT = 50;
/**
 * zlib settings of the PNG writer. The Sub filter on every row (filterType 1) keeps the repeating dither pattern
 * identical from row to row, which deflate exploits.
 */
export const PNG_OPTIONS = {
	colorType: 2,
	filterType: 1,
	deflateLevel: 9,
	deflateStrategy: 0,
};

/**
 * Truecolor PNG. The screenshot is already quantised to 8 bits, so a plain +/-1 dither cannot undo a contour: every
 * plateau keeps its mean. Instead the dark areas are rebuilt as a smooth ramp (a small average over neighbours whose
 * red, green AND blue all differ by at most TOLERANCE levels, so outlines and text edges are untouched) and then
 * re-quantised with an ordered 4x4 threshold. The result is deterministic; no pixel moves by more than
 * 2 * TOLERANCE + 1 levels on any channel.
 */
export function encodeOgPng(png) {
	const { width, height } = png;
	const source = png.data;
	const data = Buffer.from(source);
	const eligible = (p) => {
		const i = p * 4;
		return (
			source[i] <= DARK_LIMIT &&
			source[i + 1] <= DARK_LIMIT &&
			source[i + 2] <= DARK_LIMIT
		);
	};
	const near = (a, b) =>
		a[0] - b[0] <= TOLERANCE &&
		b[0] - a[0] <= TOLERANCE &&
		a[1] - b[1] <= TOLERANCE &&
		b[1] - a[1] <= TOLERANCE &&
		a[2] - b[2] <= TOLERANCE &&
		b[2] - a[2] <= TOLERANCE;
	const horizontal = new Float32Array(width * height * 3);
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const p = y * width + x;
			if (!eligible(p)) continue;
			const centre = [source[p * 4], source[p * 4 + 1], source[p * 4 + 2]];
			const sum = [0, 0, 0];
			let count = 0;
			for (let dx = -RADIUS; dx <= RADIUS; dx++) {
				const xx = x + dx;
				if (xx < 0 || xx >= width) continue;
				const j = (y * width + xx) * 4;
				const other = [source[j], source[j + 1], source[j + 2]];
				if (!near(centre, other)) continue;
				sum[0] += other[0];
				sum[1] += other[1];
				sum[2] += other[2];
				count++;
			}
			horizontal[p * 3] = sum[0] / count;
			horizontal[p * 3 + 1] = sum[1] / count;
			horizontal[p * 3 + 2] = sum[2] / count;
		}
	}
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const p = y * width + x;
			if (!eligible(p)) continue;
			const centre = [
				horizontal[p * 3],
				horizontal[p * 3 + 1],
				horizontal[p * 3 + 2],
			];
			const sum = [0, 0, 0];
			let count = 0;
			for (let dy = -RADIUS; dy <= RADIUS; dy++) {
				const yy = y + dy;
				if (yy < 0 || yy >= height) continue;
				const q = yy * width + x;
				if (!eligible(q)) continue;
				const other = [
					horizontal[q * 3],
					horizontal[q * 3 + 1],
					horizontal[q * 3 + 2],
				];
				if (!near(centre, other)) continue;
				sum[0] += other[0];
				sum[1] += other[1];
				sum[2] += other[2];
				count++;
			}
			const offset =
				(BAYER[(y % BAYER_SIZE) * BAYER_SIZE + (x % BAYER_SIZE)] + 0.5) /
				(BAYER_SIZE * BAYER_SIZE);
			for (let channel = 0; channel < 3; channel++) {
				data[p * 4 + channel] = Math.max(
					0,
					Math.min(255, Math.floor(sum[channel] / count + offset)),
				);
			}
		}
	}
	return PNG.sync.write({ ...png, data }, PNG_OPTIONS);
}
