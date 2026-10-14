import { useState, useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import type { DeveloperPartner } from './data'
import { PartnerDialog } from './PartnerDialog'

interface DesignGalleryProps {
  galleryPartner: DeveloperPartner | null
  initialIndex: number
  onClose: () => void
  onConsult: (partner: DeveloperPartner, designTitle?: string) => void
}

export function DesignGallery({ galleryPartner, initialIndex, onClose, onConsult }: DesignGalleryProps) {
  const designs = galleryPartner?.designs ?? []
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const stripRef = useRef<HTMLDivElement>(null)
  const active = designs[activeIndex]
  const move = (direction: number) => setActiveIndex(index => (index + direction + designs.length) % designs.length)
  useEffect(() => {
    const strip = stripRef.current
    const thumbnail = strip?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')
    if (strip && thumbnail) {
      const left = thumbnail.offsetLeft - strip.offsetLeft
      if (left < strip.scrollLeft) strip.scrollLeft = left
      else if (left + thumbnail.offsetWidth > strip.scrollLeft + strip.clientWidth) strip.scrollLeft = left + thumbnail.offsetWidth - strip.clientWidth
    }
  }, [activeIndex])

  return (
    <PartnerDialog open={Boolean(active && galleryPartner)} labelledBy="design-gallery-title" onClose={onClose} className="max-w-6xl border-white/15 bg-gray-950 text-white">
      {active && galleryPartner && (
        <div className="p-3 sm:p-5" onKeyDown={event => {
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault()
            move(event.key === 'ArrowRight' ? 1 : -1)
          }
        }}>
          <header className="mb-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="mb-1 text-sm text-gray-300">{galleryPartner.name} · {activeIndex + 1} of {designs.length}</p>
              <h2 id="design-gallery-title" className="font-serif text-lg font-semibold leading-snug sm:text-2xl">{active.title}</h2>
              <p className="mt-1 text-sm text-gray-300">{active.category}</p>
            </div>
            <button type="button" onClick={onClose} aria-label="Close gallery" className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"><X aria-hidden="true" className="h-5 w-5" /></button>
          </header>
          <div className="relative overflow-hidden rounded-xl bg-black">
            <img src={active.image} alt={active.title} width={1200} height={800} className="mx-auto block max-h-[min(58dvh,calc(100dvh-22rem))] w-full object-contain sm:max-h-[min(62dvh,calc(100dvh-18rem))]" />
            <button type="button" onClick={() => move(-1)} aria-label="Previous design" className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/75 transition-colors hover:bg-black"><ChevronLeft aria-hidden="true" className="h-6 w-6" /></button>
            <button type="button" onClick={() => move(1)} aria-label="Next design" className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/75 transition-colors hover:bg-black"><ChevronRight aria-hidden="true" className="h-6 w-6" /></button>
          </div>
          <p aria-live="polite" aria-atomic="true" className="sr-only">Design {activeIndex + 1} of {designs.length}: {active.title}</p>
          <div ref={stripRef} className="relative mt-3 flex gap-2 overflow-x-auto px-1 py-2" aria-label="Choose a design">
            {designs.map((design, index) => (
              <button key={design.image} type="button" aria-label={`View ${design.title}`} aria-pressed={index === activeIndex} onClick={() => setActiveIndex(index)} className={`h-12 w-16 shrink-0 cursor-pointer overflow-hidden rounded-md border-2 transition-[border-color,opacity] ${index === activeIndex ? 'border-teal-300' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                <img src={design.image} alt="" width={128} height={96} loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <footer className="mt-3 flex flex-col gap-3 border-t border-white/15 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-gray-300">Ask about this design’s scope and project status.</p>
            <button type="button" onClick={() => { onClose(); onConsult(galleryPartner, active.title) }} className="inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#0F766E] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#134E4A]">Discuss this design <ArrowRight aria-hidden="true" className="h-4 w-4" /></button>
          </footer>
        </div>
      )}
    </PartnerDialog>
  )
}
