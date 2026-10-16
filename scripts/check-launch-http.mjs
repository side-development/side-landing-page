import assert from 'node:assert/strict';
import { writeFileSync, mkdirSync } from 'node:fs';
const base = process.env.SIDE_QA_URL || 'http://localhost:3100';
const pairs = [['/', '/en'], ['/trabalhos', '/en/work'], ['/servicos', '/en/services'], ['/por-que-side', '/en/why-side'], ['/contato', '/en/contact']];
const results = [];
async function check(url, expected, location) {
  const response = await fetch(base + url, { redirect: 'manual', headers: { 'User-Agent': 'Twitterbot' } });
  assert.equal(response.status, expected, `${url}: status`);
  if (location) assert.equal(new URL(response.headers.get('location'), base).pathname, location);
  results.push({ url, status: response.status }); return response;
}
for (const [pt, en] of pairs) for (const [route, lang] of [[pt, 'pt-BR'], [en, 'en']]) {
  const response = await check(route, 200), html = await response.text();
  assert.ok(html.includes(`<html lang="${lang}"`), `${route}: language`);
  assert.ok(html.includes(`rel="canonical" href="https://sidecode.com.br${route === '/' ? '' : route}"`), `${route}: canonical`);
  for (const language of ['pt-BR', 'en', 'x-default']) assert.ok(html.includes(`hrefLang="${language}"`), `${route}: hreflang ${language}`);
  for (const name of ['og:title', 'og:description', 'og:url', 'og:image', 'twitter:card', 'twitter:image']) assert.ok(html.includes(`="${name}"`), `${route}: ${name}`);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.match(response.headers.get('content-security-policy'), /frame-ancestors 'none'/);
  assert.equal(response.headers.get('x-powered-by'), null);
  assert.equal(response.headers.get('link'), null, 'No incorrect slug alternates in HTTP Link header');
}
for (const [from, to] of [['/pt-BR', '/'], ['/work', '/trabalhos'], ['/services', '/servicos'], ['/why-side', '/por-que-side'], ['/contact', '/contato'], ['/en/trabalhos', '/en/work'], ['/en/servicos', '/en/services'], ['/en/por-que-side', '/en/why-side'], ['/en/contato', '/en/contact']]) await check(from, 307, to);
for (const prefix of ['', '/en', '/pt-BR']) for (const route of ['final-cta', 'services', 'services/experience', 'services/sequence', 'services/terminal', 'social-proof', 'why-side', 'why-side-manifesto']) {
  // pt-BR redirects to the canonical unprefixed URL first, which still must 404.
  const response = await fetch(`${base}${prefix}/review/${route}`); assert.equal(response.status, 404); results.push({ url: `${prefix}/review/${route}`, status: response.status });
}
for (const route of ['/missing-page', '/en/missing-page', '/.env', '/.git/config', '/src/app/api/contact/route.ts', '/not-a-page.js']) await check(route, 404);
const sitemap = await (await check('/sitemap.xml', 200)).text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.deepEqual(urls.sort(), pairs.flat().map(route => `https://sidecode.com.br${route}`).sort());
assert.ok(!/review|api\/|lastmod/.test(sitemap));
const robots = await (await check('/robots.txt', 200)).text();
assert.ok(robots.includes('Sitemap: https://sidecode.com.br/sitemap.xml'));
assert.ok(robots.includes('Disallow: /api/') && robots.includes('Disallow: /review/'));
const image = await check('/brand/social-preview.png', 200); assert.equal(image.headers.get('content-type'), 'image/png');
await check('/favicon.svg', 200);
for (const route of ['/api/contact', '/api/newsletter']) await check(route, 405);
const invalid = await fetch(`${base}/api/newsletter`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' }); assert.equal(invalid.status, 400); assert.match(invalid.headers.get('cache-control'), /no-store/);
mkdirSync('artifacts/launch', { recursive: true });
writeFileSync('artifacts/launch/http-results.json', JSON.stringify({ base, passed: results.length + 1, results }, null, 2));
console.log(`HTTP, metadata, sitemap, robots, headers, redirects and review isolation: ${results.length + 1} passed`);
