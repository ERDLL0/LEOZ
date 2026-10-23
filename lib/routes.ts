import services from '@data/services.json';
import { barbers } from '@data/barbers';
import { journalArticles } from '@data/journal';

export type PageMeta = { title: string; description: string };

const staticPages: Record<string, PageMeta> = {
  '': { title: 'A Modern Gentleman’s Club', description: 'Discover the Leoz grooming experience. Palm Jumeirah and DIFC, Dubai.' },
  'palm-jumeirah': { title: 'Men’s Grooming in Palm Jumeirah', description: 'Discover the warmer side of Leoz Gents Salon on Palm Jumeirah. Explore the branch and plan your next visit.' },
  'difc': { title: 'Men’s Grooming in DIFC / Sky Gardens', description: 'Discover Leoz Gents Salon in DIFC / Sky Gardens. A focused grooming experience in the heart of your day.' },
  'services': { title: 'The Grooming Edit', description: 'Explore the illustrative Leoz grooming menu.' },
  'barbers': { title: 'Meet the Barbers', description: 'The people behind the Leoz craft. Approved team introductions coming soon.' },
  'pride-club': { title: 'The Pride Club', description: 'The next chapter of the Leoz experience.' },
  'journal': { title: 'The Gentleman’s Journal', description: 'Notes on grooming, personal style and making time for yourself.' },
  'book': { title: 'Claim Your Chair', description: 'Choose Palm Jumeirah or DIFC for your next Leoz experience.' },
  'contact': { title: 'Find Your Den', description: 'Explore the two Leoz locations in Dubai.' },
  'about': { title: 'Our Story', description: 'Enter The Den. Discover the Leoz Gents Salon experience.' },
  'the-ritual': { title: 'The Leoz Ritual', description: 'Consult. Craft. Finish. A considered approach to grooming.' },
  'privacy': { title: 'Privacy', description: 'Privacy information for the Leoz design preview.' },
  'terms': { title: 'Terms', description: 'Terms for the Leoz design preview.' },
  'ar': { title: 'ليوز جنتس صالون', description: 'نخلة جميرا ومركز دبي المالي العالمي. نسخة معاينة.' },
};

export function buildPageRoutes(): Record<string, PageMeta> {
  const pages: Record<string, PageMeta> = { ...staticPages };
  for (const service of services) pages[`services/${service.slug}`] = { title: service.name, description: service.description };
  for (const article of journalArticles) pages[`journal/${article.slug}`] = { title: article.title, description: article.verified ? 'Notes from the Leoz journal.' : 'Editorial draft — notes from the Leoz journal.' };
  for (const barber of barbers) pages[`barbers/${barber.slug}`] = { title: barber.name, description: barber.biography || `Book with ${barber.name} at Leoz Gents Salon.` };
  return pages;
}
