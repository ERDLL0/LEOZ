import { Calendar, MessageCircle, Navigation } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useDict } from '@/i18n/LocaleContext';
import { useSiteActions } from '@/lib/site-actions';
import { locations } from '@/data';
import { resolveBranchId } from '@/lib/booking';

/** Sticky mobile actions. The remembered branch wins only off-location pages. */
export function MobileUtilities() {
  const { dict } = useDict();
  const { open } = useSiteActions();
  const { pathname } = useLocation();

  const segments = pathname.split('/').filter(Boolean);
  const route = segments.slice(1).join('/');
  const remembered = (() => {
    try {
      return window.sessionStorage.getItem('leoz-location');
    } catch {
      return null;
    }
  })();
  const branch = resolveBranchId(route, remembered, locations);

  const itemClass =
    'flex min-h-[3.25rem] flex-col items-center justify-center gap-1 rounded-[8px] px-2 text-[0.9375rem] font-semibold text-ivory transition-colors hover:bg-ivory/5';

  return (
    <nav
      aria-label={dict.common.utilities.aria}
      className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-30 grid grid-cols-3 gap-1 rounded-[10px] border border-line bg-obsidian/95 p-1.5 backdrop-blur-md md:hidden"
    >
      <button type="button" className={itemClass} onClick={() => open('book', branch)}>
        <Calendar size={19} className="text-brass" aria-hidden="true" />
        {dict.common.cta.book}
      </button>
      <button type="button" className={itemClass} onClick={() => open('whatsapp', branch)}>
        <MessageCircle size={19} className="text-brass" aria-hidden="true" />
        {dict.common.cta.whatsapp}
      </button>
      <button type="button" className={itemClass} onClick={() => open('directions', branch)}>
        <Navigation size={19} className="text-brass" aria-hidden="true" />
        {dict.common.cta.directions}
      </button>
    </nav>
  );
}
