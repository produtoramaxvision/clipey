/* Canvas painting of the overlays. Coordinates are CSS pixels of the layer the context belongs to. */
import { rgb } from "./math.mjs";
import { PAD_GLYPHS } from "./pad.mjs";
import { CLICK, DRAW, HALO, PAD } from "./spec.mjs";

const TAU = Math.PI * 2;

function outline(ctx, shape, x, y, r) {
	ctx.beginPath();
	if (shape === "square") ctx.rect(x - r, y - r, r * 2, r * 2);
	else ctx.arc(x, y, r, 0, TAU);
}

/** Inner fill that grows towards the edge, the ripple's smoothstep(0, r, d) x 0.35. */
function rippleFill(ctx, shape, x, y, r, c, a) {
	const fill = ctx.createRadialGradient(x, y, 0, x, y, r);
	fill.addColorStop(0, `rgba(${c},0)`);
	fill.addColorStop(1, `rgba(${c},${a * CLICK.rippleFill})`);
	ctx.fillStyle = fill;
	outline(ctx, shape, x, y, r);
	ctx.fill();
}

/** One click effect: `fx` from buttonFx, `frame` from clickFrame. */
export function paintClick(ctx, x, y, fx, frame, style) {
	const { radius: r, alpha: a, stroke } = frame;
	if (r <= 0 || a <= 0) return;
	const c = rgb(fx.color);
	const shape = fx.shape === "square" ? "square" : "circle";
	if (style === "pulse") {
		const disc = ctx.createRadialGradient(x, y, 0, x, y, r);
		disc.addColorStop(0, `rgba(${c},${a})`);
		disc.addColorStop(Math.max(0, (r - stroke) / r), `rgba(${c},${a})`);
		disc.addColorStop(1, `rgba(${c},0)`);
		ctx.fillStyle = shape === "square" ? `rgba(${c},${a})` : disc;
		outline(ctx, shape, x, y, shape === "square" ? r - stroke / 2 : r);
		ctx.fill();
		return;
	}
	if (style === "ripple") rippleFill(ctx, shape, x, y, r, c, a);
	ctx.strokeStyle = `rgba(${c},${a})`;
	ctx.lineWidth = stroke;
	outline(ctx, shape, x, y, r);
	ctx.stroke();
	if (fx.shape === "double") {
		outline(ctx, shape, x, y, r * CLICK.innerRing);
		ctx.stroke();
	}
}

export function paintHalo(ctx, x, y, radius) {
	const c = rgb(HALO.color);
	const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
	glow.addColorStop(0, `rgba(${c},${HALO.opacity})`);
	glow.addColorStop(0.5, `rgba(${c},${HALO.opacity / 2})`);
	glow.addColorStop(1, `rgba(${c},0)`);
	ctx.fillStyle = glow;
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, TAU);
	ctx.fill();
}

/** Dims the whole layer except a soft-edged hole around (x, y). */
export function paintSpotlight(ctx, x, y, { radius, inner, dim }, w, h) {
	const shade = ctx.createRadialGradient(x, y, inner, x, y, radius);
	shade.addColorStop(0, "rgba(0,0,0,0)");
	shade.addColorStop(1, `rgba(0,0,0,${dim})`);
	ctx.fillStyle = shade;
	ctx.fillRect(0, 0, w, h);
}

/** A stroke with quadratic midpoint smoothing, points in 0..1 of a w x h layer. */
export function paintStroke(ctx, stroke, w, h, alpha) {
	const p = stroke.points;
	const tool = stroke.tool === "highlighter" ? DRAW.highlighterAlpha : 1;
	ctx.strokeStyle = `rgba(${rgb(DRAW.color)},${alpha * tool})`;
	ctx.lineWidth = DRAW.widthPx;
	ctx.lineCap = "round";
	ctx.lineJoin = "round";
	ctx.beginPath();
	ctx.moveTo(p[0] * w, p[1] * h);
	if (p.length === 2) ctx.lineTo(p[0] * w, p[1] * h);
	for (let i = 2; i < p.length - 2; i += 2) {
		const mx = ((p[i] + p[i + 2]) / 2) * w;
		const my = ((p[i + 1] + p[i + 3]) / 2) * h;
		ctx.quadraticCurveTo(p[i] * w, p[i + 1] * h, mx, my);
	}
	if (p.length > 2) ctx.lineTo(p[p.length - 2] * w, p[p.length - 1] * h);
	ctx.stroke();
}

function key(ctx, on, fill = true) {
	const k = PAD.colors;
	ctx.fillStyle = on ? k.pressed : k.button;
	if (fill) ctx.fill();
	ctx.stroke();
}

function text(ctx, value, x, y, font, color) {
	ctx.fillStyle = color;
	ctx.font = font;
	ctx.fillText(value, x, y);
}

