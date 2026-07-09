// =============================================================================
// i18n — translation + routing API (Astro-native, no third-party libraries)
// -----------------------------------------------------------------------------
// Language is determined by the URL prefix (/id, /en). Each page renders a
// single language — no mixed-language DOM. Dictionaries live in id.json/en.json.
//
//   const lang = getLangFromUrl(Astro.url);
//   const t = useTranslations(lang);
//   <h1>{t('hero.headline')}</h1>
//   <a href={localizePath('/aria', lang)}>…</a>
// =============================================================================
import id from './id.json';
import en from './en.json';
import { DEFAULT_LANG, LANGUAGES, type LangCode } from '../config/languages';

export const dictionaries = { id, en } as const;

/** All translation keys (id + en share the same key set). */
export type TranslationKey = keyof typeof id;

export function getDictionary(lang: LangCode): Record<string, string> {
  return (dictionaries[lang] ?? dictionaries[DEFAULT_LANG]) as Record<string, string>;
}

/**
 * Returns a translator bound to a language, with graceful fallback to the
 * default language and finally the raw key.
 */
export function useTranslations(lang: LangCode = DEFAULT_LANG) {
  const dict = getDictionary(lang);
  const fallback = getDictionary(DEFAULT_LANG);
  return function t(key: TranslationKey): string {
    return dict[key] ?? fallback[key] ?? String(key);
  };
}

const LANG_CODES = LANGUAGES.map((l) => l.code);

/** Resolve the active language from a URL / pathname (defaults to id). */
export function getLangFromUrl(input: URL | string): LangCode {
  const pathname = typeof input === 'string' ? input : input.pathname;
  const seg = pathname.split('/').filter(Boolean)[0];
  return (LANG_CODES as string[]).includes(seg) ? (seg as LangCode) : DEFAULT_LANG;
}

/** Remove a leading /id or /en prefix, returning the bare path (with leading /). */
export function stripLangPrefix(path: string): string {
  const m = path.match(/^\/(id|en)(\/.*)?$/);
  if (m) return m[2] && m[2] !== '' ? m[2] : '/';
  return path.startsWith('/') ? path : `/${path}`;
}

/** Prefix a bare path with a language, e.g. localizePath('/aria','en') → '/en/aria'. */
export function localizePath(path: string, lang: LangCode): string {
  const clean = stripLangPrefix(path);
  return clean === '/' ? `/${lang}` : `/${lang}${clean}`;
}

/** hreflang alternates for the current bare path across every language. */
export function getLocaleAlternates(pathname: string): { lang: LangCode; path: string }[] {
  const clean = stripLangPrefix(pathname);
  return LANGUAGES.map((l) => ({ lang: l.code, path: localizePath(clean, l.code) }));
}

export { DEFAULT_LANG, LANGUAGES };
export type { LangCode };
