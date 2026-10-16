/* eslint-disable @typescript-eslint/no-require-imports -- Native CommonJS test harness. */
// Native node:test + the existing TypeScript compiler. Never contacts Resend.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function loadRoute(file, provider = async () => Response.json({ id: 'test-provider-id' })) {
  const calls = [];
  const context = vm.createContext({
    Request, Response, Headers, URL, TextDecoder, TextEncoder, AbortSignal, ReadableStream,
    process: { env: { RESEND_API_KEY: 'test-only-placeholder' } },
    fetch: async (...args) => { calls.push(args); return provider(...args); },
  });
  const modules = new Map();
  function load(filename) {
    filename = path.resolve(filename);
    if (modules.has(filename)) return modules.get(filename).exports;
    const loaded = { exports: {} }; modules.set(filename, loaded);
    const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    const localRequire = spec => spec.startsWith('@/')
      ? load(path.resolve('src', spec.slice(2) + '.ts'))
      : spec.startsWith('.') ? load(path.resolve(path.dirname(filename), spec + '.ts')) : require(spec);
    vm.runInContext(`(function(require,module,exports){${code}\n})`, context)(localRequire, loaded, loaded.exports);
    return loaded.exports;
  }
  return { route: load(file), calls, context };
}
const payload = { name: 'QA synthetic', type: 'website', stage: 'idea', goal: 'Synthetic launch test', timing: 'weeks', email: 'qa@example.invalid', locale: 'en', company: '' };
function request(body = payload, headers = {}) {
  return new Request('https://sidecode.com.br/api/contact', { method: 'POST', headers: {
    'Content-Type': 'application/json', Origin: 'https://sidecode.com.br',
    'Idempotency-Key': '00000000-0000-4000-8000-000000000001', ...headers,
  }, body: typeof body === 'string' ? body : JSON.stringify(body) });
}
test('contact: invalid origin, malformed/invalid bodies never reach provider', async () => {
  const { route, calls } = loadRoute('src/app/api/contact/route.ts');
  for (const [req, status] of [
    [request(payload, { Origin: 'https://other.example' }), 403],
    [request(payload, { 'Content-Type': 'text/plain' }), 415],
    [request('{'), 400], [request([]), 400], [request({ ...payload, email: 'bad' }), 400],
    [request({ ...payload, company: 'bot' }), 400],
    [request(payload, { 'Idempotency-Key': 'bad' }), 400],
    [request('x'.repeat(8193)), 413],
  ]) assert.equal((await route.POST(req)).status, status);
  assert.equal(calls.length, 0);
});
test('contact: bounded UTF-8 byte stream is cancelled before full body is read', async () => {
  const { route, calls } = loadRoute('src/app/api/contact/route.ts');
  let reads = 0, cancelled = false;
  const body = new ReadableStream({ pull(c) { if (reads >= 8) { c.close(); return; } reads++; c.enqueue(new TextEncoder().encode('é'.repeat(2048))); }, cancel() { cancelled = true; } });
  const req = new Request('https://sidecode.com.br/api/contact', { method: 'POST', duplex: 'half', body,
    headers: { 'Content-Type': 'application/json', 'Idempotency-Key': '00000000-0000-4000-8000-000000000001' } });
  const response = await route.POST(req);
  assert.equal(response.status, 413); assert.equal(cancelled, true); assert.ok(reads <= 4); assert.equal(calls.length, 0);
});
test('contact: success requires provider ID and retry key is stable', async () => {
  const { route, calls } = loadRoute('src/app/api/contact/route.ts');
  assert.equal((await route.POST(request())).status, 200);
  assert.equal((await route.POST(request())).status, 200);
  assert.equal(calls[0][1].headers['Idempotency-Key'], calls[1][1].headers['Idempotency-Key']);
  const email = JSON.parse(calls[0][1].body);
  assert.equal(email.reply_to, payload.email); assert.equal(email.to[0], 'contato@sidecode.com.br');
  assert.match(email.text, /Synthetic launch test/);
});
test('contact: provider rejection/missing ID/timeout never report success', async () => {
  for (const provider of [async () => Response.json({ error: 'test' }, { status: 403 }),
    async () => Response.json({}), async () => { throw new DOMException('Timeout', 'TimeoutError'); }]) {
    const { route } = loadRoute('src/app/api/contact/route.ts', provider);
    const response = await route.POST(request()); assert.equal(response.status, 502); assert.equal((await response.json()).ok, false);
  }
});
test('contact: missing config returns 503; instance guard throttles repeated submissions', async () => {
  const { route, calls, context } = loadRoute('src/app/api/contact/route.ts');
  context.process.env.RESEND_API_KEY = '';
  assert.equal((await route.POST(request())).status, 503); assert.equal(calls.length, 0);
  context.process.env.RESEND_API_KEY = 'test-only-placeholder';
  for (let i = 0; i < 3; i++) assert.equal((await route.POST(request())).status, 200);
  assert.equal((await route.POST(request())).status, 429);
});
test('newsletter: valid submission notifies contato@sidecode.com.br and honeypots are rejected', async () => {
  const { route, calls, context } = loadRoute('src/app/api/newsletter/route.ts');
  // Honeypot rejected
  const honeypot = await route.POST(request({ email: 'qa@example.invalid', company: 'spam' }));
  assert.equal(honeypot.status, 400);
  assert.equal(calls.length, 0);

  // Invalid email rejected
  const bad = await route.POST(request({ email: 'invalid-email' }));
  assert.equal(bad.status, 400);
  assert.equal(calls.length, 0);

  // Missing API key returns 503
  context.process.env.RESEND_API_KEY = '';
  const missing = await route.POST(request({ email: 'qa@example.invalid' }));
  assert.equal(missing.status, 503);
  assert.equal(calls.length, 0);

  // Success sends email to contato@sidecode.com.br
  context.process.env.RESEND_API_KEY = 'test-only-placeholder';
  const success = await route.POST(request({ email: 'subscriber@example.com' }));
  assert.equal(success.status, 200);
  assert.equal((await success.json()).ok, true);
  assert.equal(calls.length, 1);
  const emailPayload = JSON.parse(calls[0][1].body);
  assert.equal(emailPayload.to[0], 'contato@sidecode.com.br');
  assert.equal(emailPayload.reply_to, 'subscriber@example.com');
  assert.match(emailPayload.text, /subscriber@example\.com/);
});
test('contact: rotating valid emails cannot bypass the instance-wide budget', async () => {
  const { route, calls } = loadRoute('src/app/api/contact/route.ts');
  for (let i = 0; i < 30; i++) assert.equal((await route.POST(request({ ...payload, email: `qa-${i}@example.invalid` }))).status, 200);
  assert.equal((await route.POST(request({ ...payload, email: 'qa-31@example.invalid' }))).status, 429);
  assert.equal(calls.length, 30);
});
test('body read: stalled stream returns 408 and cancels even if source cancel never settles', async () => {
  const { route: { readJsonBody } } = loadRoute('src/lib/read-json-body.ts');
  let cancelled = false;
  const keepAlive = setTimeout(() => {}, 1000);
  try {
    const body = new ReadableStream({ cancel() { cancelled = true; return new Promise(() => {}); } });
    const result = await readJsonBody(new Request('https://sidecode.com.br/api/contact', { method: 'POST', body, duplex: 'half' }), 8192, 20);
    assert.equal(result.status, 408); assert.equal(cancelled, true);
  } finally { clearTimeout(keepAlive); }
});
