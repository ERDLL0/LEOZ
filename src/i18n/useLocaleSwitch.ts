import { startTransition, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { localePath, storeLocale, type Locale } from './locale';
import { track } from '@/lib/analytics';

/**
 * Switches language while preserving the current semantic page:
 * /en/services -> /ar/services. The choice is persisted locally.
 * Uses startTransition to prevent UI freezing during RTL layout recalculation.
 */
export function useLocaleSwitch() {
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();

  return useCallback(
    (next: Locale) => {
      storeLocale(next);
      track('language_switch', { language: next });
      const segments = pathname.split('/').filter(Boolean);
      const rest = segments.slice(1).join('/');
      startTransition(() => {
        navigate(`${localePath(next, rest)}${search}${hash}`);
      });
    },
    [navigate, pathname, search, hash],
  );
}

