# kat.on — Identity System

**Sprint 6.15 — Infrastructure.** The permanent identity layer every current and
future page consumes: brand tokens, logo system, theme system, dark/light mode,
and the internationalization foundation. This sprint is architecture only — **no
visual redesign**. Light mode is byte-for-byte unchanged; dark mode and the
language architecture are new capabilities layered on top.

Builds on [BRAND_FOUNDATION.md](./BRAND_FOUNDATION.md).

> Golden rules: **no hardcoded logo paths, brand text, colors, or magic
> numbers.** Consume `src/config/*`, `<Logo />`, and the CSS variable tokens.

---

## Folder Structure

```
public/
├── favicon.svg / favicon.ico          # Root favicons (referenced by <head>)
├── manifest.webmanifest               # PWA manifest
└── brand/
    ├── logo/
    │   ├── logo-full-light.svg        # Wordmark for light backgrounds
    │   ├── logo-full-dark.svg         # Wordmark for dark backgrounds
    │   ├── logo-icon.svg              # Icon-only dot motif
    │   └── logo-monochrome.svg        # Single-color (currentColor)
    ├── favicon/
    │   ├── favicon.svg / favicon.ico
    │   └── apple-touch-icon.svg
    └── social/
        ├── og-image.svg               # 1200×630 (placeholder)
        ├── twitter-card.svg           # 1200×628 (placeholder)
        └── linkedin-banner.svg        # 1584×396 (placeholder)

src/
├── config/
│   ├── brand.ts       # BRAND — company, products, contact, social, website…
│   ├── theme.ts       # THEME — colors, spacing, radius, shadow, typography,
│   │                  #         motion, container, section
│   ├── navigation.ts  # Single-source nav + CTA
│   ├── languages.ts   # LANGUAGES, DEFAULT_LANG ('id')
│   ├── seo.ts         # SEO + buildPageMeta() — multilingual metadata
│   └── index.ts       # Barrel
├── i18n/
│   ├── id.json / en.json   # Translation dictionaries (generated)
│   ├── translations.ts     # Editing source of truth (seeds the JSON)
│   └── index.ts            # useTranslations(lang) build-time API
├── scripts/
│   ├── theme.ts       # Theme engine (light/dark/system + persistence)
│   └── i18n.ts        # Runtime language toggle (span-level)
├── components/common/
│   ├── Logo.astro            # The one reusable brand mark
│   ├── ThemeProvider.astro   # No-flash theme bootstrap (<head>)
│   └── LanguageProvider.astro# No-flash language bootstrap + detection (<head>)
└── styles/global.css  # CSS variable tokens: light :root + [data-theme='dark']
```

---

## 1. Logo System

The brand mark is rendered **inline as SVG** by a single component, so it adapts
to dark/light mode automatically via CSS variables. Static exports live in
`public/brand/logo/` for external use (email, share cards). **No component may
reference a logo image path or use `<img>` for the logo.**

```astro
import Logo from '../components/common/Logo.astro';

<Logo />                    <!-- full wordmark, auto-adapts to theme -->
<Logo variant="light" />    <!-- forced dark ink (for light backgrounds) -->
<Logo variant="dark" />     <!-- forced light ink (for dark backgrounds) -->
<Logo variant="icon" />     <!-- icon-only dot motif -->
<Logo variant="monochrome" /><!-- single color, inherits currentColor -->
<Logo size="lg" />          <!-- sm | md | lg -->
```

| Prop      | Values                                          | Default |
| --------- | ----------------------------------------------- | ------- |
| `variant` | `full` `light` `dark` `icon` `monochrome`       | `full`  |
| `size`    | `sm` `md` `lg`                                  | `md`    |
| `class`   | extra class names                               | `''`    |

The default `full` variant uses `--color-text-primary` / `--color-accent`, so it
inverts correctly in dark mode with zero extra markup.

---

## 2. Brand Tokens — `src/config/brand.ts`

Single source of truth for company facts.

```ts
import { BRAND } from '../config/brand';

BRAND.name; BRAND.shortName; BRAND.tagline; BRAND.description;
BRAND.country; BRAND.industry; BRAND.positioning; BRAND.author;
BRAND.launchYear; BRAND.website;
BRAND.products;            // [{ id, name, status }]
BRAND.contact.email;
BRAND.social;              // { github, linkedin, instagram, email }
```

---

## 3. Theme Tokens — `src/config/theme.ts`

TypeScript mirror of the CSS variables (canonical values in `global.css`).

```ts
import { THEME } from '../config/theme';

THEME.colors.accent;           // "var(--color-accent)"
THEME.spacing[24];             // "var(--space-24)"
THEME.radius['2xl'];
THEME.shadow.lg;
THEME.typography.size.display;
THEME.motion.transitionDuration;
THEME.container.xl;            // "1280px"
THEME.section.gap;             // "var(--space-96)"
```

Groups: `colors`, `spacing`, `radius`, `shadow`, `typography`, `motion`,
`zIndex`, `container`, `section`, `layout`. **No magic values in components.**

---

## 4. Dark Mode

Pure CSS-variable theming — **no duplicated styles, no structural changes.**

- **Light** is the default `:root`. **Dark** is a token-override block
  `:root[data-theme='dark']` in `global.css`. Only variable values change.
