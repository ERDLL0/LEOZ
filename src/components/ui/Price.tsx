import { useDict, useLocale } from '@/i18n/LocaleContext';

/**
 * Prices keep Latin digits in every locale and isolate the number from RTL
 * bidi reordering. Arabic renders `120 درهم`, LTR renders `AED 120`.
 */
export function Price({
  value,
  from = false,
  className = '',
}: {
  value: number | null;
  from?: boolean;
  className?: string;
}) {
  const { dict } = useDict();
  const { locale } = useLocale();

  if (value == null) {
    return <span className={`price text-stone ${className}`}>{dict.services.priceOnRequest}</span>;
  }

  const formatted = new Intl.NumberFormat('en-US').format(value);

  if (locale === 'ar') {
    return (
      <span className={`price ${className}`}>
        {from && <span className="text-stone">{dict.services.from} </span>}
        <bdi dir="ltr">{formatted}</bdi> <span>{dict.services.currency}</span>
      </span>
    );
  }

  return (
    <span className={`price ${className}`}>
      {from && <span className="text-stone">{dict.services.from} </span>}
      <bdi dir="ltr">
        {dict.services.currency} {formatted}
      </bdi>
    </span>
  );
}
