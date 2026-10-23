# LEOZ Gents Salon

A modern, multilingual design preview for LEOZ Gents Salon — a gentlemen's grooming club in Dubai with two locations: Palm Jumeirah and DIFC / Sky Gardens.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion + GSAP (scroll animations)
- React Router
- Lucide React (icons)

## Project Structure

```
src/
  components/   # Reusable UI components (buttons, cards, layout)
  home/         # Home page sections (Hero, Reviews, Barbers, etc.)
  layout/       # Navbar, Footer, MobileMenu, SiteLayout
  concierge/    # LEOZ Concierge chat panel
  motion/       # GSAP and Framer Motion animations
  locales/      # i18n dictionaries (en, tr, ar)
  lib/          # Booking, site actions, analytics
  pages/        # Route pages (Home, Services, Barbers, etc.)
data/           # JSON data (locations, services, reviews, barbers)
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm test` | Run all tests |

## i18n

The site supports three languages: English (`en`), Turkish (`tr`), and Arabic (`ar`). Locale dictionaries live in `src/locales/`.

## Environment

Copy `.env.example` to `.env` and fill in your WhatsApp numbers (E.164 format) before connecting booking actions:

```
VITE_WHATSAPP_PALM_E164=+905550000000
VITE_WHATSAPP_DIFC_E164=+905550000000
LEOZ_RELEASE=staging
```

## Status

This is a design preview / staging build. Business details (addresses, phone numbers, booking URLs, opening hours) are not yet verified and remain `null` until approved by the business owner. Do not deploy to production until release approval is granted.
