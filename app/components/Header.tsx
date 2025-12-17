'use client'

import { useState, useEffect } from 'react'
import { Phone, Menu, X, Sparkles } from 'lucide-react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-primary">
              AllenCleaning
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('why-us')}
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Why Us
            </button>
            <button
              onClick={() => scrollToSection('estimate')}
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Get Estimate
            </button>
          </nav>

          {/* Phone & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+17323723329"
              className="flex items-center gap-2 text-primary font-semibold hover:text-primary-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              (732) 372-3329
            </a>
            <button
              onClick={() => scrollToSection('estimate')}
              className="btn-primary text-sm"
            >
              Free Estimate
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-primary"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-cream-200 pt-4 animate-fade-in-up">
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('services')}
                className="text-gray-700 hover:text-primary font-medium transition-colors text-left"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('why-us')}
                className="text-gray-700 hover:text-primary font-medium transition-colors text-left"
              >
                Why Us
              </button>
              <button
                onClick={() => scrollToSection('estimate')}
                className="text-gray-700 hover:text-primary font-medium transition-colors text-left"
              >
                Get Estimate
              </button>
              <a
                href="tel:+17323723329"
                className="flex items-center gap-2 text-primary font-semibold"
              >
                <Phone className="w-4 h-4" />
                (732) 372-3329
              </a>
              <button
                onClick={() => scrollToSection('estimate')}
                className="btn-primary text-sm w-full mt-2"
              >
                Free Estimate
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

