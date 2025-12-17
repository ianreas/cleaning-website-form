import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { twilioClient, TWILIO_PHONE_NUMBER, RECIPIENT_PHONE_NUMBER } from '@/lib/twilio'

// Form validation schema
const estimateSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(5),
  numberOfRooms: z.string().min(1),
  numberOfBathrooms: z.string().min(1),
  serviceType: z.string().min(1),
  closetsKitchen: z.boolean().optional(),
  closetsBedroom: z.boolean().optional(),
  closetsGarage: z.boolean().optional(),
  closetsBasement: z.boolean().optional(),
  closetsOther: z.boolean().optional(),
  closetsOtherText: z.string().optional(),
  preferredDate: z.string().optional(),
  additionalNotes: z.string().optional(),
})

type EstimateData = z.infer<typeof estimateSchema>

// Map service type codes to readable names
const serviceTypeLabels: Record<string, string> = {
  regular: 'Regular Cleaning',
  deep: 'Deep Cleaning',
  move: 'Move-in / Move-out',
  construction: 'Post-construction Cleaning',
  office: 'Office Cleaning',
}

// Format the SMS message
function formatSmsMessage(data: EstimateData): string {
  // Build closets/cabinets list
  const closetAreas: string[] = []
  if (data.closetsKitchen) closetAreas.push('Kitchen')
  if (data.closetsBedroom) closetAreas.push('Bedroom')
  if (data.closetsGarage) closetAreas.push('Garage')
  if (data.closetsBasement) closetAreas.push('Basement')
  if (data.closetsOther && data.closetsOtherText) {
    closetAreas.push(data.closetsOtherText)
  }

  const closetsInfo = closetAreas.length > 0 
    ? closetAreas.join(', ') 
    : 'None'

  // Format preferred date
  const dateInfo = data.preferredDate 
    ? new Date(data.preferredDate).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Not specified'

  // Build the message
  const message = `
🧹 NEW ESTIMATE REQUEST

📋 CUSTOMER INFO
Name: ${data.fullName}
Phone: ${data.phone}
Email: ${data.email}
Address: ${data.address}

🏠 PROPERTY
Rooms: ${data.numberOfRooms}
Bathrooms: ${data.numberOfBathrooms}

🧼 SERVICE
Type: ${serviceTypeLabels[data.serviceType] || data.serviceType}
Closets/Cabinets: ${closetsInfo}

📅 PREFERRED DATE
${dateInfo}

${data.additionalNotes ? `📝 NOTES\n${data.additionalNotes}` : ''}
`.trim()

  return message
}

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

    // Format the SMS message
    const smsMessage = formatSmsMessage(data)

    // Send SMS via Twilio
    if (twilioClient && TWILIO_PHONE_NUMBER) {
      try {
        await twilioClient.messages.create({
          body: smsMessage,
          from: TWILIO_PHONE_NUMBER,
          to: RECIPIENT_PHONE_NUMBER,
        })

        console.log('SMS sent successfully to', RECIPIENT_PHONE_NUMBER)
      } catch (twilioError) {
        console.error('Twilio error:', twilioError)
        // We'll still return success since the form was submitted
        // but log the error for debugging
      }
    } else {
      // Log the message for development/testing
      console.log('=== SMS would be sent (Twilio not configured) ===')
      console.log(smsMessage)
      console.log('=================================================')
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Estimate request submitted successfully' 
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

