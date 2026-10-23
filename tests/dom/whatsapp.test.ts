import { describe, expect, it } from 'vitest';
import { buildWhatsAppUrl } from '@/components/concierge/whatsapp';

describe('WhatsApp URL validation', () => {
  it('builds a wa.me URL only from a valid E.164 number', () => {
    expect(buildWhatsAppUrl('+971501234567', 'Hello LEOZ')).toBe(
      'https://wa.me/971501234567?text=Hello%20LEOZ',
    );
  });

  it.each(['VERIFY_REQUIRED', 'abc', '97150123', '+0123456789', '+971 50 123 4567'])(
    'rejects an invalid or ambiguous phone value: %s',
    (phone) => {
      expect(() => buildWhatsAppUrl(phone, 'Hello')).toThrow(/E\.164/);
    },
  );
});
