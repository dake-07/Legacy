import { submitToWeb3Forms } from './web3forms'

export interface PackageBookingRequest {
  requestId: string
  packageName: string
  name: string
  email: string
  phone: string
  address: string
  website: string
}

export interface PackageBookingResult {
  success: true
  reference?: string
  emailQueued: boolean
  price?: string
}

export async function requestPackage(details: PackageBookingRequest, displayedPrice: string): Promise<PackageBookingResult> {
  const response = await fetch(`${import.meta.env.BASE_URL}api/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(details),
    signal: AbortSignal.timeout(22000),
  })
  const isJson = response.headers.get('Content-Type')?.includes('application/json')
  const result = isJson ? await response.json() : null

  // Retain owner notifications during initial secret setup, but never fall back
  // after a timeout or provider error: the first email batch might already be queued.
  if ((response.status === 503 && result?.code === 'EMAIL_NOT_CONFIGURED') ||
      (import.meta.env.DEV && (!isJson || response.status === 404))) {
    await submitToWeb3Forms({
      subject: `New Booking Request: ${details.packageName} - ${details.name}`,
      name: details.name,
      email: details.email,
      phone: details.phone,
      'Package Name': details.packageName,
      'Package Price': displayedPrice,
      'Client Location': details.address,
      botcheck: details.website,
    })
    return { success: true, emailQueued: false }
  }
  if (!response.ok || result?.success !== true) {
    throw new Error(result?.message || 'We could not confirm your request. Try again or contact the team via WhatsApp.')
  }
  if (result.emailQueued && (typeof result.reference !== 'string' || typeof result.price !== 'string')) {
    throw new Error('We could not confirm the request reference. Contact the team before paying.')
  }
  return result as PackageBookingResult
}
