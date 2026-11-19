import { Check } from 'lucide-react'
import type { ServicePackage } from './data'

interface PackageCardProps {
  pkg: ServicePackage
  onSelect: (name: string, price: string) => void
}

export function PackageCard({ pkg, onSelect }: PackageCardProps) {
  return (
    <article className={`relative flex h-full flex-col border bg-white ${pkg.isPopular ? 'border-[#0B554E] border-t-4' : 'border-[#BFCFC8]'}`}>
      <header className="border-b border-[#DDE5E1] px-6 py-7">
        {pkg.isPopular && <p className="mb-3 text-sm font-semibold text-[#0B554E]">Recommended starting point</p>}
        <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[#111815]">{pkg.name}</h2>
      </header>

      <div className="flex-grow px-6 py-7">
        <ul className="space-y-5">
          {pkg.features.map(feature => (
            <li key={feature} className="flex items-start gap-3">
              <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0B554E]" />
              <span className="text-sm leading-6 text-[#4C5B55]">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <footer className="border-t border-[#DDE5E1] p-5">
        <button
          type="button"
          onClick={() => onSelect(pkg.name, pkg.price)}
          className={`min-h-12 w-full cursor-pointer px-5 py-3 text-sm font-semibold transition-colors ${pkg.isPopular ? 'bg-[#0B554E] text-white hover:bg-[#073A36]' : 'bg-[#E7F1ED] text-[#073A36] hover:bg-[#DDE5E1]'}`}
        >
          Request this package
        </button>
      </footer>
    </article>
  )
}
