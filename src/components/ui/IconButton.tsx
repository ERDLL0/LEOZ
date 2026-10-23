import type { ReactNode } from 'react';

export function IconButton({
  label,
  onClick,
  children,
  className = '',
}: {
  label: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-line text-ivory transition-colors hover:border-line-strong ${className}`}
    >
      {children}
    </button>
  );
}
