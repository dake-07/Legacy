import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, ChevronLeft, ChevronRight, Maximize2, ArrowUpRight } from 'lucide-react'

type Category = 'All' | 'Construction' | 'Site Inspections' | 'Land & Development'

type PhotoItem = {
  id: string
  src: string
  title: string
  category: Exclude<Category, 'All'>
}

const baseUrl = import.meta.env.BASE_URL

const galleryPhotos: PhotoItem[] = [
  {
    id: 'project-01',
    src: `${baseUrl}portfolio/project-01.webp`,
    title: 'Modern Residential Build',
    category: 'Construction'
  },
  {
    id: 'project-02',
    src: `${baseUrl}portfolio/project-02.webp`,
    title: 'Two-Story Villa Development',
    category: 'Construction'
  },
  {
    id: 'project-03',
    src: `${baseUrl}portfolio/project-03.webp`,
    title: 'Perimeter Wall & Security Foundation',
    category: 'Land & Development'
  },
  {
    id: 'project-04',
    src: `${baseUrl}portfolio/project-04.webp`,
    title: 'Site Topography & Grading',
    category: 'Site Inspections'
  },
  {
    id: 'project-05',
    src: `${baseUrl}portfolio/project-05.webp`,
    title: 'Reinforced Column Supervision',
    category: 'Construction'
  },
  {
    id: 'project-06',
    src: `${baseUrl}portfolio/project-06.webp`,
    title: 'Ground Beam Casting Check',
    category: 'Construction'
  },
  {
    id: 'project-07',
    src: `${baseUrl}portfolio/project-07.webp`,
    title: 'Multi-Unit Housing Project',
    category: 'Construction'
  },
  {
    id: 'project-08',
    src: `${baseUrl}portfolio/project-08.webp`,
    title: 'Roof Trusses & Framing',
    category: 'Construction'
  },
  {
    id: 'project-09',
    src: `${baseUrl}portfolio/project-09.webp`,
    title: 'Gomoa Fetteh Land Demarcation',
    category: 'Land & Development'
  },
  {
    id: 'project-10',
    src: `${baseUrl}portfolio/project-10.webp`,
    title: 'Boundary Line Verification',
    category: 'Site Inspections'
  },
  {
    id: 'project-11',
    src: `${baseUrl}portfolio/project-11.webp`,
    title: 'Access Road Inspection',
    category: 'Site Inspections'
  },
  {
    id: 'project-12',
    src: `${baseUrl}portfolio/project-12.webp`,
    title: 'Plastering & Masonry Finishing',
    category: 'Construction'
  },
  {
    id: 'project-13',
    src: `${baseUrl}portfolio/project-13.webp`,
    title: 'Electrical & Conduit Pre-Wiring',
    category: 'Construction'
  },
  {
    id: 'project-14',
    src: `${baseUrl}portfolio/project-14.webp`,
    title: 'Drainage Channel Construction',
    category: 'Land & Development'
  },
  {
    id: 'project-15',
    src: `${baseUrl}portfolio/project-15.webp`,
    title: 'Exterior Stucco Application',
    category: 'Construction'
  },
  {
    id: 'project-16',
    src: `${baseUrl}portfolio/project-16.webp`,
    title: 'Floor Tiling & Screed Quality',
    category: 'Construction'
  },
  {
    id: 'project-17',
    src: `${baseUrl}portfolio/project-17.webp`,
    title: 'Water Storage & Sump Vetting',
    category: 'Site Inspections'
  },
  {
    id: 'project-18',
    src: `${baseUrl}portfolio/project-18.webp`,
    title: 'Completed Residence Pre-Handover',
    category: 'Construction'
  }
]

