/**
 * Build-time script: generates sitemap.xml from the canonical route list.
 *
 * Run after vite build (automatically called via npm run build).
 * Reads routes, applies priority/changefreq rules, writes dist/sitemap.xml.
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');

const BASE_URL = 'https://theaiexpert.ai';
const TODAY = new Date().toISOString().split('T')[0];

/**
 * Canonical route definitions.
 * Update this list when adding/removing React Router routes.
 * Redirect-only routes (e.g. /the-process → /process) are excluded.
 */
const routes = [
  // Core pages
  { path: '/',                priority: '1.0', changefreq: 'weekly' },
  { path: '/about',           priority: '0.9', changefreq: 'monthly' },
  { path: '/services',        priority: '0.9', changefreq: 'monthly' },
  { path: '/process',         priority: '0.9', changefreq: 'monthly' },
  { path: '/process/sdlc',    priority: '0.7', changefreq: 'monthly' },
  { path: '/resources',       priority: '0.8', changefreq: 'weekly' },
  { path: '/contact',         priority: '0.7', changefreq: 'monthly' },
  { path: '/courses',         priority: '0.9', changefreq: 'weekly' },

  // Pillar pages (SEO/GEO)
  { path: '/fractional-caio',   priority: '0.9', changefreq: 'monthly' },
  { path: '/ai-literacy',       priority: '0.8', changefreq: 'monthly' },
  { path: '/ai-strategy',       priority: '0.8', changefreq: 'monthly' },
  { path: '/ai-governance',     priority: '0.8', changefreq: 'monthly' },
  { path: '/ai-implementation', priority: '0.8', changefreq: 'monthly' },
  { path: '/use-cases',         priority: '0.8', changefreq: 'monthly' },

  // Interactive tools
  { path: '/ai-assessment',   priority: '0.8', changefreq: 'monthly' },
  { path: '/roi-calculator',  priority: '0.8', changefreq: 'monthly' },
  { path: '/promptfluency',   priority: '0.8', changefreq: 'monthly' },
  { path: '/ai-learning',     priority: '0.8', changefreq: 'monthly' },

  // Products
  { path: '/automlr',         priority: '0.8', changefreq: 'monthly' },
  { path: '/ailms',           priority: '0.8', changefreq: 'monthly' },

  // Legal
  { path: '/privacy',         priority: '0.3', changefreq: 'yearly' },
  { path: '/terms',           priority: '0.3', changefreq: 'yearly' },
];

function generateSitemap() {
  const urls = routes.map(({ path, priority, changefreq }) => `    <url>
        <loc>${BASE_URL}${path}</loc>
        <lastmod>${TODAY}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
    </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

const sitemap = generateSitemap();
const outputPath = join(distDir, 'sitemap.xml');
writeFileSync(outputPath, sitemap, 'utf-8');
console.log(`Sitemap generated: ${routes.length} URLs → dist/sitemap.xml`);
