import { ProductPackages } from '../components/ProductPackages'
import { Helmet } from 'react-helmet-async'

export function PackagesPage() {
  return (
    <>
      <Helmet>
        <title>Our Packages | Legacy</title>
        <meta name="description" content="Explore our relocation, land acquisition, and construction monitoring packages." />
      </Helmet>
      <div className="pt-24 bg-[#F0FDFA]">
        <ProductPackages />
      </div>
    </>
  )
}
