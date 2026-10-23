const QUALIFIER = {
	"pt-BR": /próxima versão/i,
	en: /next version/i,
	es: /próxima versión/i,
};

const LEGAL_OR_API = /youtube\.com\/t\/terms|youtube api|serviços de api do youtube|servicios de api de youtube/i;

const EXPORT_PRESET = /youtube shorts|youtube 1080p|youtube 4k|landscape youtube|horizontal de youtube|vídeo horizontal de youtube/i;

const PUBLISH_VERB =
	/(publica(r|ção|ções)?|publish(ing|es)?|agend|program|schedul|upload|envia(r)?|post to youtube|para o youtube|para youtube|to youtube|en youtube|no youtube)/i;

const OBSOLETE =
	/privados, até a aprovação do Google|private, until Google'?s approval|privados, hasta la aprobación de Google/i;

/** @param {string} sentence */
function sentenceClaimsYouTubePublishing(sentence) {
	const visible = sentence.replace(/\[[^\]]*\]\([^)]*\)/g, (link) =>
		link.replace(/\([^)]*\)/, ""),
	);
	if (!/youtube/i.test(visible)) return false;
	if (LEGAL_OR_API.test(sentence)) return false;
	if (EXPORT_PRESET.test(sentence)) return false;
	if (/manual(mente)?|manual upload/i.test(sentence)) return false;
	if (/não publica|does not publish|no publica/i.test(sentence)) return false;
	if (/presets? do youtube|presets? de youtube|youtube presets/i.test(sentence)) return false;
	if (
		/sem youtube|\bno youtube\b|without youtube|sin youtube|não pode|cannot|no puedes|indisponível|unavailable|no disponible|not available/i.test(
			sentence,
		)
	)
		return false;
	return PUBLISH_VERB.test(visible);
}

/**
 * @param {string} text
 * @param {"pt-BR" | "en" | "es"} lang
 * @returns {string[]}
 */
export function findUnqualifiedYouTubePublishClaims(text, lang) {
	const bad = [];
	for (const sentence of String(text).split(/(?<=[.!?])\s+/)) {
		if (!sentenceClaimsYouTubePublishing(sentence)) continue;
		if (!QUALIFIER[lang].test(sentence)) bad.push(sentence);
	}
	return bad;
}

/** @param {string} text */
export function hasObsoleteYouTubePrivateCopy(text) {
	return OBSOLETE.test(text);
}
