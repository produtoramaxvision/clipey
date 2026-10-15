import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "js-yaml";
import { Marked } from "marked";
import { LANGUAGES, RELEASE_DATE } from "./config.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../content/blog");
const categorySet = new Set(["novidades", "tutoriais", "guias", "bastidores", "news", "tutorials", "guides", "behind-the-scenes", "novedades", "tutoriales", "guias", "detras-de-escena"]);
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const reportedMissing = new Set();

export function readingTime(markdown) {
	const words = String(markdown).replace(/[#*_`>\[\]()!-]/g, " ").trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / 200));
}

function parsePost(file, lang) {
	const raw = fs.readFileSync(file, "utf8");
	const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
	if (!match) throw new Error(`${file}: expected YAML frontmatter`);
	const data = load(match[1]);
	if (data.lang !== lang || !/^[a-z0-9-]+$/.test(data.slug) || !/^[a-z0-9-]+$/.test(data.translationKey)) throw new Error(`${file}: invalid language or slug`);
	if (!categorySet.has(data.category) || !Array.isArray(data.tags) || data.tags.length < 1 || data.tags.length > 3) throw new Error(`${file}: invalid category or tags`);
	if (data.title.length > 60 || data.description.length > 155 || !Number.isInteger(data.order)) throw new Error(`${file}: invalid title, description, or order`);
	const validDate = (value) => value === "{{RELEASE_DATE}}" || /^\d{4}-\d{2}-\d{2}$/.test(value);
	if (data.appliesTo !== "1.15" || typeof data.featured !== "boolean" || !validDate(data.date) || !validDate(data.updated)) throw new Error(`${file}: invalid applicability, feature flag, or dates`);
	data.date = data.date.replaceAll("{{RELEASE_DATE}}", RELEASE_DATE);
	data.updated = data.updated.replaceAll("{{RELEASE_DATE}}", RELEASE_DATE);
	const body = match[2].replaceAll("{{RELEASE_DATE}}", RELEASE_DATE);
	const renderer = {
		heading(token) {
			const text = this.parser.parseInline(token.tokens);
			const id = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
			return `<h${token.depth} id="${id}">${text}</h${token.depth}>\n`;
		},
		html(token) {
			return escapeHtml(token.text);
		},
		link(token) {
			if (!/^(https:|mailto:|\/|#)/.test(token.href)) throw new Error(`unsafe Markdown link: ${token.href}`);
			return `<a href="${escapeHtml(token.href)}">${this.parser.parseInline(token.tokens)}</a>`;
		},
		image(token) {
			if (!/^\/blog\/(covers|og|img)\/[a-zA-Z0-9._/-]+$/.test(token.href) || token.href.includes("..")) throw new Error(`unsafe Markdown image: ${token.href}`);
			const imagePath = path.join(root, "../../public", token.href.replace(/^\//, ""));
			if (!fs.existsSync(imagePath)) return `<span class="image-placeholder" role="img" aria-label="${escapeHtml(token.text)}">${escapeHtml(token.text)}</span>`;
			return `<img src="${escapeHtml(token.href)}" alt="${escapeHtml(token.text)}" loading="lazy" width="1200" height="675">`;
		},
	};
	const html = new Marked({ gfm: true, breaks: false, renderer }).parse(body);
	if (/<script\b|javascript:/i.test(html)) throw new Error(`${file}: unsafe Markdown output`);
	return { ...data, html, markdown: body, readMinutes: readingTime(body), url: lang === "pt-BR" ? `/blog/${data.slug}/` : `/blog/${lang}/${data.slug}/` };
}

export function getPosts() {
	if (cachedPosts) return cachedPosts;
	const posts = new Map();
	for (const lang of LANGUAGES) {
		const folder = path.join(root, lang);
		if (!fs.existsSync(folder)) continue;
		for (const name of fs.readdirSync(folder).filter((entry) => entry.endsWith(".md"))) {
			const item = parsePost(path.join(folder, name), lang);
			const missing = [item.cover, item.ogImage].filter((image) => image && !fs.existsSync(path.resolve(root, "../../public", `.${image}`)));
			if (missing.length && process.env.CLIPEY_STRICT_IMAGES === "1") throw new Error(`${name}: missing image(s): ${missing.join(", ")}`);
			if (missing.length && !reportedMissing.has(name)) {
				console.warn(`[blog] ${name}: using neutral placeholders for ${missing.join(", ")}`);
				reportedMissing.add(name);
			}
			if (missing.includes(item.cover)) item.cover = "";
			if (missing.includes(item.ogImage)) item.ogImage = "";
			const post = posts.get(item.translationKey) || { translationKey: item.translationKey, order: item.order, featured: item.featured, content: {} };
			post.content[lang] = item;
			posts.set(item.translationKey, post);
		}
	}
	cachedPosts = [...posts.values()].sort((a, b) => a.order - b.order);
	return cachedPosts;
}

let cachedPosts;

export { escapeHtml };
