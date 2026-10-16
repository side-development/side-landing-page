/* eslint-disable @typescript-eslint/no-require-imports -- Explicitly authorized external integration smoke test. */
// Requires an approved local server with RESEND_API_KEY in memory, and the same
// key in this process to inspect ONLY synthetic emails created by this run.
const { chromium } = require(process.env.SIDE_PLAYWRIGHT_PATH || require('node:path').join(require('node:os').tmpdir(), 'side-landing-qa/node_modules/playwright'));
const { randomUUID } = require('node:crypto');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const base = process.env.SIDE_QA_URL || 'http://localhost:3100';
const marker = `SIDE-QA-${randomUUID()}`;
const startedAt = Date.now();
const results = [];
const wait = ms => new Promise(r => setTimeout(r, ms));
async function provider(endpoint) {
  const response = await fetch(`https://api.resend.com/${endpoint}`, { headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` }, signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(`Resend read status ${response.status}`);
  return response.json();
}
(async () => {
  if (process.env.SIDE_RESEND_APPROVED_TEST !== '1' || !process.env.RESEND_API_KEY) throw new Error('Explicit test opt-in and process-only key required');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  let firstRequest;
  try {
    for (const route of ['/contato', '/en/contact']) {
      const page = await context.newPage(); await page.goto(base + route);
      const submit = async () => { await page.locator('button[type=submit]').click(); await page.waitForTimeout(350); };
      await page.locator('[data-answer-input]').fill('QA Side — teste de lançamento'); await submit();
      await page.locator('input[type=radio]').first().check(); await submit();
      await page.locator('input[type=radio]').first().check(); await submit();
      await page.locator('textarea').fill(`${marker} ${route}. Teste controlado e autorizado, sem projeto real. Desconsiderar como lead comercial.`); await submit();
      await page.locator('input[type=radio]').first().check(); await submit();
      await page.locator('input[type=email]').fill('contato@sidecode.com.br');
      const responsePromise = page.waitForResponse(r => r.url().endsWith('/api/contact') && r.request().method() === 'POST');
      await submit(); const response = await responsePromise;
      if (!firstRequest) firstRequest = response.request();
      const json = await response.json();
      results.push({ route, httpStatus: response.status(), acceptedByRoute: json.ok === true });
      if (json.ok !== true) throw new Error(`Contact ${route} status ${response.status()}`);
      await page.locator('[data-success-title]').waitFor(); await page.close();
    }
    const retry = await context.request.post(base + '/api/contact', { headers: { 'Content-Type': 'application/json', Origin: base, 'Idempotency-Key': firstRequest.headers()['idempotency-key'] }, data: firstRequest.postData() });
    results.push({ idempotentHttpRetry: retry.status() === 200 });
    let matched = [];
    for (let attempt = 0; attempt < 6; attempt++) {
      await wait(2000); const list = await provider('emails?limit=10'); matched = [];
      for (const candidate of list.data.filter(e => e.subject === 'Side — Novo projeto / New project'
        && Date.parse(e.created_at) >= startedAt - 1000 && e.to?.includes('contato@sidecode.com.br'))) {
        await wait(550); const email = await provider(`emails/${candidate.id}`);
        if (email.text?.includes(marker)) matched.push(email);
      }
      if (matched.length === 2 && matched.every(e => ['delivered', 'bounced', 'failed', 'suppressed'].includes(e.last_event))) break;
    }
    results.push({ syntheticEmailsCreated: matched.length, duplicateAfterRetry: matched.length > 2,
      emails: matched.map(e => ({ providerIdPresent: !!e.id, recipientMatches: e.to?.includes('contato@sidecode.com.br'), fromMatches: e.from?.includes('contato@sidecode.com.br'), replyToMatches: e.reply_to?.includes('contato@sidecode.com.br'), lastEvent: e.last_event })) });
    fs.writeFileSync('artifacts/launch/resend-real-results.json', JSON.stringify({ at: new Date().toISOString(), results, inboxManuallyConfirmed: false }, null, 2));
    console.log(JSON.stringify(results, null, 2));
    assert.ok(results.slice(0, 2).every(r => r.httpStatus === 200 && r.acceptedByRoute));
    assert.ok(results[2].idempotentHttpRetry);
    assert.equal(matched.length, 2, 'Exactly two synthetic messages after retry');
    assert.ok(results[3].emails.every(e => e.providerIdPresent && e.recipientMatches && e.fromMatches && e.replyToMatches && e.lastEvent === 'delivered'));
  } finally { await context.close(); await browser.close(); }
})().catch(e => { console.error(e.message); process.exitCode = 1; });
