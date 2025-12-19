'use client'

import { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  Send, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Calculator,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  Home,
  Bath,
  Sparkles
} from 'lucide-react'

// Pricing configuration
const PRICING = {
  base: {
    regular: 150,
    deep: 275,
    move: 375,
    construction: 475,
    office: 225,
  },
  perRoom: {
    regular: 20,
    deep: 30,
    move: 25,
    construction: 40,
    office: 25,
  },
  perBathroom: {
    regular: 20,
    deep: 35,
    move: 0, // included
    construction: 0, // included
    office: 25,
  },
  addons: {
    kitchen: 50,
    bedroom: 40,
    garage: 60,
    basement: 75,
  },
  // Base includes 2 rooms, additional rooms charged extra
  baseRoomsIncluded: 2,
}

// Step 1: Property details schema
const propertySchema = z.object({
  numberOfRooms: z.string().min(1, 'Please select number of rooms'),
  numberOfBathrooms: z.string().min(1, 'Please select number of bathrooms'),
  serviceType: z.string().min(1, 'Please select a service type'),
  closetsKitchen: z.boolean().optional(),
  closetsBedroom: z.boolean().optional(),
  closetsGarage: z.boolean().optional(),
  closetsBasement: z.boolean().optional(),
})

// Step 3: Contact schema (phone OR email required)
const contactSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().min(5, 'Please enter your address'),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  additionalNotes: z.string().optional(),
}).refine((data) => {
  // At least one contact method required
  const hasPhone = data.phone && data.phone.length >= 10
  const hasEmail = data.email && data.email.includes('@')
  return hasPhone || hasEmail
}, {
  message: 'Please provide either a phone number or email address',
  path: ['phone'],
})

type PropertyData = z.infer<typeof propertySchema>
type ContactData = z.infer<typeof contactSchema>

const serviceLabels: Record<string, string> = {
  regular: 'Regular Cleaning',
  deep: 'Deep Cleaning',
  move: 'Move-in / Move-out',
  construction: 'Post-construction',
  office: 'Office Cleaning',
}

