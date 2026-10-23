import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { escapeHtml as esc } from "./content.mjs";

const publicRoot = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"../../public",
);

/** Widths the screenshot pipeline writes as /shots/<name>-<locale>-<width>.webp. */
export const SHOT_WIDTHS = [800, 1400, 2400];

/** The UI languages a shot may be captured in, best first for each article language (the app starts in English). */
export const SHOT_LOCALES = {
	"pt-BR": ["pt-BR", "en"],
	en: ["en"],
	es: ["es", "en"],
};

/**
 * The real app screenshot that shows the UI area an article walks through, with the size of the source capture.
 * Articles about a screen that has no capture have no entry.
 */
export const ARTICLE_FIGURES = {
	"clipey-1-15-novidades": {
		shot: "editor-full-speed-zoom-lanes-dark",
		width: 3200,
		height: 2000,
		alt: {
			"pt-BR":
				"Editor do Clipey 1.15 com a prévia em zoom e a timeline com faixas de velocidade e de zoom",
			en: "Clipey 1.15 editor with the preview zoomed in and the timeline showing speed and zoom lanes",
			es: "Editor de Clipey 1.15 con la vista previa ampliada y la línea de tiempo con pistas de velocidad y zoom",
		},
	},
	"gravar-tela-windows-com-cursor-e-cliques": {
		shot: "editor-record-tab-dark",
		width: 3200,
		height: 2000,
		alt: {
			"pt-BR":
				"Aba de gravação do Clipey com fonte, áudio, câmera, cursor editável e captura de teclas",
			en: "Clipey record tab with source, audio, camera, editable cursor and keystroke capture",
			es: "Pestaña de grabación de Clipey con fuente, audio, cámara, cursor editable y captura de teclas",
		},
	},
	"efeitos-de-mouse-cliques-halo-spotlight": {
		shot: "pane-mouse-effects-dark",
		width: 868,
		height: 2460,
		alt: {
			"pt-BR":
				"Painel de efeitos de mouse com cores por botão, indicador de rolagem, rastro de arraste, halo e holofote",
			en: "Mouse effects pane with per-button colours, scroll indicator, drag trail, halo and spotlight",
			es: "Panel de efectos de ratón con colores por botón, indicador de desplazamiento, estela de arrastre, halo y foco",
		},
	},
	"atalhos-e-produtividade-na-timeline": {
		shot: "timeline-dark",
		width: 3200,
		height: 784,
		alt: {
			"pt-BR":
				"Timeline do Clipey com faixas de velocidade e de zoom acima do clipe",
			en: "Clipey timeline with speed and zoom lanes above the clip",
			es: "Línea de tiempo de Clipey con pistas de velocidad y zoom sobre el clip",
		},
	},
	"edicao-com-ia-cortes-zooms-silencio": {
		shot: "editor-full-chat-cursor-dark",
		width: 3200,
		height: 2000,
		alt: {
			"pt-BR": "Editor do Clipey com o painel de conversa do agente aberto",
			en: "Clipey editor with the agent chat panel open",
			es: "Editor de Clipey con el panel de conversación del agente abierto",
		},
	},
	"auto-clip-shorts-de-videos-longos": {
		shot: "pane-audio-voice-autoclip-dark",
		width: 868,
		height: 2460,
		alt: {
			"pt-BR":
				"Painel de áudio e Studio com transcrição, voz, estimativa de custo e clipes automáticos",
			en: "Audio and Studio pane with transcription, voice, cost estimate and auto clip",
			es: "Panel de audio y Studio con transcripción, voz, estimación de costo y clips automáticos",
		},
	},
	"legendas-automaticas-e-importar-srt-vtt": {
		shot: "pane-captions-style-dark",
		width: 868,
		height: 2460,
		alt: {
			"pt-BR":
				"Painel de legendas com estilos, importação de legendas, predefinições e posição",
			en: "Captions pane with styles, subtitle import, presets and position",
			es: "Panel de subtítulos con estilos, importación de subtítulos, ajustes predefinidos y posición",
		},
	},
	"dublagem-e-voz-com-ia-custos-e-cache": {
		shot: "settings-voice-dubbing-dark",
		width: 1940,
		height: 1040,
		alt: {
			"pt-BR": "Configurações de provedores de voz e dublagem do Clipey",
			en: "Clipey voice and dubbing provider settings",
			es: "Ajustes de proveedores de voz y doblaje de Clipey",
		},
	},
	"importar-video-por-link": {
		shot: "editor-media-library-dark",
		width: 3200,
		height: 2000,
		alt: {
			"pt-BR":
				"Aba de mídia do Clipey com a biblioteca e a opção de importar por link",
			en: "Clipey media tab with the library and the import from link option",
			es: "Pestaña de medios de Clipey con la biblioteca y la opción de importar desde un enlace",
		},
	},
	"publicacao-agendada-youtube-tiktok-instagram": {
		shot: "export-dialog-tiktok-schedule-dark",
		width: 1960,
		height: 2198,
		alt: {
			"pt-BR":
				"Diálogo de exportação com a predefinição do TikTok e a aba de agendamento",
			en: "Export dialog with the TikTok preset and the schedule tab",
			es: "Diálogo de exportación con el ajuste de TikTok y la pestaña de programación",
		},
	},
	"kit-de-publicacao-video-capas-textos": {
		shot: "export-dialog-presets-publish-dark",
		width: 1960,
		height: 1772,
		alt: {
			"pt-BR":
				"Diálogo de exportação com predefinições, publicação e o kit de publicação",
			en: "Export dialog with presets, publishing and the publish kit",
			es: "Diálogo de exportación con ajustes predefinidos, publicación y el kit de publicación",
		},
	},
	"exportacao-confiavel-presets-e-verificacao": {
		shot: "editor-export-dialog-full-dark",
		width: 3200,
		height: 2000,
		alt: {
			"pt-BR":
				"Diálogo de exportação sobre o editor, com formato, qualidade e tamanho estimado",
			en: "Export dialog over the editor, with format, quality and estimated size",
			es: "Diálogo de exportación sobre el editor, con formato, calidad y tamaño estimado",
		},
	},
	"clipey-com-agentes-de-ia-mcp": {
		shot: "settings-ai-assistant-mcp-dark",
		width: 1940,
		height: 1740,
		alt: {
			"pt-BR":
				"Configurações do assistente de IA com provedores e o servidor MCP",
			en: "AI assistant settings with providers and the MCP server",
			es: "Ajustes del asistente de IA con proveedores y el servidor MCP",
		},
	},
	"primeiros-passos-no-clipey": {
		shot: "onboarding-step1-welcome",
		width: 1382,
		height: 528,
		alt: {
			"pt-BR":
				"Primeira etapa da introdução do Clipey acima da barra de gravação",
			en: "First onboarding step of Clipey above the recording bar",
			es: "Primer paso de la introducción de Clipey sobre la barra de grabación",
		},
	},
};

