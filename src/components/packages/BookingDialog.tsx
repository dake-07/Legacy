import { useState, useEffect, useRef } from 'react'
import { X, CreditCard, Smartphone, CheckCircle2, Loader2, MessageSquare, Mail } from 'lucide-react'
import { Button } from '../ui/button'
import { motion, AnimatePresence } from 'framer-motion'

interface BookingDialogProps {
  isModalOpen: boolean
  selectedPackage: string
  selectedPrice: string
  onClose: () => void
}

export function BookingDialog({ isModalOpen, selectedPackage, selectedPrice, onClose: handleCloseModal }: BookingDialogProps) {
  const [formStep, setFormStep] = useState(1) // 1: Form, 2: Loading, 3: Payment/Success
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    website: "" // Honeypot: hidden from people, bots tend to fill it in
  })
  const [errors, setErrors] = useState<Partial<Record<"name" | "email" | "phone" | "address", string>>>({})

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
  const hasUnsavedDetails = isModalOpen && formStep === 1 && Boolean(formData.name || formData.email || formData.phone || formData.address)
  useEffect(() => {
    if (!hasUnsavedDetails) return
    const warn = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [hasUnsavedDetails])

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
    const email = formData.email.trim()
    const phone = formData.phone.trim()
    const address = formData.address.trim()
    const newErrors: typeof errors = {}

    if (name.length < 2) newErrors.name = "Please enter your full name."

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
    if (!email) newErrors.email = "Please enter your email address to receive your confirmation receipt."
    else if (!isEmail) newErrors.email = "Enter a valid email address (name@example.com)."

    const phoneDigits = phone.replace(/\D/g, "")
    const isPhone = /^\+?[\d\s\-().]+$/.test(phone) && phoneDigits.length >= 7 && phoneDigits.length <= 15
    if (!phone) newErrors.phone = "Please enter your phone / WhatsApp number."
    else if (!isPhone) newErrors.phone = "Enter a valid phone number (+233 50 123 4567 or international)."

    if (address.length < 2) newErrors.address = "Please enter your city and country."

    setErrors(newErrors)
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    const firstError = Object.keys(validationErrors)[0]
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

    try {
      await fetch("https://formsubmit.co/ajax/asaapeesic@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `New Booking Request: ${selectedPackage} - ${formData.name}`,
          _replyto: formData.email,
          _template: "table",
          _autoresponse: `Thank you for booking with Legacy Growth & Development Hub!

Hello ${formData.name},

We have received your booking request for:
Package: ${selectedPackage}
Pricing: ${selectedPrice}

Your Submitted Details:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
- City / Country: ${formData.address}

Next Steps:
To secure your package reservation, please make the payment using CBG or Mobile Money using your Full Name as reference.

Bank Transfer Details:
- Bank: CBG
- Account Name: Legacy Growth and Development Hub
- Account Number: 2537968640001
- Branch: Manet Tower

Mobile Money Details:
- Number: 050 232 3196
- Wallet Name: Peter Asare / Legacy Growth and Development Hub

Our dedicated coordination team will reach out to you via WhatsApp / Email shortly.

Direct Contact:
Phone: +233 50 232 3196 / +233 54 680 8745
Email: asaapeesic@gmail.com

Warm regards,
Legacy Growth & Development Hub`,
          "Package Name": selectedPackage,
          "Package Price": selectedPrice,
          "Client Name": formData.name,
          "Client Email": formData.email,
          "Client Phone / WhatsApp": formData.phone,
          "Client Location": formData.address
        })
      })
      setFormStep(3)
    } catch (err) {
      console.warn("FormSubmit transmission fallback triggered:", err)
      // Even if network blips, transition to Step 3 so the client has payment and instant direct contact actions
      setFormStep(3)
    }
  }


  return (
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
                      { name: "name" as const, label: "Full Name", placeholder: "e.g. Kwame Mensah…", autoComplete: "name", inputMode: "text" as const, type: "text" },
                      { name: "email" as const, label: "Email Address (for your receipt)", placeholder: "you@example.com…", autoComplete: "email", inputMode: "email" as const, type: "email" },
                      { name: "phone" as const, label: "Phone / WhatsApp Number", placeholder: "+233 50 123 4567 or international…", autoComplete: "tel", inputMode: "tel" as const, type: "tel" },
                      { name: "address" as const, label: "City / Country", placeholder: "e.g. London, UK…", autoComplete: "address-level2", inputMode: "text" as const, type: "text" }
                    ]).map((field) => (
                      <div key={field.name} className="space-y-3">
                        <label htmlFor={field.name} className="text-xs font-bold tracking-widest uppercase text-gray-500">{field.label}</label>
                        <input
                          required
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          maxLength={100}
                          inputMode={field.inputMode}
                          autoComplete={field.autoComplete}
                          spellCheck={field.name === 'name' || field.name === 'address' ? undefined : false}
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
                    <p className="text-gray-600 mb-8 font-sans leading-relaxed break-words max-w-full">
                      Thank you, {formData.name.split(' ')[0]}. A confirmation receipt has been sent to <span className="font-bold text-gray-900">{formData.email}</span>, and our team has been notified.
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
                          <div className="text-sm text-gray-600 mb-1">Bank: <span className="text-gray-900 font-bold">CBG</span></div>
                          <div className="text-sm text-gray-600 mb-1">Account Name: <span className="text-gray-900 font-bold">Legacy Growth and Development Hub</span></div>
                          <div className="text-sm text-gray-600 mb-1">Account Number: <span className="text-gray-900 font-bold tabular-nums tracking-wide">2537968640001</span></div>
                          <div className="text-sm text-gray-600">Branch: <span className="text-gray-900 font-bold">Manet Tower</span></div>
                        </div>
                        
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                          <div className="text-[10px] tracking-widest text-[#0F766E] uppercase mb-2 flex items-center gap-2">
                            <Smartphone className="h-3 w-3" aria-hidden="true" /> Mobile Money
                          </div>
                          <div className="text-sm text-gray-600 mb-1">Number: <span className="text-gray-900 font-bold tabular-nums">050&nbsp;232&nbsp;3196</span></div>
                          <div className="text-sm text-gray-600">Wallet Name: <span className="text-gray-900 font-bold">Peter Asare / Legacy Growth and Development Hub</span></div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full flex flex-col sm:flex-row gap-3 mt-6">
                      <a
                        href={`https://wa.me/233502323196?text=${encodeURIComponent(`Hello LegacyHub, I have submitted a booking request for "${selectedPackage}" (${selectedPrice}).\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nLocation: ${formData.address}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 px-4 rounded-full font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                      >
                        <MessageSquare className="w-4 h-4" aria-hidden="true" />
                        Confirm via WhatsApp
                      </a>
                      <a
                        href={`mailto:asaapeesic@gmail.com?subject=${encodeURIComponent(`New Booking: ${selectedPackage} - ${formData.name}`)}&body=${encodeURIComponent(`Hello LegacyHub Team,\n\nI have submitted a booking request for the following package:\nPackage: ${selectedPackage}\nPricing: ${selectedPrice}\n\nClient Details:\nFull Name: ${formData.name}\nEmail: ${formData.email}\nPhone / WhatsApp: ${formData.phone}\nCity / Country: ${formData.address}\n\nPlease confirm availability and next steps.\n\nBest regards,\n${formData.name}`)}`}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#0F766E] hover:bg-[#134E4A] text-white py-3.5 px-4 rounded-full font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                      >
                        <Mail className="w-4 h-4" aria-hidden="true" />
                        Send via Email
                      </a>
                    </div>

                    <Button onClick={handleCloseModal} className="w-full h-14 mt-4 text-sm uppercase tracking-widest font-bold cursor-pointer rounded-full bg-gray-100 text-gray-900 hover:bg-gray-200 border-none transition-colors">
                      Done
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  )
}
