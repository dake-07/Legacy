import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, Suspense, lazy } from 'react'
import { MotionConfig } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { CookieConsent } from './components/CookieConsent'

const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })))
const PackagesPage = lazy(() => import('./pages/PackagesPage').then(module => ({ default: module.PackagesPage })))
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })))
const PortfolioPage = lazy(() => import('./pages/PortfolioPage').then(module => ({ default: module.PortfolioPage })))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(module => ({ default: module.PrivacyPolicyPage })))
const TermsPage = lazy(() => import('./pages/TermsPage').then(module => ({ default: module.TermsPage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })))

// Utility component to scroll to top on route change, or to the #section in the URL
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // Pages are lazy-loaded, so wait for the target section to render
    let attempts = 0;
    const timer = setInterval(() => {
      const target = document.getElementById(hash.slice(1));
      if (target || ++attempts > 20) {
        clearInterval(timer);
        target?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    return () => clearInterval(timer);
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
