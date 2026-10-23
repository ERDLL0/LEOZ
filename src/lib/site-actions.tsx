import { createContext, useContext } from 'react';
import type { Location } from '@/data';

export type BookingAction = 'book' | 'whatsapp' | 'directions' | 'call';

export type BookingState = { action: BookingAction; branch?: string; service?: string } | null;

export type SiteActionsValue = {
  /** Opens a booking/contact flow, navigating to a verified destination when one exists. */
  open: (action?: BookingAction, branch?: string, service?: string) => void;
  selectLocation: (location: Location) => void;
  setBooking: (state: BookingState) => void;
  openConsent: () => void;
  markInterest: () => void;
  interest: boolean;
};

export const SiteActionsContext = createContext<SiteActionsValue | null>(null);

export function useSiteActions(): SiteActionsValue {
  const context = useContext(SiteActionsContext);
  if (!context) throw new Error('useSiteActions must be used inside SiteActionsContext');
  return context;
}
