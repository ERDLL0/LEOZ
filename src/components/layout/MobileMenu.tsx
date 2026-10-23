import { useEffect, useRef, type RefObject } from 'react';
import { createPortal } from 'react-dom';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLocale } from '@/i18n/LocaleContext';
import { useSiteActions } from '@/lib/site-actions';
import { LOCALES } from '@/i18n/locale';
import { useLocaleSwitch } from '@/i18n/useLocaleSwitch';
import { EASE_LUX } from '@/components/motion/presets';
import { Brand } from '@/components/ui/Brand';
import { DirectionalArrow } from '@/components/ui/DirectionalArrow';
import { getMobileNavLinks, homePath, normalizePathname, scrollToId } from './nav-links';

/** Full-width mobile overlay: large tap targets, explicit language list, loud CTA. */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function MobileMenu({
  open,
  onClose,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}) {
  const { dict, locale } = useLocale();
  const { open: openBooking } = useSiteActions();
  const { pathname } = useLocation();
  const switchLocale = useLocaleSwitch();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.dataset.leozMobileMenuOpen = 'true';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? []).filter(
        (element) => element.getAttribute('aria-hidden') !== 'true' && element.tabIndex !== -1,
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      delete document.body.dataset.leozMobileMenuOpen;
      document.removeEventListener('keydown', onKeyDown);
      triggerRef.current?.focus();
    };
  }, [open, onClose, triggerRef]);

  const links = getMobileNavLinks(locale, dict);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={dict.common.menu.aria}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE_LUX }}
          className="fixed inset-0 z-[100] flex flex-col bg-obsidian"
        >
          <div className="shell flex h-[4.75rem] flex-shrink-0 items-center justify-between">
            <Brand onClick={onClose} />
            <button
              ref={closeButtonRef}
              type="button"
              data-testid="menu-close"
              aria-label={dict.common.menu.close}
              onClick={onClose}
              className="inline-flex h-12 w-12 items-center justify-center rounded-[8px] text-ivory"
            >
              <X size={26} aria-hidden="true" />
            </button>
          </div>
          <nav className="shell flex flex-1 flex-col overflow-y-auto pb-4" aria-label={dict.common.nav.aria}>
            {links.map((item, index) => (
              <motion.div
                key={item.key}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : 0.05 + index * 0.04, duration: 0.4, ease: EASE_LUX }}
              >
                <Link
                  to={item.to}
                  onClick={(event) => {
                    if (item.hash) {
                      onClose();
                      if (normalizePathname(pathname) === homePath(locale)) {
                        event.preventDefault();
                        scrollToId('locations');
                      }
                      return;
                    }
                    onClose();
                  }}
                  className="flex min-h-[3.5rem] items-center justify-between gap-4 border-b border-line py-3 text-[1.5rem] text-ivory"
                >
                  <span>{item.label}</span>
                  <DirectionalArrow size={20} className="text-brass" />
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="shell flex flex-shrink-0 flex-col gap-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4">
            <div className="flex items-center gap-2" role="group" aria-label={dict.common.language.switcherAria}>
              {LOCALES.map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={value === locale}
                  onClick={() => {
                    onClose();
                    if (value !== locale) switchLocale(value);
                  }}
                  className={`min-w-0 flex-1 rounded-[6px] border px-2 py-2.5 text-[0.875rem] font-semibold transition-colors min-[360px]:px-4 min-[360px]:text-[1rem] ${
                    value === locale
                      ? 'border-brass bg-brass text-ink'
                      : 'border-line text-bone hover:border-line-strong'
                  }`}
                >
                  {dict.common.language.names[value]}
                </button>
              ))}
            </div>
            <button
              type="button"
              data-testid="menu-cta"
              className="btn btn-primary w-full"
              onClick={() => {
                onClose();
                openBooking('book');
              }}
            >
              {dict.common.cta.claimChair}
              <DirectionalArrow size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
