import { Clock, MapPin, MessageCircle } from 'lucide-react';
import { useDict } from '@/i18n/LocaleContext';
import { useDocumentMeta } from '@/i18n/useDocumentMeta';
import { useSiteActions } from '@/lib/site-actions';
import { locations } from '@/data';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { FadeUp } from '@/components/motion/FadeUp';

export function ContactPage() {
  const { dict } = useDict();
  const { open } = useSiteActions();
  useDocumentMeta(dict.pages.contact.title);

  const labels = dict.locations.labels;

  return (
    <>
      <PageHero label={dict.pages.contact.label} title={dict.pages.contact.title} text={dict.pages.contact.text} />
      <section className="section-pad">
        <div className="shell grid gap-12 md:grid-cols-2 md:gap-10">
          {locations.map((location, index) => {
            const item = dict.locations[location.id as 'palm-jumeirah' | 'difc'];
            return (
              <FadeUp key={location.id} delay={index * 0.1} className="flex flex-col gap-5 border-t border-line pt-8">
                <h2 className="display-subtitle">{item.short}</h2>
                <p className="flex items-start gap-3 text-[1rem] leading-relaxed text-bone">
                  <MapPin size={20} className="mt-0.5 flex-shrink-0 text-brass" aria-hidden="true" />
                  {location.address ?? labels.addressPending}
                </p>
                <p className="flex items-start gap-3 text-[1rem] text-stone">
                  <Clock size={20} className="mt-0.5 flex-shrink-0 text-brass" aria-hidden="true" />
                  {location.hours ?? labels.hoursPending}
                </p>
                <div className="pt-1">
                  <Button variant="secondary" onClick={() => open('whatsapp', location.id)}>
                    <MessageCircle size={18} aria-hidden="true" />
                    {dict.common.cta.whatsapp}
                  </Button>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </section>
    </>
  );
}
