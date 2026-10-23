# Direction B — staging design QA

final result: passed

This result covers the responsive design preview and its local interactions. It is not production acceptance, exact pixel reconstruction, an accessibility certification or a measured Core Web Vitals result.

## Evidence and comparison scope

- Source visual truth: `/Users/mustafaerdal/Downloads/Leoz Gents Salon Marka Rehberi.png`, 941 × 1672 pixels. This is a composite brand board with desktop and mobile mockups, not a full-resolution browser capture with a known CSS viewport.
- Implementation: `http://localhost:3000/`, rendered and tested in Chrome. The in-app browser was unavailable.
- Desktop viewport: 1440 × 1000 CSS pixels. `qa/desktop-hero.png` is 1440 × 1000; `qa/desktop-home.png` is 1440 × 5423.
- Mobile viewport: 390 × 844 CSS pixels. `qa/mobile-hero.png` is 390 × 844; `qa/mobile-home.png` is 390 × 6677.
- Captures are one output pixel per CSS pixel. No density rescaling was needed for implementation screenshots. The source board was compared by its desktop/mobile content regions, excluding phone frames and guide annotations. Its unknown design viewport prevents literal pixel-error assertions.
- Source and implementation images were opened together in the same comparison calls for full-page hierarchy and focused mobile hero review. Focused desktop location, service, ritual and club sections were inspected in browser screenshots.
- Additional evidence: `qa/mobile-booking.png`, `qa/mobile-services.png`, `qa/mobile-rtl.png`.

## Required fidelity surfaces

1. Typography: locally hosted Cormorant Garamond and Manrope retain the editorial serif / restrained sans pairing. The hero fits at 390 px without horizontal overflow. Licensed Canela was not supplied; the fallback is intentional. Sentence case and the italic final word are a direction-B adaptation, not a claim of literal source reproduction.
2. Spacing and layout: full-image hero, ivory utility row, paired desktop location cards, ivory four-card services section, ritual banner and dark club/footer structure follow the reference. Mobile stacks locations and changes services into image-led rows. Desktop and mobile have no horizontal overflow in checked states. The journal and sticky mobile utilities implement the additional master-brief requirements.
3. Colors: obsidian, ivory, stone and aged brass map directly to the master-brief tokens. Brass remains an accent. Light sections use dark text; primary buttons use dark text on brass. Image-backed copy was visually checked for readability; a comprehensive WCAG audit remains a launch task.
4. Imagery: eight local optimized WebP concept assets maintain the amber interior / warm Palm / blue architectural DIFC distinction. Images load without broken-image states. All imagery, including the temporary lion crest, requires replacement or explicit approval before production. Real staff portraits and video are intentionally absent.
5. Copy: branch identities come from the brief. Unverified prices, ratings, testimonials, staff identities and club benefits were not copied from the reference. Missing records are disclosed in staging. Team and social-proof areas use an editorial introduction and brand statement instead of fabricated profiles or reviews.

## Comparison history and fixes

- Initial mobile inspection: Chrome automatically translated the English copy and altered document language. Added translation protection to the document and scoped language to the site container. Subsequent English screenshots show the intended copy; the final console-error check returned no errors. A prior translation-induced hydration warning was observed during development and cleared after reload.
- Component review: moved nested component definitions to stable module scope and shared actions through context. The Beard filter retains focus when updated; closing the booking dialog with Escape restores focus to its trigger.
- Booking inspection: selecting a branch removed the focused selection button. Focus now moves to the dialog heading on every booking-state change. Verified in the DIFC directions state.
- Touch target review: increased compact header, filter and service-booking action sizes. Re-captured the 390 px homepage after the changes.
- Initial full-page screenshots contained not-yet-loaded lazy images and a fixed header at the current scroll position. Scrolled the page to load imagery and re-captured from the top. Final full-page evidence shows the complete imagery.

## Interaction checks

- Header booking → choose DIFC → explicit unavailable booking state, with no external navigation or appointment submission.
- Escape closes the dialog and restores trigger focus.
- Mobile menu opens, closes and navigates to Services.
- Beard filter shows the two matching concepts and preserves its pressed state and keyboard focus.
- Mobile Directions remembers the previously selected DIFC branch after navigation.
- Cookie settings opens; Essential only closes it without enabling a vendor.
- Pride Club interest action shows an honest unavailable-list notice and collects no details.
- Arabic preview sets RTL and Arabic language; checked at 390 px with no overflow. This is architecture and draft-copy verification, not full Arabic localization.
- Desktop width and scrollWidth both 1440; mobile width and scrollWidth both 390. Checked loaded images have zero broken resources.
- Final checked browser console errors: none.

## Code validation

- Optimized Next.js build passed, including TypeScript validation and static route generation.
- Separate typecheck passed.
- Four automated tests passed: unverified destination blocking, branch-specific booking destinations, unsafe/missing contact destination rejection and incomplete-release record detection.
- Production gate failed as expected with the precise missing approvals and facts. Production environment deployment is also explicitly blocked in Next configuration.

## Remaining release work

Approved business data, original media, actual booking/contact routing, real staff profiles/reviews, complete Arabic localization, legal/membership terms, production canonical/hreflang/schema/sitemap, analytics integration and performance/accessibility measurement remain required. Their absence is disclosed and enforced; they are not hidden by this staging QA result.

## Follow-up polish

- Replace the temporary crest with the official vector logo and tune imagery crops using the real location photography.
- Reassess type sizes and section density with final service descriptions and staff content.
- Measure Lighthouse and real-device performance against the supplied budgets before launch.
