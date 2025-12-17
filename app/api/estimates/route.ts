import { NextRequest, NextResponse } from 'next/server'
import { 
  getEstimates, 
  markAsRead, 
  markAllAsRead, 
  deleteEstimate,
  getNewCount 
} from '@/lib/estimates-store'

// GET all estimates
export async function GET() {
  try {
    const estimates = await getEstimates()
    const newCount = await getNewCount()
    
    return NextResponse.json({ 
      success: true,
      estimates,
      newCount,
      total: estimates.length
    })
  } catch (error) {
    console.error('Error fetching estimates:', error)
    return NextResponse.json(
      { error: 'Failed to fetch estimates' },
      { status: 500 }
    )
  }
}

// PATCH - mark as read or mark all as read
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, id } = body

    if (action === 'markAsRead' && id) {
      const success = await markAsRead(id)
      return NextResponse.json({ success })
    }

    if (action === 'markAllAsRead') {
      await markAllAsRead()
      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error updating estimate:', error)
    return NextResponse.json(
      { error: 'Failed to update estimate' },
      { status: 500 }
    )
  }
}

// DELETE an estimate
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      )
    }

    const success = await deleteEstimate(id)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Estimate not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting estimate:', error)
    return NextResponse.json(
      { error: 'Failed to delete estimate' },
      { status: 500 }
    )
  }
}