const shotExists = (file) =>
	fs.existsSync(path.join(publicRoot, "shots", file));

/**
 * The `<figure>` of an article, or "" when it has none or the screenshot files are not there yet. The shot is in the
 * article's UI language when it was captured in it, in English otherwise; one figure never mixes languages.
 * `exists` (a file name under /shots/) is injectable so tests do not depend on the public folder.
 */
export function articleFigure(
	translationKey,
	lang,
	caption,
	exists = shotExists,
) {
	const figure = ARTICLE_FIGURES[translationKey];
	if (!figure) return "";
	const fileOf = (locale, width) => `${figure.shot}-${locale}-${width}.webp`;
	const locale = SHOT_LOCALES[lang].find((code) =>
		SHOT_WIDTHS.some((width) => exists(fileOf(code, width))),
	);
	if (!locale) return "";
	const widths = SHOT_WIDTHS.filter((width) => exists(fileOf(locale, width)));
	const src = (width) => `/shots/${fileOf(locale, width)}`;
	const tall = figure.height > figure.width;
	const fallback = widths.includes(1400) ? 1400 : widths[0];
	const height = Math.round((fallback * figure.height) / figure.width);
	return `<figure class="shot${tall ? " shot--tall" : ""}">
	<img src="${src(fallback)}" srcset="${widths.map((width) => `${src(width)} ${width}w`).join(", ")}" sizes="${tall ? "(max-width: 760px) 80vw, 340px" : "(max-width: 760px) 100vw, 720px"}" width="${fallback}" height="${height}" alt="${esc(figure.alt[lang])}" loading="lazy" decoding="async">
	<figcaption>${esc(caption)}</figcaption>
</figure>`;
}
