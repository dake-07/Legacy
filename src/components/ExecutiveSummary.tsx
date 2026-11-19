import { Check, FileSearch, Scale, Camera, Send } from 'lucide-react'

const projectRecord = [
  { icon: FileSearch, title: 'Title search completed', detail: 'Ownership and land records reviewed' },
  { icon: Scale, title: 'Legal documents reviewed', detail: 'Terms checked before commitment' },
  { icon: Camera, title: 'Site milestone recorded', detail: 'Photo and video evidence attached' },
  { icon: Send, title: 'Client update delivered', detail: 'Progress summary sent abroad' },
]

export function ExecutiveSummary() {
  return (
    <section id="proof" className="scroll-mt-24 border-b border-[#DDE5E1] bg-[#F7FAF8] py-20 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20 lg:px-12">
        <div className="lg:sticky lg:top-28">
          <p className="mb-5 text-base font-semibold text-[#0B554E]">Proof before promises</p>
          <h2 className="max-w-[13ch] font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#111815] sm:text-5xl lg:text-6xl">
            Know what is happening on the ground.
          </h2>
          <p className="mt-7 max-w-[58ch] text-lg leading-8 text-[#3D4B46]">
            Distance should not mean uncertainty. Legacy Hub coordinates the local checks, records the evidence, and explains what needs your decision before money or construction moves forward.
          </p>
          <p className="mt-8 max-w-[56ch] border-l-2 border-[#C7A85A] pl-5 text-base leading-7 text-[#3D4B46]">
            Built for diaspora clients, retirees, and investors who need a dependable Ghana-based team without giving up visibility.
          </p>
        </div>

        <article aria-labelledby="project-record-title" className="border border-[#BFCFC8] bg-white">
          <header className="flex flex-col gap-4 border-b border-[#DDE5E1] px-5 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-8">
            <div>
              <p className="text-sm text-[#5B6B65]">Example client workflow</p>
              <h3 id="project-record-title" className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-[#111815]">
                Project verification record
              </h3>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-sm bg-[#E7F1ED] px-3 py-2 text-sm font-semibold text-[#0B554E]">
              <Check aria-hidden="true" className="h-4 w-4" />
              Evidence recorded
            </span>
          </header>

          <ol className="divide-y divide-[#DDE5E1]">
            {projectRecord.map((item, index) => {
              const Icon = item.icon
              return (
                <li key={item.title} className="grid grid-cols-[auto_1fr_auto] items-start gap-4 px-5 py-6 sm:gap-6 sm:px-8">
                  <span className="flex h-10 w-10 items-center justify-center border border-[#BFCFC8] bg-[#F7FAF8] text-[#0B554E]">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="font-semibold text-[#111815]">{item.title}</h4>
                    <p className="mt-1 text-sm leading-6 text-[#5B6B65]">{item.detail}</p>
                  </div>
                  <span className="pt-2 text-sm tabular-nums text-[#74827D]">{index + 1} of 4</span>
                </li>
              )
            })}
          </ol>

          <footer className="grid gap-4 bg-[#073A36] px-5 py-6 text-white sm:grid-cols-[1fr_auto] sm:items-center sm:px-8">
            <p className="max-w-[48ch] text-sm leading-6 text-white/75">
              Each step creates a record the client can review before the project advances.
            </p>
            <span className="text-sm font-semibold text-[#E3CC91]">Review before approval</span>
          </footer>
        </article>
      </div>
    </section>
  )
}
