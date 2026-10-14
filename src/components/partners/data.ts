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

export const developerPartners: DeveloperPartner[] = [
  {
    id: 'richard-osabutey',
    name: 'Richard Osabutey',
    tagline: 'Architectural Designer & Custom Home Builder',
    category: 'Architectural Design & Build',
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
    id: 'goldcoast-estates',
    name: 'GoldCoast Modular & Estates',
    tagline: 'Modern Townhomes & Master-Planned Gated Communities',
    category: 'Townhomes & Estates',
    experience: '16 Years',
    completed: '45+ Units',
    location: 'Accra, Tema & Takoradi',
    image: `${baseUrl}portfolio/project-10.webp`,
    specialties: [
      'Multi-Unit Duplexes',
      'Master Planned Communities',
      'Pre-Cast Slab Systems',
      'Private Perimeter Security'
    ],
    description: 'The preferred partner for diaspora families and investment syndicates seeking multi-unit townhomes with strict milestone delivery schedules.'
  },
  {
    id: 'terraform-civil',
    name: 'TerraForm Civil & Land Works',
    tagline: 'Site Topography Grading, Boundary Fortification & Drainage',
    category: 'Civil & Earthwork',
    experience: '12 Years',
    completed: '60+ Sites',
    location: 'Greater Accra, Central & Eastern Regions',
    image: `${baseUrl}portfolio/project-02.webp`,
    specialties: [
      'Heavy Site Excavation',
      'Anti-Encroachment Boundary Walls',
      'Heavy Supply Access Roads',
      'Stormwater Culverts'
    ],
    description: 'Secures and fortifies raw land with geodetic boundary markers, retaining walls, and engineered road access prior to construction.'
  },
  {
    id: 'ecohaus-ghana',
    name: 'EcoHaus Sustainable Builders',
    tagline: 'Biophilic Architecture, Natural Cooling & Eco Villas',
    category: 'Sustainable Living',
    experience: '9 Years',
    completed: '21+ Villas',
    location: 'Greater Accra Coast & Aburi Ridge',
    image: `${baseUrl}portfolio/project-15.webp`,
    specialties: [
      'Compressed Earth Block (CEB)',
      'High-Thermal Mass Walls',
      'Greywater Recycling',
      'Passive Airflow Design'
    ],
    description: 'Designs energy-resilient diaspora residences that cut cooling costs by 60% through natural tropical airflow and indigenous materials.'
  }
]

