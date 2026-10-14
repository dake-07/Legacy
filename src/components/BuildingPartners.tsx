import { useState } from 'react'
import { Compass, ShieldCheck, Eye } from 'lucide-react'
import { developerPartners } from './partners/data'
import type { DeveloperPartner } from './partners/data'
import { PartnerCard } from './partners/PartnerCard'
import { DesignGallery } from './partners/DesignGallery'
import { ConsultationDialog } from './partners/ConsultationDialog'

export function BuildingPartners() {
  const [consultation, setConsultation] = useState<{ partner: DeveloperPartner | null; designTitle: string; requestId: number }>({ partner: null, designTitle: '', requestId: 0 })
  const [gallery, setGallery] = useState<{ partner: DeveloperPartner | null; initialIndex: number; requestId: number }>({ partner: null, initialIndex: 0, requestId: 0 })
  const handleOpenConsultation = (partner: DeveloperPartner, designTitle = '') => {
    setConsultation(previous => ({ partner, designTitle, requestId: previous.requestId + 1 }))
  }
  const handleOpenGallery = (partner: DeveloperPartner, initialIndex = 0) => {
    setGallery(previous => ({ partner, initialIndex, requestId: previous.requestId + 1 }))
  }

  return (
    <section className="partners-page py-10 md:py-16 bg-[#F0FDFA] relative overflow-hidden">
      {/* Liquid Glass Background Depth Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[8%] right-[-10%] w-[600px] h-[600px] bg-[#0F766E]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-[#0F766E]/10 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        
        {/* Header Section (Clean, Scannable & Trust-Centered) */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="w-16 h-[1px] bg-[#0F766E]/40" />
            <span className="text-xs font-bold tracking-[0.3em] text-[#0F766E] uppercase">
              Vetted Contractor Network
            </span>
            <div className="w-16 h-[1px] bg-[#0F766E]/40" />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-gray-900 tracking-tight mb-5">
            Find Your Building Partner in Ghana
          </h1>

          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            Explore architectural designers and builders for your project. Compare their experience, browse designs, and ask Legacy Hub to coordinate your next steps.
          </p>

          {/* 3 Core Guarantees Pill Strip (No License Jargon) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6">
            <div className="flex items-center justify-center gap-2.5 bg-white/90 border border-gray-200/80 rounded-full py-2.5 px-4 shadow-xs">
              <Compass aria-hidden="true" className="w-4 h-4 text-[#0F766E] shrink-0" />
              <span className="text-sm font-semibold text-gray-800">Verified Architectural Designs</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 bg-white/90 border border-gray-200/80 rounded-full py-2.5 px-4 shadow-xs">
              <ShieldCheck aria-hidden="true" className="w-4 h-4 text-[#0F766E] shrink-0" />
              <span className="text-sm font-semibold text-gray-800">Milestone Escrow Oversight</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 bg-white/90 border border-gray-200/80 rounded-full py-2.5 px-4 shadow-xs">
              <Eye aria-hidden="true" className="w-4 h-4 text-[#0F766E] shrink-0" />
              <span className="text-sm font-semibold text-gray-800">Independent On-Site Audits</span>
            </div>
          </div>
        </div>

        {/* Partners Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {developerPartners.map(partner => (
            <PartnerCard key={partner.id} partner={partner} onOpenGallery={handleOpenGallery} onConsult={handleOpenConsultation} />
          ))}
        </div>

        {/* Simple 3-Step Process (KISS Workflow) */}
        <div className="mt-12 sm:mt-16 bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-10 md:p-12 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-bold tracking-[0.2em] text-[#0F766E] uppercase mb-2 block">
              Clear &amp; Protected Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 tracking-tight">
              How We Protect Your Build
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#0F766E] text-white flex items-center justify-center font-bold text-base mb-4 shadow-md">
                1
              </div>
              <h3 className="font-serif font-bold text-lg text-gray-900 mb-2">Select Design &amp; Scope</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-sans">
                Choose the architectural style or builder tailored to your villa, townhome, or land civil works.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#0F766E] text-white flex items-center justify-center font-bold text-base mb-4 shadow-md">
                2
              </div>
              <h3 className="font-serif font-bold text-lg text-gray-900 mb-2">Milestone Escrow Contract</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-sans">
                Payments are linked to specific construction milestones. No contractor receives funds in advance without verification.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#0F766E] text-white flex items-center justify-center font-bold text-base mb-4 shadow-md">
                3
              </div>
              <h3 className="font-serif font-bold text-lg text-gray-900 mb-2">Independent Engineering Audits</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-sans">
                Legacy Hub inspects steel reinforcement, concrete quality, and masonry, sending HD video audits directly to you abroad.
              </p>
            </div>
          </div>
        </div>

      </div>

      <DesignGallery
        key={`gallery-${gallery.requestId}`}
        galleryPartner={gallery.partner}
        initialIndex={gallery.initialIndex}
        onClose={() => setGallery(previous => ({ ...previous, partner: null }))}
        onConsult={handleOpenConsultation}
      />
      <ConsultationDialog
        key={`consultation-${consultation.requestId}`}
        selectedPartner={consultation.partner}
        selectedDesignTitle={consultation.designTitle}
        onClose={() => setConsultation(previous => ({ ...previous, partner: null }))}
      />
    </section>
  )
}
