import { describe, expect, it } from "vitest";
import {
	CARD_RADIUS,
	composite,
	findPreviewRect,
	findStage,
	fitWidth,
	mostCommon,
	opaqueBounds,
	paintPlaceholder,
	resizeArea,
	roundedCoverage,
} from "../scripts/shots/geometry.mjs";

function blank(width, height, rgba) {
	const data = new Uint8ClampedArray(width * height * 4);
	for (let i = 0; i < data.length; i += 4) data.set(rgba, i);
	return { width, height, data };
}

function fill(image, rect, rgba) {
	for (let y = rect.y; y < rect.y + rect.height; y++)
		for (let x = rect.x; x < rect.x + rect.width; x++)
			image.data.set(rgba, (y * image.width + x) * 4);
}

const pixel = (image, x, y) =>
	Array.from(
		image.data.subarray(
			(y * image.width + x) * 4,
			(y * image.width + x) * 4 + 4,
		),
	);

/**
 * A small editor capture: top bar, a stage with grid lines, a preview card holding a noisy "recording", an
 * inspector with its border line, and a flat timeline band at the bottom.
 */
function editor() {
	const image = blank(400, 260, [12, 13, 11, 255]);
	fill(image, { x: 0, y: 20, width: 400, height: 2 }, [32, 35, 29, 255]);
	for (let y = 24; y < 180; y += 8)
		fill(image, { x: 0, y, width: 300, height: 1 }, [11, 12, 10, 255]);
	fill(image, { x: 300, y: 22, width: 2, height: 158 }, [44, 47, 39, 255]);
	fill(image, { x: 302, y: 22, width: 98, height: 158 }, [27, 29, 24, 255]);
	for (let y = 40; y < 160; y++)
		for (let x = 30; x < 270; x++) {
			const v = (x * 37 + y * 91) % 256;
			image.data.set([v, 255 - v, (v * 7) % 256, 255], (y * 400 + x) * 4);
		}
	// A flat page inside the recording, taller than half the stage: it must not pass for the inspector border.
	fill(image, { x: 200, y: 50, width: 40, height: 100 }, [240, 240, 240, 255]);
	fill(image, { x: 0, y: 180, width: 400, height: 80 }, [20, 22, 18, 255]);
	return image;
}

describe("preview card detection", () => {
	it("finds the stage from the app chrome only", () => {
		expect(findStage(editor())).toEqual({
			x: 0,
			y: 22,
			width: 300,
			height: 158,
		});
	});

	it("finds the card edges, whatever the recording inside shows", () => {
		expect(findPreviewRect(editor())).toEqual({
			x: 30,
			y: 40,
			width: 240,
			height: 120,
		});
	});

	it("fails loudly when there is no timeline", () => {
		expect(() => findStage(noisy(40, 40))).toThrow(/timeline/);
	});

	it("takes the most common candidate and ignores misses", () => {
		expect(mostCommon([5, -1, 7, 5, 9, 5, 7])).toBe(5);
		expect(mostCommon([-1, -1])).toBe(-1);
	});
});

function noisy(width, height) {
	const image = blank(width, height, [0, 0, 0, 255]);
	for (let i = 0; i < image.data.length; i += 4) image.data[i] = (i * 13) % 251;
	return image;
}

