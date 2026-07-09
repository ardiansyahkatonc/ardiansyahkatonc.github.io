// =============================================================================
// NAVIGATION CONFIGURATION — Single Source of Truth for site navigation
// -----------------------------------------------------------------------------
// The logo links Home. Desktop + mobile navigation and the primary CTA are all
// driven from this file. Do NOT duplicate navigation arrays inside components.
// Labels carry both `id` (default) and `en` values for the bilingual engine.
// =============================================================================

export interface NavItem {
  /** Bare route the link points to (localized at render time). */
  href: string;
  /** Translation key for the label (see src/i18n/*.json). */
  key: string;
  /** Bilingual label (fallback / legacy consumers). */
  label: { id: string; en: string };
}

/** Where the logo / home link points (bare path; localized at render time). */
export const HOME_HREF = '/';

/** Primary navigation items (desktop pill nav + mobile drawer). */
export const NAV_ITEMS: NavItem[] = [
  { href: '/aria', key: 'nav.aria', label: { id: 'ARIA', en: 'ARIA' } },
  { href: '/projects', key: 'nav.ecosystem', label: { id: 'Ekosistem', en: 'Ecosystem' } },
  { href: '/about', key: 'nav.story', label: { id: 'Cerita', en: 'Story' } },
  { href: '/contact', key: 'nav.contact', label: { id: 'Kontak', en: 'Contact' } },
];

/** Primary call-to-action shown in the header. */
export const NAV_CTA = {
  href: '/aria',
  key: 'cta.launch',
  label: { id: 'Coba ARIA', en: 'Launch ARIA' },
} as const;

/** Aggregate navigation object for a single grouped import. */
export const NAVIGATION = {
  home: HOME_HREF,
  items: NAV_ITEMS,
  cta: NAV_CTA,
} as const;

// -----------------------------------------------------------------------------
// Backward-compatibility alias.
// The legacy `navigation` array (flat `{ name, href }`) is still consumed by
// older components; derive it from NAV_ITEMS so there is only one source.
// -----------------------------------------------------------------------------
export const navigation = NAV_ITEMS.map((item) => ({
  name: item.label.en,
  href: item.href,
}));
