import { useEffect, useState } from 'react';
import type { Locale } from '@/i18n/locale';

interface ConciergeTriggerProps {
  isOpen: boolean;
  onToggle: () => void;
  locale: Locale;
}

export function ConciergeTrigger({ isOpen, onToggle, locale }: ConciergeTriggerProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const syncMenuState = () => {
      setMobileMenuOpen(document.body.dataset.leozMobileMenuOpen === 'true');
    };
    const observer = new MutationObserver(syncMenuState);

    syncMenuState();
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-leoz-mobile-menu-open'],
    });

    return () => observer.disconnect();
  }, []);

  const label =
    locale === 'tr'
      ? 'LEOZ Concierge Sohbeti'
      : locale === 'ar'
        ? 'محادثة ليو كونسيرج'
        : 'LEOZ Concierge Chat';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-hidden={mobileMenuOpen}
      aria-label={label}
      tabIndex={mobileMenuOpen ? -1 : 0}
      className={`fixed z-40 flex items-center justify-center rounded-xl border border-brass/50 bg-obsidian shadow-2xl transition-all duration-300 hover:scale-105 hover:border-brass hover:shadow-brass/20 active:scale-95
        bottom-[max(5.5rem,calc(env(safe-area-inset-bottom)+5.5rem))] right-4
        md:bottom-7 md:right-8
        [dir='rtl']:right-auto [dir='rtl']:left-4 md:[dir='rtl']:left-8
        h-14 w-14 md:h-16 md:w-16 ${mobileMenuOpen ? 'pointer-events-none invisible opacity-0' : ''}`}
    >
      <div className="relative flex items-center justify-center">
        <img
          src="/images/lion.webp"
          alt="LEOZ Lion"
          className="h-8 w-auto mix-blend-screen brightness-125 md:h-9"
        />
        {/* Active glowing indicator dot */}
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brass opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brass" />
        </span>
      </div>
    </button>
  );
}
