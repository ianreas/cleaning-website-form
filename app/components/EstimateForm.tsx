'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

// Form validation schema
const estimateSchema = z.object({
  // Customer Info
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Please enter your full address'),
  
  // Property Details
  numberOfRooms: z.string().min(1, 'Please select number of rooms'),
  numberOfBathrooms: z.string().min(1, 'Please select number of bathrooms'),
  
  // Service Type
  serviceType: z.string().min(1, 'Please select a service type'),
  
  // Closets/Cabinets Cleaning
  closetsKitchen: z.boolean().optional(),
  closetsBedroom: z.boolean().optional(),
  closetsGarage: z.boolean().optional(),
  closetsBasement: z.boolean().optional(),
  closetsOther: z.boolean().optional(),
  closetsOtherText: z.string().optional(),
  
  // Scheduling
  preferredDate: z.string().optional(),
  additionalNotes: z.string().optional(),
})

type EstimateFormData = z.infer<typeof estimateSchema>

const serviceTypes = [
  { value: 'regular', label: 'Regular Cleaning' },
  { value: 'deep', label: 'Deep Cleaning' },
  { value: 'move', label: 'Move-in / Move-out' },
  { value: 'construction', label: 'Post-construction Cleaning' },
  { value: 'office', label: 'Office Cleaning' },
]

const roomOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+']
const bathroomOptions = ['1', '2', '3', '4', '5', '6+']

