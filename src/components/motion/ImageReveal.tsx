import { motion, useReducedMotion } from 'framer-motion';
import { imageRevealVariants, imageScaleVariants, REVEAL_VIEWPORT } from './presets';

type ImageRevealProps = {
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
};

/**
 * Images settle into place: slight scale-down plus fade. Photography is never
 * mirrored — only this entrance animates, the composition stays identical
 * for LTR and RTL.
 */
export function ImageReveal({ src, alt = '', className, imgClassName, eager = false }: ImageRevealProps) {
  const reduce = useReducedMotion();

  const img = (
    <img
      src={src}
      alt={alt}
      className={imgClassName}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
    />
  );

  return (
    <motion.div
      className={className}
      variants={reduce ? undefined : imageRevealVariants}
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'visible'}
      viewport={REVEAL_VIEWPORT}
      transition={reduce ? { duration: 0 } : undefined}
    >
      <motion.div
        className="h-full w-full"
        variants={reduce ? undefined : imageScaleVariants}
        transition={reduce ? { duration: 0 } : undefined}
      >
        {img}
      </motion.div>
    </motion.div>
  );
}
