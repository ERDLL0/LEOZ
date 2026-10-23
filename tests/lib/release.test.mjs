import { test } from 'node:test';
import assert from 'node:assert/strict';
import { releaseBlockers } from '../../lib/release.mjs';

const verifiedLocation = {
  id: 'palm-jumeirah',
  verified: true,
  verifiedAt: '2026-10-22',
  address: 'Address line, Dubai',
  phone: '+971400000000',
  hours: 'Mon–Sun 10:00–22:00',
  bookingUrl: 'https://book.example/palm',
  whatsappUrl: 'https://wa.example/palm',
  directionsUrl: 'https://maps.example/palm',
};

test('release gate reports missing branch facts and incomplete menu records', () => {
  const blockers = releaseBlockers({ release: {}, locations: [{ id: 'palm-jumeirah', verified: false }], services: [{ slug: 'haircut', verified: false }], barbers: [], reviews: [] });
  assert.ok(blockers.includes('palm-jumeirah: missing bookingUrl'));
  assert.ok(blockers.includes('haircut: approved menu details required'));
  assert.ok(blockers.includes('Approval required: originalMediaApproved'));
});

test('a verified location still requires a verification date', () => {
  const blockers = releaseBlockers({ locations: [{ ...verifiedLocation, verifiedAt: null }] });
  assert.ok(blockers.includes('palm-jumeirah: verification date required'));
});

test('published journal drafts block release until approved', () => {
  const blockers = releaseBlockers({ journal: [{ slug: 'draft-one', verified: false }] });
  assert.ok(blockers.includes('journal/draft-one: published draft requires approval, author and publication date'));
});

test('approved membership requires terms, benefits and an HTTPS destination', () => {
  const blockers = releaseBlockers({ release: { membershipApproved: true }, membership: { verified: true, terms: null, benefits: [], interestUrl: null } });
  assert.ok(blockers.includes('membership: approved terms required'));
  assert.ok(blockers.includes('membership: approved benefits required'));
  assert.ok(blockers.includes('membership: valid HTTPS interest destination required'));
});

test('approved media still requires per-asset rights and approval', () => {
  const blockers = releaseBlockers({ release: { originalMediaApproved: true }, media: [{ path: '/images/x.webp', rights: null, productionApproved: false }] });
  assert.ok(blockers.includes('media: /images/x.webp requires production approval'));
  assert.ok(blockers.includes('media: /images/x.webp requires confirmed rights'));
});

test('site configuration must match the approved release domain', () => {
  const blockers = releaseBlockers({ release: { domain: 'https://leoz.example' }, site: { verified: true, productionOrigin: 'https://other.example', legal: [], social: [] } });
  assert.ok(blockers.includes('site: production origin must match the approved release domain'));
});

test('a complete verified record set still requires the implementation review', () => {
  const blockers = releaseBlockers({
    release: {
      productionApproved: true,
      domain: 'https://leoz.example',
      originalMediaApproved: true,
      arabicApproved: true,
      legalApproved: true,
      membershipApproved: true,
      analyticsConfigured: true,
    },
    locations: [verifiedLocation],
    services: [{ slug: 'haircut', verified: true, verifiedAt: '2026-10-22', price: 150, duration: 45, branches: ['palm-jumeirah'] }],
    barbers: [{ id: 'barber-one', slug: 'barber-one', name: 'Barber One', branchIds: ['palm-jumeirah'], verified: true, verifiedAt: '2026-10-22' }],
    reviews: [{ id: 'review-one', verified: true }],
    site: { verified: true, productionOrigin: 'https://leoz.example', legal: [], social: [] },
    membership: { verified: true, terms: 'Terms', benefits: ['Priority booking'], interestUrl: 'https://leoz.example/club' },
    journal: [{ slug: 'article', verified: true, author: 'Author', publishedAt: '2026-01-01', body: ['Body'] }],
    media: [{ path: '/images/x.webp', rights: 'owner', productionApproved: true }],
  });
  assert.deepEqual(blockers, [
    'Release implementation review required: replace preview notices, approve editorial copy, publish verified schema/canonicals/hreflang and run live booking, accessibility and performance QA',
  ]);
});
