/* Client script of the blog pages: search, contents list and copy-link. Only same-origin requests are made. */
const root = document.documentElement;

const searchInput = document.getElementById("blog-search");
if (searchInput) {
	const bar = searchInput.closest(".search");
	const results = document.getElementById("search-results");
	const empty = document.getElementById("search-empty");
	const status = document.getElementById("search-status");
	let index;
	let loading = false;
	let announceTimer;

	const setOpen = (open, none = false) => {
		results.hidden = !open || none;
		empty.hidden = !open || !none;
		searchInput.setAttribute("aria-expanded", String(open && !none));
		if (!open) {
			clearTimeout(announceTimer);
			status.textContent = "";
		}
	};

	const announce = (count) => {
		const text =
			count === 0
				? bar.dataset.msgNone
				: count === 1
					? bar.dataset.msgOne
					: bar.dataset.msgMany.replace("{n}", String(count));
		clearTimeout(announceTimer);
		status.textContent = "";
		announceTimer = setTimeout(() => {
			status.textContent = text;
		}, 100);
		empty.textContent = count === 0 ? text : "";
	};

	const search = () => {
		const query = searchInput.value.trim().toLowerCase();
		if (!query || !index) {
			setOpen(false);
			return;
		}
		const matches = index
			.filter((entry) =>
				[entry.title, entry.description, entry.text].some((field) =>
					field.toLowerCase().includes(query),
				),
			)
			.slice(0, 5);
		results.replaceChildren(
			...matches.map((match) => {
				const link = document.createElement("a");
				link.href = match.url;
				link.setAttribute("role", "option");
				link.textContent = match.title;
				return link;
			}),
		);
		announce(matches.length);
		setOpen(true, matches.length === 0);
	};

	const load = async () => {
		if (index || loading) return;
		loading = true;
		const lang = root.lang;
		try {
			const response = await fetch(
				`${lang === "pt-BR" ? "/blog/" : `/blog/${lang}/`}search-index.json`,
			);
			if (response.ok) index = await response.json();
		} catch {
			index = undefined;
		}
		loading = false;
		if (searchInput.value.trim()) search();
	};

	document.addEventListener("keydown", (event) => {
		if (
			event.key === "/" &&
			!["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)
		) {
			event.preventDefault();
			searchInput.focus();
		}
	});
	searchInput.addEventListener("focus", load, { once: true });
	searchInput.addEventListener("input", search);

	const options = () => [...results.querySelectorAll("a")];
	searchInput.addEventListener("keydown", (event) => {
		if (
			(event.key === "ArrowDown" || event.key === "Enter") &&
			options().length &&
			!results.hidden
		) {
			event.preventDefault();
			options()[0].focus();
		} else if (event.key === "Escape") {
			setOpen(false);
		}
	});
	results.addEventListener("keydown", (event) => {
		const list = options();
		const at = list.indexOf(document.activeElement);
		if (event.key === "ArrowDown") {
			event.preventDefault();
			list[Math.min(at + 1, list.length - 1)]?.focus();
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			if (at <= 0) searchInput.focus();
			else list[at - 1].focus();
		} else if (event.key === "Escape") {
			setOpen(false);
			searchInput.focus();
		}
	});
	document.addEventListener("click", (event) => {
		if (!results.contains(event.target) && event.target !== searchInput)
			setOpen(false);
	});
}

const toc = document.querySelector("details[data-toc]");
if (toc && window.matchMedia("(max-width: 960px)").matches) toc.open = false;

const tocLinks = [...document.querySelectorAll(".toc a")];
if (tocLinks.length && typeof IntersectionObserver !== "undefined") {
	const observer = new IntersectionObserver(
		(entries) => {
			const heading = entries.find((entry) => entry.isIntersecting)?.target;
			if (!heading) return;
			for (const link of tocLinks) {
				if (link.hash === `#${heading.id}`)
					link.setAttribute("aria-current", "true");
				else link.removeAttribute("aria-current");
			}
		},
		{ rootMargin: "0px 0px -65% 0px" },
	);
	for (const link of tocLinks) {
		const heading = document.getElementById(link.hash.slice(1));
		if (heading) observer.observe(heading);
	}
}

for (const button of document.querySelectorAll("[data-copy-link]")) {
	button.addEventListener("click", async () => {
		const feedback = button
			.closest(".share")
			?.querySelector("[data-copy-status]");
		try {
			await navigator.clipboard.writeText(window.location.href);
			if (feedback) {
				feedback.textContent = button.dataset.copied;
				setTimeout(() => {
					feedback.textContent = "";
				}, 2000);
			}
		} catch {
			if (feedback) feedback.textContent = "";
		}
	});
}
