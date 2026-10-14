const { readFileSync } = require('node:fs');
const assert = require('node:assert/strict');
const ts = require('typescript');

(async () => {
  const source = readFileSync('src/components/partners/consultation.ts', 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  const { validateConsultation, sendConsultation } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
  const details = { name: ' Test Visitor ', email: ' visitor@example.com ', phone: '+233 50 123 4567', notes: ' Test build ' };
  assert.deepEqual(validateConsultation(details), {});
  assert.deepEqual(Object.keys(validateConsultation({ name: ' ', email: 'bad', phone: 'abc', notes: '' })), ['name', 'email', 'phone']);
  const originalFetch = global.fetch;
  try {
    let payload;
    global.fetch = async (_, options) => { payload = JSON.parse(options.body); return { ok: true, json: async () => ({ success: 'true' }) }; };
    await sendConsultation('Test Partner', 'Selected Design', details);
    assert.equal(payload['Specific Design'], 'Selected Design');
    assert.equal(payload['Client Name'], 'Test Visitor');
    assert.equal(payload._replyto, 'visitor@example.com');
    for (const response of [
      { ok: false, json: async () => ({ success: true }) },
      { ok: true, json: async () => ({ success: false }) },
      { ok: true, json: async () => ({}) },
      { ok: true, json: async () => { throw new Error('Invalid JSON'); } },
    ]) {
      global.fetch = async () => response;
      await assert.rejects(sendConsultation('Test Partner', '', details));
    }
    global.fetch = async () => { throw new Error('Offline'); };
    await assert.rejects(sendConsultation('Test Partner', '', details));
    global.fetch = async () => ({ ok: true, json: async () => ({ success: true }) });
    await sendConsultation('Test Partner', '', details);
  } finally { global.fetch = originalFetch; }
  console.log('Partner consultation: validation, payload, confirmed success, HTTP errors, rejected/unconfirmed responses, invalid JSON, and network failures passed. No network requests sent.');
})().catch(error => { console.error(error); process.exitCode = 1; });
