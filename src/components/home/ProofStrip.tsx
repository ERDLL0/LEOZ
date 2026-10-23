import { Link, useLocation } from 'react-router-dom';
import { Crown, Gem, MapPin, Scissors, Star } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';
import { localePath } from '@/i18n/locale';
import { homePath, scrollToId } from '@/components/layout/nav-links';

/** Quiet ivory utility band with 5 proof points matching the brand guide reference. */
export function ProofStrip() {
  const { dict, locale } = useLocale();
  const { pathname } = useLocation();

  const items = [
    {
      key: 'locations',
      icon: MapPin,
      label: locale === 'tr' ? '2 DUBAI ŞUBESİ' : locale === 'ar' ? 'فرعان في دبي' : '2 DUBAI LOCATIONS',
      sub: 'Palm & DIFC',
      to: `${homePath(locale)}#locations`,
      hash: true,
    },
    {
      key: 'rating',
      icon: Star,
      label: dict.home.proof.rating,
      sub: 'Google reviews',
      to: `${homePath(locale)}#reviews`,
      hash: true,
    },
    {
      key: 'barbers',
      icon: Scissors,
      label: locale === 'tr' ? 'USTA BERBERLER' : locale === 'ar' ? 'حلاقون مهرة' : 'MASTER BARBERS',
      sub: 'Expert Hands',
      to: localePath(locale, 'barbers'),
      hash: false,
    },
    {
      key: 'grooming',
      icon: Gem,
      label: locale === 'tr' ? 'PREMIUM BAKIM' : locale === 'ar' ? 'عناية راقية' : 'PREMIUM GROOMING',
      sub: 'The Ritual',
      to: localePath(locale, 'the-ritual'),
      hash: false,
    },
    {
      key: 'pride',
      icon: Crown,
      label: locale === 'tr' ? 'THE PRIDE CLUB' : locale === 'ar' ? 'نادي الفخر' : 'THE PRIDE CLUB',
      sub: 'Members Lounge',
      to: localePath(locale, 'pride-club'),
      hash: false,
    },
  ];

  return (
    <section aria-label={dict.home.proof.aria} className="border-y border-line-dark bg-ivory text-obsidian">
      <div className="shell grid grid-cols-2 gap-x-4 gap-y-7 py-7 sm:grid-cols-3 lg:grid-cols-5 md:py-8">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.key}
              to={item.to}
              onClick={(event) => {
                if (item.hash && pathname === homePath(locale)) {
                  event.preventDefault();
                  scrollToId(item.key === 'locations' ? 'locations' : 'reviews');
                }
              }}
              className="flex flex-col items-center justify-center gap-2 text-center transition-opacity hover:opacity-80"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-bronze/30 bg-bone/40 text-bronze">
                <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
              </div>
              <span className="label-caps !text-[0.75rem] font-bold text-obsidian">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

