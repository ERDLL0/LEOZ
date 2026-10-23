import record from './release.json';

export type ReleaseStatus = {
  productionApproved: boolean;
  domain: string | null;
  originalMediaApproved: boolean;
  arabicApproved: boolean;
  legalApproved: boolean;
  membershipApproved: boolean;
  analyticsConfigured: boolean;
};

export const release: ReleaseStatus = record;
