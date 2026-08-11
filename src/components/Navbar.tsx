import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  
  // Update scrolled state based on pathname or scroll
  useEffect(() => {
    if (location.pathname !== '/') {
      setIsScrolled(true)
    } else {
      setIsScrolled(window.scrollY > 10)
    }
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/') {
        setIsScrolled(window.scrollY > 10)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-8 ${isScrolled ? 'pt-4 pb-4 bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-200' : 'pt-6'}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo (Left) */}
        <Link to="/" className="flex items-center space-x-3 group cursor-pointer w-48">
          <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <svg viewBox="0 0 100 100" className={`w-full h-full drop-shadow-md ${isScrolled ? 'text-[#134E4A]' : 'text-[#0F766E]'}`} xmlns="http://www.w3.org/2000/svg">
              <rect x="15" y="5" width="12" height="45" fill="currentColor" />
              <rect x="35" y="18" width="12" height="32" fill="currentColor" />
              <path d="M 55 5 L 85 5 L 85 17 L 67 17 L 67 38 L 75 38 L 75 25 L 85 25 L 85 50 L 55 50 Z" fill="currentColor" />
              <path 
                d="M 50 56 L 10 72 L 22 72 L 22 95 L 78 95 L 78 72 L 90 72 Z M 32 78 L 42 78 L 42 88 L 32 88 Z M 58 78 L 68 78 L 68 88 L 58 88 Z" 
                fillRule="evenodd" 
                fill="currentColor" 
              />
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <div className={`font-bold text-lg leading-[0.9] font-sans tracking-tight ${isScrolled ? 'text-[#134E4A]' : 'text-white'}`}>
              LegacyHub
            </div>
          </div>
        </Link>

        {/* Center Pill Navigation (Desktop) */}
        <div className={`hidden md:flex items-center justify-center backdrop-blur-xl rounded-full px-2 py-1.5 transition-all duration-500 ${isScrolled ? 'bg-white border border-gray-100' : 'bg-white/20 border border-white/30'}`}>
          <Link to="/" className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${isScrolled ? 'bg-[#0F766E] text-white hover:bg-[#134E4A] shadow-sm' : 'bg-white text-[#134E4A] hover:bg-gray-50'}`}>Home</Link>
          <Link to="/packages" className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${isScrolled ? 'text-gray-500 hover:text-[#134E4A] hover:bg-gray-100/50' : 'text-white hover:text-white hover:bg-white/10'}`}>Packages</Link>
          <Link to="/portfolio" className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${isScrolled ? 'text-gray-500 hover:text-[#134E4A] hover:bg-gray-100/50' : 'text-white hover:text-white hover:bg-white/10'}`}>Portfolio</Link>
          <Link to="/about" className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${isScrolled ? 'text-gray-500 hover:text-[#134E4A] hover:bg-gray-100/50' : 'text-white hover:text-white hover:bg-white/10'}`}>About</Link>
        </div>

        {/* Right CTA (Desktop) */}
        <div className="hidden md:flex justify-end w-48">
          <button 
            onClick={() => navigate('/packages')}
            className={`flex items-center gap-3 backdrop-blur-md rounded-full text-sm font-medium group transition-all duration-300 pl-6 pr-2 py-2 ${
              isScrolled 
                ? 'bg-[#0F766E] text-white border border-[#0F766E] hover:bg-[#134E4A] shadow-sm' 
                : 'bg-white/20 border border-white/30 text-white hover:bg-white hover:text-[#134E4A]'
            }`}
          >
            Book now
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isScrolled ? 'bg-white text-[#0F766E] group-hover:bg-[#E8F0F3]' : 'bg-white text-[#134E4A] group-hover:bg-gray-100'
            }`}>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <button 
          className={`md:hidden w-10 h-10 flex items-center justify-center backdrop-blur-md rounded-full border ${
            isScrolled ? 'text-[#134E4A] bg-white border-gray-100' : 'text-white bg-white/20 border-white/30'
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-6 flex flex-col space-y-5 md:hidden"
          >
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold text-[#134E4A] hover:text-[#0F766E] transition-colors">Home</Link>
            <Link to="/packages" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-gray-600 hover:text-[#134E4A] transition-colors">Packages</Link>
            <Link to="/portfolio" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-gray-600 hover:text-[#134E4A] transition-colors">Portfolio</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-gray-600 hover:text-[#134E4A] transition-colors">About</Link>
            <button onClick={() => { setMobileMenuOpen(false); navigate('/packages'); }} className="w-full flex items-center justify-center gap-2 bg-[#0F766E] text-white py-3.5 rounded-full mt-4 font-bold shadow-lg hover:bg-[#134E4A] transition-colors">
              Book now <ArrowUpRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
