import { Eye, Target } from 'lucide-react'

export function VisionMission() {
  return (
    <section className="border-b border-[#BFCFC8] bg-[#F7FAF8] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <header className="grid gap-8 border-b border-[#BFCFC8] pb-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-base font-semibold text-[#0B554E]">About Legacy Hub</p>
            <h1 className="mt-4 max-w-[12ch] font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#111815] sm:text-5xl lg:text-6xl">
              Local knowledge with accountable support.
            </h1>
          </div>
          <p className="max-w-[62ch] text-lg leading-8 text-[#4C5B55] lg:justify-self-end">
            We help people abroad make property, relocation, and development decisions in Ghana with clearer evidence and dependable local coordination.
          </p>
        </header>

        <div className="grid lg:grid-cols-2">
          <article className="py-10 lg:pr-12">
            <Eye aria-hidden="true" className="h-7 w-7 text-[#0B554E]" />
            <h2 className="mt-5 text-xl font-semibold text-[#111815]">Our vision</h2>
            <p className="mt-5 max-w-[40ch] font-serif text-3xl leading-[1.35] text-[#27342F]">
              To become a trusted standard for diaspora relocation and property-development support in Ghana and across Africa.
            </p>
          </article>

          <article className="border-t border-[#BFCFC8] py-10 lg:border-l lg:border-t-0 lg:pl-12">
            <Target aria-hidden="true" className="h-7 w-7 text-[#0B554E]" />
            <h2 className="mt-5 text-xl font-semibold text-[#111815]">Our mission</h2>
            <p className="mt-5 max-w-[42ch] text-xl leading-9 text-[#3D4B46]">
              Provide transparent, professional coordination that helps diaspora communities reconnect, invest, relocate, and build in Ghana with greater confidence.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
