import "./blog.css";
import "../site.css";

document.querySelectorAll("[data-theme-toggle]").forEach((button) => button.addEventListener("click", () => {
	const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
	document.documentElement.dataset.theme = next;
	localStorage.setItem("clipey-theme", next);
}));
const saved = localStorage.getItem("clipey-theme");
if (saved) document.documentElement.dataset.theme = saved;
