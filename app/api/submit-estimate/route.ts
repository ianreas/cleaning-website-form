import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { addEstimate } from '@/lib/estimates-store'

// Form validation schema
const estimateSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().min(5),
  numberOfRooms: z.string().min(1),
  numberOfBathrooms: z.string().min(1),
  serviceType: z.string().min(1),
  closetsKitchen: z.boolean().optional().default(false),
  closetsBedroom: z.boolean().optional().default(false),
  closetsGarage: z.boolean().optional().default(false),
  closetsBasement: z.boolean().optional().default(false),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  additionalNotes: z.string().optional(),
  estimatedPrice: z.number().optional(),
}).refine((data) => {
  // At least one contact method required
  const hasPhone = data.phone && data.phone.length >= 10
  const hasEmail = data.email && data.email.includes('@')
  return hasPhone || hasEmail
}, {
  message: 'Please provide either a phone number or email address',
})

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate the data
    const validationResult = estimateSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid form data', 
          details: validationResult.error.flatten() 
        },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Store the estimate
    const estimate = await addEstimate({
      fullName: data.fullName,
      email: data.email || '',
      phone: data.phone || '',
      address: data.address,
      numberOfRooms: data.numberOfRooms,
      numberOfBathrooms: data.numberOfBathrooms,
      serviceType: data.serviceType,
      closetsKitchen: data.closetsKitchen || false,
      closetsBedroom: data.closetsBedroom || false,
      closetsGarage: data.closetsGarage || false,
      closetsBasement: data.closetsBasement || false,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      additionalNotes: data.additionalNotes,
      estimatedPrice: data.estimatedPrice,
    })

    console.log('New estimate received:', estimate.id, '- Price: $' + data.estimatedPrice)

    return NextResponse.json({ 
      success: true, 
      message: 'Estimate request submitted successfully',
      id: estimate.id
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 })
}
