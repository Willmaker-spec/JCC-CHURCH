import { NextResponse } from 'next/server'

interface ManualRegistrationPayload {
  fullName: string
  email: string
  phone: string
  rideShare?: string
  location?: string
}

export async function POST(request: Request) {
  try {
    const body: ManualRegistrationPayload = await request.json()

    const { fullName, email, phone, rideShare, location } = body

    // Validate required fields
    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Registration is handled entirely via EmailJS on the client.
    // This route only validates the payload.
    console.log('Manual registration received:', { fullName, email, phone, rideShare, location, submittedAt: new Date().toISOString() })

    return NextResponse.json({
      success: true,
      message: 'Registration successful. Check your email for event details.',
    })
  } catch (error) {
    console.error('Manual registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
