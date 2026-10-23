import { Star, UserRound } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { reviewSnapshots } from '@/data';
import { useLocale } from '@/i18n/LocaleContext';

function buildStars(rating: number): number[] {
  return Array.from({ length: 5 }, (_, index) => index < Math.floor(rating) ? 1 : 0);
}

function renderStars(rating: number, className: string) {
  return buildStars(rating).map((filled, index) => (
    <Star
      key={index}
      size={16}
      className={`${className} ${filled ? 'fill-brass text-brass' : 'fill-stone/30 text-stone/30'}`}
      aria-hidden="true"
    />
  ));
}

export function Reviews() {
  const { dict, locale } = useLocale();

  return (
    <section id="reviews" className="relative isolate overflow-hidden border-t border-line bg-carbon/60 py-20 md:py-28">
      <div className="shell relative z-10">
        <Reveal className="mx-auto flex max-w-6xl flex-col gap-10 md:gap-14">
          <header className="max-w-3xl">
            <p className="eyebrow text-brass">{dict.home.reviews.eyebrow}</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ivory md:text-6xl">{dict.home.reviews.title}</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone md:text-lg">{dict.home.reviews.intro}</p>
          </header>

          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {reviewSnapshots.map((snapshot) => (
              <article key={snapshot.id} className="min-w-0 border border-brass/25 bg-obsidian/70 p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">{snapshot.branchName}</p>
                    <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span
                        data-count-rating={snapshot.rating}
                        className="font-display text-5xl tabular-nums text-ivory"
                      >
                        {snapshot.rating.toFixed(1)}
                      </span>
                      <span className="text-sm text-stone">
                        <span data-count-reviews={snapshot.reviewCount} className="tabular-nums">
                          {snapshot.reviewCount.toLocaleString(locale)}
                        </span>{' '}
                        {dict.home.reviews.reviewCountLabel}
                      </span>
                    </div>
                  </div>
                  <div
                    className="flex gap-1"
                    role="img"
                    data-review-stars
                    aria-label={`${snapshot.rating.toFixed(1)} / 5 Google`}
                  >
                    {renderStars(snapshot.rating, 'text-brass')}
                  </div>
                </div>
                <p className="mt-5 border-t border-line/70 pt-4 text-xs leading-relaxed text-stone">
                  {dict.home.reviews.snapshotNote}
                </p>
              </article>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {reviewSnapshots.map((snapshot) => {
              const sample = dict.home.reviews.samples[snapshot.branchId];

              return (
                <article
                  key={`${snapshot.id}-sample`}
                  className="flex min-h-48 min-w-0 flex-col justify-between border border-dashed border-stone/35 bg-obsidian/35 p-6 md:p-8"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-brass/30 text-brass">
                          <Star size={18} aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brass">
                            {dict.home.reviews.slotLabel}
                          </p>
                          <h3 className="mt-2 text-lg font-semibold text-ivory">{snapshot.branchName}</h3>
                        </div>
                      </div>
                      <span className="inline-flex shrink-0 items-center rounded-[3px] border border-brass/40 bg-brass/10 px-2 py-1 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-brass">
                        {dict.home.reviews.slotBadge}
                      </span>
                    </div>

                    <div
                      className="mt-5 flex gap-1"
                      role="img"
                      data-review-stars
                      aria-label="5 / 5 Google"
                    >
                      {renderStars(5, 'text-brass')}
                    </div>

                    <blockquote className="mt-3 text-sm leading-relaxed text-bone md:text-base">
                      “{sample.text}”
                    </blockquote>

                    <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone">
                      <UserRound size={14} aria-hidden="true" />
                      <span>
                        {sample.reviewer} · {sample.date}
                      </span>
                      <span className="ms-auto text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-stone/70">
                        Google
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-line/60 pt-4">
                    <p className="text-sm leading-relaxed text-stone">{dict.home.reviews.slotDescription}</p>
                    <p className="mt-2 text-[0.625rem] uppercase tracking-[0.12em] text-stone/70">
                      {dict.home.reviews.slotFields}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="text-xs leading-relaxed text-stone">{dict.home.reviews.pending}</p>
        </Reveal>
      </div>
    </section>
  );
}
