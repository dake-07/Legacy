import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('legacy_cookie_consent')
    if (!consent) {
      // Short delay before showing so it does not distract from initial render
      const timer = setTimeout(() => setIsVisible(true), 1200)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleChoice = (preference: 'all' | 'essential') => {
    localStorage.setItem('legacy_cookie_consent', preference)
    setIsVisible(false)
    if (preference === 'all') {
      window.dispatchEvent(new CustomEvent('cookie_consent_granted'))
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          role="region"
          aria-label="Cookie preferences"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50 bg-white/95 backdrop-blur-xl border border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-3xl p-6 font-sans text-gray-800"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0F766E]/10 flex items-center justify-center shrink-0">
                <Cookie className="w-5 h-5 text-[#0F766E]" aria-hidden="true" />
              </div>
              <h2 className="text-base font-serif font-bold text-gray-900">Your Privacy Choices</h2>
            </div>
            <button
              onClick={() => handleChoice('essential')}
              aria-label="Close cookie banner and use essential only"
              className="text-gray-400 hover:text-gray-700 p-1 rounded-full transition-colors"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed mb-5">
            We use essential cookies to maintain site functionality and performance metrics to improve our diaspora services. Read our{' '}
            <Link to="/privacy" className="text-[#0F766E] font-semibold underline hover:text-[#134E4A]">
              Privacy Policy
            </Link>.
          </p>

          <div className="flex items-center gap-3 justify-end">
            <button
              onClick={() => handleChoice('essential')}
              className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
            >
              Essential Only
            </button>
            <button
              onClick={() => handleChoice('all')}
              className="px-5 py-2 text-xs font-bold text-white bg-[#0F766E] hover:bg-[#134E4A] rounded-full shadow-md transition-colors cursor-pointer"
            >
              Accept All
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
