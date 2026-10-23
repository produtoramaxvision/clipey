/* Behaviour shared by every page: theme switch, mobile menu and the header border on scroll. */
import { THEME_KEY } from "./blog/config.mjs";

const root = document.documentElement;

const themeButton = document.querySelector("[data-theme-toggle]");
if (themeButton) {
	const labelFor = (theme) =>
		theme === "dark"
			? themeButton.dataset.labelLight
			: themeButton.dataset.labelDark;
	themeButton.setAttribute(
		"aria-label",
		labelFor(root.dataset.theme || "dark"),
	);
	themeButton.addEventListener("click", () => {
		const next = (root.dataset.theme || "dark") === "dark" ? "light" : "dark";
		root.dataset.theme = next;
		try {
			localStorage.setItem(THEME_KEY, next);
		} catch {
			/* storage can be blocked; the theme still changes for this visit */
		}
		themeButton.setAttribute("aria-label", labelFor(next));
	});
}

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
if (menuToggle && mobileMenu) {
	const setOpen = (open) => {
		menuToggle.setAttribute("aria-expanded", String(open));
		menuToggle.setAttribute(
			"aria-label",
			open ? menuToggle.dataset.labelClose : menuToggle.dataset.labelMenu,
		);
		mobileMenu.hidden = !open;
	};
	menuToggle.addEventListener("click", () =>
		setOpen(menuToggle.getAttribute("aria-expanded") !== "true"),
	);
	document.addEventListener("keydown", (event) => {
		if (
			event.key === "Escape" &&
			menuToggle.getAttribute("aria-expanded") === "true"
		) {
			setOpen(false);
			menuToggle.focus();
		}
	});
	for (const link of mobileMenu.querySelectorAll("a"))
		link.addEventListener("click", () => setOpen(false));
	window.addEventListener("resize", () => {
		// Closed once the toggle itself is gone: each page's CSS decides where the nav fits again.
		if (getComputedStyle(menuToggle).display === "none") setOpen(false);
	});
}

const header = document.querySelector("[data-header]");
if (header) {
	const update = () =>
		header.classList.toggle("is-scrolled", window.scrollY > 4);
	update();
	window.addEventListener("scroll", update, { passive: true });
}
