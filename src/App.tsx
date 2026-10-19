import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useLayoutEffect, useRef, Suspense, lazy } from 'react'
import { MotionConfig } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { CookieConsent } from './components/CookieConsent'

const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })))
const PackagesPage = lazy(() => import('./pages/PackagesPage').then(module => ({ default: module.PackagesPage })))
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })))
const PortfolioPage = lazy(() => import('./pages/PortfolioPage').then(module => ({ default: module.PortfolioPage })))
const PartnersPage = lazy(() => import('./pages/PartnersPage').then(module => ({ default: module.PartnersPage })))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(module => ({ default: module.PrivacyPolicyPage })))
const TermsPage = lazy(() => import('./pages/TermsPage').then(module => ({ default: module.TermsPage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })))

// Utility component to handle instant scroll resets across page routes
// and smooth scrolling for in-page anchors
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const prevPathnameRef = useRef(pathname);

  // Disable browser automatic scroll restoration to prevent jitter across SPA route changes
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    const isNewPage = prevPathnameRef.current !== pathname;
    prevPathnameRef.current = pathname;

    if (!hash) {
      // Instant reset to top on page change before the browser paints
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    const targetId = hash.slice(1);

    if (isNewPage) {
      // When navigating to a new page with a hash (e.g. /about#team from another page):
      // Immediately reset to top first so it NEVER starts at the bottom of the previous page
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

      // Poll until the lazy-loaded section mounts, then jump directly to it
      let attempts = 0;
      const timer = setInterval(() => {
        const target = document.getElementById(targetId);
        if (target) {
          clearInterval(timer);
          target.scrollIntoView({ behavior: 'instant' });
        } else if (++attempts > 30) {
          clearInterval(timer);
        }
      }, 30);

      return () => clearInterval(timer);
    } else {
      // In-page anchor click (e.g. clicking an anchor while already on the same page)
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-white focus:text-[#134E4A] focus:font-semibold focus:px-5 focus:py-3 focus:rounded-full focus:shadow-lg"
      >
        Skip to Main Content
      </a>
      <div className="min-h-screen font-sans selection:bg-[#0F766E] selection:text-white flex flex-col">
        <Navbar />
        <main id="main" tabIndex={-1} className="flex-grow focus:outline-none">
          <Suspense fallback={<div className="flex h-[50vh] items-center justify-center">Loading…</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/packages" element={<PackagesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <CookieConsent />
      </div>
      </MotionConfig>
    </BrowserRouter>
  )
}

export default App
