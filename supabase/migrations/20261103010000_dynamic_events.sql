create table if not exists public.events (
  slug text primary key,
  title text not null check (char_length(trim(title)) between 2 and 160),
  tagline text not null default '',
  description text not null default '',
  event_date text not null default '',
  event_time text not null default '',
  location text not null default '',
  event_type text not null default 'Event',
  image text not null default '/images/event-hero.jpg',
  is_published boolean not null default false,
  registration_open boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint events_slug_format check (
    slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'
    and slug not in (
      'heart-room',
      'manual',
      'nation-takers-webinar',
      'rooted',
      'understanding-salvation',
      'unlearning-conference'
    )
  )
);

alter table public.events enable row level security;

grant select on public.events to anon, authenticated;
grant insert, update, delete on public.events to authenticated;

drop policy if exists "Visitors can read published events" on public.events;
create policy "Visitors can read published events"
on public.events for select to anon, authenticated
using (is_published);

drop policy if exists "Admins can manage events" on public.events;
create policy "Admins can manage events"
on public.events for all to authenticated
using (
  exists (
    select 1 from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1 from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);

alter table public.event_registrations
  drop constraint if exists event_registrations_event_slug_check;

alter table public.event_registrations
  drop constraint if exists event_registrations_event_slug_format;

alter table public.event_registrations
  add constraint event_registrations_event_slug_format
  check (event_slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$');

drop policy if exists "Visitors can submit event registrations" on public.event_registrations;
create policy "Visitors can submit event registrations"
on public.event_registrations for insert to anon, authenticated
with check (
  event_slug in (
    'heart-room',
    'rooted',
    'manual',
    'nation-takers-webinar',
    'understanding-salvation',
    'unlearning-conference'
  )
  or exists (
    select 1 from public.events
    where events.slug = event_registrations.event_slug
      and events.is_published
      and events.registration_open
  )
);
