# SellSavvy Production Readiness

Last updated: 2026-05-29
Stack: Vite 6, React 19, React Router 7, Express API

This report is intentionally strict. It reflects the current code after the theme, loader, navbar, hero video, and production-readiness polish passes.

## Executive Status

Overall readiness: about 83% production-ready.

| Area | Completion | Status | Launch blocker |
| --- | ---: | --- | --- |
| Frontend UI and routing | 97% | Strong | No |
| Light/dark theme polish | 93% | Improved | No |
| Hero video implementation | 90% | Improved | No |
| Responsive layout | 89% | Improved | No |
| Lead form UI | 92% | Strong | No |
| Lead form backend | 72% | Partial | Yes, production lead delivery must be configured |
| Analytics | 70% | Partial | No, but recommended |
| SEO technical baseline | 84% | Good | Domain-specific sitemap and Search Console still needed |
| Performance | 74% | Improved | No, but hero videos still need compression |
| Accessibility | 80% | Good baseline | Full audit still needed |
| Security and abuse controls | 62% | Partial | Rate limiting/CAPTCHA should be added before ad traffic |
| CI/CD and monitoring | 35% | Partial | Recommended before serious launch |

## Changes Completed In This Pass

- Centralized the SellSavvy brand color system in `src/index.css`.
- Replaced muddy brown/mustard accents with a warmer premium gold system based on the navy/gold logo direction.
- Improved dark-mode loader visibility with a frosted off-white brand card behind the original logo.
- Improved dark-mode navbar logo visibility with a frosted brand plate instead of filtering or recoloring the logo.
- Reworked hero media sizing so the video uses `object-fit: contain`, responsive wrapper sizing, and `overflow: visible` on the media frame.
- Mounted only the active theme video instead of rendering both light and dark videos.
- Added reduced-motion behavior that uses the poster/fallback instead of autoplay video.
- Removed unsupported `NODE_ENV=production` from local `.env`, clearing the Vite production build warning.
- Rechecked desktop and mobile layout in production preview.
- Added a fade/drop brand animation when the navbar logo remounts on theme toggle.
- Replaced the stark dark-mode white brand plates with a darker navy/glass treatment and a small logo-only light backing.
- Updated the contact phone number to `+91 79850 07920`.
- Increased hero headline line spacing and removed descender clipping on the animated headline lines.
- Removed the duplicate-looking navbar divider by making the fixed header borderless.
- Redesigned the navbar into a sleeker floating/pill system inspired by the reference style while preserving SellSavvy navy/gold branding.
- Darkened and softened light-mode gold CTA hover behavior to avoid the bright yellow glow.
- Generated a transparent cropped brand mark from `media/Logo.png` and switched the header and loader to `/brand/sellsavvy-mark-transparent.png`.
- Removed the logo/poster image from hero video theme switching; the video now fades over a neutral dashboard placeholder while the active theme source loads.
- Tuned the light navbar glass panel to be more visible, with a dark active tab, and tuned the dark navbar panel to use lighter grey idle text with a softer active state.
- Verified the hero headline descender spacing; the "together" line now has clear breathing room before the paragraph.
- Updated `tsconfig.json` to exclude generated output (`dist`) so type checks do not scan stale hashed build files.

## Brand Tokens

Current key tokens:

```css
--brand-navy: #0b2540;
--brand-navy-900: #071827;
--brand-gold: #cf9c2d;
--brand-gold-hover: #b98216;
--brand-gold-soft: #f2e4bd;
--brand-gold-muted: #a87312;
--surface-light: #f8faf7;
--surface-dark: #071017;
--text-primary: #071122;
--text-muted: #46566e;
--border-soft: rgba(148, 163, 184, 0.26);
--hero-video-scale: 1.08;
--hero-media-width: clamp(620px, 54vw, 980px);
```

Dark mode overrides use a brighter gold:

```css
--brand-gold: #e4bd60;
--brand-gold-hover: #f0cf7a;
--brand-gold-soft: rgba(228, 189, 96, 0.15);
--brand-gold-muted: #f0cf7a;
--text-primary: #f8fafc;
--text-muted: #c6d0dc;
--border-soft: rgba(255, 255, 255, 0.12);
```

## Hero Video Status

Implementation status: improved and production-usable.

