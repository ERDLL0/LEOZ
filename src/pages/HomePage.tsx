import { useDict } from '@/i18n/LocaleContext';
import { useDocumentMeta } from '@/i18n/useDocumentMeta';
import { Hero } from '@/components/home/Hero';
import { ProofStrip } from '@/components/home/ProofStrip';
import { LocationChooser } from '@/components/home/LocationChooser';
import { SignatureServices } from '@/components/home/SignatureServices';
import { RitualSection } from '@/components/home/RitualSection';
import { MasterBarbers } from '@/components/home/MasterBarbers';
import { Reviews } from '@/components/home/Reviews';
import { InteriorStory } from '@/components/home/InteriorStory';
import { PrideClub } from '@/components/home/PrideClub';

export function HomePage() {
  const { dict } = useDict();
  useDocumentMeta(dict.home.hero.titleLines.join(' '));

  return (
    <>
      <Hero />
      <ProofStrip />
      <LocationChooser />
      <SignatureServices />
      <RitualSection />
      <MasterBarbers />
      <Reviews />
      <InteriorStory />
      <PrideClub />
    </>
  );
}
