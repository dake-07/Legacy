import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Packages', path: '/packages' },
  { label: 'Partners', path: '/partners' },
  { label: 'Gallery', path: '/portfolio' },
  { label: 'About', path: '/about' },
]

export function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(() => window.scrollY > 10)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const solid = location.pathname !== '/' || hasScrolled

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        setHasScrolled(window.scrollY > 10)
        ticking = false
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  const prefetchRoute = (path: string) => {
    if (path === '/packages') import('../pages/PackagesPage')
    else if (path === '/partners') import('../pages/PartnersPage')
    else if (path === '/portfolio') import('../pages/PortfolioPage')
    else if (path === '/about') import('../pages/AboutPage')
  }

  return (
    <nav
      aria-label="Primary navigation"
      className={`fixed inset-x-0 top-0 z-50 px-5 transition-[background-color,border-color,padding] duration-200 sm:px-8 lg:px-12 ${solid ? 'border-b border-[#DDE5E1] bg-[#F7FAF8]/95 py-3 backdrop-blur-lg' : 'py-5 focus-light'}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
        <Link to="/" aria-label="Legacy Hub home" className="flex shrink-0 items-center gap-3">
          <svg
            viewBox="0 0 100 100"
            className={`h-10 w-10 ${solid ? 'text-[#0B554E]' : 'text-white'}`}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect x="15" y="5" width="12" height="45" fill="currentColor" />
            <rect x="35" y="18" width="12" height="32" fill="currentColor" />
            <path d="M 55 5 L 85 5 L 85 17 L 67 17 L 67 38 L 75 38 L 75 25 L 85 25 L 85 50 L 55 50 Z" fill="currentColor" />
            <path d="M 50 56 L 10 72 L 22 72 L 22 95 L 78 95 L 78 72 L 90 72 Z M 32 78 L 42 78 L 42 88 L 32 88 Z M 58 78 L 68 78 L 68 88 L 58 88 Z" fillRule="evenodd" fill="currentColor" />
          </svg>
          <span translate="no" className={`text-lg font-bold tracking-[-0.02em] ${solid ? 'text-[#073A36]' : 'text-white'}`}>
            Legacy Hub
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map(link => {
            const active = location.pathname === link.path || (link.path === '/portfolio' && location.pathname === '/gallery')
            return (
              <Link
                key={link.path}
                to={link.path}
                aria-current={active ? 'page' : undefined}
                onMouseEnter={() => prefetchRoute(link.path)}
                onTouchStart={() => prefetchRoute(link.path)}
                className={`border-b py-2 text-sm font-medium transition-colors ${active ? (solid ? 'border-[#0B554E] text-[#073A36]' : 'border-white text-white') : (solid ? 'border-transparent text-[#52615B] hover:text-[#073A36]' : 'border-transparent text-white/75 hover:text-white')}`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        <Link
          to="/packages"
          onMouseEnter={() => prefetchRoute('/packages')}
          onTouchStart={() => prefetchRoute('/packages')}
          className={`hidden min-h-11 items-center justify-center border px-5 py-2.5 text-sm font-semibold transition-colors md:inline-flex ${solid ? 'border-[#0B554E] bg-[#0B554E] text-white hover:bg-[#073A36]' : 'border-white/55 bg-white text-[#073A36] hover:bg-[#F7FAF8]'}`}
        >
          View packages
        </Link>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(open => !open)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          className={`flex h-11 w-11 cursor-pointer items-center justify-center border md:hidden ${solid ? 'border-[#BFCFC8] text-[#073A36]' : 'border-white/45 text-white'}`}
        >
          {mobileMenuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16 }}
            className="absolute left-4 right-4 top-full mt-2 border border-[#BFCFC8] bg-[#F7FAF8] p-5 shadow-lg md:hidden"
          >
            <div className="flex flex-col">
              {navLinks.map(link => {
                const active = location.pathname === link.path || (link.path === '/portfolio' && location.pathname === '/gallery')
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    aria-current={active ? 'page' : undefined}
                    onTouchStart={() => prefetchRoute(link.path)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`border-b border-[#DDE5E1] py-3 text-base ${active ? 'font-semibold text-[#0B554E]' : 'text-[#37453F]'}`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <Link
                to="/packages"
                onTouchStart={() => prefetchRoute('/packages')}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-5 min-h-12 bg-[#0B554E] px-5 py-3 text-center font-semibold text-white"
              >
                View packages
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
