import { test } from 'node:test';
import assert from 'node:assert/strict';
import { absoluteUrl, canonicalUrl, localizedUrls } from '../../lib/seo.mjs';
import { articleSchema, localBusinessSchema, pageSchema, personSchema, serviceSchema } from '../../lib/schema.mjs';

const site = { brandName: 'Leoz Gents Salon', productionOrigin: 'https://leoz.example' };
const verifiedLocation = {
  id: 'difc',
  name: 'DIFC',
  verified: true,
  verifiedAt: '2026-10-22',
  address: 'Gate Avenue, DIFC',
  phone: '+971 4 000 0000',
  hours: 'Mon–Sun 10:00–22:00',
  image: '/images/difc.webp',
};

test('URL helpers normalize origins, paths and locale prefixes', () => {
  assert.equal(absoluteUrl('https://leoz.example/', '/images/x.webp'), 'https://leoz.example/images/x.webp');
  assert.equal(absoluteUrl(null, 'x'), null);
  assert.equal(absoluteUrl('http://leoz.example', 'x'), null);
  assert.equal(canonicalUrl('https://leoz.example/', ''), 'https://leoz.example');
  assert.equal(canonicalUrl('https://leoz.example', 'difc'), 'https://leoz.example/difc');
  assert.deepEqual(localizedUrls('https://leoz.example', 'difc'), { en: 'https://leoz.example/difc', ar: 'https://leoz.example/ar/difc' });
  assert.deepEqual(localizedUrls('https://leoz.example', 'ar/difc'), { en: 'https://leoz.example/difc', ar: 'https://leoz.example/ar/difc' });
  assert.deepEqual(localizedUrls('https://leoz.example', 'ar'), { en: 'https://leoz.example', ar: 'https://leoz.example/ar' });
});

test('structured data is withheld until records are verified', () => {
  assert.equal(localBusinessSchema({ ...verifiedLocation, verified: false }, site), null);
  assert.equal(serviceSchema({ slug: 'haircut', name: 'The Cut', description: 'Shape.', verified: false }, site), null);
  assert.equal(personSchema({ slug: 'barber', name: 'Barber', biography: 'Bio', verified: false }, site), null);
  assert.equal(articleSchema({ slug: 'article', title: 'Title', author: 'Author', publishedAt: '2026-01-01', verified: false }, site), null);
});

test('structured data is withheld without an approved production origin', () => {
  assert.equal(localBusinessSchema(verifiedLocation, { productionOrigin: null }), null);
  assert.equal(articleSchema({ slug: 'article', title: 'Title', author: 'Author', publishedAt: '2026-01-01', verified: true }, { productionOrigin: null }), null);
});

test('verified records produce honest schema without invented offers', () => {
  const schema = localBusinessSchema(verifiedLocation, site);
  assert.equal(schema['@type'], 'HairSalon');
  assert.equal(schema.telephone, '+971 4 000 0000');
  assert.equal(schema.address, 'Gate Avenue, DIFC');
  assert.equal(schema.url, 'https://leoz.example/difc');
  assert.equal(schema.image, 'https://leoz.example/images/difc.webp');
  assert.equal(schema.openingHours, 'Mon–Sun 10:00–22:00');
  const service = serviceSchema({ slug: 'haircut', name: 'The Cut', description: 'Shape.', verified: true }, site);
  assert.equal(service.url, 'https://leoz.example/services/haircut');
  assert.equal('offers' in service, false);
});

test('pageSchema routes only verified record types', () => {
  const input = {
    site,
    locations: [verifiedLocation],
    services: [{ slug: 'haircut', name: 'The Cut', description: 'Shape.', verified: true }],
    barbers: [{ slug: 'barber-one', name: 'Barber One', biography: 'Bio', verified: true }],
    journal: [{ slug: 'article', title: 'Title', author: 'Author', publishedAt: '2026-01-01', image: '/images/x.webp', verified: true }],
  };
  assert.equal(pageSchema({ ...input, path: 'difc' })['@type'], 'HairSalon');
  assert.equal(pageSchema({ ...input, path: 'services/haircut' })['@type'], 'Service');
  assert.equal(pageSchema({ ...input, path: 'barbers/barber-one' })['@type'], 'Person');
  assert.equal(pageSchema({ ...input, path: 'journal/article' })['@type'], 'Article');
  assert.equal(pageSchema({ ...input, path: 'journal/missing' }), null);
  assert.equal(pageSchema({ ...input, path: 'privacy' }), null);
  assert.equal(pageSchema({ ...input, path: '' }), null);
});