export default function EstimateForm() {
  const [step, setStep] = useState(1)
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Step 1 form
  const propertyForm = useForm<PropertyData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      numberOfRooms: '',
      numberOfBathrooms: '',
      serviceType: '',
      closetsKitchen: false,
      closetsBedroom: false,
      closetsGarage: false,
      closetsBasement: false,
    },
  })

  // Step 3 form
  const contactForm = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      address: '',
      preferredDate: '',
      preferredTime: '',
      additionalNotes: '',
    },
  })

  // Calculate estimate
  const estimate = useMemo(() => {
    if (!propertyData) return null

    const serviceType = propertyData.serviceType as keyof typeof PRICING.base
    const rooms = parseInt(propertyData.numberOfRooms) || 0
    const bathrooms = parseInt(propertyData.numberOfBathrooms) || 0

    // Base price
    let total = PRICING.base[serviceType] || 0

    // Additional rooms (beyond base included)
    const extraRooms = Math.max(0, rooms - PRICING.baseRoomsIncluded)
    total += extraRooms * (PRICING.perRoom[serviceType] || 0)

    // Bathrooms
    total += bathrooms * (PRICING.perBathroom[serviceType] || 0)

    // Add-ons
    if (propertyData.closetsKitchen) total += PRICING.addons.kitchen
    if (propertyData.closetsBedroom) total += PRICING.addons.bedroom
    if (propertyData.closetsGarage) total += PRICING.addons.garage
    if (propertyData.closetsBasement) total += PRICING.addons.basement

    return {
      base: PRICING.base[serviceType],
      rooms: extraRooms * (PRICING.perRoom[serviceType] || 0),
      bathrooms: bathrooms * (PRICING.perBathroom[serviceType] || 0),
      addons: (propertyData.closetsKitchen ? PRICING.addons.kitchen : 0) +
              (propertyData.closetsBedroom ? PRICING.addons.bedroom : 0) +
              (propertyData.closetsGarage ? PRICING.addons.garage : 0) +
              (propertyData.closetsBasement ? PRICING.addons.basement : 0),
      total,
      extraRooms,
      bathroomCount: bathrooms,
      serviceType,
    }
  }, [propertyData])

  // Step 1: Submit property details
  const onPropertySubmit = (data: PropertyData) => {
    setPropertyData(data)
    setStep(2)
  }

  // Step 3: Submit contact info
  const onContactSubmit = async (data: ContactData) => {
    if (!propertyData || !estimate) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/submit-estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...propertyData,
          ...data,
          estimatedPrice: estimate.total,
        }),
      })

      if (!response.ok) throw new Error('Submission failed')

      setSubmitStatus('success')
      setStep(4)
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setStep(1)
    setPropertyData(null)
    setSubmitStatus('idle')
    propertyForm.reset()
    contactForm.reset()
  }

  return (
    <section id="estimate" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Free Estimate
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">
            Get Your Instant Quote
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {step === 1 && "Tell us about your space and we'll calculate your estimate instantly."}
            {step === 2 && "Here's your personalized cleaning estimate!"}
            {step === 3 && "Almost done! How can we reach you?"}
            {step === 4 && "Thank you! We'll be in touch soon."}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step >= s
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-500'
                } ${step === s ? 'ring-4 ring-primary/20' : ''}`}
              >
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 sm:w-24 h-1 mx-2 rounded ${
                    step > s ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Property Details */}
        {step === 1 && (
          <form onSubmit={propertyForm.handleSubmit(onPropertySubmit)} className="space-y-8">
            <div className="bg-cream rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
              {/* Service Type */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  What Type of Cleaning Do You Need?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Object.entries(serviceLabels).map(([value, label]) => (
                    <label
                      key={value}
                      className={`relative flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        propertyForm.watch('serviceType') === value
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <input
                        type="radio"
                        value={value}
                        {...propertyForm.register('serviceType')}
                        className="sr-only"
                      />
                      <span className="font-medium text-center">{label}</span>
                      <span className="absolute top-2 right-2 text-xs text-gray-500">
                        from ${PRICING.base[value as keyof typeof PRICING.base]}
                      </span>
                    </label>
                  ))}
                </div>
                {propertyForm.formState.errors.serviceType && (
                  <p className="text-red-500 text-sm mt-2">
                    {propertyForm.formState.errors.serviceType.message}
                  </p>
                )}
              </div>

              {/* Rooms and Bathrooms */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Home className="w-4 h-4" />
                    Number of Rooms *
                  </label>
                  <select
                    {...propertyForm.register('numberOfRooms')}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  >
                    <option value="">Select rooms</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'room' : 'rooms'}
                        {n > PRICING.baseRoomsIncluded && ` (+$${(n - PRICING.baseRoomsIncluded) * 20})`}
                      </option>
                    ))}
                  </select>
                  {propertyForm.formState.errors.numberOfRooms && (
                    <p className="text-red-500 text-sm mt-1">
                      {propertyForm.formState.errors.numberOfRooms.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Bath className="w-4 h-4" />
                    Number of Bathrooms *
                  </label>
                  <select
                    {...propertyForm.register('numberOfBathrooms')}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  >
                    <option value="">Select bathrooms</option>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'bathroom' : 'bathrooms'}
                      </option>
                    ))}
                  </select>
                  {propertyForm.formState.errors.numberOfBathrooms && (
                    <p className="text-red-500 text-sm mt-1">
                      {propertyForm.formState.errors.numberOfBathrooms.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Add-ons: Inside Closets/Cabinets
                </h3>
                <p className="text-sm text-gray-500 mb-4">Optional - select areas that need extra attention</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'closetsKitchen', label: 'Kitchen', price: PRICING.addons.kitchen },
                    { id: 'closetsBedroom', label: 'Bedroom', price: PRICING.addons.bedroom },
                    { id: 'closetsGarage', label: 'Garage', price: PRICING.addons.garage },
                    { id: 'closetsBasement', label: 'Basement', price: PRICING.addons.basement },
                  ].map((addon) => (
                    <label
                      key={addon.id}
                      className={`relative flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        propertyForm.watch(addon.id as keyof PropertyData)
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        {...propertyForm.register(addon.id as keyof PropertyData)}
                        className="sr-only"
                      />
                      <span className="font-medium">{addon.label}</span>
                      <span className="text-sm text-primary">+${addon.price}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-primary flex items-center justify-center gap-2 text-lg py-4"
            >
              <Calculator className="w-5 h-5" />
              Calculate My Estimate
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        )}

        {/* Step 2: Show Estimate */}
        {step === 2 && estimate && propertyData && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-primary to-primary-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl">
              <div className="text-center mb-8">
                <p className="text-primary-100 mb-2">Your Estimated Price</p>
                <div className="flex items-center justify-center gap-2">
                  <DollarSign className="w-10 h-10 opacity-80" />
                  <span className="text-6xl sm:text-7xl font-bold">{estimate.total}</span>
                </div>
                <p className="text-primary-100 mt-2">
                  for {serviceLabels[estimate.serviceType]}
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <h4 className="font-semibold mb-4 text-lg">Price Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Base price ({serviceLabels[estimate.serviceType]})</span>
                    <span>${estimate.base}</span>
                  </div>
                  {estimate.extraRooms > 0 && (
                    <div className="flex justify-between">
                      <span>Additional rooms ({estimate.extraRooms})</span>
                      <span>+${estimate.rooms}</span>
                    </div>
                  )}
                  {estimate.bathrooms > 0 && (
                    <div className="flex justify-between">
                      <span>Bathrooms ({estimate.bathroomCount})</span>
                      <span>+${estimate.bathrooms}</span>
                    </div>
                  )}
                  {estimate.addons > 0 && (
                    <div className="flex justify-between">
                      <span>Add-ons</span>
                      <span>+${estimate.addons}</span>
                    </div>
                  )}
                  <div className="border-t border-white/20 pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${estimate.total}</span>
                  </div>
                </div>
              </div>

              <p className="text-center text-primary-100 text-sm mt-6">
                * Final price may vary based on actual conditions
              </p>
            </div>

            {/* Property Summary */}
            <div className="bg-cream rounded-2xl p-6 border border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-4">Your Selection</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Service:</span>
                  <p className="font-medium">{serviceLabels[propertyData.serviceType]}</p>
                </div>
                <div>
                  <span className="text-gray-500">Rooms:</span>
                  <p className="font-medium">{propertyData.numberOfRooms}</p>
                </div>
                <div>
                  <span className="text-gray-500">Bathrooms:</span>
                  <p className="font-medium">{propertyData.numberOfBathrooms}</p>
                </div>
                {estimate.addons > 0 && (
                  <div>
                    <span className="text-gray-500">Add-ons:</span>
                    <p className="font-medium">
                      {[
                        propertyData.closetsKitchen && 'Kitchen',
                        propertyData.closetsBedroom && 'Bedroom',
                        propertyData.closetsGarage && 'Garage',
                        propertyData.closetsBasement && 'Basement',
                      ].filter(Boolean).join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 btn-secondary flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Modify
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                Book This Price
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Contact Info */}
        {step === 3 && (
          <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-8">
            <div className="bg-cream rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <div className="bg-primary/10 rounded-xl p-4 mb-6 flex items-center justify-between">
                <span className="text-primary font-medium">Your Estimate:</span>
                <span className="text-2xl font-bold text-primary">${estimate?.total}</span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Contact Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...contactForm.register('fullName')}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                  {contactForm.formState.errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {contactForm.formState.errors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Provide at least one way to contact you (phone OR email)
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        {...contactForm.register('phone')}
                        placeholder="(555) 123-4567"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        {...contactForm.register('email')}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                  {contactForm.formState.errors.phone && (
                    <p className="text-red-500 text-sm mt-2">
                      {contactForm.formState.errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Address *
                  </label>
                  <input
                    type="text"
                    {...contactForm.register('address')}
                    placeholder="123 Main St, City, CA"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                  {contactForm.formState.errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {contactForm.formState.errors.address.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date (optional)
                    </label>
                    <input
                      type="date"
                      {...contactForm.register('preferredDate')}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time (optional)
                    </label>
                    <select
                      {...contactForm.register('preferredTime')}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    >
                      <option value="">Select time</option>
                      <option value="8:00 AM">8:00 AM</option>
                      <option value="9:00 AM">9:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                      <option value="5:00 PM">5:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (optional)
                  </label>
                  <textarea
                    {...contactForm.register('additionalNotes')}
                    rows={3}
                    placeholder="Any special requests or information..."
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {submitStatus === 'error' && (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                Something went wrong. Please try again.
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 btn-secondary flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Request
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Request Submitted!
            </h3>
            <p className="text-gray-600 mb-2">
              Your estimated price: <span className="font-bold text-primary">${estimate?.total}</span>
            </p>
            <p className="text-gray-600 mb-8">
              We&apos;ll contact you within 24 hours to confirm your booking.
            </p>
            <button
              onClick={resetForm}
              className="btn-secondary"
            >
              Get Another Estimate
            </button>
          </div>
        )}

        {/* Trust Badge */}
        {step < 4 && (
          <p className="text-center text-sm text-gray-500 mt-6">
            🔒 Your information is secure and will never be shared.
          </p>
        )}
      </div>
    </section>
  )
}
