import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'


export async function POST(req: Request) {
  const cookie = cookies().get('dev_auth')?.value
  if (!cookie) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const title = body.title || 'Untitled'
    const content = body.content || ''
    const image = body.image || ''
    const scheduled_date = body.scheduled_date || new Date().toISOString()

    // Insert into Supabase (no slug)
    const { data, error } = await supabase
      .from('devotionals')
      .insert([{ title, image, content, scheduled_date }])
      .select();
    if (error) {
      // Log error to server console for debugging
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: error.message, details: error.details || null }, { status: 500 });
    }
    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'No devotional created. Insert returned no data.' }, { status: 500 });
    }
    return NextResponse.json({ ok: true, id: data[0].id });
  } catch (error: unknown) {
    // Log unexpected errors
    console.error('Create route exception:', error);
    const msg = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: msg || 'Bad Request' }, { status: 400 })
  }
}
