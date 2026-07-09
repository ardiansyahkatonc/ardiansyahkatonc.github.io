// src/scripts/i18n.ts
// Lightweight bilingual engine — no framework required
// Reads/writes localStorage, applies data-id/data-en attributes

import { DEFAULT_LANG as CONFIG_DEFAULT_LANG, type LangCode } from '../config/languages';

export type Lang = LangCode;
const STORAGE_KEY = 'katon-lang';
const DEFAULT_LANG: Lang = CONFIG_DEFAULT_LANG;

export function getLang(): Lang {
  if (typeof localStorage === 'undefined') return DEFAULT_LANG;
  return (localStorage.getItem(STORAGE_KEY) as Lang) ?? DEFAULT_LANG;
}

export function setLang(lang: Lang): void {
  localStorage.setItem(STORAGE_KEY, lang);
  applyLang(lang);
}

export function applyLang(lang: Lang): void {
  const root = document.documentElement;
  root.lang = lang;
  root.setAttribute('data-lang', lang);

  // Toggle visibility of [data-lang-id] and [data-lang-en] elements
  document.querySelectorAll<HTMLElement>('[data-lang-id]').forEach(el => {
    el.style.display = lang === 'id' ? '' : 'none';
  });
  document.querySelectorAll<HTMLElement>('[data-lang-en]').forEach(el => {
    el.style.display = lang === 'en' ? '' : 'none';
  });

  // Update toggle button label
  const toggle = document.getElementById('lang-toggle');
  if (toggle) {
    toggle.textContent = lang === 'id' ? 'EN' : 'ID';
    toggle.setAttribute('aria-label', lang === 'id' ? 'Switch to English' : 'Beralih ke Bahasa Indonesia');
  }
}

export function initLang(): void {
  const lang = getLang();
  applyLang(lang);
}

export function toggleLang(): void {
  const current = getLang();
  setLang(current === 'id' ? 'en' : 'id');
}
