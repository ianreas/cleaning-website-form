'use client'

import { Sparkles, CheckCircle2, ArrowDown } from 'lucide-react'

export default function Hero() {
  const scrollToEstimate = () => {
    const element = document.getElementById('estimate')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-cream-100 to-secondary-50">
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="leaves" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="#87A878" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#leaves)" />
          </svg>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-secondary-200 rounded-full blur-3xl opacity-40 animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-accent-100 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-gray-700">
              Serving Pleasanton, California
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 animate-fade-in-up stagger-1">
            A Cleaner Home,
            <br />
            <span className="text-primary">A Happier Life</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-fade-in-up stagger-2">
            Professional cleaning services tailored to your needs. 
            From regular maintenance to deep cleaning, we make your space sparkle.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 animate-fade-in-up stagger-3">
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Insured & Bonded</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Eco-Friendly Products</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Satisfaction Guaranteed</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-4">
            <button onClick={scrollToEstimate} className="btn-primary text-lg px-10 py-4">
              Get Free Estimate
            </button>
            <a
              href="tel:+17323723329"
              className="btn-secondary text-lg px-10 py-4"
            >
              Call (732) 372-3329
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 animate-bounce">
            <button
              onClick={scrollToEstimate}
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg text-primary hover:bg-primary hover:text-white transition-colors"
              aria-label="Scroll to estimate form"
            >
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

