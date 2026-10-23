import { useEffect, useRef } from 'react';
import { Check, X } from 'lucide-react';
import { useDict } from '@/i18n/LocaleContext';
import { DirectionalArrow } from '@/components/ui/DirectionalArrow';

export function ConsentDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { dict } = useDict();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      dialog.querySelector<HTMLElement>('h2')?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function store(value: 'accepted' | 'rejected') {
    try {
      window.localStorage.setItem('leoz-consent', value);
    } catch {
      // Preference simply is not persisted when storage is unavailable.
    }
    onClose();
  }

  return (
    <dialog
      ref={ref}
      aria-label={dict.common.consent.aria}
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
        aria-label={dict.common.consent.close}
        onClick={onClose}
        className="absolute end-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-[8px] text-stone transition-colors hover:text-ivory"
      >
        <X size={22} aria-hidden="true" />
      </button>
      <p className="eyebrow">{dict.common.consent.eyebrow}</p>
      <h2 className="display-subtitle mt-3 pe-10" tabIndex={-1}>
        {dict.common.consent.title}
      </h2>
      <p className="mt-4 text-[1rem] leading-relaxed text-stone">{dict.common.consent.body}</p>
      <div className="mt-7 flex flex-wrap gap-3">
        <button type="button" className="btn btn-primary" onClick={() => store('accepted')}>
          {dict.common.consent.allow}
          <Check size={17} aria-hidden="true" />
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => store('rejected')}>
          {dict.common.consent.essential}
          <DirectionalArrow size={16} />
        </button>
      </div>
    </dialog>
  );
}
