import { motion, type Variants } from 'framer-motion'
import { CheckCircle2, XCircle, Globe } from 'lucide-react'

export function ExecutiveSummary() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  return (
    <section id="about" className="py-20 lg:py-40 bg-white relative overflow-hidden border-t border-gray-100 scroll-mt-24">
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Visual */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
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
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-[#0F766E]/50"></div>
              <span className="text-xs font-bold tracking-[0.3em] text-[#0F766E] uppercase">Who We Are</span>
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-10 leading-tight tracking-tight">
              Your Trusted Bridge <br /> to <span className="text-[#0F766E] italic font-light">Ghana.</span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-12 font-sans leading-relaxed">
              Legacy Growth and Development Hub is your dedicated partner for diaspora relocation, property acquisition, and investment support. We help Ghanaians abroad and the global African diaspora safely relocate, invest, and establish businesses back home.
            </motion.p>
            
            {/* What We Solve Grid */}
            <motion.div variants={itemVariants} className="mb-14">
              <h3 className="text-sm font-bold text-gray-500 mb-6 uppercase tracking-widest border-b border-gray-200 pb-4">The Challenges We Solve</h3>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <XCircle className="h-5 w-5 text-gray-300 shrink-0 mr-4 mt-1" aria-hidden="true" />
                  <span className="text-gray-500 font-sans text-lg line-through">No more land fraud, construction mismanagement, or documentation difficulties.</span>
                </li>
                <li className="flex items-start">
                  <XCircle className="h-5 w-5 text-gray-300 shrink-0 mr-4 mt-1" aria-hidden="true" />
                  <span className="text-gray-500 font-sans text-lg line-through">No more relocation stress or poor communication from unreliable local agents.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-[#0F766E] shrink-0 mr-4 mt-1" aria-hidden="true" />
                  <span className="text-gray-900 font-sans text-lg font-medium">We provide complete transparency, verified land acquisition, and end-to-end concierge support.</span>
                </li>
              </ul>
            </motion.div>
            
            {/* Who We Serve Pills */}
            <motion.div variants={itemVariants}>
              <h3 className="text-sm font-bold text-gray-500 mb-6 uppercase tracking-widest">Who We Serve</h3>
              <div className="flex flex-wrap gap-4">
                <span className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white border border-gray-200 text-sm font-bold tracking-wider text-gray-700 uppercase shadow-sm">
                  <Globe className="h-4 w-4 text-[#0F766E]" aria-hidden="true" />
                  USA, UK, Canada, EU
                </span>
                <span className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white border border-gray-200 text-sm font-bold tracking-wider text-gray-700 uppercase shadow-sm">
                  <Globe className="h-4 w-4 text-[#0F766E]" aria-hidden="true" />
                  Diaspora
                </span>
                <span className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white border border-gray-200 text-sm font-bold tracking-wider text-gray-700 uppercase shadow-sm">
                  <Globe className="h-4 w-4 text-[#0F766E]" aria-hidden="true" />
                  Retirees
                </span>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
