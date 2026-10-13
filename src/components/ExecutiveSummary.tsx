import { motion, type Variants } from 'framer-motion'
import { CheckCircle2, XCircle, Globe, ShieldCheck } from 'lucide-react'

export function ExecutiveSummary() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <section id="about" className="py-20 lg:py-32 bg-white relative overflow-hidden border-t border-gray-100 scroll-mt-24">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Visual */}
          <motion.div 
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-200 group">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
              <img 
                src={`${import.meta.env.BASE_URL}about_us.webp`} 
                alt="Consultant showing a client around a modern home interior" 
                width={1024}
                height={1024}
                loading="lazy"
                className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none opacity-60"></div>
              
              {/* Floating Glass Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="absolute bottom-6 right-4 sm:-right-6 md:-right-8 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl p-6 shadow-xl max-w-[210px] z-20"
              >
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="h-8 w-8 text-[#0F766E]" aria-hidden="true" />
                  <span className="text-3xl font-serif font-bold text-gray-900 tabular-nums">100%</span>
                </div>
                <p className="text-xs font-sans text-gray-600 font-semibold leading-snug">Verified Land &amp; Property Documentation</p>
              </motion.div>
            </div>
            
            {/* Background Blob for Depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#0F766E]/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
          </motion.div>

          {/* Right Side: Copy */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-2xl"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[1px] bg-[#0F766E]/50"></div>
              <span className="text-sm font-semibold text-[#0F766E]">Who We Are</span>
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              Your Trusted Bridge <br /> to <span className="text-[#0F766E] italic font-light">Ghana.</span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-gray-600 mb-8 font-sans leading-relaxed">
              Legacy Growth and Development Hub is your dedicated partner for diaspora relocation, property acquisition, and investment support. We help Ghanaians abroad and the global African diaspora safely relocate, invest, and establish businesses back home.
            </motion.p>
            
            {/* What We Solve List */}
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-sm font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">The Challenges We Solve</h3>
              <ul className="space-y-3.5">
                <li className="flex items-start">
                  <XCircle className="h-5 w-5 text-gray-400 shrink-0 mr-3 mt-0.5" aria-hidden="true" />
                  <span className="text-gray-500 font-sans text-sm sm:text-base">No more land fraud, contractor abandonment, or title documentation difficulties.</span>
                </li>
                <li className="flex items-start">
                  <XCircle className="h-5 w-5 text-gray-400 shrink-0 mr-3 mt-0.5" aria-hidden="true" />
                  <span className="text-gray-500 font-sans text-sm sm:text-base">No more relocation stress or opaque communication from unverified local contacts.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-[#0F766E] shrink-0 mr-3 mt-0.5" aria-hidden="true" />
                  <span className="text-gray-900 font-sans text-sm sm:text-base font-medium">Complete institutional transparency, verified land deeds, and on-site engineering oversight.</span>
                </li>
              </ul>
            </motion.div>
            
            {/* Who We Serve Pills */}
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-bold text-gray-800 mb-3.5">Who We Serve</h3>
              <div className="flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-xs sm:text-sm font-medium text-gray-700">
                  <Globe className="h-3.5 w-3.5 text-[#0F766E]" aria-hidden="true" />
                  USA, UK, Canada &amp; Europe
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-xs sm:text-sm font-medium text-gray-700">
                  <Globe className="h-3.5 w-3.5 text-[#0F766E]" aria-hidden="true" />
                  Returning Diaspora
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-xs sm:text-sm font-medium text-gray-700">
                  <Globe className="h-3.5 w-3.5 text-[#0F766E]" aria-hidden="true" />
                  Retirees &amp; Investors
                </span>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
