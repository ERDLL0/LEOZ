# Leoz Gents Salon — pre-build plan

## Evidence and status

Reviewed the supplied premium website master brief and “B — Modern Gentleman’s Club” visual reference. The project directory is empty: no existing implementation, approved business data, original photography, or existing-site evidence was supplied.

The user approved direction B — Modern Gentleman’s Club. A responsive staging implementation now exists. The reference’s sample business details are not independently approved source-of-truth data; production remains blocked.

## Factual blockers

| ID | Missing approval or evidence | Release consequence |
| --- | --- | --- |
| B01 | Exact branch addresses, telephone and WhatsApp numbers, hours, map destinations, arrival information | No actionable contact or directions links until verified |
| B02 | Branch-specific booking URLs | Booking cannot be released or tested end to end |
| B03 | Service menu, branch availability, durations and prices | Reference prices and service names remain illustrative; staging placeholders required |
| B04 | Barber names, branch assignments, portraits and biographies | No invented profiles or staff claims |
| B05 | Review sources, quotations, ratings and counts per branch | No reference 5.0 rating or testimonial published |
| B06 | Approved original logo files, photography and video | Reference imagery is design evidence, not production photography |
| B07 | Pride Club terms and benefits | No promises of priority booking, offers or member events |
| B08 | Approved Arabic copy, legal text, production domain and analytics configuration | Arabic publication, legal pages, canonical URLs and live analytics remain blocked |

The canonical name and the two location identities are supplied by the brief. All other operational facts require explicit source records. The lack of current-site evidence prevents a credible audit of existing performance, SEO or booking behavior.

### Reference inconsistencies to resolve

- The reference shows prices, durations, staff names, a rating and a testimonial without supporting records. Treat all as unverified.
- Its extensive ivory sections differ from the brief’s predominantly dark reading surfaces. Direction B can retain ivory for the service and team sections while keeping the overall experience dark.
- Its hero says “A modern gentleman’s club”; the brief proposes “Enter The Den.” Use the former as the visual headline and the latter as a secondary experience label, with Leoz Gents Salon visible throughout.
- The reference omits the journal and Arabic navigation. Both belong in the final architecture.
- “Watch film” requires approved footage; omit the control until a real video exists.

## Sitemap

```text
/
/palm-jumeirah/
/difc/
/services/
/services/[slug]/
/barbers/
/barbers/[slug]/
/pride-club/
/journal/
/journal/[slug]/
/book/
/contact/
/privacy/
/terms/
/ar/… (localized equivalents when approved translations exist)
```

Proposed service slugs from the brief: haircut, beard, shave, facial, manicure-pedicure, grooming-packages. Publish only those supported by the approved menu. Do not create empty indexable staff or service pages.

## Content model

Every fact-bearing record includes verification status, source reference and last verification date. Draft records never generate production claims or schema.

| Source | Fields |
| --- | --- |
| `data/locations.ts` | ID, localized name and unique introduction, address, phone, WhatsApp, hours, coordinates, map URL, booking URL, approved arrival information, media, verification |
| `data/services.json` | ID, slug, localized name and benefit, branch offers containing price/currency/duration/booking URL, media, verification |
| `data/barbers.json` | ID, slug, name, branch IDs, approved specialties/languages/biography, portrait, booking URL, verification |
| `data/reviews.json` | ID, branch ID, approved quote and attribution, source URL, source date, verification |
| `data/site.ts` | Canonical brand, production origin, localized navigation, legal links, approved social links |
| `data/membership.json` | Approved program description, benefits, terms and interest destination |
| `data/journal.json` | Slug, localized article, author, publication date, media and metadata |
| `data/media.json` | Asset paths, responsive crops, alt text, rights and production approval |

Missing values are null, not fabricated defaults. Staging identifies missing fields explicitly. A production validation command must fail for missing required branch facts, booking destinations, unapproved media and published incomplete records.

## Three visual directions

### A — Night & Stone

- Thesis: a contemporary grooming house with architectural restraint.
- Palette: dominant obsidian and carbon; limestone panels and sparse brass rules.
- Typography: Cormorant Garamond headlines with Manrope interface text; licensed equivalents optional.
- Hero: “Enter The Den.” beside a tightly cropped real grooming portrait, with clear location choices.
- Motion: short fades and restrained image reveals; static reduced-motion presentation.
- Palm: warm stone, natural evening light and tactile details. DIFC: vertical architecture, sharper crops and cooler shadows.

