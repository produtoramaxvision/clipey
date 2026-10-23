// Worker entry for the static site. Its only job is the canonical host: www.clipey.com.br is bound to this Worker
// (wrangler.jsonc routes), so a zone rule is not needed. `assets.run_worker_first` is true because otherwise an
// existing asset (e.g. "/" -> index.html) would be served on www without reaching this code. Every other request is
// handed straight to the assets binding, which still applies html_handling, not_found_handling and _headers.

export const CANONICAL_ORIGIN = "https://clipey.com.br";
export const REDIRECT_HOSTS = new Set(["www.clipey.com.br"]);

export default {
	/** @param {Request} request @param {{ ASSETS: { fetch(request: Request): Promise<Response> } }} env */
	async fetch(request, env) {
		const url = new URL(request.url);
		if (REDIRECT_HOSTS.has(url.hostname)) {
			return new Response(null, {
				status: 301,
				headers: { Location: `${CANONICAL_ORIGIN}${url.pathname}${url.search}` },
			});
		}
		return env.ASSETS.fetch(request);
	},
};
