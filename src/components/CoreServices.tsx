import { useState } from 'react'
import { FileCheck2, HardHat, Home, MapPinned, type LucideIcon } from 'lucide-react'

type Service = {
  title: string
  summary: string
  result: string
  icon: LucideIcon
  outputs: string[]
}

const services: Service[] = [
  {
    title: 'Land acquisition',
    summary: 'Identify suitable land and coordinate checks before you commit.',
    result: 'A clearer decision backed by local records and site context.',
    icon: MapPinned,
    outputs: ['Site visit coordination', 'Ownership-document collection', 'Boundary and location evidence'],
  },
  {
    title: 'Legal coordination',
    summary: 'Keep the document review moving with qualified local professionals.',
    result: 'Key legal questions are surfaced before signing or payment.',
    icon: FileCheck2,
    outputs: ['Document handover', 'Review follow-up', 'Decision-ready summaries'],
  },
  {
    title: 'Construction monitoring',
    summary: 'Follow progress through independent visits and recorded milestones.',
    result: 'You see what has been completed before the next stage advances.',
    icon: HardHat,
    outputs: ['Scheduled site checks', 'Photo and video records', 'Milestone progress reports'],
  },
  {
    title: 'Relocation support',
    summary: 'Plan the practical details of returning, visiting, or settling in Ghana.',
    result: 'A coordinated arrival with fewer unknowns and missed steps.',
    icon: Home,
    outputs: ['Arrival planning', 'Local orientation', 'Property and service coordination'],
  },
]

export function CoreServices() {
  const [activeService, setActiveService] = useState(0)
  const selected = services[activeService]
  const SelectedIcon = selected.icon

  return (
    <section id="services" className="scroll-mt-24 bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 border-b border-[#DDE5E1] pb-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <h2 className="max-w-[11ch] font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#111815] sm:text-5xl">
            Support built around the decision in front of you.
          </h2>
          <p className="max-w-[62ch] text-lg leading-8 text-[#4C5B55] lg:justify-self-end">
            Start with one service or connect several into a complete plan. The work stays understandable: what we are checking, what evidence you receive, and what happens next.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div aria-label="Legacy Hub services" className="border-t border-[#BFCFC8]">
            {services.map((service, index) => {
              const Icon = service.icon
              const active = activeService === index
              return (
                <button
                  key={service.title}
                  id={`service-tab-${index}`}
                  type="button"
                  aria-pressed={active}
                  aria-controls="service-panel"
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
            id="service-panel"
            aria-live="polite"
            aria-labelledby={`service-tab-${activeService}`}
            tabIndex={0}
            className="bg-[#073A36] p-7 text-white sm:p-10 lg:p-12"
          >
            <SelectedIcon aria-hidden="true" className="h-9 w-9 text-[#E3CC91]" />
            <h3 className="mt-8 text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">{selected.title}</h3>
            <p className="mt-5 max-w-[55ch] text-lg leading-8 text-white/76">{selected.result}</p>
            <h4 className="mt-10 text-sm font-semibold text-[#E3CC91]">What you receive</h4>
            <ul className="mt-4 divide-y divide-white/15 border-y border-white/15">
              {selected.outputs.map(output => (
                <li key={output} className="flex items-center gap-3 py-4 text-base text-white/88">
                  <span aria-hidden="true" className="h-1.5 w-1.5 bg-[#C7A85A]" />
                  {output}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
