import { ProductPackages } from '../components/ProductPackages'

export function PackagesPage() {
  return (
    <>
      <div className="pt-20 bg-[#F7FAF8] sm:pt-24">
        <h1 className="sr-only">Our Packages &amp; Services</h1>
        <ProductPackages />
      </div>
    </>
  )
}
