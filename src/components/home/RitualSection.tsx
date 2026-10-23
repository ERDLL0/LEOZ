import { Link } from 'react-router-dom';
import { useLocale } from '@/i18n/LocaleContext';
import { localePath } from '@/i18n/locale';
import { FadeUp } from '@/components/motion/FadeUp';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { DirectionalArrow } from '@/components/ui/DirectionalArrow';

/** Text and imagery reveal separately to give the story room to breathe. */
export function RitualSection() {
  const { dict, locale } = useLocale();
  const steps = dict.home.ritual.steps;


  return (
    <section className="section-pad bg-ivory text-obsidian">
      <div className="shell grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <FadeUp>
          <p className="eyebrow text-bronze">{dict.home.ritual.eyebrow}</p>
          <h2 className="section-title mt-4">{dict.home.ritual.title}</h2>
          <ol className="mt-9">
            {steps.map((step, index) => (
              <li key={step.name} className="grid grid-cols-[2.25rem_1fr] gap-x-4 border-t border-line-dark py-5">
                <span className="label-caps pt-1 text-bronze">{`0${index + 1}`}</span>
                <div>
                  <h3 className="text-[1.5rem]">{step.name}</h3>
                  <p className="mt-2 max-w-md text-[1rem] leading-relaxed text-stone-deep">{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link
            to={localePath(locale, 'the-ritual')}
            className="text-link mt-3 text-obsidian transition-colors hover:text-bronze"
          >
            {dict.home.ritual.link}
            <DirectionalArrow size={16} />
          </Link>
        </FadeUp>
        <ImageReveal
          src="/images/ritual.webp"
          className="overflow-hidden rounded-[6px]"
          imgClassName="aspect-[4/3] w-full object-cover"
        />
      </div>
    </section>
  );
}
