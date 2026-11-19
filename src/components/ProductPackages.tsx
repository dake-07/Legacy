import { useState } from 'react'
import { Check } from 'lucide-react'
import { packages, constructionPackage } from './packages/data'
import { PackageCard } from './packages/PackageCard'
import { BookingDialog } from './packages/BookingDialog'

export function ProductPackages() {
  const [booking, setBooking] = useState({ name: '', price: '', open: false, requestId: 0 })
  const handleOpenModal = (name: string, price: string) => {
    setBooking(previous => ({ name, price, open: true, requestId: previous.requestId + 1 }))
  }

  return (
    <section id="packages" className="scroll-mt-24 bg-[#F7FAF8] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <header className="grid gap-7 border-b border-[#BFCFC8] pb-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-base font-semibold text-[#0B554E]">Support for visits and relocation</p>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#111815] sm:text-5xl lg:text-6xl">
              Choose a practical starting point.
            </h1>
          </div>
          <p className="max-w-[62ch] text-lg leading-8 text-[#4C5B55] lg:justify-self-end">
            Compare focused support for land inspections, relocation planning, investment exploration, property acquisition, and building projects.
          </p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {packages.map(pkg => (
            <PackageCard key={pkg.name} pkg={pkg} onSelect={handleOpenModal} />
          ))}
        </div>

        <section aria-labelledby="construction-package-title" className="mt-16 border border-[#BFCFC8] bg-white lg:mt-24">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            <div className="p-7 sm:p-10 lg:p-12">
              <p className="text-base font-semibold text-[#0B554E]">Ongoing construction oversight</p>
              <h2 id="construction-package-title" className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#111815] sm:text-4xl">
                {constructionPackage.name}
              </h2>
              <p className="mt-5 max-w-[42ch] text-base leading-7 text-[#4C5B55]">
                Pricing is prepared around the size, location, and inspection schedule of your project.
              </p>
              <button
                type="button"
                onClick={() => handleOpenModal(constructionPackage.name, constructionPackage.price)}
                className="mt-8 min-h-12 cursor-pointer bg-[#0B554E] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#073A36]"
              >
                Request a project quote
              </button>
            </div>

            <div className="border-t border-[#DDE5E1] bg-[#073A36] p-7 text-white sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <h3 className="text-xl font-semibold">What the monthly oversight includes</h3>
              <ul className="mt-7 divide-y divide-white/15 border-y border-white/15">
                {constructionPackage.features.map(feature => (
                  <li key={feature} className="flex items-start gap-4 py-5">
                    <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#E3CC91]" />
                    <span className="leading-7 text-white/78">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <BookingDialog
        key={booking.requestId}
        isModalOpen={booking.open}
        selectedPackage={booking.name}
        selectedPrice={booking.price}
        onClose={() => setBooking(previous => ({ ...previous, open: false }))}
      />
    </section>
  )
}
