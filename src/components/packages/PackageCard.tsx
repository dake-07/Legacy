import { Check } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import type { ServicePackage } from './data'

interface PackageCardProps {
  pkg: ServicePackage
  onSelect: (name: string, price: string) => void
}

export function PackageCard({ pkg, onSelect }: PackageCardProps) {
  return (
              <Card className={`relative flex flex-col h-full hover:-translate-y-3 transition-[transform,box-shadow,border-color] duration-500 overflow-hidden rounded-[2rem] bg-white ${pkg.isPopular ? 'border-[#0F766E]/40 shadow-[0_20px_60px_rgba(197,168,106,0.15)] z-10' : 'border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl'}`}>
                {pkg.isPopular && (
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 z-20">
                    <span className="bg-[#0F766E] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                      Recommended
                    </span>
                  </div>
                )}
                
                {pkg.isPopular && <div className="absolute inset-0 bg-[#0F766E]/5 pointer-events-none"></div>}

                <CardHeader className="text-center pb-8 pt-10">
                  <CardTitle className={`text-xl font-serif font-bold mb-6 h-14 flex items-center justify-center relative z-10 ${pkg.isPopular ? 'text-[#0F766E]' : 'text-gray-900'}`}>{pkg.name}</CardTitle>
                </CardHeader>
                
                <CardContent className="flex-grow pt-8">
                  <ul className="space-y-6">
                    {pkg.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start group">
                        <div className={`p-1.5 rounded-full shrink-0 mr-4 transition-colors ${pkg.isPopular ? 'bg-[#0F766E]/20 group-hover:bg-[#0F766E]/30' : 'bg-gray-100 group-hover:bg-gray-200'}`}>
                          <Check className={`h-3 w-3 ${pkg.isPopular ? 'text-[#0F766E]' : 'text-gray-500'}`} aria-hidden="true" />
                        </div>
                        <span className="text-sm text-gray-600 font-sans pt-0.5 group-hover:text-gray-900 transition-colors">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="pt-6 pb-10 px-8 mt-auto">
                  <Button 
                    onClick={() => onSelect(pkg.name, pkg.price)}
                    className={`w-full h-14 text-sm uppercase tracking-widest font-bold cursor-pointer transition-colors duration-300 rounded-full flex items-center justify-center gap-3 ${pkg.isPopular ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-transparent'}`}
                  >
                    Select Package
                    {pkg.isPopular && <div className="w-2 h-2 bg-white rotate-45" aria-hidden="true"></div>}
                  </Button>
                </CardFooter>
              </Card>
  )
}
