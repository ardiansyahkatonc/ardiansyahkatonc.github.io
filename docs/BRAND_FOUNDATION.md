# kat.on — Brand Foundation

**Phase 6.1 — Infrastructure.** This document describes the permanent Brand
Foundation that every current and future page consumes. It is infrastructure:
centralized configuration, design tokens, a single logo system, and a bilingual
architecture. It intentionally does **not** change the site's appearance.

> Golden rule: **no hardcoded brand text, colors, spacing, navigation, or
> metadata in components.** Read from `src/config/*` and the design tokens.

---

## Folder Structure

```
src/
├── config/
│   ├── index.ts        # Barrel — single import surface for all config
│   ├── brand.ts        # BRAND: name, tagline, description, contact, social…
│   ├── theme.ts        # THEME: design tokens (TS mirror of CSS variables)
│   ├── navigation.ts   # NAVIGATION: single source for header/mobile nav + CTA
│   ├── languages.ts    # LANGUAGES: bilingual infrastructure (id default, en)
│   ├── seo.ts          # SEO + buildPageMeta(): centralized metadata
│   ├── site.ts         # Site URL + SEO headline (derives from BRAND)
│   ├── social.ts       # Legacy social map (derives from BRAND.social)
│   ├── metadata.ts     # Legacy metadata shim (derives from SEO)
│   ├── products.ts     # Product catalog
│   └── journey.ts      # Timeline data
├── components/
│   └── common/
│       └── Logo.astro  # The one reusable brand mark (full / icon, dark / light)
├── styles/
│   ├── global.css      # CSS custom properties = canonical token values
│   └── typography.css   # Type scale + font tokens
public/
└── brand/
    ├── logo/           # Logo exports (SVG/PNG) for external use
    ├── favicon/        # Favicon set (canonical copies)
    └── social/         # OG / share images
```

---

## 1. Brand Config — `src/config/brand.ts`

The single source of truth for who kat.on is.

```ts
import { BRAND } from '../config/brand';

BRAND.name;         // "kat.on"
BRAND.shortName;    // "katon"
BRAND.tagline;      // "AI-Native Product Studio"
BRAND.description;  // meta / hero description
BRAND.country;      // "Indonesia"
BRAND.industry;     // "Artificial Intelligence · Public Sector Technology"
BRAND.positioning;  // product positioning statement
BRAND.author;       // "Ardiansyah Katon Cahyadi"
BRAND.launchYear;   // 2026
BRAND.contact.email;// "hello@kat.on"
BRAND.social;       // { github, linkedin, instagram, email }
```

A lowercase `brand` alias (`export const brand = BRAND`) is kept for backward
compatibility. Prefer `BRAND` in new code.

---

## 2. Theme Config — `src/config/theme.ts`

Design tokens exposed to TypeScript / `.astro` logic. The **canonical runtime
values** are the CSS custom properties in `src/styles/global.css`; `theme.ts`
references them by name so there is exactly one source of truth.

```ts
import { THEME } from '../config/theme';

THEME.colors.accent;        // "var(--color-accent)"
THEME.radius['2xl'];        // "var(--radius-2xl)"
THEME.shadow.lg;            // "var(--shadow-lg)"
THEME.spacing[24];          // "var(--space-24)"
THEME.motion.transitionDuration;
THEME.layout.containerWidth;// "1280px"
THEME.layout.sectionGap;
```

Groups: `colors`, `radius`, `shadow`, `spacing`, `typography`, `motion`,
`zIndex`, `layout`.

**No magic numbers in components** — use these tokens or the `var(--token)`
strings directly in CSS.

---

## 3. Navigation Config — `src/config/navigation.ts`

All site navigation is driven from one file. The logo links **Home**; desktop
pill nav, mobile drawer, and the primary CTA all map over the same arrays.

```ts
import { HOME_HREF, NAV_ITEMS, NAV_CTA, NAVIGATION } from '../config/navigation';
```

- `HOME_HREF` — where the logo points (`/`).
- `NAV_ITEMS` — `{ href, label: { id, en } }[]` (ARIA, Ekosistem/Ecosystem,
  Tentang/Story, Kontak/Contact).
