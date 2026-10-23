import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';

/**
 * Directional icons follow the active locale instead of translated text:
 * LTR points →, RTL points ←. Arrows are never hardcoded in copy.
 */
export function DirectionalArrow({ size = 18, className }: { size?: number; className?: string }) {
  const { isRtl } = useLocale();
  const Icon = isRtl ? ArrowLeft : ArrowRight;
  return <Icon size={size} aria-hidden="true" className={className} />;
}

/** Diagonal outbound arrow; mirrored as a UI affordance in RTL via CSS. */
export function ExternalArrow({ size = 18, className }: { size?: number; className?: string }) {
  return <ArrowUpRight size={size} aria-hidden="true" className={`icon-flip ${className ?? ''}`} />;
}