const categories: Category[] = ['All', 'Construction', 'Site Inspections', 'Land & Development']

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  
  const carouselRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Drag-to-scroll refs
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeftStart = useRef(0)
  const hasDragged = useRef(false)

  const filteredPhotos = activeCategory === 'All'
    ? galleryPhotos
    : galleryPhotos.filter(p => p.category === activeCategory)

  const updateScrollButtons = useCallback(() => {
    if (!carouselRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
    setCanScrollLeft(scrollLeft > 15)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15)
  }, [])

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    updateScrollButtons()
    el.addEventListener('scroll', updateScrollButtons, { passive: true })
    window.addEventListener('resize', updateScrollButtons)
    return () => {
      el.removeEventListener('scroll', updateScrollButtons)
      window.removeEventListener('resize', updateScrollButtons)
    }
  }, [updateScrollButtons, filteredPhotos])

  // Reset scroll to beginning when category filter changes
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    }
  }, [activeCategory])

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return
    const offset = carouselRef.current.clientWidth * 0.75
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -offset : offset,
      behavior: 'smooth'
    })
  }

  // Mouse drag-to-scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return
    isDragging.current = true
    hasDragged.current = false
    startX.current = e.pageX - carouselRef.current.offsetLeft
    scrollLeftStart.current = carouselRef.current.scrollLeft
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !carouselRef.current) return
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - startX.current) * 1.4
    if (Math.abs(walk) > 6) {
      hasDragged.current = true
    }
    carouselRef.current.scrollLeft = scrollLeftStart.current - walk
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleOpenLightbox = (index: number) => {
    setSelectedIndex(index)
  }

  const handleCloseLightbox = () => {
    setSelectedIndex(null)
  }

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex(prev => (prev === 0 ? filteredPhotos.length - 1 : (prev ?? 0) - 1))
  }, [selectedIndex, filteredPhotos.length])

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex(prev => (prev === filteredPhotos.length - 1 ? 0 : (prev ?? 0) + 1))
  }, [selectedIndex, filteredPhotos.length])

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedIndex === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseLightbox()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [selectedIndex, handlePrev, handleNext])

  return (
    <section id="gallery" className="py-20 md:py-32 bg-white relative overflow-hidden border-t border-gray-100 scroll-mt-24">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0F766E]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-10 h-[1.5px] bg-[#0F766E]"></span>
              <span className="text-xs font-bold tracking-[0.25em] text-[#0F766E] uppercase">Visual Portfolio</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight">
              On-the-Ground Project Gallery
            </h1>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll gallery left"
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                canScrollLeft
                  ? 'border-gray-300 text-gray-800 hover:bg-[#0F766E] hover:text-white hover:border-[#0F766E] shadow-sm cursor-pointer'
                  : 'border-gray-200 text-gray-300 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll gallery right"
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                canScrollRight
                  ? 'border-gray-300 text-gray-800 hover:bg-[#0F766E] hover:text-white hover:border-[#0F766E] shadow-sm cursor-pointer'
                  : 'border-gray-200 text-gray-300 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10">
          {categories.map(cat => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#0F766E] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
                <span className="ml-2 text-[10px] opacity-75 tabular-nums">
                  ({cat === 'All' ? galleryPhotos.length : galleryPhotos.filter(p => p.category === cat).length})
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Horizontal Carousel Track (Full-bleed with left margin alignment) */}
      <div className="w-full relative">
        <div
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="flex gap-6 overflow-x-auto px-4 md:px-8 lg:px-12 pb-8 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar select-none cursor-grab active:cursor-grabbing"
          style={{ scrollPaddingLeft: '2rem' }}
        >
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                if (!hasDragged.current) {
                  handleOpenLightbox(index)
                }
              }}
              className="snap-start shrink-0 w-[84vw] sm:w-[420px] md:w-[480px] lg:w-[540px] aspect-[16/11] sm:aspect-[4/3] rounded-[2rem] overflow-hidden relative group cursor-pointer shadow-md hover:shadow-2xl transition-[box-shadow,transform] duration-500 hover:-translate-y-1.5 bg-gray-100 border border-gray-200/80"
            >
              {/* Image */}
              <img
                src={photo.src}
                alt={photo.title}
                width={1400}
                height={1050}
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none"
              />

              {/* Category Pill Tag */}
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <span className="inline-block px-3.5 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest uppercase text-[#0F766E] shadow-sm">
                  {photo.category}
                </span>
              </div>

              {/* Hover Quick Zoom Overlay */}
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-white/95 text-[#0F766E] flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <Maximize2 className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Bottom Booking CTA Banner */}
        <div className="mt-20 bg-[#F0FDFA] border border-[#99F6E4]/40 rounded-[2.5rem] p-10 md:p-14 text-center max-w-4xl mx-auto shadow-sm">
          <span className="text-xs font-bold tracking-[0.2em] text-[#0F766E] uppercase mb-4 inline-block">
            Protect Your Investment
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-5">
            Need Independent Site Inspections for Your Project?
          </h2>
          <p className="text-gray-600 font-sans text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            We provide verified land title vetting, surveyor coordination, and weekly construction photographic logs so you can build with confidence from abroad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/packages"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#0F766E] text-white font-bold uppercase tracking-wider text-xs hover:bg-[#134E4A] shadow-md transition-colors"
            >
              Explore Inspection Packages
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href="tel:+233502323196"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white border border-gray-200 text-gray-800 font-bold uppercase tracking-wider text-xs hover:bg-gray-50 shadow-sm transition-colors"
            >
              Call +233&nbsp;50&nbsp;232&nbsp;3196
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox Modal (Images Only) */}
      <AnimatePresence>
        {selectedIndex !== null && filteredPhotos[selectedIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged Project Photo"
          >
            {/* Close Button */}
            <button
              onClick={handleCloseLightbox}
              aria-label="Close Lightbox"
              className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous photo"
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              aria-label="Next photo"
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Modal Image View (Images Only, Clean) */}
            <div className="max-w-5xl w-full flex flex-col items-center max-h-[92vh]">
              <div className="relative max-h-[78vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 mb-4 bg-black/80 flex items-center justify-center">
                <img
                  src={filteredPhotos[selectedIndex].src}
                  alt={filteredPhotos[selectedIndex].title}
                  width={1600}
                  height={1200}
                  className="max-h-[78vh] w-auto max-w-full object-contain select-none"
                />
              </div>

              {/* Clean Footer Bar (No descriptions) */}
              <div className="flex items-center justify-between w-full max-w-2xl px-2">
                <span className="text-xs font-bold tracking-widest text-white/70 uppercase">
                  {filteredPhotos[selectedIndex].category} &bull; {selectedIndex + 1} of {filteredPhotos.length}
                </span>
                <Link
                  to="/packages"
                  onClick={handleCloseLightbox}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2DD4BF] hover:text-white transition-colors"
                >
                  Book Inspection Package
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
