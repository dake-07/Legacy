import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'

const safeGetStorage = (key: string): string | null => {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

const safeSetStorage = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Gracefully ignore storage restriction in strict private/incognito modes
  }
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = safeGetStorage('legacy_cookie_consent')
    if (!consent) {
      // Short delay before showing so it does not distract from initial render
      const timer = setTimeout(() => setIsVisible(true), 1200)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleChoice = (preference: 'all' | 'essential') => {
    safeSetStorage('legacy_cookie_consent', preference)
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
          transition={{ duration: 0.2, ease: 'easeOut' }}
          role="region"
          aria-label="Cookie preferences"
          className="fixed bottom-4 left-4 right-4 z-50 border border-[#BFCFC8] bg-white p-5 font-sans text-[#111815] shadow-lg md:bottom-6 md:left-auto md:right-6 md:max-w-md"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <Cookie className="h-5 w-5 shrink-0 text-[#0B554E]" aria-hidden="true" />
              <h2 className="text-base font-semibold text-[#111815]">Your privacy choices</h2>
            </div>
            <button
              onClick={() => handleChoice('essential')}
              aria-label="Close cookie banner and use essential only"
              className="cursor-pointer p-2 text-[#6A7772] transition-colors hover:text-[#111815]"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed mb-5">
            We use essential cookies to maintain site functionality and performance metrics to improve our diaspora services. Read our{' '}
            <Link to="/privacy" className="font-semibold text-[#0B554E] underline underline-offset-2 hover:text-[#073A36]">
              privacy policy
            </Link>.
          </p>

          <div className="flex items-center gap-3 justify-end">
            <button
              onClick={() => handleChoice('essential')}
              className="min-h-11 cursor-pointer border border-[#BFCFC8] bg-white px-4 py-2 text-xs font-semibold text-[#37453F] transition-colors hover:border-[#0B554E]"
            >
              Essential only
            </button>
            <button
              onClick={() => handleChoice('all')}
              className="min-h-11 cursor-pointer bg-[#0B554E] px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#073A36]"
            >
              Accept all
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
