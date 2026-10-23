import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { staggerItemVariants } from './presets';

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div className={className} variants={reduce ? undefined : staggerItemVariants}>
      {children}
    </motion.div>
  );
}
