import { Briefcase, Camera, Globe, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

const footerLinks = [
  { label: 'About Legacy Hub', to: '/about' },
  { label: 'Services', to: '/#services' },
  { label: 'Packages', to: '/packages' },
  { label: 'Building partners', to: '/partners' },
  { label: 'Project gallery', to: '/portfolio' },
]

export function Footer() {
  return (
    <footer className="focus-light border-t border-white/15 bg-[#073A36] py-16 text-white lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 border-b border-white/15 pb-14 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 100 100" className="h-11 w-11 text-white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="15" y="5" width="12" height="45" fill="currentColor" />
                <rect x="35" y="18" width="12" height="32" fill="currentColor" />
                <path d="M 55 5 L 85 5 L 85 17 L 67 17 L 67 38 L 75 38 L 75 25 L 85 25 L 85 50 L 55 50 Z" fill="#C7A85A" />
                <path d="M 50 56 L 10 72 L 22 72 L 22 95 L 78 95 L 78 72 L 90 72 Z M 32 78 L 42 78 L 42 88 L 32 88 Z M 58 78 L 68 78 L 68 88 L 58 88 Z" fillRule="evenodd" fill="currentColor" />
              </svg>
              <span translate="no" className="text-xl font-bold tracking-[-0.02em]">Legacy Hub</span>
            </div>
            <p className="mt-6 max-w-[38ch] text-sm leading-7 text-white/68">
              Ghana-based verification, relocation, and project oversight for clients living abroad.
            </p>
            <div className="mt-7 flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Legacy Hub on Instagram" className="flex h-11 w-11 items-center justify-center border border-white/25 text-white/75 transition-colors hover:border-white hover:text-white">
                <Camera aria-hidden="true" className="h-5 w-5" />
              </a>
              <a href="https://legacyhub.com" target="_blank" rel="noreferrer" aria-label="Legacy Hub website" className="flex h-11 w-11 items-center justify-center border border-white/25 text-white/75 transition-colors hover:border-white hover:text-white">
                <Globe aria-hidden="true" className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="Legacy Hub on LinkedIn" className="flex h-11 w-11 items-center justify-center border border-white/25 text-white/75 transition-colors hover:border-white hover:text-white">
                <Briefcase aria-hidden="true" className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-[#E3CC91]">Explore</h2>
            <ul className="mt-6 space-y-4">
              {footerLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-white/68 transition-colors hover:text-white">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-[#E3CC91]">Contact the team</h2>
            <ul className="mt-6 space-y-5 text-sm text-white/68">
              <li className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-white/45" />
                <span>McCarthy Hill, Accra, Ghana</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-white/45" />
                <span className="flex flex-col gap-2">
                  <a href="tel:+233502323196" className="hover:text-white">+233 50 232 3196</a>
                  <a href="tel:+233546808745" className="hover:text-white">+233 54 680 8745</a>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail aria-hidden="true" className="h-5 w-5 shrink-0 text-white/45" />
                <a href="mailto:asaapeesic@gmail.com" className="break-all hover:text-white">asaapeesic@gmail.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-[#E3CC91]">Start with the right package</h2>
            <p className="mt-6 text-sm leading-7 text-white/68">
              Compare support for visits, land acquisition, relocation, and ongoing construction monitoring.
            </p>
            <Link to="/packages" className="mt-7 inline-flex min-h-12 items-center justify-center bg-white px-5 py-3 text-sm font-semibold text-[#073A36] transition-colors hover:bg-[#F7FAF8]">
              Compare packages
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Legacy Growth &amp; Development Hub.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
