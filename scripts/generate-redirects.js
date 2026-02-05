/**
 * Generates static HTML redirect files for old URLs that no longer exist.
 *
 * These files are placed in public/ so they get copied to dist/ at build time.
 * When GitHub Pages serves them, it returns HTTP 200 (file exists) with a
 * <meta http-equiv="refresh"> redirect that Google follows and treats as a 301.
 *
 * This is the correct way to handle redirects on static hosting like GitHub Pages,
 * where server-side 301s are not possible.
 */

import { mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const BASE_URL = 'https://theaiexpert.ai';

// Map of old URL paths → new URL paths
const redirects = {
  // Old static HTML pages
  'index.html':                        '/',
  'insights.html':                     '/resources',
  'media.html':                        '/resources',
  'faq.html':                          '/about',
  'sitemap.html':                      '/',
  'ai-assessment.html':                '/ai-assessment',
  'ai-roi-calculator.html':            '/roi-calculator',

  // Old service sub-pages
  'services/expert-network.html':      '/services',
  'services/implementation.html':       '/services',
  'services/specialised.html':          '/services',
  'services/strategic-guidance.html':   '/services',

  // Old microsite paths
  'skills/index.html':                 '/ai-assessment',
  // Note: promptfluency/index.html is NOT listed here because /promptfluency
  // is a live React route. The generate-static-routes.js script creates the
  // SPA entry point at promptfluency/index.html instead, and the SEOHead
  // canonical tag handles the URL consolidation for Google.
};

function generateRedirectHtml(fromPath, toPath) {
  const fullUrl = `${BASE_URL}${toPath}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0;url=${fullUrl}">
  <link rel="canonical" href="${fullUrl}">
  <title>Redirecting to ${fullUrl}</title>
</head>
<body>
  <p>This page has moved. If you are not redirected, <a href="${fullUrl}">click here</a>.</p>
</body>
</html>`;
}

let count = 0;
for (const [fromPath, toPath] of Object.entries(redirects)) {
  const filePath = join(publicDir, fromPath);
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, generateRedirectHtml(fromPath, toPath));
  console.log(`  ${fromPath} → ${toPath}`);
  count++;
}

console.log(`\nGenerated ${count} redirect files in public/`);
