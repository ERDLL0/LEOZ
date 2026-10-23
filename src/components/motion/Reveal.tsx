import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE_LUX, DURATION, REVEAL_VIEWPORT } from './presets';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
};

/** A pure fade for single editorial moments (quotes, statements). */
export function Reveal({ children, className, delay = 0, duration = DURATION.revealLong }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={REVEAL_VIEWPORT}
      transition={reduce ? { duration: 0 } : { duration, ease: EASE_LUX, delay }}
    >
      {children}
    </motion.div>
  );
}
