import { Link } from 'react-router-dom';
import { useLocale } from '@/i18n/LocaleContext';
import { useDocumentMeta } from '@/i18n/useDocumentMeta';
import { PageHero } from '@/components/ui/PageHero';
import { FadeUp } from '@/components/motion/FadeUp';
import { ExternalArrow } from '@/components/ui/DirectionalArrow';
import { articles } from '@/content/articles';

export function JournalPage() {
  const { dict, locale } = useLocale();
  useDocumentMeta(dict.pages.journal.title);

  const page = dict.pages.journal;

  return (
    <>
      <PageHero label={page.label} title={page.title} text={page.text} />
      <section className="section-pad">
        <div className="shell grid gap-x-6 gap-y-12 md:grid-cols-3">
          {articles.map((article, index) => {
            const item = page.articles.find((entry) => entry.slug === article.slug)!;
            return (
              <FadeUp key={article.slug} delay={index * 0.08}>
                <Link to={`/${locale}/journal/${article.slug}`} className="group flex flex-col gap-4">
                  <span className="overflow-hidden rounded-[6px]">
                    <img
                      src={article.image}
                      alt=""
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <span className="label-caps text-brass">
                    {item.category}
                    <span aria-hidden="true"> · </span>
                    <span className="text-stone">{page.draftTag}</span>
                  </span>
                  <h2 className="display-subtitle flex items-start justify-between gap-3">
                    {item.title}
                    <ExternalArrow size={20} className="mt-1 flex-shrink-0 text-brass" />
                  </h2>
                </Link>
              </FadeUp>
            );
          })}
        </div>
      </section>
    </>
  );
}
