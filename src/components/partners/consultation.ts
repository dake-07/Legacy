export interface ConsultationDetails {
  name: string
  email: string
  phone: string
  notes: string
}

export function validateConsultation(details: ConsultationDetails) {
  const errors: Partial<Record<keyof ConsultationDetails, string>> = {}
  if (details.name.trim().length < 2) errors.name = 'Enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(details.email.trim())) errors.email = 'Enter a valid email address, such as name@example.com.'
  const phone = details.phone.trim()
  const digits = phone.replace(/\D/g, '')
  if (!/^\+?[\d\s().-]+$/.test(phone) || digits.length < 7 || digits.length > 15) errors.phone = 'Enter a phone number with 7–15 digits, including your country code.'
  return errors
}

export async function sendConsultation(partnerName: string, designTitle: string, details: ConsultationDetails) {
  const response = await fetch('https://formsubmit.co/ajax/asaapeesic@gmail.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    signal: AbortSignal.timeout(20000),
    body: JSON.stringify({
      _subject: `Building Partner Consultation Request: ${partnerName} - ${details.name.trim()}`,
      _replyto: details.email.trim(),
      'Selected Builder / Designer': partnerName,
      'Specific Design': designTitle || 'General Consultation',
      'Client Name': details.name.trim(),
      'Client Email': details.email.trim(),
      'Client Phone / WhatsApp': details.phone.trim(),
      'Project Notes': details.notes.trim() || 'No extra notes provided',
      Date: new Date().toLocaleString(),
    }),
  })
  if (!response.ok) throw new Error('Submission failed')
  const result = await response.json() as { success?: boolean | string }
  if (result.success !== true && result.success !== 'true') throw new Error('Submission was not confirmed')
}
