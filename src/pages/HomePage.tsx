import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, X } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { Hero } from '../components/Hero'
import { WhoWeAre } from '../components/WhoWeAre'
import { ExecutiveSummary } from '../components/ExecutiveSummary'
import { CoreServices } from '../components/CoreServices'
import { PartnerDialog } from '../components/partners/PartnerDialog'

const baseUrl = import.meta.env.BASE_URL

export function HomePage() {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <>
      <Helmet>
        <title>Legacy Hub | Relocation, Property and Business Support in Ghana</title>
        <meta
          name="description"
          content="Ghana-based support for visiting or relocating, buying land, building and managing property, and setting up a business while living abroad."
        />
      </Helmet>

      <div>
        <Hero />
        <WhoWeAre />
        <ExecutiveSummary />
        <CoreServices />

        <section className="border-y border-[#DDE5E1] bg-[#F7FAF8] py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:px-12">
            <div>
              <p className="text-base font-semibold text-[#0B554E]">See how we work in Ghana</p>
              <h2 className="mt-4 max-w-[12ch] font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#111815] sm:text-5xl">
                See how projects are handled.
              </h2>
              <p className="mt-6 max-w-[48ch] text-lg leading-8 text-[#4C5B55]">
                Watch a one-minute overview of how we help with visits, relocation, land, and building projects.
              </p>
              <p className="mt-8 text-sm text-[#6A7772]">Video duration: 1 minute 2 seconds</p>
              <details className="mt-6 max-w-[48ch] border-t border-[#BFCFC8] pt-4 text-[#3D4B46]">
                <summary className="cursor-pointer font-semibold text-[#0B554E]">Read video summary</summary>
                <p className="mt-3 text-sm leading-6">
                  The video introduces Legacy Hub’s support for people visiting, moving to, buying property, or building in Ghana. It explains how the team arranges local work and keeps clients abroad informed before important decisions are made.
                </p>
              </details>
            </div>

            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              aria-haspopup="dialog"
              aria-label="Play video: How Legacy Hub manages projects"
              className="group relative aspect-video w-full cursor-pointer overflow-hidden border border-[#BFCFC8] bg-black text-left"
            >
              <video
                src={`${baseUrl}videos/Advertisement.mp4#t=0.001`}
                autoPlay={false}
                preload="metadata"
                playsInline
                muted
                className="h-full w-full object-cover opacity-85 transition-opacity group-hover:opacity-72"
              />
              <span className="absolute inset-0 bg-black/15" aria-hidden="true" />
              <span className="absolute bottom-0 left-0 flex w-full items-center justify-between gap-4 bg-gradient-to-t from-black/90 to-transparent px-5 pb-5 pt-16 text-white sm:px-7 sm:pb-7">
                <span className="text-base font-semibold sm:text-lg">Play the introduction</span>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/60 bg-white text-[#073A36]">
                  <Play aria-hidden="true" className="ml-0.5 h-5 w-5 fill-current" />
                </span>
              </span>
            </button>
          </div>
        </section>

        <section className="bg-[#073A36] py-20 text-white lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:px-12">
            <div>
              <h2 className="max-w-[14ch] font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl">
                Start with the help you need.
              </h2>
              <p className="mt-6 max-w-[58ch] text-lg leading-8 text-white/72">
                Compare packages for arrival support, guided visits, relocation, land purchase, and construction monitoring.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                to="/packages"
                onMouseEnter={() => import('./PackagesPage')}
                onTouchStart={() => import('./PackagesPage')}
                className="min-h-12 bg-[#F7FAF8] px-6 py-3 text-center font-semibold text-[#073A36] transition-colors hover:bg-white"
              >
                Compare packages
              </Link>
              <Link
                to="/partners"
                onMouseEnter={() => import('./PartnersPage')}
                onTouchStart={() => import('./PartnersPage')}
                className="min-h-12 border border-white/35 px-6 py-3 text-center font-semibold text-white transition-colors hover:border-white"
              >
                Meet building partners
              </Link>
            </div>
          </div>
        </section>
      </div>

      <PartnerDialog
        open={videoOpen}
        labelledBy="legacy-video-title"
        onClose={() => setVideoOpen(false)}
        className="max-w-5xl border-white/15 bg-black text-white"
      >
        <div className="p-3 sm:p-5">
          <header className="flex items-start justify-between gap-5 px-1 pb-4">
            <div>
              <h2 id="legacy-video-title" className="text-lg font-semibold sm:text-xl">
                How Legacy Hub manages projects
              </h2>
              <p className="mt-1 text-sm text-white/65">Land, relocation, and construction support in Ghana</p>
            </div>
            <button
              type="button"
              onClick={() => setVideoOpen(false)}
              aria-label="Close video"
              className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center border border-white/25 text-white transition-colors hover:bg-white/10"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </header>
          <video
            src={`${baseUrl}videos/Advertisement.mp4`}
            controls
            autoPlay
            playsInline
            className="aspect-video max-h-[75vh] w-full bg-black object-contain"
          />
        </div>
      </PartnerDialog>
    </>
  )
}
