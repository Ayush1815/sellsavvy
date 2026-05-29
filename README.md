# SellSavvy

Premium ecommerce growth marketing site built with Vite, React 19, React Router, Tailwind CSS v4, and React Three Fiber.

## Development

```bash
npm install
```

**Frontend only** (form/analytics API calls need proxy):

```bash
npm run dev
```

**API + frontend** (recommended):

```bash
npm run dev:all
```

- Web: [http://localhost:3000](http://localhost:3000)
- API: [http://localhost:3001](http://localhost:3001) (proxied at `/api`)

Audit leads are appended to `server/data/leads.json` (gitignored).

## Production

```bash
npm run build
npm run start
```

Serves `dist/` and API on `PORT` (default `3001`).

## Routes

| Path | Page |
|------|------|
| `/` | Home (3D hero, teasers) |
| `/services` | Full services grid |
| `/services/amazon-growth` | Amazon channel lander |
| `/services/flipkart-growth` | Flipkart channel lander |
| `/services/shopify-growth` | Shopify channel lander |
| `/growth-system` | Growth workflow |
| `/case-studies` | Case study carousel |
| `/case-studies/:slug` | Case study detail |
| `/faq` | FAQ + schema |
| `/contact` | Audit booking form |

## Environment

Copy `.env.example` to `.env` and set:

- `VITE_SITE_URL` — canonical URLs for SEO
- `VITE_PLAUSIBLE_DOMAIN` or `VITE_GA_MEASUREMENT_ID` — analytics
- `AUDIT_WEBHOOK_URL` — optional Zapier/Slack webhook on new leads
- `VITE_WHATSAPP_URL` — optional floating WhatsApp CTA

## Features

- Real audit form POST (`/api/audit`) with honeypot + lead storage
- Analytics events (`page_view`, `cta_click`, `form_start`, `form_submit`)
- SEO: Open Graph, Twitter cards, JSON-LD, `sitemap.xml`, `robots.txt`
- Branded splash + route skeleton loaders + WebGL progress loader
- Local PMREM environment (no remote HDRI fetch)
- WebGL error boundary + poster fallback

## Legacy

[`archive/basic.html`](archive/basic.html) is not part of the Vite bundle.
