import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const password = body?.password

    if (!process.env.DEVOTIONAL_ADMIN_PASS) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
    }

    if (password === process.env.DEVOTIONAL_ADMIN_PASS) {
      const res = NextResponse.json({ ok: true })
      // Set a persistent cookie, available site-wide, expires in 7 days
      res.cookies.set('dev_auth', '1', {
        httpOnly: false, // allow client-side JS to read the cookie
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
      return res
    }

    return NextResponse.json({ ok: false }, { status: 401 })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: msg || 'Bad Request' }, { status: 400 })
  }
}
