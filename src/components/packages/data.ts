export interface ServicePackage {
  name: string
  price: string
  type?: string
  isPopular?: boolean
  features: string[]
}

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export const packages: ServicePackage[] = [
    {
      name: "Bronze Arrival Package",
      price: usd.format(150),
      type: "arrival",
      features: [
        "Airport pickup",
        "Air BnB check-in assistance",
        "Local SIM card assistance",
        "Residence permit assistance",
        "Currency exchange guidance",
        "Basic local orientation"
      ]
    },
    {
      name: "Silver Visit Package",
      price: usd.format(400),
      type: "visit",
      features: [
        "Airport pickup",
        "Visa on arrival assistance",
        "Scheduled property / land site visits",
        "Area orientation",
        "Local SIM card assistance",
        "Residence permit assistance",
        "Account opening guidance",
        "Currency exchange guidance",
        "Air BnB check-in assistance"
      ]
    },
    {
      name: "Gold Relocation Visit Package",
      price: usd.format(600),
      type: "relocation",
      isPopular: true,
      features: [
        "Airport pickup",
        "Air BnB check-in assistance",
        "3\u00A0days dedicated driver",
        "Multiple scheduled site visits",
        "Lawyer consultation coordination",
        "Bank account setup guidance",
        "Residence permit consultation",
        "Investment consultation"
      ]
    },
    {
      name: "Land Acquisition Support Package",
      price: `Min Fee: ${usd.format(1500)}`,
      type: "land",
      features: [
        "Land sourcing",
        "Negotiation support",
        "Documentation coordination",
        "Survey coordination",
        "Lawyer coordination",
        "Indenture processing assistance",
        "Registration guidance"
      ]
    }
  ]

export const constructionPackage = {
    name: "Construction Monitoring Package",
    price: `${usd.format(350)} / month`,
    features: [
      "Weekly site inspections",
      "Progress photo / video updates",
      "Contractor communication",
      "Material verification",
      "Progress reporting"
    ]
  }

