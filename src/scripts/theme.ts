// src/scripts/theme.ts
// Theme engine — light / dark / system with localStorage persistence.
// The canonical color values are CSS variables (see global.css); this module
// only flips `data-theme` on <html>. Never duplicate styles here.

export type ThemePref = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'katon-theme';
const DEFAULT_PREF: ThemePref = 'system';

/** Icons shown on the header switch, keyed by preference. */
export const THEME_ICONS: Record<ThemePref, string> = {
  light: '☀',
  dark: '🌙',
  system: '💻',
};

export function getThemePref(): ThemePref {
  if (typeof localStorage === 'undefined') return DEFAULT_PREF;
  const stored = localStorage.getItem(STORAGE_KEY) as ThemePref | null;
  return stored ?? DEFAULT_PREF;
}

function systemPrefersDark(): boolean {
  return (
    typeof matchMedia !== 'undefined' &&
    matchMedia('(prefers-color-scheme: dark)').matches
  );
}

/** Resolve a preference to a concrete theme. */
export function resolveTheme(pref: ThemePref): ResolvedTheme {
  if (pref === 'system') return systemPrefersDark() ? 'dark' : 'light';
  return pref;
}

/** Apply the resolved theme to the document root. */
export function applyTheme(pref: ThemePref): void {
  const resolved = resolveTheme(pref);
  document.documentElement.setAttribute('data-theme', resolved);
  document.documentElement.setAttribute('data-theme-pref', pref);
  updateSwitch(pref);
}

export function setThemePref(pref: ThemePref): void {
  localStorage.setItem(STORAGE_KEY, pref);
  applyTheme(pref);
}

/** Cycle light → dark → system → light. */
export function cycleTheme(): void {
  const order: ThemePref[] = ['light', 'dark', 'system'];
  const next = order[(order.indexOf(getThemePref()) + 1) % order.length];
  setThemePref(next);
}

function updateSwitch(pref: ThemePref): void {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.textContent = THEME_ICONS[pref];
  btn.setAttribute('data-theme-pref', pref);
  btn.setAttribute('aria-label', `Theme: ${pref}. Click to change.`);
  btn.setAttribute('title', `Theme: ${pref}`);
}

/** Initialize on load + react to system changes while in `system` mode. */
export function initTheme(): void {
  applyTheme(getThemePref());

  if (typeof matchMedia !== 'undefined') {
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (getThemePref() === 'system') applyTheme('system');
    });
  }

  const btn = document.getElementById('theme-toggle');
  if (btn) btn.addEventListener('click', cycleTheme);
}
