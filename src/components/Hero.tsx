import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Pause, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FreeConsultationDialog } from './FreeConsultationDialog'

const images = [
  { src: `${import.meta.env.BASE_URL}hero_ghana_home.webp`, alt: "Modern villa with a pool and tropical garden at sunset in Ghana" },
  { src: `${import.meta.env.BASE_URL}hero_ghana_beach.webp`, alt: "Pristine oceanfront coastline with luxury beachfront villas in Ghana" }
]

export function Hero() {
  const [consultation, setConsultation] = useState({ open: false, requestId: 0 })
  const [currentImage, setCurrentImage] = useState(0)
  // The slideshow starts paused for people who ask their device for reduced motion
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [paused])

  return (
    <section id="home" className="focus-light relative h-[100dvh] lg:h-[92dvh] min-h-[600px] lg:min-h-[640px] max-h-[880px] overflow-hidden bg-white w-full">
      {/* Full-bleed Background Images */}
      <div className="absolute inset-x-2 top-2 bottom-2 rounded-3xl overflow-hidden z-0">
        <AnimatePresence mode="popLayout">
          <motion.img 
            key={currentImage}
            src={images[currentImage].src}
            alt={images[currentImage].alt}
            width={1024}
            height={1024}
            fetchPriority="high"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>
        
        {/* Directional Contrast Scrims for Left-Aligned Layout (WCAG AAA) */}
        {/* 1. Left-to-right gradient: deep contrast for typography on the left, clear view of photography on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/55 md:via-stone-950/45 to-transparent z-10 pointer-events-none" />

        {/* 2. Top-down gradient: protects transparent navbar */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-stone-950/70 via-stone-950/20 to-transparent z-10 pointer-events-none" />

        {/* 3. Bottom-up gradient: grounds slideshow controls */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent z-10 pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between pt-24 md:pt-28 lg:pt-32 pb-8 sm:pb-10 px-6 sm:px-10 lg:px-16 max-w-[1400px] mx-auto w-full">
        
        {/* Left-Aligned Headline & Supporting Copy */}
        <div className="flex flex-col items-start text-left mt-4 md:mt-8 lg:mt-10 w-full max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-white tracking-tight leading-[1.1] drop-shadow-[0_4px_20px_rgba(0,0,0,0.65)] mb-4 md:mb-5 text-balance"
          >
            Build and Invest in Ghana with Complete Peace of Mind.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-stone-100 text-base sm:text-lg md:text-xl font-sans font-normal leading-relaxed max-w-2xl mb-6 md:mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] text-pretty"
          >
            Verified land acquisition, legal oversight, and real-time site updates—managed on the ground while you’re abroad.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-start items-stretch sm:items-center w-full sm:w-auto"
          >
            <button 
              type="button" 
              onClick={() => setConsultation(previous => ({ open: true, requestId: previous.requestId + 1 }))} 
              aria-haspopup="dialog" 
              className="flex items-center justify-between sm:justify-start gap-3 bg-[#0F766E] text-white hover:bg-[#134E4A] transition-colors duration-300 pl-6 pr-2 py-2.5 rounded-full text-base font-medium group shadow-xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
            >
              Request a free consultation
              <div className="w-8 h-8 rounded-full bg-white text-[#0F766E] flex items-center justify-center group-hover:bg-[#E8F0F3] transition-colors shrink-0">
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </div>
            </button>
            
            <Link 
              to="/packages" 
              className="flex items-center justify-center gap-3 bg-stone-900/40 hover:bg-stone-900/60 backdrop-blur-md border border-white/30 text-white transition-colors duration-300 px-8 py-2.5 rounded-full text-base font-medium shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
            >
              View Packages
            </Link>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between w-full items-end mb-2">
          {/* Slideshow Control */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex items-center gap-3 bg-stone-950/40 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full"
          >
            <button
              type="button"
              onClick={() => setPaused(!paused)}
              aria-label={paused ? 'Play Slideshow' : 'Pause Slideshow'}
              className="w-9 h-9 shrink-0 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/25 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {paused ? <Play className="w-4 h-4" aria-hidden="true" /> : <Pause className="w-4 h-4" aria-hidden="true" />}
            </button>

            <div className="flex items-center gap-1.5 px-1" role="tablist" aria-label="Hero slide switcher">
              {images.map((img, idx) => (
                <button
                  key={img.src}
                  type="button"
                  role="tab"
                  aria-selected={currentImage === idx}
                  aria-label={`Slide ${idx + 1}`}
                  onClick={() => setCurrentImage(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    currentImage === idx ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <FreeConsultationDialog key={consultation.requestId} open={consultation.open} onClose={() => setConsultation(previous => ({ ...previous, open: false }))} />
    </section>
  )
}



