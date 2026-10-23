import type { Locale } from '@/i18n/locale';
import { getLocation, getReviewSnapshot, type ReviewSnapshot } from '@/data';
import { dictionaries } from '@/locales';
import type { ConciergeIntent, ConciergeQuickAction } from './types';

const palmReviews = getReviewSnapshot('palm-jumeirah');
const difcReviews = getReviewSnapshot('difc');

function addressFor(branchId: 'palm-jumeirah' | 'difc', locale: Locale): string {
  const location = getLocation(branchId);
  return location?.address ?? dictionaries[locale].locations.labels.addressPending;
}

function formatSnapshotLine(snapshot: ReviewSnapshot, locale: Locale): string {
  const count = snapshot.reviewCount.toLocaleString(locale);
  const label = locale === 'tr' ? 'Google yorumu' : locale === 'ar' ? 'تقييماً على Google' : 'Google reviews';
  return `${snapshot.branchName}: ${snapshot.rating.toFixed(1)} ★ (${count} ${label})`;
}

export function getQuickActions(locale: Locale): ConciergeQuickAction[] {
  if (locale === 'tr') {
    return [
      { id: 'book', label: 'Randevu Al', intent: 'book' },
      { id: 'palm', label: 'Palm Jumeirah', intent: 'palm' },
      { id: 'difc', label: 'DIFC / Sky Gardens', intent: 'difc' },
      { id: 'services', label: 'Hizmetler', intent: 'services' },
      { id: 'reviews', label: 'Google Yorumları', intent: 'reviews' },
      { id: 'whatsapp', label: 'WhatsApp ile İletişim', intent: 'whatsapp' },
    ];
  }

  if (locale === 'ar') {
    return [
      { id: 'book', label: 'حجز موعد', intent: 'book' },
      { id: 'palm', label: 'نخلة جميرا', intent: 'palm' },
      { id: 'difc', label: 'مركز دبي المالي', intent: 'difc' },
      { id: 'services', label: 'الخدمات المميزة', intent: 'services' },
      { id: 'reviews', label: 'تقييمات Google', intent: 'reviews' },
      { id: 'whatsapp', label: 'محادثة عبر WhatsApp', intent: 'whatsapp' },
    ];
  }

  return [
    { id: 'book', label: 'Book an appointment', intent: 'book' },
    { id: 'palm', label: 'Palm Jumeirah', intent: 'palm' },
    { id: 'difc', label: 'DIFC / Sky Gardens', intent: 'difc' },
    { id: 'services', label: 'Signature Services', intent: 'services' },
    { id: 'reviews', label: 'Google Reviews', intent: 'reviews' },
    { id: 'whatsapp', label: 'Talk on WhatsApp', intent: 'whatsapp' },
  ];
}

export function getVerifiedAnswer(
  intent: ConciergeIntent,
  locale: Locale,
): { text: string; escalate?: boolean } {
  switch (intent) {
    case 'palm':
      if (locale === 'tr') {
        return {
          text: `LEOZ Palm Jumeirah: ${addressFor('palm-jumeirah', locale)} Google aggregate snapshot: ${formatSnapshotLine(palmReviews, locale)}.`,
        };
      }
      if (locale === 'ar') {
        return {
          text: `ليو نخلة جميرا: ${addressFor('palm-jumeirah', locale)} لقطة إجمالية لتقييم Google: ${formatSnapshotLine(palmReviews, locale)}.`,
        };
      }
      return {
        text: `LEOZ Palm Jumeirah: ${addressFor('palm-jumeirah', locale)} Aggregate snapshot: ${formatSnapshotLine(palmReviews, locale)}.`,
      };

    case 'difc':
      if (locale === 'tr') {
        return {
          text: `LEOZ DIFC: ${addressFor('difc', locale)} Google aggregate snapshot: ${formatSnapshotLine(difcReviews, locale)}.`,
        };
      }
      if (locale === 'ar') {
        return {
          text: `ليو مركز دبي المالي: ${addressFor('difc', locale)} لقطة إجمالية لتقييم Google: ${formatSnapshotLine(difcReviews, locale)}.`,
        };
      }
      return {
        text: `LEOZ DIFC: ${addressFor('difc', locale)} Aggregate snapshot: ${formatSnapshotLine(difcReviews, locale)}.`,
      };

    case 'reviews':
      if (locale === 'tr') {
        return {
          text: `Google aggregate puan görünümü (entegrasyon bağlanana kadar kayıtlı snapshot):\n• ${formatSnapshotLine(palmReviews, locale)}\n• ${formatSnapshotLine(difcReviews, locale)}\nBireysel yorum metinleri henüz yayınlanmıyor.`,
        };
      }
      if (locale === 'ar') {
        return {
          text: `لقطة إجمالية لتقييمات Google محفوظة إلى حين ربط التكامل:\n• ${formatSnapshotLine(palmReviews, locale)}\n• ${formatSnapshotLine(difcReviews, locale)}\nلا تُعرض نصوص تقييمات فردية حالياً.`,
        };
      }
      return {
        text: `Google aggregate rating snapshot, stored until the live integration is connected:\n• ${formatSnapshotLine(palmReviews, locale)}\n• ${formatSnapshotLine(difcReviews, locale)}\nNo individual review copy is currently published.`,
      };

    case 'services':
      if (locale === 'tr') {
        return {
          text: 'İmza Hizmetlerimiz: The Cut (Saç Kesimi), The Beard (Sakal Şekillendirme), The Reset ve The Grooming Ritual. Detaylar ve rezervasyon için WhatsApp üzerinden şubemizle iletişime geçebilirsiniz.',
          escalate: true,
        };
      }
      if (locale === 'ar') {
        return {
          text: 'خدماتنا المميّزة: قصة ليو (The Cut)، تهذيب اللحية (The Beard)، تجديد النضارة، وطقس ليو المتكامل. للاستفسار وحجز موعدك، يسعدنا تواصلك معنا عبر WhatsApp.',
          escalate: true,
        };
      }
      return {
        text: 'Signature Services: The Cut, The Beard, The Reset, and The Grooming Ritual. For appointments and personalized recommendations, connect with our branch concierge on WhatsApp.',
        escalate: true,
      };

    case 'book':
    case 'whatsapp':
    default:
      if (locale === 'tr') {
        return {
          text: 'Randevu uygunluğu ve özel talepleriniz için lütfen şubenizi seçin. Sizi doğrudan WhatsApp concierge hattımıza aktaralım.',
          escalate: true,
        };
      }
      if (locale === 'ar') {
        return {
          text: 'لتنسيق موعدك أو الإجابة عن استفساراتك، يرجى اختيار الفرع وسنقوم بتحويلك مباشرة إلى خدمة كونسيرج WhatsApp.',
          escalate: true,
        };
      }
      return {
        text: 'For appointment availability, personalized service details and custom bookings, please choose your preferred location to connect on WhatsApp.',
        escalate: true,
      };
  }
}
