import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
	blogBase,
	CATEGORIES,
	categoryUrl,
	LANDING_PATH,
	LANGUAGES,
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

> Clipey é um aplicativo desktop para Windows que reúne gravação de tela com captura de cursor e cliques, edição assistida por IA na timeline e publicação para YouTube, TikTok e Instagram. Os projetos, arquivos de mídia e transcrições ficam guardados no computador do usuário.

Clipey funciona no Windows 10 e Windows 11. O aplicativo é offline-first, sem telemetria de uso, com suporte a modelos Whisper locais para transcrição e conexão com ferramentas MCP para automação de tarefas de edição.

## Páginas Principais

- [Clipey (Português)](${landingPt}): Página inicial oficial com visão geral dos recursos, IA assistida, kit de publicação e requisitos.
- [Clipey (English)](${landingEn}): Official English landing page with features, AI editing tools, publishing workflows, and requirements.
- [Clipey (Español)](${landingEs}): Página oficial en español con funciones, herramientas de IA, flujo de publicación y requisitos.

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

/** Generates /llms-full.txt: plain-text concatenation of the landing copy and the 18 pt-BR articles. */
export function renderLlmsFull(posts) {
	const copy = STORY["pt-BR"];
	const sections = [
		copy.record,
		copy.clicks,
		copy.overlays,
		copy.vertical,
		copy.local,
	];
	const parts = [];

	parts.push(`================================================================================
CLIPEY: ESTÚDIO DE VÍDEO PARA WINDOWS
${copy.hero.lines.map((line) => line[3]).join(" ")}
${copy.hero.sub}
================================================================================

RECURSOS:
${sections.map((section) => `- ${[section.title].flat().join(" ")} ${section.text}`).join("\n")}

PUBLICAÇÃO:
${copy.publish.title} ${copy.publish.titleMuted}
${copy.publish.notes.map(([title, text]) => `- ${title}: ${text}`).join("\n")}

DOWNLOAD E REQUISITOS:
${copy.export.platform}. ${copy.export.pricing} ${copy.export.requirements}

PERGUNTAS FREQUENTES (FAQ):
${copy.faq.map(([q, a]) => `P: ${q}\nR: ${a}`).join("\n\n")}`);

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
			renderLanding(lang, posts, assets.landing),
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

	files.set("sitemap.xml", renderSitemap(posts));
	files.set("llms.txt", renderLlms(posts));
	files.set("llms-full.txt", renderLlmsFull(posts));
	files.set("_headers", renderHeaders());

	return files;
}