- Light theme loads `/media/Light_Theme.mp4`.
- Dark theme loads `/media/Dark_Theme.mp4`.
- Only one `<video>` element is mounted at a time.
- Videos autoplay, loop, are muted, use `playsInline`, and have no controls.
- `preload="metadata"` is used so the video does not eagerly download full media before layout.
- No logo poster is applied to the video, so the SellSavvy logo no longer flashes in place of the hero animation during theme changes.
- A neutral dashboard-style placeholder stays behind the video while the active theme source loads.
- Reduced-motion users get a static CSS fallback instead of autoplay.
- Video opacity transitions from 0 to 1 after `loadeddata`/`canplay`, avoiding a harsh source swap.
- The wrapper and frame use visible overflow so the scaled video is not cropped by a fixed card/frame.
- Production preview verification showed no horizontal scroll and the scaled video inside the visible page edge.
- Latest browser check confirmed light source `/media/Light_Theme.mp4`, dark source `/media/Dark_Theme.mp4`, no `poster` attribute, and no logo image shown during the switch.
- Mobile verification at 390px showed no horizontal scroll and the video kept its full aspect ratio.

Remaining video work:

- `Light_Theme.mp4` is 7.00 MB and should be compressed or replaced with responsive encodes.
- `Dark_Theme.mp4` is 2.63 MB and acceptable for a first pass, but can still be optimized.
- Consider adding WebM/AV1 variants for modern browsers.

## Build Output

Measured on 2026-05-29 with `npm run build`.

| Asset | Size | Gzip |
| --- | ---: | ---: |
| `index-*.js` | 439.25 KB | 141.76 KB |
| `index-*.css` | 110.46 KB | 17.77 KB |
| `HomePage-*.js` | 11.87 KB | 3.84 KB |
| `ContactPage-*.js` | 9.51 KB | 3.36 KB |
| `PrivacyPolicyPage-*.js` | 9.25 KB | 2.64 KB |
| `TermsPage-*.js` | 10.03 KB | 2.95 KB |

Asset sizes:

| Asset | Size |
| --- | ---: |
| `public/media/Light_Theme.mp4` | 7.00 MB |
| `public/media/Dark_Theme.mp4` | 2.63 MB |
| `public/hero-poster.webp` | 92 KB, retained as a fallback asset but not used as the hero video poster |
| `public/brand/Logo.png` | 2.25 MB, retained as the original transparent source/reference |
| `public/brand/sellsavvy-mark-transparent.png` | 89 KB, used by header/splash |
| `public/brand/sellsavvy-logo-transparent.png` | 220 KB, generated candidate, currently unused |
| `public/brand/sellsavvy-logo.png` | 92 KB, retained for favicon/legacy references |

## Quality Checks Run

- `npm run lint`: passed.
- `npm run build`: passed.
- TypeScript config: generated `dist` output is excluded from lint/typecheck.
- Production preview on `http://127.0.0.1:3005/`: checked desktop and mobile layout.
- Navbar: checked header border is `0px`, no horizontal overflow, active nav pill renders in light/dark, light nav panel uses `rgba(229, 233, 236, 0.72)`, dark nav panel uses `rgba(44, 55, 62, 0.72)`, and logo uses `/brand/sellsavvy-mark-transparent.png`.
- CTA hover: light-mode gold token checked as `#cf9c2d` with hover `#b98216`.
- Theme video behavior: checked light and dark sources swap correctly, with no `poster` attribute and a neutral dashboard placeholder during load.
- Hero clipping: checked wrapper/frame overflow, video `object-fit: contain`, one mounted video, and no horizontal scroll.
- Hero headline: checked a 40px measured gap between the animated "We scale together." line and the following paragraph.
- Navbar dark logo: checked the darker glass brand treatment is applied in dark mode without a large white plate.
- Footer brand: checked the footer no longer renders the logo area inside a large white box in dark mode.
- Contact number: checked `+91 79850 07920` appears and the previous US number does not.
- Font stack: checked Gilmer is first in the computed font family.

## Remaining Launch Work

- Compress or re-encode the light hero video; 7 MB is still heavy for mobile.
- Remove or archive the unused 2.25 MB `Logo.png` only after confirming no external/documentation reference still needs it.
- Run Lighthouse mobile/desktop after deployment. No Lighthouse score is claimed in this document.
- Add production rate limiting and/or CAPTCHA if paid traffic will drive form submissions.
- Configure lead delivery with webhook, email, or CRM. File-only lead storage is not enough for production.
- Set final production domain values and update sitemap/robots.
- Add monitoring for `/` and `/api/health`.
- Run a final accessibility audit with keyboard, screen reader labels, and contrast tooling.