describe("placeholder", () => {
	it("covers the card fully inside and leaves the outside untouched", () => {
		const image = editor();
		const before = pixel(image, 10, 100);
		const rect = findPreviewRect(image);
		paintPlaceholder(image, rect, {
			fill: [12, 13, 11],
			grid: [23, 25, 21],
			gridStep: 48,
			radius: 8,
		});
		const colours = new Set();
		for (let y = rect.y; y < rect.y + rect.height; y++)
			for (let x = rect.x; x < rect.x + rect.width; x++)
				if (roundedCoverage(rect, 8, x, y) === 1)
					colours.add(pixel(image, x, y).join());
		expect([...colours].sort()).toEqual(["12,13,11,255", "23,25,21,255"]);
		expect(pixel(image, 10, 100)).toEqual(before);
		expect(pixel(image, 281, 101)).toEqual([12, 13, 11, 255]);
	});

	it("rounds the corners", () => {
		const rect = { x: 0, y: 0, width: 100, height: 60 };
		expect(roundedCoverage(rect, CARD_RADIUS, 0, 0)).toBe(0);
		expect(roundedCoverage(rect, CARD_RADIUS, 50, 0)).toBe(1);
		expect(roundedCoverage(rect, CARD_RADIUS, 99, 59)).toBe(0);
		expect(roundedCoverage(rect, CARD_RADIUS, 99, 30)).toBe(1);
		expect(roundedCoverage(rect, CARD_RADIUS, 100, 30)).toBe(0);
	});

	it("composites straight alpha over an opaque image", () => {
		const image = blank(2, 1, [0, 0, 0, 255]);
		const overlay = {
			width: 2,
			height: 1,
			data: new Uint8ClampedArray([255, 255, 255, 0, 200, 100, 50, 255]),
		};
		composite(image, overlay, 0, 0);
		expect(pixel(image, 0, 0)).toEqual([0, 0, 0, 255]);
		expect(pixel(image, 1, 0)).toEqual([200, 100, 50, 255]);
		const half = blank(1, 1, [0, 0, 0, 255]);
		composite(
			half,
			{ width: 1, height: 1, data: new Uint8ClampedArray([200, 100, 50, 128]) },
			0,
			0,
		);
		expect(pixel(half, 0, 0)).toEqual([100, 50, 25, 255]);
	});
});

describe("resize math", () => {
	it("keeps the aspect ratio and never upscales", () => {
		expect(fitWidth(3200, 2000, 800)).toEqual({ width: 800, height: 500 });
		expect(fitWidth(3200, 2000, 1400)).toEqual({ width: 1400, height: 875 });
		expect(fitWidth(3200, 784, 1400)).toEqual({ width: 1400, height: 343 });
		expect(fitWidth(868, 2460, 1400)).toEqual({ width: 868, height: 2460 });
		expect(fitWidth(1382, 164, 691)).toEqual({ width: 691, height: 82 });
	});

	it("averages areas exactly for integer and fractional ratios", () => {
		const image = {
			width: 4,
			height: 1,
			data: new Uint8ClampedArray([
				0, 0, 0, 255, 100, 100, 100, 255, 200, 200, 200, 255, 40, 40, 40, 255,
			]),
		};
		expect(Array.from(resizeArea(image, 2, 1).data)).toEqual([
			50, 50, 50, 255, 120, 120, 120, 255,
		]);
		const third = resizeArea(
			{
				width: 3,
				height: 1,
				data: new Uint8ClampedArray([
					0, 0, 0, 255, 90, 90, 90, 255, 180, 180, 180, 255,
				]),
			},
			2,
			1,
		);
		expect(Array.from(third.data)).toEqual([
			30, 30, 30, 255, 150, 150, 150, 255,
		]);
	});

	it("does not darken colour next to transparent pixels", () => {
		const image = {
			width: 2,
			height: 1,
			data: new Uint8ClampedArray([255, 0, 0, 255, 0, 0, 0, 0]),
		};
		expect(Array.from(resizeArea(image, 1, 1).data)).toEqual([255, 0, 0, 128]);
	});

	it("finds the opaque bounds", () => {
		const image = blank(6, 4, [0, 0, 0, 0]);
		fill(image, { x: 2, y: 1, width: 3, height: 2 }, [9, 9, 9, 255]);
		expect(opaqueBounds(image)).toEqual({ x: 2, y: 1, width: 3, height: 2 });
		expect(opaqueBounds(blank(2, 2, [0, 0, 0, 0]))).toBeNull();
	});
});
