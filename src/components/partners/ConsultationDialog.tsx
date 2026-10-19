import { useState, useEffect } from 'react'
import { X, Send, Check, MessageSquare, Loader2 } from 'lucide-react'
import type { DeveloperPartner } from './data'
import { PartnerDialog } from './PartnerDialog'
import { sendConsultation, validateConsultation, type ConsultationDetails } from './consultation'

interface ConsultationDialogProps {
  selectedPartner: DeveloperPartner | null
  selectedDesignTitle: string
  onClose: () => void
}

const fields = [
  { name: 'name', label: 'Full name', type: 'text', autoComplete: 'name', placeholder: 'Kwame Mensah' },
  { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email', placeholder: 'name@example.com' },
  { name: 'phone', label: 'Phone / WhatsApp', type: 'tel', autoComplete: 'tel', placeholder: '+233 50 123 4567' },
] as const

export function ConsultationDialog({ selectedPartner, selectedDesignTitle, onClose }: ConsultationDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [failure, setFailure] = useState('')
  const [errors, setErrors] = useState<Partial<Record<keyof ConsultationDetails, string>>>({})
  const [formData, setFormData] = useState<ConsultationDetails>({ name: '', email: '', phone: '', notes: selectedDesignTitle ? `Inquiring about design: ${selectedDesignTitle}` : '' })
  const hasUnsavedDetails = Boolean(selectedPartner && !submitted && (isSubmitting || formData.name || formData.email || formData.phone))
  useEffect(() => {
    if (!hasUnsavedDetails) return
    const warn = (event: BeforeUnloadEvent) => event.preventDefault()
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [hasUnsavedDetails])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!selectedPartner || isSubmitting) return
    const nextErrors = validateConsultation(formData)
    setErrors(nextErrors)
    const firstError = Object.keys(nextErrors)[0]
    if (firstError) { document.getElementById(`partner-${firstError}`)?.focus(); return }
    
    // Honeypot trap: if filled by a bot, silently complete without sending
    if (formData.website) {
      setSubmitted(true)
      return
    }

    setFailure('')
    setIsSubmitting(true)
    try {
      await sendConsultation(selectedPartner.name, selectedDesignTitle, formData)
      setSubmitted(true)
    } catch {
      setFailure('We couldn’t confirm your request. Your details are still here. Try again or contact us on WhatsApp.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const whatsapp = `https://wa.me/233502323196?text=${encodeURIComponent(`Hello LegacyHub, I would like to consult on building partner "${selectedPartner?.name}"${selectedDesignTitle ? ` (Design: ${selectedDesignTitle})` : ''}.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nNotes: ${formData.notes || 'None'}`)}`
  return (
    <PartnerDialog open={Boolean(selectedPartner)} labelledBy="consultation-title" onClose={onClose}>
      {selectedPartner && <div className="p-5 sm:p-8">
        <header className="mb-6 flex items-start justify-between gap-3">
          <div>
            <p className="mb-2 text-sm font-semibold text-[#0F766E]">{submitted ? 'Request submitted' : 'Plan your project'}</p>
            <h2 id="consultation-title" className="font-serif text-2xl font-semibold leading-tight">{submitted ? 'Thank you for your enquiry' : `Consult with ${selectedPartner.name}`}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close consultation" className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"><X aria-hidden="true" className="h-5 w-5" /></button>
        </header>
        {!submitted ? <>
          {selectedDesignTitle && <p className="mb-4 rounded-lg border border-teal-200 bg-[#F0FDFA] p-3 text-sm leading-relaxed text-[#134E4A]">Selected design: <strong>{selectedDesignTitle}</strong></p>}
          <p className="mb-6 text-base leading-relaxed text-gray-700">Send your project details to the Legacy Hub team. We’ll follow up to discuss your requirements and coordinate the next steps with your chosen partner.</p>
          <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-busy={isSubmitting}>
            {/* Honeypot field for spam bots */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website || ''}
                onChange={event => setFormData(previous => ({ ...previous, website: event.target.value }))}
              />
            </div>
            {fields.map(field => <div key={field.name}>
              <label htmlFor={`partner-${field.name}`} className="mb-2 block text-sm font-semibold text-gray-900">{field.label} <span className="font-normal text-gray-600">(required)</span></label>
              <input id={`partner-${field.name}`} name={field.name} type={field.type} autoComplete={field.autoComplete} inputMode={field.name === 'phone' ? 'tel' : field.name === 'email' ? 'email' : 'text'} spellCheck={false} required maxLength={100} disabled={isSubmitting} value={formData[field.name]} onChange={event => { setFormData(previous => ({ ...previous, [field.name]: event.target.value })); setErrors(previous => ({ ...previous, [field.name]: undefined })) }} aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `partner-${field.name}-error` : undefined} placeholder={field.placeholder} className={`min-h-12 w-full rounded-lg border px-4 py-3 text-base text-gray-900 placeholder:text-gray-500 disabled:bg-gray-50 ${errors[field.name] ? 'border-red-700' : 'border-gray-400'}`} />
              {errors[field.name] && <p id={`partner-${field.name}-error`} className="mt-2 text-sm text-red-800">{errors[field.name]}</p>}
            </div>)}
            <div>
              <label htmlFor="partner-notes" className="mb-2 block text-sm font-semibold">Project details <span className="font-normal text-gray-600">(optional)</span></label>
              <textarea id="partner-notes" name="notes" rows={3} maxLength={3000} disabled={isSubmitting} value={formData.notes} onChange={event => setFormData(previous => ({ ...previous, notes: event.target.value }))} placeholder="Tell us about your location, project, and preferred timeline." className="w-full rounded-lg border border-gray-400 px-4 py-3 text-base text-gray-900 placeholder:text-gray-500 disabled:bg-gray-50" />
            </div>
            <p className="text-sm leading-relaxed text-gray-600">Your details are used to respond to this enquiry. <a href={`${import.meta.env.BASE_URL}privacy`} target="_blank" rel="noopener noreferrer" className="font-medium text-[#0F766E] underline underline-offset-2">Privacy policy (opens in a new tab)</a></p>
            <div aria-live="polite" aria-atomic="true">
              {failure && <div className="rounded-lg border border-red-200 bg-red-50 p-4"><p className="text-sm leading-relaxed text-red-900">{failure}</p><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-[#134E4A] underline">Contact on WhatsApp <span className="sr-only">(opens in a new tab)</span></a></div>}
            </div>
            <button type="submit" disabled={isSubmitting} className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#0F766E] px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-[#134E4A] disabled:cursor-wait disabled:opacity-70">{isSubmitting ? <><Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" />Sending request…</> : <><Send aria-hidden="true" className="h-4 w-4" />{failure ? 'Try again' : 'Send consultation request'}</>}</button>
            <p className="sr-only" aria-live="polite">{isSubmitting ? 'Sending your consultation request.' : Object.values(errors).filter(Boolean).join(' ')}</p>
          </form>
        </> : <div role="status" className="space-y-5">
          <Check aria-hidden="true" className="h-10 w-10 text-[#0F766E]" />
          <p className="text-base leading-relaxed text-gray-700">Thank you, {formData.name.trim().split(' ')[0]}. Your enquiry about <strong>{selectedPartner.name}</strong> was submitted successfully. The Legacy Hub team will follow up using your contact details.</p>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-base font-semibold text-[#052E16] transition-colors hover:bg-[#20bd5a]"><MessageSquare aria-hidden="true" className="h-5 w-5" />Continue on WhatsApp <span className="sr-only">(opens in a new tab)</span></a>
          <button type="button" onClick={onClose} className="min-h-12 w-full cursor-pointer rounded-lg border border-gray-300 px-5 py-3 text-base font-medium transition-colors hover:bg-gray-50">Back to partners</button>
        </div>}
      </div>}
    </PartnerDialog>
  )
}
