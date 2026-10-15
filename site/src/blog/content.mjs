import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "js-yaml";
import { Marked } from "marked";
import { blogBase, categoryKeyOf, LANGUAGES, RELEASE_DATE } from "./config.mjs";

const siteRoot = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"../..",
);
const contentRoot = path.join(siteRoot, "content/blog");
const publicRoot = path.join(siteRoot, "public");
const reportedMissing = new Set();
const ESCAPES = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;",
};

export const escapeHtml = (value) =>
	String(value ?? "").replace(/[&<>"']/g, (char) => ESCAPES[char]);

export function countWords(markdown) {
	return String(markdown)
		.replace(/[#*_`>[\]()!-]/g, " ")
		.trim()
		.split(/\s+/)
		.filter(Boolean).length;
}

export function readingTime(markdown) {
	return Math.max(1, Math.ceil(countWords(markdown) / 200));
}

export function slugifyHeading(text) {
	return text
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

function createRenderer(headings) {
	const used = new Set();
	return {
		heading(token) {
			const text = this.parser.parseInline(token.tokens);
			const base = slugifyHeading(token.text) || "secao";
			let id = base;
			for (let count = 2; used.has(id); count += 1) id = `${base}-${count}`;
			used.add(id);
			if (token.depth === 2) headings.push({ id, text: token.text });
			return `<h${token.depth} id="${id}">${text}</h${token.depth}>\n`;
		},
		html(token) {
			return escapeHtml(token.text);
		},
		link(token) {
			if (!/^(https:|mailto:|\/|#)/.test(token.href))
				throw new Error(`unsafe Markdown link: ${token.href}`);
			const external = token.href.startsWith("https:");
			return `<a href="${escapeHtml(token.href)}"${external ? ' rel="noopener noreferrer"' : ""}>${this.parser.parseInline(token.tokens)}</a>`;
		},
		image(token) {
			if (
				!/^\/blog\/(covers|og|img)\/[a-zA-Z0-9._/-]+$/.test(token.href) ||
				token.href.includes("..")
			)
				throw new Error(`unsafe Markdown image: ${token.href}`);
			if (
				!fs.existsSync(path.join(publicRoot, token.href.replace(/^\//, "")))
			) {
				return `<span class="image-placeholder" role="img" aria-label="${escapeHtml(token.text)}"><span class="image-placeholder-label">${escapeHtml(token.text)}</span></span>`;
			}
			return `<img class="article-image" src="${escapeHtml(token.href)}" alt="${escapeHtml(token.text)}" loading="lazy" decoding="async" width="1200" height="675">`;
		},
	};
}

function parsePost(file, lang) {
	const raw = fs.readFileSync(file, "utf8");
	const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
	if (!match) throw new Error(`${file}: expected YAML frontmatter`);
	const data = load(match[1]);
	if (
		data.lang !== lang ||
		!/^[a-z0-9-]+$/.test(data.slug) ||
		!/^[a-z0-9-]+$/.test(data.translationKey)
	)
		throw new Error(`${file}: invalid language or slug`);
	const categoryKey = categoryKeyOf(data.category);
	if (
		!categoryKey ||
		!Array.isArray(data.tags) ||
		data.tags.length < 1 ||
		data.tags.length > 3
	)
		throw new Error(`${file}: invalid category or tags`);
	if (
		data.title.length > 60 ||
		data.description.length > 155 ||
		!Number.isInteger(data.order)
	)
		throw new Error(`${file}: invalid title, description, or order`);
	const validDate = (value) =>
		value === "{{RELEASE_DATE}}" || /^\d{4}-\d{2}-\d{2}$/.test(value);
	if (
		data.appliesTo !== "1.15" ||
		typeof data.featured !== "boolean" ||
		!validDate(data.date) ||
		!validDate(data.updated)
	)
		throw new Error(`${file}: invalid applicability, feature flag, or dates`);
	data.date = data.date.replaceAll("{{RELEASE_DATE}}", RELEASE_DATE);
	data.updated = data.updated.replaceAll("{{RELEASE_DATE}}", RELEASE_DATE);
	const body = match[2].replaceAll("{{RELEASE_DATE}}", RELEASE_DATE);
	const headings = [];
	const html = new Marked({
		gfm: true,
		breaks: false,
		renderer: createRenderer(headings),
	}).parse(body);
	if (/<script\b|javascript:/i.test(html))
		throw new Error(`${file}: unsafe Markdown output`);
	return {
		...data,
		categoryKey,
		html,
		headings,
		markdown: body,
		wordCount: countWords(body),
		readMinutes: readingTime(body),
		url: `${blogBase(lang)}${data.slug}/`,
	};
}

function imageExists(image) {
	return fs.existsSync(path.join(publicRoot, `.${image}`));
}

let cachedPosts;

/** Posts grouped by translation key and sorted by editorial order; each holds one entry per language in `content`. */
export function getPosts() {
	if (cachedPosts) return cachedPosts;
	const posts = new Map();
	for (const lang of LANGUAGES) {
		const folder = path.join(contentRoot, lang);
		if (!fs.existsSync(folder)) continue;
		for (const name of fs
			.readdirSync(folder)
			.filter((entry) => entry.endsWith(".md"))
			.sort()) {
			const item = parsePost(path.join(folder, name), lang);
			const missing = [item.cover, item.ogImage].filter(
				(image) => image && !imageExists(image),
			);
			if (missing.length && process.env.CLIPEY_STRICT_IMAGES === "1")
				throw new Error(`${name}: missing image(s): ${missing.join(", ")}`);
			if (missing.length && !reportedMissing.has(name)) {
				console.warn(
					`[blog] ${name}: using neutral placeholders for ${missing.join(", ")}`,
				);
				reportedMissing.add(name);
			}
			if (missing.includes(item.cover)) item.cover = "";
			if (missing.includes(item.ogImage)) item.ogImage = "";
			const post = posts.get(item.translationKey) || {
				translationKey: item.translationKey,
				order: item.order,
				featured: item.featured,
				categoryKey: item.categoryKey,
				date: item.date,
				updated: item.updated,
				content: {},
			};
			post.content[lang] = item;
			posts.set(item.translationKey, post);
		}
	}
	cachedPosts = [...posts.values()].sort((a, b) => a.order - b.order);
	return cachedPosts;
}

/** Posts that exist in every language: the only ones the site publishes. */
export function getCompletePosts() {
	return getPosts().filter((post) =>
		LANGUAGES.every((lang) => post.content[lang]),
	);
}