### B — Modern Gentleman’s Club — recommended

- Thesis: the supplied editorial reference, expressed through intimate interiors, craftsmanship and generous typography.
- Palette: obsidian framing, warm ivory service/team sections and aged-brass buttons; no decorative gold gradients.
- Typography: Cormorant Garamond display with Manrope labels and body copy, pending licensed font availability.
- Hero: “A modern gentleman’s club.” over approved full-bleed Leoz photography. Supporting copy identifies men’s grooming, Palm Jumeirah and DIFC. “Claim Your Chair” opens branch selection.
- Motion: quiet cross-fades, subtle hover treatment and optional approved silent footage. All content remains visible without animation.
- Palm: relaxed warmth and broader compositions. DIFC: precise framing, deep contrast and architectural rhythm.
- Why: closest to the supplied reference, with a clear path to distinctive location storytelling and compact mobile booking.

### C — Precision After Dark

- Thesis: a modern editorial identity centered on people, details and deliberate precision.
- Palette: carbon and ivory, with brass restricted to selection states and primary actions.
- Typography: expressive serif headline fragments paired with a stronger Manrope grid and numeric service information.
- Hero: an approved final-look portrait with “Rule Your Look.” and two immediately visible branch actions.
- Motion: minimal directional reveals and instant navigation feedback; no parallax requirement.
- Palm: softer portrait light and spacious layouts. DIFC: close crops, structured alignment and concise appointment-oriented copy.

## Mobile wireframe — 390 px first

1. Compact brand header, menu toggle and booking action.
2. Cinematic hero with short headline, location names, primary booking action and location anchor.
3. Trust strip with verified facts only; omit unsupported ratings.
4. Stacked Palm and DIFC cards, each with distinct copy and branch-specific actions.
5. Up to four signature services, showing approved branch prices and duration.
6. Consult → Craft → Finish ritual story.
7. Portrait-led team section using approved staff records.
8. Branch-attributed verified reviews.
9. Pride Club teaser based on approved terms.
10. Three approved journal articles.
11. Branch-aware footer, language navigation and legal controls.

Sticky mobile utilities: Book, WhatsApp, Directions. Before a branch is selected, each opens an accessible branch chooser. Once selected, utilities retain that context. Reserve bottom spacing plus the device safe area.

Desktop uses a transparent-to-carbon header, a wide hero, paired location cards, a four-column services row and a portrait grid.

### Location wireframes

Palm: warm hero → direct booking → verified arrival/address → approved service menu → Palm staff → Palm reviews → genuine local FAQs → contact utilities.

DIFC: architectural hero → direct booking → approved service menu → verified access details → DIFC staff → DIFC reviews → genuine local FAQs → contact utilities. Avoid promises about speed or after-hours availability without supporting data.

## Implementation and validation

Use Next.js App Router, TypeScript and token-based CSS. Separate localized content from layouts, use logical CSS properties, and set document direction per locale. Do not publish untranslated Arabic pages or hreflang links to missing translations.

Booking: global CTA → choose branch → approved booking destination, two decisive interactions. Service and location actions preserve their branch context; no mandatory lead form.

Analytics: centralized typed events for book_click, book_location_selected, service_book_click, whatsapp_click, call_click, directions_click, barber_profile_view, pride_club_interest and language_switch. Add branch/service context without personal information. External analytics require the configured consent state.

SEO: unique metadata per location, production canonicals, published-route sitemap, visible breadcrumbs and verified schema only. Staging stays noindex. No fabricated aggregate ratings, opening hours or FAQs.

QA: validate source records and production blockers; exercise branch routing, all navigation and utilities, consent/event behavior, keyboard/focus, menu and dialog semantics, 390 px layout, RTL, reduced motion and safe-area spacing. Measure mobile performance and layout shift with optimized approved imagery. Performance targets are acceptance criteria, not results already achieved.

## Next decision

Direction B is approved and implemented for staging. Review the local preview and supply the verified business facts and original media listed above. Production release remains blocked. See README.md and design-qa.md for implementation status and validation evidence.
