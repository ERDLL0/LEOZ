import { Link } from 'react-router-dom';
import { useLocale } from '@/i18n/LocaleContext';
import { useSiteActions } from '@/lib/site-actions';
import { locations } from '@/data';
import { LOCALES } from '@/i18n/locale';
import { useLocaleSwitch } from '@/i18n/useLocaleSwitch';
import { localePath } from '@/i18n/locale';
import { Brand } from '@/components/ui/Brand';

/** The footer stays quiet: no reveals, no motion, just navigation. */
export function Footer() {
  const { dict, locale } = useLocale();
  const { openConsent } = useSiteActions();
  const switchLocale = useLocaleSwitch();
  const year = new Date().getFullYear();

  const column = 'flex flex-col items-start gap-1';

  return (
    <footer className="border-t border-line bg-carbon" aria-label={dict.common.footer.aria}>
      <div className="shell grid gap-x-8 gap-y-12 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col items-start gap-5">
          <Brand />
          <p className="text-[1rem] leading-relaxed text-bone">
            {dict.common.footer.tagline}
            <br />
            {dict.common.footer.places}
          </p>
        </div>
        <nav className={column} aria-label={dict.common.footer.locationsHeading}>
          <h3 className="label-caps mb-3 text-stone">{dict.common.footer.locationsHeading}</h3>
          {locations.map((location) => (
            <Link
              key={location.id}
              to={`/${locale}/${location.id}`}
              className="py-1 text-[1rem] text-bone transition-colors hover:text-brass-bright"
            >
              {dict.locations[location.id as 'palm-jumeirah' | 'difc'].short}
            </Link>
          ))}
        </nav>
        <nav className={column} aria-label={dict.common.footer.exploreHeading}>
          <h3 className="label-caps mb-3 text-stone">{dict.common.footer.exploreHeading}</h3>
          <Link to={localePath(locale, 'services')} className="py-1 text-[1rem] text-bone transition-colors hover:text-brass-bright">
            {dict.common.footer.exploreLinks.grooming}
          </Link>
          <Link to={localePath(locale, 'barbers')} className="py-1 text-[1rem] text-bone transition-colors hover:text-brass-bright">
            {dict.common.footer.exploreLinks.barbers}
          </Link>
          <Link to={localePath(locale, 'the-ritual')} className="py-1 text-[1rem] text-bone transition-colors hover:text-brass-bright">
            {dict.common.footer.exploreLinks.ritual}
          </Link>
        </nav>
        <nav className={column} aria-label={dict.common.footer.worldHeading}>
          <h3 className="label-caps mb-3 text-stone">{dict.common.footer.worldHeading}</h3>
          <Link to={localePath(locale, 'about')} className="py-1 text-[1rem] text-bone transition-colors hover:text-brass-bright">
            {dict.common.footer.worldLinks.story}
          </Link>
          <Link to={localePath(locale, 'pride-club')} className="py-1 text-[1rem] text-bone transition-colors hover:text-brass-bright">
            {dict.common.footer.worldLinks.club}
          </Link>
          <Link to={localePath(locale, 'journal')} className="py-1 text-[1rem] text-bone transition-colors hover:text-brass-bright">
            {dict.common.footer.worldLinks.journal}
          </Link>
          <Link to={localePath(locale, 'contact')} className="py-1 text-[1rem] text-bone transition-colors hover:text-brass-bright">
            {dict.common.footer.worldLinks.contact}
          </Link>
        </nav>
      </div>
      <div className="shell flex flex-col gap-5 border-t border-line py-6 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-[0.875rem] text-stone">{dict.common.footer.copyright.replace('{year}', String(year))}</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link to={localePath(locale, 'privacy')} className="py-1 text-[0.9375rem] text-bone transition-colors hover:text-brass-bright">
            {dict.common.footer.privacy}
          </Link>
          <Link to={localePath(locale, 'terms')} className="py-1 text-[0.9375rem] text-bone transition-colors hover:text-brass-bright">
            {dict.common.footer.terms}
          </Link>
          <button
            type="button"
            onClick={openConsent}
            className="py-1 text-[0.9375rem] text-bone transition-colors hover:text-brass-bright"
          >
            {dict.common.consent.settings}
          </button>
        </div>
        <div className="flex items-center gap-2" role="group" aria-label={dict.common.language.switcherAria}>
          {LOCALES.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={value === locale}
              onClick={() => value !== locale && switchLocale(value)}
              className={`min-h-[2.75rem] rounded-[6px] border px-3 text-[0.875rem] font-semibold uppercase transition-colors ${
                value === locale ? 'border-brass text-brass-bright' : 'border-line text-stone hover:border-line-strong'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
      <p className="shell max-w-3xl pb-10 text-[0.875rem] leading-relaxed text-stone">
        {dict.common.footer.disclosure}
      </p>
    </footer>
  );
}
