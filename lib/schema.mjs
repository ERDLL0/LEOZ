import { absoluteUrl } from './seo.mjs';

export function localBusinessSchema(location, site) {
  if (!location?.verified || !location?.name || !location?.address || !location?.phone) return null;
  const url = absoluteUrl(site?.productionOrigin, location.id);
  if (!url) return null;
  const image = absoluteUrl(site?.productionOrigin, location.image);
  return {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    name: location.name,
    address: location.address,
    telephone: location.phone,
    url,
    ...(location.hours ? { openingHours: location.hours } : {}),
    ...(image ? { image } : {}),
  };
}

export function serviceSchema(service, site) {
  if (!service?.verified || !service?.name || !service?.description) return null;
  const url = absoluteUrl(site?.productionOrigin, `services/${service.slug}`);
  if (!url) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url,
  };
}

export function personSchema(barber, site) {
  if (!barber?.verified || !barber?.name || !barber?.biography || !barber?.slug) return null;
  const url = absoluteUrl(site?.productionOrigin, `barbers/${barber.slug}`);
  if (!url) return null;
  const image = absoluteUrl(site?.productionOrigin, barber.portrait);
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: barber.name,
    description: barber.biography,
    url,
    ...(image ? { image } : {}),
    ...(barber.specialties?.length ? { knowsAbout: barber.specialties } : {}),
  };
}

export function articleSchema(article, site) {
  if (!article?.verified || !article?.title || !article?.author || !article?.publishedAt) return null;
  const url = absoluteUrl(site?.productionOrigin, `journal/${article.slug}`);
  if (!url) return null;
  const image = absoluteUrl(site?.productionOrigin, article.image);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    datePublished: article.publishedAt,
    author: { '@type': 'Person', name: article.author },
    publisher: { '@type': 'Organization', name: site?.brandName || 'Leoz Gents Salon' },
    url,
    ...(image ? { image } : {}),
  };
}

export function pageSchema({ path, site, locations = [], services = [], barbers = [], journal = [] }) {
  if (!path) return null;
  const location = locations.find(item => item.id === path);
  if (location) return localBusinessSchema(location, site);
  if (path.startsWith('services/')) {
    const service = services.find(item => path === `services/${item.slug}`);
    return service ? serviceSchema(service, site) : null;
  }
  if (path.startsWith('barbers/')) {
    const barber = barbers.find(item => path === `barbers/${item.slug}`);
    return barber ? personSchema(barber, site) : null;
  }
  if (path.startsWith('journal/')) {
    const article = journal.find(item => path === `journal/${item.slug}`);
    return article ? articleSchema(article, site) : null;
  }
  return null;
}
