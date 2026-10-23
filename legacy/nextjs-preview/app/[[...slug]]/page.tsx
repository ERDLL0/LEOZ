import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Site from '@/components/site';
import services from '@/data/services.json';

const pages: Record<string, { title: string; description: string }> = {
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

for (const service of services) pages[`services/${service.slug}`] = { title: service.name, description: service.description };
for (const [slug, title] of [['a-better-barber-consultation', 'A better cut starts with a conversation.'], ['make-time-for-yourself', 'The art of making time for yourself.'], ['two-sides-of-dubai', 'One city. Two different rhythms.']]) pages[`journal/${slug}`] = { title, description: 'Editorial draft — notes from the Leoz journal.' };

export function generateStaticParams() {
  return Object.keys(pages).map(path => ({ slug: path ? path.split('/') : [] }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[(slug || []).join('/')];
  return page ? { title: page.title, description: page.description, openGraph: { title: `${page.title} | Leoz Gents Salon`, description: page.description, type: 'website' } } : {};
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const path = (slug || []).join('/');
  if (!pages[path]) notFound();
  return <Site path={path} />;
}
