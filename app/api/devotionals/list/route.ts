

import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Simple in-memory cache (per serverless instance)
type DevotionalItem = { id: string; title?: string; image?: string; content?: string; created_at?: string; updated_at?: string; scheduled_date?: string }
const devotionalCache: Record<string, { data: DevotionalItem[]; expires: number }> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (id) {
    // Check cache first
    const now = Date.now();
    if (devotionalCache[id] && devotionalCache[id].expires > now) {
      return NextResponse.json({ items: devotionalCache[id].data, total: devotionalCache[id].data?.length || 0 });
    }
    // Fetch a single devotional by id
    const { data: items, error } = await supabase
      .from('devotionals')
      .select('id, title, image, content, created_at, updated_at, scheduled_date')
      .eq('id', id)
      .limit(1);
    if (!error) {
      devotionalCache[id] = { data: items || [], expires: now + CACHE_TTL };
    }
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ items: items || [], total: items?.length || 0 });
  }

  // Paginated list
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const includeScheduled = searchParams.get('includeScheduled') === 'true';

  const now = new Date().toISOString();
  let query = supabase
    .from('devotionals')
    .select('id, title, image, content, created_at, updated_at, scheduled_date')
    .order('scheduled_date', { ascending: false });

  // For public list, only show devotionals that are scheduled for now or past
  if (!includeScheduled) {
    query = query.lte('scheduled_date', now);
  }

  const { data: items, error } = await query.range(from, to);

  let countQuery = supabase
    .from('devotionals')
    .select('*', { count: 'exact', head: true });

  if (!includeScheduled) {
    countQuery = countQuery.lte('scheduled_date', now);
  }

  const { count } = await countQuery;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ items: items || [], total: count || 0 });
}
