import records from './locations.json';

export type Location = {
  id: string; name: string; eyebrow: string; tagline: string; description: string; image: string;
  address: string | null; phone: string | null; whatsappUrl: string | null;
  directionsUrl: string | null; bookingUrl: string | null; hours: string | null;
  verified: boolean; verifiedAt: string | null; source: string;
};

export const locations: Location[] = records;
