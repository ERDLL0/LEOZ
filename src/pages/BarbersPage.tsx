import { Scissors } from 'lucide-react';
import { useDict } from '@/i18n/LocaleContext';
import { useDocumentMeta } from '@/i18n/useDocumentMeta';
import { useSiteActions } from '@/lib/site-actions';
import { Button } from '@/components/ui/Button';
import { DirectionalArrow } from '@/components/ui/DirectionalArrow';
import { PageHero } from '@/components/ui/PageHero';
import { BarberCard } from '@/components/ui/BarberCard';
import { FadeUp } from '@/components/motion/FadeUp';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { StaggerItem } from '@/components/motion/StaggerItem';

const portraits = ['/images/craft.webp', '/images/beard.webp', '/images/ritual.webp'];

export function BarbersPage() {
  const { dict } = useDict();
  const { open } = useSiteActions();
  useDocumentMeta(dict.pages.barbers.title);

  const page = dict.pages.barbers;
  const captions = dict.home.barbers.captions;

  return (
    <>
      <PageHero label={page.label} title={page.title} text={page.text} image="/images/craft.webp" />
      <section className="section-pad">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
          <FadeUp>
            <Scissors size={36} strokeWidth={1.25} className="text-brass" aria-hidden="true" />
            <h2 className="section-title mt-6">
              {page.headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-stone">{page.copy}</p>
            <div className="mt-8">
              <Button onClick={() => open('book')}>
                {dict.common.cta.exploreBooking}
                <DirectionalArrow size={17} />
              </Button>
            </div>
            <p className="mt-6 max-w-lg text-[0.875rem] leading-relaxed text-stone">{page.note}</p>
          </FadeUp>
          <StaggerGroup stagger={0.14} className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {portraits.map((src, index) => (
              <StaggerItem key={src}>
                <BarberCard image={src} caption={captions[index]} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
