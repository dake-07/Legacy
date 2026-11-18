const fs = require('node:fs');
const assert = require('node:assert/strict');
const ts = require('typescript');

(async () => {
  // Transpile web3forms
  const web3formsSource = fs.readFileSync('src/lib/web3forms.ts', 'utf8').replace(/import\.meta/g, '({})');
  const web3formsCompiled = ts.transpileModule(web3formsSource, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
  }).outputText;
  const web3formsModule = { exports: {} };
  new Function('module', 'exports', 'require', web3formsCompiled)(web3formsModule, web3formsModule.exports, require);



  // Transpile freeConsultation
  const source = fs.readFileSync('src/lib/freeConsultation.ts', 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
  }).outputText;
  const freeModule = { exports: {} };
  const customRequire = (id) => {
    if (id === './web3forms' || id.endsWith('web3forms')) return web3formsModule.exports;
    return require(id);
  };
  new Function('module', 'exports', 'require', compiled)(freeModule, freeModule.exports, customRequire);

  const { validateFreeConsultation, sendFreeConsultation } = freeModule.exports;
  const details = { name: ' Test Visitor ', contactMethod: 'Email', contact: ' visitor@example.com ', service: 'Relocation', notes: '' };

  assert.deepEqual(validateFreeConsultation(details), {});
  assert.deepEqual(Object.keys(validateFreeConsultation({ ...details, name: '', contact: 'bad', service: '' })), ['name', 'contact', 'service']);
  assert.deepEqual(validateFreeConsultation({ ...details, contactMethod: 'WhatsApp', contact: '+233 50 123 4567' }), {});
  assert.ok(validateFreeConsultation({ ...details, contactMethod: 'WhatsApp', contact: 'abc' }).contact);

  const originalFetch = global.fetch;
  try {
    let payload;
    global.fetch = async (_, options) => {
      payload = JSON.parse(options.body);
      return { ok: true, json: async () => ({ success: true }) };
    };

    await sendFreeConsultation(details);
    assert.equal(payload.email, 'visitor@example.com');
    assert.equal(payload['Service Interest'], 'Relocation');
    assert.equal(payload['Client Name'], 'Test Visitor');

    await sendFreeConsultation({ ...details, contactMethod: 'WhatsApp', contact: '+233 50 123 4567' });
    assert.equal(payload.email, undefined);
    assert.equal(payload.phone, '+233 50 123 4567');
    assert.equal(payload['Preferred Contact Method'], 'WhatsApp');

    // Test rejection on failures
    for (const response of [
      { ok: false, status: 500, json: async () => ({ success: true }) },
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
  } finally {
    global.fetch = originalFetch;
  }

  console.log('Free consultation: Web3Forms validation, payloads, contact routing, success and failure tests passed.');
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
