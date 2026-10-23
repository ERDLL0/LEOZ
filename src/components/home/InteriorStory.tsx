import { useLocale } from '@/i18n/LocaleContext';
import { localePath } from '@/i18n/locale';
import { FadeUp } from '@/components/motion/FadeUp';
import { ButtonLink } from '@/components/ui/Button';
import { DirectionalArrow } from '@/components/ui/DirectionalArrow';

/** "A Space Built for Men" section matching B — Modern Gentleman's Club brand guide. */
export function InteriorStory() {
  const { locale } = useLocale();

  return (
    <section className="relative isolate min-h-[70vh] overflow-hidden border-t border-line flex items-center">
      <img
        src="/images/interior.webp"
        alt="Leoz Gents Salon Luxury Interior"
        className="absolute inset-0 -z-20 h-full w-full object-cover brightness-[0.65] contrast-110"
        loading="lazy"
        decoding="async"
        style={{ objectPosition: 'center 40%' }}
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-obsidian/95 via-obsidian/75 to-transparent [dir='rtl']:bg-gradient-to-l"
        aria-hidden="true"
      />
      <div className="shell section-pad relative z-10 w-full">
        <FadeUp duration={0.8} className="max-w-xl">
          <p className="eyebrow text-brass">
            {locale === 'tr' ? 'BEYEFENDİ KULÜBÜ' : locale === 'ar' ? 'نادي السادة' : 'A GENTLEMAN’S CLUB'}
          </p>
          <h2 className="section-title mt-4 text-ivory">
            {locale === 'tr'
              ? 'ERKEKLER İÇİN TASARLANMIŞ BİR MEKÂN.'
              : locale === 'ar'
                ? 'مساحة صُممت خصيصاً للرجال.'
                : 'A SPACE BUILT FOR MEN.'}
          </h2>
          <p className="mt-5 text-[1.125rem] leading-relaxed text-bone md:text-[1.1875rem]">
            {locale === 'tr'
              ? 'Premium atmosfer. Usta eller. Benzersiz bir deneyim.'
              : locale === 'ar'
                ? 'بيئة فاخرة. أيدٍ خبيرة. تجربة لا تُضاهى.'
                : 'Premium environment. Expert hands. Unmatched experience.'}
          </p>
          <div className="mt-8">
            <ButtonLink to={localePath(locale, 'about')} variant="secondary">
              {locale === 'tr' ? 'İÇERİYE BİR GÖZ ATIN' : locale === 'ar' ? 'ألقِ نظرة بالداخل' : 'TAKE A LOOK INSIDE'}
              <DirectionalArrow size={17} />
            </ButtonLink>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
