import { Gallery } from '../components/Gallery'
import { Helmet } from 'react-helmet-async'

export function PortfolioPage() {
  return (
    <>
      <Helmet>
        <title>Gallery | Legacy</title>
        <meta name="description" content="View our gallery of successful relocations, land acquisitions, and construction projects." />
      </Helmet>
      <div className="pt-20 bg-[#F7FAF8] sm:pt-24">
        <Gallery />
      </div>
    </>
  )
}
