import { THEME_SCRIPT_HASH } from "./blog/shell.mjs";

/**
 * The Cloudflare Workers Static Assets `_headers` file.
 * Never set the same header in two overlapping rules: Workers joins the values of every matching rule with ", ",
 * so a second Cache-Control would produce a contradictory header. HTML keeps the platform default
 * "Cache-Control: public, max-age=0, must-revalidate".
 */
export function renderHeaders() {
	return `# Cloudflare Workers Static Assets custom headers (not served as an asset).
# Never set the same header in two overlapping rules: Workers joins the values of every matching rule with ", ",
# so a second Cache-Control would produce a contradictory header. HTML keeps the platform default
# "Cache-Control: public, max-age=0, must-revalidate".
#
# CSP notes:
# - script-src hash = the single-line theme bootstrap (THEME_SCRIPT in src/blog/shell.mjs, the only inline script);
#   tests/site.test.mjs recomputes it from the rendered pages.
# - The site loads nothing from another origin: no analytics, no tag manager, no third-party fonts, no embeds.
# - No style-src-attr: there are no style="" attributes and no inline <style>.
# - form-action 'none' and base-uri 'none': there are no forms and no <base> element.
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' '${THEME_SCRIPT_HASH}'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-Frame-Options: DENY

# Vite content-hashed output (scripts, stylesheets, the fonts).
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# The release feed the app reads: fresh within five minutes.
/announcements.json
  Cache-Control: public, max-age=300
`;
}
