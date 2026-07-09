// src/scripts/theme.ts
// Theme engine — light / dark / system with localStorage persistence.
// The canonical color values are CSS variables (see global.css); this module
// only flips `data-theme` on <html> and drives the header ThemeSwitcher.
// Never duplicate styles here.

export type ThemePref = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'katon-theme';
const DEFAULT_PREF: ThemePref = 'system';

/** Glyphs + labels shown on the switcher, keyed by preference. */
export const THEME_ICONS: Record<ThemePref, string> = {
  light: '☀',
  dark: '🌙',
  system: '💻',
};
export const THEME_LABELS: Record<ThemePref, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
};

export function getThemePref(): ThemePref {
  if (typeof localStorage === 'undefined') return DEFAULT_PREF;
  const stored = localStorage.getItem(STORAGE_KEY) as ThemePref | null;
  return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : DEFAULT_PREF;
}

function systemPrefersDark(): boolean {
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches;
}

/** Resolve a preference to a concrete theme. */
export function resolveTheme(pref: ThemePref): ResolvedTheme {
  if (pref === 'system') return systemPrefersDark() ? 'dark' : 'light';
  return pref;
}

/** Apply the resolved theme to the document root + sync the switcher UI. */
export function applyTheme(pref: ThemePref): void {
  const resolved = resolveTheme(pref);
  const root = document.documentElement;
  root.setAttribute('data-theme', resolved);
  root.setAttribute('data-theme-pref', pref);
  updateSwitch(pref);
}

export function setThemePref(pref: ThemePref): void {
  try {
    localStorage.setItem(STORAGE_KEY, pref);
  } catch (e) {}
  applyTheme(pref);
}

/** Reflect the active preference across every switcher control. */
function updateSwitch(pref: ThemePref): void {
  document.querySelectorAll<HTMLElement>('[data-theme-choice]').forEach((el) => {
    const active = el.dataset.themeChoice === pref;
    el.setAttribute('aria-pressed', String(active));
    el.classList.toggle('is-active', active);
  });
  document.querySelectorAll<HTMLElement>('[data-theme-current]').forEach((el) => {
    el.textContent = THEME_ICONS[pref];
  });
  document.querySelectorAll<HTMLElement>('.theme-drop > summary').forEach((el) => {
    el.setAttribute('aria-label', `Theme: ${THEME_LABELS[pref]}`);
    el.setAttribute('title', `Theme: ${THEME_LABELS[pref]}`);
  });
}

const prefersReducedMotion = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Apply a preference with a brief color crossfade (skipped for reduced motion). */
export function chooseTheme(pref: ThemePref): void {
  const root = document.documentElement;
  if (prefersReducedMotion()) {
    setThemePref(pref);
    return;
  }
  root.classList.add('theme-transition');
  setThemePref(pref);
  window.setTimeout(() => root.classList.remove('theme-transition'), 240);
}

/** Cycle light → dark → system (kept for keyboard / programmatic use). */
export function cycleTheme(): void {
  const order: ThemePref[] = ['light', 'dark', 'system'];
  chooseTheme(order[(order.indexOf(getThemePref()) + 1) % order.length]);
}

/** Initialize on load + wire the switcher; react to system changes in system mode. */
export function initTheme(): void {
  applyTheme(getThemePref()); // no transition on first paint

  if (typeof matchMedia !== 'undefined') {
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (getThemePref() === 'system') applyTheme('system');
    });
  }

  document.querySelectorAll<HTMLElement>('[data-theme-choice]').forEach((el) => {
    el.addEventListener('click', () => {
      const pref = el.dataset.themeChoice as ThemePref;
      chooseTheme(pref);
      const details = el.closest('details');
      if (details) details.open = false; // close mobile dropdown after choosing
    });
  });
}
