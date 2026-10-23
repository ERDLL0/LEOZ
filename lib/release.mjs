export function releaseBlockers({
  release = {},
  locations = [],
  services = [],
  barbers = [],
  reviews = [],
  site = null,
  membership = null,
  journal = [],
  media = [],
} = {}) {
  const blockers = [];
  for (const field of ['productionApproved', 'originalMediaApproved', 'arabicApproved', 'legalApproved', 'membershipApproved', 'analyticsConfigured']) {
    if (release[field] !== true) blockers.push(`Approval required: ${field}`);
  }
  try {
    if (new URL(release.domain).protocol !== 'https:') blockers.push('Production domain must use HTTPS');
  } catch { blockers.push('Verified production domain required'); }
  if (!site) {
    blockers.push('Site configuration record required');
  } else {
    if (!site.verified) blockers.push('site: canonical configuration requires approval (production origin, legal and social links)');
    if (site.productionOrigin && !/^https:\/\//.test(site.productionOrigin)) blockers.push('site: production origin must use HTTPS');
    if (release.domain && site.productionOrigin !== release.domain) blockers.push('site: production origin must match the approved release domain');
    for (const link of [...(site.legal ?? []), ...(site.social ?? [])]) {
      if (link.href && !link.href.startsWith('/') && !/^https:\/\//.test(link.href)) blockers.push(`site: invalid link destination ${link.href}`);
    }
    for (const link of site.social ?? []) {
      if (!/^https:\/\//.test(link.href ?? '')) blockers.push(`site: approved social destination required for ${link.label ?? 'unknown'}`);
    }
  }
  for (const location of locations) {
    if (!location.verified) blockers.push(`${location.id}: business record is unverified`);
    for (const field of ['address', 'phone', 'hours', 'bookingUrl', 'whatsappUrl', 'directionsUrl']) {
      if (!location[field]) blockers.push(`${location.id}: missing ${field}`);
    }
    for (const field of ['bookingUrl', 'whatsappUrl', 'directionsUrl']) {
      if (location[field] && !/^https:\/\//.test(location[field])) blockers.push(`${location.id}: invalid ${field}`);
    }
    if (location.verified && !location.verifiedAt) blockers.push(`${location.id}: verification date required`);
  }
  for (const service of services) {
    if (!service.verified || service.price === null || service.duration === null || !service.branches?.length) blockers.push(`${service.slug}: approved menu details required`);
    if (service.verified && !service.verifiedAt) blockers.push(`${service.slug}: verification date required`);
  }
  for (const barber of barbers) {
    if (!barber.verified || !barber.name || !barber.branchIds?.length) blockers.push(`${barber.id || barber.slug || 'barber'}: approved profile record required`);
    if (barber.verified && !barber.verifiedAt) blockers.push(`${barber.slug || barber.id}: verification date required`);
  }
  if (!barbers.length) blockers.push('Approved barber directory required');
  if (!reviews.length) blockers.push('Approved branch-attributed reviews required');
  if (!membership) {
    blockers.push('Membership programme record required');
  } else if (release.membershipApproved === true) {
    if (!membership.verified) blockers.push('membership: approved programme record required');
    if (!membership.terms) blockers.push('membership: approved terms required');
    if (!membership.benefits?.length) blockers.push('membership: approved benefits required');
    if (!/^https:\/\//.test(membership.interestUrl ?? '')) blockers.push('membership: valid HTTPS interest destination required');
  }
  for (const article of journal) {
    if (!article.verified) {
      blockers.push(`journal/${article.slug}: published draft requires approval, author and publication date`);
    } else {
      if (!article.author || !article.publishedAt) blockers.push(`journal/${article.slug}: author and publication date required`);
      if (!article.body?.length) blockers.push(`journal/${article.slug}: article body required`);
    }
  }
  if (!media.length) {
    blockers.push('Media registry required');
  } else if (release.originalMediaApproved === true) {
    for (const asset of media) {
      if (!asset.productionApproved) blockers.push(`media: ${asset.path} requires production approval`);
      if (!asset.rights) blockers.push(`media: ${asset.path} requires confirmed rights`);
    }
  }
  blockers.push('Release implementation review required: replace preview notices, approve editorial copy, publish verified schema/canonicals/hreflang and run live booking, accessibility and performance QA');
  return blockers;
}
