import { site } from '../config/site';
import { LANGUAGES } from '../config/languages';

// Bare paths that exist in every language.
const PATHS = ['/', '/aria', '/projects', '/about', '/contact'];

export async function GET() {
  const lastmod = new Date().toISOString().split('T')[0];

  const urls = PATHS.flatMap((path) =>
    LANGUAGES.map((l) => {
      const loc = `${site.url}/${l.code}${path === '/' ? '/' : path}`;
      const alternates = LANGUAGES.map((a) => {
        const href = `${site.url}/${a.code}${path === '/' ? '/' : path}`;
        return `        <xhtml:link rel="alternate" hreflang="${a.code}" href="${href}" />`;
      }).join('\n');
      return `      <url>
        <loc>${loc}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${path === '/' ? '1.0' : '0.8'}</priority>
${alternates}
      </url>`;
    }),
  ).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
