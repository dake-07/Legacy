import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, Shield } from 'lucide-react'

export function PrivacyPolicyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Legacy Growth & Development Hub</title>
        <meta 
          name="description" 
          content="Privacy Policy for Legacy Growth & Development Hub. How we collect, safeguard, and process client information for relocation and property services." 
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
                <Shield className="w-6 h-6 text-[#0F766E]" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-[#0F766E] uppercase">Legal</span>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Privacy Policy</h1>
              </div>
            </div>

            <p className="text-xs text-gray-500 mb-8 font-sans">
              Last updated: October 2026 • Effective Date: October 2026
            </p>

            <div className="space-y-8 text-gray-700 font-sans leading-relaxed">
              <section>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">1. Overview</h2>
                <p>
                  Legacy Growth and Development Hub (&ldquo;LegacyHub,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy. This policy outlines how we collect, store, and process your personal information when you use our website, book consultations, or utilize our relocation, land acquisition, and construction monitoring services in Ghana.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">2. Information We Collect</h2>
                <p className="mb-2">We collect information directly from you when you submit booking inquiries or contact our team:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Contact Details:</strong> Full name, email address, phone number, and residential city/country.</li>
                  <li><strong>Consultation Requests:</strong> Specific package preferences, travel dates, property inspection goals, or investment criteria.</li>
                  <li><strong>Transaction Records:</strong> Payment references and proof of deposits (we do not store raw credit card numbers on our servers).</li>
                  <li><strong>Technical Data:</strong> Non-personally identifiable browser analytics, IP address, device type, and visit duration.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
                <p className="mb-2">Your information is used strictly to provide professional support:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>To schedule and coordinate airport pickups, chauffeur services, and lodging check-in.</li>
                  <li>To verify land titles, coordinate with licensed Ghanaian surveyors, and engage verified legal counsel on your behalf.</li>
                  <li>To deliver weekly construction progress reports, photos, and inspection updates.</li>
                  <li>To communicate service updates and invoice information.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">4. Information Sharing & Third Parties</h2>
                <p>
                  We never sell, rent, or trade your personal data. Information is shared only with verified partners strictly necessary to execute your requested services (e.g., licensed Ghanaian legal counsel, certified land surveyors, and banking institutions for transaction verification).
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">5. Data Retention & Security</h2>
                <p>
                  We implement industry-standard administrative and electronic safeguards to protect client records and property documentation against unauthorized access, loss, or disclosure.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">6. Cookies & Tracking Technologies</h2>
                <p>
                  Our website uses essential functional cookies and aggregate analytics to ensure smooth page performance and navigation. You can manage or decline non-essential cookies at any time via our Cookie Consent banner.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">7. Your Rights</h2>
                <p>
                  Under international data protection regulations (including GDPR and Ghana Data Protection Act 2012), you have the right to request access to, correction of, or deletion of your personal records at any time by contacting our data team.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-3">8. Contact Us</h2>
                <p>
                  For privacy questions, data requests, or compliance inquiries, please email us at{' '}
                  <a href="mailto:asaapeesic@gmail.com" className="text-[#0F766E] font-semibold hover:underline">
                    asaapeesic@gmail.com
                  </a>{' '}
                  or phone <span className="tabular-nums">+233&nbsp;50&nbsp;232&nbsp;3196</span>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
