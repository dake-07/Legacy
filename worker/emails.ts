import { bookingContact, paymentInstructions } from '../src/lib/bookingDetails'

export interface Booking {
  reference: string
  date: string
  name: string
  email: string
  phone: string
  address: string
  packageName: string
  price: string
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!)
}

function layout(title: string, paragraphs: string[]) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body style="margin:0;background:#f7faf8;color:#111815;font-family:Arial,sans-serif"><main style="max-width:600px;margin:24px auto;padding:28px;background:white;border:1px solid #bfcfc8"><p style="color:#0b554e;font-weight:bold">LEGACY HUB</p><h1 style="font-size:26px;line-height:1.3">${escapeHtml(title)}</h1>${paragraphs.map(paragraph => `<p style="font-size:16px;line-height:1.7;overflow-wrap:anywhere">${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`).join('')}<p style="border-top:1px solid #dde5e1;padding-top:20px"><a style="color:#0b554e" href="https://legacyhubgh.com">legacyhubgh.com</a></p></main></body></html>`
}

export function bookingEmails(booking: Booking, from: string, owner: string) {
  const summary = `Reference: ${booking.reference}\nRequest date (UTC): ${booking.date}\nClient: ${booking.name}\nPackage: ${booking.packageName}\nListed service fee (USD): ${booking.price}\nPayment status: Unpaid`
  const instructions = paymentInstructions(booking.packageName)
  const payment = `Bank: ${bookingContact.bank}\nAccount name: ${bookingContact.accountName}\nAccount number: ${bookingContact.accountNumber}\nBranch: ${bookingContact.branch}\nPayment reference: ${booking.reference}`
  const mobile = `Mobile money: ${bookingContact.mobileNumber}\nWallet name: ${bookingContact.mobileName}\nContact the team before using mobile money to confirm how to settle the USD fee. No exchange rate is fixed by this email.`
  const clientParagraphs = [
    `Hello ${booking.name}, your package request has been received. Keep this pro forma invoice for your records.`,
    summary,
    instructions,
    payment,
    mobile,
    `After paying, send your payment reference and transfer confirmation to WhatsApp +${bookingContact.whatsapp}, or reply to this email.`,
    'This pro forma invoice acknowledges your request. It is not a payment receipt or a confirmed booking. Legacy Hub will confirm payment and availability separately.',
    `Questions or did not make this request? Reply to this email or contact ${owner}.`,
  ]
  const ownerParagraphs = [
    'A client requested a package. A pro forma invoice and payment instructions have also been queued to the client.',
    summary,
    `Client email: ${booking.email}\nPhone / WhatsApp: ${booking.phone}\nCity / country: ${booking.address}`,
    instructions,
    'Verify payment independently before marking this booking as paid. Reply to this notification to contact the client.',
  ]
  return [
    { from, to: [booking.email], reply_to: owner, subject: `Legacy Hub: package request & pro forma invoice ${booking.reference}`, html: layout('Your Package Request & Pro Forma Invoice', clientParagraphs), text: clientParagraphs.join('\n\n') },
    { from, to: [owner], reply_to: booking.email, subject: `New package request: ${booking.packageName} | ${booking.reference}`, html: layout('New Package Request', ownerParagraphs), text: ownerParagraphs.join('\n\n') },
  ]
}