export default function EstimateForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<EstimateFormData>({
    resolver: zodResolver(estimateSchema),
    defaultValues: {
      closetsKitchen: false,
      closetsBedroom: false,
      closetsGarage: false,
      closetsBasement: false,
      closetsOther: false,
    },
  })

  const closetsOtherChecked = watch('closetsOther')

  const onSubmit = async (data: EstimateFormData) => {
    setSubmitStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/submit-estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit estimate request')
      }

      setSubmitStatus('success')
      reset()
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <section id="estimate" className="py-20 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            Free Estimate
          </span>
          <h2 className="section-title mb-4">
            Get Your Cleaning Quote
          </h2>
          <p className="section-subtitle mx-auto">
            Fill out the form below and we&apos;ll get back to you with a personalized 
            estimate for your cleaning needs.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
        >
          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-green-800">Request Submitted Successfully!</p>
                <p className="text-green-700 text-sm">We&apos;ll contact you shortly with your estimate.</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-800">Submission Failed</p>
                <p className="text-red-700 text-sm">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Customer Information */}
          <div className="mb-10">
            <h3 className="font-heading text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-cream-200">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="form-label">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  {...register('fullName')}
                  className={`input-field ${errors.fullName ? 'border-red-400 focus:border-red-500' : ''}`}
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="form-label">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className={`input-field ${errors.email ? 'border-red-400 focus:border-red-500' : ''}`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="form-label">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone')}
                  className={`input-field ${errors.phone ? 'border-red-400 focus:border-red-500' : ''}`}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="address" className="form-label">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  {...register('address')}
                  className={`input-field ${errors.address ? 'border-red-400 focus:border-red-500' : ''}`}
                  placeholder="123 Main St, Pleasanton, CA"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="mb-10">
            <h3 className="font-heading text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-cream-200">
              Property Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="numberOfRooms" className="form-label">
                  Number of Rooms <span className="text-red-500">*</span>
                </label>
                <select
                  id="numberOfRooms"
                  {...register('numberOfRooms')}
                  className={`select-field ${errors.numberOfRooms ? 'border-red-400 focus:border-red-500' : ''}`}
                >
                  <option value="">Select rooms</option>
                  {roomOptions.map((option) => (
                    <option key={option} value={option}>
                      {option} {option === '10+' ? 'rooms' : option === '1' ? 'room' : 'rooms'}
                    </option>
                  ))}
                </select>
                {errors.numberOfRooms && (
                  <p className="mt-1 text-sm text-red-500">{errors.numberOfRooms.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="numberOfBathrooms" className="form-label">
                  Number of Bathrooms <span className="text-red-500">*</span>
                </label>
                <select
                  id="numberOfBathrooms"
                  {...register('numberOfBathrooms')}
                  className={`select-field ${errors.numberOfBathrooms ? 'border-red-400 focus:border-red-500' : ''}`}
                >
                  <option value="">Select bathrooms</option>
                  {bathroomOptions.map((option) => (
                    <option key={option} value={option}>
                      {option} {option === '6+' ? 'bathrooms' : option === '1' ? 'bathroom' : 'bathrooms'}
                    </option>
                  ))}
                </select>
                {errors.numberOfBathrooms && (
                  <p className="mt-1 text-sm text-red-500">{errors.numberOfBathrooms.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Service Type */}
          <div className="mb-10">
            <h3 className="font-heading text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-cream-200">
              What Type of Cleaning Do You Need?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviceTypes.map((service) => (
                <label
                  key={service.value}
                  className="relative flex items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    value={service.value}
                    {...register('serviceType')}
                    className="peer sr-only"
                  />
                  <div className="w-full p-4 rounded-xl border-2 border-cream-300 bg-white peer-checked:border-primary peer-checked:bg-primary-50 hover:border-secondary transition-all duration-200">
                    <span className="font-medium text-gray-900 peer-checked:text-primary">
                      {service.label}
                    </span>
                  </div>
                </label>
              ))}
            </div>
            {errors.serviceType && (
              <p className="mt-2 text-sm text-red-500">{errors.serviceType.message}</p>
            )}
          </div>

          {/* Closets/Cabinets Cleaning */}
          <div className="mb-10">
            <h3 className="font-heading text-xl font-bold text-gray-900 mb-2 pb-2 border-b border-cream-200">
              Do You Need Cleaning Inside Closets/Cabinets?
            </h3>
            <p className="text-gray-500 text-sm mb-6">Select all areas that apply</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-cream-300 bg-white hover:border-secondary cursor-pointer transition-all has-[:checked]:border-primary has-[:checked]:bg-primary-50">
                <input
                  type="checkbox"
                  {...register('closetsKitchen')}
                  className="checkbox-field"
                />
                <span className="font-medium text-gray-900">Kitchen</span>
              </label>

              <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-cream-300 bg-white hover:border-secondary cursor-pointer transition-all has-[:checked]:border-primary has-[:checked]:bg-primary-50">
                <input
                  type="checkbox"
                  {...register('closetsBedroom')}
                  className="checkbox-field"
                />
                <span className="font-medium text-gray-900">Bedroom</span>
              </label>

              <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-cream-300 bg-white hover:border-secondary cursor-pointer transition-all has-[:checked]:border-primary has-[:checked]:bg-primary-50">
                <input
                  type="checkbox"
                  {...register('closetsGarage')}
                  className="checkbox-field"
                />
                <span className="font-medium text-gray-900">Garage</span>
              </label>

              <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-cream-300 bg-white hover:border-secondary cursor-pointer transition-all has-[:checked]:border-primary has-[:checked]:bg-primary-50">
                <input
                  type="checkbox"
                  {...register('closetsBasement')}
                  className="checkbox-field"
                />
                <span className="font-medium text-gray-900">Basement</span>
              </label>

              <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-cream-300 bg-white hover:border-secondary cursor-pointer transition-all has-[:checked]:border-primary has-[:checked]:bg-primary-50">
                <input
                  type="checkbox"
                  {...register('closetsOther')}
                  className="checkbox-field"
                />
                <span className="font-medium text-gray-900">Other</span>
              </label>
            </div>

            {/* Other area text field */}
            {closetsOtherChecked && (
              <div className="mt-4 animate-fade-in-up">
                <label htmlFor="closetsOtherText" className="form-label">
                  Please specify other area(s)
                </label>
                <input
                  type="text"
                  id="closetsOtherText"
                  {...register('closetsOtherText')}
                  className="input-field"
                  placeholder="e.g., Attic, Laundry room, Pantry"
                />
              </div>
            )}
          </div>

          {/* Scheduling */}
          <div className="mb-10">
            <h3 className="font-heading text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-cream-200">
              Scheduling Preferences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="preferredDate" className="form-label">
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  {...register('preferredDate')}
                  className="input-field"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="additionalNotes" className="form-label">
                Additional Notes
              </label>
              <textarea
                id="additionalNotes"
                {...register('additionalNotes')}
                rows={4}
                className="input-field resize-none"
                placeholder="Any special requests or information we should know..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={submitStatus === 'loading'}
              className="btn-primary text-lg px-12 py-4 flex items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitStatus === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Get My Free Estimate
                </>
              )}
            </button>
          </div>

          {/* Privacy Note */}
          <p className="text-center text-gray-500 text-sm mt-6">
            By submitting this form, you agree to be contacted about your cleaning estimate. 
            We respect your privacy and will never share your information.
          </p>
        </form>
      </div>
    </section>
  )
}

