import { motion } from 'framer-motion'
import { Eye, Target } from 'lucide-react'

export function VisionMission() {
  return (
    <section className="py-40 bg-transparent relative overflow-hidden border-t border-black/5">
      {/* Abstract Background Design */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0F766E]/15 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0F766E]/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">
          
          {/* Vision Statement */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center">
                <Eye className="h-5 w-5 text-gray-500" aria-hidden="true" />
              </div>
              <span className="text-xs font-bold tracking-[0.3em] text-gray-500 uppercase">Our Vision</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight relative tracking-tight">
              <span aria-hidden="true" className="absolute -top-12 -left-8 text-9xl text-gray-100 font-serif leading-none select-none">“</span>
              To become the leading diaspora relocation and property development support company in Ghana and Africa.
            </h2>
          </motion.div>

          {/* Mission Statement */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="bg-white/80 border border-gray-200 backdrop-blur-xl p-12 md:p-16 rounded-[2.5rem] shadow-xl relative overflow-hidden h-full flex flex-col justify-center group">
              {/* Card Background Pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0F766E]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-[#0F766E]/20 transition-colors duration-700"></div>
              
              <div className="flex items-center gap-4 mb-10 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#0F766E]/10 flex items-center justify-center border border-[#0F766E]/30 group-hover:bg-[#0F766E]/20 transition-colors duration-500">
                  <Target className="h-5 w-5 text-[#0F766E]" aria-hidden="true" />
                </div>
                <span className="text-xs font-bold tracking-[0.3em] text-[#0F766E] uppercase">Our Mission</span>
              </div>
              
              <p className="text-3xl md:text-4xl font-serif text-gray-600 leading-relaxed relative z-10 font-light group-hover:text-gray-900 transition-colors duration-500">
                To provide trusted, transparent, and professional solutions that help diaspora communities safely <span className="text-[#0F766E] font-bold italic">reconnect, invest, and build</span> sustainable legacies in Ghana.
              </p>
            </div>
            
            {/* Decorative Dots */}
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[radial-gradient(#0F766E_2px,transparent_2px)] [background-size:16px_16px] opacity-30 z-0 pointer-events-none"></div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
