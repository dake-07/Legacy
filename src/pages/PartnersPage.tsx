import { BuildingPartners } from '../components/BuildingPartners'
import { Helmet } from 'react-helmet-async'

export function PartnersPage() {
  return (
    <>
      <Helmet>
        <title>Building Development Partners | Legacy</title>
        <meta 
          name="description" 
          content="Explore our vetted network of licensed building developers in Ghana. Compare their projects and select the right partner for your diaspora build." 
        />
      </Helmet>
      <div className="pt-24 bg-[#F0FDFA]">
        <BuildingPartners />
      </div>
    </>
  )
}
