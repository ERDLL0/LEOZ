import { useState } from 'react';
import { useLocale } from '@/i18n/LocaleContext';
import { ConciergeTrigger } from './ConciergeTrigger';
import { ConciergePanel } from './ConciergePanel';

/**
 * Global Lion Concierge component meeting master specification sections 29 & 30.
 * Accessible, locale-aware, strictly answers verified facts and escalates to WhatsApp.
 */
export function LionConcierge() {
  const { locale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ConciergeTrigger
        isOpen={isOpen}
        onToggle={() => setIsOpen((prev) => !prev)}
        locale={locale}
      />
      <ConciergePanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        locale={locale}
      />
    </>
  );
}
