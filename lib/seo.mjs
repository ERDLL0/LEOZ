import { isHttpsUrl } from './booking.mjs';

export function absoluteUrl(origin, path) {
  if (!isHttpsUrl(origin)) return null;
  const base = origin.replace(/\/+$/, '');
  if (!path) return base;
  return `${base}/${String(path).replace(/^\/+/, '')}`;
}

export function canonicalUrl(origin, path) {
  const base = origin.replace(/\/+$/, '');
  return path ? `${base}/${String(path).replace(/^\/+/, '')}` : base;
}

export function localizedUrls(origin, path) {
  const base = origin.replace(/\/+$/, '');
  const isArabic = path === 'ar' || path.startsWith('ar/');
  const english = isArabic ? path.replace(/^ar\/?/, '') : path;
  const arabic = isArabic ? path : path ? `ar/${path}` : 'ar';
  return { en: english ? `${base}/${english}` : base, ar: `${base}/${arabic}` };
}
