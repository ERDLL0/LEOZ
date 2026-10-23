import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Locale } from '@/i18n/locale';

type GsapScrollExperienceProps = {
  root: HTMLElement | null;
  routeKey: string;
  locale: Locale;
};

/**
 * Scroll choreography for the editorial sections.
 *
 * Framer Motion still owns route transitions and the small in-view reveals.
 * GSAP adds the slower, scroll-linked layer: section content settles upward,
 * full-bleed imagery drifts at a different speed, and the Google numbers count
 * up when the review section arrives.
 *
 * No pinning, no scroll hijacking, no horizontal movement. Reduced motion
 * leaves every section fully visible and static.
 */
export function GsapScrollExperience({ root, routeKey, locale }: GsapScrollExperienceProps) {
  useLayoutEffect(() => {
    if (!root || typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const desktop = window.matchMedia('(min-width: 768px)').matches;
    let cancelled = false;
    const context = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(':scope section', root).filter((section) => {
        return !section.closest('[role="dialog"]') && !section.hasAttribute('data-gsap-ignore');
      });

      // The first section owns the page entrance (hero / page hero). Route
      // transitions already animate it, so only the sections below are staged.
      const scrollSections = sections.slice(1);

      scrollSections.forEach((section) => {
        const shells = section.querySelectorAll<HTMLElement>(':scope > .shell');

        if (shells.length) {
          gsap.fromTo(
            shells,
            { autoAlpha: 0, y: 46 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1.05,
              stagger: 0.1,
              ease: 'power3.out',
              clearProps: 'opacity,visibility,transform',
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                once: true,
              },
            },
          );
        }

        // Only section-level photography drifts. Product and card images keep
        // their CSS hover treatment and Framer reveal intact.
        if (desktop) {
          section.querySelectorAll<HTMLElement>(':scope > img').forEach((image) => {
            gsap.fromTo(
              image,
              { yPercent: -5, scale: 1.08 },
              {
                yPercent: 5,
                scale: 1.08,
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.9,
                },
              },
            );
          });
        }
      });

      const reviews = root.querySelector<HTMLElement>('#reviews');
      if (reviews) {
        reviews.querySelectorAll<HTMLElement>('[data-count-rating]').forEach((node) => {
          const target = Number(node.dataset.countRating);
          if (!Number.isFinite(target)) return;

          const value = { current: 0 };

          gsap.to(value, {
            current: target,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: { trigger: node, start: 'top 92%', once: true },
            onStart: () => {
              node.textContent = (0).toFixed(1);
            },
            onUpdate: () => {
              node.textContent = value.current.toFixed(1);
            },
            onComplete: () => {
              node.textContent = target.toFixed(1);
            },
          });
        });

        reviews.querySelectorAll<HTMLElement>('[data-count-reviews]').forEach((node) => {
          const target = Number(node.dataset.countReviews);
          if (!Number.isFinite(target)) return;

          const value = { current: 0 };

          gsap.to(value, {
            current: target,
            duration: 1.35,
            ease: 'power2.out',
            scrollTrigger: { trigger: node, start: 'top 92%', once: true },
            onStart: () => {
              node.textContent = (0).toLocaleString(locale);
            },
            onUpdate: () => {
              node.textContent = Math.round(value.current).toLocaleString(locale);
            },
            onComplete: () => {
              node.textContent = target.toLocaleString(locale);
            },
          });
        });

        reviews.querySelectorAll<HTMLElement>('[data-review-stars]').forEach((group) => {
          gsap.from(group.querySelectorAll('svg'), {
            scale: 0.4,
            rotate: -18,
            autoAlpha: 0,
            duration: 0.5,
            stagger: 0.04,
            ease: 'back.out(2.2)',
            scrollTrigger: { trigger: group, start: 'top 92%', once: true },
          });
        });
      }

      ScrollTrigger.refresh();
    }, root);

    const frame = window.requestAnimationFrame(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    // Late-loading fonts and images can change section heights after the first
    // measurement. Refresh once the browser has settled.
    const fonts = document.fonts;
    if (fonts?.ready) {
      fonts.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    }

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      context?.revert();
      ScrollTrigger.refresh();
    };
  }, [root, routeKey, locale]);

  return null;
}
