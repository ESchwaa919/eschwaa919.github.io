/**
 * Post-build script: copies dist/index.html to each React route path
 * so GitHub Pages serves the SPA entry with HTTP 200 (not 404).
 *
 * Without this, Google sees a 404 status for every client-side route,
 * which causes pages to be marked as "Not found" in Search Console.
 *
 * Routes that already have a static index.html in dist/ (copied from public/)
 * are skipped. /ailms is not in the list for that reason; prerender.js then
 * overwrites dist/ailms/index.html with the rendered React page.
 *
 * Renamed routes get a small static redirect page instead (REDIRECTS below).
 * GitHub Pages serves dist/<old>/index.html directly, so without it the old path
 * would show whatever public/<old>/index.html holds rather than the React route.
 * public/automlr/ stays because it hosts the demo video and whitepaper; only its
 * legacy index.html is replaced in dist/.
 */

import { mkdirSync, copyFileSync, existsSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { fieldNoteRoutes } from './fieldNotesData.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const indexHtml = join(distDir, 'index.html');

// All React Router paths (excluding routes with existing static files)
const routes = [
  '/about',
  '/process',
  '/process/sdlc',
  '/process/rune-sdlc',
  '/services',
  '/resources',
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
  '/intelligent-content-factory',
  // Field notes: the index plus one route per published note (src/constants/fieldNotes.ts)
  ...fieldNoteRoutes(),
];

// Old path -> new path. Mirrors the <Navigate … replace /> routes in src/App.tsx
// for direct loads, which GitHub Pages answers from dist/ before React runs.
const REDIRECTS = {
  '/automlr': '/intelligent-content-factory',
};

const BASE_URL = 'https://theaiexpert.ai';

function redirectPage(to) {
  const url = `${BASE_URL}${to}`;
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Redirecting…</title>
    <meta name="robots" content="noindex" />
    <link rel="canonical" href="${url}" />
    <meta http-equiv="refresh" content="0; url=${to}" />
    <script>location.replace(${JSON.stringify(to)} + location.search + location.hash);</script>
  </head>
  <body>
    <p>This page has moved to <a href="${to}">${url}</a>.</p>
  </body>
</html>
`;
}

for (const [from, to] of Object.entries(REDIRECTS)) {
  const targetDir = join(distDir, from);
  mkdirSync(targetDir, { recursive: true });
  writeFileSync(join(targetDir, 'index.html'), redirectPage(to), 'utf-8');
  console.log(`  redirect: ${from}/index.html -> ${to}`);
}

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
