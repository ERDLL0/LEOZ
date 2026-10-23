import records from './barbers.json';

export type Barber = {
  id: string;
  slug: string;
  name: string;
  branchIds: string[];
  specialties: string[];
  languages: string[];
  biography: string | null;
  portrait: string | null;
  bookingUrl: string | null;
  verified: boolean;
  verifiedAt?: string | null;
  source: string | null;
};

export const barbers: Barber[] = records;
