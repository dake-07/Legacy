import { useState, useEffect } from 'react'
import { Hero } from '../components/Hero'
import { ExecutiveSummary } from '../components/ExecutiveSummary'
import { CoreServices } from '../components/CoreServices'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Play, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

const baseUrl = import.meta.env.BASE_URL

export function HomePage() {
  const [videoOpen, setVideoOpen] = useState(false)

  // Keyboard navigation & body scroll lock for video modal
  useEffect(() => {
    if (!videoOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVideoOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [videoOpen])

  return (
    <>
      <Helmet>
        <title>Legacy | Relocation & Real Estate</title>
        <meta name="description" content="Comprehensive relocation, land acquisition, and construction monitoring services." />
      </Helmet>
      <div>
        <Hero />
        <ExecutiveSummary />
        <CoreServices />

        {/* Cinematic Video Showcase (Option A: Pure Cinematic, No Headline) */}
        <section className="py-12 md:py-20 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              role="button"
              tabIndex={0}
              aria-label="Play video: Experience Legacy Hub"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setVideoOpen(true)
                }
              }}
              onClick={() => setVideoOpen(true)}
              className="aspect-video w-full rounded-2xl md:rounded-[2.5rem] overflow-hidden relative group cursor-pointer shadow-xl hover:shadow-2xl active:scale-[0.99] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 bg-black border border-gray-200 select-none touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
            >
              <video
                src={`${baseUrl}videos/Advertisement.mp4#t=0.001`}
                preload="metadata"
                playsInline
                muted
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none"
              />

              {/* Ambient overlay & large centered Play button */}
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 text-[#0F766E] flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-7 h-7 md:w-9 md:h-9 fill-current ml-1" aria-hidden="true" />
                </div>
              </div>

              {/* Duration badge */}
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 pointer-events-none">
                <span className="inline-block px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-lg text-xs md:text-sm font-semibold text-white/95 tabular-nums shadow-sm">
                  1:02
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      
        {/* Packages Teaser */}
        <section className="py-24 bg-[#F0FDFA] relative overflow-hidden border-t border-[#99F6E4]/30">
          <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#134E4A] mb-6 tracking-tight">Ready to Secure Your Legacy?</h2>
              <p className="text-lg text-[#134E4A]/70 font-sans max-w-2xl mx-auto mb-10">Explore our comprehensive relocation, land acquisition, and construction monitoring packages tailored to your exact needs.</p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                <Link 
                  to="/packages"
                  onMouseEnter={() => import('./PackagesPage')}
                  onTouchStart={() => import('./PackagesPage')}
                  className="inline-flex items-center gap-3 bg-[#0F766E] text-white hover:bg-[#134E4A] active:scale-[0.98] transition-all duration-200 pl-8 pr-3 py-3 rounded-full text-sm font-bold uppercase tracking-widest group shadow-xl hover:shadow-2xl select-none touch-manipulation cursor-pointer"
                >
                  View Our Packages
                  <div className="w-10 h-10 rounded-full bg-white text-[#0F766E] flex items-center justify-center group-hover:bg-[#E8F0F3] transition-colors shrink-0">
                    <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
                  </div>
                </Link>
                <Link
                  to="/partners"
                  onMouseEnter={() => import('./PartnersPage')}
                  onTouchStart={() => import('./PartnersPage')}
                  className="inline-flex items-center gap-3 bg-white text-[#134E4A] border border-[#99F6E4] hover:bg-[#F0FDFA] active:scale-[0.98] transition-all duration-200 pl-8 pr-3 py-3 rounded-full text-sm font-bold uppercase tracking-widest group shadow-xl hover:shadow-2xl select-none touch-manipulation cursor-pointer"
                >
                  Building Partners
                  <div className="w-10 h-10 rounded-full bg-[#0F766E]/10 text-[#0F766E] flex items-center justify-center group-hover:bg-[#0F766E] group-hover:text-white transition-colors shrink-0">
                    <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Legacy Hub Video Presentation"
            onClick={() => setVideoOpen(false)}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setVideoOpen(false)}
              aria-label="Close Video"
              className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Modal Video Player Container */}
            <div
              className="max-w-5xl w-full flex flex-col items-center max-h-[92vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-[78vh] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 mb-4 bg-black flex items-center justify-center aspect-video">
                <video
                  src={`${baseUrl}videos/Advertisement.mp4`}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[78vh] w-full h-full object-contain"
                />
              </div>

              {/* Clean Footer Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full max-w-2xl px-2 gap-3">
                <div>
                  <h3 className="text-white font-sans font-semibold text-base sm:text-lg leading-snug">
                    Experience Legacy Hub
                  </h3>
                  <span className="text-[11px] font-bold tracking-widest text-white/70 uppercase">
                    Relocation, Land Acquisition &amp; Construction Monitoring
                  </span>
                </div>
                <Link
                  to="/packages"
                  onClick={() => setVideoOpen(false)}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2DD4BF] hover:text-white transition-colors shrink-0"
                >
                  Explore Packages
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
