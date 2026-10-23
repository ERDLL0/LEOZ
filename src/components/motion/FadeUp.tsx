import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { createFadeUpVariants, DURATION, REVEAL_VIEWPORT } from './presets';

type FadeUpProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
};

/**
 * Standard section reveal: opacity 0→1, translateY 28px→0.
 * With reduced motion the content renders plainly and stays visible.
 */
export function FadeUp({ children, className, delay = 0, duration = DURATION.reveal, y = 28 }: FadeUpProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={reduce ? undefined : createFadeUpVariants(y, duration, delay)}
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'visible'}
      viewport={REVEAL_VIEWPORT}
      transition={reduce ? { duration: 0 } : undefined}
    >
      {children}
    </motion.div>
  );
}
