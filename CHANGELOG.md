# Changelog

All notable changes to the kat.on website are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/); versioning follows [SemVer](https://semver.org/).

## [1.0.0] — 2026-07-11

First public release. kat.on — an AI-native product studio — and the launch platform for its flagship product, **ARIA**.

### Added
- **Bilingual platform** — localized `/id` and `/en` routing with a `/` language gateway (preference + browser detection), an accessible language switcher that preserves the current page, and per-language SEO (title, description, canonical, `hreflang` id/en/x-default, OpenGraph, Twitter, JSON-LD).
- **Theme system** — Light / Dark / System with a no-flash bootstrap, an accessible ☀/🌙/💻 switcher, and full token-based dark mode.
- **Homepage** — Hero with a realistic ARIA *Executive Briefing* dashboard (HTML/CSS), Problem, ARIA Spotlight, **Executive Workflow** (Meeting → AI Analysis → Minutes → Google Docs → Approval), Features, Ecosystem, Engineering Trust, Story timeline, and CTA.
- **ARIA product page** — premium showcase: Executive Dashboard, How ARIA Works, Government Workflow, Use Cases, Metrics, Architecture, and a premium CTA.
- **Brand system** — official kat.on and ARIA logos used everywhere (header, footer, favicon, apple-touch, OpenGraph, manifest); centralized design tokens; official contact channels (WhatsApp, GitHub, LinkedIn, Instagram).
- **Documentation** — `docs/BRAND_FOUNDATION.md`, `docs/IDENTITY_SYSTEM.md`, and the KAT.ON Engineering Standard `docs/engineering/KES_v1.0.md`.

### Engineering
- Static Astro site deployed to GitHub Pages over HTTPS via GitHub Actions.
- WCAG-AA accessibility (skip link, landmarks, focus ring, AA contrast, reduced-motion), responsive (mobile/tablet/desktop), non-blocking fonts, minimal JavaScript, complete SEO + structured data.
- Build passes with **0 errors / 0 warnings**; no broken links; no console errors.

### Known limitations
- Lighthouse ≥98 not yet machine-certified (run PageSpeed Insights on the live URL to confirm).
- Security-header grades (Mozilla Observatory / HeaderLab) are N/A on GitHub Pages (no custom response headers).
- Official logo is a 231 KB embedded-PNG SVG — an optimized/vector export is recommended.

[1.0.0]: https://github.com/ardiansyahkatonc/ardiansyahkatonc.github.io/releases/tag/v1.0.0
