import { cubicBezier, type Variants, type ViewportOptions } from 'framer-motion';

/** One easing curve for the whole site: controlled, cinematic, never bouncy. */
export const EASE_LUX = cubicBezier(0.22, 1, 0.36, 1);

export const DURATION = {
  reveal: 0.65,
  revealLong: 0.8,
  image: 0.85,
  imageScale: 0.85,
  item: 0.65,
  stagger: 0.08,
  pageEnter: 0.5,
  pageExit: 0.28,
} as const;

/** Shared viewport contract keeps editorial sections revealing consistently. */
export const REVEAL_VIEWPORT: ViewportOptions = {
  once: true,
  amount: 0.12,
  margin: '0px 0px -8% 0px',
};

export const createFadeUpVariants = (
  y: number = 28,
  duration: number = DURATION.reveal,
  delay: number = 0,
): Variants => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { duration, ease: EASE_LUX, delay } },
});

export const fadeUpVariants = createFadeUpVariants();

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.item, ease: EASE_LUX } },
};

export const imageRevealVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.image, ease: EASE_LUX } },
};

export const imageScaleVariants: Variants = {
  hidden: { scale: 1.05 },
  visible: { scale: 1, transition: { duration: DURATION.imageScale, ease: EASE_LUX } },
};

/**
 * Page transitions stay vertical in both directions so RTL never receives a
 * mirrored animation. Old page leaves upward, new page arrives from below.
 */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 24 },
  enter: { opacity: 1, y: 0, transition: { duration: DURATION.pageEnter, ease: EASE_LUX } },
  exit: { opacity: 0, y: -18, transition: { duration: DURATION.pageExit, ease: EASE_LUX } },
};
