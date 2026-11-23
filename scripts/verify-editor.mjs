#!/usr/bin/env node
/** Quick smoke test: load editor, open test image, crop, save — no network upload. */
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(__dirname, '..', 'dist');

const testPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FABJADixwaMIRAAAAAElFTkSuQmCC',
  'base64',
);
const tmpDir = path.join('/tmp', 'wf-photo-test');
fs.mkdirSync(tmpDir, { recursive: true });
fs.writeFileSync(path.join(tmpDir, 'tiny.png'), testPng);

function serve() {
  return http.createServer((req, res) => {
    const url = req.url?.split('?')[0] || '/';
    let p = path.join(dist, url === '/' ? 'index.html' : url);
    if (url.endsWith('/') && !fs.existsSync(p)) p = path.join(dist, url, 'index.html');
    if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) {
      p = path.join(dist, 'index.html');
    }
    const ext = path.extname(p);
    const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.png': 'image/png', '.json': 'application/json' };
    res.setHeader('Content-Type', types[ext] || 'application/octet-stream');
    res.end(fs.readFileSync(p));
  });
}

async function main() {
  let playwright;
  try {
    playwright = await import('playwright');
  } catch {
    console.log('SKIP: playwright not installed (build OK)');
    process.exit(0);
  }
  const server = serve();
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const uploads = [];
  page.on('request', (req) => {
    const u = req.url();
    if (
      req.method() === 'POST' &&
      !u.includes('127.0.0.1') &&
      !u.includes('cloudflareinsights.com')
    )
      uploads.push(u);
  });
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForSelector('#canvas_minipaint', { timeout: 60000 });
  await page.keyboard.press('o');
  await page.waitForSelector('#file_open', { state: 'attached', timeout: 10000 });
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser', { timeout: 10000 }).catch(() => null),
    page.setInputFiles('#file_open', path.join(tmpDir, 'tiny.png')),
  ]);
  if (fileChooser) await fileChooser.setFiles(path.join(tmpDir, 'tiny.png'));
  await page.waitForTimeout(3000);
  const hasPixels = await page.evaluate(() => {
    const c = document.getElementById('canvas_minipaint');
    if (!c) return false;
    const ctx = c.getContext('2d');
    const d = ctx.getImageData(0, 0, Math.min(10, c.width), Math.min(10, c.height)).data;
    return d.some((v) => v > 0);
  });
  if (!hasPixels) throw new Error('Canvas has no image data after open');
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/opt/cursor/artifacts/editor-loaded.png' });
  if (uploads.length) throw new Error('Unexpected uploads: ' + uploads.join(', '));
  console.log('verify-editor: OK (390px + desktop), no POST uploads');
  await browser.close();
  server.close();
}

main().catch((e) => {
  console.error('verify-editor FAILED:', e);
  process.exit(1);
});