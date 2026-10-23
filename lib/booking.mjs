export function isHttpsUrl(value) {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

export function resolveBranchId(route, rememberedId, locations) {
  const current = locations.find(location => location.id === route);
  if (current) return current.id;
  return locations.find(location => location.id === rememberedId)?.id;
}

export function getDestination(location, action) {
  if (!location?.verified) return null;
  const destination = action === 'book' ? location.bookingUrl : action === 'whatsapp' ? location.whatsappUrl : action === 'directions' ? location.directionsUrl : action === 'call' && location.phone ? `tel:${location.phone}` : null;
  if (!destination) return null;
  if (action === 'call') return /^tel:\+?[\d\s()-]+$/.test(destination) ? destination : null;
  try {
    const url = new URL(destination);
    return url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}
