import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPin, 
  ArrowRight, 
  X, 
  MessageSquare, 
  Send, 
  Check, 
  Compass, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Eye
} from 'lucide-react'

const baseUrl = import.meta.env.BASE_URL

export interface ProjectDesign {
  title: string
  category: string
  image: string
}

export interface DeveloperPartner {
  id: string
  name: string
  tagline: string
  category: string
  experience: string
  completed: string
  location: string
  image: string
  specialties: string[]
  description: string
  designs?: ProjectDesign[]
}

export const richardOsabuteyDesigns: ProjectDesign[] = [
  {
    title: 'The Horizon Cantilever Villa',
    category: 'Luxury Contemporary Villa',
    image: `${baseUrl}partners/richard-osabutey/photo_20_2026-10-13_22-13-39.jpg`
  },
  {
    title: 'Modern Terracotta Residence',
    category: 'Minimalist Brick & Concrete',
    image: `${baseUrl}partners/richard-osabutey/photo_2_2026-10-13_22-13-38.jpg`
  },
  {
    title: 'Palm Grove Contemporary Duplex',
    category: '2-Story Family Residence',
    image: `${baseUrl}partners/richard-osabutey/photo_29_2026-10-13_22-13-39.jpg`
  },
  {
    title: 'Coastal Gated Enclave',
    category: 'Master Planned Subdivision',
    image: `${baseUrl}partners/richard-osabutey/photo_6_2026-10-13_22-13-38.jpg`
  },
  {
    title: 'Executive Stone Bungalow',
    category: 'Modern Single-Story Villa',
    image: `${baseUrl}partners/richard-osabutey/photo_1_2026-10-13_22-13-38.jpg`
  },
  {
    title: 'Townhouse Concrete Frame (Under Construction)',
    category: 'On-Site Construction In Progress',
    image: `${baseUrl}partners/richard-osabutey/photo_21_2026-10-13_22-13-39.jpg`
  },
  {
    title: 'Modern Townhouse 3D Concept',
    category: 'Multi-Unit Residential',
    image: `${baseUrl}partners/richard-osabutey/photo_26_2026-10-13_22-13-39.jpg`
  },
  {
    title: 'Two-Story Family Compound',
    category: 'Executive Residence',
    image: `${baseUrl}partners/richard-osabutey/photo_15_2026-10-13_22-13-39.jpg`
  },
  {
    title: 'Gated Townhome Master Site Plan',
    category: 'Aerial Architecture Layout',
    image: `${baseUrl}partners/richard-osabutey/photo_25_2026-10-13_22-13-39.jpg`
  },
  {
    title: 'Linear Modern Townhome Cluster',
    category: 'Subdivision Perspective',
    image: `${baseUrl}partners/richard-osabutey/photo_28_2026-10-13_22-13-39.jpg`
  },
  {
    title: 'Executive Villa with Covered Carport',
    category: 'Contemporary Villa',
    image: `${baseUrl}partners/richard-osabutey/photo_14_2026-10-13_22-13-38.jpg`
  },
  {
    title: 'Modern Linear Villa Elevation',
    category: 'Architectural Elevation',
    image: `${baseUrl}partners/richard-osabutey/photo_22_2026-10-13_22-13-39.jpg`
  },
  {
    title: 'Suburban Courtyard Family Home',
    category: 'Residential Design',
    image: `${baseUrl}partners/richard-osabutey/photo_23_2026-10-13_22-13-39.jpg`
  },
  {
    title: 'Minimalist Single-Story Residence',
    category: 'Custom Home Concept',
    image: `${baseUrl}partners/richard-osabutey/photo_8_2026-10-13_22-13-38.jpg`
  },
  {
    title: 'Two-Tone Modern Duplex',
    category: 'Contemporary Duplex',
    image: `${baseUrl}partners/richard-osabutey/photo_11_2026-10-13_22-13-38.jpg`
  },
  {
    title: 'Architectural Facade Study',
    category: 'Design Concept',
    image: `${baseUrl}partners/richard-osabutey/photo_12_2026-10-13_22-13-38.jpg`
  },
  {
    title: 'Modern Roofline Villa',
    category: 'Residential Architecture',
    image: `${baseUrl}partners/richard-osabutey/photo_13_2026-10-13_22-13-38.jpg`
  },
  {
    title: 'Geometric Cantilever Home',
    category: 'Contemporary Design',
    image: `${baseUrl}partners/richard-osabutey/photo_16_2026-10-13_22-13-39.jpg`
  },
  {
    title: 'Urban Family Compound',
    category: 'Executive Villa',
    image: `${baseUrl}partners/richard-osabutey/photo_18_2026-10-13_22-13-39.jpg`
  },
  {
    title: 'Terraced Ridge Residence Concept',
    category: 'Hillside Architecture',
    image: `${baseUrl}partners/richard-osabutey/photo_2026-10-13_22-12-45.jpg`
  }
]

