/**
 * The landing page of each language: the v3 page, with its JSON-LD (organisation, site and app). The v3 design has no
 * visible FAQ, so the page carries no FAQPage markup (structured data must describe content the page shows); the FAQ
 * text stays in llms-full.txt. Every language has v3 copy, so each landing alternates with the other two.
 */
import {
	APP_VERSION,
	LANDING_PATH,
	LANGUAGES,
	OWNER,
	RELEASES_URL,
	SITE_NAME,
	SITE_URL,
} from "./blog/config.mjs";
import { UI } from "./blog/i18n.mjs";
import { renderLanding3 } from "./landing-v3.mjs";

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
				operatingSystem: "Windows, macOS, Linux",
				description: ui.landing.description,
				inLanguage: lang,
				url: `${SITE_URL}${canonical}`,
				downloadUrl: RELEASES_URL,
				softwareVersion: APP_VERSION,
				offers: {
					"@type": "Offer",
					price: "0",
					priceCurrency: "USD",
					url: RELEASES_URL,
				},
				author: { "@id": `${SITE_URL}/#organization` },
				publisher: { "@id": `${SITE_URL}/#organization` },
			},
		],
	};
}

export function renderLanding(lang, assets) {
	return renderLanding3(lang, {
		assets,
		alternates: landingAlternates(),
		jsonLd: jsonLd(lang, LANDING_PATH[lang]),
	});
}
