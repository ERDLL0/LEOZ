import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, ChevronDown, Globe2 } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';

import { LOCALES, type Locale } from '@/i18n/locale';
import { useLocaleSwitch } from '@/i18n/useLocaleSwitch';
import { EASE_LUX } from '@/components/motion/presets';

/** Compact desktop switcher. Mobile uses the explicit list inside MobileMenu. */
export function LocaleSwitcher({ className = '' }: { className?: string }) {
  const { dict, locale } = useLocale();
  const switchLocale = useLocaleSwitch();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      const currentIndex = itemRefs.current.findIndex((item) => item === document.activeElement);
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        itemRefs.current[(currentIndex + 1 + LOCALES.length) % LOCALES.length]?.focus();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        itemRefs.current[(currentIndex - 1 + LOCALES.length) % LOCALES.length]?.focus();
      } else if (event.key === 'Home') {
        event.preventDefault();
        itemRefs.current[0]?.focus();
      } else if (event.key === 'End') {
        event.preventDefault();
        itemRefs.current[LOCALES.length - 1]?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  function choose(next: Locale) {
    setOpen(false);
    if (next !== locale) switchLocale(next);
  }

  function toggle() {
    setOpen((value) => {
      const next = !value;
      if (next) {
        requestAnimationFrame(() => itemRefs.current[LOCALES.indexOf(locale)]?.focus());
      }
      return next;
    });
  }

  return (
    <div ref={ref} className={`relative hidden lg:block ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${dict.common.language.switcherAria} — ${dict.common.language.current}: ${locale.toUpperCase()}`}
        onClick={toggle}
        className="inline-flex min-h-[2.75rem] items-center gap-2 rounded-[8px] border border-line px-3 text-ivory transition-colors hover:border-line-strong"
      >
        <Globe2 size={18} aria-hidden="true" />
        <span className="text-[0.875rem] font-semibold uppercase">{locale}</span>
        <ChevronDown size={15} aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="menu"
            aria-label={dict.common.language.label}
            initial={reduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: EASE_LUX }}
            className="absolute end-0 top-[calc(100%+0.5rem)] z-50 min-w-[11rem] overflow-hidden rounded-[8px] border border-line bg-carbon p-1.5"
          >
            {LOCALES.map((value) => (
              <li key={value} role="none">
                <button
                  ref={(node) => {
                    itemRefs.current[LOCALES.indexOf(value)] = node;
                  }}
                  type="button"
                  role="menuitemradio"
                  aria-checked={value === locale}
                  onClick={() => choose(value)}
                  className={`flex min-h-[2.75rem] w-full items-center justify-between gap-3 rounded-[6px] px-3 text-start text-[0.9375rem] transition-colors hover:bg-ivory/5 ${
                    value === locale ? 'text-brass-bright' : 'text-bone'
                  }`}
                >
                  {dict.common.language.names[value]}
                  {value === locale && <Check size={16} aria-hidden="true" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
