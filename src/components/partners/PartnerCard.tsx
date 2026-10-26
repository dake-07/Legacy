import { useState } from 'react'
import { MapPin, ArrowRight, Images, User, ExternalLink } from 'lucide-react'
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
        {partner.instagramUrl && (
          <a
            href={partner.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${partner.name} on Instagram (opens in a new tab)`}
            className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-white shadow-md transition-colors hover:bg-[#0F766E]"
          >
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>Instagram</span>
            <ExternalLink aria-hidden="true" className="h-3 w-3 opacity-80" />
          </a>
        )}
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
        
        {partner.projectManager && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-teal-100 bg-[#F0FDFA] p-3 text-sm">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F766E]/10 text-[#0F766E] shrink-0">
                <User aria-hidden="true" className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E]">Project Manager</p>
                <p className="font-semibold text-gray-900 truncate">{partner.projectManager}</p>
              </div>
            </div>
            {partner.instagramUrl && (
              <a
                href={partner.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${partner.name} on Instagram (opens in a new tab)`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-teal-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#0F766E] shadow-2xs hover:bg-[#0F766E] hover:text-white transition-colors"
              >
                <span>IG Profile</span>
                <ExternalLink aria-hidden="true" className="h-3 w-3 opacity-70" />
              </a>
            )}
          </div>
        )}

        <dl className="my-5 grid grid-cols-2 gap-4 border-y border-gray-100 py-4 text-sm">
          <div><dt className="text-gray-600">Experience</dt><dd className="mt-1 font-semibold text-gray-900">{partner.experience}</dd></div>
          <div><dt className="text-gray-600">Project experience</dt><dd className="mt-1 font-semibold text-gray-900">{partner.completed}</dd></div>
          <div className="col-span-2"><dt className="sr-only">Service region</dt><dd className="flex items-start gap-2 text-gray-700"><MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0F766E]" />{partner.location}</dd></div>
        </dl>
        <p className="text-base leading-relaxed text-gray-700">{partner.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Specialties">{partner.specialties.map(specialty => <li key={specialty} className="rounded-md bg-[#F0FDFA] px-3 py-1.5 text-sm text-[#134E4A]">{specialty}</li>)}</ul>
        <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
          <button type="button" onClick={() => onConsult(partner)} aria-label={`Request consultation with ${partner.name}`} className="inline-flex min-h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#0F766E] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#134E4A]">Request consultation <ArrowRight aria-hidden="true" className="h-4 w-4" /></button>
          {designs.length > 0 && <button type="button" onClick={() => onOpenGallery(partner, previewIndex)} className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-[#134E4A] transition-colors hover:bg-[#F0FDFA]"><Images aria-hidden="true" className="h-4 w-4" />View designs ({designs.length})</button>}
        </div>
      </div>
    </article>
  )
}
