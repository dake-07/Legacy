type Photo = { src: string; alt: string }

// Add real project photos here (the files go in public/portfolio/)
const photos: Photo[] = []

export function Gallery() {
  return (
    <section id="gallery" className="py-40 bg-white relative overflow-hidden border-t border-gray-100 scroll-mt-24">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="w-16 h-[1px] bg-[#0F766E]/40"></div>
            <span className="text-xs font-bold tracking-[0.3em] text-[#0F766E] uppercase">Our Portfolio</span>
            <div className="w-16 h-[1px] bg-[#0F766E]/40"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6 tracking-tight">Project Gallery</h1>
        </div>

        {photos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <div key={photo.src} className="aspect-[4/5] bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden group relative transition-transform duration-700 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                <img src={photo.src} alt={photo.alt} width={800} height={1000} loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#0F766E]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center bg-gray-50 border border-gray-200 rounded-3xl px-8 py-16">
            <p className="text-2xl font-serif font-bold text-gray-900 mb-4">Project Photos Are Coming Soon</p>
            <p className="text-gray-600 font-sans leading-relaxed mb-8">
              Photos from recent projects are on their way. Until then, call to ask for examples of work like yours.
            </p>
            <a href="tel:+233502323196" className="inline-flex items-center justify-center h-14 px-8 bg-[#0F766E] text-white hover:bg-[#134E4A] transition-colors rounded-full text-sm font-bold uppercase tracking-widest">
              Call +233&nbsp;50&nbsp;232&nbsp;3196
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
