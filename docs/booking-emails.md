# Package confirmation emails

The `legacy-hub` Cloudflare Worker serves the Vite website and `/api/bookings`.
It reads package names and prices from the same catalogue as the website, then
sends two emails in one Resend batch: a client pro forma invoice and an owner notification.
Bank and mobile-money information is shared between the email and confirmation screen.

## Production setup

1. Resend must verify `mail.legacyhubgh.com` for sending.
2. Use a Resend key with Sending access restricted to that domain.
3. Deploy the Worker once using the repository's `wrangler.jsonc`. In Cloudflare
   Builds keep `npm run build` as the build command and use `npx wrangler deploy`
   as the deploy command. Do not retain an old `--assets dist` override.
4. In `legacy-hub > Settings > Variables and secrets`, add `RESEND_API_KEY` as a
   runtime **Secret**, then save/deploy that version. Never use a `VITE_` prefix.
5. Verify the rate limit binding `BOOKING_RATE_LIMITER` exists. Wrangler creates it.
6. `BOOKING_FROM` and `BOOKING_OWNER_EMAIL` are configured in `wrangler.jsonc`.
   Reply-to on client emails points to the owner; replies do not require a mailbox
   at `bookings@mail.legacyhubgh.com`.
7. Submit an authorized test booking and check both inboxes and the Resend delivery logs.
   The website reports that emails were queued; inbox delivery must be checked separately.

Before the secret is present, the API returns `EMAIL_NOT_CONFIGURED`. Only this
explicit response lets the browser use the existing Web3Forms notification flow.
The confirmation screen does not claim a client email was sent in that case.
Provider failures never trigger a second submission to Web3Forms.

## Payment rules

- Bronze: USD 150, Silver: USD 300, Gold: USD 400, full fee.
- Land acquisition: minimum USD 1,000 service fee; final fee must be confirmed.
- Construction monitoring: USD 100 for the first month, manually billed monthly.
- Clients contact the team before mobile-money payment to settle the USD-priced fee.
- Payment references are shared between both emails and the confirmation screen.
- Requests and pro forma invoices are unpaid. Payment verification and booking
  confirmation remain manual. This does not create an automatic subscription,
  payment receipt, PDF attachment, or invoice ledger.

## Local checks

Run `npm run lint`, `npm run check:worker`, `npm run test:bookings`, and `npm run build`.
For a local preview with the API, copy `.dev.vars.example` to `.dev.vars`, populate
the key privately, run `npm run build`, then `npm run dev:worker`.
`npm run dev` serves the frontend and uses the original Web3Forms fallback.
Use authorized test recipients only; automated tests mock all email requests.

## Request integrity and retries

The API requires same-origin JSON, validates client details, bounds payload size,
applies IP and email limits, ignores browser-supplied prices, and escapes email HTML.
Cloudflare's rate limiting is approximate per location; it is not a strict daily quota.
The browser keeps a request ID while retrying unchanged details. Resend idempotency
keys prevent duplicate batches for 24 hours; the API accepts IDs for up to 23 hours.
Changing details or reopening the form creates a new request. There is no persistent
booking database; references are random identifiers, not sequential invoice numbers.
