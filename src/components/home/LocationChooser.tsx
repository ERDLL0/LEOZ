import { useDict } from '@/i18n/LocaleContext';
import { locations } from '@/data';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LocationCard } from '@/components/ui/LocationCard';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { StaggerItem } from '@/components/motion/StaggerItem';

/** First section below the fold: enters upward, Palm and DIFC stagger subtly. */
export function LocationChooser() {
  const { dict } = useDict();

  return (
    <section id="locations" className="section-pad scroll-mt-24">
      <div className="shell">
        <SectionHeading eyebrow={dict.home.locations.eyebrow} title={dict.home.locations.title} />
        <StaggerGroup stagger={0.12} className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
          {locations.map((location, index) => (
            <StaggerItem key={location.id}>
              <LocationCard location={location} index={index} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
