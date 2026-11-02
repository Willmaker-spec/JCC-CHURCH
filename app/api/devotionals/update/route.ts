
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { id, title, image, content, scheduled_date } = await req.json();
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    const updateData: { title: string; image: string; content: string; updated_at: string; scheduled_date?: string } = {
      title,
      image,
      content,
      updated_at: new Date().toISOString()
    };
    if (scheduled_date) {
      updateData.scheduled_date = scheduled_date;
    }
    const { data, error } = await supabase
      .from('devotionals')
      .update(updateData)
      .eq('id', id)
      .select();
    if (error) {
      // Log error to server console for debugging
      console.error('Supabase update error:', error);
      return NextResponse.json({ error: error.message, details: error.details || null }, { status: 500 });
    }
    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'No devotional updated. Check if the ID exists.' }, { status: 404 });
    }
    return NextResponse.json({ ...data[0], id });
  } catch (err) {
    // Log unexpected errors
    console.error('Update route exception:', err);
    return NextResponse.json({ error: 'Update failed', details: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
