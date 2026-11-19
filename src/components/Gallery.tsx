import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, ChevronLeft, ChevronRight, Maximize2, ArrowUpRight, LayoutGrid, SlidersHorizontal, Play } from 'lucide-react'

type Category = 'All' | 'Construction' | 'Site Inspections' | 'Land & Development'

type PhotoItem = {
  id: string
  src: string
  title: string
  category: Exclude<Category, 'All'>
}

const baseUrl = import.meta.env.BASE_URL

const portfolioSrcSet = (src: string) => {
  const stem = src.replace(/\.webp$/, '')
  return `${stem}-640.webp 640w, ${stem}-960.webp 960w, ${src} 1280w`
}

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
    title: 'Overview of Gomoa Fetteh',
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

type VideoItem = {
  id: string
  src: string
  title: string
  duration: string
}

const galleryVideos: VideoItem[] = [
  {
    id: 'video-02',
    src: `${baseUrl}videos/video_2026-11-18_16-22-07.mp4`,
    title: 'Ground Level Topography Inspection',
    duration: '0:29'
  },
  {
    id: 'video-03',
    src: `${baseUrl}videos/video_2026-11-18_16-22-50.mp4`,
    title: 'Access Road & Boundary Line Verification',
    duration: '2:32'
  },
  {
    id: 'video-04',
    src: `${baseUrl}videos/video_2026-11-18_16-22-57.mp4`,
    title: 'Site Inspection & Soil Survey Check',
    duration: '0:20'
  },
  {
    id: 'video-05',
    src: `${baseUrl}videos/video_2026-11-18_16-23-22.mp4`,
    title: 'On-Site Construction & Structural Progress',
    duration: '1:29'
  },
  {
    id: 'video-06',
    src: `${baseUrl}videos/video_2026-11-18_16-23-41.mp4`,
    title: 'Development Zone Overview & Infrastructure Check',
    duration: '1:29'
  }
]

