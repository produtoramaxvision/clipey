/*
 * Behaviour of the v3 landing: the video slots (play only on screen, poster and play button under reduced motion,
 * a pause control for everyone; native controls without scripts) and the recording bar tour (paused off screen and on
 * request). The tour itself is CSS.
 */

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/** Calls `onChange(visible)` whenever the element enters or leaves the viewport. */
function watchVisibility(element, onChange, rootMargin = "0px") {
	if (!("IntersectionObserver" in window)) {
		onChange(true);
		return;
	}
	new IntersectionObserver(
		(entries) => {
			for (const entry of entries) onChange(entry.isIntersecting);
		},
		{ rootMargin },
	).observe(element);
}

/** Keeps a pause/play toggle's label and icon in step with `paused`. */
function setToggle(button, paused) {
	button.classList.toggle("is-paused", paused);
	button.setAttribute(
		"aria-label",
		paused ? button.dataset.labelPlay : button.dataset.labelPause,
	);
}

/*
 * A video slot has no autoplay attribute and preloads nothing. It plays while it is on screen, unless motion is
 * reduced or the visitor paused it. A Play the visitor pressed is remembered on its own, so reduced motion (at load or
 * switched on later) never undoes it, and leaving and re-entering the viewport resumes it (WCAG 2.2.2).
 */
function mountVideoSlot(slot) {
	const video = slot.querySelector("video");
	const button = slot.querySelector("[data-vslot-toggle]");
	if (!video || !button) return;
	const lazy = slot.hasAttribute("data-vslot-lazy");
	let loaded = !lazy;
	let visible = false;
	// The visitor's last choice: Pause wins over everything, Play wins over reduced motion.
	let userPaused = false;
	let userPlayed = false;

	const load = () => {
		if (loaded) return;
		for (const source of video.querySelectorAll("source[data-src]")) {
			source.src = source.dataset.src;
			source.removeAttribute("data-src");
		}
		loaded = true;
		video.load();
	};

	const play = () => {
		load();
		const attempt = video.play();
		if (attempt)
			attempt.catch((error) => {
				// Autoplay refused (NotAllowedError) or the load was interrupted: show the play button instead.
				if (error.name === "NotAllowedError" || error.name === "AbortError")
					setToggle(button, true);
			});
	};

	const update = () => {
		const shouldPlay =
			visible && !userPaused && (userPlayed || !reducedMotion.matches);
		if (shouldPlay) play();
		else if (!video.paused) video.pause();
		setToggle(button, !shouldPlay);
	};

	// With scripts the toggle replaces the native controls the markup carries for visitors without them.
	video.controls = false;
	video.removeAttribute("controls");
	button.hidden = false;
	setToggle(button, true);
	button.addEventListener("click", () => {
		if (video.paused) {
			userPaused = false;
			userPlayed = true;
			play();
		} else {
			userPaused = true;
			userPlayed = false;
			video.pause();
		}
	});
	video.addEventListener("play", () => setToggle(button, false));
	video.addEventListener("pause", () => setToggle(button, true));

	reducedMotion.addEventListener("change", update);
	watchVisibility(
		slot,
		(isVisible) => {
			visible = isVisible;
			update();
		},
		lazy ? "200px" : "0px",
	);
}

function mountHud(hud) {
	const button = hud.querySelector("[data-hud-toggle]");
	watchVisibility(hud, (visible) => hud.classList.toggle("is-offscreen", !visible));
	if (!button) return;
	// The CSS holds the tour on its first frame until this point, where its pause button becomes available.
	hud.classList.add("is-live");
	button.hidden = false;
	setToggle(button, false);
	button.addEventListener("click", () => {
		const paused = !hud.classList.contains("is-paused");
		hud.classList.toggle("is-paused", paused);
		setToggle(button, paused);
	});
}

/*
 * A looping demo (the platforms strip, the feature tabs, the agents, the games). It moves only while it is live: scripts
 * on, motion not reduced, on screen and not paused by the visitor (WCAG 2.2.2). Without that the CSS shows each demo
 * finished and still.
 */
function mountDemo(demo) {
	const button = demo.querySelector("[data-demo-toggle]");
	if (!button) return;
	const update = () => {
		const live = !reducedMotion.matches;
		demo.classList.toggle("is-live", live);
		button.hidden = !live;
	};
	watchVisibility(demo, (visible) => demo.classList.toggle("is-offscreen", !visible));
	setToggle(button, false);
	button.addEventListener("click", () => {
		const paused = !demo.classList.contains("is-paused");
		demo.classList.toggle("is-paused", paused);
		setToggle(button, paused);
	});
	reducedMotion.addEventListener("change", update);
	update();
}

for (const slot of document.querySelectorAll("[data-vslot]")) mountVideoSlot(slot);
for (const demo of document.querySelectorAll("[data-demo]")) mountDemo(demo);
for (const hud of document.querySelectorAll("[data-hud]")) mountHud(hud);
// One-shot animations (the phone float, the language pulse) start the first time they come into view.
for (const element of document.querySelectorAll("[data-anim]"))
	watchVisibility(element, (visible) => {
		if (visible) element.classList.add("is-played");
	});
