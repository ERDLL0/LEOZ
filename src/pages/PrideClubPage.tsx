import { Sparkles } from 'lucide-react';
import { useDict } from '@/i18n/LocaleContext';
import { useDocumentMeta } from '@/i18n/useDocumentMeta';
import { useSiteActions } from '@/lib/site-actions';
import { Button } from '@/components/ui/Button';
import { DirectionalArrow } from '@/components/ui/DirectionalArrow';
import { PageHero } from '@/components/ui/PageHero';
import { FadeUp } from '@/components/motion/FadeUp';

export function PrideClubPage() {
  const { dict } = useDict();
  const { markInterest, interest } = useSiteActions();
  useDocumentMeta(dict.pages.pride.title);

  const page = dict.pages.pride;

  return (
    <>
      <PageHero label={page.label} title={page.title} text={page.text} image="/images/club.webp" />
      <section className="section-pad">
        <FadeUp className="shell max-w-3xl">
          <Sparkles size={36} strokeWidth={1.25} className="text-brass" aria-hidden="true" />
          <p className="eyebrow mt-6">{page.eyebrow}</p>
          <h2 className="section-title mt-4">
            {page.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-stone">{page.copy}</p>
          <div className="mt-8">
            <Button onClick={markInterest}>
              {dict.common.cta.keepInLoop}
              <DirectionalArrow size={17} />
            </Button>
          </div>
          {interest && (
            <p role="status" className="mt-6 max-w-lg rounded-[6px] border border-line p-4 text-[0.9375rem] leading-relaxed text-stone">
              {page.interest}
            </p>
          )}
        </FadeUp>
      </section>
    </>
  );
}
