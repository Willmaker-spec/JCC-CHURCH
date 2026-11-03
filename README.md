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

## Integrations

Add the public keys/settings used by the client to the existing `.env` file:

- YouTube API key and channel ID load sermon videos.
- EmailJS public keys enable event registration forms.

The previous Supabase devotional integration has been removed. Devotional pages currently display a backend-not-connected message until a replacement is configured. This is a Vite + React app, so the `app/api/` files are not server routes; use Supabase Edge Functions or a separate backend for trusted operations. Never put private/service-role keys in `VITE_` variables because Vite exposes them to browsers.
