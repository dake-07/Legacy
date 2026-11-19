import { Link } from 'react-router-dom'

const supportAreas = [
  {
    title: 'Visits to Ghana',
    detail: 'Airport pickup, accommodation check-in, local transport, area orientation, and planned property visits.',
  },
  {
    title: 'Moving to Ghana',
    detail: 'Practical help with local setup, including SIM cards, banking guidance, residence-permit consultation, and settling-in plans.',
  },
  {
    title: 'Land and property',
    detail: 'Help finding suitable options, arranging site visits, and coordinating survey, document, and lawyer checks before you commit.',
  },
  {
    title: 'Construction',
    detail: 'Regular site visits, progress photos and videos, material checks, and updates while you are away.',
  },
]

export function WhoWeAre() {
  return (
    <section id="who-we-are" className="scroll-mt-24 border-b border-[#DDE5E1] bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-12">
        <div>
          <p className="text-base font-semibold text-[#0B554E]">Who we are</p>
          <h2 className="mt-4 max-w-[14ch] font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#111815] sm:text-5xl">
            A Ghana-based team for your visit, move, property, or building project.
          </h2>
          <p className="mt-7 max-w-[55ch] text-lg leading-8 text-[#3D4B46]">
            Legacy Hub helps people living abroad handle practical work in Ghana. We arrange local support, keep you informed, and connect you with qualified professionals when specialist help is needed.
          </p>
          <p className="mt-5 max-w-[55ch] text-base leading-7 text-[#5B6B65]">
            You can ask for help with one task or choose a package that brings several services together.
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
