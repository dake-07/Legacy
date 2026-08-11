import { motion, type Variants } from 'framer-motion'
import { Briefcase, Monitor, Globe, Landmark } from 'lucide-react'
import { Card, CardContent } from './ui/card'

export function ManagementTeam() {
  const team = [
    {
      name: "Peter Asare",
      role: "CEO / Business Development",
      icon: <Briefcase className="w-10 h-10 text-[#0F766E]" />,
      description: "Leading the strategic vision and growth of Legacy Hub, ensuring premium service delivery for all diaspora clients."
    },
    {
      name: "Kelvin",
      role: "IT Officer",
      icon: <Monitor className="w-10 h-10 text-[#0F766E]" />,
      description: "Managing our digital infrastructure and ensuring seamless, secure communication channels for international investors."
    },
    {
      name: "Valerie Brown",
      role: "Partner - USA",
      icon: <Globe className="w-10 h-10 text-[#0F766E]" />,
      description: "Our direct liaison in the United States, providing localized support and trust for North American diaspora clients."
    },
    {
      name: "Nana Abore Atta 11",
      role: "Chief of Gomoa Fetteh",
      icon: <Landmark className="w-10 h-10 text-[#0F766E]" />,
      description: "Providing unparalleled local authority, land verification, and traditional governance support to ensure secure acquisitions."
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section id="team" className="py-40 bg-transparent relative overflow-hidden border-t border-black/5">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#0F766E]/10 rounded-l-[150px] pointer-events-none -z-0 blur-[80px]"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-32"
        >
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="w-16 h-[1px] bg-[#0F766E]/40"></div>
            <span className="text-xs font-bold tracking-[0.3em] text-[#0F766E] uppercase">Leadership</span>
            <div className="w-16 h-[1px] bg-[#0F766E]/40"></div>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 mb-8 tracking-tight">Management Team</h2>
          <p className="text-lg md:text-xl text-gray-600 font-sans max-w-2xl mx-auto leading-relaxed">
            The trusted experts, international partners, and local authorities behind Legacy Growth & Development Hub.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {team.map((member, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <Card className="h-full border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-700 bg-white group hover:-translate-y-3 rounded-[2.5rem] overflow-hidden">
                <CardContent className="p-10 text-center flex flex-col items-center h-full relative">
                  
                  {/* Subtle Background Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0F766E]/0 to-[#0F766E]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                  {/* Icon Container */}
                  <div className="w-24 h-24 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center mb-10 group-hover:border-[#0F766E]/30 group-hover:bg-[#0F766E]/5 transition-all duration-700 relative z-10">
                    {member.icon}
                  </div>
                  
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3 relative z-10 group-hover:text-[#0F766E] transition-colors duration-500">{member.name}</h3>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#0F766E] mb-8 relative z-10">{member.role}</p>
                  
                  {/* Decorative Line */}
                  <div className="w-12 h-[1px] bg-gray-200 mb-8 group-hover:bg-[#0F766E]/50 transition-colors duration-500 relative z-10"></div>
                  
                  <p className="text-gray-600 font-sans leading-relaxed text-sm relative z-10 group-hover:text-gray-900 transition-colors duration-500">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
