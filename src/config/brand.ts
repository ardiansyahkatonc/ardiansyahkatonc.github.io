// =============================================================================
// BRAND CONFIGURATION — Single Source of Truth for kat.on
// -----------------------------------------------------------------------------
// Every page and component MUST consume this object instead of hardcoding brand
// text (name, tagline, email, social URLs, etc.). Update brand facts here only.
// =============================================================================

export const BRAND = {
  /** Full company / product name as displayed everywhere. */
  name: 'kat.on',
  /** Compact identifier for tight spaces, filenames, and handles. */
  shortName: 'katon',
  /** One-line positioning line shown under the logo and in the footer. */
  tagline: 'AI-Native Product Studio',
  /** Longer marketing description used for meta tags and hero copy. */
  description:
    'Helping public sector organizations simplify complex work through AI, automation, and context engineering.',
  /** Primary market. */
  country: 'Indonesia',
  /** Sector we operate in. */
  industry: 'Artificial Intelligence · Public Sector Technology',
  /** Sharp product positioning statement. */
  positioning: "The AI Executive Assistant for Indonesia's Public Sector.",
  /** Person / entity behind the studio. */
  author: 'Ardiansyah Katon Cahyadi',
  /** Year the studio / flagship product launched. */
  launchYear: 2026,
  /** Canonical marketing website. */
  website: 'https://ardiansyahkatonc.github.io',

  /** Flagship + ecosystem products (names only; full catalog in products.ts). */
  products: [
    { id: 'aria', name: 'ARIA', status: 'flagship' },
    { id: 'katon-command-center', name: 'KATON Command Center', status: 'active' },
  ],

  /** Public-facing contact + social presence. */
  contact: {
    email: 'hello@kat.on',
  },
  social: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    email: 'mailto:hello@kat.on',
  },
} as const;

export type Brand = typeof BRAND;

// -----------------------------------------------------------------------------
// Backward-compatibility alias.
// Existing components import the lowercase `brand`; keep it pointing at BRAND so
// no consumer breaks during migration. Prefer `BRAND` in new code.
// -----------------------------------------------------------------------------
export const brand = BRAND;
