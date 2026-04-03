/**
 * Post-build script: copies dist/index.html to each React route path
 * so GitHub Pages serves the SPA entry with HTTP 200 (not 404).
 *
 * Without this, Google sees a 404 status for every client-side route,
 * which causes pages to be marked as "Not found" in Search Console.
 *
 * Routes that already have static files in public/ (automlr, ailms)
 * are skipped to avoid overwriting their standalone microsites.
 */

import { mkdirSync, copyFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const indexHtml = join(distDir, 'index.html');

// All React Router paths (excluding routes with existing static files)
const routes = [
  '/about',
  '/process',
  '/services',
  '/resources',
  '/pricing',
  '/contact',
  '/ai-assessment',
  '/roi-calculator',
  '/promptfluency',
  '/ai-learning',
  '/privacy',
  '/terms',
  '/courses',
  // Pillar pages (SEO/GEO)
  '/fractional-caio',
  '/ai-literacy',
  '/ai-strategy',
  '/ai-governance',
  '/ai-implementation',
  '/use-cases',
];

let created = 0;
let skipped = 0;

for (const route of routes) {
  const targetDir = join(distDir, route);
  const targetFile = join(targetDir, 'index.html');

  if (existsSync(targetFile)) {
    console.log(`  skip: ${route}/index.html (already exists)`);
    skipped++;
    continue;
  }

  mkdirSync(targetDir, { recursive: true });
  copyFileSync(indexHtml, targetFile);
  console.log(`  create: ${route}/index.html`);
  created++;
}

console.log(`\nDone: ${created} created, ${skipped} skipped`);
