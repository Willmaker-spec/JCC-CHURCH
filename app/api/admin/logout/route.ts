import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set('dev_auth', '', { path: '/admin', maxAge: 0 })
  return res
}
