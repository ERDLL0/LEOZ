import { Link } from 'react-router-dom';
import { useLocale } from '@/i18n/LocaleContext';
import type { Service } from '@/data';
import { DirectionalArrow } from './DirectionalArrow';
import { Price } from './Price';

export function ServiceCard({ service, light = false }: { service: Service; light?: boolean }) {
  const { dict, locale } = useLocale();
  const item = dict.services.items[service.slug as keyof typeof dict.services.items];
  const href = `/${locale}/services/${service.slug}`;


  return (
    <article className="group flex h-full flex-col">
      <Link to={href} className="overflow-hidden rounded-[6px]" tabIndex={-1} aria-hidden="true">
        <img
          src={service.image}
          alt=""
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
      </Link>
      <div className="flex flex-1 flex-col pt-5">
        <h3 className={`display-subtitle ${light ? 'text-obsidian' : 'text-ivory'}`}>
          <Link to={href} className="transition-colors hover:text-brass-bright">
            {item.name}
          </Link>
        </h3>
        <p className={`mt-3 text-[1rem] leading-relaxed ${light ? 'text-stone-deep' : 'text-stone'}`}>
          {item.description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          <div className={light ? 'text-obsidian' : 'text-ivory'}>
            <Price value={service.price} from={service.priceFrom} />
          </div>
          <Link
            to={href}
            className={`inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[8px] border transition-colors ${
              light
                ? 'border-line-dark text-obsidian hover:border-obsidian/40 hover:bg-obsidian/5'
                : 'border-line text-ivory hover:border-line-strong hover:bg-ivory/5'
            }`}
            aria-label={`${item.name} — ${dict.common.cta.exploreBooking}`}
          >
            <DirectionalArrow size={17} />
          </Link>
        </div>
      </div>
    </article>

  );
}
