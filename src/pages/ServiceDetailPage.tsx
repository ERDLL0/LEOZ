import { useParams } from 'react-router-dom';
import { useLocale } from '@/i18n/LocaleContext';
import { useDocumentMeta } from '@/i18n/useDocumentMeta';
import { useSiteActions } from '@/lib/site-actions';
import { getService } from '@/data';
import { Button } from '@/components/ui/Button';
import { DirectionalArrow } from '@/components/ui/DirectionalArrow';
import { PageHero } from '@/components/ui/PageHero';
import { Price } from '@/components/ui/Price';
import { FadeUp } from '@/components/motion/FadeUp';
import { NotFoundPage } from './NotFoundPage';

export function ServiceDetailPage() {
  const { slug = '' } = useParams();
  const { dict } = useLocale();
  const { open } = useSiteActions();
  const service = getService(slug);
  useDocumentMeta(service ? dict.services.items[slug as keyof typeof dict.services.items].name : '');

  if (!service) return <NotFoundPage />;

  const item = dict.services.items[slug as keyof typeof dict.services.items];
  const detail = dict.services.detail;

  return (
    <>
      <PageHero label={detail.label} title={item.name} text={item.description} image={service.image} />
      <section className="section-pad">
        <div className="shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <FadeUp>
            <p className="eyebrow">{detail.eyebrow}</p>
            <h2 className="section-title mt-4">{detail.title}</h2>
            <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-stone">{detail.body}</p>
            <div className="mt-8">
              <Button onClick={() => open('book', undefined, service.slug)}>
                {dict.common.cta.chooseLocation}
                <DirectionalArrow size={17} />
              </Button>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <dl className="flex flex-col divide-y divide-line rounded-[6px] border border-line px-6">
              <div className="flex items-center justify-between gap-6 py-5">
                <dt className="text-[0.9375rem] font-semibold text-stone">{detail.priceLabel}</dt>
                <dd>
                  <Price value={service.price} from={service.priceFrom} />
                </dd>
              </div>
              <div className="flex items-center justify-between gap-6 py-5">
                <dt className="text-[0.9375rem] font-semibold text-stone">{detail.durationLabel}</dt>
                <dd className="text-[1.0625rem] text-bone">{dict.services.priceOnRequest}</dd>
              </div>
              <div className="flex items-center justify-between gap-6 py-5">
                <dt className="text-[0.9375rem] font-semibold text-stone">{detail.locationsLabel}</dt>
                <dd className="text-[1.0625rem] text-bone">{detail.locationsValue}</dd>
              </div>
            </dl>
            <p className="mt-4 text-[0.875rem] leading-relaxed text-stone">
              {detail.note}
              {service.priceItem ? ` · ${service.priceItem}` : ''}
            </p>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
