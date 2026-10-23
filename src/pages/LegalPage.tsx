import { useDict } from '@/i18n/LocaleContext';
import { useDocumentMeta } from '@/i18n/useDocumentMeta';
import { useSiteActions } from '@/lib/site-actions';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { FadeUp } from '@/components/motion/FadeUp';
import { DirectionalArrow } from '@/components/ui/DirectionalArrow';

export function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const { dict } = useDict();
  const { openConsent } = useSiteActions();
  const page = dict.pages.legal[kind];
  useDocumentMeta(page.title);

  return (
    <>
      <PageHero label={page.label} title={page.title} />
      <section className="section-pad">
        <FadeUp className="shell article-body">
          {page.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
          <div className="mt-10">
            <Button variant="secondary" onClick={openConsent}>
              {page.settings}
              <DirectionalArrow size={16} />
            </Button>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
