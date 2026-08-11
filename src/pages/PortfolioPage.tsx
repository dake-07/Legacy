import { Gallery } from '../components/Gallery'
import { Helmet } from 'react-helmet-async'

export function PortfolioPage() {
  return (
    <>
      <Helmet>
        <title>Portfolio | Legacy</title>
        <meta name="description" content="View our portfolio of successful relocations, land acquisitions, and construction projects." />
      </Helmet>
      <div className="pt-24 bg-[#F0FDFA]">
        <Gallery />
      </div>
    </>
  )
}
