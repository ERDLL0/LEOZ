import { useLocale } from '@/i18n/LocaleContext';
import { useDocumentMeta } from '@/i18n/useDocumentMeta';
import { ButtonLink } from '@/components/ui/Button';
import { DirectionalArrow } from '@/components/ui/DirectionalArrow';

export function NotFoundPage() {
  const { dict, locale } = useLocale();
  useDocumentMeta(dict.common.notFound.eyebrow);
  const page = dict.common.notFound;

  return (
    <section className="shell flex min-h-svh flex-col items-center justify-center py-32 text-center">
      <p className="eyebrow">{page.eyebrow}</p>
      <h1 className="section-title mt-6">
        {page.titleLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h1>
      <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-bone">{page.text}</p>
      <div className="mt-9">
        <ButtonLink to={`/${locale}`}>
          {page.cta}
          <DirectionalArrow size={17} />
        </ButtonLink>
      </div>
    </section>
  );
}
