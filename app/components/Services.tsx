'use client'

import { 
  Home, 
  Sparkles, 
  Truck, 
  HardHat, 
  Building2,
  ArrowRight
} from 'lucide-react'

const services = [
  {
    icon: Home,
    title: 'Regular Cleaning',
    description: 'Weekly, bi-weekly, or monthly cleaning to keep your home consistently fresh and tidy.',
    features: ['Dusting & vacuuming', 'Kitchen & bathroom cleaning', 'Floor mopping'],
  },
  {
    icon: Sparkles,
    title: 'Deep Cleaning',
    description: 'Thorough top-to-bottom cleaning that reaches every corner and crevice of your space.',
    features: ['Behind appliances', 'Inside cabinets', 'Baseboards & trim'],
  },
  {
    icon: Truck,
    title: 'Move-in / Move-out',
    description: 'Comprehensive cleaning for smooth transitions whether you\'re arriving or departing.',
    features: ['Complete sanitization', 'Appliance cleaning', 'Window cleaning'],
  },
  {
    icon: HardHat,
    title: 'Post-Construction',
    description: 'Specialized cleaning to remove construction dust, debris, and residue.',
    features: ['Debris removal', 'Surface polishing', 'Air quality improvement'],
  },
  {
    icon: Building2,
    title: 'Office Cleaning',
    description: 'Professional cleaning services to maintain a healthy and productive workplace.',
    features: ['Desk sanitization', 'Common area cleaning', 'Trash removal'],
  },
]

export default function Services() {
  const scrollToEstimate = () => {
    const element = document.getElementById('estimate')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            Our Services
          </span>
          <h2 className="section-title mb-4">
            Cleaning Solutions for Every Need
          </h2>
          <p className="section-subtitle mx-auto">
            From routine maintenance to specialized deep cleaning, we offer comprehensive 
            services to keep your space immaculate.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-cream rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <service.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>

              {/* Content */}
              <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={scrollToEstimate}
                className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all"
              >
                Get Quote
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

