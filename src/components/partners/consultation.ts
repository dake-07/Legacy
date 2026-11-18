import { submitToWeb3Forms } from '../../lib/web3forms'

export interface ConsultationDetails {
  name: string
  email: string
  phone: string
  notes: string
  website?: string
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
  await submitToWeb3Forms({
    subject: `Building Partner Consultation Request: ${partnerName} - ${details.name.trim()}`,
    name: details.name.trim(),
    email: details.email.trim(),
    phone: details.phone.trim(),
    'Selected Builder / Designer': partnerName,
    'Specific Design': designTitle || 'General Consultation',
    'Client Name': details.name.trim(),
    'Client Email': details.email.trim(),
    'Client Phone / WhatsApp': details.phone.trim(),
    'Project Notes': details.notes.trim() || 'No extra notes provided',
    Date: new Date().toLocaleString(),
    botcheck: details.website || ''
  })
}

