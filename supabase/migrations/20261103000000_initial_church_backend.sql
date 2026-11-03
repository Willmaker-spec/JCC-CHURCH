create table if not exists public.devotionals (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image text,
  content text not null default '',
  scheduled_date timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.devotionals
  add column if not exists title text not null default 'Untitled',
  add column if not exists image text,
  add column if not exists content text not null default '',
  add column if not exists scheduled_date timestamptz not null default now(),
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create table if not exists public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_slug text not null check (
    event_slug in (
      'heart-room',
      'rooted',
      'manual',
      'nation-takers-webinar',
      'understanding-salvation',
      'unlearning-conference'
    )
  ),
  full_name text not null check (char_length(trim(full_name)) between 2 and 120),
  email text not null check (char_length(email) <= 320 and email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  phone text not null check (char_length(trim(phone)) between 5 and 40),
  answers jsonb not null default '{}'::jsonb check (
    jsonb_typeof(answers) = 'object'
    and octet_length(answers::text) <= 8192
  ),
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (char_length(email) <= 320 and email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  created_at timestamptz not null default now()
);

create index if not exists devotionals_scheduled_date_idx
on public.devotionals (scheduled_date desc);

create index if not exists event_registrations_event_created_idx
on public.event_registrations (event_slug, created_at desc);

alter table public.devotionals enable row level security;
alter table public.admin_users enable row level security;
alter table public.event_registrations enable row level security;
alter table public.newsletter_subscribers enable row level security;

grant select on public.devotionals to anon, authenticated;
grant insert, update, delete on public.devotionals to authenticated;
grant select on public.admin_users to authenticated;
grant select on public.event_registrations to authenticated;
grant insert on public.event_registrations to anon, authenticated;
grant insert on public.newsletter_subscribers to anon, authenticated;

drop policy if exists "Visitors can read published devotionals" on public.devotionals;
create policy "Visitors can read published devotionals"
on public.devotionals for select to anon, authenticated
using (scheduled_date <= now());

drop policy if exists "Admins can read every devotional" on public.devotionals;
create policy "Admins can read every devotional"
on public.devotionals for select to authenticated
using (
  exists (
    select 1 from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);

drop policy if exists "Admins can create devotionals" on public.devotionals;
create policy "Admins can create devotionals"
on public.devotionals for insert to authenticated
with check (
  exists (
    select 1 from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);

drop policy if exists "Admins can update devotionals" on public.devotionals;
create policy "Admins can update devotionals"
on public.devotionals for update to authenticated
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

drop policy if exists "Admins can delete devotionals" on public.devotionals;
create policy "Admins can delete devotionals"
on public.devotionals for delete to authenticated
using (
  exists (
    select 1 from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);

drop policy if exists "Users can check their own admin role" on public.admin_users;
create policy "Users can check their own admin role"
on public.admin_users for select to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "Visitors can submit event registrations" on public.event_registrations;
create policy "Visitors can submit event registrations"
on public.event_registrations for insert to anon, authenticated
with check (true);

drop policy if exists "Admins can view event registrations" on public.event_registrations;
create policy "Admins can view event registrations"
on public.event_registrations for select to authenticated
using (
  exists (
    select 1 from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);

drop policy if exists "Visitors can subscribe to the newsletter" on public.newsletter_subscribers;
create policy "Visitors can subscribe to the newsletter"
on public.newsletter_subscribers for insert to anon, authenticated
with check (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'devotional-images',
  'devotional-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

drop policy if exists "Anyone can view devotional images" on storage.objects;
create policy "Anyone can view devotional images"
on storage.objects for select to anon, authenticated
using (bucket_id = 'devotional-images');

drop policy if exists "Admins can upload devotional images" on storage.objects;
create policy "Admins can upload devotional images"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'devotional-images'
  and exists (
    select 1 from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);

drop policy if exists "Admins can update devotional images" on storage.objects;
create policy "Admins can update devotional images"
on storage.objects for update to authenticated
using (
  bucket_id = 'devotional-images'
  and exists (
    select 1 from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
)
with check (
  bucket_id = 'devotional-images'
  and exists (
    select 1 from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);

drop policy if exists "Admins can delete devotional images" on storage.objects;
create policy "Admins can delete devotional images"
on storage.objects for delete to authenticated
using (
  bucket_id = 'devotional-images'
  and exists (
    select 1 from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);
