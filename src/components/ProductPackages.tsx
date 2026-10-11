import { useState, useEffect, useRef } from 'react'
import { Check, X, CreditCard, Smartphone, CheckCircle2, Loader2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { motion, AnimatePresence } from 'framer-motion'

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export function ProductPackages() {
  // Modal State Management
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState("")
  const [selectedPrice, setSelectedPrice] = useState("")
  const [formStep, setFormStep] = useState(1) // 1: Form, 2: Loading, 3: Payment/Success
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
    website: "" // Honeypot: hidden from people, bots tend to fill it in
  })
  const [errors, setErrors] = useState<Partial<Record<"name" | "contact" | "address", string>>>({})

  const dialogRef = useRef<HTMLDivElement>(null)

  // While the modal is open: stop background scrolling, move focus into it,
  // and give focus back to the button that opened it on close
  useEffect(() => {
    if (!isModalOpen) return
    const opener = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()
    return () => {
      document.body.style.overflow = 'unset'
      opener?.focus()
    }
  }, [isModalOpen])

  // Warn before leaving the page with a half-filled request
  const hasUnsavedDetails = isModalOpen && formStep === 1 && Boolean(formData.name || formData.contact || formData.address)
  useEffect(() => {
    if (!hasUnsavedDetails) return
    const warn = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [hasUnsavedDetails])

  const handleOpenModal = (pkgName: string, pkgPrice: string) => {
    setSelectedPackage(pkgName)
    setSelectedPrice(pkgPrice)
    setFormStep(1)
    setFormData({ name: "", contact: "", address: "", website: "" })
    setErrors({})
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // Escape closes the modal; Tab stays inside it
  const handleDialogKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      handleCloseModal()
      return
    }
    if (e.key !== 'Tab' || !dialogRef.current) return
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([tabindex="-1"]), a[href]')
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const active = document.activeElement
    if (e.shiftKey && (active === first || active === dialogRef.current)) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && active === last) {
      e.preventDefault()
      first.focus()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const validate = () => {
    const name = formData.name.trim()
    const contact = formData.contact.trim()
    const address = formData.address.trim()
    const newErrors: typeof errors = {}

    if (name.length < 2) newErrors.name = "Please enter your full name."

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact)
    const phoneDigits = contact.replace(/\D/g, "")
    const isPhone = /^\+?[\d\s\-().]+$/.test(contact) && phoneDigits.length >= 7 && phoneDigits.length <= 15
    if (!contact) newErrors.contact = "Please enter an email address or phone number."
    else if (!isEmail && !isPhone) newErrors.contact = "Enter a valid email (name@example.com) or phone number (+233 50 123 4567)."

    if (address.length < 2) newErrors.address = "Please enter your city and country."

    setErrors(newErrors)
    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const firstError = Object.keys(validate())[0]
    if (firstError) {
      document.getElementById(firstError)?.focus()
      return
    }

    // Honeypot filled in: likely a bot, so show success without sending anything
    if (formData.website) {
      setFormStep(3)
      return
    }

    setFormStep(2) // Switch to Loading Step

    // Simulate API / EmailJS call
    setTimeout(() => {
      setFormStep(3) // Switch to Payment Step
    }, 2000)
  }

  const packages = [
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

  const constructionPackage = {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <section id="packages" className="py-20 lg:py-40 bg-transparent relative overflow-hidden scroll-mt-24">
      {/* Abstract Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[#0F766E]/15 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-[#0F766E]/10 rounded-full blur-[120px]"></div>
      </div>
      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-32"
        >
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="w-16 h-[1px] bg-[#0F766E]/40"></div>
            <span className="text-xs font-bold tracking-[0.3em] text-[#0F766E] uppercase">Our Packages</span>
            <div className="w-16 h-[1px] bg-[#0F766E]/40"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-gray-900 mb-8 tracking-tight">Arrival & Visit</h2>
          <p className="text-lg md:text-xl text-gray-600 font-sans max-w-2xl mx-auto leading-relaxed">Ideal for land inspections, relocation planning, investment exploration, property acquisition, and building projects.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 lg:mb-32"
        >
          {packages.map((pkg, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <Card className={`relative flex flex-col h-full hover:-translate-y-3 transition-[transform,box-shadow,border-color] duration-500 overflow-hidden rounded-[2rem] bg-white ${pkg.isPopular ? 'border-[#0F766E]/40 shadow-[0_20px_60px_rgba(197,168,106,0.15)] z-10' : 'border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl'}`}>
                {pkg.isPopular && (
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 z-20">
                    <span className="bg-[#0F766E] text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl">
                      Recommended
                    </span>
                  </div>
                )}
                
                {pkg.isPopular && <div className="absolute inset-0 bg-gradient-to-b from-[#0F766E]/5 to-transparent pointer-events-none"></div>}

                <CardHeader className="text-center pb-8 pt-10 border-b border-black/5">
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
                    onClick={() => handleOpenModal(pkg.name, pkg.price)}
                    className={`w-full h-14 text-sm uppercase tracking-widest font-bold cursor-pointer transition-colors duration-300 rounded-full flex items-center justify-center gap-3 ${pkg.isPopular ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-transparent'}`}
                  >
                    Select Package
                    {pkg.isPopular && <div className="w-2 h-2 bg-white rotate-45" aria-hidden="true"></div>}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Construction Package Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
            <div className="absolute inset-0 bg-[radial-gradient(#0F766E_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.05]"></div>
            
            <div className="p-12 md:p-20 md:w-5/12 flex flex-col justify-center relative z-10">
              <div className="inline-flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-[#0F766E]/50"></div>
                <span className="text-xs font-bold tracking-[0.2em] text-[#0F766E] uppercase">Development</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-8 leading-tight tracking-tight">{constructionPackage.name}</h2>
              <div className="flex items-baseline mb-12">
                <div className="text-xl text-gray-500 font-sans">Full pricing unlocked upon request</div>
              </div>
              <Button 
                onClick={() => handleOpenModal(constructionPackage.name, constructionPackage.price)}
                className="bg-black text-white hover:bg-gray-800 font-bold uppercase tracking-widest text-sm h-14 w-fit px-8 cursor-pointer rounded-full flex items-center gap-3 transition-[transform,background-color] duration-300 hover:scale-105"
              >
                Subscribe Now
                <div className="w-2 h-2 bg-white rotate-45" aria-hidden="true"></div>
              </Button>
            </div>
            
            <div className="p-12 md:p-20 md:w-7/12 flex flex-col justify-center relative z-10 bg-gray-50 border-l border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-10 font-serif">What’s included monthly:</h3>
              <ul className="space-y-8">
                {constructionPackage.features.map((feature, index) => (
                  <li key={index} className="flex items-center group">
                    <div className="bg-white p-3 rounded-full mr-6 shrink-0 transition-colors border border-gray-200 group-hover:border-[#0F766E]/30 shadow-sm">
                      <Check className="h-5 w-5 text-[#0F766E]" aria-hidden="true" />
                    </div>
                    <span className="font-sans text-lg text-gray-600 group-hover:text-gray-900 transition-colors">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Multi-Step Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md overscroll-contain"
          >
            <motion.div 
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-title"
              tabIndex={-1}
              onKeyDown={handleDialogKeyDown}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-gray-100 rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
            >
              {/* Header */}
              <div className="border-b border-gray-100 p-8 flex items-center justify-between shrink-0 bg-gray-50">
                <div>
                  <h2 id="booking-title" className="text-gray-900 font-serif font-bold text-2xl leading-tight">Request Package</h2>
                  <p className="text-[#0F766E] text-sm font-sans mt-2 font-bold">{selectedPackage}</p>
                  <p className="text-gray-500 text-xs font-sans mt-1 uppercase tracking-wider tabular-nums">Pricing: {selectedPrice}</p>
                </div>
                <button 
                  onClick={handleCloseModal}
                  aria-label="Close" className="text-gray-500 hover:text-gray-900 transition-colors p-3 bg-white rounded-full cursor-pointer border border-gray-200 shadow-sm"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* Body */}
              <div className="p-8 overflow-y-auto overscroll-contain" aria-live="polite">
                {formStep === 1 && (
                  <form onSubmit={handleSubmit} noValidate className="space-y-6 relative">
                    <p className="text-gray-600 text-sm mb-8 font-sans leading-relaxed">
                      Please provide your details below to initiate your booking. Once submitted, you will receive our payment details to secure your package.
                    </p>

                    {([
                      { name: "name", label: "Full Name", placeholder: "e.g. Kwame Mensah…", autoComplete: "name", inputMode: "text" as const },
                      { name: "contact", label: "Email or Phone", placeholder: "you@example.com or +233 50 123 4567…", autoComplete: "email", inputMode: "email" as const },
                      { name: "address", label: "City / Country", placeholder: "e.g. London, UK…", autoComplete: "address-level2", inputMode: "text" as const }
                    ] as const).map((field) => (
                      <div key={field.name} className="space-y-3">
                        <label htmlFor={field.name} className="text-xs font-bold tracking-widest uppercase text-gray-500">{field.label}</label>
                        <input
                          required
                          type="text"
                          id={field.name}
                          name={field.name}
                          maxLength={100}
                          inputMode={field.inputMode}
                          autoComplete={field.autoComplete}
                          spellCheck={field.name === 'contact' ? false : undefined}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          aria-invalid={!!errors[field.name]}
                          aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                          className={`w-full px-5 py-4 rounded-xl border bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:border-transparent transition-colors font-sans ${errors[field.name] ? 'border-red-600' : 'border-gray-200'}`}
                          placeholder={field.placeholder}
                        />
                        {errors[field.name] && (
                          <p id={`${field.name}-error`} className="text-sm text-red-700 font-sans">{errors[field.name]}</p>
                        )}
                      </div>
                    ))}

                    {/* Honeypot field, hidden from people and screen readers */}
                    <div className="absolute w-px h-px overflow-hidden opacity-0 pointer-events-none" aria-hidden="true">
                      <label htmlFor="website">Website</label>
                      <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleInputChange} />
                    </div>

                    <Button type="submit" className="w-full h-14 mt-8 text-sm uppercase tracking-widest font-bold bg-black text-white hover:bg-gray-800 cursor-pointer rounded-full transition-colors">
                      Submit Request
                    </Button>
                  </form>
                )}

                {formStep === 2 && (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <Loader2 className="h-12 w-12 text-[#0F766E] animate-spin mb-8" aria-hidden="true" />
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">Processing…</h3>
                    <p className="text-gray-500 font-sans">Securely sending your details.</p>
                  </div>
                )}

                {formStep === 3 && (
                  <div className="flex flex-col items-center text-center pb-4 pt-4">
                    <div className="w-16 h-16 bg-[#0F766E]/10 border border-[#0F766E]/30 rounded-full flex items-center justify-center mb-8">
                      <CheckCircle2 className="h-8 w-8 text-[#0F766E]" aria-hidden="true" />
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">Booking Initiated</h3>
                    <p className="text-gray-600 mb-10 font-sans leading-relaxed break-words max-w-full">
                      Thank you, {formData.name.split(' ')[0]}. Your request has been logged. We will contact you via {formData.contact}.
                    </p>

                    <div className="w-full bg-gray-50 rounded-2xl p-8 border border-gray-100 text-left">
                      <h4 className="font-serif text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-[#0F766E]" aria-hidden="true" />
                        Payment Details
                      </h4>
                      <p className="text-sm text-gray-500 mb-8 font-sans leading-relaxed">
                        To secure your package, please deposit the required fee using the details below. Use your Full Name as reference.
                      </p>
                      
                      <div className="space-y-4 font-sans">
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                          <div className="text-[10px] tracking-widest text-[#0F766E] uppercase mb-2">Bank Transfer</div>
                          <div className="text-sm text-gray-600 mb-1">Bank: <span className="text-gray-900 font-bold">Republic Bank Ghana</span></div>
                          <div className="text-sm text-gray-600 mb-1">Account: <span className="text-gray-900 font-bold">Legacy Growth Hub</span></div>
                          <div className="text-sm text-gray-600">Number: <span className="text-gray-900 font-bold tabular-nums">00112233445566</span></div>
                        </div>
                        
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                          <div className="text-[10px] tracking-widest text-[#0F766E] uppercase mb-2 flex items-center gap-2">
                            <Smartphone className="h-3 w-3" aria-hidden="true" /> Mobile Money
                          </div>
                          <div className="text-sm text-gray-600 mb-1">MTN MoMo: <span className="text-gray-900 font-bold tabular-nums">024&nbsp;123&nbsp;4567</span></div>
                          <div className="text-sm text-gray-600">Name: <span className="text-gray-900 font-bold">Legacy Hub Consult</span></div>
                        </div>
                      </div>
                    </div>

                    <Button onClick={handleCloseModal} className="w-full h-14 mt-8 text-sm uppercase tracking-widest font-bold cursor-pointer rounded-full bg-gray-100 text-gray-900 hover:bg-gray-200 border-none transition-colors">
                      Done
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
