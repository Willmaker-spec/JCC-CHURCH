import { NextResponse } from 'next/server'

interface WebinarRegistrationPayload {
  fullName: string
  email: string
  phone: string
  occupation: string
  organization?: string
}

export async function POST(request: Request) {
  try {
    const body: WebinarRegistrationPayload = await request.json()

    const { fullName, email, phone, occupation, organization } = body

    // Validate required fields
    if (!fullName || !email || !phone || !occupation) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Prepare payload for webhook
    const webhookPayload = {
      fullName,
      email,
      phone,
      occupation,
      organization: organization || 'N/A',
      event: 'Nation Takers Career Webinar 1.0',
      eventDate: 'February 7, 2026',
      submittedAt: new Date().toISOString()
    }

    // Get webhook URL from environment variables
    const webhookUrl = process.env.NTCW_REG_SHEET_WEBHOOK || process.env.ROOTED_REG_SHEET_WEBHOOK

    if (webhookUrl) {
      // Forward to webhook (e.g., Google Sheets, Zapier, Make.com)
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload),
      })

      if (!webhookResponse.ok) {
        console.error('Webhook submission failed:', await webhookResponse.text())
      } else {
        console.log('NTCW registration forwarded to webhook successfully')
      }
    } else {
      console.warn('No webhook URL configured for NTCW registrations')
    }

    return NextResponse.json({
      success: true,
      message: 'Registration successful. Check your email for the Google Meet link.'
    })

  } catch (error) {
    console.error('NTCW registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
