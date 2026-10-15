export const RELEASE_DATE = "2026-09-29";
export const SITE_URL = "https://clipey.com.br";
export const SITE_NAME = "Clipey";
export const LANGUAGES = ["pt-BR", "en", "es"];
export const THEME_KEY = "clipey-theme";
export const RELEASES_URL =
	"https://github.com/produtoramaxvision/clipey/releases/latest";
export const REPO_URL = "https://github.com/produtoramaxvision/clipey";
export const CONTACT_EMAIL = "clipeyoficial@gmail.com";
export const OWNER = "Produtora MaxVision";

export const LANDING_PATH = { "pt-BR": "/", en: "/en/", es: "/es/" };
export const OG_LOCALE = { "pt-BR": "pt_BR", en: "en_US", es: "es_ES" };
export const LANGUAGE_LABEL = { "pt-BR": "PT", en: "EN", es: "ES" };
/** Each language written in itself, as the language links of an article show it. */
export const LANGUAGE_NAME = {
	"pt-BR": "Português",
	en: "English",
	es: "Español",
};

/** The legal pages exist in Portuguese and English; Spanish readers are sent to the English texts. */
export const LEGAL_PATHS = {
	"pt-BR": {
		privacy: "/privacidade/",
		terms: "/termos/",
		deletion: "/exclusao-de-dados/",
	},
	en: {
		privacy: "/en/privacy/",
		terms: "/en/terms/",
		deletion: "/en/data-deletion/",
	},
	es: {
		privacy: "/en/privacy/",
		terms: "/en/terms/",
		deletion: "/en/data-deletion/",
	},
};

/** Section ids on the landing page. The Spanish articles link a few English ids, so those stay as aliases. */
export const LANDING_ANCHORS = {
	"pt-BR": {
		features: "recursos",
		ai: "ia",
		publish: "publicar",
		privacy: "privacidade",
		requirements: "requisitos",
		blog: "blog",
		faq: "faq",
		download: "download",
	},
	en: {
		features: "features",
		ai: "ai",
		publish: "publishing",
		privacy: "privacy",
		requirements: "requirements",
		blog: "blog",
		faq: "faq",
		download: "download",
	},
	es: {
		features: "funciones",
		ai: "ia",
		publish: "publicar",
		privacy: "privacidad",
		requirements: "requisitos",
		blog: "blog",
		faq: "faq",
		download: "descargar",
	},
};

export const LANDING_ALIASES = {
	"pt-BR": {},
	en: {},
	es: { features: ["features"], privacy: ["privacy"], download: ["download"] },
};

/** Canonical category keys. Each article carries the slug of its own language in its front matter. */
export const CATEGORIES = {
	news: {
		"pt-BR": { slug: "novidades", label: "Novidades" },
		en: { slug: "news", label: "News" },
		es: { slug: "novedades", label: "Novedades" },
	},
	tutorials: {
		"pt-BR": { slug: "tutoriais", label: "Tutoriais" },
		en: { slug: "tutorials", label: "Tutorials" },
		es: { slug: "tutoriales", label: "Tutoriales" },
	},
	guides: {
		"pt-BR": { slug: "guias", label: "Guias" },
		en: { slug: "guides", label: "Guides" },
		es: { slug: "guias", label: "Guías" },
	},
	behind: {
		"pt-BR": { slug: "bastidores", label: "Bastidores" },
		en: { slug: "behind-the-scenes", label: "Behind the scenes" },
		es: { slug: "detras-de-escena", label: "Entre bastidores" },
	},
};

export const CATEGORY_KEYS = Object.keys(CATEGORIES);

/** The canonical key of a category slug written in any language, or undefined. */
export function categoryKeyOf(slug) {
	return CATEGORY_KEYS.find((key) =>
		LANGUAGES.some((lang) => CATEGORIES[key][lang].slug === slug),
	);
}

export const blogBase = (lang) =>
	lang === "pt-BR" ? "/blog/" : `/blog/${lang}/`;

const CATEGORY_SEGMENT = {
	"pt-BR": "categoria",
	en: "category",
	es: "categoria",
};

export const categoryUrl = (lang, key) =>
	`${blogBase(lang)}${CATEGORY_SEGMENT[lang]}/${CATEGORIES[key][lang].slug}/`;
