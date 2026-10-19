import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Briefcase, Monitor, Globe, Landmark } from 'lucide-react'
import { Card, CardContent } from './ui/card'

const baseUrl = import.meta.env.BASE_URL

interface TeamMember {
  name: string
  role: string
  image?: string
  imageFallback?: string
  objectPosition?: string
  icon: React.ReactNode
  badgeIcon: React.ReactNode
  description: string
}

function TeamAvatar({ member }: { member: TeamMember }) {
  const [imgError, setImgError] = useState(false)
  const hasImage = Boolean(member.image && !imgError)

  return (
    <div className="relative mb-8 group/avatar">
      {/* Outer Ambient Ring */}
      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#0F766E]/20 via-[#14B8A6]/10 to-[#0F766E]/30 shadow-md group-hover:shadow-xl group-hover:from-[#0F766E] group-hover:to-[#14B8A6] transition-all duration-500">
        <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-teal-50 to-white ring-2 ring-white flex items-center justify-center relative">
          {hasImage ? (
            <picture className="w-full h-full">
              <source srcSet={member.image} type="image/webp" />
              <img
                src={member.imageFallback || member.image}
                alt={`Portrait of ${member.name}`}
                loading="lazy"
                onError={() => setImgError(true)}
                style={{ objectPosition: member.objectPosition || 'center top' }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </picture>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-teal-50/50 group-hover:bg-teal-50/80 transition-colors duration-500">
              {member.icon}
            </div>
          )}
        </div>
      </div>

      {/* Domain Badge (shown on image avatars) */}
      {hasImage && (
        <div 
          className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-white border border-teal-100 shadow-md flex items-center justify-center text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white transition-all duration-300 ring-2 ring-white z-10"
          aria-hidden="true"
        >
          {member.badgeIcon}
        </div>
      )}
    </div>
  )
}

export function ManagementTeam() {
  const team: TeamMember[] = [
    {
      name: "Peter Asare",
      role: "CEO / Business Development",
      image: `${baseUrl}team/peter-asare.webp`,
      imageFallback: `${baseUrl}team/peter-asare.jpg`,
      objectPosition: "50% 20%",
      icon: <Briefcase className="w-10 h-10 text-[#0F766E]" aria-hidden="true" />,
      badgeIcon: <Briefcase className="w-4 h-4 text-[#0F766E]" aria-hidden="true" />,
      description: "Leading the strategic vision and growth of Legacy Hub, ensuring premium service delivery for all diaspora clients."
    },
    {
      name: "Kelvin",
      role: "IT Officer",
      icon: <Monitor className="w-10 h-10 text-[#0F766E]" aria-hidden="true" />,
      badgeIcon: <Monitor className="w-4 h-4 text-[#0F766E]" aria-hidden="true" />,
      description: "Managing our digital infrastructure and ensuring seamless, secure communication channels for international investors."
    },
    {
      name: "Valerie Brown",
      role: "Partner - USA",
      icon: <Globe className="w-10 h-10 text-[#0F766E]" aria-hidden="true" />,
      badgeIcon: <Globe className="w-4 h-4 text-[#0F766E]" aria-hidden="true" />,
      description: "Our direct liaison in the United States, providing localized support and trust for North American diaspora clients."
    },
    {
      name: "Nana Abore Attah II",
      role: "Chief of Gomoa Fetteh",
      image: `${baseUrl}team/nana-abore-attah.webp`,
      imageFallback: `${baseUrl}team/nana-abore-attah.jpg`,
      objectPosition: "50% 15%",
      icon: <Landmark className="w-10 h-10 text-[#0F766E]" aria-hidden="true" />,
      badgeIcon: <Landmark className="w-4 h-4 text-[#0F766E]" aria-hidden="true" />,
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
    <section id="team" className="py-40 bg-transparent relative overflow-hidden border-t border-black/5 scroll-mt-24">
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
              <Card className="h-full border border-gray-200 shadow-sm hover:shadow-xl transition-[transform,box-shadow] duration-500 bg-white group hover:-translate-y-3 rounded-[2.5rem] overflow-hidden">
                <CardContent className="p-8 sm:p-10 text-center flex flex-col items-center h-full relative">
                  
                  {/* Subtle Background Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0F766E]/0 to-[#0F766E]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                  {/* Team Avatar / Portrait */}
                  <TeamAvatar member={member} />
                  
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
