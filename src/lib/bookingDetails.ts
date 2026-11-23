export const bookingContact = {
  bank: 'CBG',
  accountName: 'Legacy Growth and Development Hub',
  accountNumber: '2537968640001',
  branch: 'Manet Tower',
  mobileNumber: '050 232 3196',
  mobileName: 'Peter Asare / Legacy Growth and Development Hub',
  whatsapp: '233502323196',
  email: 'asaapeesic@gmail.com',
} as const

export function paymentInstructions(packageName: string) {
  if (packageName === 'Land Acquisition Support Package') {
    return 'The listed USD amount is a minimum service fee. Contact Legacy Hub to confirm the final fee before paying in full. Your request does not purchase land.'
  }
  if (packageName === 'Construction Monitoring Package') {
    return 'Pay the first month’s USD 100 fee in full. Monitoring is billed monthly; this request does not set up automatic recurring payments.'
  }
  return 'Pay the full package fee in USD. Your booking is confirmed after Legacy Hub verifies payment and agrees the service dates with you.'
}
