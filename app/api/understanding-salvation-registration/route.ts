import { NextResponse } from 'next/server'

interface UnderstandingSalvationRegistrationPayload {
  fullName: string
  email: string
  phone: string
  canAttendAllDays: string
  expectations?: string
}

export async function POST(request: Request) {
  try {
    const body: UnderstandingSalvationRegistrationPayload = await request.json()

    const { fullName, email, phone, canAttendAllDays, expectations } = body

    if (!fullName || !email || !phone || !canAttendAllDays) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      )
    }

    const webhookPayload = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      canAttendAllDays: canAttendAllDays.trim(),
      expectations: expectations?.trim() || 'N/A',
      event: '4 Days of Understanding Salvation',
      eventDate: 'April 13, 14, 16 & 17, 2026',
      eventTime: '7:00 PM',
      submittedAt: new Date().toISOString(),
    }

    const webhookUrl =
      process.env.SALVATION_REG_SHEET_WEBHOOK || process.env.ROOTED_REG_SHEET_WEBHOOK

    if (webhookUrl) {
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload),
      })

      if (!webhookResponse.ok) {
        console.error('Understanding Salvation webhook submission failed:', await webhookResponse.text())
      }
    } else {
      console.warn('No SALVATION_REG_SHEET_WEBHOOK configured. Payload:', webhookPayload)
    }

    return NextResponse.json({
      success: true,
      message: 'Registration submitted successfully.',
    })
  } catch (error) {
    console.error('Understanding Salvation registration API error:', error)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}