export const developerPartners: DeveloperPartner[] = [
  {
    id: 'richard-osabutey',
    name: 'Richard Osabutey',
    tagline: 'Architectural Designer & Custom Home Builder',
    category: 'Architectural Design & Build',
    experience: 'Over 10 Years',
    completed: '25+ Design Projects',
    location: 'Greater Accra & Nationwide',
    image: `${baseUrl}partners/richard-osabutey/photo_20_2026-10-13_22-13-39.jpg`,
    specialties: [
      'Custom Home Design',
      '3D Plans & Visuals',
      'Modern Family Homes',
      'On-Site Supervision'
    ],
    description: 'A trusted designer and builder with over 10 years of experience helping diaspora families build quality homes in Ghana. Known for honest communication, dependable timelines, and hands-on supervision from the first drawing to the finished build.',
    designs: richardOsabuteyDesigns
  },
  {
    id: 'goldcoast-estates',
    name: 'GoldCoast Modular & Estates',
    tagline: 'Modern Townhomes & Master-Planned Gated Communities',
    category: 'Townhomes & Estates',
    experience: '16 Years',
    completed: '45+ Units',
    location: 'Accra, Tema & Takoradi',
    image: `${baseUrl}portfolio/project-10.webp`,
    specialties: [
      'Multi-Unit Duplexes',
      'Master Planned Communities',
      'Pre-Cast Slab Systems',
      'Private Perimeter Security'
    ],
    description: 'The preferred partner for diaspora families and investment syndicates seeking multi-unit townhomes with strict milestone delivery schedules.'
  },
  {
    id: 'terraform-civil',
    name: 'TerraForm Civil & Land Works',
    tagline: 'Site Topography Grading, Boundary Fortification & Drainage',
    category: 'Civil & Earthwork',
    experience: '12 Years',
    completed: '60+ Sites',
    location: 'Greater Accra, Central & Eastern Regions',
    image: `${baseUrl}portfolio/project-02.webp`,
    specialties: [
      'Heavy Site Excavation',
      'Anti-Encroachment Boundary Walls',
      'Heavy Supply Access Roads',
      'Stormwater Culverts'
    ],
    description: 'Secures and fortifies raw land with geodetic boundary markers, retaining walls, and engineered road access prior to construction.'
  },
  {
    id: 'ecohaus-ghana',
    name: 'EcoHaus Sustainable Builders',
    tagline: 'Biophilic Architecture, Natural Cooling & Eco Villas',
    category: 'Sustainable Living',
    experience: '9 Years',
    completed: '21+ Villas',
    location: 'Greater Accra Coast & Aburi Ridge',
    image: `${baseUrl}portfolio/project-15.webp`,
    specialties: [
      'Compressed Earth Block (CEB)',
      'High-Thermal Mass Walls',
      'Greywater Recycling',
      'Passive Airflow Design'
    ],
    description: 'Designs energy-resilient diaspora residences that cut cooling costs by 60% through natural tropical airflow and indigenous materials.'
  }
]

