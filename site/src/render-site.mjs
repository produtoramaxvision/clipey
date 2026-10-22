import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
	blogBase,
	CATEGORIES,
	categoryUrl,
	LANDING_PATH,
	LANGUAGES,
	RELEASES_URL,
	SITE_URL,
} from "./blog/config.mjs";
import {
	renderAtom,
	renderRss,
	renderSearchIndex,
	renderSitemap,
} from "./blog/feeds.mjs";
import {
	renderBlogArticle,
	renderBlogIndex,
	usedCategories,
} from "./blog/template.mjs";
import { renderHeaders } from "./headers.mjs";
import { renderLanding } from "./landing.mjs";
import { STORY } from "./landing-copy.mjs";
import { VERSION_LABEL } from "./landing-v3.mjs";
import { LANDING } from "./landing-v3-copy.mjs";

const siteRoot = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"..",
);
const legalSourceDir = path.join(siteRoot, "legal-source");

export const LEGAL_OUTPUT_FILES = [
	"privacidade/index.html",
	"termos/index.html",
	"exclusao-de-dados/index.html",
	"en/privacy/index.html",
	"en/terms/index.html",
	"en/data-deletion/index.html",
	"404.html",
	"announcements.json",
];

/** The legal pages' shared stylesheet. It is generated so its @font-face names the self-hosted Geist file. */
export const LEGAL_STYLESHEET = "legal.css";

/** `fontUrl` is the built (or, in development, source) URL of the Geist sans variable font. */
export function renderLegalStylesheet(fontUrl) {
	const rules = fs.readFileSync(path.join(siteRoot, "src/legal.css"), "utf8");
	return `@font-face{font-family:Geist;src:url("${fontUrl}") format("woff2");font-weight:100 900;font-style:normal;font-display:swap}
${rules}`;
}

/** The file a public URL is served from: `/blog/` is `blog/index.html`. */
export function fileForUrl(url) {
	return url.endsWith("/") ? `${url.slice(1)}index.html` : url.slice(1);
}

/** Generates /llms.txt adhering strictly to the llmstxt.org specification. */
export function renderLlms(posts) {
	const landingPt = `${SITE_URL}/`;
	const landingEn = `${SITE_URL}/en/`;
	const landingEs = `${SITE_URL}/es/`;

	const formatPosts = (lang) =>
		posts
			.filter((p) => p.content[lang])
			.map(
				(p) =>
					`- [${p.content[lang].title}](${SITE_URL}${p.content[lang].url}): ${p.content[lang].description}`,
			)
			.join("\n");

	return `# Clipey

> Clipey é um aplicativo desktop para Windows, macOS e Linux que reúne gravação de tela com captura de cursor e cliques, edição assistida por IA na timeline e publicação para YouTube, TikTok e Instagram. Os projetos, arquivos de mídia e transcrições ficam guardados no computador do usuário.

Clipey funciona no Windows, macOS e Linux. O aplicativo é offline-first, sem telemetria de uso, com suporte a modelos Whisper locais para transcrição e conexão com ferramentas MCP para automação de tarefas de edição.

## Páginas Principais

- [Clipey (Português)](${landingPt}): Página inicial oficial: gravar, editar com zooms, cortes e legendas, publicar nas redes, usar o celular como controle, transcrição no computador e download para Windows, macOS e Linux.
- [Clipey (English)](${landingEn}): Official English landing page: record, edit with zooms, cuts and captions, publish to social networks, use your phone as a remote, on-device transcription and downloads for Windows, macOS and Linux.
- [Clipey (Español)](${landingEs}): Página oficial en español: grabar, editar con zooms, cortes y subtítulos, publicar en redes, usar el móvil como control, transcripción en la computadora y descargas para Windows, macOS y Linux.

## Blog e Tutoriais (Português)

${formatPosts("pt-BR")}

## Blog and Tutorials (English)

${formatPosts("en")}

## Blog y Tutoriales (Español)

${formatPosts("es")}

## Informações Legais

- [Política de privacidade](${SITE_URL}/privacidade/): Tratamento de dados, armazenamento local e direitos do usuário.
- [Termos de uso](${SITE_URL}/termos/): Termos e condições de uso do aplicativo Clipey.
- [Exclusão de dados](${SITE_URL}/exclusao-de-dados/): Procedimentos para desconexão de contas e remoção de dados locais.
- [Privacy Policy (EN)](${SITE_URL}/en/privacy/): Clipey privacy policy in English.
- [Terms of Service (EN)](${SITE_URL}/en/terms/): Clipey terms of service in English.
- [Data Deletion (EN)](${SITE_URL}/en/data-deletion/): Data deletion instructions in English.

## Documentação Completa

- [llms-full.txt](${SITE_URL}/llms-full.txt): Texto completo da página inicial e dos 18 artigos em português para modelos de linguagem.
`;
}

/**
 * Generates /llms-full.txt: the pt-BR v3 landing as plain text, the FAQ (kept here until the FAQ page exists; the v3
 * landing shows none) and the 18 pt-BR articles.
 */
