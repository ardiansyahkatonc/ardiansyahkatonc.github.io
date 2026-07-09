import { BRAND } from './brand';

// Site-level identity. Brand facts are derived from BRAND (single source);
// only site-specific values (canonical URL, SEO headline) live here.
export const site = {
  name: BRAND.name,
  title: 'Building AI-Native Solutions for Public Sector Indonesia',
  description: BRAND.description,
  url: 'https://ardiansyahkatonc.github.io',
  author: BRAND.author,
};
