export type EventName = 'book_click' | 'book_location_selected' | 'service_book_click' | 'whatsapp_click' | 'call_click' | 'directions_click' | 'barber_profile_view' | 'pride_club_interest' | 'language_switch' | 'navigation_click';

export function track(event: EventName, context: Record<string, string> = {}) {
  const detail = { event, ...context };
  window.dispatchEvent(new CustomEvent('leoz:interaction', { detail }));
  if (localStorage.getItem('leoz-consent') !== 'accepted') return;
  const target = window as Window & { dataLayer?: Record<string, string>[] };
  target.dataLayer?.push(detail);
}
