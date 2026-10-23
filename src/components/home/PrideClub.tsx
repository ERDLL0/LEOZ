import { useLocale } from '@/i18n/LocaleContext';
import { localePath } from '@/i18n/locale';
import { FadeUp } from '@/components/motion/FadeUp';
import { ButtonLink } from '@/components/ui/Button';
import { DirectionalArrow } from '@/components/ui/DirectionalArrow';

/** Pride Club section matching B — Modern Gentleman's Club brand guide. */
export function PrideClub() {
  const { dict, locale } = useLocale();

  return (
    <section className="relative isolate overflow-hidden border-t border-line bg-obsidian py-20 md:py-28">
      <img
        src="/images/club.webp"
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-obsidian via-obsidian/80 to-obsidian" aria-hidden="true" />
      <div className="shell relative grid gap-12 lg:grid-cols-2 lg:items-center">
        <FadeUp duration={0.8} className="max-w-xl">
          <p className="eyebrow">{dict.home.pride.eyebrow}</p>
          <h2 className="section-title mt-4">
            {locale === 'tr' ? 'THE PRIDE CLUB’A KATILIN' : locale === 'ar' ? 'انضم إلى نادي الفخر' : 'JOIN THE PRIDE CLUB'}
          </h2>
          <p className="mt-5 text-[1.125rem] leading-relaxed text-bone">
            {locale === 'tr'
              ? 'Özel ayrıcalıklar. Öncelikli rezervasyon. Yalnızca üyelere özel davetler.'
              : locale === 'ar'
                ? 'عروض حصرية. أولوية في الحجز. فعاليات مخصصة للأعضاء فقط.'
                : 'Exclusive offers. Priority booking. Members only events.'}
          </p>
          <div className="mt-8">
            <ButtonLink to={localePath(locale, 'pride-club')} variant="secondary">
              {locale === 'tr' ? 'DAHA FAZLA KEŞFET' : locale === 'ar' ? 'اكتشف المزيد' : 'DISCOVER MORE'}
              <DirectionalArrow size={17} />
            </ButtonLink>
          </div>
        </FadeUp>

        {/* Embossed leather membership card visual */}
        <FadeUp delay={0.2} duration={0.8} className="flex justify-center lg:justify-end">
          <div className="relative aspect-[1.58/1] w-full max-w-md rounded-xl border border-brass/30 bg-gradient-to-br from-[#1c1815] via-[#120f0d] to-[#090a0a] p-8 shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
            <div className="absolute inset-0 rounded-xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brass/10 via-transparent to-transparent pointer-events-none" />
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-display text-xl tracking-widest text-brass md:text-2xl">LEOZ</span>
                <span className="rounded border border-brass/40 px-2 py-0.5 text-[10px] tracking-widest text-brass/80 uppercase">
                  MEMBER
                </span>
              </div>
              <div className="flex flex-col items-center justify-center my-auto py-2">
                <img src="/images/lion.webp" alt="Leoz Lion" className="h-16 w-auto mix-blend-screen opacity-90" />
                <span className="mt-2 font-display text-sm tracking-[0.25em] text-brass-bright uppercase">
                  PRIDE CLUB
                </span>
              </div>
              <div className="flex items-end justify-between border-t border-brass/20 pt-3 text-[11px] text-stone">
                <span>DUBAI · PALM & DIFC</span>
                <span className="font-mono text-brass/70">#0026</span>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

