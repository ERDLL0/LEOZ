import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getDestination, isHttpsUrl, resolveBranchId } from '../../lib/booking.mjs';

test('current location page overrides a remembered branch for mobile utilities', () => {
  const locations = [{ id: 'palm-jumeirah' }, { id: 'difc' }];
  assert.equal(resolveBranchId('palm-jumeirah', 'difc', locations), 'palm-jumeirah');
  assert.equal(resolveBranchId('services', 'difc', locations), 'difc');
  assert.equal(resolveBranchId('', 'removed-location', locations), undefined);
});

test('unverified branches cannot send users to an unapproved booking destination', () => {
  assert.equal(getDestination({ verified: false, bookingUrl: 'https://example.com/unapproved' }, 'book'), null);
});

test('each selected branch keeps its own approved booking destination', () => {
  const palm = { verified: true, bookingUrl: 'https://example.com/palm' };
  const difc = { verified: true, bookingUrl: 'https://example.com/difc' };
  assert.equal(getDestination(palm, 'book'), 'https://example.com/palm');
  assert.equal(getDestination(difc, 'book'), 'https://example.com/difc');
});

test('contact actions cannot fall back to a booking URL or unsafe destination', () => {
  assert.equal(getDestination({ verified: true, bookingUrl: 'https://example.com/palm' }, 'whatsapp'), null);
  assert.equal(getDestination({ verified: true, directionsUrl: 'javascript:alert(1)' }, 'directions'), null);
  assert.equal(getDestination({ verified: true, bookingUrl: 'http://example.com' }, 'book'), null);
});

test('only meaningful HTTPS destinations pass the shared URL guard', () => {
  assert.equal(isHttpsUrl('https://leoz.example/book'), true);
  assert.equal(isHttpsUrl('http://leoz.example/book'), false);
  assert.equal(isHttpsUrl('javascript:alert(1)'), false);
  assert.equal(isHttpsUrl(null), false);
  assert.equal(isHttpsUrl(''), false);
});
