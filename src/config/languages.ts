// =============================================================================
// LANGUAGE CONFIGURATION — Multilingual Infrastructure (preparation only)
// -----------------------------------------------------------------------------
// This prepares the bilingual architecture. It does NOT implement translation
// content — the runtime toggle engine lives in `src/scripts/i18n.ts` and text
// pairs live in `src/i18n/translations.ts`. Consume this file for the canonical
// language list and default locale.
// =============================================================================

export type LangCode = 'id' | 'en';

export interface Language {
  code: LangCode;
  /** Native display name. */
  label: string;
  /** BCP-47 locale for <html lang> / OpenGraph. */
  locale: string;
  /** Short toggle label (what the switcher shows to move TO the other lang). */
  short: string;
}

/** Supported languages. Order matters: first entry is listed first in UI. */
export const LANGUAGES: Language[] = [
  { code: 'id', label: 'Bahasa Indonesia', locale: 'id_ID', short: 'ID' },
  { code: 'en', label: 'English', locale: 'en_US', short: 'EN' },
];

/** Default language for first paint and SSR. */
export const DEFAULT_LANG: LangCode = 'id';

/** Convenience lookup by code. */
export const LANGUAGE_MAP: Record<LangCode, Language> = Object.fromEntries(
  LANGUAGES.map((l) => [l.code, l]),
) as Record<LangCode, Language>;
