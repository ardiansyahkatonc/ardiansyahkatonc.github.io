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
    'AI-native products for professionals, leaders, organizations, and public institutions.',
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
    { id: 'katon-command-center', name: 'kat.on Command Center', status: 'active' },
  ],

  /** Public-facing contact + social presence. */
  contact: {
    email: 'hello@kat.on',
    whatsapp: '6282329544431',
    whatsappDisplay: '+62 823-2954-4431',
  },
  social: {
    github: 'https://github.com/ardiansyahkatonc',
    linkedin: 'https://www.linkedin.com/in/ardiansyah-katon-cahyadi/',
    instagram: 'https://www.instagram.com/ardiansyahkatonc/',
    whatsapp: 'https://wa.me/6282329544431',
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
