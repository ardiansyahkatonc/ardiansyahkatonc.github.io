# KAT.ON ENGINEERING STANDARD (KES) — v1.0

**Level:** L1 Foundation
**Applies to:** the kat.on website (static Astro site on GitHub Pages), which is
the **reference implementation** for future kat.on products.
**Status:** Active · established RC1-A08 (2026-07-11).

> Scope note. KES v1.0 documents only the **L1 Foundation** and only standards
> that are relevant to a **static Astro website deployed on GitHub Pages**.
> Enterprise practices are intentionally excluded (see [DevSecOps](#6-devsecops-standard)).
> Where a listed standard is not technically applicable to this stack it is
> marked **N/A (deferred)** with the condition under which it becomes applicable.

### Related documents
- [`VISUAL_STANDARD.md`](../../VISUAL_STANDARD.md) — visual system (exists)
- [`docs/BRAND_FOUNDATION.md`](../BRAND_FOUNDATION.md) — brand/theme/nav/SEO config
- [`docs/IDENTITY_SYSTEM.md`](../IDENTITY_SYSTEM.md) — logo, theme, i18n system
- `DEVELOPMENT_STANDARD.md`, `BRAND_GUIDELINE.md` — **not yet written** (future item)
- Deploying-applications workflow — GitHub Pages via Actions (`.github/workflows/deploy.yml`)

---

## 1. Website Standard

### Folder structure
The canonical layout (do not reorganize without updating this section):

```
kat.on/
├── .github/workflows/deploy.yml   # CI: build + deploy to GitHub Pages
├── public/                        # served as-is at site root
│   ├── brand/{katon,aria,shared}/{logo,favicon,social}/
│   ├── favicon.ico
│   ├── manifest.webmanifest
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── common/                # Logo, ThemeSwitcher, LanguageSwitcher, providers
│   │   ├── layout/                # Header, Footer
│   │   ├── sections/              # page sections (Hero, Problem, …)
│   │   └── ui/                    # primitives (Card, Container, Section, Badge, mockup/)
│   ├── config/                    # brand, theme, navigation, languages, seo, site, …
│   ├── i18n/                      # id.json, en.json, index.ts
│   ├── layouts/                   # BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro            # language gateway (/ → /id or /en)
│   │   ├── [lang]/                # localized routes (/id/*, /en/*)
│   │   ├── 404.astro
│   │   └── sitemap.xml.ts
│   ├── scripts/                   # theme.ts (client runtime)
│   └── styles/                    # global.css, typography.css, layout.css
├── docs/                          # architecture + engineering docs
├── astro.config.mjs               # site, i18n config
└── tsconfig.json                  # extends astro/tsconfigs/strict
```

**Rule:** feature code lives under `src/`; the repo root holds only config,
docs, and metadata. No build output (`dist/`) or `node_modules/` is committed.

### SEO
Every public page **must** ship (all centralized in `config/seo.ts` +
`BaseLayout.astro`):
- Unique `<title>` and `<meta name="description">` per page **and per language**.
- `<link rel="canonical">` pointing at the localized URL.
- `hreflang` alternates for `id`, `en`, and `x-default`.
- OpenGraph (`og:*`) and Twitter (`twitter:*`) tags.
- JSON-LD structured data (`Organization` + `WebSite`).
- `sitemap.xml` (localized URLs with `xhtml:link` alternates) and `robots.txt`
  referencing it.
- The `/` gateway is `noindex, follow`; real pages are indexable.

### Accessibility (target: WCAG 2.1 AA)
- Exactly **one `<h1>` per page**; no skipped heading levels.
- Landmarks: `<header> <main> <footer> <nav>`; a skip link to `#main-content`.
- Visible focus ring on all interactive elements (`:focus-visible`, accent ring).
- All `<img>` have `alt` (decorative images use `alt=""` + `aria-hidden`).
- Text contrast meets AA (muted text tokens tuned to ≥4.5:1 on their surface).
- `prefers-reduced-motion: reduce` disables anim/transition + scroll-reveal.
- Correct `<html lang>` per route; ARIA labels on icon-only controls.

### Responsive
- Breakpoints: mobile ≤640, tablet 641–1024, laptop/desktop ≥1024.
- **No horizontal overflow** at any width; no clipped content; no layout shift.
- Verified at 375 (mobile), 768 (tablet), 1280+ (desktop).

### Metadata
- `<html lang>` + `data-lang` set from the route.
- `theme-color` provided for light and dark via `media`.
- Favicon / apple-touch / manifest use the **official** kat.on logo.

### Performance
- Static output; no SSR runtime; assets cached by GitHub Pages CDN.
- Fonts via non-blocking `<link>` (never CSS `@import`) with `display=swap`.
- Images `loading="lazy"` (except above-the-fold), `decoding="async"`.
- Minimal client JS: theme engine + IntersectionObserver reveal only.
- No render-blocking third-party scripts; no analytics by default.

---

## 2. Frontend Standard

### Astro components
- `.astro` components with a typed `interface Props`; frontmatter for logic,
  template for markup, single scoped `<style>` block per component.
- Components are **presentational + pure** — no data fetching, no side effects
  beyond small `is:inline` bootstraps (theme/no-flash).
- One component = one responsibility. Sections compose primitives.

### CSS
- **Scoped component styles** by default (Astro auto-scoping).
- Global styles limited to reset, tokens, base elements, and utilities in
  `src/styles/`.
- **Never** use `:global(:root[data-theme='dark']) .x` descendant selectors —
  Astro compiles them into a buggy unconditional rule. Use a **theme token**
  (e.g. `--logo-filter`) overridden in the dark block instead.
- No inline hardcoded colors/spacing in components — reference tokens.

### Design tokens
- **Single source of truth:** CSS custom properties in
  `src/styles/global.css` (color, spacing, radius, shadow, motion, z-index,
  chrome surfaces) + `typography.css` (font, scale, weights).
- `src/config/theme.ts` mirrors the tokens for TS/`.astro` logic.
- Dark theme = a token **override block** `:root[data-theme='dark']` — values
  only, no structural CSS. Adding a token means adding it in **both** the CSS
  and `theme.ts`.

### Naming
- Files: `PascalCase.astro` for components, `kebab-case` for routes/assets,
  `camelCase` for TS modules.
- CSS classes: `kebab-case`, component-prefixed (`.hero-*`, `.footer-*`).
- Tokens: `--category-name` (`--color-accent`, `--space-24`, `--radius-2xl`).
- Translation keys: `dot.namespaced` (`hero.headline`, `footer.copyright`).

### Reusable components
- Primitives live in `src/components/ui/`; the brand mark is **only** rendered
  via `common/Logo.astro` (no raw `<img>` logos or hardcoded logo paths).
- Chrome (Header/Footer/Theme/Language switchers) is centralized in
  `common/` + `layout/` and consumed by every page through `BaseLayout`.

---

## 3. Backend Standard

**Current status: static website — no backend.** All pages are pre-rendered at
build time; there is no server, database, or API.

**Future compatibility only** (not implemented in L1):
- If dynamic capability is later required, prefer isolated serverless functions
  or an external API consumed at build time (Astro content/endpoints) over a
  stateful server, to preserve the static-first deployment.
- Any backend must keep secrets server-side (never in the client bundle) and
  expose typed, versioned contracts.
- Introducing a backend triggers a **KES level review** (L2) — out of scope here.

---

## 4. AI Engineering Standard

**Current scope: AI-assisted development workflow only.** No AI runtime,
model, agent, or inference is embedded in the product.

- Approved assistants for development: **ChatGPT**, **Claude Code**,
  **Gemini CLI**.
- AI-generated changes follow the same [Git](#7-git-standard) and
  [Testing](#8-testing-standard) standards as human changes — review the diff,
  run the build, verify before merge.
- Commits co-authored by an AI assistant include a `Co-Authored-By:` trailer.
- No additional AI architecture (RAG, agents, prompt pipelines, vector stores)
  is in scope for the website. (ARIA the product is separate and out of scope.)

---

## 5. Design System Standard

The design system is the shared foundation across kat.on products.

- **Brand tokens** — `config/brand.ts` (name, positioning, contact, social);
  never hardcode brand text.
- **Logo** — official emblem via `common/Logo.astro`; theme-adaptive through
  `--logo-filter`; used in header/footer/favicon/apple-touch/OG/manifest.
- **Typography** — Inter; scale + weights in `typography.css` (`--text-*`,
  `--weight-*`).
- **Spacing** — 4px-based scale `--space-*`; no magic numbers.
- **Components** — tokenized primitives; consistent radius/shadow/motion.
- **Dark / Light mode** — CSS-variable theming; light = `:root`, dark = override
  block; `system` follows `prefers-color-scheme`; no-flash bootstrap.
- **Bilingual** — every string localized (`id`/`en`); one language rendered per
  page; no mixed language.

Details: [`BRAND_FOUNDATION.md`](../BRAND_FOUNDATION.md),
[`IDENTITY_SYSTEM.md`](../IDENTITY_SYSTEM.md), [`VISUAL_STANDARD.md`](../../VISUAL_STANDARD.md).

---

## 6. DevSecOps Standard

Only items applicable to a static site on GitHub Pages.

| Item | Status | Notes |
| --- | --- | --- |
| **GitHub Pages** | ✅ Applied | Deploy via `deploy.yml` (Actions → Pages). |
| **HTTPS** | ✅ Applied | Enforced by GitHub Pages (`*.github.io`). |
| **No secrets** | ✅ Applied | No secrets in repo/bundle; `.claude/settings.local.json` git-ignored; deploy uses the built-in `GITHUB_TOKEN`. |
| **Branch protection** | ⚠️ Recommended | Protect `main`: require the deploy workflow to pass; restrict force-push. *(Repo setting — document, apply in GitHub UI.)* |
| **Dependabot** | ⚠️ Recommended | Add `.github/dependabot.yml` for `npm` + `github-actions` weekly updates. *(Not created in this doc-only sprint.)* |

**Explicitly OUT of scope (over-engineering for this stack):** container
scanning, SAST, DAST, SBOM, Zero Trust. Do not introduce these at L1.

---

## 7. Documentation Standard

| Doc | Status | Purpose |
| --- | --- | --- |
| **README** | ✅ Exists | Project overview, run/build/deploy. |
| **CHANGELOG** | ⚠️ Recommended | `CHANGELOG.md` (Keep a Changelog); entry per release tag. |
| **Sprint documentation** | ✅ Practiced | Each sprint's changes captured in commits + summaries; carry forward here. |
| **Architecture documentation** | ✅ Exists | `docs/BRAND_FOUNDATION.md`, `docs/IDENTITY_SYSTEM.md`, this KES. |
| **Brand documentation** | ✅ Exists | `VISUAL_STANDARD.md`, brand config, `public/brand/README.md`. |

Docs live in `docs/`; engineering standards in `docs/engineering/`.

---

## 8. Git Standard

### Branch naming
`main` is the default + production branch (Pages deploys from it). Feature work:
`feat/<slug>`, `fix/<slug>`, `chore/<slug>`, `docs/<slug>`.

### Commit convention (Conventional Commits)
`type(scope): summary` — `feat`, `fix`, `chore`, `docs`, `refactor`, `style`.
Imperative mood; body explains *why*; AI co-authorship via `Co-Authored-By:`.
Examples used in this repo:
```
feat(brand): official kat.on logo + broader positioning + real contact info
fix(rc): quality audit fixes — a11y contrast, font perf, no-JS resilience
chore(rc1): release candidate quality pass
docs(kes): establish KES v1.0 foundation
```

### Release tag
Semantic Versioning `vMAJOR.MINOR.PATCH`. First public release: **`v1.0.0`**
(recommended once the Quality Gate passes). Tag on `main`, matching the CHANGELOG.

### Repository structure
Single repo, single deployable site. See [Folder structure](#folder-structure).
No monorepo/workspaces at L1.

---

## 9. Testing Standard

No automated test suite at L1 (appropriate for a static marketing site). The
**required manual gate** before publishing:

| Test | How |
| --- | --- |
| **Build + typecheck** | `npm run build` (0 errors/0 warnings) and `npx astro check` (0 errors/0 warnings). |
| **Manual review** | Visual pass on every page, both languages, both themes. |
| **Responsive** | Mobile (375), tablet (768), desktop (1280+). |
| **Accessibility** | Keyboard nav, focus visibility, contrast, WAVE, headings/alt. |
| **Lighthouse** | Perf / A11y / Best-Practices / SEO (targets in the Quality Gate). |
| **Broken links** | No dead internal links; all internal links language-prefixed. |
| **Console errors** | Zero errors in the browser console on load + interaction. |

---

## 10. Deployment Standard

### Primary — GitHub Pages
Push to `main` → `deploy.yml` runs `npm install` → `npm run build` → uploads
`dist/` → deploys to Pages. HTTPS enforced. This is the production path.

### Alternative — Netlify (documented, not active)
Netlify (or Cloudflare Pages) is the recommended fallback **and** the path to
enable security headers (see Quality Gate). Build command `npm run build`,
publish dir `dist`. Enables `_headers`/`netlify.toml` for CSP/HSTS.

### Deployment checklist (run before every release)
1. `npm run build` → 0 errors / 0 warnings.
2. `npx astro check` → 0 errors / 0 warnings.
3. Quality Gate (§11) passes.
4. Commit with a Conventional Commit message; push to `main`.
5. Confirm the Actions run succeeds (`conclusion: success`).
6. Smoke-test the live URL (both languages, both themes) after CDN propagation.

### Rollback
Deploys are immutable commits. To roll back: `git revert <bad-commit>` (or
redeploy a previous good commit) and push to `main` — the workflow republishes.
Do not force-push `main`.

### Versioning
Semantic Versioning; tag releases (`vX.Y.Z`) and record them in the CHANGELOG.

---

## 11. Quality Gate

A website release **must** pass the following. Items marked *conditional* apply
only where technically possible on the current stack.

| Gate | Target | Applicability |
| --- | --- | --- |
| Lighthouse — Performance | ≥ 98 | ✅ Applicable (measure per release) |
| Lighthouse — Accessibility | ≥ 98 | ✅ Applicable |
| Lighthouse — Best Practices | ≥ 98 | ✅ Applicable |
| Lighthouse — SEO | ≥ 98 | ✅ Applicable |
| WAVE | 0 errors | ✅ Applicable |
| OpenGraph coverage | 100% | ✅ Applicable (og + twitter present) |
| No broken links | pass | ✅ Applicable |
| No console errors | pass | ✅ Applicable |
| Dark mode working | pass | ✅ Applicable |
| Light mode working | pass | ✅ Applicable |
| Bilingual complete | pass | ✅ Applicable |
| Mobile / Tablet / Desktop tested | pass | ✅ Applicable |
| **Mozilla Observatory** | A+ | ⚠️ **N/A on GitHub Pages** — requires custom security response headers (CSP, HSTS, X-Frame-Options…) which Pages cannot set. Becomes applicable on Netlify/Cloudflare (`_headers`). |
| **HeaderLab / securityheaders** | A | ⚠️ **N/A on GitHub Pages** — same reason. |

**Rule:** the two conditional gates are **deferred, not waived** — they must be
met if/when the site moves to a header-capable host. All non-conditional gates
are mandatory for every release.

---

## Applicable vs Deferred (summary)

**Applied now (L1):** folder structure, SEO (meta/canonical/hreflang/OG/JSON-LD/
sitemap/robots), WCAG-AA accessibility, responsive, performance (static/lazy/
non-blocking fonts/minimal JS), Astro component + CSS + token standards, naming,
reusable Logo/components, static "no backend" posture, AI-assisted workflow,
GitHub Pages + HTTPS + no-secrets, docs (README/architecture/brand), Git
(Conventional Commits/SemVer), manual testing gate, deployment checklist +
rollback, design system (tokens/logo/type/spacing/dark+light/bilingual).

**Recommended but not yet configured (doc-only sprint):** `main` branch
protection, `.github/dependabot.yml`, `CHANGELOG.md`, first `v1.0.0` tag.

**Deferred / N/A at L1:** backend standards (no backend), Mozilla Observatory
A+ and HeaderLab A (no custom headers on Pages), automated test suites, and all
excluded DevSecOps items (container scanning, SAST, DAST, SBOM, Zero Trust).

## Future review items (→ KES L2)
- Machine-measure Lighthouse each release and record scores.
- Move to a header-capable host (Netlify/Cloudflare) to unlock the security-
  header gates; add CSP/HSTS.
- Add `dependabot.yml`, branch protection, `CHANGELOG.md`, and tag `v1.0.0`.
- Optimize the official logo raster (231 KB) → lightweight/vector + light-on-dark
  variant.
- Author the referenced `DEVELOPMENT_STANDARD.md` and `BRAND_GUIDELINE.md`.
- Revisit KES when a backend, automated tests, or AI runtime is introduced.

---

*KES v1.0 — L1 Foundation. The kat.on website is its reference implementation.*
