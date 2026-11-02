import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'

export async function GET(req: Request) {
  const cookie = cookies().get('dev_auth')?.value
  if (!cookie) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const { data, error } = await supabase.from('devotionals').select('id, scheduled_date').eq('id', id).limit(1).single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    const scheduled = data?.scheduled_date || null
    if (!scheduled) return NextResponse.json({ id, scheduled: null })

    const iso = String(scheduled)
    const asDate = new Date(iso)
    const serverLocal = asDate.toString()
    const utc = asDate.toISOString()

    return NextResponse.json({ id, scheduled: iso, serverLocal, utc })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
