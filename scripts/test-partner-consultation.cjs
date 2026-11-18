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



  // Transpile consultation
  const source = fs.readFileSync('src/components/partners/consultation.ts', 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
  }).outputText;
  const partnerModule = { exports: {} };
  const customRequire = (id) => {
    if (id.endsWith('web3forms')) return web3formsModule.exports;
    return require(id);
  };
  new Function('module', 'exports', 'require', compiled)(partnerModule, partnerModule.exports, customRequire);

  const { validateConsultation, sendConsultation } = partnerModule.exports;
  const details = { name: ' Test Visitor ', email: ' visitor@example.com ', phone: '+233 50 123 4567', notes: ' Test build ' };

  assert.deepEqual(validateConsultation(details), {});
  assert.deepEqual(Object.keys(validateConsultation({ name: ' ', email: 'bad', phone: 'abc', notes: '' })), ['name', 'email', 'phone']);

  const originalFetch = global.fetch;
  try {
    let payload;
    global.fetch = async (_, options) => {
      payload = JSON.parse(options.body);
      return { ok: true, json: async () => ({ success: true }) };
    };

    await sendConsultation('Test Partner', 'Selected Design', details);
    assert.equal(payload['Selected Builder / Designer'], 'Test Partner');
    assert.equal(payload['Specific Design'], 'Selected Design');
    assert.equal(payload['Client Name'], 'Test Visitor');
    assert.equal(payload.email, 'visitor@example.com');
    assert.equal(payload.phone, '+233 50 123 4567');

    for (const response of [
      { ok: false, status: 500, json: async () => ({ success: true }) },
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
  } finally {
    global.fetch = originalFetch;
  }

  console.log('Partner consultation: Web3Forms validation, payload, confirmed success, HTTP errors, and failure tests passed.');
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
