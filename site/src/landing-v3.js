/*
 * Behaviour of the v3 landing: the video slots (play only on screen, poster and play button under reduced motion,
 * a pause control for everyone) and the recording bar tour (paused off screen and on request). The tour itself is CSS.
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

function mountVideoSlot(slot) {
	const video = slot.querySelector("video");
	const button = slot.querySelector("[data-vslot-toggle]");
	if (!video || !button) return;
	const lazy = slot.hasAttribute("data-vslot-lazy");
	let loaded = !lazy;
	let visible = false;
	// A visitor's choice (pause or play) wins over automatic playback until they change it.
	let userPaused = false;

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
		const shouldPlay = visible && !userPaused && !reducedMotion.matches;
		if (shouldPlay) play();
		else if (!video.paused) video.pause();
		setToggle(button, !shouldPlay);
	};

	// Under reduced motion the slot starts on its poster: stop autoplay and return to the first frame shown as poster.
	if (reducedMotion.matches) {
		video.removeAttribute("autoplay");
		video.autoplay = false;
		video.pause();
		// load() drops any frame already decoded, so the poster shows again.
		if (loaded) video.load();
		userPaused = true;
	}

	button.hidden = false;
	button.addEventListener("click", () => {
		if (video.paused) {
			userPaused = false;
			play();
		} else {
			userPaused = true;
			video.pause();
		}
	});
	video.addEventListener("play", () => setToggle(button, false));
	video.addEventListener("pause", () => setToggle(button, true));

	reducedMotion.addEventListener("change", () => {
		if (reducedMotion.matches) userPaused = true;
		update();
	});
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
	button.hidden = false;
	setToggle(button, false);
	button.addEventListener("click", () => {
		const paused = !hud.classList.contains("is-paused");
		hud.classList.toggle("is-paused", paused);
		setToggle(button, paused);
	});
}

for (const slot of document.querySelectorAll("[data-vslot]")) mountVideoSlot(slot);
for (const hud of document.querySelectorAll("[data-hud]")) mountHud(hud);
for (const element of document.querySelectorAll("[data-anim]"))
	watchVisibility(element, (visible) =>
		element.classList.toggle("is-offscreen", !visible),
	);
