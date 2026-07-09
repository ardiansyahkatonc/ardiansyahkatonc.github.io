// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://ardiansyahkatonc.github.io',
  // Internationalization foundation. Default locale (id) stays unprefixed at the
  // site root so existing routes are unchanged; /en is prepared for future
  // localized pages. Pages are NOT translated in this sprint.
  i18n: {
    defaultLocale: 'id',
    locales: ['id', 'en'],
    routing: {
      // Both locales are explicitly prefixed (/id, /en). The root ("/") is a
      // language gateway that redirects based on preference/browser language.
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()]
  }
});