import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Loader2, X } from 'lucide-react'
import { PartnerDialog } from './partners/PartnerDialog'
import { consultationServices, sendFreeConsultation, validateFreeConsultation, type FreeConsultationRequest } from '../lib/freeConsultation'

export function FreeConsultationDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [details, setDetails] = useState<FreeConsultationRequest>({ name: '', contactMethod: 'Email', contact: '', service: '', notes: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof FreeConsultationRequest, string>>>({})
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [failure, setFailure] = useState('')
  const hasUnsavedDetails = open && !submitted && Boolean(details.name || details.contact || details.service || details.notes)
  useEffect(() => {
    if (!hasUnsavedDetails) return
    const warn = (event: BeforeUnloadEvent) => event.preventDefault()
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [hasUnsavedDetails])

  const update = <K extends keyof FreeConsultationRequest>(field: K, value: FreeConsultationRequest[K]) => {
    setDetails(previous => ({ ...previous, [field]: value }))
    setErrors(previous => ({ ...previous, [field]: undefined }))
  }
  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (sending) return
    const nextErrors = validateFreeConsultation(details)
    setErrors(nextErrors)
    const firstError = Object.keys(nextErrors)[0]
    if (firstError) { document.getElementById(`free-${firstError}`)?.focus(); return }

    // Honeypot trap: if filled by a bot, silently complete without sending
    if (details.website) {
      setSubmitted(true)
      return
    }

    setSending(true)
    setFailure('')
    try { await sendFreeConsultation(details); setSubmitted(true) }
    catch { setFailure('We couldn’t confirm your request. Your details are still here. Try again or contact the team on WhatsApp.') }
    finally { setSending(false) }
  }
  const inputClass = 'min-h-12 w-full rounded-lg border border-gray-400 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-500 disabled:bg-gray-50'
  const whatsapp = `https://wa.me/233502323196?text=${encodeURIComponent(`Hello LegacyHub, I would like to request a free consultation.\nName: ${details.name}\nService: ${details.service || 'Help choosing a service'}\nPreferred contact: ${details.contactMethod} - ${details.contact}\nNotes: ${details.notes || 'None'}`)}`
  return (
    <PartnerDialog open={open} labelledBy="free-consultation-title" onClose={onClose}>
      <div className="p-5 sm:p-8">
        <header className="mb-5 flex items-start justify-between gap-3">
          <h2 id="free-consultation-title" className="text-2xl font-semibold leading-tight">{submitted ? 'Your request is on its way' : 'Request a free consultation'}</h2>
          <button type="button" onClick={onClose} aria-label="Close free consultation" className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"><X aria-hidden="true" className="h-5 w-5" /></button>
        </header>
        {submitted ? <div role="status" className="space-y-5">
          <CheckCircle2 aria-hidden="true" className="h-12 w-12 text-[#0F766E]" />
          <p className="text-base leading-relaxed text-gray-700">Thank you, {details.name.trim().split(' ')[0]}. Your consultation request has been submitted. The Legacy Hub team will contact you by {details.contactMethod === 'Email' ? 'email' : 'WhatsApp'} to discuss your needs and arrange a suitable time.</p>
          <p className="rounded-lg bg-[#F0FDFA] p-4 text-sm leading-relaxed text-[#134E4A]">This is a request, not a confirmed appointment. No payment is required to request the consultation.</p>
          <button type="button" onClick={onClose} className="min-h-12 w-full cursor-pointer rounded-lg bg-[#0F766E] px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-[#134E4A]">Done</button>
        </div> : <>
          <p className="mb-5 text-base leading-relaxed text-gray-700">Tell us what you need help with and how to reach you. Our team will contact you to arrange a time for your free consultation.</p>
          <form noValidate onSubmit={submit} className="space-y-4" aria-busy={sending}>
            {/* Honeypot field for spam bots */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={details.website || ''}
                onChange={event => update('website', event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="free-name" className="mb-2 block text-sm font-semibold">Full name (required)</label>
              <input id="free-name" name="name" autoComplete="name" required maxLength={100} disabled={sending} value={details.name} onChange={event => update('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'free-name-error' : undefined} placeholder="Kwame Mensah" className={inputClass} />
              {errors.name && <p id="free-name-error" className="mt-2 text-sm text-red-800">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="free-contact-method" className="mb-2 block text-sm font-semibold">How should we contact you?</label>
              <select id="free-contact-method" name="contactMethod" disabled={sending} value={details.contactMethod} onChange={event => { update('contactMethod', event.target.value as 'Email' | 'WhatsApp'); update('contact', '') }} className={inputClass}><option>Email</option><option>WhatsApp</option></select>
            </div>
            <div>
              <label htmlFor="free-contact" className="mb-2 block text-sm font-semibold">{details.contactMethod === 'Email' ? 'Email address' : 'WhatsApp number'} (required)</label>
              <input id="free-contact" name="contact" type={details.contactMethod === 'Email' ? 'email' : 'tel'} inputMode={details.contactMethod === 'Email' ? 'email' : 'tel'} autoComplete={details.contactMethod === 'Email' ? 'email' : 'tel'} spellCheck={false} required maxLength={100} disabled={sending} value={details.contact} onChange={event => update('contact', event.target.value)} aria-invalid={Boolean(errors.contact)} aria-describedby={errors.contact ? 'free-contact-error' : undefined} placeholder={details.contactMethod === 'Email' ? 'name@example.com' : '+233 50 123 4567'} className={inputClass} />
              {errors.contact && <p id="free-contact-error" className="mt-2 text-sm text-red-800">{errors.contact}</p>}
            </div>
            <div>
              <label htmlFor="free-service" className="mb-2 block text-sm font-semibold">What do you need help with? (required)</label>
              <select id="free-service" name="service" required disabled={sending} value={details.service} onChange={event => update('service', event.target.value)} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? 'free-service-error' : undefined} className={inputClass}><option value="">Choose a service</option>{consultationServices.map(service => <option key={service}>{service}</option>)}</select>
              {errors.service && <p id="free-service-error" className="mt-2 text-sm text-red-800">{errors.service}</p>}
            </div>
            <div>
              <label htmlFor="free-notes" className="mb-2 block text-sm font-semibold">Anything else we should know? (optional)</label>
              <textarea id="free-notes" name="notes" rows={2} maxLength={2000} disabled={sending} value={details.notes} onChange={event => update('notes', event.target.value)} placeholder="Your plans, questions, or preferred time zone." className={inputClass} />
            </div>
            <p className="text-sm leading-relaxed text-gray-600">We use these details to respond to your request. <Link to="/privacy" target="_blank" rel="noopener noreferrer" className="text-[#0F766E] underline">Privacy policy<span className="sr-only"> (opens in a new tab)</span></Link></p>
            <div aria-live="polite" aria-atomic="true">{failure && <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-900"><p>{failure}</p><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center font-semibold text-[#134E4A] underline">Contact on WhatsApp<span className="sr-only"> (opens in a new tab)</span></a></div>}</div>
            <button type="submit" disabled={sending} className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#0F766E] px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-[#134E4A] disabled:cursor-wait disabled:opacity-70">{sending ? <><Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" />Sending request…</> : failure ? 'Try again' : 'Request my free consultation'}</button>
            <p aria-live="polite" className="sr-only">{sending ? 'Sending your request.' : Object.values(errors).filter(Boolean).join(' ')}</p>
          </form>
        </>}
      </div>
    </PartnerDialog>
  )
}
