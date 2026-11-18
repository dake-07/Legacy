import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FreeConsultationDialog } from './FreeConsultationDialog'

export function Hero() {
  const [consultation, setConsultation] = useState({ open: false, requestId: 0 })

  return (
    <section id="home" className="focus-light relative overflow-hidden bg-white w-full lg:h-[92dvh] lg:min-h-[640px] lg:max-h-[880px] flex flex-col justify-center">
      {/* Full-bleed Background Image with Responsive Formats */}
      <div className="absolute inset-x-2 top-2 bottom-2 rounded-3xl overflow-hidden z-0">
        <picture className="absolute inset-0 w-full h-full">
          <source 
            type="image/webp" 
            srcSet={`${import.meta.env.BASE_URL}hero_main-640.webp 640w, ${import.meta.env.BASE_URL}hero_main-1024.webp 1024w, ${import.meta.env.BASE_URL}hero_main.webp 1672w`}
            sizes="100vw"
          />
          <img 
            src={`${import.meta.env.BASE_URL}hero_main.webp`}
            alt="Diaspora couple reviewing luxury villa blueprints and architectural models with a development consultant overlooking a Ghanaian coastal sunset"
            width={1672}
            height={941}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </picture>
        
        {/* Directional Contrast Scrims for Left-Aligned Layout (WCAG AAA) */}
        {/* 1. Left-to-right gradient: deep contrast for typography on the left, clear view of photography on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/60 md:via-stone-950/40 to-transparent z-10 pointer-events-none" />

        {/* 2. Top-down gradient: protects transparent navbar */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-stone-950/70 via-stone-950/20 to-transparent z-10 pointer-events-none" />

        {/* 3. Bottom-up gradient: grounds the card frame */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-stone-950/50 via-transparent to-transparent z-10 pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 flex flex-col justify-center pt-28 pb-12 sm:pt-32 sm:pb-16 lg:py-0 px-6 sm:px-10 lg:px-16 max-w-[1400px] mx-auto w-full">
        
        {/* Left-Aligned Headline & Supporting Copy */}
        <div className="flex flex-col items-start text-left w-full max-w-3xl">
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
      </div>
      <FreeConsultationDialog key={consultation.requestId} open={consultation.open} onClose={() => setConsultation(previous => ({ ...previous, open: false }))} />
    </section>
  )
}
