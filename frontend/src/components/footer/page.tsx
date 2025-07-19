'use client'

import Link from 'next/link'
import { FiMail, FiPhone } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-[#FDF8F3] border-t border-[#e4cdd2] text-[#5f5f5f] text-sm font-medium">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        <div>
          <h2 className="text-2xl font-extrabold text-[#9D6D7A] mb-3 tracking-tight">Rhistaé 💞</h2>
          <p className="leading-relaxed text-base font-normal max-w-sm">
            Where hearts find home. Trusted by families across Pakistan & beyond.
          </p>
        </div>

        <div>
          <h4 className="text-[#9D6D7A] font-semibold text-base mb-3">Quick Links</h4>
          <ul className="space-y-2 font-semibold text-[15px]">
            <li><Link href="/" className="hover:text-[#9D6D7A] transition-all duration-150">🏠 Home</Link></li>
            <li><Link href="/about" className="hover:text-[#9D6D7A] transition-all duration-150">📖 About</Link></li>
            <li><Link href="/register?type=for" className="hover:text-[#9D6D7A] transition-all duration-150">📝 Register</Link></li>
            <li><Link href="/contact" className="hover:text-[#9D6D7A] transition-all duration-150">📩 Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#9D6D7A] font-semibold text-base mb-3">Get in Touch</h4>
          <div className="space-y-2 text-[15px]">
            <div className="flex items-center gap-2">
              <FiMail className="text-[#9D6D7A]" />
              <span className="font-semibold">zohaibmemon1515@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <FiPhone className="text-[#9D6D7A]" />
              <span className="font-semibold">0319 3852479</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#e4cdd2] font-semibold text-center py-4 text-[#9D6D7A] text-xs tracking-wide">
        © {new Date().getFullYear()} Rhistaé. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
