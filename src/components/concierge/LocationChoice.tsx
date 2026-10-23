import type { Locale } from '@/i18n/locale';
import { MapPin } from 'lucide-react';
import { getReviewSnapshot } from '@/data';

interface LocationChoiceProps {
  locale: Locale;
  onSelect: (branchId: 'palm-jumeirah' | 'difc', branchName: string) => void;
}

export function LocationChoice({ locale, onSelect }: LocationChoiceProps) {
  const palmName = locale === 'tr' ? 'Palm Jumeirah' : locale === 'ar' ? 'نخلة جميرا' : 'Palm Jumeirah';
  const difcName = locale === 'tr' ? 'DIFC / Sky Gardens' : locale === 'ar' ? 'مركز دبي المالي' : 'DIFC / Sky Gardens';
  const reviewsLabel = locale === 'tr' ? 'yorum' : locale === 'ar' ? 'مراجعة' : 'reviews';
  const palmReview = getReviewSnapshot('palm-jumeirah');
  const difcReview = getReviewSnapshot('difc');

  return (
    <div className="flex flex-col gap-2 pt-2">
      <p className="text-xs text-stone font-medium">
        {locale === 'tr'
          ? 'Lütfen şube seçin:'
          : locale === 'ar'
            ? 'يرجى اختيار الفرع:'
            : 'Select your preferred location:'}
      </p>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onSelect('palm-jumeirah', palmName)}
          className="flex flex-col items-start p-2.5 rounded-lg border border-line bg-carbon hover:border-brass/60 hover:bg-obsidian transition-colors text-left [dir='rtl']:text-right"
        >
          <div className="flex items-center gap-1.5 text-brass text-xs font-semibold">
            <MapPin size={13} aria-hidden="true" />
            <span>{palmName}</span>
          </div>
          <span className="text-[11px] text-stone mt-1">
            {palmReview.rating.toFixed(1)} ★ ({palmReview.reviewCount.toLocaleString(locale)} {reviewsLabel})
          </span>
        </button>

        <button
          type="button"
          onClick={() => onSelect('difc', difcName)}
          className="flex flex-col items-start p-2.5 rounded-lg border border-line bg-carbon hover:border-brass/60 hover:bg-obsidian transition-colors text-left [dir='rtl']:text-right"
        >
          <div className="flex items-center gap-1.5 text-brass text-xs font-semibold">
            <MapPin size={13} aria-hidden="true" />
            <span>{difcName}</span>
          </div>
          <span className="text-[11px] text-stone mt-1">
            {difcReview.rating.toFixed(1)} ★ ({difcReview.reviewCount.toLocaleString(locale)} {reviewsLabel})
          </span>
        </button>
      </div>
    </div>
  );
}
