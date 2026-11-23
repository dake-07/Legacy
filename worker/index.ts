import { packages, constructionPackage } from '../src/components/packages/data'
import { bookingEmails } from './emails'

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> }
  RESEND_API_KEY?: string
  BOOKING_FROM: string
  BOOKING_OWNER_EMAIL: string
  BOOKING_RATE_LIMITER: { limit(options: { key: string }): Promise<{ success: boolean }> }
}

function json(body: Record<string, unknown>, status = 200, headers: Record<string, string> = {}) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...headers } })
}

async function handleBooking(request: Request, env: Env) {
  if (request.method !== 'POST') return json({ message: 'Use POST to request a package.' }, 405, { Allow: 'POST' })
  const origin = request.headers.get('Origin')
  if (!origin || origin !== new URL(request.url).origin) return json({ message: 'Submit this request from the Legacy Hub website.' }, 403)
  if (!request.headers.get('Content-Type')?.startsWith('application/json')) return json({ message: 'Send a JSON request.' }, 415)
  if (!env.RESEND_API_KEY) return json({ code: 'EMAIL_NOT_CONFIGURED', message: 'Email setup is pending.' }, 503)

  // Fail closed if abuse protection is missing rather than exposing an unlimited email relay.
  if (!env.BOOKING_RATE_LIMITER) return json({ message: 'Booking requests are temporarily unavailable. Contact the team via WhatsApp.' }, 503)
  const ip = request.headers.get('CF-Connecting-IP') || 'local'
  if (!(await env.BOOKING_RATE_LIMITER.limit({ key: `booking:ip:${ip}` })).success) {
    return json({ message: 'Too many requests. Wait a minute before trying again.' }, 429, { 'Retry-After': '60' })
  }

  // Read at most 8 KB, including requests without a Content-Length header.
  const reader = request.body?.getReader()
  if (!reader) return json({ message: 'Enter your booking details.' }, 400)
  const chunks: Uint8Array[] = []
  let size = 0
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > 8192) { await reader.cancel(); return json({ message: 'Request is too large.' }, 413) }
    chunks.push(value)
  }
  const bytes = new Uint8Array(size)
  let offset = 0
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength }
  let body: Record<string, unknown>
  try {
    const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes))
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Invalid body')
    body = parsed as Record<string, unknown>
  } catch { return json({ message: 'Check the request details and try again.' }, 400) }

  if (body.website) return json({ success: true, emailQueued: false })
  const field = (key: string) => typeof body[key] === 'string' ? body[key].trim() : ''
  const name = field('name'), email = field('email').toLowerCase(), phone = field('phone'), address = field('address')
  if ([name, email, phone, address].some(value => value.length > 100 || [...value].some(character => character.charCodeAt(0) < 32)) ||
      name.length < 2 || address.length < 2 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/.test(email) ||
      !/^\+?[\d\s().-]+$/.test(phone) || phone.replace(/\D/g, '').length < 7 || phone.replace(/\D/g, '').length > 15) {
    return json({ message: 'Check your name, email, phone number, and city/country.' }, 400)
  }
  const selectedPackage = [...packages, constructionPackage].find(item => item.name === field('packageName'))
  if (!selectedPackage) return json({ message: 'Choose a package from the packages page.' }, 400)
  // Timestamp + UUID remains unchanged on retries, so Resend can deduplicate the complete batch.
  const requestId = field('requestId')
  if (!/^\d{13}_[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(requestId)) {
    return json({ message: 'Refresh the page and send a new request.' }, 400)
  }
  const timestamp = Number(requestId.split('_')[0])
  if (timestamp > Date.now() + 60000 || Date.now() - timestamp > 23 * 60 * 60 * 1000) {
    return json({ message: 'This request has expired. Refresh the page and try again.' }, 400)
  }
  if (!(await env.BOOKING_RATE_LIMITER.limit({ key: `booking:email:${email}` })).success) {
    return json({ message: 'Too many requests for this email. Wait a minute before trying again.' }, 429, { 'Retry-After': '60' })
  }
  const reference = `LH-${requestId.split('_')[1].replaceAll('-', '').slice(0, 20).toUpperCase()}`
  const date = new Date(timestamp).toISOString().slice(0, 10)
  const messages = bookingEmails({ reference, date, name, email, phone, address, packageName: selectedPackage.name, price: selectedPackage.price }, env.BOOKING_FROM, env.BOOKING_OWNER_EMAIL)
  try {
    const response = await fetch('https://api.resend.com/emails/batch', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `booking/${requestId}` },
      body: JSON.stringify(messages),
      signal: AbortSignal.timeout(15000),
    })
    const result = await response.json() as { data?: { id?: string }[] }
    if (!response.ok || result.data?.length !== 2 || result.data.some(item => !item.id)) {
      console.error('Booking email provider rejected request', response.status)
      return json({ message: 'We could not confirm the emails. Try again with the same details or contact the team via WhatsApp.' }, 502)
    }
    return json({ success: true, reference, emailQueued: true, price: selectedPackage.price })
  } catch {
    // No client details, payment data, or API keys in logs.
    console.error('Booking email provider unavailable')
    return json({ message: 'We could not confirm the emails. Try again with the same details or contact the team via WhatsApp.' }, 502)
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const path = new URL(request.url).pathname
    if (path === '/api/bookings') return handleBooking(request, env)
    if (path.startsWith('/api/')) return json({ message: 'Endpoint not found.' }, 404)
    return env.ASSETS.fetch(request)
  },
}
