'use client'

import { Shield, Leaf, Clock, Award, Heart, ThumbsUp } from 'lucide-react'

const reasons = [
  {
    icon: Shield,
    title: 'Fully Insured',
    description: 'Complete peace of mind with comprehensive insurance coverage for every job.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description: 'We use environmentally safe products that are gentle on your home and the planet.',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Book at your convenience with flexible timing options that fit your lifestyle.',
  },
  {
    icon: Award,
    title: 'Experienced Team',
    description: 'Our trained professionals bring years of expertise to every cleaning session.',
  },
  {
    icon: Heart,
    title: 'Attention to Detail',
    description: 'We treat your home like our own, ensuring no corner is left untouched.',
  },
  {
    icon: ThumbsUp,
    title: 'Satisfaction Guaranteed',
    description: 'Not happy? We\'ll come back and make it right at no extra cost.',
  },
]

export default function WhyUs() {
  return (
    <section id="why-us" className="py-20 bg-gradient-to-br from-primary to-primary-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-secondary-200 font-semibold text-sm uppercase tracking-wider mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-heading mb-4">
            The AllenCleaning Difference
          </h2>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            We're committed to delivering exceptional cleaning services with 
            professionalism and care.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 border border-white/10"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-5">
                <reason.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="font-heading text-xl font-bold text-white mb-3">
                {reason.title}
              </h3>
              <p className="text-primary-100 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

