import { getPosts } from "./content.mjs";
import { CATEGORY_LABELS, LANGUAGES } from "./config.mjs";

export function buildTeasers(posts = getPosts()) {
	const complete = posts.filter((post) =>
		LANGUAGES.every((lang) => post.content[lang]),
	);
	return Object.fromEntries(
		LANGUAGES.map((lang) => [
			lang,
			complete.slice(0, 3).map((post) => ({
				title: post.content[lang].title,
				description: post.content[lang].description,
				category:
					CATEGORY_LABELS[lang][post.content[lang].category] ||
					post.content[lang].category,
				url: post.content[lang].url,
			})),
		]),
	);
}
