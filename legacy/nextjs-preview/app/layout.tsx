import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const displayFont = localFont({
  src: [
    { path: '../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-400-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-display',
  display: 'swap',
});

const uiFont = localFont({
  src: [
    { path: '../node_modules/@fontsource/manrope/files/manrope-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../node_modules/@fontsource/manrope/files/manrope-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../node_modules/@fontsource/manrope/files/manrope-latin-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-ui',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'Leoz Gents Salon — A Modern Gentleman’s Club', template: '%s | Leoz Gents Salon' },
  description: 'Discover the Leoz grooming experience. Palm Jumeirah and DIFC, Dubai.',
  robots: { index: false, follow: false },
  other: { google: 'notranslate' },
  icons: { icon: '/images/lion.webp' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" translate="no" className={`${displayFont.variable} ${uiFont.variable}`}><body>{children}</body></html>;
}
