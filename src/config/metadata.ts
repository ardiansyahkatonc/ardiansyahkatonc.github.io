import { SEO } from './seo';
import { DEFAULT_LANG, LANGUAGE_MAP } from './languages';

// Backward-compatible metadata shape. The canonical SEO source is `./seo.ts`;
// this shim keeps the legacy `metadata.seo.*` / `metadata.openGraph.*` API.
export const metadata = {
  seo: {
    defaultTitle: SEO.defaultTitle,
    defaultDescription: SEO.defaultDescription,
    defaultImage: SEO.defaultImage,
    twitterHandle: SEO.twitterHandle,
  },
  openGraph: {
    type: SEO.openGraph.type,
    locale: LANGUAGE_MAP[DEFAULT_LANG].locale,
  },
};
