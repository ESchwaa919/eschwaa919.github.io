/**
 * Post-build script: pre-renders each React route to static HTML using Puppeteer.
 *
 * Gives search crawlers fully rendered body content without JavaScript execution.
 * Head meta tags (title, description, OG) are managed by react-helmet-async
 * and update client-side when JS loads — this is standard for SPA pre-rendering.
 *
 * The client-side app hydrates on top of the pre-rendered HTML (see main.tsx).
 */

import { createServer } from 'http';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const PORT = 45678;

const ROUTES = [
  '/',
  '/about',
  '/process',
  '/process/sdlc',
  '/services',
  '/resources',
  '/contact',
  '/courses',
  '/fractional-caio',
  '/ai-literacy',
  '/ai-strategy',
  '/ai-governance',
  '/ai-implementation',
  '/use-cases',
  '/ai-assessment',
  '/roi-calculator',
  '/promptfluency',
  '/ai-learning',
  '/automlr',
  '/ailms',
  '/privacy',
  '/terms',
];

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

// Keep a copy of the clean SPA shell to serve for all routes during prerender.
// This prevents hydration mismatches when prerendering overwrites index.html.
const cleanShell = readFileSync(join(distDir, 'index.html'), 'utf-8');

function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const urlPath = req.url.split('?')[0];
      let filePath = join(distDir, urlPath === '/' ? 'index.html' : urlPath);

      // For HTML routes, always serve the clean SPA shell so React
      // uses createRoot (not hydrateRoot) during prerendering.
      if (!extname(filePath) || extname(filePath) === '.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(cleanShell);
        return;
      }

      if (!existsSync(filePath)) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }

      const ext = extname(filePath);
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      const content = readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });

    server.listen(PORT, () => resolve(server));
  });
}

async function prerender() {
  console.log('Pre-rendering routes with Puppeteer...');
  const server = await startServer();

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  let rendered = 0;
  let failed = 0;

  for (const route of ROUTES) {
    const page = await browser.newPage();

    try {
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 15000,
      });

      // Wait for React to fully render body content
      await page.waitForFunction(
        () => document.getElementById('root')?.hasChildNodes(),
        { timeout: 10000 }
      );
      await page.evaluate(() => new Promise((r) => setTimeout(r, 1000)));

      const html = await page.evaluate(() => {
        return '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
      });

      const outputPath = route === '/'
        ? join(distDir, 'index.html')
        : join(distDir, route, 'index.html');

      writeFileSync(outputPath, html, 'utf-8');
      console.log(`  ✓ ${route}`);
      rendered++;
    } catch (err) {
      console.error(`  ✗ ${route}: ${err.message}`);
      failed++;
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  console.log(`\nPre-render complete: ${rendered} rendered, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

prerender();