- `NAV_CTA` — the "Coba ARIA / Launch ARIA" button.
- `navigation` — legacy flat `{ name, href }[]` alias, derived from `NAV_ITEMS`.

`Header.astro` renders both languages inline (`data-lang-id` / `data-lang-en`)
so the bilingual toggle works without a rebuild. **No duplicated nav arrays.**

---

## 4. Logo System — `src/components/common/Logo.astro`

The one reusable brand mark. No component should use raw `<img>` tags for the
logo.

```astro
<Logo />                     <!-- full wordmark, light theme (dark ink) -->
<Logo variant="icon" />      <!-- icon-only dot motif -->
<Logo theme="dark" />        <!-- light ink for dark backgrounds -->
<Logo size="lg" />           <!-- sm | md | lg -->
```

| Prop      | Values                 | Default  |
| --------- | ---------------------- | -------- |
| `variant` | `full` \| `icon`       | `full`   |
| `theme`   | `light` \| `dark`      | `light`  |
| `size`    | `sm` \| `md` \| `lg`   | `md`     |
| `class`   | extra class names      | `''`     |

The accent dot uses `var(--color-accent)`; ink adapts to the surface
(`--color-primary` on light, `--color-surface` on dark). The legacy
`src/components/ui/Logo.astro` is now a thin deprecated shim that delegates
here.

---

## 5. SEO Foundation — `src/config/seo.ts`

Centralized title / description / OpenGraph / Twitter / canonical, derived from
`BRAND`. Pages inherit automatically via `BaseLayout`.

```ts
import { buildPageMeta } from '../config/seo';

const meta = buildPageMeta({
  title,               // optional per-page override
  description,          // optional
  image,               // optional share image
  pathname: Astro.url.pathname,
});
// → { pageTitle, description, canonical, ogImage, ogType, ogLocale, siteName, twitterHandle, author }
```

Inner pages get a `Title | kat.on` suffix automatically; the homepage title is
used verbatim. `BaseLayout.astro` is the only consumer — new pages just set
`title` / `description` props and inherit the rest.

---

## 6. Bilingual Architecture — `src/config/languages.ts`

Infrastructure only for this sprint (no new translation content).

```ts
import { LANGUAGES, DEFAULT_LANG, LANGUAGE_MAP } from '../config/languages';

DEFAULT_LANG;                 // 'id'
LANGUAGES;                    // [{ code:'id', … }, { code:'en', … }]
LANGUAGE_MAP.id.locale;       // 'id_ID'
```

- **Default language: `id`** (Bahasa Indonesia). Secondary: `en`.
- Full localized routing (`/id`, `/en`) ships now — see
  [IDENTITY_SYSTEM.md](./IDENTITY_SYSTEM.md) §5. Strings live in
  `src/i18n/id.json` / `en.json`, consumed via `useTranslations(lang)`.
- Per-language `<html lang>`, canonical, and `hreflang` follow the active route.

---

## 7. Design Tokens (canonical values)

CSS custom properties in `src/styles/global.css` / `typography.css` remain the
runtime source of truth: colors, spacing scale, radius, shadow, borders,
motion, and a z-index scale. `theme.ts` mirrors them for code. When adding a
token, add the CSS variable **and** the `theme.ts` reference.

---

## Consuming the foundation

Import individually, or use the barrel:

```ts
import { BRAND, THEME, NAVIGATION, SEO, LANGUAGES } from '../config';
```

---

## Remaining technical debt

- **Footer navigation** still hardcodes its Products/Company/Resources columns
  (a sitemap, distinct from the primary nav). Consider a `FOOTER_NAV` config in
  a later sprint.
- **Favicon reference** in `BaseLayout` points at `/favicon.svg` (public root);
  the canonical copies now live in `public/brand/favicon/`. Migrate the
  reference when convenient.
- **`og-image.jpg`** is referenced by SEO defaults but not yet present in
  `public/brand/social/` — add the 1200×630 share image.
- **Legacy shims** (`site.ts`, `social.ts`, `metadata.ts`, `ui/Logo.astro`)
  are kept for compatibility and can be removed once all imports migrate to
  `BRAND` / `SEO` / `common/Logo`.
- **Full i18n** (localized routes, translated metadata) is intentionally
  deferred — only the architecture is in place.
