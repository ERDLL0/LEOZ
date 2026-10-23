import { Clock, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';
import { useDocumentMeta } from '@/i18n/useDocumentMeta';
import { useSiteActions } from '@/lib/site-actions';
import { getLocation, getOtherLocation, services } from '@/data';
import { localePath } from '@/i18n/locale';
import { Button } from '@/components/ui/Button';
import { DirectionalArrow } from '@/components/ui/DirectionalArrow';
import { LocationCard } from '@/components/ui/LocationCard';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { FadeUp } from '@/components/motion/FadeUp';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { StaggerItem } from '@/components/motion/StaggerItem';
import { NotFoundPage } from './NotFoundPage';

export function LocationPage({ id }: { id: string }) {
  const { dict, locale } = useLocale();
  const { open } = useSiteActions();
  const location = getLocation(id);
  useDocumentMeta(location ? `${dict.locations[id as 'palm-jumeirah' | 'difc'].name}` : dict.common.notFound.eyebrow);

  if (!location) return <NotFoundPage />;

  const item = dict.locations[id as 'palm-jumeirah' | 'difc'];
  const labels = dict.locations.labels;
  const other = getOtherLocation(id);
  const otherIndex = other?.id === 'palm-jumeirah' ? 0 : 1;
  const faq = item.faq.map((entry) => {
    if (entry.key === 'hours') return { ...entry, a: location.hours ?? labels.hoursPending };
    if (entry.key === 'address') return { ...entry, a: location.address ?? labels.addressPending };
    return entry;
  });

  return (
    <>
      <PageHero label={item.eyebrow} title={item.heroTitle} text={item.description} image={location.image} />
      <section className="section-pad">
        <div className="shell grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <FadeUp>
            <p className="eyebrow">
              {dict.common.brandTitle} · {item.name}
            </p>
            <h2 className="section-title mt-4">{item.tagline}</h2>
            <div className="mt-8 flex flex-wrap gap-x-4 gap-y-4">
              <Button onClick={() => open('book', location.id)}>
                {item.bookLabel}
                <DirectionalArrow size={17} />
              </Button>
              <Button variant="secondary" onClick={() => open('whatsapp', location.id)}>
                <MessageCircle size={18} aria-hidden="true" />
                {dict.common.cta.whatsapp}
              </Button>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <dl className="flex flex-col gap-6 border-t border-line pt-7">
              <div className="flex items-start gap-4">
                <MapPin size={21} className="mt-0.5 flex-shrink-0 text-brass" aria-hidden="true" />
                <div>
                  <dt className="text-[0.9375rem] font-semibold text-ivory">{labels.findUs}</dt>
                  <dd className="mt-1 text-[1rem] leading-relaxed text-stone">
                    {location.address ?? labels.addressPending}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock size={21} className="mt-0.5 flex-shrink-0 text-brass" aria-hidden="true" />
                <div>
                  <dt className="text-[0.9375rem] font-semibold text-ivory">{labels.hours}</dt>
                  <dd className="mt-1 text-[1rem] text-stone">
                    {location.hours ?? labels.hoursPending}
                  </dd>
                </div>
              </div>
              {location.phone && (
                <div className="flex items-start gap-4">
                  <Phone size={21} className="mt-0.5 flex-shrink-0 text-brass" aria-hidden="true" />
                  <div>
                    <dt className="text-[0.9375rem] font-semibold text-ivory">{dict.common.cta.call}</dt>
                    <dd className="mt-1 text-[1rem] text-stone">
                      <bdi dir="ltr">{location.phone}</bdi>
                    </dd>
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5">
                <button
                  type="button"
                  className="flex min-h-[2.75rem] items-center gap-2 text-[0.9375rem] font-semibold text-bone transition-colors hover:text-brass-bright"
                  onClick={() => open('directions', location.id)}
                >
                  <Navigation size={16} aria-hidden="true" />
                  {dict.common.cta.directions}
                </button>
                <button
                  type="button"
                  className="flex min-h-[2.75rem] items-center gap-2 text-[0.9375rem] font-semibold text-bone transition-colors hover:text-brass-bright"
                  onClick={() => open('call', location.id)}
                >
                  <Phone size={16} aria-hidden="true" />
                  {dict.common.cta.call}
                </button>
              </div>
            </dl>
          </FadeUp>
        </div>
      </section>
      <section className="section-pad border-t border-line">
        <div className="shell">
          <SectionHeading
            eyebrow={labels.servicesEyebrow.replace('{location}', item.name)}
            title={dict.home.services.title}
            link={dict.common.cta.viewAllServices}
            linkTo={localePath(locale, 'services')}
          />
          <StaggerGroup stagger={0.09} className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
            {services.slice(0, 4).map((service) => (
              <StaggerItem key={service.slug}>
                <ServiceCard service={service} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
      <section className="section-pad border-t border-line">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeUp>
            <p className="eyebrow">{labels.planEyebrow}</p>
            <h2 className="section-title mt-4">{item.planTitle}</h2>
            <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-stone">{item.planCopy}</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h3 className="text-[1.5rem]">{labels.faqTitle}</h3>
            <div className="mt-5 border-t border-line">
              {faq.map((entry) => (
                <details key={entry.q} className="border-b border-line">
                  <summary className="flex min-h-[3.25rem] cursor-pointer items-center justify-between gap-4 text-[1rem] font-semibold text-ivory">
                    {entry.q}
                    <span className="faq-marker text-brass" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="pb-5 text-[1rem] leading-relaxed text-stone">{entry.a}</p>
                </details>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>
      {other && (
        <section className="section-pad border-t border-line">
          <div className="shell">
            <SectionHeading title={labels.otherTitle} />
            <div className="mt-10 max-w-xl">
              <LocationCard location={other} index={otherIndex} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
