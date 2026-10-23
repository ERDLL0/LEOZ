# LEOZ Gents Salon — Senior Full-Stack Audit

Audit date: 2026-10-23  
Status: **NOT READY FOR PRODUCTION**

## Executive summary

The responsive navigation blockers, locale-switch crash, 320px menu collision,
RTL dialog spacing, and the main Framer Motion primitives have been repaired.
TypeScript, ESLint, tests, and the Vite build pass.

Production remains blocked by unverified business data, missing conversion
destinations, incomplete SEO/release configuration, accessibility gaps in
custom dialogs, missing backend integrations, and incomplete automated browser
QA.

## P0 — Production blockers

1. **Business data is not a single source of truth.** Location and aggregate
   Google data are duplicated between data files and concierge intent copy.
2. **Prices are not sufficiently verified.** Service records lack an approved
   verification date and branch scope.
3. **Conversion destinations are missing.** Phone, booking, WhatsApp, and
   directions targets are unavailable for both branches.
4. **Production release is intentionally locked.** Release approvals are false,
   and the Vite production guard blocks deployment.
5. **Production backend integrations are absent.** There is no Google rating
   proxy/cache, booking API, concierge API, form backend, rate limiting, error
   monitoring, or production analytics provider.
6. **SEO publication is disabled.** The site is noindex/nofollow and lacks an
   approved origin, sitemap, canonical URLs, complete hreflang, Open Graph, and
   runtime schema integration.
7. **Unverified barber identities must not ship.** Placeholder staff records
   should be anonymized or excluded from production artifacts.

## P1 — High priority

1. Complete focus trap, initial focus, focus return, scroll lock, and localized
   accessible labels for the concierge panel.
2. Replace the hero film overlay with a tested dialog primitive supporting
   Escape, focus management, and background isolation.
3. Add Arabic intent detection and move all concierge copy into typed locale
   dictionaries.
4. Validate WhatsApp configuration as strict E.164 before enabling actions.
5. Add CSP, HSTS, Referrer-Policy, X-Content-Type-Options, Permissions-Policy,
   and framing protection.
6. Enable React Hooks ESLint rules and exhaustive dependency checks.
7. Add route-level lazy loading. The current main JavaScript bundle is over the
   Vite 500kB warning threshold.
8. Import only required Latin and Arabic font subsets and weights.
9. Restore the missing `scripts/qa/capture.mjs` browser QA command.
10. Add Playwright browser tests, axe accessibility checks, and Lighthouse CI.
11. Add CI, preview smoke tests, health checks, monitoring, and a rollback runbook.

## P2 — Technical debt

1. Rewrite the README for the active Vite + React stack.
2. Add Turkish and x-default output to the SEO helper.
3. Prevent the first-load Arabic LTR/font flash.
4. Complete the desktop locale selector keyboard interaction model.
5. Connect schema helpers to rendered `application/ld+json` output.
6. Pin Node and package-manager versions and document the environment matrix.
7. Add real-browser responsive tests because CSS is disabled in DOM tests.

## Motion decision

Framer Motion is the single animation engine. Do not add GSAP, Lenis, AOS, or a
second reveal library unless a future approved interaction cannot be implemented
with Framer Motion.

The current motion contract is:

- calm vertical route transitions;
- one-time viewport reveals;
- restrained image fade/scale;
- limited stagger groups;
- no photography mirroring;
- no scroll hijacking;
- complete reduced-motion fallback.

## Recommended packages

Production dependencies:

- No additional animation dependency recommended.

Installed development-only QA dependencies:

- `@playwright/test`
- `@axe-core/playwright`
- `lighthouse`
- `@lhci/cli`

The packages are now installed. The next implementation step is to connect them
to browser tests and CI scripts.

`npm audit --omit=dev` reports zero production vulnerabilities. The complete
development dependency tree currently reports 14 transitive findings introduced
through QA tooling (2 low, 1 moderate, 11 high). Do not apply a blind
`npm audit fix --force`; review or replace the affected QA dependency chain while
adding the CI configuration.

## Current verification

- TypeScript: PASS
- ESLint: PASS
- Tests: PASS (24/24)
- Vite build: PASS
- Responsive 1024px navigation: PASS
- Responsive 320px menu: PASS
- Arabic route switching: PASS
- Release gate: FAIL by design
- Production deployment: not attempted

## Recommended implementation order

1. Resolve and approve business data and conversion destinations.
2. Centralize location/review data and remove duplicate concierge facts.
3. Complete concierge and hero dialog accessibility.
4. Complete Arabic concierge behavior and dictionary coverage.
5. Add route splitting and font optimization.
6. Add Playwright, axe, screenshot matrix, and Lighthouse CI.
7. Implement production SEO, schema, and security headers.
8. Add Google rating proxy/cache, monitoring, analytics, and operational runbooks.
9. Complete live CTA and multilingual release QA.
10. Obtain explicit approval before production deployment.
