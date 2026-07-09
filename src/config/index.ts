// =============================================================================
// CONFIG BARREL — one import surface for the kat.on Brand Foundation
// -----------------------------------------------------------------------------
//   import { BRAND, THEME, NAVIGATION, SEO, LANGUAGES } from '../config';
// =============================================================================

export { BRAND, brand } from './brand';
export type { Brand } from './brand';

export {
  THEME,
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
} from './theme';
export type { Theme } from './theme';

export {
  NAVIGATION,
  NAV_ITEMS,
  NAV_CTA,
  HOME_HREF,
  navigation,
} from './navigation';
export type { NavItem } from './navigation';

export { LANGUAGES, DEFAULT_LANG, LANGUAGE_MAP } from './languages';
export type { Language, LangCode } from './languages';

export { SEO, buildPageMeta } from './seo';
export type { PageMeta, PageMetaInput } from './seo';

export { site } from './site';
export { social } from './social';
export { metadata } from './metadata';
export { products } from './products';
export { journey } from './journey';
