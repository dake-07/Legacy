const baseUrl = import.meta.env.BASE_URL

export interface ProjectDesign {
  title: string
  category: string
  image: string
}

export interface DeveloperPartner {
  id: string
  name: string
  tagline: string
  category: string
  projectManager?: string
  instagramUrl?: string
  experience: string
  completed: string
  location: string
  image: string
  specialties: string[]
  description: string
  designs?: ProjectDesign[]
}

export const richardOsabuteyDesigns: ProjectDesign[] = [
  {
    title: 'The Horizon Cantilever Villa',
    category: 'Luxury Contemporary Villa',
    image: `${baseUrl}partners/richard-osabutey/photo_20_2026-10-13_22-13-39.jpg`
  },
  {
    title: 'Modern Terracotta Residence',
    category: 'Minimalist Brick & Concrete',
    image: `${baseUrl}partners/richard-osabutey/photo_2_2026-10-13_22-13-38.jpg`
  },
  {
    title: 'Palm Grove Contemporary Duplex',
    category: '2-Story Family Residence',
    image: `${baseUrl}partners/richard-osabutey/photo_29_2026-10-13_22-13-39.jpg`
  },
  {
    title: 'Coastal Gated Enclave',
    category: 'Master Planned Subdivision',
    image: `${baseUrl}partners/richard-osabutey/photo_6_2026-10-13_22-13-38.jpg`
  },
  {
    title: 'Executive Stone Bungalow',
    category: 'Modern Single-Story Villa',
    image: `${baseUrl}partners/richard-osabutey/photo_1_2026-10-13_22-13-38.jpg`
  },
  {
    title: 'Townhouse Concrete Frame (Under Construction)',
    category: 'On-Site Construction In Progress',
    image: `${baseUrl}partners/richard-osabutey/photo_21_2026-10-13_22-13-39.jpg`
  },
  {
    title: 'Modern Townhouse 3D Concept',
    category: 'Multi-Unit Residential',
    image: `${baseUrl}partners/richard-osabutey/photo_26_2026-10-13_22-13-39.jpg`
  },
  {
    title: 'Two-Story Family Compound',
    category: 'Executive Residence',
    image: `${baseUrl}partners/richard-osabutey/photo_15_2026-10-13_22-13-39.jpg`
  },
  {
    title: 'Gated Townhome Master Site Plan',
    category: 'Aerial Architecture Layout',
    image: `${baseUrl}partners/richard-osabutey/photo_25_2026-10-13_22-13-39.jpg`
  },
  {
    title: 'Linear Modern Townhome Cluster',
    category: 'Subdivision Perspective',
    image: `${baseUrl}partners/richard-osabutey/photo_28_2026-10-13_22-13-39.jpg`
  },
  {
    title: 'Executive Villa with Covered Carport',
    category: 'Contemporary Villa',
    image: `${baseUrl}partners/richard-osabutey/photo_14_2026-10-13_22-13-38.jpg`
  },
  {
    title: 'Modern Linear Villa Elevation',
    category: 'Architectural Elevation',
    image: `${baseUrl}partners/richard-osabutey/photo_22_2026-10-13_22-13-39.jpg`
  },
  {
    title: 'Suburban Courtyard Family Home',
    category: 'Residential Design',
    image: `${baseUrl}partners/richard-osabutey/photo_23_2026-10-13_22-13-39.jpg`
  },
  {
    title: 'Minimalist Single-Story Residence',
    category: 'Custom Home Concept',
    image: `${baseUrl}partners/richard-osabutey/photo_8_2026-10-13_22-13-38.jpg`
  },
  {
    title: 'Two-Tone Modern Duplex',
    category: 'Contemporary Duplex',
    image: `${baseUrl}partners/richard-osabutey/photo_11_2026-10-13_22-13-38.jpg`
  },
  {
    title: 'Architectural Facade Study',
    category: 'Design Concept',
    image: `${baseUrl}partners/richard-osabutey/photo_12_2026-10-13_22-13-38.jpg`
  },
  {
    title: 'Modern Roofline Villa',
    category: 'Residential Architecture',
    image: `${baseUrl}partners/richard-osabutey/photo_13_2026-10-13_22-13-38.jpg`
  },
  {
    title: 'Geometric Cantilever Home',
    category: 'Contemporary Design',
    image: `${baseUrl}partners/richard-osabutey/photo_16_2026-10-13_22-13-39.jpg`
  },
  {
    title: 'Urban Family Compound',
    category: 'Executive Villa',
    image: `${baseUrl}partners/richard-osabutey/photo_18_2026-10-13_22-13-39.jpg`
  },
  {
    title: 'Terraced Ridge Residence Concept',
    category: 'Hillside Architecture',
    image: `${baseUrl}partners/richard-osabutey/photo_2026-10-13_22-12-45.jpg`
  }
]

export const rakArchitectureDesigns: ProjectDesign[] = [
  {
    title: 'The Lumina Modern Villa & Pool',
    category: 'Luxury Contemporary Residence (Dusk View)',
    image: `${baseUrl}partners/rak-architecture/lumina-villa-dusk.jpg`
  },
  {
    title: 'The Lumina Gated Residence',
    category: 'Modern Gated Villa (Daylight Elevation)',
    image: `${baseUrl}partners/rak-architecture/lumina-estate-daylight.jpg`
  },
  {
    title: 'Panorama Heights Multi-Unit Residences',
    category: 'Multi-Level Contemporary Apartments',
    image: `${baseUrl}partners/rak-architecture/panorama-apartments.jpg`
  }
]

export const developerPartners: DeveloperPartner[] = [
  {
    id: 'richard-osabutey',
    name: 'Richard Osabutey',
    tagline: 'Architectural Designer & Custom Home Builder',
    category: 'Architectural Design & Build',
    projectManager: 'Richard Osabutey',
    experience: 'Over 10 Years',
    completed: '25+ Design Projects',
    location: 'Greater Accra & Nationwide',
    image: `${baseUrl}partners/richard-osabutey/photo_20_2026-10-13_22-13-39.jpg`,
    specialties: [
      'Custom Home Design',
      '3D Plans & Visuals',
      'Modern Family Homes',
      'On-Site Supervision'
    ],
    description: 'A trusted designer and builder with over 10 years of experience helping diaspora families build quality homes in Ghana. Known for honest communication, dependable timelines, and hands-on supervision from the first drawing to the finished build.',
    designs: richardOsabuteyDesigns
  },
  {
    id: 'rak-architecture',
    name: 'RAK Architecture',
    tagline: 'Modern Architectural Design & Residential Development',
    category: 'Contemporary Architecture & Build',
    projectManager: 'Richard Adu Koranteng',
    instagramUrl: 'https://www.instagram.com/rak_architecture_gh?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw==',
    experience: 'Over 8 Years',
    completed: '30+ Custom Projects',
    location: 'Accra & Nationwide',
    image: `${baseUrl}partners/rak-architecture/lumina-villa-dusk.jpg`,
    specialties: [
      'Luxury Villa Architecture',
      'Multi-Residential Apartments',
      'Photorealistic 3D Renders',
      'Turnkey Project Supervision'
    ],
    description: 'RAK Architecture is an innovative Ghanaian architectural design and development firm led by Project Manager Richard Adu Koranteng. Specializing in bespoke luxury villas, contemporary multi-family residences, and end-to-end site management, they craft world-class homes with uncompromising precision.',
    designs: rakArchitectureDesigns
  }
]

