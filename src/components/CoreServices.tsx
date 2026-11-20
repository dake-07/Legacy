import { useState } from 'react'
import { BriefcaseBusiness, Building2, ChevronDown, HardHat, MapPinned, PlaneLanding, type LucideIcon } from 'lucide-react'

type Service = {
  title: string
  summary: string
  result: string
  icon: LucideIcon
  outputs: string[]
  image: string
  imageAlt: string
}

const services: Service[] = [
  {
    title: 'Arrival and relocation support',
    summary: 'Help with your arrival, temporary stay, local transport, and practical setup.',
    result: 'You arrive knowing what has been arranged and which local steps still need your attention.',
    icon: PlaneLanding,
    outputs: ['Airport pickup and accommodation support', 'Local SIM card and area orientation', 'Banking and residence-permit guidance'],
    image: 'images/illustrations/illustrative-relocation-support.webp',
    imageAlt: 'A local adviser welcoming a couple into a home in Ghana',
  },
  {
    title: 'Land and property support',
    summary: 'Help finding suitable options and arranging checks before you commit.',
    result: 'You receive information about the site, ownership documents, and boundaries before making a decision.',
    icon: MapPinned,
    outputs: ['Land and property sourcing', 'Survey and boundary coordination', 'Document and lawyer coordination'],
    image: 'images/illustrations/illustrative-land-inspection.webp',
    imageAlt: 'A Ghana property team checking plans at a land site',
  },
  {
    title: 'Construction and furnishing',
    summary: 'Local coordination from early planning through building and property setup.',
    result: 'You can follow the work, review progress, and prepare the property for use while you are away.',
    icon: HardHat,
    outputs: ['Contractor and site coordination', 'Photos, video, and progress reports', 'Procurement and furnishing support'],
    image: 'images/illustrations/illustrative-construction-monitoring.webp',
    imageAlt: 'An engineer checking foundation work on a Ghana construction site',
  },
  {
    title: 'Property management',
    summary: 'Ongoing help caring for a home or rental property in Ghana.',
    result: 'You receive regular updates about the condition, maintenance, and use of your property.',
    icon: Building2,
    outputs: ['Scheduled property inspections', 'Cleaning, utility, and maintenance coordination', 'Tenant and rental reporting support'],
    image: 'images/illustrations/illustrative-relocation-support.webp',
    imageAlt: 'A local property adviser showing a couple around a home in Ghana',
  },
  {
    title: 'Business setup support',
    summary: 'Practical coordination for establishing and operating a business in Ghana.',
    result: 'You understand the local setup steps and have help coordinating the people and services involved.',
    icon: BriefcaseBusiness,
    outputs: ['Company registration coordination', 'Banking and office-search support', 'Recruitment and local setup guidance'],
    image: 'images/illustrations/illustrative-legal-review.webp',
    imageAlt: 'Business documents being reviewed during a meeting in Ghana',
  },
]

