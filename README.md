# Jubilee Christian Centre Church

Vite + React single-page application. Page navigation is handled by React Router; the existing page modules live under `app/` and are explicitly registered in `src/App.jsx`.

## Run locally

```sh
npm install
npm run dev
```

Build and preview the production app with:

```sh
npm run build
npm run preview
```

## Routes

- `/` — Home
- `/about`, `/contact`, `/admin`
- `/devotionals` and `/devotionals/:slug`
- `/events` and the individual event pages under `/events/`
- `/give`, `/map`, `/ministries`, `/quick-links`, `/sermons`

Vite serves `index.html` for nested routes so direct links and browser refreshes work.

Set `VITE_SITE_URL` to the canonical public URL when the church domain is purchased. The sitemap remains empty until this value is configured.

## Supabase setup

The app uses Supabase for devotional publishing, event management and registrations, and newsletter sign-ups. The initial database setup is in [the initial migration](./supabase/migrations/20261103000000_initial_church_backend.sql).

1. In Supabase, open **SQL Editor**, create a query, paste the contents of the migration file, and run it once. It creates the tables, access policies, and public devotional image bucket.
2. In **Project Settings → API**, copy the Project URL and publishable key. Put them in the root `.env` as `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. This project already has a `.env`; keep the values there and do not replace it with `.env.example`. The client also accepts the older `VITE_SUPABASE_ANON_KEY` name. Do not use a secret or service-role key in the browser.
3. In **Authentication → Users**, create your admin account. Copy its user ID and run this in SQL Editor, replacing the placeholder:

   ```sql
   insert into public.admin_users (user_id)
   values ('PASTE-ADMIN-USER-UUID-HERE');
   ```

4. Restart `npm run dev`, open `/admin`, and sign in with that user’s email and password. The admin session signs out after one minute away from `/admin`; returning sooner keeps the session. Create a test devotional and verify that it appears at `/devotionals`. Future-dated posts stay hidden from visitors until their scheduled time.
5. Event form submissions are saved in `event_registrations`; newsletter emails are saved in `newsletter_subscribers`. Signed-in admins can review, search, filter, and export event registrations under **Event registrations** in `/admin`. RLS permits admin reads while public visitors can submit but cannot read registration records. The Supabase **Table Editor** remains available for direct inspection. EmailJS confirmations remain client-side; newsletter sign-ups are stored in Supabase but are not yet synced to EmailOctopus.
6. To enable admin-created events, open Supabase **SQL Editor**, paste and run [the dynamic events migration](./supabase/migrations/20261103010000_dynamic_events.sql) once, after the initial setup. This adds the `events` table and updates registration rules without deleting existing registrations; do not rerun or replace the initial migration.
7. Run [the event countdown and image storage migration](./supabase/migrations/20261112000000_event_countdowns_and_images.sql) after the dynamic events migration. It adds the exact event start timestamp and a public event-image bucket with admin-only upload and delete access. In `/admin`, create, publish, edit, or delete events; published events require a future start date/time, a visitor-facing date, and a visitor-facing time. Admins can upload JPG, PNG, WebP, or GIF event images up to 5 MB. Published events appear on `/events` with a live countdown and their own URL; they accept registrations while **Accept registrations** is enabled. Review new sign-ups in `event_registrations`.

This is a Vite + React app. Files in `app/api/` are not running backend routes here; forms now use the Supabase client directly. Public forms can be abused by automated submissions, so add an Edge Function with rate limiting/CAPTCHA before relying on them for high-volume or sensitive sign-ups. Never expose a Supabase service-role key in frontend code or any `VITE_` variable.

## Other integrations

Set `VITE_YOUTUBE_API_KEY`, `VITE_YOUTUBE_CHANNEL_ID`, and the EmailJS public keys in `.env` if those integrations are used. Set `VITE_SITE_URL` to the canonical public URL when the church domain is ready.
