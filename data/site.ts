import config from './site.json';

export type NavLink = { label: string; href: string };

export type SiteConfig = {
  brandName: string;
  tagline: string;
  productionOrigin: string | null;
  navigation: NavLink[];
  menuNavigation: NavLink[];
  exploreLinks: NavLink[];
  worldLinks: NavLink[];
  legal: NavLink[];
  social: NavLink[];
  verified: boolean;
  source: string;
};

export const site: SiteConfig = config;
