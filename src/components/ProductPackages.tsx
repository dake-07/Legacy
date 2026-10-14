import { useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from './ui/button'
import { motion } from 'framer-motion'
import { packages, constructionPackage } from './packages/data'
import { PackageCard } from './packages/PackageCard'
import { BookingDialog } from './packages/BookingDialog'

export function ProductPackages() {
  const [booking, setBooking] = useState({ name: '', price: '', open: false, requestId: 0 })
  const handleOpenModal = (name: string, price: string) => {
    setBooking(previous => ({ name, price, open: true, requestId: previous.requestId + 1 }))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <section id="packages" className="py-20 lg:py-40 bg-transparent relative overflow-hidden scroll-mt-24">
      {/* Abstract Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[#0F766E]/15 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-[#0F766E]/10 rounded-full blur-[120px]"></div>
      </div>
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-32"
        >
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="w-16 h-[1px] bg-[#0F766E]/40"></div>
            <span className="text-xs font-bold tracking-[0.3em] text-[#0F766E] uppercase">Our Packages</span>
            <div className="w-16 h-[1px] bg-[#0F766E]/40"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-gray-900 mb-8 tracking-tight">Arrival & Visit</h2>
          <p className="text-lg md:text-xl text-gray-600 font-sans max-w-2xl mx-auto leading-relaxed">Ideal for land inspections, relocation planning, investment exploration, property acquisition, and building projects.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 lg:mb-32"
        >
          {packages.map((pkg, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
<PackageCard pkg={pkg} onSelect={handleOpenModal} />
            </motion.div>
          ))}
        </motion.div>

        {/* Construction Package Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
            <div className="absolute inset-0 bg-[radial-gradient(#0F766E_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.05]"></div>
            
            <div className="p-12 md:p-20 md:w-5/12 flex flex-col justify-center relative z-10">
              <div className="inline-flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-[#0F766E]/50"></div>
                <span className="text-xs font-bold tracking-[0.2em] text-[#0F766E] uppercase">Development</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-8 leading-tight tracking-tight">{constructionPackage.name}</h2>
              <div className="flex items-baseline mb-12">
                <div className="text-xl text-gray-500 font-sans">Full pricing unlocked upon request</div>
              </div>
              <Button 
                onClick={() => handleOpenModal(constructionPackage.name, constructionPackage.price)}
                className="bg-black text-white hover:bg-gray-800 font-bold uppercase tracking-widest text-sm h-14 w-fit px-8 cursor-pointer rounded-full flex items-center gap-3 transition-[transform,background-color] duration-300 hover:scale-105"
              >
                Subscribe Now
                <div className="w-2 h-2 bg-white rotate-45" aria-hidden="true"></div>
              </Button>
            </div>
            
            <div className="p-12 md:p-20 md:w-7/12 flex flex-col justify-center relative z-10 bg-gray-50 border-l border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-10 font-serif">What’s included monthly:</h3>
              <ul className="space-y-8">
                {constructionPackage.features.map((feature, index) => (
                  <li key={index} className="flex items-center group">
                    <div className="bg-white p-3 rounded-full mr-6 shrink-0 transition-colors border border-gray-200 group-hover:border-[#0F766E]/30 shadow-sm">
                      <Check className="h-5 w-5 text-[#0F766E]" aria-hidden="true" />
                    </div>
                    <span className="font-sans text-lg text-gray-600 group-hover:text-gray-900 transition-colors">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      <BookingDialog
        key={booking.requestId}
        isModalOpen={booking.open}
        selectedPackage={booking.name}
        selectedPrice={booking.price}
        onClose={() => setBooking(previous => ({ ...previous, open: false }))}
      />
    </section>
  )
}
