import { useEffect, useRef } from 'react';
import { Calendar, X } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';
import type { BookingState } from '@/lib/site-actions';
import { useSiteActions } from '@/lib/site-actions';
import { getLocation, locations } from '@/data';
import { DirectionalArrow } from '@/components/ui/DirectionalArrow';

export function BookingDialog({
  booking,
  onClose,
  onChooseAnother,
}: {
  booking: BookingState;
  onClose: () => void;
  onChooseAnother: () => void;
}) {
  const { dict } = useLocale();
  const { selectLocation } = useSiteActions();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (booking && !dialog.open) {
      dialog.showModal();
      dialog.querySelector<HTMLElement>('h2')?.focus();
    }
    if (!booking && dialog.open) dialog.close();
  }, [booking]);

  const active = booking?.branch ? getLocation(booking.branch) : undefined;
  const activeItem = active ? dict.locations[active.id as 'palm-jumeirah' | 'difc'] : undefined;
  const selectedService = booking?.service
    ? dict.services.items[booking.service as keyof typeof dict.services.items]
    : undefined;

  const unavailable =
    booking?.action === 'directions'
      ? dict.common.booking.unavailable.directions
      : booking?.action === 'whatsapp'
        ? dict.common.booking.unavailable.whatsapp
        : booking?.action === 'call'
          ? dict.common.booking.unavailable.call
          : dict.common.booking.unavailable.book;

  return (
    <dialog
      ref={ref}
      aria-label={dict.common.booking.aria}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="booking-dialog"
    >
      <button
        type="button"
        aria-label={dict.common.booking.close}
        onClick={onClose}
        className="absolute end-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-[8px] text-stone transition-colors hover:text-ivory"
      >
        <X size={22} aria-hidden="true" />
      </button>
      <p className="eyebrow">{dict.common.booking.eyebrow}</p>
      <h2 className="display-subtitle mt-3 pe-10" tabIndex={-1}>
        {activeItem ? activeItem.short : dict.common.booking.title}
      </h2>
      {activeItem ? (
        <>
          <p className="mt-3 text-[1rem] text-stone">{activeItem.tagline}</p>
          <div className="mt-6 rounded-[6px] border border-line p-5">
            <p className="flex items-center gap-3 text-[0.9375rem] font-semibold text-ivory">
              <Calendar size={18} className="text-brass" aria-hidden="true" />
              {dict.common.booking.unavailable.title}
            </p>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-stone">{unavailable}</p>
            {selectedService && (
              <p className="mt-3 text-[0.875rem] text-bone">
                {dict.common.booking.selectedPrefix}: {selectedService.name}
              </p>
            )}
          </div>
          <button type="button" className="text-link mt-6" onClick={onChooseAnother}>
            {dict.common.booking.another}
            <DirectionalArrow size={16} />
          </button>
        </>
      ) : (
        <>
          <p className="mt-3 text-[1rem] text-stone">{dict.common.booking.intro}</p>
          <div className="mt-6 grid gap-3">
            {locations.map((location) => {
              const item = dict.locations[location.id as 'palm-jumeirah' | 'difc'];
              return (
                <button
                  key={location.id}
                  type="button"
                  onClick={() => selectLocation(location)}
                  className="group flex items-center gap-4 rounded-[6px] border border-line p-3 text-start transition-colors hover:border-line-strong"
                >
                  <img
                    src={location.image}
                    alt=""
                    className="h-20 w-24 flex-shrink-0 rounded-[4px] object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <strong className="text-[1.0625rem] font-semibold text-ivory">{item.short}</strong>
                    <span className="text-[0.875rem] leading-snug text-stone">{item.tagline}</span>
                  </span>
                  <DirectionalArrow size={17} className="flex-shrink-0 text-brass" />
                </button>
              );
            })}
          </div>
          <p className="mt-5 text-[0.8125rem] leading-relaxed text-stone">{dict.common.booking.note}</p>
        </>
      )}
    </dialog>
  );
}
