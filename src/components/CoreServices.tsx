import { useState } from 'react'
import { BriefcaseBusiness, ChevronDown, HardHat, Home, MapPinned, PlaneLanding, type LucideIcon } from 'lucide-react'

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
    title: 'Arrival and visit support',
    summary: 'Airport pickup, check-in help, local transport, and area orientation.',
    result: 'You arrive knowing who will meet you and what has already been arranged.',
    icon: PlaneLanding,
    outputs: ['Airport pickup', 'Accommodation check-in help', 'Local SIM card and area orientation'],
    image: 'images/illustrations/illustrative-relocation-support.webp',
    imageAlt: 'A local adviser welcoming a couple into a home in Ghana',
  },
  {
    title: 'Property and investment visits',
    summary: 'Planned site visits, local transport, and meetings for your questions.',
    result: 'You use your time in Ghana to see suitable places and speak with the right people.',
    icon: BriefcaseBusiness,
    outputs: ['Property and land visits', 'Dedicated local transport', 'Lawyer or investment meeting coordination'],
    image: 'images/illustrations/illustrative-land-inspection.webp',
    imageAlt: 'A Ghana property team checking plans at a land site',
  },
  {
    title: 'Relocation and local setup',
    summary: 'Help with the practical steps of moving to or settling in Ghana.',
    result: 'You know what to arrange before you travel and after you arrive.',
    icon: Home,
    outputs: ['Arrival and housing plan', 'Bank-account setup guidance', 'Residence-permit and local-service guidance'],
    image: 'images/illustrations/illustrative-relocation-support.webp',
    imageAlt: 'A relocation adviser showing a couple around a home in Ghana',
  },
  {
    title: 'Land purchase support',
    summary: 'We help find land and arrange checks before you pay.',
    result: 'You receive site details, ownership documents, and boundary information before you decide.',
    icon: MapPinned,
    outputs: ['Land sourcing and site visits', 'Survey and boundary coordination', 'Document and lawyer coordination'],
    image: 'images/illustrations/illustrative-legal-review.webp',
    imageAlt: 'Property plans and documents being reviewed in an Accra office',
  },
  {
    title: 'Construction monitoring',
    summary: 'We visit the site and record progress at agreed stages.',
    result: 'You see what was completed before approving the next stage.',
    icon: HardHat,
    outputs: ['Scheduled site visits', 'Photos and video from the site', 'Progress report for each milestone'],
    image: 'images/illustrations/illustrative-construction-monitoring.webp',
    imageAlt: 'An engineer checking foundation work on a Ghana construction site',
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
            You can book help for a short visit, a move, a land purchase, or a building project. Start with one package or combine services.
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
