import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { cleanup, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router-dom';
import App from '@/App';

function LocationProbe() {
  const location = useLocation();
  return <output data-testid="location">{`${location.pathname}${location.search}${location.hash}`}</output>;
}

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
      <LocationProbe />
    </MemoryRouter>,
  );
}

describe('LEOZ Gents Salon Application', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders homepage under default locale /en', async () => {
    render(
      <MemoryRouter initialEntries={['/en']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getAllByText(/LEOZ/i).length).toBeGreaterThan(0);
    expect(document.documentElement.lang).toBe('en');
    expect(document.documentElement.dir).toBe('ltr');
  });

  it('sets RTL direction and Arabic language for /ar route', async () => {
    render(
      <MemoryRouter initialEntries={['/ar']}>
        <App />
      </MemoryRouter>,
    );

    expect(document.documentElement.lang).toBe('ar');
    expect(document.documentElement.dir).toBe('rtl');
  });

  it('renders Turkish homepage for /tr route', async () => {
    render(
      <MemoryRouter initialEntries={['/tr']}>
        <App />
      </MemoryRouter>,
    );

    expect(document.documentElement.lang).toBe('tr');
    expect(document.documentElement.dir).toBe('ltr');
  });

  it('contains the verified branches Palm Jumeirah and DIFC', async () => {
    render(
      <MemoryRouter initialEntries={['/en']}>
        <App />
      </MemoryRouter>,
    );

    const palmLinks = screen.getAllByText(/Palm Jumeirah/i);
    const difcLinks = screen.getAllByText(/DIFC/i);
    expect(palmLinks.length).toBeGreaterThan(0);
    expect(difcLinks.length).toBeGreaterThan(0);
  });

  it('preserves the current desktop route, search and hash when switching locale', async () => {
    const user = userEvent.setup();
    renderAt('/en/services?view=all#details');

    await user.click(screen.getByRole('button', { name: /choose language/i }));
    await user.click(screen.getByRole('menuitemradio', { name: 'العربية' }));

    await waitFor(() => {
      expect(screen.getByTestId('location')).toHaveTextContent('/ar/services?view=all#details');
      expect(document.documentElement.lang).toBe('ar');
      expect(document.documentElement.dir).toBe('rtl');
    });
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('preserves the current mobile route when switching locale from the open menu', async () => {
    const user = userEvent.setup();
    renderAt('/en/services');

    await user.click(screen.getByTestId('menu-open'));
    const menu = screen.getByRole('dialog', { name: /menu/i });
    await user.click(within(menu).getByRole('button', { name: 'Türkçe' }));

    await waitFor(() => {
      expect(screen.getByTestId('location')).toHaveTextContent('/tr/services');
      expect(document.documentElement.lang).toBe('tr');
      expect(document.documentElement.dir).toBe('ltr');
    });
    expect(screen.queryByRole('dialog', { name: /menu/i })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('preserves search and hash when redirecting an invalid locale', async () => {
    renderAt('/de/services?view=all#details');

    await waitFor(() => {
      expect(screen.getByTestId('location')).toHaveTextContent('/en/services?view=all#details');
    });
  });

  it('marks a navigation section active on detail routes and trailing slashes', () => {
    renderAt('/en/services/the-signature-cut/');
    expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('aria-current', 'page');
  });

  it('scrolls home to the top when the brand is selected on the same route', async () => {
    const user = userEvent.setup();
    const scrollTo = vi.spyOn(window, 'scrollTo');
    renderAt('/en');

    await user.click(screen.getAllByRole('link', { name: /Leoz Gents Salon — home/i })[0]);
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('closes the film preview with Escape and returns focus to its trigger', async () => {
    const user = userEvent.setup();
    renderAt('/en');
    const trigger = screen.getByRole('button', { name: 'WATCH FILM' });

    await user.click(trigger);
    expect(screen.getByRole('dialog', { name: 'LEOZ GENTS SALON' })).toBeInTheDocument();
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog', { name: 'LEOZ GENTS SALON' })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('answers verified Arabic review questions without opening booking escalation', async () => {
    const user = userEvent.setup();
    renderAt('/ar');
    await user.click(screen.getByRole('button', { name: /محادثة ليو كونسيرج/ }));
    const input = screen.getByRole('textbox', { name: /اكتب رسالة/ });
    await user.type(input, 'ما هو تقييم Google؟');
    await user.click(screen.getByRole('button', { name: /أرسل الرسالة/ }));

    expect(screen.queryByText(/اختر الفرع/)).not.toBeInTheDocument();
    expect(screen.getByRole('log')).toHaveTextContent(/Google/);
  });
});
