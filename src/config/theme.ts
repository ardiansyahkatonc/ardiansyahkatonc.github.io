// =============================================================================
// THEME CONFIGURATION — Design Tokens (TypeScript mirror of CSS variables)
// -----------------------------------------------------------------------------
// The canonical runtime values live as CSS custom properties in
// `src/styles/global.css` + `typography.css`. This file exposes those same
// tokens to `.astro` / `.ts` code so component logic can reference tokens by
// name instead of hardcoding magic numbers or hex colors.
//
// Rule: no hardcoded colors / spacing in components whenever possible — read
// from here (build-time) or use the `var(--token)` string (runtime).
// =============================================================================

/** Semantic color tokens → CSS custom property references. */
export const colors = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-text-secondary)',
  accent: 'var(--color-accent)',
  accentHover: 'var(--color-accent-hover)',
  background: 'var(--color-background)',
  surface: 'var(--color-surface)',
  surfaceMuted: 'var(--color-surface-muted)',
  border: 'var(--color-border)',
  text: 'var(--color-text-primary)',
  textSecondary: 'var(--color-text-secondary)',
  muted: 'var(--color-muted)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  danger: 'var(--color-danger)',
} as const;

/** Border radius scale. */
export const radius = {
  small: 'var(--radius-small)',
  medium: 'var(--radius-medium)',
  large: 'var(--radius-large)',
  xl: 'var(--radius-xl)',
  '2xl': 'var(--radius-2xl)',
  '3xl': 'var(--radius-3xl)',
  full: 'var(--radius-full)',
} as const;

/** Layered elevation / shadow scale. */
export const shadow = {
  xs: 'var(--shadow-xs)',
  sm: 'var(--shadow-sm)',
  md: 'var(--shadow-md)',
  lg: 'var(--shadow-lg)',
  xl: 'var(--shadow-xl)',
  accent: 'var(--shadow-accent)',
  glow: 'var(--shadow-glow)',
} as const;

/** Spacing scale (rem-based, keyed by pixel value). */
export const spacing = {
  0: 'var(--space-0)',
  4: 'var(--space-4)',
  8: 'var(--space-8)',
  12: 'var(--space-12)',
  16: 'var(--space-16)',
  24: 'var(--space-24)',
  32: 'var(--space-32)',
  48: 'var(--space-48)',
  64: 'var(--space-64)',
  80: 'var(--space-80)',
  96: 'var(--space-96)',
  128: 'var(--space-128)',
} as const;

/** Typography tokens. */
export const typography = {
  fontPrimary: 'var(--font-primary)',
  fontMono: 'var(--font-mono)',
  weight: {
    regular: 'var(--weight-regular)',
    medium: 'var(--weight-medium)',
    semibold: 'var(--weight-semibold)',
    bold: 'var(--weight-bold)',
  },
  size: {
    display: 'var(--text-display)',
    section: 'var(--text-section)',
    card: 'var(--text-card)',
    body: 'var(--text-body)',
    bodySm: 'var(--text-body-sm)',
    caption: 'var(--text-caption)',
    label: 'var(--text-label)',
  },
} as const;

/** Motion / transition durations + easings. */
export const motion = {
  instant: 'var(--motion-instant)',
  fast: 'var(--motion-fast)',
  normal: 'var(--motion-normal)',
  slow: 'var(--motion-slow)',
  spring: 'var(--motion-spring)',
  /** Default transition duration used across interactive elements. */
  transitionDuration: 'var(--motion-fast)',
} as const;

/** Z-index scale. */
export const zIndex = {
  base: 'var(--z-base)',
  raised: 'var(--z-raised)',
  dropdown: 'var(--z-dropdown)',
  sticky: 'var(--z-sticky)',
  overlay: 'var(--z-overlay)',
  modal: 'var(--z-modal)',
  toast: 'var(--z-toast)',
} as const;

/** Container widths (mirror of `.container-*` in layout.css). */
export const container = {
  sm: '640px',
  md: '800px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px',
  /** Default page container. */
  DEFAULT: '1280px',
} as const;

/** Section rhythm — vertical padding/gap between page sections. */
export const section = {
  gap: 'var(--space-96)',
  paddingY: 'var(--space-128)',
  paddingYCompact: 'var(--space-80)',
} as const;

/** Layout tokens — max container width and vertical rhythm between sections. */
export const layout = {
  /** Matches `.container-xl` in layout.css. */
  containerWidth: container.DEFAULT,
  /** Standard gap between page sections. */
  sectionGap: section.gap,
} as const;

/** Aggregate theme token object. Import this for a single grouped reference. */
export const THEME = {
  colors,
  radius,
  shadow,
  spacing,
  typography,
  motion,
  zIndex,
  container,
  section,
  layout,
} as const;

export type Theme = typeof THEME;