/** The app's generic gamepad silhouette on a 320 x 200 context; `labels` holds back/guide/start. */
export function paintPad(ctx, state, labels) {
	const k = PAD.colors;
	const on = (control) => state.buttons.has(control);
	ctx.clearRect(0, 0, PAD.width, PAD.height);
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.beginPath();
	ctx.moveTo(70, 50);
	ctx.bezierCurveTo(90, 46, 230, 46, 250, 50);
	ctx.bezierCurveTo(275, 52, 295, 95, 280, 160);
	ctx.bezierCurveTo(272, 192, 248, 190, 230, 160);
	ctx.bezierCurveTo(215, 138, 185, 132, 160, 132);
	ctx.bezierCurveTo(135, 132, 105, 138, 90, 160);
	ctx.bezierCurveTo(72, 190, 48, 192, 40, 160);
	ctx.bezierCurveTo(25, 95, 45, 52, 70, 50);
	ctx.closePath();
	ctx.fillStyle = k.body;
	ctx.fill();
	ctx.strokeStyle = k.bodyBorder;
	ctx.lineWidth = 2.5;
	ctx.stroke();

	ctx.strokeStyle = k.buttonBorder;
	ctx.lineWidth = 1.5;
	for (const [control, x, y, w, h, r] of [
		["lt", 65, 16, 45, 18, 4],
		["rt", 210, 16, 45, 18, 4],
		["lb", 65, 38, 48, 12, 3],
		["rb", 207, 38, 48, 12, 3],
	]) {
		ctx.beginPath();
		ctx.roundRect(x, y, w, h, r);
		key(ctx, on(control));
	}

	for (const [control, x, y] of [
		["y", 232, 74],
		["b", 254, 96],
		["a", 232, 118],
		["x", 210, 96],
	]) {
		const down = on(control);
		ctx.beginPath();
		ctx.arc(x, y, 9, 0, TAU);
		ctx.strokeStyle = down ? k.label : k.buttonBorder;
		key(ctx, down);
		text(
			ctx,
			PAD_GLYPHS[control],
			x,
			y,
			"bold 10px sans-serif",
			down ? k.pressedInk : k.label,
		);
	}

	ctx.fillStyle = k.button;
	ctx.fillRect(82, 90, 12, 12);
	ctx.lineWidth = 1;
	for (const [control, x, y, w, h, glyph] of [
		["dpadUp", 82, 76, 12, 14, "↑"],
		["dpadDown", 82, 102, 12, 14, "↓"],
		["dpadLeft", 68, 90, 14, 12, "←"],
		["dpadRight", 94, 90, 14, 12, "→"],
	]) {
		const down = on(control);
		ctx.fillStyle = down ? k.pressed : k.button;
		ctx.fillRect(x, y, w, h);
		ctx.strokeStyle = down ? k.label : k.buttonBorder;
		ctx.strokeRect(x, y, w, h);
		text(
			ctx,
			glyph,
			x + w / 2,
			y + h / 2,
			"bold 9px sans-serif",
			down ? k.pressedInk : k.muted,
		);
	}

	ctx.lineWidth = 1.5;
	for (const [control, x, y, pos, name] of [
		["ls", 125, 135, state.leftStick, "L"],
		["rs", 195, 135, state.rightStick, "R"],
	]) {
		ctx.beginPath();
		ctx.arc(x, y, 17, 0, TAU);
		ctx.fillStyle = k.body;
		ctx.fill();
		ctx.strokeStyle = k.buttonBorder;
		ctx.stroke();
		const down = on(control);
		const cx = x + pos.x * 7;
		const cy = y + pos.y * 7;
		ctx.beginPath();
		ctx.arc(cx, cy, 12, 0, TAU);
		ctx.strokeStyle = down ? k.label : k.buttonBorder;
		key(ctx, down);
		text(
			ctx,
			name,
			cx,
			cy,
			"bold 8px sans-serif",
			down ? k.pressedInk : k.muted,
		);
	}

	ctx.lineWidth = 1;
	ctx.strokeStyle = k.buttonBorder;
	ctx.beginPath();
	ctx.roundRect(134, 76, 14, 8, 3);
	key(ctx, on("back"));
	ctx.beginPath();
	ctx.arc(160, 72, 8, 0, TAU);
	key(ctx, on("guide"));
	ctx.beginPath();
	ctx.roundRect(172, 76, 14, 8, 3);
	key(ctx, on("start"));
	text(ctx, labels.back, 141, 91, "7px sans-serif", k.muted);
	text(ctx, labels.guide, 160, 61, "7px sans-serif", k.muted);
	text(ctx, labels.start, 179, 91, "7px sans-serif", k.muted);
}
