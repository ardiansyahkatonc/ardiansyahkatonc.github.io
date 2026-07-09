# Brand Assets

Canonical home for kat.on brand assets. Served from the site root, e.g.
`public/brand/logo/logo.svg` → `https://<site>/brand/logo/logo.svg`.

## Structure

| Folder      | Contents                                                        |
| ----------- | --------------------------------------------------------------- |
| `logo/`     | Wordmark + icon exports (SVG preferred; PNG fallbacks).         |
| `favicon/`  | Favicon set (`favicon.svg`, `favicon.ico`, touch icons).        |
| `social/`   | OpenGraph / share images (`og-image.jpg`, 1200×630).            |

## Notes

- The primary brand mark is rendered in-code by
  [`src/components/common/Logo.astro`](../../src/components/common/Logo.astro) —
  these files are for external / raster use (email, share cards, app icons).
- The live favicon reference in `BaseLayout.astro` still points at
  `/favicon.svg` (repo root of `public/`). The copies here are the canonical
  source; update both when the mark changes, or migrate the reference in a
  later sprint.
