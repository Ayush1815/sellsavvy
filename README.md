# SellSavvy

Premium ecommerce growth marketing site built with Vite, React 19, React Router, Tailwind CSS v4, and React Three Fiber.

## Development

```bash
npm install
```

Frontend only:

```bash
npm run dev
```

API and frontend:

```bash
npm run dev:all
```

- Web: [http://localhost:3000](http://localhost:3000)
- API: [http://localhost:3001](http://localhost:3001) proxied at `/api`

Audit leads are appended to `server/data/leads.json` and ignored by git.

## Production

```bash
npm run build
npm run start
```

Serves `dist/` and the API on `PORT`, defaulting to `3001`.

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/services` | Service carousel and full services grid |
| `/services/e-commerce-account-management` | E-commerce account management service |
| `/services/digital-marketing-services` | Digital marketing service |
| `/services/e-commerce-photoshoot` | E-commerce photoshoot service |
| `/services/website-design` | Website design service |
| `/services/social-media-management` | Social media management service |
| `/services/amazon-growth` | Amazon channel lander |
| `/services/flipkart-growth` | Flipkart channel lander |
| `/services/shopify-growth` | Shopify channel lander |
| `/growth-system` | Growth workflow |
| `/case-studies` | Case study carousel |
| `/case-studies/:slug` | Case study detail |
| `/faq` | FAQ and schema |
| `/contact` | Audit booking form |
| `/privacy` | Privacy policy |
| `/terms` | Terms page |

Legacy service aliases redirect to the canonical service routes:

- `/services/ecommerce-account-management` -> `/services/e-commerce-account-management`
- `/services/digital-marketing` -> `/services/digital-marketing-services`
- `/services/brand-fashion-product-shoot` -> `/services/e-commerce-photoshoot`
- `/services/website-design-development` -> `/services/website-design`

## Environment

Copy `.env.example` to `.env` and set:

- `VITE_SITE_URL` - canonical URLs for SEO
- `VITE_PLAUSIBLE_DOMAIN` or `VITE_GA_MEASUREMENT_ID` - analytics
- `AUDIT_WEBHOOK_URL` - optional Zapier or Slack webhook on new leads
- `VITE_WHATSAPP_URL` - optional floating WhatsApp CTA

## Features

- Real audit form POST at `/api/audit` with honeypot and lead storage
- Analytics events for page views, CTA clicks, form starts, and form submits
- SEO metadata, Open Graph, Twitter cards, JSON-LD, sitemap, and robots files
- Branded splash, route skeleton loaders, and WebGL progress loader
- Local PMREM environment with no remote HDRI fetch
- WebGL error boundary and poster fallback

## Legacy

[`archive/basic.html`](archive/basic.html) is not part of the Vite bundle.
