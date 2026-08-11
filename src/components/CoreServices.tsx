import { ShieldCheck, Search, TrendingUp, Clock } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { motion, type Variants } from 'framer-motion'

export function CoreServices() {
  const services = [
    {
      num: "01",
      icon: <Clock className="h-8 w-8 text-[#0F766E]" />,
      title: "Convenience",
      description: "We handle the legwork, saving you time and stress while you focus on your goals."
    },
    {
      num: "02",
      icon: <ShieldCheck className="h-8 w-8 text-[#0F766E]" />,
      title: "Trust",
      description: "Reliable and verified partners ensuring your investments are secure."
    },
    {
      num: "03",
      icon: <Search className="h-8 w-8 text-[#0F766E]" />,
      title: "Transparency",
      description: "Clear communication, honest pricing, and regular updates at every step."
    },
    {
      num: "04",
      icon: <TrendingUp className="h-8 w-8 text-[#0F766E]" />,
      title: "Scalable Support",
      description: "From a single visit to complex development projects, our services scale with your needs."
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section id="services" className="py-20 lg:py-40 bg-white relative overflow-hidden border-t border-gray-100">
      {/* Liquid Glass Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-[#0F766E]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-[#0F766E]/10 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-16 lg:mb-32"
        >
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="w-16 h-[1px] bg-[#0F766E]/40"></div>
            <span className="text-xs font-bold tracking-[0.3em] text-[#0F766E] uppercase">Our Foundation</span>
            <div className="w-16 h-[1px] bg-[#0F766E]/40"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-gray-900 tracking-tight">Core Values</h2>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <Card className="h-full bg-[#F0FDFA] border border-gray-100 rounded-[2.5rem] p-10 md:p-12 hover:-translate-y-2 transition-all duration-500 hover:shadow-xl group relative overflow-hidden">
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-white border border-gray-100 rounded-3xl opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:border-[#0F766E]/30"></div>
                
                {/* Background Watermark Number */}
                <div className="absolute -bottom-2 right-4 text-[140px] font-serif font-bold text-black/[0.03] select-none pointer-events-none group-hover:text-[#0F766E]/10 transition-colors duration-700">
                  {service.num}
                </div>

                <CardContent className="p-0 relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center mb-10 group-hover:border-[#0F766E]/50 transition-all duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-5 group-hover:text-[#0F766E] transition-colors duration-500">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-sans text-lg group-hover:text-gray-900 transition-colors duration-500">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
