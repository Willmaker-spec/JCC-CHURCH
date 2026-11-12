alter table public.events
  add column if not exists event_start_at timestamptz;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'event-images',
  'event-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

drop policy if exists "Anyone can view event images" on storage.objects;
create policy "Anyone can view event images"
on storage.objects for select to anon, authenticated
using (bucket_id = 'event-images');

drop policy if exists "Admins can upload event images" on storage.objects;
create policy "Admins can upload event images"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'event-images'
  and exists (
    select 1 from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);

drop policy if exists "Admins can delete event images" on storage.objects;
create policy "Admins can delete event images"
on storage.objects for delete to authenticated
using (
  bucket_id = 'event-images'
  and exists (
    select 1 from public.admin_users
    where admin_users.user_id = (select auth.uid())
  )
);
