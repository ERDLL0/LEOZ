export const LOCALES = ['en', 'tr', 'ar'] as const;

export type Locale = (typeof LOCALES)[number];

export type Direction = 'ltr' | 'rtl';

export const DEFAULT_LOCALE: Locale = 'en';

export const DIRECTION: Record<Locale, Direction> = { en: 'ltr', tr: 'ltr', ar: 'rtl' };

export const LOCALE_STORAGE_KEY = 'leoz-locale';

/** First URL segment values that belong to the site map rather than a locale. */
export const ROUTE_SLUGS = [
  'palm-jumeirah',
  'difc',
  'services',
  'barbers',
  'the-ritual',
  'pride-club',
  'about',
  'contact',
  'book',
  'journal',
  'privacy',
  'terms',
] as const;

export function isLocale(value: string | null | undefined): value is Locale {
  return value != null && (LOCALES as readonly string[]).includes(value);
}

export function readStoredLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // Storage can be unavailable; fall through to the default locale.
  }
  return DEFAULT_LOCALE;
}

export function storeLocale(locale: Locale): void {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Language choice simply is not persisted when storage is unavailable.
  }
}

export function localePath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+/, '');
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}

/**
 * Builds the redirect target for a path whose first segment is not a valid
 * locale. Known route slugs are preserved (`/services` -> `/en/services`);
 * anything else loses the stray segment (`/de/home` -> `/en/home`).
 */
export function localizeIncomingPath(locale: Locale, pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const [first, ...rest] = segments;
  if (first && (ROUTE_SLUGS as readonly string[]).includes(first)) {
    return localePath(locale, segments.join('/'));
  }
  return localePath(locale, rest.join('/'));
}
