import { Fragment, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Play, X } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';
import { useSiteActions } from '@/lib/site-actions';
import { DirectionalArrow } from '@/components/ui/DirectionalArrow';
import { scrollToId } from '@/components/layout/nav-links';

const FILM_FRAMES = [
  '/images/interior.webp',
  '/images/craft.webp',
  '/images/palm.webp',
  '/images/difc.webp',
  '/images/ritual.webp',
  '/images/beard.webp',
  '/images/club.webp',
];


/**
 * One cinematic frame: the entrance hero owns the full first viewport
 * (100svh). On the first meaningful scroll the copy softly lifts and fades
 * while the next section reveals upward — no snapping, no hijacking.
 */
export function Hero() {
  const { dict } = useLocale();
  const { open } = useSiteActions();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const filmTriggerRef = useRef<HTMLButtonElement>(null);
  const filmDialogRef = useRef<HTMLDivElement>(null);
  const filmCloseRef = useRef<HTMLButtonElement>(null);
  const [filmOpen, setFilmOpen] = useState(false);
  const [filmFrame, setFilmFrame] = useState(0);

  useEffect(() => {
    if (!filmOpen) return;
    setFilmFrame(0);
    if (reduce) return;
    const timer = window.setInterval(() => {
      setFilmFrame((current) => (current + 1) % FILM_FRAMES.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [filmOpen, reduce]);

  useEffect(() => {
    if (!filmOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    filmCloseRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setFilmOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(
        filmDialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])') ?? [],
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      filmTriggerRef.current?.focus();
    };
  }, [filmOpen]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -64]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.2]);

  const lines = dict.home.hero.titleLines;

  return (
    <section ref={ref} className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <img
        src="/images/interior.webp"
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        style={{ objectPosition: '58% 45%' }}
        fetchPriority="high"
        decoding="async"
      />
      <div className="hero-shade absolute inset-0 -z-10" aria-hidden="true" />
      <motion.div
        style={reduce ? undefined : { y, opacity }}
        className="shell relative flex flex-1 flex-col justify-between gap-12 pb-[clamp(1.75rem,4vh,3rem)] pt-[clamp(7.5rem,20vh,12rem)]"
      >
        <div className="max-w-3xl">
          <p className="label-caps flex items-center gap-3 text-bone">
            <span className="h-px w-8 bg-brass" aria-hidden="true" />
            {dict.home.hero.eyebrow}
          </p>
          <h1 className="hero-title mt-6">
            {lines.map((line, index) =>
              index === lines.length - 1 ? (
                <em key={line}>{line}</em>
              ) : (
                <Fragment key={line}>
                  {line}
                  <br />
                </Fragment>
              ),
            )}
          </h1>
          <p className="mt-7 max-w-xl text-[1.125rem] leading-relaxed text-bone md:text-[1.1875rem]">
            {dict.home.hero.description}
          </p>
          <p className="label-caps mt-6 text-ivory/90">{dict.home.hero.locations}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button type="button" className="btn btn-primary" onClick={() => open('book')}>
              {dict.common.cta.claimChair}
              <DirectionalArrow size={17} />
            </button>
            <button
              ref={filmTriggerRef}
              type="button"
              onClick={() => setFilmOpen(true)}
              className="inline-flex min-h-[3.25rem] items-center gap-3 rounded-[8px] border border-line-strong px-5 py-3 text-[0.875rem] font-semibold tracking-wider text-ivory uppercase transition-colors hover:border-ivory/60 hover:bg-ivory/5"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-brass text-brass">
                <Play size={12} fill="currentColor" className="translate-x-0.5" />
              </span>
              {dict.common.film.watch}
            </button>
          </div>
        </div>

        <div className="flex items-end justify-between gap-6">
          <button
            type="button"
            onClick={() => scrollToId('locations', !reduce)}
            className="flex min-h-[2.75rem] items-center gap-2.5 text-[0.9375rem] font-semibold text-ivory/90 transition-colors hover:text-brass-bright"
          >
            {dict.common.scrollCue}
            <ChevronDown size={18} aria-hidden="true" />
          </button>
          <p className="label-caps hidden text-stone sm:block">{dict.common.heroNote}</p>
        </div>
      </motion.div>

      {filmOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="leoz-film-title"
          aria-describedby="leoz-film-description"
          className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/90 p-4 backdrop-blur-md"
          onClick={() => setFilmOpen(false)}
        >
          <div
            ref={filmDialogRef}
            className="relative w-full max-w-3xl overflow-hidden rounded-lg border border-line bg-carbon p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={filmCloseRef}
              type="button"
              onClick={() => setFilmOpen(false)}
              className="absolute end-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-[8px] bg-obsidian/80 text-ivory transition-colors hover:text-brass"
              aria-label={dict.common.film.close}
            >
              <X size={18} />
            </button>
            <div className="relative aspect-video w-full overflow-hidden rounded bg-obsidian">
              {FILM_FRAMES.map((source, index) => (
                <img
                  key={source}
                  src={source}
                  alt=""
                  aria-hidden="true"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className={`absolute inset-0 h-full w-full object-cover brightness-[0.62] transition-opacity duration-1000 ease-out ${
                    index === filmFrame ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              <div
                className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-obsidian/25"
                aria-hidden="true"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <span className="font-display text-2xl text-ivory md:text-3xl">
                  <span id="leoz-film-title">LEOZ GENTS SALON</span>
                </span>
                <p id="leoz-film-description" className="mt-2 max-w-md text-sm text-bone">
                  {dict.common.film.pending}
                </p>
                <button
                  type="button"
                  className="btn btn-primary mt-6 !min-h-11 px-6 text-xs uppercase tracking-wider"
                  onClick={() => {
                    setFilmOpen(false);
                    open('book');
                  }}
                >
                  {dict.common.cta.claimChair}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

