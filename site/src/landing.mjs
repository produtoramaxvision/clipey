/**
 * The landing page of each language: the v2 story page, with its JSON-LD (organisation, site, app and FAQ).
 * Every language has STORY copy, so each landing alternates with the other two.
 */
import {
	LANDING_PATH,
	LANGUAGES,
	OWNER,
	RELEASES_URL,
	SITE_NAME,
	SITE_URL,
} from "./blog/config.mjs";
import { UI } from "./blog/i18n.mjs";
import { STORY } from "./landing-copy.mjs";
import { renderStory } from "./landing-story.mjs";

/** The landing URL of every language, for hreflang alternates and the language switcher. */
export const landingAlternates = () =>
	Object.fromEntries(LANGUAGES.map((code) => [code, LANDING_PATH[code]]));

function jsonLd(lang, canonical) {
	const ui = UI[lang];
	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"@id": `${SITE_URL}/#organization`,
				name: OWNER,
				url: `${SITE_URL}/`,
				logo: {
					"@type": "ImageObject",
					"@id": `${SITE_URL}/#logo`,
					url: `${SITE_URL}/clipey-256.png`,
					caption: SITE_NAME,
				},
			},
			{
				"@type": "WebSite",
				"@id": `${SITE_URL}/#website`,
				name: SITE_NAME,
				url: `${SITE_URL}/`,
				publisher: { "@id": `${SITE_URL}/#organization` },
				inLanguage: lang,
			},
			{
				"@type": "SoftwareApplication",
				"@id": `${SITE_URL}${canonical}#software`,
				name: SITE_NAME,
				applicationCategory: "MultimediaApplication",
				operatingSystem: "Windows 10, Windows 11",
				description: ui.landing.description,
				inLanguage: lang,
				url: `${SITE_URL}${canonical}`,
				downloadUrl: RELEASES_URL,
				author: { "@id": `${SITE_URL}/#organization` },
				publisher: { "@id": `${SITE_URL}/#organization` },
			},
			{
				"@type": "FAQPage",
				"@id": `${SITE_URL}${canonical}#faq`,
				mainEntity: STORY[lang].faq.map(([question, answer]) => ({
					"@type": "Question",
					name: question,
					acceptedAnswer: {
						"@type": "Answer",
						text: answer,
					},
				})),
			},
		],
	};
}

export function renderLanding(lang, assets) {
	return renderStory(lang, {
		assets,
		alternates: landingAlternates(),
		jsonLd: jsonLd(lang, LANDING_PATH[lang]),
	});
}
