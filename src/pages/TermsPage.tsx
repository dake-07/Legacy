import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, FileText } from 'lucide-react'

export function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | Legacy Growth & Development Hub</title>
        <meta 
          name="description" 
          content="Terms and Conditions for Legacy Growth & Development Hub. Service terms, payment policies, and engagement standards for diaspora relocation and land acquisition." 
        />
      </Helmet>

      <div className="pt-28 pb-20 bg-[#F0FDFA] min-h-screen">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F766E] hover:text-[#134E4A] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to Home
          </Link>

          <div className="bg-white rounded-[2rem] p-8 md:p-14 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0F766E]/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#0F766E]" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-[#0F766E] uppercase">Legal</span>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Terms & Conditions</h1>
              </div>
            </div>

            <p className="text-xs text-gray-500 mb-8 font-sans">
              Last updated: October 2026 • Effective Date: October 2026
            </p>

            <div className="space-y-8 text-gray-700 font-sans leading-relaxed">
              <section>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">1. Agreement to Terms</h2>
                <p>
                  By accessing our website or retaining Legacy Growth and Development Hub (&ldquo;LegacyHub,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) for relocation, land verification, or construction management services, you agree to comply with and be bound by these Terms and Conditions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">2. Scope of Services</h2>
                <p className="mb-2">LegacyHub acts as your verified on-the-ground concierge and project coordinator in Ghana:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Arrival & Visit Packages:</strong> Airport reception, transportation, temporary accommodations coordination, and guided site visits.</li>
                  <li><strong>Land Acquisition Support:</strong> Land sourcing, preliminary title checks, surveyor coordination, and liaison with licensed Ghanaian real estate attorneys.</li>
                  <li><strong>Construction Monitoring:</strong> Weekly photographic inspections, contractor milestone verification, and material delivery logs.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">3. Professional Legal Disclaimer</h2>
                <p>
                  While LegacyHub works closely with vetted licensed attorneys and traditional authorities, LegacyHub itself is a concierge and project management agency. All legal conveyancing, title indentures, and court searches are formally executed by licensed members of the Ghana Bar Association.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">4. Fees, Retainers & Payments</h2>
                <p className="mb-2">
                  Service packages require initial deposit confirmation prior to field mobilization.
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Deposits can be executed via verified bank transfer (Republic Bank Ghana) or MTN Mobile Money.</li>
                  <li>All invoices and pricing are quoted in USD or equivalent Ghanaian Cedis (GHS) at prevailing commercial exchange rates.</li>
                  <li>Monthly construction monitoring subscriptions are billed at the beginning of each 30-day inspection cycle.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">5. Client Responsibilities</h2>
                <p>
                  Clients agree to provide accurate identification, timely travel details, and authentic documentation for legal processing. LegacyHub is not liable for project delays caused by government agency backlogs (e.g., Lands Commission processing cycles) or inaccurate client disclosures.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">6. Cancellation & Refunds</h2>
                <p>
                  Notice of cancellation for arrival or visit packages must be submitted at least 72 hours before scheduled airport arrival for a partial refund (less administrative and reservation costs). Completed search fees, surveyor mobilizations, and government filing expenses are non-refundable.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">7. Governing Law</h2>
                <p>
                  These Terms are governed by and construed in accordance with the laws of the Republic of Ghana. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Accra, Ghana.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">8. Inquiries & Notices</h2>
                <p>
                  Formal legal notices or questions regarding service engagements should be directed to{' '}
                  <a href="mailto:asaapeesic@gmail.com" className="text-[#0F766E] font-semibold hover:underline">
                    asaapeesic@gmail.com
                  </a>{' '}
                  or by visiting our office at McCarthy Hill, Accra, Ghana.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
