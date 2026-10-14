const fs = require('node:fs');
const assert = require('node:assert/strict');
const ts = require('typescript');

(async () => {
  const source = fs.readFileSync('src/lib/freeConsultation.ts', 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  const { validateFreeConsultation, sendFreeConsultation } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
  const details = { name: ' Test Visitor ', contactMethod: 'Email', contact: ' visitor@example.com ', service: 'Relocation', notes: '' };
  assert.deepEqual(validateFreeConsultation(details), {});
  assert.deepEqual(Object.keys(validateFreeConsultation({ ...details, name: '', contact: 'bad', service: '' })), ['name', 'contact', 'service']);
  assert.deepEqual(validateFreeConsultation({ ...details, contactMethod: 'WhatsApp', contact: '+233 50 123 4567' }), {});
  assert.ok(validateFreeConsultation({ ...details, contactMethod: 'WhatsApp', contact: 'abc' }).contact);
  const originalFetch = global.fetch;
  try {
    let payload;
    global.fetch = async (_, options) => { payload = JSON.parse(options.body); return { ok: true, json: async () => ({ success: 'true' }) }; };
    await sendFreeConsultation(details);
    assert.equal(payload._replyto, 'visitor@example.com');
    assert.equal(payload['Service Interest'], 'Relocation');
    await sendFreeConsultation({ ...details, contactMethod: 'WhatsApp', contact: '+233 50 123 4567' });
    assert.equal(payload._replyto, undefined);
    assert.equal(payload['Preferred Contact Method'], 'WhatsApp');
    for (const response of [
      { ok: false, json: async () => ({ success: true }) },
      { ok: true, json: async () => ({ success: false }) },
      { ok: true, json: async () => ({}) },
      { ok: true, json: async () => { throw new Error('Invalid JSON'); } },
    ]) {
      global.fetch = async () => response;
      await assert.rejects(sendFreeConsultation(details));
    }
    global.fetch = async () => { throw new Error('Offline'); };
    await assert.rejects(sendFreeConsultation(details));
    global.fetch = async () => ({ ok: true, json: async () => ({ success: true }) });
    await sendFreeConsultation(details);
  } finally { global.fetch = originalFetch; }
  console.log('Free consultation validation, contact preferences, payloads, success, and failure tests passed. No network requests sent.');
})().catch(error => { console.error(error); process.exitCode = 1; });
