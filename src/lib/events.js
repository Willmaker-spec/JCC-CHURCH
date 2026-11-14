import { supabase } from './supabase.js';

export function getLegacyEventStart(event) {
  if (!event.event_date || !event.event_time) return null;
  const timestamp = Date.parse(`${event.event_date} ${event.event_time}`);
  return Number.isNaN(timestamp) ? null : new Date(timestamp).toISOString();
}

export const isUpcomingEvent = event => {
  const startsAt = Date.parse(event.event_start_at);
  if (Number.isFinite(startsAt)) return startsAt > Date.now();

  const date = event.event_date?.trim();
  if (!date) return true;
  if (/\b(ended|past|finished|concluded|archived|cancelled|canceled)\b/i.test(date)) return false;

  const timestamp = Date.parse(date);
  if (Number.isNaN(timestamp)) return true;

  const eventDay = new Date(timestamp);
  eventDay.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDay >= today;
};

export async function fetchPublishedUpcomingEvents() {
  let result = await supabase
    .from('events')
    .select('slug, title, tagline, description, event_date, event_time, event_start_at, location, event_type, image')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (result.error?.code === '42703' && result.error.message.includes('event_start_at')) {
    console.warn('Event countdown migration is not applied; using legacy event dates until it is run.');
    result = await supabase
      .from('events')
      .select('slug, title, tagline, description, event_date, event_time, location, event_type, image')
      .eq('is_published', true)
      .order('created_at', { ascending: false });
  }

  if (result.error) throw result.error;
  return (result.data || []).filter(isUpcomingEvent);
}
