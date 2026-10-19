export interface FreeConsultationRequest {
  name: string
  contactMethod: 'Email' | 'WhatsApp'
  contact: string
  service: string
  notes: string
  website?: string
}

export const consultationServices = ['Relocation', 'Land acquisition', 'Building / construction', 'Help choosing a service']

export function validateFreeConsultation(details: FreeConsultationRequest) {
  const errors: Partial<Record<keyof FreeConsultationRequest, string>> = {}
  if (details.name.trim().length < 2) errors.name = 'Enter your full name.'
  const contact = details.contact.trim()
  if (details.contactMethod === 'Email') {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact)) errors.contact = 'Enter a valid email address, such as name@example.com.'
  } else {
    const digits = contact.replace(/\D/g, '')
    if (!/^\+?[\d\s().-]+$/.test(contact) || digits.length < 7 || digits.length > 15) errors.contact = 'Enter a WhatsApp number with 7–15 digits, including your country code.'
  }
  if (!consultationServices.includes(details.service)) errors.service = 'Choose what you need help with.'
  return errors
}

export async function sendFreeConsultation(details: FreeConsultationRequest) {
  const response = await fetch('https://formsubmit.co/ajax/asaapeesic@gmail.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    signal: AbortSignal.timeout(20000),
    body: JSON.stringify({
      _subject: `Free Consultation Request: ${details.service} - ${details.name.trim()}`,
      ...(details.contactMethod === 'Email' ? { _replyto: details.contact.trim() } : {}),
      'Client Name': details.name.trim(),
      'Preferred Contact Method': details.contactMethod,
      'Contact Details': details.contact.trim(),
      'Service Interest': details.service,
      'Additional Details': details.notes.trim() || 'No extra details provided',
      Date: new Date().toLocaleString(),
    }),
  })
  if (!response.ok) throw new Error('Request failed')
  const result = await response.json() as { success?: boolean | string }
  if (result.success !== true && result.success !== 'true') throw new Error('Request was not confirmed')
}
