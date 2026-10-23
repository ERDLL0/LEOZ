import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { isLocale, localizeIncomingPath, readStoredLocale, storeLocale, type Locale } from '@/i18n/locale';
import { SiteLayout } from '@/components/layout/SiteLayout';

/**
 * Locale routing contract:
 *   /            -> persisted locale (default en)
 *   /en/...      -> English
 *   /tr/...      -> Turkish
 *   /ar/...      -> Arabic
 * Anything whose first segment is not an allowed locale redirects safely to
 * the equivalent page under the persisted (or default) locale.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LocaleRootRedirect />} />
      <Route path="/:locale/*" element={<LocaleGate />} />
      <Route path="*" element={<LocaleRootRedirect />} />
    </Routes>
  );
}

function LocaleRootRedirect() {
  return <Navigate to={`/${readStoredLocale()}`} replace />;
}

function LocaleGate() {
  const { locale = '' } = useParams();
  const { pathname, search, hash } = useLocation();

  if (!isLocale(locale)) {
    const target = localizeIncomingPath(readStoredLocale(), pathname);
    return <Navigate to={`${target}${search}${hash}`} replace />;
  }

  return <LocaleShell key={locale} locale={locale} />;
}

function LocaleShell({ locale }: { locale: Locale }) {
  useEffect(() => {
    storeLocale(locale);
  }, [locale]);

  return <SiteLayout locale={locale} />;
}
