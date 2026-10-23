import { useEffect, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { pageVariants } from '@/components/motion/presets';

/**
 * Route-change behavior: the previous page fades out and lifts slightly, the
 * next page enters from below. Vertical in both writing directions — RTL
 * never gets a reversed animation. Also implements scroll handling: every
 * route change starts at the top, hash targets scroll smoothly.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';

    let frame = 0;
    const timeout = window.setTimeout(() => {
      frame = window.requestAnimationFrame(() => {
      if (hash) {
        let targetId = hash.slice(1);

        try {
          targetId = decodeURIComponent(targetId);
        } catch {
          // Keep the raw fragment when it contains malformed URI encoding.
        }

        const target = document.getElementById(targetId);
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - 96;
          window.scrollTo({ top: Math.max(0, top), left: 0, behavior: reduce ? 'auto' : 'smooth' });
          return;
        }
      }

      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      });
    }, 50);

    return () => {
      window.clearTimeout(timeout);
      window.cancelAnimationFrame(frame);
    };
  }, [pathname, hash, reduce]);

  return (
    <motion.div
      variants={reduce ? undefined : pageVariants}
      initial={reduce ? false : 'initial'}
      animate={reduce ? undefined : 'enter'}
      exit={reduce ? undefined : 'exit'}
    >
      {children}
    </motion.div>
  );
}
