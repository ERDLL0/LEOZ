import { useDict } from '@/i18n/LocaleContext';
import { useDocumentMeta } from '@/i18n/useDocumentMeta';
import { PageHero } from '@/components/ui/PageHero';
import { FadeUp } from '@/components/motion/FadeUp';
import { LocationChooser } from '@/components/home/LocationChooser';

export function RitualPage() {
  const { dict } = useDict();
  useDocumentMeta(dict.pages.ritual.title);

  const steps = dict.home.ritual.steps;

  return (
    <>
      <PageHero
        label={dict.pages.ritual.label}
        title={dict.pages.ritual.title}
        text={dict.pages.ritual.text}
        image="/images/ritual.webp"
      />
      <section className="section-pad">
        <div className="shell grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <FadeUp key={step.name} delay={index * 0.1}>
              <p className="label-caps text-brass">{`0${index + 1}`}</p>
              <h2 className="display-subtitle mt-4">{step.name}</h2>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-stone">{step.copy}</p>
            </FadeUp>
          ))}
        </div>
      </section>
      <LocationChooser />
    </>
  );
}
