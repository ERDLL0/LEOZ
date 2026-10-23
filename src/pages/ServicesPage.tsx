import { useState } from 'react';
import { useDict } from '@/i18n/LocaleContext';
import { useDocumentMeta } from '@/i18n/useDocumentMeta';
import { SERVICE_CATEGORIES, services } from '@/data';
import { PageHero } from '@/components/ui/PageHero';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { FadeUp } from '@/components/motion/FadeUp';

type Filter = 'all' | (typeof SERVICE_CATEGORIES)[number];

export function ServicesPage() {
  const { dict } = useDict();
  const [filter, setFilter] = useState<Filter>('all');
  useDocumentMeta(dict.services.page.title);

  const list = services.filter((service) => filter === 'all' || service.category === filter);
  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: dict.services.page.filters.all },
    ...SERVICE_CATEGORIES.map((category) => ({ key: category as Filter, label: dict.services.page.filters[category] })),
  ];

  return (
    <>
      <PageHero label={dict.services.page.label} title={dict.services.page.title} text={dict.services.page.text} />
      <section className="section-pad">
        <div className="shell">
          <div className="flex flex-wrap gap-2" role="group" aria-label={dict.services.page.filtersAria}>
            {filters.map((entry) => (
              <button
                key={entry.key}
                type="button"
                aria-pressed={filter === entry.key}
                onClick={() => setFilter(entry.key)}
                className={`min-h-[2.75rem] rounded-[6px] border px-5 text-[0.9375rem] font-semibold transition-colors ${
                  filter === entry.key
                    ? 'border-brass bg-brass text-ink'
                    : 'border-line text-bone hover:border-line-strong'
                }`}
              >
                {entry.label}
              </button>
            ))}
          </div>
          <p className="mt-7 max-w-3xl text-[0.9375rem] leading-relaxed text-stone">{dict.services.page.intro}</p>
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((service) => (
              <FadeUp key={service.slug}>
                <ServiceCard service={service} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
