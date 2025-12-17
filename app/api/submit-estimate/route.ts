import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { addEstimate } from '@/lib/estimates-store'

// Form validation schema
const estimateSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(5),
  numberOfRooms: z.string().min(1),
  numberOfBathrooms: z.string().min(1),
  serviceType: z.string().min(1),
  closetsKitchen: z.boolean().optional().default(false),
  closetsBedroom: z.boolean().optional().default(false),
  closetsGarage: z.boolean().optional().default(false),
  closetsBasement: z.boolean().optional().default(false),
  closetsOther: z.boolean().optional().default(false),
  closetsOtherText: z.string().optional(),
  preferredDate: z.string().optional(),
  additionalNotes: z.string().optional(),
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
      email: data.email,
      phone: data.phone,
      address: data.address,
      numberOfRooms: data.numberOfRooms,
      numberOfBathrooms: data.numberOfBathrooms,
      serviceType: data.serviceType,
      closetsKitchen: data.closetsKitchen || false,
      closetsBedroom: data.closetsBedroom || false,
      closetsGarage: data.closetsGarage || false,
      closetsBasement: data.closetsBasement || false,
      closetsOther: data.closetsOther || false,
      closetsOtherText: data.closetsOtherText,
      preferredDate: data.preferredDate,
      additionalNotes: data.additionalNotes,
    })

    console.log('New estimate received:', estimate.id)

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
