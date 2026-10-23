import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { DURATION, REVEAL_VIEWPORT } from './presets';

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
};

/** Parent for sequenced reveals. Children must be StaggerItem components. */
export function StaggerGroup({
  children,
  className,
  stagger = DURATION.stagger,
  delayChildren = 0.04,
}: StaggerGroupProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView="visible"
      viewport={REVEAL_VIEWPORT}
      variants={{
        hidden: {},
        visible: {
          transition: reduce
            ? { duration: 0, staggerChildren: 0, delayChildren: 0 }
            : { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