export function renderLlmsFull(posts) {
	const copy = LANDING["pt-BR"];
	const version = (text) => text.replaceAll("{version}", VERSION_LABEL);
	const section = (title, ...lines) => `${title}:\n${lines.join("\n")}`;
	const parts = [];

	parts.push(`================================================================================
CLIPEY: GRAVAÇÃO DE TELA, EDIÇÃO E PUBLICAÇÃO DE VÍDEO ${copy.hero.platforms.toUpperCase()}
${copy.hero.title.join(" ")}
${copy.hero.sub}
${version(copy.hero.meta)}
================================================================================

${section(
	"COMPATIBILIDADE",
	...copy.compat.groups.map(([label, items]) => `- ${label}: ${items.join(", ")}`),
)}

${section(
	"GRAVAR",
	`${copy.record.title} ${copy.record.text}`,
	...copy.record.list.map((item) => `- ${item}`),
)}

${section(
	"EDITAR",
	`${copy.edit.title.join(" ")} ${copy.edit.text}`,
	...Object.values(copy.edit.tabs).map(
		(tab) => `- ${tab.label}: ${tab.title} ${tab.steps.map(([title, text]) => `${title}: ${text}`).join(" ")} (${tab.also.join("; ")})`,
	),
)}

${section(
	"AGENTES (MCP)",
	`${copy.agents.title.join(" ")} ${copy.agents.text}`,
	copy.agents.note,
)}

${section(
	"GAMES, WEBCAM E DESENHOS",
	`${copy.games.title} ${copy.games.text}`,
	...copy.games.list.map((item) => `- ${item}`),
)}

${section("PUBLICAR", `${copy.publish.title} ${copy.publish.text}`, copy.publish.note)}

${section("NO CELULAR", `${copy.phone.title} ${copy.phone.text}`)}

${section("NO SEU COMPUTADOR", `${copy.local.title} ${copy.local.text}`)}

${section(
	"DOWNLOAD",
	`${copy.download.buttons.join(" · ")}: ${RELEASES_URL}`,
)}

PERGUNTAS FREQUENTES (FAQ):
${STORY["pt-BR"].faq.map(([q, a]) => `P: ${q}\nR: ${a}`).join("\n\n")}`);

	for (const post of posts) {
		const item = post.content["pt-BR"];
		if (!item) continue;
		parts.push(`================================================================================
ARTIGO ${post.order}: ${item.title.toUpperCase()}
Categoria: ${CATEGORIES[post.categoryKey]["pt-BR"].label}
Tags: ${item.tags.join(", ")}
Autor: ${item.author}
Data: ${post.date}
URL: ${SITE_URL}${item.url}
Descrição: ${item.description}
--------------------------------------------------------------------------------
${item.markdown.trim()}`);
	}

	return parts.join("\n\n");
}

/**
 * Every generated file of the site as `fileName -> source`.
 * `assets` is `{ landing, blog }`, each `{ css: [urls], font, script }`.
 */
export function renderSite(posts, legalOrAssets, maybeAssets) {
	const assets = maybeAssets ?? legalOrAssets;
	const files = new Map();

	for (const lang of LANGUAGES) {
		files.set(
			fileForUrl(LANDING_PATH[lang]),
			renderLanding(lang, assets.landing),
		);
		files.set(
			fileForUrl(blogBase(lang)),
			renderBlogIndex(lang, posts, assets.blog),
		);
		for (const key of usedCategories(posts)) {
			files.set(
				fileForUrl(categoryUrl(lang, key)),
				renderBlogIndex(lang, posts, assets.blog, key),
			);
		}
		for (const post of posts) {
			files.set(
				fileForUrl(post.content[lang].url),
				renderBlogArticle(post, lang, posts, assets.blog),
			);
		}
		const baseDir = fileForUrl(blogBase(lang)).replace("index.html", "");
		files.set(
			`${baseDir}feed.xml`,
			renderRss(lang, posts, `${SITE_URL}${blogBase(lang)}feed.xml`),
		);
		files.set(
			`${baseDir}rss.xml`,
			renderRss(lang, posts, `${SITE_URL}${blogBase(lang)}rss.xml`),
		);
		files.set(
			`${baseDir}atom.xml`,
			renderAtom(lang, posts, `${SITE_URL}${blogBase(lang)}atom.xml`),
		);
		files.set(`${baseDir}search-index.json`, renderSearchIndex(lang, posts));
	}

	for (const fileName of LEGAL_OUTPUT_FILES) {
		const source = fs.readFileSync(path.join(legalSourceDir, fileName), "utf8");
		files.set(fileName, source);
	}
	files.set(LEGAL_STYLESHEET, renderLegalStylesheet(assets.landing.font));

	files.set("sitemap.xml", renderSitemap(posts));
	files.set("llms.txt", renderLlms(posts));
	files.set("llms-full.txt", renderLlmsFull(posts));
	files.set("_headers", renderHeaders());

	return files;
}
