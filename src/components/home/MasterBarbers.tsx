import { Link } from 'react-router-dom';
import { useLocale } from '@/i18n/LocaleContext';
import { localePath } from '@/i18n/locale';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DirectionalArrow } from '@/components/ui/DirectionalArrow';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { StaggerItem } from '@/components/motion/StaggerItem';

const barbers = [
  { name: 'Nassim', branch: 'Palm Jumeirah', branchKey: 'PALM', image: '/images/craft.webp' },
  { name: 'Mohammad', branch: 'Palm Jumeirah', branchKey: 'PALM', image: '/images/beard.webp' },
  { name: 'Fares', branch: 'Palm Jumeirah', branchKey: 'PALM', image: '/images/ritual.webp' },
  { name: 'Imad', branch: 'DIFC', branchKey: 'DIFC', image: '/images/craft.webp' },
  { name: 'Rashed', branch: 'DIFC', branchKey: 'DIFC', image: '/images/beard.webp' },
  { name: 'Bashir', branch: 'DIFC', branchKey: 'DIFC', image: '/images/ritual.webp' },
];

/** Master Barbers editorial row matching the B — Modern Gentleman's Club guide. */
export function MasterBarbers() {
  const { dict, locale } = useLocale();

  return (
    <section className="section-pad border-t border-line">
      <div className="shell">
        <SectionHeading
          eyebrow={dict.home.barbers.eyebrow}
          title={locale === 'tr' ? 'Usta Berberler' : locale === 'ar' ? 'الحلاقون المهرة' : 'Master Barbers'}
          link={dict.home.barbers.link}
          linkTo={localePath(locale, 'barbers')}
        />

        <StaggerGroup stagger={0.08} className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 md:gap-5">
          {barbers.map((barber) => (
            <StaggerItem key={barber.name}>
              <Link
                to={localePath(locale, 'barbers')}
                className="group flex flex-col overflow-hidden rounded-[6px] border border-line bg-carbon/50 transition-colors hover:border-brass/40"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-obsidian">
                  <img
                    src={barber.image}
                    alt={barber.name}
                    className="h-full w-full object-cover filter grayscale contrast-125 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-2 inset-x-2 text-center text-[10px] font-bold tracking-wider text-brass uppercase">
                    {barber.branchKey}
                  </span>
                </div>
                <div className="p-3 text-center">
                  <h3 className="font-display text-base font-medium text-ivory group-hover:text-brass-bright">
                    {barber.name}
                  </h3>
                  <p className="text-[11px] text-stone">{barber.branch}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line/60 pt-6">
          <p className="text-xs text-stone">
            {dict.home.barbers.imageNote} · {dict.home.barbers.note}
          </p>
          <Link
            to={localePath(locale, 'barbers')}
            className="text-link text-xs text-bone transition-colors hover:text-brass-bright"
          >
            {dict.home.barbers.link}
            <DirectionalArrow size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

