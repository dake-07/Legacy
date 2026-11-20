import { Link } from 'react-router-dom'

const supportAreas = [
  {
    title: 'Visits and relocation',
    detail: 'Airport pickup, accommodation, local transport, orientation, and practical help with settling in Ghana.',
  },
  {
    title: 'Land and property',
    detail: 'Property sourcing, site visits, survey coordination, and document and lawyer checks before you commit.',
  },
  {
    title: 'Construction and furnishing',
    detail: 'Contractor coordination, regular site checks, progress reports, procurement, and help preparing a property for use.',
  },
  {
    title: 'Property management',
    detail: 'Property inspections, cleaning, utility and maintenance coordination, tenant support, and regular reports.',
  },
  {
    title: 'Business setup',
    detail: 'Company registration coordination, banking introductions, office search, recruitment, and local setup support.',
  },
]

export function WhoWeAre() {
  return (
    <section id="who-we-are" className="scroll-mt-24 border-b border-[#DDE5E1] bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-12">
        <div>
          <p className="text-base font-semibold text-[#0B554E]">Who we are</p>
          <h2 className="mt-4 max-w-[14ch] font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#111815] sm:text-5xl">
            Local support for the plans you are making in Ghana.
          </h2>
          <p className="mt-7 max-w-[55ch] text-lg leading-8 text-[#3D4B46]">
            Legacy Hub is a Ghana-based relocation, property, construction, and business support company for people living abroad. We coordinate practical work, keep you informed, and connect you with local professionals when specialist help is needed.
          </p>
          <p className="mt-5 max-w-[55ch] text-base leading-7 text-[#5B6B65]">
            Choose support for one task, or combine services for a visit, move, property project, or business setup.
          </p>
          <Link
            to="/about"
            onMouseEnter={() => import('../pages/AboutPage')}
            onTouchStart={() => import('../pages/AboutPage')}
            className="mt-8 inline-flex min-h-12 items-center border-b-2 border-[#0B554E] py-3 font-semibold text-[#0B554E] transition-colors hover:border-[#C7A85A] hover:text-[#073A36]"
          >
            Learn more about Legacy Hub
          </Link>
        </div>

        <div className="border-t border-[#BFCFC8]">
          {supportAreas.map(area => (
            <article key={area.title} className="grid gap-2 border-b border-[#BFCFC8] py-6 sm:grid-cols-[0.72fr_1.28fr] sm:gap-8 sm:py-7">
              <h3 className="text-lg font-semibold text-[#111815]">{area.title}</h3>
              <p className="max-w-[48ch] text-base leading-7 text-[#4C5B55]">{area.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
