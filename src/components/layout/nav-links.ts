import type { Dictionary } from '@/locales';
import { localePath, type Locale } from '@/i18n/locale';

export type NavLink = {
  key: string;
  label: string;
  to: string;
  /** In-page anchor on the home page (the locations section). */
  hash?: boolean;
};

export function getNavLinks(locale: Locale, dict: Dictionary): NavLink[] {
  return [
    { key: 'locations', label: dict.common.nav.locations, to: `/${locale}#locations`, hash: true },
    { key: 'services', label: dict.common.nav.services, to: localePath(locale, 'services') },
    { key: 'barbers', label: dict.common.nav.barbers, to: localePath(locale, 'barbers') },
    { key: 'the-ritual', label: dict.common.nav.ritual, to: localePath(locale, 'the-ritual') },
    { key: 'pride-club', label: dict.common.nav.prideClub, to: localePath(locale, 'pride-club') },
    { key: 'journal', label: dict.common.nav.journal, to: localePath(locale, 'journal') },
  ];
}

export function getMobileNavLinks(locale: Locale, dict: Dictionary): NavLink[] {
  return [
    ...getNavLinks(locale, dict),
    { key: 'contact', label: dict.common.nav.contact, to: localePath(locale, 'contact') },
  ];
}

export function scrollToId(id: string, smooth = true): void {
  document.getElementById(id)?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
}

export function normalizePathname(pathname: string): string {
  const normalized = pathname.replace(/\/+$/, '');
  return normalized || '/';
}

export function isNavPathActive(pathname: string, target: string): boolean {
  const current = normalizePathname(pathname);
  const destination = normalizePathname(target);
  return current === destination || current.startsWith(`${destination}/`);
}

export function homePath(locale: Locale): string {
  return `/${locale}`;
}
