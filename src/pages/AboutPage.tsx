import { useDict } from '@/i18n/LocaleContext';
import { useDocumentMeta } from '@/i18n/useDocumentMeta';
import { PageHero } from '@/components/ui/PageHero';
import { FadeUp } from '@/components/motion/FadeUp';
import { LocationChooser } from '@/components/home/LocationChooser';

export function AboutPage() {
  const { dict } = useDict();
  useDocumentMeta(dict.pages.about.title);

  return (
    <>
      <PageHero
        label={dict.pages.about.label}
        title={dict.pages.about.title}
        text={dict.pages.about.text}
        image="/images/interior.webp"
      />
      <section className="section-pad">
        <div className="shell grid max-w-5xl gap-x-16 gap-y-6 md:grid-cols-2">
          {dict.pages.about.paragraphs.map((paragraph, index) => (
            <FadeUp key={paragraph.slice(0, 24)} delay={index * 0.08}>
              <p className="text-[1.0625rem] leading-[1.85] text-bone">{paragraph}</p>
            </FadeUp>
          ))}
        </div>
      </section>
      <LocationChooser />
    </>
  );
}