export function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null)
  const [layoutMode, setLayoutMode] = useState<'swipe' | 'grid'>('swipe')
  
  const carouselRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Drag-to-scroll refs
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeftStart = useRef(0)
  const hasDragged = useRef(false)

  const filteredPhotos = galleryPhotos

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

  const handleOpenGomoaLightbox = () => {
    const idx = galleryPhotos.findIndex(p => p.id === 'project-09')
    setSelectedIndex(idx !== -1 ? idx : 0)
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

  const handlePrevVideo = useCallback(() => {
    if (selectedVideoIndex === null) return
    setSelectedVideoIndex(prev => (prev === 0 ? galleryVideos.length - 1 : (prev ?? 0) - 1))
  }, [selectedVideoIndex])

  const handleNextVideo = useCallback(() => {
    if (selectedVideoIndex === null) return
    setSelectedVideoIndex(prev => (prev === galleryVideos.length - 1 ? 0 : (prev ?? 0) + 1))
  }, [selectedVideoIndex])

  // Keyboard navigation for photo & video lightboxes
  useEffect(() => {
    if (selectedIndex === null && selectedVideoIndex === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseLightbox()
        setSelectedVideoIndex(null)
      }
      if (e.key === 'ArrowLeft') {
        if (selectedIndex !== null) handlePrev()
        if (selectedVideoIndex !== null) handlePrevVideo()
      }
      if (e.key === 'ArrowRight') {
        if (selectedIndex !== null) handleNext()
        if (selectedVideoIndex !== null) handleNextVideo()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedIndex, selectedVideoIndex, handlePrev, handleNext, handlePrevVideo, handleNextVideo])

  return (
    <section id="gallery" className="scroll-mt-24 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        
        {/* Header Section */}
        <div className="mb-12 grid gap-6 border-b border-[#BFCFC8] pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <h1 className="max-w-[12ch] font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#111815] sm:text-5xl">
            Project evidence from the ground
          </h1>
          <p className="max-w-[60ch] text-base leading-8 text-[#4C5B55] md:text-lg lg:justify-self-end">
            Progress photographs, land demarcation, architectural work, and site-monitoring records from projects in Ghana.
          </p>
        </div>

        {/* Featured Mini-Hero: Overview of Gomoa Fetteh */}
        <div className="group relative mb-14 overflow-hidden border border-[#BFCFC8] bg-stone-950">
          <div className="relative h-[320px] sm:h-[400px] md:h-[460px] lg:h-[500px] w-full overflow-hidden">
            <img
              src={`${baseUrl}portfolio/gomoa-fetteh-overview.webp`}
              srcSet={portfolioSrcSet(`${baseUrl}portfolio/gomoa-fetteh-overview.webp`)}
              sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1280px) calc(100vw - 4rem), 1216px"
              alt="Overview of Gomoa Fetteh"
              width={1600}
              height={1067}
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105 select-none"
            />

            {/* Gradient Scrims for contrast & high text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/25 to-transparent pointer-events-none" />

            {/* Content Overlay */}
            <div className="absolute inset-0 p-6 sm:p-10 lg:p-12 flex flex-col justify-end z-10">
              {/* Bottom Details */}
              <div className="max-w-3xl">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight drop-shadow-lg mb-2 sm:mb-3">
                  Overview of Gomoa Fetteh
                </h2>
                <p className="text-stone-200 text-sm sm:text-base md:text-lg font-sans font-normal leading-relaxed max-w-2xl drop-shadow mb-5 sm:mb-6">
                  Aerial coastal masterplan showcasing demarcated residential parcels, coastal access corridors, and planned community infrastructure in Ghana.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleOpenGomoaLightbox}
                    className="inline-flex min-h-12 cursor-pointer items-center gap-2 bg-white px-6 py-3 text-sm font-semibold text-[#073A36] transition-colors hover:bg-[#F7FAF8]"
                  >
                    <Maximize2 className="w-4 h-4 text-[#0F766E]" aria-hidden="true" />
                    View full image
                  </button>
                  <Link
                    to="/packages"
                    className="inline-flex min-h-12 items-center border border-white/45 bg-black/35 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
                  >
                    Request a site inspection
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Heading & Controls for Other Portfolio Images */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 tracking-tight">
              On-Site Records & Construction Updates
            </h3>
            <p className="text-sm text-gray-500 font-sans mt-1">
              Browse verified construction stages, boundary checks, and site inspections.
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full md:w-auto">
            {/* View Mode Toggle: Hybrid Swipe (2-Row) vs Vertical Grid */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full border border-gray-200">
              <button
                type="button"
                onClick={() => setLayoutMode('swipe')}
                aria-label="Horizontal 2-row swipe view"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  layoutMode === 'swipe'
                    ? 'bg-[#0F766E] text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Swipe (2-Row)</span>
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('grid')}
                aria-label="Hybrid vertical grid view"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  layoutMode === 'grid'
                    ? 'bg-[#0F766E] text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Vertical Grid</span>
              </button>
            </div>

            {/* Navigation Controls (Visible in swipe mode) */}
            {layoutMode === 'swipe' && (
              <div className="hidden sm:flex items-center gap-2 shrink-0">
                <button
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  aria-label="Scroll gallery left"
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
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
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                    canScrollRight
                      ? 'border-gray-300 text-gray-800 hover:bg-[#0F766E] hover:text-white hover:border-[#0F766E] shadow-sm cursor-pointer'
                      : 'border-gray-200 text-gray-300 cursor-not-allowed opacity-50'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {layoutMode === 'swipe' ? (
        /* Hybrid Horizontal Track: 2-Row Grid on Mobile, 1-Row Carousel on Desktop */
        <div className="w-full relative">
          <div
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="grid grid-rows-2 grid-flow-col auto-cols-[74vw] sm:auto-cols-[340px] md:flex md:flex-row md:overflow-x-auto gap-3.5 md:gap-6 px-4 md:px-8 lg:px-12 pb-8 pt-2 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar select-none cursor-grab active:cursor-grabbing"
            style={{ scrollPaddingLeft: '1.5rem' }}
          >
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                role="button"
                tabIndex={0}
                aria-label={`View photo: ${photo.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleOpenLightbox(index)
                  }
                }}
                onClick={() => {
                  if (!hasDragged.current) {
                    handleOpenLightbox(index)
                  }
                }}
                className="snap-start shrink-0 w-[74vw] sm:w-[340px] md:w-[480px] lg:w-[540px] aspect-[16/10] sm:aspect-[4/3] rounded-2xl md:rounded-[2rem] overflow-hidden relative group cursor-pointer shadow-md hover:shadow-2xl transition-[box-shadow,transform] duration-500 hover:-translate-y-1.5 bg-gray-100 border border-gray-200/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
              >
                {/* Image */}
                <img
                  src={photo.src}
                  srcSet={portfolioSrcSet(photo.src)}
                  sizes="(max-width: 640px) 74vw, (max-width: 1024px) 480px, 540px"
                  alt={photo.title}
                  width={1400}
                  height={1050}
                  loading="lazy"
                  fetchPriority="low"
                  decoding="async"
                  draggable={false}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none"
                />

                {/* Hover Quick Zoom Overlay */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/95 text-[#0F766E] flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Maximize2 className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        /* Hybrid Vertical Grid: Mixed Horizontal Banners + Vertical Cards on Mobile */
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 pb-6">
            {filteredPhotos.map((photo, index) => {
              // Hybrid pattern: every 5th item spans full-width 2-columns (horizontal banner) on mobile
              const isWide = index % 5 === 0
              return (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View photo: ${photo.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleOpenLightbox(index)
                    }
                  }}
                  onClick={() => handleOpenLightbox(index)}
                  className={`${
                    isWide ? 'col-span-2 aspect-[16/9] md:col-span-1 md:aspect-[4/3]' : 'col-span-1 aspect-[4/5] md:aspect-[4/3]'
                  } rounded-2xl md:rounded-[2rem] overflow-hidden relative group cursor-pointer shadow-md hover:shadow-2xl transition-[box-shadow,transform] duration-500 hover:-translate-y-1 bg-gray-100 border border-gray-200/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]`}
                >
                  <img
                    src={photo.src}
                    srcSet={portfolioSrcSet(photo.src)}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    alt={photo.title}
                    width={1400}
                    height={1050}
                    loading="lazy"
                    fetchPriority="low"
                    decoding="async"
                    draggable={false}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none"
                  />

                  {/* Hover Quick Zoom Overlay */}
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-white/95 text-[#0F766E] flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Maximize2 className="w-4 h-4 text-[#0F766E]" aria-hidden="true" />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* On-Site Video Records Section */}
        <div className="mt-16 sm:mt-24">
          <div className="mb-8 border-t border-[#BFCFC8] pt-10">
            <h3 className="text-2xl font-semibold tracking-[-0.025em] text-[#111815] sm:text-3xl">
              Site inspections and walkthroughs
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#5B6B65]">
              Ground recordings, boundary verification, and progress checks from Ghana sites.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {galleryVideos.map((video, index) => (
              <motion.div
                key={video.id}
                role="button"
                tabIndex={0}
                aria-label={`Play video: ${video.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedVideoIndex(index)
                  }
                }}
                onClick={() => setSelectedVideoIndex(index)}
                className="aspect-video rounded-2xl md:rounded-[2rem] overflow-hidden relative group cursor-pointer shadow-md hover:shadow-2xl transition-[box-shadow,transform] duration-500 hover:-translate-y-1 bg-black border border-gray-200/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
              >
                <video
                  src={`${video.src}#t=0.001`}
                  preload="metadata"
                  playsInline
                  muted
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none"
                />

                {/* Subtle dark gradient overlay & centered play icon */}
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/95 text-[#0F766E] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-5 h-5 md:w-6 md:h-6 fill-current ml-0.5" aria-hidden="true" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 pointer-events-none">
                  <span className="inline-block px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-md text-[11px] font-semibold text-white/90 tabular-nums">
                    {video.duration}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Booking CTA Banner */}
        <div className="mx-auto mt-20 max-w-4xl border border-[#BFCFC8] bg-[#F7FAF8] p-8 md:p-12">
          <h2 className="max-w-[20ch] font-serif text-3xl font-semibold leading-tight text-[#111815] md:text-4xl">
            Need independent evidence from your site?
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#4C5B55] md:text-lg">
            Coordinate title checks, surveying, and regular construction records while you remain abroad.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/packages"
              className="inline-flex min-h-12 items-center justify-center bg-[#0B554E] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#073A36]"
            >
              Compare inspection packages
            </Link>
            <a
              href="tel:+233502323196"
              className="inline-flex min-h-12 items-center justify-center border border-[#BFCFC8] bg-white px-6 py-3 text-sm font-semibold text-[#073A36] transition-colors hover:border-[#0B554E]"
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
                  decoding="async"
                  className="max-h-[78vh] w-auto max-w-full object-contain select-none"
                />
              </div>

              {/* Clean Footer Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full max-w-2xl px-2 gap-3">
                <div>
                  <h3 className="text-white font-sans font-semibold text-base sm:text-lg leading-snug">
                    {filteredPhotos[selectedIndex].title}
                  </h3>
                  <span className="text-[11px] font-bold tracking-widest text-white/70 uppercase">
                    {filteredPhotos[selectedIndex].category} &bull; {selectedIndex + 1} of {filteredPhotos.length}
                  </span>
                </div>
                <Link
                  to="/packages"
                  onClick={handleCloseLightbox}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2DD4BF] hover:text-white transition-colors shrink-0"
                >
                  Book Inspection Package
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Lightbox Modal (Videos) */}
      <AnimatePresence>
        {selectedVideoIndex !== null && galleryVideos[selectedVideoIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="On-Site Project Video"
            onClick={() => setSelectedVideoIndex(null)}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedVideoIndex(null)}
              aria-label="Close Video"
              className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Prev Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handlePrevVideo()
              }}
              aria-label="Previous video"
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleNextVideo()
              }}
              aria-label="Next video"
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </button>

            {/* Modal Video View */}
            <div
              className="max-w-5xl w-full flex flex-col items-center max-h-[92vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-[78vh] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 mb-4 bg-black flex items-center justify-center aspect-video">
                <video
                  key={galleryVideos[selectedVideoIndex].src}
                  src={galleryVideos[selectedVideoIndex].src}
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
                    {galleryVideos[selectedVideoIndex].title}
                  </h3>
                  <span className="text-[11px] font-bold tracking-widest text-white/70 uppercase">
                    Site Video &bull; {selectedVideoIndex + 1} of {galleryVideos.length}
                  </span>
                </div>
                <Link
                  to="/packages"
                  onClick={() => setSelectedVideoIndex(null)}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2DD4BF] hover:text-white transition-colors shrink-0"
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
