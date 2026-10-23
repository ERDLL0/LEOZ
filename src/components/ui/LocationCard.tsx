import { Star } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';
import { getReviewSnapshot, type Location, type ReviewSnapshot } from '@/data';
import { ButtonLink } from './Button';
import { DirectionalArrow } from './DirectionalArrow';

export function LocationCard({ location, index }: { location: Location; index: number }) {
  const { dict, locale } = useLocale();
  const item = dict.locations[location.id as 'palm-jumeirah' | 'difc'];
  const review = getReviewSnapshot(location.id as ReviewSnapshot['branchId']);
  const exploreCta = location.id === 'palm-jumeirah' ? dict.common.cta.explorePalm : dict.common.cta.exploreDifc;

  return (
    <article className="group relative isolate overflow-hidden rounded-[8px]">
      <img
        src={location.image}
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        loading="lazy"
        decoding="async"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-obsidian/95 via-obsidian/45 to-obsidian/15"
        aria-hidden="true"
      />
      <div className="flex min-h-[26rem] flex-col justify-between p-6 md:min-h-[32rem] md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="label-caps text-bone">
            <bdi dir="ltr">{String(index + 1).padStart(2, '0')}</bdi>
            <span aria-hidden="true"> · </span>
            {item.eyebrow}
          </span>
          <div className="flex items-center gap-1.5 rounded-full border border-brass/30 bg-obsidian/80 px-2.5 py-1 text-xs text-ivory backdrop-blur-sm">
            <Star size={12} className="fill-brass text-brass" aria-hidden="true" />
            <span className="font-semibold text-ivory">{review.rating.toFixed(1)}</span>
            <span className="text-[11px] text-stone">({review.reviewCount.toLocaleString(locale)})</span>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3">
          <h3 className="location-name">{item.short}</h3>
          <p className="text-[1.0625rem] leading-relaxed text-bone">{item.tagline}</p>
          <ButtonLink to={`/${locale}/${location.id}`} variant="primary" className="mt-3">
            {exploreCta}
            <DirectionalArrow size={17} />
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
