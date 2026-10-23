import { Link, useParams } from 'react-router-dom';
import { useLocale } from '@/i18n/LocaleContext';
import { useDocumentMeta } from '@/i18n/useDocumentMeta';
import { PageHero } from '@/components/ui/PageHero';
import { FadeUp } from '@/components/motion/FadeUp';
import { DirectionalArrow } from '@/components/ui/DirectionalArrow';
import { articles } from '@/content/articles';
import { NotFoundPage } from './NotFoundPage';

export function JournalArticlePage() {
  const { slug = '' } = useParams();
  const { dict, locale } = useLocale();
  const article = articles.find((entry) => entry.slug === slug);
  const item = dict.pages.journal.articles.find((entry) => entry.slug === slug);
  useDocumentMeta(item ? item.title : '');

  if (!article || !item) return <NotFoundPage />;

  return (
    <>
      <PageHero
        label={`${dict.pages.journal.label} · ${dict.pages.journal.draftTag}`}
        title={item.title}
        image={article.image}
      />
      <article className="section-pad">
        <div className="shell">
          <FadeUp className="article-body">
            {item.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </FadeUp>
          <Link to={`/${locale}/journal`} className="text-link mt-12 transition-colors hover:text-brass-bright">
            {dict.common.cta.backToJournal}
            <DirectionalArrow size={16} />
          </Link>
        </div>
      </article>
    </>
  );
}
