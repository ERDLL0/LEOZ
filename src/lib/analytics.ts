export type EventName =
  | 'book_click'
  | 'book_location_selected'
  | 'service_book_click'
  | 'whatsapp_click'
  | 'call_click'
  | 'directions_click'
  | 'pride_club_interest'
  | 'language_switch'
  | 'navigation_click';

export function track(event: EventName, context: Record<string, string> = {}): void {
  const detail = { event, ...context };
  window.dispatchEvent(new CustomEvent('leoz:interaction', { detail }));
  try {
    if (window.localStorage.getItem('leoz-consent') !== 'accepted') return;
  } catch {
    return;
  }
  const target = window as Window & { dataLayer?: Record<string, string>[] };
  target.dataLayer?.push(detail);
}
