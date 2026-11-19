import { useState } from 'react'
import { motion } from 'framer-motion'
import { FreeConsultationDialog } from './FreeConsultationDialog'

export function Hero() {
  const [consultation, setConsultation] = useState({ open: false, requestId: 0 })

  return (
    <section
      id="home"
      className="focus-light relative min-h-[680px] h-[100svh] max-h-[920px] w-full overflow-hidden bg-[#073A36]"
    >
      <picture className="absolute inset-0 h-full w-full">
        <source
          type="image/webp"
          srcSet={`${import.meta.env.BASE_URL}hero_main-640.webp 640w, ${import.meta.env.BASE_URL}hero_main-1024.webp 1024w, ${import.meta.env.BASE_URL}hero_main.webp 1672w`}
          sizes="100vw"
        />
        <img
          src={`${import.meta.env.BASE_URL}hero_main.webp`}
          alt="A diaspora couple reviewing villa plans with a development consultant in Ghana"
          width={1672}
          height={941}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[64%_center] md:object-center"
        />
      </picture>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,28,25,0.96)_0%,rgba(7,28,25,0.82)_42%,rgba(7,28,25,0.2)_76%,rgba(7,28,25,0.08)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,28,25,0.62)_0%,transparent_30%,rgba(7,28,25,0.5)_100%)] md:hidden" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-5 pb-10 pt-28 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[720px]"
        >
          <p className="mb-5 max-w-xl text-sm font-medium leading-relaxed text-white/78 sm:text-base">
            Visits, relocation, property, and construction support in Ghana
          </p>
          <h1 className="max-w-[14ch] text-[2.65rem] font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
            Handle your plans in Ghana with help on the ground.
          </h1>
          <p className="mt-6 max-w-[58ch] text-base leading-7 text-white/82 sm:text-lg sm:leading-8">
            We help people living abroad visit Ghana, move here, find property, buy land, and follow construction work.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => setConsultation(previous => ({ open: true, requestId: previous.requestId + 1 }))}
              aria-haspopup="dialog"
              className="min-h-12 cursor-pointer rounded-md bg-[#F7FAF8] px-6 py-3 text-base font-semibold text-[#073A36] transition-colors hover:bg-white"
            >
              Request a consultation
            </button>
            <a
              href="#services"
              className="min-h-12 border-b border-white/45 px-1 py-3 text-center text-base font-medium text-white transition-colors hover:border-white sm:text-left"
            >
              See all services
            </a>
          </div>

          <p className="mt-8 max-w-lg border-l-2 border-[#C7A85A] pl-4 text-sm leading-6 text-white/72">
            From airport pickup and local setup to land checks and building reports.
          </p>
        </motion.div>
      </div>

      <FreeConsultationDialog
        key={consultation.requestId}
        open={consultation.open}
        onClose={() => setConsultation(previous => ({ ...previous, open: false }))}
      />
    </section>
  )
}