export function BuildingPartners() {
  const [selectedPartner, setSelectedPartner] = useState<DeveloperPartner | null>(null)
  const [galleryPartner, setGalleryPartner] = useState<DeveloperPartner | null>(null)
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0)
  const [activePartnerPreview, setActivePartnerPreview] = useState<Record<string, string>>({
    'richard-osabutey': richardOsabuteyDesigns[0].image
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selectedDesignTitle, setSelectedDesignTitle] = useState<string>('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  })

  // Keyboard navigation for Gallery Lightbox
  const handleNextPhoto = useCallback(() => {
    if (!galleryPartner?.designs?.length) return
    setActiveGalleryIndex((prev) => (prev + 1) % galleryPartner.designs!.length)
  }, [galleryPartner])

  const handlePrevPhoto = useCallback(() => {
    if (!galleryPartner?.designs?.length) return
    setActiveGalleryIndex((prev) => (prev - 1 + galleryPartner.designs!.length) % galleryPartner.designs!.length)
  }, [galleryPartner])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (galleryPartner) setGalleryPartner(null)
        if (selectedPartner) setSelectedPartner(null)
      } else if (e.key === 'ArrowRight' && galleryPartner) {
        handleNextPhoto()
      } else if (e.key === 'ArrowLeft' && galleryPartner) {
        handlePrevPhoto()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [galleryPartner, selectedPartner, handleNextPhoto, handlePrevPhoto])

  const handleOpenConsultation = (partner: DeveloperPartner, designTitle?: string) => {
    setSelectedPartner(partner)
    setSelectedDesignTitle(designTitle || '')
    setSubmitted(false)
    setFormData({ name: '', email: '', phone: '', notes: designTitle ? `Inquiring about design: ${designTitle}` : '' })
  }

  const handleOpenGallery = (partner: DeveloperPartner, initialIndex = 0) => {
    setGalleryPartner(partner)
    setActiveGalleryIndex(initialIndex)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPartner) return

    setIsSubmitting(true)

    try {
      await fetch('https://formsubmit.co/ajax/asaapeesic@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Building Partner Consultation Request: ${selectedPartner.name} - ${formData.name}`,
          _replyto: formData.email,
          "Selected Builder / Designer": selectedPartner.name,
          "Specific Design": selectedDesignTitle || 'General Consultation',
          "Client Name": formData.name,
          "Client Email": formData.email,
          "Client Phone / WhatsApp": formData.phone,
          "Project Notes": formData.notes || 'No extra notes provided',
          "Date": new Date().toLocaleString()
        })
      })
    } catch {
      // Non-blocking fallback
    } finally {
      setIsSubmitting(false)
      setSubmitted(true)
    }
  }

  return (
    <section className="py-16 md:py-28 bg-[#F0FDFA] relative overflow-hidden">
      {/* Liquid Glass Background Depth Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[8%] right-[-10%] w-[600px] h-[600px] bg-[#0F766E]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-[#0F766E]/10 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        
        {/* Header Section (Clean, Scannable & Trust-Centered) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="w-16 h-[1px] bg-[#0F766E]/40" />
            <span className="text-xs font-bold tracking-[0.3em] text-[#0F766E] uppercase">
              Vetted Contractor Network
            </span>
            <div className="w-16 h-[1px] bg-[#0F766E]/40" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 tracking-tight mb-6">
            Building Development Partners
          </h1>

          <p className="text-lg md:text-xl text-gray-600 font-sans leading-relaxed">
            Direct access to Ghana’s verified architectural designers and builders. Legacy Hub acts as your independent on-the-ground client representative, inspecting every milestone before funds are disbursed.
          </p>

          {/* 3 Core Guarantees Pill Strip (No License Jargon) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-10">
            <div className="flex items-center justify-center gap-2.5 bg-white/90 border border-gray-200/80 rounded-full py-2.5 px-4 shadow-xs">
              <Compass className="w-4 h-4 text-[#0F766E] shrink-0" />
              <span className="text-xs font-semibold text-gray-800">Verified Architectural Designs</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 bg-white/90 border border-gray-200/80 rounded-full py-2.5 px-4 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#0F766E] shrink-0" />
              <span className="text-xs font-semibold text-gray-800">Milestone Escrow Oversight</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 bg-white/90 border border-gray-200/80 rounded-full py-2.5 px-4 shadow-xs">
              <Eye className="w-4 h-4 text-[#0F766E] shrink-0" />
              <span className="text-xs font-semibold text-gray-800">Independent On-Site Audits</span>
            </div>
          </div>
        </div>

        {/* Partners Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {developerPartners.map((partner) => {
            const currentPreviewImage = activePartnerPreview[partner.id] || partner.image
            const hasDesignGallery = Boolean(partner.designs && partner.designs.length > 0)

            return (
              <article 
                key={partner.id}
                className="bg-white border border-gray-200/90 rounded-[2.2rem] overflow-hidden shadow-sm hover:shadow-xl transition-[box-shadow,transform] duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  {/* Visual Showcase Banner */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                    <img 
                      src={currentPreviewImage} 
                      alt={partner.name}
                      width={900}
                      height={560}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 cursor-pointer"
                      onClick={() => hasDesignGallery ? handleOpenGallery(partner) : undefined}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                    
                    {/* Category Pill Tag */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#0F766E] text-[11px] font-bold tracking-widest uppercase shadow-sm">
                        {partner.category}
                      </span>
                    </div>

                    {/* Location & Photo Count Tags */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs z-10 pointer-events-none">
                      <span className="flex items-center gap-1.5 drop-shadow-md font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#2DD4BF]" />
                        <span>{partner.location}</span>
                      </span>
                      {hasDesignGallery ? (
                        <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] border border-white/20 font-medium flex items-center gap-1.5">
                          <Eye className="w-3 h-3 text-[#2DD4BF]" />
                          <span>{partner.designs!.length} Designs</span>
                        </span>
                      ) : (
                        <span className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[11px] border border-white/20 font-medium">
                          {partner.experience}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Clean Minimal Proof Strip (Swaps photo or expands gallery) */}
                  {hasDesignGallery && (
                    <div className="p-3.5 sm:p-4 bg-gray-50/70 border-b border-gray-100">
                      <div className="flex gap-2">
                        {partner.designs!.slice(0, 4).map((design, dIdx) => {
                          const isCurrent = currentPreviewImage === design.image
                          return (
                            <button
                              key={dIdx}
                              type="button"
                              onClick={() => setActivePartnerPreview(prev => ({ ...prev, [partner.id]: design.image }))}
                              className={`relative flex-1 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                                isCurrent 
                                  ? 'border-[#0F766E] shadow-xs' 
                                  : 'border-transparent opacity-75 hover:opacity-100 hover:border-gray-300'
                              }`}
                              title={design.title}
                            >
                              <img 
                                src={design.image} 
                                alt={design.title} 
                                className="w-full h-full object-cover"
                              />
                            </button>
                          )
                        })}
                        {partner.designs!.length > 4 && (
                          <button
                            type="button"
                            onClick={() => handleOpenGallery(partner, 4)}
                            className="relative flex-1 aspect-[4/3] rounded-xl overflow-hidden bg-gray-900 group cursor-pointer transition-transform hover:scale-102 border-2 border-transparent"
                            title="Browse all designs"
                          >
                            <img 
                              src={partner.designs![4].image} 
                              alt="More designs" 
                              className="w-full h-full object-cover opacity-35 group-hover:opacity-25 transition-opacity"
                            />
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white tracking-wider">
                              +{partner.designs!.length - 4}
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Card Content Body */}
                  <div className="p-5 sm:p-8 md:p-9">
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-2">
                      {partner.name}
                    </h2>

                    <p className="text-xs sm:text-sm font-semibold text-[#0F766E] mb-3 sm:mb-4">
                      {partner.tagline}
                    </p>

                    <p className="text-sm text-gray-600 font-sans leading-relaxed mb-5 sm:mb-6">
                      {partner.description}
                    </p>

                    {/* Specialties Badges */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {partner.specialties.map((spec) => (
                        <span 
                          key={spec}
                          className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#F0FDFA] border border-[#99F6E4]/70 text-[#134E4A] text-xs font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action: Exactly One Single, High-Converting CTA */}
                <div className="px-5 sm:px-8 md:px-9 pb-5 sm:pb-8 md:pb-9 pt-2">
                  <button
                    type="button"
                    onClick={() => handleOpenConsultation(partner)}
                    className="w-full inline-flex items-center justify-center gap-2.5 sm:gap-3 bg-[#0F766E] text-white hover:bg-[#134E4A] active:scale-[0.99] transition-all duration-200 py-3.5 px-6 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-md hover:shadow-lg cursor-pointer touch-manipulation"
                  >
                    <span>Connect with {partner.name}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              </article>
            )
          })}
        </div>

        {/* Simple 3-Step Process (KISS Workflow) */}
        <div className="mt-16 sm:mt-20 bg-white border border-gray-200/90 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-12 md:p-14 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-bold tracking-[0.2em] text-[#0F766E] uppercase mb-2 block">
              Clear &amp; Protected Process
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 tracking-tight">
              How We Protect Your Build
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0F766E] text-white font-serif font-bold text-base sm:text-lg flex items-center justify-center mb-3 sm:mb-4 shadow-md">
                1
              </div>
              <h4 className="font-serif font-bold text-base sm:text-lg text-gray-900 mb-1.5 sm:mb-2">Select Design &amp; Scope</h4>
              <p className="text-sm text-gray-600 font-sans leading-relaxed">
                Choose the architectural style or builder tailored to your villa, townhome, or land civil works.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0F766E] text-white font-serif font-bold text-base sm:text-lg flex items-center justify-center mb-3 sm:mb-4 shadow-md">
                2
              </div>
              <h4 className="font-serif font-bold text-base sm:text-lg text-gray-900 mb-1.5 sm:mb-2">Milestone Escrow Contract</h4>
              <p className="text-sm text-gray-600 font-sans leading-relaxed">
                Payments are linked to specific construction milestones. No contractor receives funds in advance without verification.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0F766E] text-white font-serif font-bold text-base sm:text-lg flex items-center justify-center mb-3 sm:mb-4 shadow-md">
                3
              </div>
              <h4 className="font-serif font-bold text-base sm:text-lg text-gray-900 mb-1.5 sm:mb-2">Independent Engineering Audits</h4>
              <p className="text-sm text-gray-600 font-sans leading-relaxed">
                Legacy Hub inspects steel reinforcement, concrete quality, and masonry, sending HD video audits directly to you abroad.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Full-Screen Design Gallery Lightbox Modal */}
      <AnimatePresence>
        {galleryPartner && galleryPartner.designs && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setGalleryPartner(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Container */}
            <motion.div 
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl h-[94vh] sm:h-[92vh] flex flex-col justify-between z-10 select-none"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 bg-black/50 backdrop-blur-md rounded-2xl border border-white/10 text-white z-20 gap-2">
                <div className="min-w-0 pr-2">
                  <h3 className="text-sm sm:text-lg font-serif font-bold text-white truncate">
                    {galleryPartner.designs[activeGalleryIndex].title}
                  </h3>
                  <span className="text-xs text-white/70 block truncate">
                    {galleryPartner.name} &bull; {galleryPartner.designs[activeGalleryIndex].category}
                  </span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <span className="text-[11px] sm:text-xs font-mono px-2.5 sm:px-3 py-1 rounded-full bg-white/10 text-white/90">
                    {activeGalleryIndex + 1}/{galleryPartner.designs.length}
                  </span>

                  <button
                    type="button"
                    onClick={() => setGalleryPartner(null)}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer touch-manipulation"
                    aria-label="Close gallery"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Image Stage */}
              <div className="relative flex-1 my-2 sm:my-3 flex items-center justify-center overflow-hidden rounded-2xl bg-black/60 border border-white/5 min-h-0">
                <img 
                  src={galleryPartner.designs[activeGalleryIndex].image} 
                  alt={galleryPartner.designs[activeGalleryIndex].title}
                  className="max-h-[56vh] sm:max-h-[66vh] max-w-full object-contain drop-shadow-2xl transition-all duration-300"
                />

                {/* Left / Right Nav Arrows */}
                <button
                  type="button"
                  onClick={handlePrevPhoto}
                  className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/80 active:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer touch-manipulation"
                  aria-label="Previous design"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <button
                  type="button"
                  onClick={handleNextPhoto}
                  className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/80 active:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer touch-manipulation"
                  aria-label="Next design"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Bottom Thumbnail Strip & Consultation CTA */}
              <div className="bg-black/50 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 z-20">
                {/* Micro Thumbnails */}
                <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full sm:max-w-2xl py-0.5 scrollbar-none no-scrollbar">
                  {galleryPartner.designs.map((design, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveGalleryIndex(idx)}
                      className={`relative shrink-0 w-12 h-9 sm:w-14 sm:h-10 rounded-md overflow-hidden border-2 transition-all cursor-pointer touch-manipulation ${
                        activeGalleryIndex === idx 
                          ? 'border-[#2DD4BF] scale-105' 
                          : 'border-transparent opacity-50 hover:opacity-100'
                      }`}
                    >
                      <img src={design.image} alt={design.title} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* CTA inside Lightbox */}
                <button
                  type="button"
                  onClick={() => {
                    const currentDesign = galleryPartner.designs![activeGalleryIndex]
                    setGalleryPartner(null)
                    handleOpenConsultation(galleryPartner, currentDesign.title)
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#0F766E] hover:bg-[#14B8A6] active:bg-[#134E4A] text-white text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 cursor-pointer shadow-lg touch-manipulation"
                >
                  <span>Consult on this Design</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Streamlined Consultation Modal (Single Step, Direct WhatsApp / Email) */}
      <AnimatePresence>
        {selectedPartner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPartner(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Dialog Card (Scrollable on small mobile screens) */}
            <motion.div 
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-y-auto max-h-[92vh] z-10 border border-gray-100 p-5 sm:p-8 md:p-10"
            >
              {/* Close Button */}
              <button 
                type="button"
                onClick={() => setSelectedPartner(null)}
                className="absolute top-4 sm:top-5 right-4 sm:right-5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-600 flex items-center justify-center transition-colors cursor-pointer touch-manipulation"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {!submitted ? (
                <div>
                  <div className="mb-5 sm:mb-6 pr-8">
                    <span className="text-xs font-bold tracking-widest text-[#0F766E] uppercase block mb-1">
                      Direct Consultation Inquiry
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
                      {selectedPartner.name}
                    </h3>
                    {selectedDesignTitle && (
                      <p className="text-xs font-semibold text-[#0F766E] mt-1 bg-[#F0FDFA] p-2 rounded-lg border border-[#99F6E4]/70">
                        Selected Concept: {selectedDesignTitle}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 font-sans mt-2">
                      Legacy Hub coordinates architectural reviews, milestone escrow agreements, and independent on-site audits for your build in Ghana.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                    <div>
                      <label htmlFor="partner-name" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Full Name *
                      </label>
                      <input 
                        type="text" 
                        id="partner-name"
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g. Kwame Mensah"
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-300 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] text-base sm:text-sm outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="partner-email" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Email Address *
                      </label>
                      <input 
                        type="email" 
                        id="partner-email"
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="kwame@example.com"
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-300 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] text-base sm:text-sm outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="partner-phone" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        WhatsApp / Phone Number *
                      </label>
                      <input 
                        type="tel" 
                        id="partner-phone"
                        required 
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+1 (555) 000-0000 or +233..."
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-300 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] text-base sm:text-sm outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="partner-notes" className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Project Details / Location (Optional)
                      </label>
                      <textarea 
                        id="partner-notes"
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="e.g. Planning a 4-bed villa build in Airport Hills or Aburi..."
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-300 focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] text-base sm:text-sm outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-full bg-[#0F766E] hover:bg-[#134E4A] active:bg-[#11403c] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2 shadow-lg touch-manipulation"
                    >
                      {isSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Consultation Request</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-4 sm:py-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Check className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-2">
                    Inquiry Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-sans leading-relaxed mb-5 sm:mb-6">
                    Thank you, {formData.name.split(' ')[0]}. Our diaspora project liaison has received your inquiry for <span className="font-semibold text-gray-900">{selectedPartner.name}</span>.
                  </p>

                  <div className="space-y-2.5 sm:space-y-3">
                    <a
                      href={`https://wa.me/233502323196?text=${encodeURIComponent(`Hello LegacyHub, I would like to consult on building partner "${selectedPartner.name}"${selectedDesignTitle ? ` (Design: ${selectedDesignTitle})` : ''}.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nNotes: ${formData.notes || 'None'}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1ca64f] text-white font-semibold py-3 sm:py-3.5 px-6 rounded-full transition-colors shadow-md text-xs sm:text-sm touch-manipulation"
                    >
                      <MessageSquare className="w-4 h-4 shrink-0" />
                      <span>Chat Immediately via WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setSelectedPartner(null)}
                      className="w-full py-2.5 sm:py-3 px-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs sm:text-sm font-medium transition-colors touch-manipulation"
                    >
                      Back to Building Partners
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
