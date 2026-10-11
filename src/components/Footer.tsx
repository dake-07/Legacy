import { Mail, Phone, MapPin, Camera, Globe, Briefcase } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="focus-light bg-[#0a0a0a] border-t border-black text-white pt-16 pb-8 lg:pt-24 lg:pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black pointer-events-none z-0"></div>
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-20">
          
          {/* Brand Col */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect x="15" y="5" width="12" height="45" fill="currentColor" className="text-white" />
                  <rect x="35" y="18" width="12" height="32" fill="currentColor" className="text-white" />
                  <path d="M 55 5 L 85 5 L 85 17 L 67 17 L 67 38 L 75 38 L 75 25 L 85 25 L 85 50 L 55 50 Z" fill="#0F766E" />
                  <path d="M 50 56 L 10 72 L 22 72 L 22 95 L 78 95 L 78 72 L 90 72 Z M 32 78 L 42 78 L 42 88 L 32 88 Z M 58 78 L 68 78 L 68 88 L 58 88 Z" fillRule="evenodd" fill="currentColor" className="text-white" />
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <div translate="no" className="font-bold text-xl leading-[0.9] tracking-widest text-white uppercase font-sans">
                  Legacy
                </div>
                <span className="text-[9px] tracking-[0.2em] font-bold mt-1 text-white/60 uppercase">
                  Growth & Dev
                </span>
              </div>
            </div>
            <p className="text-white/60 text-sm font-sans leading-relaxed">
              Helping you relocate, invest, and build with confidence in Ghana. We provide structured service packages for diaspora clients.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="LegacyHub on Instagram" 
                className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-[#0F766E]/20 hover:border-[#0F766E]/30 transition-colors duration-300"
              >
                <Camera className="h-5 w-5 text-white/70 hover:text-white" aria-hidden="true" />
              </a>
              <a 
                href="https://legacyhub.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="LegacyHub Global Portal" 
                className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-[#0F766E]/20 hover:border-[#0F766E]/30 transition-colors duration-300"
              >
                <Globe className="h-5 w-5 text-white/70 hover:text-white" aria-hidden="true" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="LegacyHub on LinkedIn" 
                className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-[#0F766E]/20 hover:border-[#0F766E]/30 transition-colors duration-300"
              >
                <Briefcase className="h-5 w-5 text-white/70 hover:text-white" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase mb-8 text-[#2DD4BF]">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-white/60 hover:text-white font-sans transition-colors">About Us</Link></li>
              <li><Link to="/#services" className="text-white/60 hover:text-white font-sans transition-colors">Our Services</Link></li>
              <li><Link to="/packages" className="text-white/60 hover:text-white font-sans transition-colors">Packages</Link></li>
              <li><Link to="/portfolio" className="text-white/60 hover:text-white font-sans transition-colors">Gallery</Link></li>
              <li><Link to="/about#team" className="text-white/60 hover:text-white font-sans transition-colors">Management Team</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase mb-8 text-[#2DD4BF]">Contact Us</h3>
            <ul className="space-y-5">
              <li className="flex items-start space-x-4 text-white/60 font-sans">
                <MapPin className="h-5 w-5 text-white/40 shrink-0" aria-hidden="true" />
                <span>Mccarthy Hill - Accra<br/>Ghana</span>
              </li>
              <li className="flex items-start space-x-4 text-white/60 font-sans">
                <Phone className="h-5 w-5 text-white/40 shrink-0 mt-1" aria-hidden="true" />
                <div className="flex flex-col space-y-1">
                  <a href="tel:+233502323196" className="hover:text-white transition-colors">+233&nbsp;50&nbsp;232&nbsp;3196</a>
                  <a href="tel:+233546808745" className="hover:text-white transition-colors">+233&nbsp;54&nbsp;680&nbsp;8745</a>
                </div>
              </li>
              <li className="flex items-center space-x-4 text-white/60 font-sans">
                <Mail className="h-5 w-5 text-white/40 shrink-0" aria-hidden="true" />
                <a href="mailto:asaapeesic@gmail.com" className="hover:text-white transition-colors">asaapeesic@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Call to Action */}
          <div>
            <h3 className="text-sm font-bold tracking-widest uppercase mb-8 text-[#2DD4BF]">Book Your Package</h3>
            <p className="text-white/60 text-sm font-sans mb-8 leading-relaxed">
              Ready to start your journey in Ghana? Book your package today and experience seamless support.
            </p>
            <Link to="/packages" className="w-full h-14 bg-white text-black hover:bg-gray-200 font-bold uppercase tracking-widest text-sm rounded-full transition-colors flex items-center justify-center gap-3">
              Book Today
              <div className="w-2 h-2 bg-black rotate-45" aria-hidden="true"></div>
            </Link>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 text-center flex flex-col md:flex-row justify-between items-center text-xs font-sans tracking-widest text-white/60 uppercase">
          <p>&copy; {new Date().getFullYear()} Legacy Growth & Dev Hub. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
