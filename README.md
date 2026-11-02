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

## Optional integrations

Copy `.env.example` to `.env.local` and add the public keys/settings used by the client:

- Supabase URL and anon key load devotional records.
- YouTube API key and channel ID load sermon videos.
- EmailJS public keys enable event registration forms.

The app remains navigable if an integration is not configured; the relevant page reports the missing integration instead of crashing. Never put private/service-role keys in `VITE_` variables because Vite exposes them to browsers.
