import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';

import { useSiteActions } from '@/lib/site-actions';
import { Brand } from '@/components/ui/Brand';
import { DirectionalArrow } from '@/components/ui/DirectionalArrow';
import { LocaleSwitcher } from './LocaleSwitcher';
import { MobileMenu } from './MobileMenu';
import { getNavLinks, homePath, isNavPathActive, normalizePathname, scrollToId } from './nav-links';

export function Navbar() {
  const { dict, locale } = useLocale();
  const { open } = useSiteActions();
  const { pathname, hash } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isHome = normalizePathname(pathname) === homePath(locale);
  const solid = !isHome || scrolled;
  const links = getNavLinks(locale, dict);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        solid ? 'border-line bg-obsidian/95 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="shell flex h-[4.75rem] items-center justify-between gap-4 md:h-[5.25rem]">
        <Brand />
        <nav className="hidden items-center gap-7 xl:flex" aria-label={dict.common.nav.aria}>
          {links.map((item) => {
            const isCurrent = item.hash ? isHome && hash === '#locations' : isNavPathActive(pathname, item.to);
            return (
              <Link
                key={item.key}
                to={item.to}
                aria-current={isCurrent ? 'page' : undefined}
                onClick={(event) => {
                  if (item.hash && isHome) {
                    event.preventDefault();
                    scrollToId('locations');
                  }
                }}
                className={`text-[0.9375rem] font-medium transition-colors hover:text-brass-bright ${
                  isCurrent ? 'text-brass-bright' : 'text-ivory/90'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2.5 md:gap-4">
          <div className="hidden xl:block">
            <LocaleSwitcher />
          </div>
          <button
            type="button"
            className="btn btn-primary hidden !min-h-[2.875rem] px-4 text-[0.875rem] min-[360px]:inline-flex sm:!min-h-[2.875rem] sm:px-6 sm:text-[0.9375rem]"
            onClick={() => open('book')}
          >
            <span className="hidden sm:inline">{dict.common.cta.claimChair}</span>
            <span className="sm:hidden">{dict.common.cta.bookShort}</span>
            <DirectionalArrow size={16} />
          </button>
          <button
            ref={menuTriggerRef}
            type="button"
            data-testid="menu-open"
            aria-label={dict.common.menu.open}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-[8px] text-ivory xl:hidden"
          >
            <Menu size={26} aria-hidden="true" />
          </button>
        </div>
      </div>
      <MobileMenu open={menuOpen} onClose={closeMenu} triggerRef={menuTriggerRef} />
    </header>
  );
}
