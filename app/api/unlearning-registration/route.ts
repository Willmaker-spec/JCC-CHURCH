import { NextResponse } from 'next/server'

interface UnlearningRegistrationPayload {
  fullName: string
  email: string
  phone: string
  clan?: string
  pledgeAccepted: boolean
}

export async function POST(request: Request) {
  try {
    const body: UnlearningRegistrationPayload = await request.json()

    const { fullName, email, phone, clan, pledgeAccepted } = body

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      )
    }

    if (!pledgeAccepted) {
      return NextResponse.json(
        { error: 'You must accept the pledge to continue.' },
        { status: 400 }
      )
    }

    const webhookPayload = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      clan: clan?.trim() || 'N/A',
      pledgeAccepted: 'Yes',
      event: 'The Unlearning Conference',
      eventDate: 'June 29 to July 10, 2026 (Weekdays, Mon-Fri)',
      sermonTime: '10:00 AM daily',
      reviewTime: '8:30 PM daily',
      submittedAt: new Date().toISOString(),
    }

    const webhookUrl =
      process.env.UNLEARNING_REG_SHEET_WEBHOOK || process.env.ROOTED_REG_SHEET_WEBHOOK

    if (webhookUrl) {
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload),
      })

      if (!webhookResponse.ok) {
        console.error('Unlearning Conference webhook submission failed:', await webhookResponse.text())
      }
    } else {
      console.warn('No UNLEARNING_REG_SHEET_WEBHOOK configured. Payload:', webhookPayload)
    }

    return NextResponse.json({
      success: true,
      message: 'Registration submitted successfully.',
    })
  } catch (error) {
    console.error('Unlearning Conference registration API error:', error)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}
