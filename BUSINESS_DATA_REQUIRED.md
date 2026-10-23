# Business data required before production

Release status: **NOT READY**. Direction B is approved. Temporary artwork and draft content are authorized for staging only. A staging URL is not production approval.

Provide the source URL or owner-approved document, approver and verification date for every operational fact. Keep missing values `null`, empty arrays or `verified: false` until approved. Do not infer details from the visual reference, generated images, nearby businesses or generic menus.

## Palm Jumeirah — `data/locations.json`

- [ ] Exact trading/location name and complete address, building, unit and map pin.
- [ ] Telephone number and approved WhatsApp number/deep link.
- [ ] Weekly opening hours, timezone and exceptions/holiday policy.
- [ ] Approved branch-specific booking destination and provider.
- [ ] Approved directions URL.
- [ ] Arrival, access and parking information, or confirmation to omit it.
- [ ] Confirmation of services, staff and reviews belonging to this branch.

## DIFC / Sky Gardens — `data/locations.json`

- [ ] Exact trading/location name and complete address, building, unit and map pin.
- [ ] Telephone number and approved WhatsApp number/deep link.
- [ ] Weekly opening hours, timezone and exceptions/holiday policy.
- [ ] Approved branch-specific booking destination and provider.
- [ ] Approved directions URL.
- [ ] Arrival, access and parking information, or confirmation to omit it.
- [ ] Confirmation of services, staff and reviews belonging to this branch.

## Services — `data/services.json`

- [ ] Approve or replace every illustrative service name and category.
- [ ] Current service list, descriptions, inclusions and exclusions per branch.
- [ ] Prices in the approved currency, tax treatment and any valid starting-price qualification.
- [ ] Appointment durations and availability per branch.
- [ ] Approved service-specific booking URLs if available; otherwise use approved branch booking.
- [ ] Remove unsupported services rather than treating concept entries as business facts.

## Team — `data/barbers.json`

- [ ] Approved names, profile slugs and branch assignments.
- [ ] Original portraits with publication permission.
- [ ] Verified specialties, languages and biography copy.
- [ ] Booking destinations and schedules only if supplied and current.
- [ ] Certifications or awards only with evidence, scope and approval; otherwise omit.

## Reviews — `data/reviews.json`

- [ ] Approved review sources per branch.
- [ ] Exact approved quotations, author attribution, source URL and date.
- [ ] Rating and review count from a dated, attributable source if they are to be shown.
- [ ] Permission/terms for using review text and any client imagery.
- [ ] Do not combine branch counts or invent a global score.

## Brand and photography

- [ ] Official logo/crest files and usage permissions.
- [ ] Real Leoz exterior/interior, staff and service photographs, with approved mobile/desktop crops.
- [ ] Client/model consent and asset rights where needed.
- [ ] Approved hero/ritual video, poster and captions if video is supplied; otherwise omit video controls.
- [ ] Replace or explicitly resolve all eight temporary generated assets in `public/images/` before production.
- [ ] Confirm licensed fonts if replacing the current open-source Cormorant Garamond / Manrope pairing.

## Pride Club, editorial and legal

- [ ] Membership eligibility, terms, fees, actual benefits and approved enquiry/signup destination.
- [ ] Approve the three journal drafts, author attribution and publication dates, or keep them unpublished.
- [ ] Business-approved privacy, cookies and terms policies.
- [ ] Legal entity/canonical business identity for policy and schema use.
- [ ] Approved social profiles and contact destination.

## Arabic and production configuration

- [ ] Reviewed Arabic translations for the full route set, navigation, dialogs, policies and branch facts. `/ar` is currently a draft RTL preview, not complete localization.
- [ ] Final production domain, preferred canonical origin and language URL structure.
- [ ] Analytics provider/account, consent rules and approved event destinations.
- [ ] Production release approval after verified schema, canonicals, hreflang and sitemap are implemented and checked.
- [ ] Live tests of the correct branch booking, call, WhatsApp and directions destinations.
- [ ] Final mobile performance/accessibility acceptance with the approved assets.

## Separate final authorization

- [ ] Explicit permission to deploy to the production environment/domain. This has **not** been granted.

The preview stays noindex; do not remove staging robots protection merely to raise a Lighthouse SEO score. Do not mark `data/release.json` approved until both its evidence and the release implementation review are complete.
