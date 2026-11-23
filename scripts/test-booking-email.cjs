const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')

// Compile the actual Worker and browser client without invoking an email service.
const cache = new Map()
function load(file) {
  file = path.resolve(file)
  if (cache.has(file)) return cache.get(file).exports
  let source = fs.readFileSync(file, 'utf8')
  source = source.replace(/import\.meta/g, '({ env: { BASE_URL: "/", DEV: false } })')
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText
  const module = { exports: {} }
  cache.set(file, module)
  new Function('module', 'exports', 'require', compiled)(module, module.exports, id => {
    if (id.startsWith('.')) return load(path.resolve(path.dirname(file), `${id}.ts`))
    return require(id)
  })
  return module.exports
}

const worker = load('worker/index.ts').default
const client = load('src/lib/packageBooking.ts')
const { packages, constructionPackage } = load('src/components/packages/data.ts')
const originalFetch = global.fetch
const valid = () => ({ requestId: `${Date.now()}_${crypto.randomUUID()}`, name: 'Test Visitor', email: 'visitor@example.com', phone: '+233502323196', address: 'London, UK', website: '', packageName: packages[0].name })
const environment = (overrides = {}) => ({
  RESEND_API_KEY: 'test-placeholder', BOOKING_FROM: 'Legacy Hub <bookings@mail.legacyhubgh.com>', BOOKING_OWNER_EMAIL: 'owner@example.com',
  BOOKING_RATE_LIMITER: { limit: async () => ({ success: true }) },
  ASSETS: { fetch: async () => new Response('static website') }, ...overrides,
})
const request = (data = valid(), options = {}) => new Request('https://legacyhubgh.com/api/bookings', {
  method: 'POST', headers: { Origin: 'https://legacyhubgh.com', 'Content-Type': 'application/json' }, body: JSON.stringify(data), ...options,
})
const success = () => Response.json({ data: [{ id: 'client-message' }, { id: 'owner-message' }] })

test('server uses the published price for all five packages, escapes HTML, and addresses both emails correctly', async () => {
  try {
    for (const pkg of [...packages, constructionPackage]) {
      let sent
      global.fetch = async (url, options) => { assert.equal(url, 'https://api.resend.com/emails/batch'); sent = JSON.parse(options.body); return success() }
      const response = await worker.fetch(request({ ...valid(), name: '<b>Visitor</b>', packageName: pkg.name, price: '$1', owner: 'attacker@example.com' }), environment())
      const result = await response.json()
      assert.equal(response.status, 200)
      assert.equal(result.price, pkg.price)
      assert.equal(result.emailQueued, true)
      assert.match(result.reference, /^LH-[0-9A-F]{20}$/)
      assert.deepEqual(sent[0].to, ['visitor@example.com'])
      assert.deepEqual(sent[1].to, ['owner@example.com'])
      assert.equal(sent[0].reply_to, 'owner@example.com')
      assert.equal(sent[1].reply_to, 'visitor@example.com')
      assert.ok(sent[0].html.includes('&lt;b&gt;Visitor&lt;/b&gt;'))
      assert.ok(!sent[0].html.includes('<b>Visitor</b>'))
      assert.ok(sent[0].text.includes('Payment status: Unpaid'))
      assert.ok(sent[0].text.includes('2537968640001'))
      assert.ok(sent[0].text.includes(pkg.price))
      assert.ok(sent[0].text.includes(result.reference))
      if (pkg.type === 'land') assert.match(sent[0].text, /minimum service fee/)
      if (pkg === constructionPackage) assert.match(sent[0].text, /first month/)
    }
  } finally { global.fetch = originalFetch }
})

