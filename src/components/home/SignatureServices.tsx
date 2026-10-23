import { useLocale } from '@/i18n/LocaleContext';
import { localePath } from '@/i18n/locale';
import { services } from '@/data';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { StaggerItem } from '@/components/motion/StaggerItem';

/** Signature services in an ivory editorial block matching the brand guide reference. */
export function SignatureServices() {
  const { dict, locale } = useLocale();

  return (
    <section className="section-pad border-y border-line-dark bg-ivory text-obsidian">
      <div className="shell">
        <SectionHeading
          eyebrow={dict.home.services.eyebrow}
          title={dict.home.services.title}
          link={dict.home.services.link}
          linkTo={localePath(locale, 'services')}
        />
        <StaggerGroup stagger={0.09} className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
          {services.slice(0, 4).map((service) => (
            <StaggerItem key={service.slug}>
              <ServiceCard service={service} light />
            </StaggerItem>
          ))}
        </StaggerGroup>
        <p className="mt-10 max-w-3xl text-[0.875rem] leading-relaxed text-stone-deep">
          {dict.home.services.footnote}
        </p>
      </div>
    </section>
  );
}

