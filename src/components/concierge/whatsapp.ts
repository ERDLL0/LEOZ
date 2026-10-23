import type { Locale } from '@/i18n/locale';

export function getWhatsAppPhone(branchId: 'palm-jumeirah' | 'difc'): string | null {
  const phone =
    branchId === 'palm-jumeirah'
      ? import.meta.env.VITE_WHATSAPP_PALM_E164
      : import.meta.env.VITE_WHATSAPP_DIFC_E164;

  if (!phone || typeof phone !== 'string') {
    return null;
  }
  const normalized = phone.trim();
  return /^\+[1-9]\d{7,14}$/.test(normalized) ? normalized : null;
}

export function buildWhatsAppMessage(
  locale: Locale,
  locationName: string,
  userIntent: string,
): string {
  if (locale === 'tr') {
    return `Merhaba LEOZ, web siteniz üzerinden ulaşıyorum.\nŞube: ${locationName}\nDil: Türkçe\nTalebim: ${userIntent}`;
  }
  if (locale === 'ar') {
    return `مرحباً ليو، أتواصل معكم عبر الموقع الإلكتروني.\nالفرع: ${locationName}\nاللغة: العربية\nالطلب: ${userIntent}`;
  }
  return `Hello LEOZ, I’m contacting you from the website.\nLocation: ${locationName}\nLanguage: English\nRequest: ${userIntent}`;
}

export function buildWhatsAppUrl(phoneE164: string, message: string): string {
  const normalized = phoneE164.trim();
  if (!/^\+[1-9]\d{7,14}$/.test(normalized)) {
    throw new Error('A valid E.164 WhatsApp number is required.');
  }
  const digitsOnly = normalized.slice(1);
  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;
}
