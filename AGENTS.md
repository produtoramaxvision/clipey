# Clipey (public repository)

Public home for **documentation, release notes, and installers** for Clipey (Windows screen recorder and video studio with AI-assisted editing). Application source is maintained in a private MaxVision repository; this repo holds user-facing docs and the marketing site.

## Layout

| Area | Path |
|------|------|
| User docs | `docs/` (`INICIO-RAPIDO.md`, `FAQ.md`, `docs/releases/`) |
| Legal & support | Root: `PRIVACY.md`, `SECURITY.md`, `SUPPORT.md`, `THIRD_PARTY_NOTICES.md`, `CHANGELOG.md` |
| Marketing site | `site/` (Vite MPA, Vitest, Playwright gate, Cloudflare Worker) |
| Issue templates | `.github/ISSUE_TEMPLATE/` (no GitHub Actions workflows in this repo) |

## Site stack (`site/`)

From `site/package.json`: **Vite** 8.2.1, **Vitest** 4.1.11, **Playwright** 1.63.0, **Wrangler** 4.145.0. Package manager: **npm** (`site/package-lock.json`). Site config: `site/vite.config.js`, deploy worker: `site/wrangler.jsonc` (assets from `site/dist`, worker entry `site/src/worker.mjs`).

No `engines` field, `.nvmrc`, or Dockerfile in this repo; use a current Node.js LTS compatible with those dependencies.

## Commands (run from `site/`)

Install dependencies once:

```bash
cd site && npm ci
```

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `cd site && npm run dev` | Vite dev server |
| `build` | `cd site && npm run build` | Production build to `site/dist/` |
| `preview` | `cd site && npm run preview` | Serve built `dist/` locally |
| `test` | `cd site && npm run test` | Vitest (`site/tests/`) |
| `gate` | `cd site && npm run gate` | `vite build` then browser checks in `site/scripts/gate.mjs` (Playwright + preview) |
| `images` | `cd site && npm run images` | Blog cover images (`site/scripts/blog-images/covers.mjs`) |
| `shots` | `cd site && npm run shots` | Product shots (`site/scripts/shots/build-shots.mjs`) |
| `deploy` | `cd site && npm run deploy` | **Publishes** to Cloudflare (`vite build && wrangler deploy`); do not run unless you intend to deploy |

**Before opening a PR that touches `site/`:** run `cd site && npm run gate` (and `npm run test` when you change logic covered by tests).

## Git

- Base branch and PR target: **`main`**.

## Conventions

- No ESLint, Prettier, or EditorConfig files in this repository; match existing style in the files you edit (tabs in `site/package.json` and much of `site/`).
- Site build can warn on incomplete blog translations or missing capture manifest entries; strict image checks use env `CLIPEY_STRICT_IMAGES=1` (see `site/vite.config.js`).
- Do not commit `site/dist/`, `site/node_modules/`, `site/.wrangler/`, secrets, or `.env*` (see `site/.gitignore`). `.env.example` may exist for documentation only.

## Security and support (contributors)

- **Vulnerabilities:** do not open a public issue. Follow `SECURITY.md` (email **security@clipey.com.br** or GitHub private advisory).
- **Questions and bugs:** use GitHub issues with the templates linked from `SUPPORT.md`; review diagnostics before attaching (may contain personal data).

## Scope

Changes outside your task (unrelated app behavior, drive-by refactors) are out of scope unless agreed with maintainers. Installers and release assets live under GitHub Releases, not in day-to-day site development.