test('retries retain identical email bodies, references and Resend idempotency keys', async () => {
  const requests = []
  global.fetch = async (_, options) => { requests.push(options); return success() }
  try {
    const data = valid()
    await worker.fetch(request(data), environment())
    await worker.fetch(request(data), environment())
    assert.equal(requests[0].body, requests[1].body)
    assert.equal(requests[0].headers['Idempotency-Key'], `booking/${data.requestId}`)
    assert.deepEqual(requests[0].headers, requests[1].headers)
  } finally { global.fetch = originalFetch }
})

test('invalid, cross-origin, expired, oversize and rate-limited requests cannot send emails', async () => {
  global.fetch = async () => { throw new Error('Email should not be called') }
  try {
    assert.equal((await worker.fetch(request(valid(), { method: 'GET', body: undefined }), environment())).status, 405)
    assert.equal((await worker.fetch(request(valid(), { headers: { Origin: 'https://other.example', 'Content-Type': 'application/json' } }), environment())).status, 403)
    for (const data of [{ ...valid(), email: 'bad' }, { ...valid(), name: 'Header\nInjection' }, { ...valid(), packageName: 'Other' }, { ...valid(), requestId: 'bad' }, { ...valid(), requestId: `${Date.now() - 86400000}_${crypto.randomUUID()}` }]) {
      assert.equal((await worker.fetch(request(data), environment())).status, 400)
    }
    assert.equal((await worker.fetch(request({ ...valid(), name: 'a'.repeat(9000) }), environment())).status, 413)
    assert.equal((await worker.fetch(request(), environment({ BOOKING_RATE_LIMITER: { limit: async () => ({ success: false }) } }))).status, 429)
    assert.equal((await worker.fetch(request(), environment({ BOOKING_RATE_LIMITER: undefined }))).status, 503)
    const trapped = await (await worker.fetch(request({ ...valid(), website: 'bot' }), environment())).json()
    assert.equal(trapped.emailQueued, false)
  } finally { global.fetch = originalFetch }
})

test('missing key explicitly permits the browser fallback; provider errors do not claim success', async () => {
  const missing = await worker.fetch(request(), environment({ RESEND_API_KEY: '' }))
  assert.equal(missing.status, 503)
  assert.equal((await missing.json()).code, 'EMAIL_NOT_CONFIGURED')
  try {
    global.fetch = async () => Response.json({ message: 'Invalid key' }, { status: 401 })
    const failed = await worker.fetch(request(), environment())
    assert.equal(failed.status, 502)
    assert.notEqual((await failed.json()).success, true)
    global.fetch = async () => Response.json({ data: [{ id: 'only-one-message' }] })
    assert.equal((await worker.fetch(request(), environment())).status, 502)
  } finally { global.fetch = originalFetch }
})

test('browser falls back only before email setup, retains errors after provider failure', async () => {
  try {
    const calls = []
    global.fetch = async (url, options) => {
      calls.push({ url, options })
      return url === '/api/bookings' ? Response.json({ code: 'EMAIL_NOT_CONFIGURED' }, { status: 503 }) : Response.json({ success: true })
    }
    const result = await client.requestPackage(valid(), '$150')
    assert.equal(result.emailQueued, false)
    assert.equal(calls.length, 2)
    assert.equal(calls[1].url, 'https://api.web3forms.com/submit')
    let count = 0
    global.fetch = async () => { count++; return Response.json({ message: 'Try again' }, { status: 502 }) }
    await assert.rejects(client.requestPackage(valid(), '$150'), /Try again/)
    assert.equal(count, 1)
    global.fetch = async () => Response.json({ success: true, emailQueued: true, reference: 'LH-TEST', price: '$150' })
    assert.equal((await client.requestPackage(valid(), '$1')).price, '$150')
  } finally { global.fetch = originalFetch }
})

test('website assets and unknown API routes are kept separate', async () => {
  assert.equal(await (await worker.fetch(new Request('https://legacyhubgh.com/packages'), environment())).text(), 'static website')
  assert.equal((await worker.fetch(new Request('https://legacyhubgh.com/api/unknown'), environment())).status, 404)
})
