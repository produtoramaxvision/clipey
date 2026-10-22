import { THEME_SCRIPT_HASH } from "./blog/shell.mjs";

/**
 * The Cloudflare Workers Static Assets `_headers` file.
 * Never set the same header in two overlapping rules: Workers joins the values of every matching rule with ", ",
 * so a second Cache-Control would produce a contradictory header. HTML keeps the platform default
 * "Cache-Control: public, max-age=0, must-revalidate".
 *
 * CSP notes:
 * - script-src hash = the single-line theme bootstrap (THEME_SCRIPT in src/blog/shell.mjs, the only inline script);
 *   tests recompute it from the rendered pages.
 * - The only other origins are Cloudflare Web Analytics', whose beacon the edge injects into every HTML response
 *   (automatic setup). Cloudflare's CSP FAQ (developers.cloudflare.com/web-analytics/faq/) asks for the beacon in
 *   script-src and its reporting endpoint in connect-src. The beacon is served either at the exact
 *   /beacon.min.js or with a version segment (/beacon.min.js/v<hash>); a source without a trailing slash matches only
 *   its exact path, so script-src names both the exact file and the "beacon.min.js/" path prefix. The beacon reports
 *   to this site's own /cdn-cgi/rum ('self') or, when it is not same-origin, to https://cloudflareinsights.com, so
 *   connect-src names that origin too. No tag manager, no third-party fonts, no embeds.
 * - No style-src-attr: there are no style="" attributes and no inline <style>.
 * - form-action 'none' and base-uri 'none': there are no forms and no <base> element.
 */
export const ANALYTICS_BEACON_SRC =
	"https://static.cloudflareinsights.com/beacon.min.js/";
/** The exact beacon file, for the unversioned URL. */
export const ANALYTICS_BEACON_FILE =
	"https://static.cloudflareinsights.com/beacon.min.js";
/** Where the beacon posts its reports when they are not same-origin. */
export const ANALYTICS_REPORT_ORIGIN = "https://cloudflareinsights.com";

export function renderHeaders(inlineScriptHashes = [THEME_SCRIPT_HASH]) {
	const scriptSrc = [
		"'self'",
		ANALYTICS_BEACON_FILE,
		ANALYTICS_BEACON_SRC,
		...inlineScriptHashes.map((h) => `'${h}'`),
	].join(" ");
	const connectSrc = ["'self'", ANALYTICS_REPORT_ORIGIN].join(" ");
	return `# Cloudflare Workers Static Assets custom headers (not served as an asset).
# Never set the same header in two overlapping rules: Workers joins the values of every matching rule with ", ",
# so a second Cache-Control would produce a contradictory header. HTML keeps the platform default
# "Cache-Control: public, max-age=0, must-revalidate".
#
# CSP notes:
# - script-src hash = the single-line theme bootstrap (THEME_SCRIPT in src/blog/shell.mjs, the only inline script);
#   tests recompute it from the rendered pages.
# - The only other origins are Cloudflare Web Analytics' (automatic setup, the edge injects the beacon). script-src
#   names the exact /beacon.min.js and its "beacon.min.js/" path prefix (versioned URL /beacon.min.js/v<hash>);
#   connect-src names https://cloudflareinsights.com, where the beacon reports when not to this site's /cdn-cgi/rum.
# - No style-src-attr: there are no style="" attributes and no inline <style>.
# - form-action 'none' and base-uri 'none': there are no forms and no <base> element.
/*
  Content-Security-Policy: default-src 'self'; script-src ${scriptSrc}; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src ${connectSrc}; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Cross-Origin-Opener-Policy: same-origin
  X-Frame-Options: DENY

# Vite content-hashed output (scripts, stylesheets, the fonts).
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# The release feed the app reads: no-store
/announcements.json
  Cache-Control: no-store
`;
}
