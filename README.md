# Leoz Gents Salon

Direction B — Modern Gentleman’s Club. A responsive Next.js App Router staging implementation based on the supplied visual reference and master brief.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. `npm run build` creates a staging build; `npm start` serves it.

## Validation

```sh
npm run typecheck
npm test
npm run check:release
```

The release check intentionally fails while operational facts, real assets and launch integrations remain missing. `npm run build:production` runs this gate first. Production deployments (`VERCEL_ENV=production` or `LEOZ_RELEASE=production`) are also blocked in Next configuration. A normal optimized build is for staging only.

## Content and media

- `data/locations.json` is the single editable branch fact source; `data/locations.ts` exports its typed records.
- Services are illustrative, unverified concepts. No invented prices or durations are displayed.
- Barber and review records are empty pending approval. No invented staff identities, testimonials or ratings are shown.
- All eight WebP images are AI-generated concept artwork, including the temporary lion crest. They are not real Leoz premises, staff, customers or an approved logo. Replace with approved originals before release.
- Journal copy is explicitly marked as an editorial draft.
- No appointments, payments, messages or membership signups are submitted by this preview.

## Interactions

Global booking chooses a location, then follows its verified HTTPS destination when available. Branch booking retains its location. Unverified links produce a clear unavailable state instead of navigating. Mobile Book / WhatsApp / Directions retain the last selected branch for the browser session. Menus and booking dialogs use native modal focus management and Escape dismissal.

Analytics events dispatch as local `leoz:interaction` CustomEvents. They reach an existing `window.dataLayer` only after optional consent. No analytics vendor is loaded. Cookie settings lets visitors change their choice. Session storage retains the selected branch; local storage retains consent.

## Routes and language

Homepage, two location pages, service directory and six concept detail pages, team directory, Pride Club, journal with three draft articles, booking, contact, about, ritual, privacy and terms. Missing barber profiles return 404 until approved records are supplied. `/ar` demonstrates right-to-left layout with draft Arabic copy; full localized page parity is not yet approved or published.

All routes are noindex with an explicit X-Robots-Tag and robots disallow. The sitemap is empty. Production domains, canonical URLs, language alternates and factual structured data are deliberately withheld rather than fabricated. The release gate includes the remaining SEO implementation review.

## Release requirements

See `PROJECT_PLAN.md`, `data/release.json` and the release-check output. Supply verified branch facts, menus, booking links, reviews, staff records, licensed assets, membership terms, legal policies, Arabic translations and the production origin. Then replace preview copy and media, implement and validate verified schema/canonicals/hreflang, wire the approved analytics provider, and verify live conversion routing, accessibility and performance before launch.

Performance targets from the brief remain acceptance targets, not measured guarantees.
