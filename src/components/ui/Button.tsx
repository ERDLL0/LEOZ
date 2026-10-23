import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'light';

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  ariaLabel?: string;
  testId?: string;
};

/** Subtle 8px radius, brass primary, quiet secondary — never pills, never shadows. */
export function Button({
  children,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  ariaLabel,
  testId,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      data-testid={testId}
      className={`btn btn-${variant} ${className}`}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  to,
  children,
  variant = 'primary',
  className = '',
  onClick,
}: {
  to: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link to={to} onClick={onClick} className={`btn btn-${variant} ${className}`}>
      {children}
    </Link>
  );
}
