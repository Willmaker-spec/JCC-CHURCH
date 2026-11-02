import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email || typeof email !== 'string') return NextResponse.json({ error: 'Email required' }, { status: 400 })

    const apiKey = process.env.EMAILOCTOPUS_API_KEY
    const listId = process.env.EMAILOCTOPUS_LIST_ID

    if (!apiKey || !listId) {
      // fallback: store locally
      const fs = await import('fs')
      const path = await import('path')
      const dir = path.join(process.cwd(), 'data', 'subscribers')
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
      const file = path.join(dir, `${Date.now()}.json`)
      fs.writeFileSync(file, JSON.stringify({ email, createdAt: new Date().toISOString() }))
      return NextResponse.json({ ok: true, stored: true })
    }

    const url = `https://emailoctopus.com/api/1.6/lists/${listId}/contacts?api_key=${encodeURIComponent(apiKey)}`
    let r: Response
    try {
      r = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email_address: email, status: 'SUBSCRIBED' }),
      })
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      return NextResponse.json({ error: 'Upstream request failed', details: msg }, { status: 502 })
    }

    const contentType = r.headers.get('content-type') || ''
    let body: unknown
    if (contentType.includes('application/json')) {
      body = await r.json()
    } else {
      body = await r.text()
    }

    if (!r.ok) {
      let errMsg = 'Subscription failed'
      if (typeof body === 'string') {
        errMsg = body
      } else if (body && typeof body === 'object') {
        const b = body as Record<string, unknown>
        const e = b['error']
        if (typeof e === 'string') errMsg = e
        else if (e && typeof e === 'object') {
          const m = (e as Record<string, unknown>)['message']
          if (typeof m === 'string') errMsg = m
        }
      }
      return NextResponse.json({ error: errMsg, upstreamStatus: r.status, upstreamBody: body }, { status: 502 })
    }

    return NextResponse.json({ ok: true, upstreamBody: body })
  } catch {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
  }
}
