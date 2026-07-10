// =============================================================================
// SEO FOUNDATION — Centralized, per-language metadata for localized routes
// -----------------------------------------------------------------------------
// Title / description / OpenGraph / Twitter / canonical + hreflang, resolved for
// the active language. Pages pass already-localized title/description (from the
// translation dictionary); this builds the absolute URLs + alternates.
// =============================================================================

import { BRAND } from './brand';
import { site } from './site';
import { LANGUAGE_MAP, type LangCode } from './languages';
import { stripLangPrefix, localizePath, getLocaleAlternates } from '../i18n';

export const SEO = {
  defaultTitle: `${BRAND.name} | ${BRAND.tagline}`,
  defaultDescription: BRAND.description,
  /** Default social share image (lives in /public/brand/katon/social). */
  defaultImage: '/brand/katon/social/og-image.svg',
  twitterHandle: '@kat_on',
  siteUrl: site.url,
  author: BRAND.author,
  openGraph: {
    type: 'website',
    siteName: BRAND.name,
  },
} as const;

export interface HreflangAlternate {
  hreflang: string;
  href: string;
}

export interface PageMetaInput {
  title?: string;
  description?: string;
  image?: string;
  /** `Astro.url.pathname` — includes the /id or /en prefix. */
  pathname: string;
  /** Active language. */
  lang: LangCode;
}

export interface PageMeta {
  lang: LangCode;
  pageTitle: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogType: string;
  ogLocale: string;
  siteName: string;
  twitterHandle: string;
  author: string;
  alternates: HreflangAlternate[];
}

function abs(path: string): string {
  return new URL(path, SEO.siteUrl).toString();
}

/**
 * Resolve final meta tags for a localized page. Builds absolute canonical +
 * og:url for the active language and hreflang alternates for every locale
 * (plus x-default → the default language).
 */
export function buildPageMeta({
  title,
  description,
  image = SEO.defaultImage,
  pathname,
  lang,
}: PageMetaInput): PageMeta {
  const bare = stripLangPrefix(pathname);

  const alternates: HreflangAlternate[] = [
    ...getLocaleAlternates(pathname).map((a) => ({ hreflang: a.lang, href: abs(a.path) })),
    { hreflang: 'x-default', href: abs(localizePath(bare, 'id')) },
  ];

  return {
    lang,
    pageTitle: title ?? SEO.defaultTitle,
    description: description ?? SEO.defaultDescription,
    canonical: abs(localizePath(bare, lang)),
    ogImage: abs(image),
    ogType: SEO.openGraph.type,
    ogLocale: LANGUAGE_MAP[lang].locale,
    siteName: SEO.openGraph.siteName,
    twitterHandle: SEO.twitterHandle,
    author: SEO.author,
    alternates,
  };
}
