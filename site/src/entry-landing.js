import "./base.css";
import "./landing.css";
import "./fx.css";
import "./chrome.js";
import { mountFx } from "./fx/index.mjs";

// The overlays chapter: the visitor's own cursor and keys get the app's click effects and keystroke pills.
const stage = document.querySelector("[data-fx-stage]");
if (stage) {
	mountFx(stage, {
		lang: document.documentElement.lang,
		controls: document.querySelector("[data-fx-controls]"),
	});
}
