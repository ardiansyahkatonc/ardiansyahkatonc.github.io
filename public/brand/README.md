# Brand Assets

Centralized home for all brand assets, organized per brand. Served from the site
root, e.g. `public/brand/aria/logo/aria-full.svg` → `/brand/aria/logo/aria-full.svg`.

## Structure

```
public/brand/
├── katon/                 # kat.on (the studio) brand
│   ├── logo/
│   │   ├── katon-full.svg          # OFFICIAL mark (raster export; for social/favicon)
│   │   ├── katon-wordmark-light.svg # inline wordmark export — light bg
│   │   ├── katon-wordmark-dark.svg  # inline wordmark export — dark bg
│   │   ├── katon-icon.svg           # dot-motif icon
│   │   └── katon-monochrome.svg     # single-color (currentColor)
│   ├── favicon/           # favicon.svg, favicon.ico, apple-touch-icon.svg
│   └── social/            # og-image.svg, twitter-card.svg, linkedin-banner.svg
│
├── aria/                  # ARIA (the flagship product) brand
│   ├── logo/
│   │   └── aria-full.svg           # OFFICIAL emblem (vector, self-contained dark canvas)
│   ├── favicon/           # TODO — export ARIA favicons
│   └── social/            # TODO — export ARIA social/OG art
│
└── shared/                # cross-brand assets (TODO)
```

## Rendering rule

**Never** reference these paths directly or use `<img>` in pages. The single
render path is [`src/components/common/Logo.astro`](../../src/components/common/Logo.astro):

```astro
<Logo />                 <!-- kat.on wordmark (inline, theme-adaptive) -->
<Logo brand="aria" />    <!-- official ARIA emblem -->
<Logo variant="light" /> <!-- kat.on, dark ink for light backgrounds -->
<Logo variant="icon" />  <!-- kat.on dot-motif icon -->
```

- The kat.on chrome mark is rendered **inline** (crisp at any size, adapts to
  dark/light via CSS variables). `katon-full.svg` is the heavy official raster
  export reserved for favicon / social / OG.
- The ARIA emblem is a self-contained vector rendered from its official file.

## TODO

- Derive `favicon.svg` / `favicon.ico` from the official kat.on mark on a
  brand-navy tile (current root favicons are a clean vector placeholder).
- Export dedicated ARIA `icon` / `light` / `dark` logo variants + ARIA
  favicon/social art.
- Replace social/OG placeholders with final raster (PNG/JPG) art.
