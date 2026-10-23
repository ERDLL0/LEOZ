import { createContext, useContext, useLayoutEffect, useMemo, type ReactNode } from 'react';
import { DIRECTION, type Direction, type Locale } from './locale';
import { dictionaries, type Dictionary } from '@/locales';

type LocaleContextValue = {
  locale: Locale;
  dir: Direction;
  isRtl: boolean;
  dict: Dictionary;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const value = useMemo<LocaleContextValue>(() => {
    const dir = DIRECTION[locale];
    return { locale, dir, isRtl: dir === 'rtl', dict: dictionaries[locale] };
  }, [locale]);

  // The document root carries the active locale so CSS, assistive technology
  // and the browser itself all treat Arabic as a first-class RTL document.
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = DIRECTION[locale];
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used inside LocaleProvider');
  return context;
}

export function useDict(): LocaleContextValue {
  return useLocale();
}

