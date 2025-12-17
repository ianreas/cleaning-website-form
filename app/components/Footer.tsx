'use client'

import { Phone, Mail, MapPin, Sparkles } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl">
                AllenCleaning
              </span>
            </div>
            <p className="text-gray-400 max-w-md mb-6">
              Professional cleaning services in Pleasanton, California. 
              We bring sparkle and freshness to your home and office with 
              our dedicated team and eco-friendly products.
            </p>
            <div className="flex gap-4">
              <a
                href="tel:+17323723329"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Call us"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@allencleaning.com"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Email us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+17323723329"
                  className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 mt-0.5 text-primary" />
                  <span>(732) 372-3329</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@allencleaning.com"
                  className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 mt-0.5 text-primary" />
                  <span>info@allencleaning.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                <span>Serving Pleasanton, CA and surrounding areas</span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-gray-400 hover:text-white transition-colors cursor-default">
                  Regular Cleaning
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition-colors cursor-default">
                  Deep Cleaning
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition-colors cursor-default">
                  Move-in/Move-out
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition-colors cursor-default">
                  Post-Construction
                </span>
              </li>
              <li>
                <span className="text-gray-400 hover:text-white transition-colors cursor-default">
                  Office Cleaning
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} AllenCleaning. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <span className="text-gray-500 hover:text-white transition-colors cursor-pointer">
                Privacy Policy
              </span>
              <span className="text-gray-500 hover:text-white transition-colors cursor-pointer">
                Terms of Service
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

