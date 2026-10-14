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
    <section id="home" className="focus-light relative h-screen min-h-[900px] overflow-hidden bg-white w-full">
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
        
        {/* Overlay for baseline legibility without color tint */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
      </div>

      {/* Main Content Area */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between pt-28 md:pt-32 pb-8 px-4 lg:px-12 max-w-[1400px] mx-auto w-full">
        
        {/* Top Centered Text */}
        <div className="flex flex-col items-center text-center mt-12 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs tracking-widest font-bold uppercase mb-6 shadow-sm"
          >
            PREMIUM RELOCATION, LAND & PROPERTY SUPPORT IN GHANA
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-7xl font-sans font-medium text-white tracking-tight leading-[1.1] max-w-5xl drop-shadow-xl mb-4 md:mb-6"
          >
            Move, Invest, & Build in Ghana Without the Stress or Scams.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white/90 text-lg md:text-xl font-sans leading-relaxed max-w-3xl mb-8 md:mb-10 drop-shadow-md"
          >
            From airport arrival and legal setup to verified land acquisition and live construction updates—we protect your investment on the ground while you’re abroad.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto"
          >
            <button type="button" onClick={() => setConsultation(previous => ({ open: true, requestId: previous.requestId + 1 }))} aria-haspopup="dialog" className="flex items-center justify-between sm:justify-start gap-3 bg-[#0F766E] text-white hover:bg-[#134E4A] transition-colors duration-300 pl-6 pr-2 py-2.5 rounded-full text-base font-medium group shadow-xl cursor-pointer">
              Request a free consultation
              <div className="w-8 h-8 rounded-full bg-white text-[#0F766E] flex items-center justify-center group-hover:bg-[#E8F0F3] transition-colors shrink-0">
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </div>
            </button>
            
            <Link to="/packages" className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-colors duration-300 px-8 py-2.5 rounded-full text-base font-medium shadow-xl">
              View Packages
            </Link>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between w-full items-end mb-2">
          {/* Slideshow Control */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center gap-3"
          >
            <button
              type="button"
              onClick={() => setPaused(!paused)}
              aria-label={paused ? 'Play Slideshow' : 'Pause Slideshow'}
              className="w-11 h-11 shrink-0 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 text-white flex items-center justify-center hover:bg-white/25 transition-colors cursor-pointer"
            >
              {paused ? <Play className="w-4 h-4" aria-hidden="true" /> : <Pause className="w-4 h-4" aria-hidden="true" />}
            </button>
          </motion.div>
        </div>
      </div>
      <FreeConsultationDialog key={consultation.requestId} open={consultation.open} onClose={() => setConsultation(previous => ({ ...previous, open: false }))} />
    </section>
  )
}
