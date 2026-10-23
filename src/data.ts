import servicesJson from '@data/services.json';
import locationsJson from '@data/locations.json';
import reviewsJson from '@data/reviews.json';

export type Service = {
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price: number | null;
  priceFrom: boolean;
  priceItem: string | null;
  currency: string;
  duration: number | null;
  branches: string[];
  verified: boolean;
  source: string;
};

export type Location = {
  id: string;
  name: string;
  eyebrow: string;
  tagline: string;
  description: string;
  image: string;
  address: string | null;
  phone: string | null;
  whatsappUrl: string | null;
  directionsUrl: string | null;
  bookingUrl: string | null;
  hours: string | null;
  verified: boolean;
  source: string;
};

export type ReviewSnapshot = {
  id: string;
  branchId: 'palm-jumeirah' | 'difc';
  branchName: string;
  rating: number;
  reviewCount: number;
  snapshotLabel: string;
  quote: string | null;
  reviewerName: string | null;
  reviewDate: string | null;
  sourceUrl: string | null;
  source: 'Google aggregate snapshot';
  integrationStatus: 'pending' | 'connected';
  verified: boolean;
};

export const services = servicesJson as Service[];
export const locations = locationsJson as Location[];
export const reviewSnapshots = reviewsJson as ReviewSnapshot[];

export const SERVICE_CATEGORIES = ['Hair', 'Beard', 'Rituals'] as const;

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getLocation(id: string): Location | undefined {
  return locations.find((location) => location.id === id);
}

export function getOtherLocation(id: string): Location | undefined {
  return locations.find((location) => location.id !== id);
}

export function getReviewSnapshot(branchId: ReviewSnapshot['branchId']): ReviewSnapshot {
  const snapshot = reviewSnapshots.find((review) => review.branchId === branchId);
  if (!snapshot) throw new Error(`Missing Google review snapshot for ${branchId}`);
  return snapshot;
}
