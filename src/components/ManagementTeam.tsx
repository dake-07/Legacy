import { useState, type ReactNode } from 'react'
import { Briefcase, Globe, Landmark, Monitor } from 'lucide-react'

const baseUrl = import.meta.env.BASE_URL

type TeamMember = {
  name: string
  role: string
  description: string
  image?: string
  imageFallback?: string
  objectPosition?: string
  fallback: ReactNode
}

const team: TeamMember[] = [
  {
    name: 'Peter Asare',
    role: 'CEO and business development',
    image: `${baseUrl}team/peter-asare.webp`,
    imageFallback: `${baseUrl}team/peter-asare.jpg`,
    objectPosition: '50% 20%',
    fallback: <Briefcase aria-hidden="true" className="h-10 w-10" />,
    description: 'Leads strategy, client relationships, and service delivery for diaspora property and relocation projects.',
  },
  {
    name: 'Kelvin',
    role: 'IT officer',
    fallback: <Monitor aria-hidden="true" className="h-10 w-10" />,
    description: 'Maintains the digital systems used to communicate project information with clients across borders.',
  },
  {
    name: 'Driskell Brown',
    role: 'United States partner',
    image: `${baseUrl}team/driskell-brown.webp`,
    imageFallback: `${baseUrl}team/driskell-brown.jpg`,
    objectPosition: '50% 20%',
    fallback: <Globe aria-hidden="true" className="h-10 w-10" />,
    description: 'Provides a direct point of contact and local context for clients based in North America.',
  },
  {
    name: 'Nana Abore Attah II',
    role: 'Chief of Gomoa Fetteh',
    image: `${baseUrl}team/nana-abore-attah.webp`,
    imageFallback: `${baseUrl}team/nana-abore-attah.jpg`,
    objectPosition: '50% 15%',
    fallback: <Landmark aria-hidden="true" className="h-10 w-10" />,
    description: 'Brings local authority, land context, and traditional-governance insight to acquisition work.',
  },
]

function TeamPortrait({ member }: { member: TeamMember }) {
  const [imageError, setImageError] = useState(false)

  if (!member.image || imageError) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center bg-[#E7F1ED] text-[#0B554E]">
        {member.fallback}
      </div>
    )
  }

  return (
    <picture className="block aspect-[4/3] overflow-hidden bg-[#E7F1ED]">
      <source srcSet={member.image} type="image/webp" />
      <img
        src={member.imageFallback || member.image}
        alt={`Portrait of ${member.name}`}
        loading="lazy"
        onError={() => setImageError(true)}
        style={{ objectPosition: member.objectPosition || 'center top' }}
        className="h-full w-full object-cover"
      />
    </picture>
  )
}

export function ManagementTeam() {
  return (
    <section id="team" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <header className="grid gap-7 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <h2 className="font-serif text-4xl font-semibold tracking-[-0.035em] text-[#111815] sm:text-5xl">
            The people responsible for the work
          </h2>
          <p className="max-w-[58ch] text-lg leading-8 text-[#4C5B55] lg:justify-self-end">
            Leadership, technical support, international coordination, and local authority working across one client experience.
          </p>
        </header>

        <div className="mt-12 grid border-l border-t border-[#BFCFC8] md:grid-cols-2">
          {team.map(member => (
            <article key={member.name} className="grid border-b border-r border-[#BFCFC8] sm:grid-cols-[0.8fr_1.2fr]">
              <TeamPortrait member={member} />
              <div className="flex flex-col p-6 sm:p-7">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#111815]">{member.name}</h3>
                <p className="mt-2 text-sm font-semibold text-[#0B554E]">{member.role}</p>
                <p className="mt-5 text-sm leading-7 text-[#5B6B65]">{member.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