- `ThemeProvider.astro` runs an inline `<script>` in `<head>` that resolves the
  stored preference (or system) and stamps `data-theme` **before first paint**
  (no flash).
- `src/scripts/theme.ts` is the engine: `initTheme()`, `cycleTheme()`,
  `setThemePref()`. Preference is persisted in `localStorage['katon-theme']`.
- The header switch (`#theme-toggle`) cycles **☀ light → 🌙 dark → 💻 system**
  and follows `prefers-color-scheme` while in system mode.

To make a component dark-aware, use color tokens (never hardcoded hex). Chrome
surfaces that were previously hardcoded (header glass, nav pill) are now the
tokens `--surface-header-scrolled`, `--surface-nav-pill`, `--surface-nav-active`,
`--surface-nav-hover`.

---

## 5. Language System (Internationalization Foundation)

Architecture is prepared; **pages are not translated yet.**

- **Config:** `src/config/languages.ts` — `LANGUAGES` (`id`, `en`),
  `DEFAULT_LANG = 'id'`.
- **Dictionaries:** `src/i18n/id.json` + `en.json`. These are **generated** from
  `src/i18n/translations.ts` (the editing source of truth) — regenerate after
  editing translations (see below).
- **Build-time API:** `src/i18n/index.ts`

  ```ts
  import { useTranslations } from '../i18n';
  const t = useTranslations(Astro.currentLocale ?? 'id');
  <h1>{t('hero.headline')}</h1>   // falls back to id, then the raw key
  ```

- **Astro i18n routing:** configured in `astro.config.mjs`
  (`defaultLocale: 'id'`, `locales: ['id','en']`,
  `routing.prefixDefaultLocale: false`). The default locale (`id`) stays at the
  site root so **existing routes are unchanged**; `/en/*` is reserved for future
  localized pages.
- **Providers / detection:** `LanguageProvider.astro` runs inline in `<head>`,
  detects the browser language on first visit, persists it
  (`localStorage['katon-lang']`), and stamps `<html lang / data-lang>` pre-paint.
- **Runtime toggle:** `src/scripts/i18n.ts` drives the header **ID / EN** switch
  and the `data-lang-id` / `data-lang-en` span visibility (no page reload).

### Regenerating the dictionaries

```bash
node --input-type=module -e '
import { readFileSync, writeFileSync } from "node:fs";
const src = readFileSync("src/i18n/translations.ts","utf8");
const b = src.slice(src.indexOf("{", src.indexOf("export const t = {")), src.indexOf("} satisfies")+1);
const t = eval("("+b+")"), id={}, en={};
for (const k of Object.keys(t)) { id[k]=t[k].id; en[k]=t[k].en; }
writeFileSync("src/i18n/id.json", JSON.stringify(id,null,2)+"\n");
writeFileSync("src/i18n/en.json", JSON.stringify(en,null,2)+"\n");
'
```

---

## 6. Metadata (multilingual)

`src/config/seo.ts` centralizes title / description / OG / Twitter / canonical,
derived from `BRAND` and **language-aware**:

```ts
const meta = buildPageMeta({ title, description, image, pathname, lang });
// → { pageTitle, description, canonical, ogImage, ogType, ogLocale,
//     siteName, twitterHandle, author, alternates }
```

- `META_BY_LANG` holds per-language title/description (currently identical to the
  default — swap in translated copy later without touching consumers).
- `ogLocale` follows the active language; `alternates` emits `hreflang` links for
  `id`, `en`, and `x-default`. `BaseLayout` renders them automatically.

---

## 7. Favicon / PWA

Linked from `BaseLayout` `<head>`:

- `favicon.svg` (primary) + `favicon.ico` (fallback)
- `apple-touch-icon.svg`
- `manifest.webmanifest` (name, colors, icons)
- `theme-color` meta with light/dark `media` variants

---

## 8. Social Assets

Branded **placeholders** in `public/brand/social/` — `og-image.svg`,
`twitter-card.svg`, `linkedin-banner.svg`. `SEO.defaultImage` points at
`og-image.svg`. Replace with final raster (PNG/JPG) art before launch.

---

## Usage cheatsheet

```ts
import { BRAND, THEME, NAVIGATION, SEO, LANGUAGES } from '../config';
import { useTranslations } from '../i18n';
import Logo from '../components/common/Logo.astro';
```

---

## Remaining Design Debt

- **Social images are SVG placeholders** — produce final 1200×630 / 1200×628 /
  1584×396 raster art. SVG OG images are not rendered by all platforms.
- **`apple-touch-icon` is SVG** — iOS prefers a 180×180 PNG; add a rasterized
  version.
- **Footer logo mark** is a legacy hardcoded SVG (white strokes on a
  `--color-primary` rect) that is low-contrast in dark mode. Migrate it to
  `<Logo variant="dark" />` / tokens in a later pass.
- **Page translation** (localized `/en` routes + translated metadata copy) is
  intentionally deferred — only the architecture is in place.
- **Per-component dark polish**: most UI uses tokens and adapts automatically;
  audit section-level components for any remaining hardcoded colors.
- **Legacy config shims** (`site.ts`, `social.ts`, `metadata.ts`,
  `ui/Logo.astro`) remain for compatibility and can be removed once all imports
  migrate.
```