function ServicePanelContent({ service, showHeading = false }: { service: Service; showHeading?: boolean }) {
  const ServiceIcon = service.icon

  return (
    <>
      <figure>
        <div className="aspect-[16/9] overflow-hidden border border-white/15 bg-[#052E2B]">
          <img
            src={`${import.meta.env.BASE_URL}${service.image}`}
            alt={service.imageAlt}
            width="1600"
            height="900"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </figure>

      {showHeading && (
        <>
          <ServiceIcon aria-hidden="true" className="mt-8 h-9 w-9 text-[#E3CC91]" />
          <h3 className="mt-6 text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">{service.title}</h3>
        </>
      )}

      <p className={`${showHeading ? 'mt-5 text-lg leading-8' : 'mt-6 text-base leading-7'} max-w-[55ch] text-white/76`}>
        {service.result}
      </p>
      <h4 className="mt-8 text-sm font-semibold text-[#E3CC91] sm:mt-10">What you receive</h4>
      <ul className="mt-4 divide-y divide-white/15 border-y border-white/15">
        {service.outputs.map(output => (
          <li key={output} className="flex items-center gap-3 py-4 text-base text-white/88">
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-[#C7A85A]" />
            {output}
          </li>
        ))}
      </ul>
    </>
  )
}

export function CoreServices() {
  const [activeService, setActiveService] = useState<number | null>(0)
  const selectedIndex = activeService ?? 0
  const selected = services[selectedIndex]

  return (
    <section id="services" className="scroll-mt-24 bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 border-b border-[#DDE5E1] pb-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <h2 className="max-w-[11ch] font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#111815] sm:text-5xl">
            Choose the help you need in Ghana.
          </h2>
          <p className="max-w-[62ch] text-lg leading-8 text-[#4C5B55] lg:justify-self-end">
            Get help with a visit or move, land and property, construction, property management, or setting up a business. Start with one service or combine the support you need.
          </p>
        </div>

        <div aria-label="Legacy Hub services" className="mt-10 border-t border-[#BFCFC8] lg:hidden">
          {services.map((service, index) => {
            const Icon = service.icon
            const active = activeService === index
            const triggerId = `service-mobile-trigger-${index}`
            const panelId = `service-mobile-panel-${index}`

            return (
              <div key={service.title} className="border-b border-[#BFCFC8]">
                <h3>
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={active}
                    aria-controls={panelId}
                    onClick={() => setActiveService(current => current === index ? null : index)}
                    className={`grid min-h-16 w-full cursor-pointer grid-cols-[auto_1fr_auto] items-start gap-4 px-2 py-5 text-left transition-colors sm:px-4 ${active ? 'bg-[#E7F1ED] text-[#073A36]' : 'bg-white text-[#37453F] hover:bg-[#F7FAF8]'}`}
                  >
                    <Icon aria-hidden="true" className="mt-0.5 h-5 w-5" />
                    <span className="min-w-0">
                      <span className="block text-lg font-semibold">{service.title}</span>
                      <span className={`mt-1 block text-sm leading-6 ${active ? 'text-[#315D55]' : 'text-[#6A7772]'}`}>
                        {service.summary}
                      </span>
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`mt-0.5 h-5 w-5 transition-transform duration-200 ${active ? 'rotate-180' : ''}`}
                    />
                  </button>
                </h3>

                {active && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className="bg-[#073A36] p-6 text-white sm:p-8"
                  >
                    <ServicePanelContent service={service} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-12 hidden gap-10 lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div aria-label="Legacy Hub services" className="border-t border-[#BFCFC8]">
            {services.map((service, index) => {
              const Icon = service.icon
              const active = selectedIndex === index
              return (
                <button
                  key={service.title}
                  id={`service-desktop-trigger-${index}`}
                  type="button"
                  aria-pressed={active}
                  aria-controls="service-desktop-panel"
                  onClick={() => setActiveService(index)}
                  className={`grid w-full cursor-pointer grid-cols-[auto_1fr] gap-4 border-b border-[#BFCFC8] px-2 py-5 text-left transition-colors sm:px-4 ${active ? 'bg-[#E7F1ED] text-[#073A36]' : 'bg-white text-[#37453F] hover:bg-[#F7FAF8]'}`}
                >
                  <Icon aria-hidden="true" className="mt-0.5 h-5 w-5" />
                  <span>
                    <span className="block text-lg font-semibold">{service.title}</span>
                    <span className={`mt-1 block text-sm leading-6 ${active ? 'text-[#315D55]' : 'text-[#6A7772]'}`}>
                      {service.summary}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          <div
            id="service-desktop-panel"
            aria-live="polite"
            aria-labelledby={`service-desktop-trigger-${selectedIndex}`}
            tabIndex={0}
            className="bg-[#073A36] p-7 text-white sm:p-10 lg:p-12"
          >
            <ServicePanelContent service={selected} showHeading />
          </div>
        </div>
      </div>
    </section>
  )
}
