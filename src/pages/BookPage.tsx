import { Calendar } from 'lucide-react';
import { useDict } from '@/i18n/LocaleContext';
import { useDocumentMeta } from '@/i18n/useDocumentMeta';
import { useSiteActions } from '@/lib/site-actions';
import { locations } from '@/data';
import { DirectionalArrow } from '@/components/ui/DirectionalArrow';
import { PageHero } from '@/components/ui/PageHero';
import { FadeUp } from '@/components/motion/FadeUp';

export function BookPage() {
  const { dict } = useDict();
  const { selectLocation } = useSiteActions();
  useDocumentMeta(dict.pages.book.title);

  return (
    <>
      <PageHero label={dict.pages.book.label} title={dict.pages.book.title} text={dict.pages.book.text} />
      <section className="section-pad">
        <div className="shell">
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {locations.map((location, index) => {
              const item = dict.locations[location.id as 'palm-jumeirah' | 'difc'];
              return (
                <FadeUp key={location.id} delay={index * 0.1}>
                  <button
                    type="button"
                    onClick={() => selectLocation(location)}
                    className="group flex h-full w-full flex-col overflow-hidden rounded-[6px] border border-line text-start transition-colors hover:border-line-strong"
                  >
                    <span className="block overflow-hidden">
                      <img
                        src={location.image}
                        alt=""
                        className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                        loading={index === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    </span>
                    <span className="flex flex-1 flex-col items-start gap-2 p-6">
                      <span className="label-caps text-stone">{item.eyebrow}</span>
                      <strong className="display-subtitle mt-1 text-ivory">{item.short}</strong>
                      <span className="text-[1rem] leading-relaxed text-stone">{item.tagline}</span>
                      <span className="text-link mt-4 text-ivory">
                        {dict.common.cta.selectLocation}
                        <DirectionalArrow size={16} />
                      </span>
                    </span>
                  </button>
                </FadeUp>
              );
            })}
          </div>
          <p className="mt-9 flex max-w-2xl items-start gap-3 text-[0.9375rem] leading-relaxed text-stone">
            <Calendar size={20} className="mt-0.5 flex-shrink-0 text-brass" aria-hidden="true" />
            {dict.pages.book.notice}
          </p>
        </div>
      </section>
    </>
  );
}
