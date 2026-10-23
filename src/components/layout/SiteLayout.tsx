import { useCallback, useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { LocaleProvider, useLocale } from '@/i18n/LocaleContext';
import { type Locale } from '@/i18n/locale';
import { track } from '@/lib/analytics';
import { getLocation, type Location } from '@/data';
import { getDestination } from '@/lib/booking';
import { SiteActionsContext, type BookingAction, type BookingState, type SiteActionsValue } from '@/lib/site-actions';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileUtilities } from './MobileUtilities';
import { BookingDialog } from './BookingDialog';
import { ConsentDialog } from './ConsentDialog';
import { PageTransition } from './PageTransition';
import { GsapScrollExperience } from '@/components/motion/GsapScrollExperience';
import { LionConcierge } from '@/components/concierge';
import { HomePage } from '@/pages/HomePage';
import { LocationPage } from '@/pages/LocationPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { ServiceDetailPage } from '@/pages/ServiceDetailPage';
import { BarbersPage } from '@/pages/BarbersPage';
import { RitualPage } from '@/pages/RitualPage';
import { PrideClubPage } from '@/pages/PrideClubPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { BookPage } from '@/pages/BookPage';
import { JournalPage } from '@/pages/JournalPage';
import { JournalArticlePage } from '@/pages/JournalArticlePage';
import { LegalPage } from '@/pages/LegalPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export function SiteLayout({ locale }: { locale: Locale }) {
  const [booking, setBooking] = useState<BookingState>(null);
  const [consentOpen, setConsentOpen] = useState(false);
  const [interest, setInterest] = useState(false);

  const open = useCallback((action: BookingAction = 'book', branch?: string, service?: string) => {
    track(
      service
        ? 'service_book_click'
        : action === 'book'
          ? 'book_click'
          : action === 'whatsapp'
            ? 'whatsapp_click'
            : action === 'call'
              ? 'call_click'
              : 'directions_click',
      { branch: branch ?? 'unselected', ...(service ? { service } : {}) },
    );
    const location = branch ? getLocation(branch) : undefined;
    if (location) {
      try {
        window.sessionStorage.setItem('leoz-location', location.id);
      } catch {
        // Session memory is best-effort only.
      }
      track('book_location_selected', { branch: location.id, action });
    }
    const destination = getDestination(location, action);
    if (destination) window.location.assign(destination);
    else setBooking({ action, branch, service });
  }, []);

  const selectLocation = useCallback(
    (location: Location) => {
      const action = booking?.action ?? 'book';
      track('book_location_selected', { branch: location.id, action });
      try {
        window.sessionStorage.setItem('leoz-location', location.id);
      } catch {
        // Session memory is best-effort only.
      }
      const destination = getDestination(location, action);
      if (destination) window.location.assign(destination);
      else setBooking({ action, branch: location.id, service: booking?.service });
    },
    [booking],
  );

  const markInterest = useCallback(() => {
    track('pride_club_interest');
    setInterest(true);
  }, []);

  const value = useMemo<SiteActionsValue>(
    () => ({
      open,
      selectLocation,
      setBooking,
      openConsent: () => setConsentOpen(true),
      markInterest,
      interest,
    }),
    [open, selectLocation, markInterest, interest],
  );

  return (
    <LocaleProvider locale={locale}>
      <SiteActionsContext.Provider value={value}>
        <SiteChrome booking={booking} setBooking={setBooking} consentOpen={consentOpen} setConsentOpen={setConsentOpen} />
      </SiteActionsContext.Provider>
    </LocaleProvider>
  );
}

function SiteChrome({
  booking,
  setBooking,
  consentOpen,
  setConsentOpen,
}: {
  booking: BookingState;
  setBooking: Dispatch<SetStateAction<BookingState>>;
  consentOpen: boolean;
  setConsentOpen: (open: boolean) => void;
}) {
  const { dict, locale } = useLocale();
  const location = useLocation();
  const [mainElement, setMainElement] = useState<HTMLElement | null>(null);

  return (
    <>
      <a href="#main" className="skip-link">
        {dict.common.skipToContent}
      </a>
      <Navbar />
      <main ref={setMainElement} id="main" tabIndex={-1} className="pb-28 md:pb-0">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route index element={<HomePage />} />
              <Route path="palm-jumeirah" element={<LocationPage id="palm-jumeirah" />} />
              <Route path="difc" element={<LocationPage id="difc" />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="services/:slug" element={<ServiceDetailPage />} />
              <Route path="barbers" element={<BarbersPage />} />
              <Route path="the-ritual" element={<RitualPage />} />
              <Route path="pride-club" element={<PrideClubPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="book" element={<BookPage />} />
              <Route path="journal" element={<JournalPage />} />
              <Route path="journal/:slug" element={<JournalArticlePage />} />
              <Route path="privacy" element={<LegalPage kind="privacy" />} />
              <Route path="terms" element={<LegalPage kind="terms" />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <GsapScrollExperience root={mainElement} routeKey={location.pathname} locale={locale} />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <MobileUtilities />
      <LionConcierge />
      <BookingDialog
        booking={booking}
        onClose={() => setBooking(null)}
        onChooseAnother={() =>
          setBooking((current) => (current ? { action: current.action, service: current.service } : null))
        }
      />
      <ConsentDialog open={consentOpen} onClose={() => setConsentOpen(false)} />
    </>
  );
}
