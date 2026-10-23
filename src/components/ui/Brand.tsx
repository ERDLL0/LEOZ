import { Link, useLocation } from 'react-router-dom';
import type { MouseEventHandler } from 'react';
import { useLocale } from '@/i18n/LocaleContext';

export function Brand({
  className = '',
  onClick,
}: {
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const { dict, locale } = useLocale();
  const { pathname } = useLocation();
  const home = `/${locale}`;

  return (
    <Link
      to={home}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && pathname.replace(/\/+$/, '') === home) {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }}
      className={`flex flex-shrink-0 items-center gap-2.5 ${className}`}
    >
      <img src="/images/lion.webp" alt="" className="h-10 w-auto mix-blend-screen md:h-11" width={48} height={54} />
      <span className="flex flex-col gap-1 leading-none">
        <span className="font-display text-[1.625rem] tracking-[0.16em] text-ivory md:text-[1.75rem]">
          {dict.common.brand.name}
        </span>
        <span className="label-caps text-[0.75rem] text-stone">{dict.common.brand.sub}</span>
      </span>
    </Link>
  );
}
