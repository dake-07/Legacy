import { useState } from 'react'
import { MapPin, ArrowRight, Images } from 'lucide-react'
import type { DeveloperPartner } from './data'

interface PartnerCardProps {
  partner: DeveloperPartner
  onOpenGallery: (partner: DeveloperPartner, initialIndex?: number) => void
  onConsult: (partner: DeveloperPartner, designTitle?: string) => void
}

export function PartnerCard({ partner, onOpenGallery, onConsult }: PartnerCardProps) {
  const [previewIndex, setPreviewIndex] = useState(0)
  const designs = partner.designs ?? []
  const image = designs[previewIndex]?.image ?? partner.image
  const visual = <img src={image} alt={designs[previewIndex]?.title ?? `${partner.name} project`} width={900} height={560} loading="lazy" className="h-full w-full object-cover" />
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="relative aspect-[16/10] bg-gray-100">
        {designs.length ? <button type="button" aria-label={`View designs by ${partner.name}`} onClick={() => onOpenGallery(partner, previewIndex)} className="block h-full w-full cursor-pointer">{visual}</button> : visual}
        <span className="pointer-events-none absolute left-4 top-4 max-w-[calc(100%-2rem)] rounded-md bg-white/95 px-3 py-2 text-xs font-semibold text-[#134E4A]">{partner.category}</span>
      </div>
      {designs.length > 0 && (
        <div className="flex gap-2 border-b border-gray-100 bg-gray-50 p-3">
          {designs.slice(0, 4).map((design, index) => (
            <button key={design.image} type="button" aria-label={`Preview ${design.title}`} aria-pressed={previewIndex === index} onClick={() => setPreviewIndex(index)} className={`min-h-11 min-w-0 flex-1 cursor-pointer overflow-hidden rounded-md border-2 transition-colors ${previewIndex === index ? 'border-[#0F766E]' : 'border-transparent hover:border-gray-400'}`}>
              <img src={design.image} alt="" width={128} height={96} loading="lazy" className="h-12 w-full object-cover sm:h-16" />
            </button>
          ))}
          {designs.length > 4 && <button type="button" onClick={() => onOpenGallery(partner, 4)} aria-label={`View all ${designs.length} designs by ${partner.name}`} className="min-h-11 min-w-11 shrink-0 cursor-pointer rounded-md bg-[#134E4A] px-3 text-sm font-semibold text-white transition-colors hover:bg-[#0F766E]">+{designs.length - 4}</button>}
        </div>
      )}
      <div className="flex flex-1 flex-col p-5 sm:p-7">
        <h2 className="font-serif text-2xl font-semibold leading-tight text-gray-900 sm:text-3xl">{partner.name}</h2>
        <p className="mt-2 text-base font-medium leading-relaxed text-[#0F766E]">{partner.tagline}</p>
        <dl className="my-5 grid grid-cols-2 gap-4 border-y border-gray-100 py-4 text-sm">
          <div><dt className="text-gray-600">Experience</dt><dd className="mt-1 font-semibold text-gray-900">{partner.experience}</dd></div>
          <div><dt className="text-gray-600">Project experience</dt><dd className="mt-1 font-semibold text-gray-900">{partner.completed}</dd></div>
          <div className="col-span-2"><dt className="sr-only">Service region</dt><dd className="flex items-start gap-2 text-gray-700"><MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0F766E]" />{partner.location}</dd></div>
        </dl>
        <p className="text-base leading-relaxed text-gray-700">{partner.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Specialties">{partner.specialties.map(specialty => <li key={specialty} className="rounded-md bg-[#F0FDFA] px-3 py-1.5 text-sm text-[#134E4A]">{specialty}</li>)}</ul>
        <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
          <button type="button" onClick={() => onConsult(partner)} aria-label={`Request consultation with ${partner.name}`} className="inline-flex min-h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#0F766E] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#134E4A]">Request consultation <ArrowRight aria-hidden="true" className="h-4 w-4" /></button>
          {designs.length > 0 && <button type="button" onClick={() => onOpenGallery(partner, previewIndex)} className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-[#134E4A] transition-colors hover:bg-[#F0FDFA]"><Images aria-hidden="true" className="h-4 w-4" />View designs</button>}
        </div>
      </div>
    </article>
  )
}
