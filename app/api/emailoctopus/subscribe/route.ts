import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    const apiKey = process.env.EMAILOCTOPUS_API_KEY
    const listId = process.env.EMAILOCTOPUS_LIST_ID

    if (!apiKey || !listId) {
      // store locally as fallback
      const fs = await import('fs')
      const path = await import('path')
      const dir = path.join(process.cwd(), 'data', 'subscribers')
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
      const file = path.join(dir, `${Date.now()}.json`)
      fs.writeFileSync(file, JSON.stringify({ email, createdAt: new Date().toISOString() }))
      return NextResponse.json({ ok: true, stored: true })
    }

    // Attempt to forward to EmailOctopus v1.5/v2 endpoint (best-effort)
    const url = `https://emailoctopus.com/api/1.5/lists/${listId}/contacts`
    const payload = new URLSearchParams()
    payload.append('api_key', apiKey)
    payload.append('email', email)

    const r = await fetch(url, { method: 'POST', body: payload })
    const text = await r.text()
    if (!r.ok) return NextResponse.json({ error: 'Failed', details: text }, { status: 502 })

    return NextResponse.json({ ok: true })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: msg || 'Bad Request' }, { status: 400 })
  }
}
