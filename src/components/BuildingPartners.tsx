import { useState } from 'react'
import { Compass, Eye, ShieldCheck } from 'lucide-react'
import { developerPartners, type DeveloperPartner } from './partners/data'
import { PartnerCard } from './partners/PartnerCard'
import { DesignGallery } from './partners/DesignGallery'
import { ConsultationDialog } from './partners/ConsultationDialog'
import { FreeConsultationDialog } from './FreeConsultationDialog'

const safeguards = [
  { icon: Compass, title: 'Design evidence', detail: 'Review architectural work before choosing a direction.' },
  { icon: ShieldCheck, title: 'Milestone oversight', detail: 'Connect project decisions and payments to verified progress.' },
  { icon: Eye, title: 'Independent site records', detail: 'Receive inspection evidence instead of relying on verbal updates.' },
]

const process = [
  { title: 'Choose the design and scope', detail: 'Identify the architecture, builder, and project requirements that fit your land and budget.' },
  { title: 'Agree the milestones', detail: 'Define what must be completed and verified before each project stage advances.' },
  { title: 'Review independent records', detail: 'Receive site evidence and engineering observations from Ghana throughout the build.' },
]

export function BuildingPartners() {
  const [consultation, setConsultation] = useState<{ partner: DeveloperPartner | null; designTitle: string; requestId: number }>({ partner: null, designTitle: '', requestId: 0 })
  const [gallery, setGallery] = useState<{ partner: DeveloperPartner | null; initialIndex: number; requestId: number }>({ partner: null, initialIndex: 0, requestId: 0 })
  const [generalConsultationOpen, setGeneralConsultationOpen] = useState(false)

  const handleOpenConsultation = (partner: DeveloperPartner, designTitle = '') => {
    setConsultation(previous => ({ partner, designTitle, requestId: previous.requestId + 1 }))
  }
  const handleOpenGallery = (partner: DeveloperPartner, initialIndex = 0) => {
    setGallery(previous => ({ partner, initialIndex, requestId: previous.requestId + 1 }))
  }

  return (
    <section className="partners-page bg-[#F7FAF8] py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <header className="grid gap-8 border-b border-[#BFCFC8] pb-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-base font-semibold text-[#0B554E]">Building partners in Ghana</p>
            <h1 className="mt-4 max-w-[14ch] font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#111815] sm:text-5xl lg:text-6xl">
              Compare the work before choosing the team.
            </h1>
          </div>
          <p className="max-w-[62ch] text-lg leading-8 text-[#4C5B55] lg:justify-self-end">
            Review architectural designers and builders, inspect their project work, and ask Legacy Hub to coordinate the practical next steps.
          </p>
        </header>

        <div className="grid border-b border-[#BFCFC8] md:grid-cols-3">
          {safeguards.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={item.title} className={`py-7 md:px-7 ${index > 0 ? 'border-t border-[#BFCFC8] md:border-l md:border-t-0' : ''}`}>
                <Icon aria-hidden="true" className="h-6 w-6 text-[#0B554E]" />
                <h2 className="mt-4 font-semibold text-[#111815]">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#5B6B65]">{item.detail}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {developerPartners.map((partner, index) => (
            <PartnerCard key={partner.id} partner={partner} priority={index === 0} onOpenGallery={handleOpenGallery} onConsult={handleOpenConsultation} />
          ))}
        </div>

        <section aria-labelledby="more-partners-heading" className="mt-12 border border-[#BFCFC8] bg-white p-7 sm:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div className="max-w-3xl">
              <h2 id="more-partners-heading" className="text-2xl font-semibold tracking-[-0.02em] text-[#111815]">
                The partner network is still growing.
              </h2>
              <p className="mt-4 leading-7 text-[#4C5B55]">
                We are screening architects, civil engineers, and builders across Ghana. New profiles will appear after their credentials and project evidence have been reviewed.
              </p>
              <p className="mt-4 text-sm text-[#5B6B65]">
                Are you a certified builder or architectural studio?{' '}
                <a href="mailto:asaapeesic@gmail.com?subject=Partner%20Inquiry%20-%20Legacy%20Hub" className="font-semibold text-[#0B554E] underline underline-offset-4">
                  Ask about joining the network
                </a>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setGeneralConsultationOpen(true)}
              className="min-h-12 cursor-pointer bg-[#0B554E] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#073A36]"
            >
              Ask the Legacy Hub team
            </button>
          </div>
        </section>

        <section aria-labelledby="partner-process-title" className="mt-16 border-t border-[#BFCFC8] pt-12">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="text-base font-semibold text-[#0B554E]">A protected sequence</p>
              <h2 id="partner-process-title" className="mt-3 font-serif text-3xl font-semibold tracking-[-0.03em] text-[#111815] sm:text-4xl">
                How a partner engagement moves forward
              </h2>
            </div>
            <ol className="border-t border-[#BFCFC8]">
              {process.map((item, index) => (
                <li key={item.title} className="grid grid-cols-[auto_1fr] gap-5 border-b border-[#BFCFC8] py-6">
                  <span className="text-sm font-semibold tabular-nums text-[#0B554E]">{index + 1}</span>
                  <div>
                    <h3 className="font-semibold text-[#111815]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#5B6B65]">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
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
      <FreeConsultationDialog open={generalConsultationOpen} onClose={() => setGeneralConsultationOpen(false)} />
    </section>
  )
}
