export function Gallery() {
  return (
    <section id="gallery" className="py-40 bg-white relative overflow-hidden border-t border-gray-100">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="w-16 h-[1px] bg-[#0F766E]/40"></div>
            <span className="text-xs font-bold tracking-[0.3em] text-[#0F766E] uppercase">Our Portfolio</span>
            <div className="w-16 h-[1px] bg-[#0F766E]/40"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6 tracking-tight">Project Gallery</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="aspect-[4/5] bg-gray-50 rounded-3xl flex items-center justify-center border border-gray-200 overflow-hidden group relative transition-transform duration-700 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
              <span className="text-gray-400 font-sans font-medium z-10 text-sm uppercase tracking-widest">[Image {item}]</span>
              <div className="absolute inset-0 bg-[#0F766E]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
