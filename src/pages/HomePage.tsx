import { Hero } from '../components/Hero'
import { ExecutiveSummary } from '../components/ExecutiveSummary'
import { CoreServices } from '../components/CoreServices'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Legacy | Relocation & Real Estate</title>
        <meta name="description" content="Comprehensive relocation, land acquisition, and construction monitoring services." />
      </Helmet>
      <div>
        <Hero />
      <ExecutiveSummary />
      <CoreServices />
      
      {/* Packages Teaser */}
      <section className="py-24 bg-[#F0FDFA] relative overflow-hidden border-t border-[#99F6E4]/30">
        <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#134E4A] mb-6 tracking-tight">Ready to Secure Your Legacy?</h2>
            <p className="text-lg text-[#134E4A]/70 font-sans max-w-2xl mx-auto mb-10">Explore our comprehensive relocation, land acquisition, and construction monitoring packages tailored to your exact needs.</p>
            <Link 
              to="/packages"
              className="inline-flex items-center gap-3 bg-[#0F766E] text-white hover:bg-[#134E4A] transition-[background-color,transform,box-shadow] duration-300 pl-8 pr-3 py-3 rounded-full text-sm font-bold uppercase tracking-widest group mx-auto shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              View Our Packages
              <div className="w-10 h-10 rounded-full bg-white text-[#0F766E] flex items-center justify-center group-hover:bg-[#E8F0F3] transition-colors shrink-0">
                <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  )
}
