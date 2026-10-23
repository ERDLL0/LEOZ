'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, CaretDown, Check, Crown, Diamond, GlobeHemisphereWest, List, MapPin, Scissors, ShieldCheck, WhatsappLogo, X } from '@phosphor-icons/react';
import { locations, type Location } from '@/data/locations';
import services from '@/data/services.json';
import barbers from '@/data/barbers.json';
import reviews from '@/data/reviews.json';
import journal from '@/data/journal.json';
import membership from '@/data/membership.json';
import { track } from '@/lib/analytics';
import { getDestination, resolveBranchId } from '@/lib/booking.mjs';

type Action = 'book' | 'whatsapp' | 'directions' | 'call';
type BookingState = { action: Action; branch?: string; service?: string } | null;
type Service = typeof services[number];
const Arrow = () => <ArrowRight className="directional-arrow" size={18} weight="light" aria-hidden="true" />;

function Brand() {
  return <Link href="/" className="brand" aria-label="LEOZ GENTS SALON home"><Image src="/images/lion.webp" width={60} height={68} alt="" /><span>LEOZ{' '}<small>GENTS SALON</small></span></Link>;
}

function Photo({ src, alt = '', className = '', priority = false, sizes = '100vw' }: { src: string; alt?: string; className?: string; priority?: boolean; sizes?: string }) {
  return <Image src={src} alt={alt} fill sizes={sizes} className={`photo ${className}`} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />;
}

function SectionTitle({ label, title, href, link }: { label: string; title: string; href?: string; link?: string }) {
  return <div className="section-heading"><div><p className="eyebrow">{label}</p><h2>{title}</h2></div>{href && <Link className="text-link" href={href}>{link}<Arrow /></Link>}</div>;
}

const translations = {
  en: {
    brand: 'LEOZ GENTS SALON',
    navLocations: 'Locations',
    navServices: 'Services',
    navBarbers: 'Barbers',
    navRitual: 'The ritual',
    navPrideClub: 'Pride Club',
    navJournal: 'Journal',
    cta: 'Claim your chair',
    book: 'Book',
    whatsapp: 'WhatsApp',
    directions: 'Directions',
    call: 'Call',
    viewProfile: 'View profile',
    viewAllServices: 'View all services',
    meetTheTeam: 'Meet the team',
    discoverTheClub: 'Discover the club',
    exploreTheJournal: 'Explore the journal',
    backHome: 'Home',
    en: 'EN',
    ar: 'العربية',
    skip: 'Skip to content',
    locations: 'LOCATIONS',
    explore: 'EXPLORE',
    worldOfLeoz: 'THE WORLD OF LEOZ',
    ourStory: 'Our story',
    contact: 'Contact',
    privacy: 'Privacy',
    terms: 'Terms',
    cookieSettings: 'Cookie settings',
    english: 'English',
    arabic: 'العربية',
    yourNextChapter: 'Your next chapter starts in the chair.',
    previewDisclosure: 'DESIGN PREVIEW · Concept artwork, illustrative menu and editorial drafts. Business details and booking links await approval.',
    stagingLabel: 'STAGING PREVIEW · PLACEHOLDER PHOTOGRAPHY',
    welcomeToTheDen: 'Welcome to the den.',
    aModernGentlemansClub: "A modern gentleman's club.",
    palmJumeirahDubai: 'Palm Jumeirah · DIFC · Dubai',
    bookingDialogTitle: 'Your Leoz experience',
    bookingDialogIntro: 'Two settings. One Leoz.',
    chooseAnotherLocation: 'Choose another location',
    previewOnly: 'Preview only · Approved booking links pending.',
    bookingUnavailable: 'Booking opens after verification.',
    contactDetailsVerifying: 'Contact details are being verified.',
    privacyPreferences: 'Privacy preferences',
    allowAnalytics: 'Allow analytics',
    essentialOnly: 'Essential only',
    yourPreferences: 'Your preferences',
    aLittlePrivacy: 'A little privacy.',
    previewStoresBranch: 'This preview stores your selected branch for the session. Optional analytics are off unless you allow them. No analytics provider is currently connected.',
    closeNavigation: 'Close navigation',
    mobileUtilitiesBook: 'Book',
    mobileUtilitiesWhatsapp: 'WhatsApp',
    mobileUtilitiesDirections: 'Directions',
    eyebrowHero: 'DUBAI · LEOZ GENTS SALON',
    titleHero: 'A modern gentleman’s club.',
    descriptionHero: 'Exceptional grooming.<br />A higher standard.',
    locationsHero: 'PALM JUMEIRAH · DIFC',
    discoverYourDen: 'DISCOVER YOUR DEN',
    warmTimelessRefined: 'WARM. TIMELESS. REFINED.',
    conceptPhotography: 'CONCEPT PHOTOGRAPHY',
    trustTwoLocations: 'TWO DUBAI LOCATIONS',
    trustGrooming: 'THE ART OF GROOMING',
    trustPeopleCraft: 'PEOPLE & CRAFT',
    trustRitual: 'THE LEOZ RITUAL',
    trustPrideClub: 'THE PRIDE CLUB',
    eyebrowLocations: 'ONE STANDARD. TWO DISTINCT SETTINGS.',
    titleLocations: 'Choose your den.',
    linkLocations: 'Explore locations',
    eyebrowServices: 'CONSIDERED, DOWN TO THE DETAIL',
    titleServices: 'Signature grooming.',
    linkServices: 'View all services',
    eyebrowTeam: 'MASTER BARBERS · THE PEOPLE BEHIND THE CRAFT',
    titleTeam: 'Meet the team.',
    linkTeam: 'View all barbers',
    eyebrowReviews: 'CLIENT REVIEWS',
    titleReviews: 'Words from the chair.',
    eyebrowRitual: 'MORE THAN A MOMENT IN THE CHAIR',
    titleRitual: 'The Leoz ritual.',
    linkRitual: 'Discover the ritual',
    eyebrowPrideClub: 'A PLACE TO BELONG',
    titlePrideClub: 'The Pride Club.',
    eyebrowJournal: 'NOTES FROM THE DEN',
    titleJournal: "The gentleman's journal.",
    linkJournal: 'Explore the journal',
    ritualConsult: '01 · CONSULT',
    ritualCraft: '02 · CRAFT',
    ritualFinish: '03 · FINISH',
    spaceBannerEyebrow: 'WELCOME TO THE DEN',
    spaceBannerTitle: 'A space to call your own.',
    spaceBannerText: 'Warm textures. Considered details.<br />A different rhythm.',
    spaceBannerLink: 'Step inside',
    branchPageHeroDifc: 'Your city. Your rhythm.',
    branchPageHeroPalm: 'A moment, just for you.',
    branchPageBook: 'Book {name}',
    branchPageFindUs: 'Find us',
    branchPageHours: 'Opening hours',
    branchPagePlanVisit: 'PLAN YOUR VISIT',
    branchPageBeforeArrive: 'Before you arrive',
    branchPageBookHow: 'How do I book this location?',
    branchPageBookAnswer: 'The approved booking destination will appear here once confirmed.',
    servicePageTitle: 'Your look. Considered.',
    servicePageText: 'Discover the details that make a difference.',
    servicePageFilterAll: 'All',
    servicePageFilterHair: 'Hair',
    servicePageFilterBeard: 'Beard',
    servicePageFilterRituals: 'Rituals',
    servicePageIntro: 'Illustrative service concepts. The approved menu, prices, durations and branch availability are coming soon.',
    servicePagePrice: 'Price',
    servicePageDuration: 'Duration',
    servicePageLocations: 'Locations',
    servicePagePriceAwaiting: 'Awaiting approval',
    servicePageDurationAwaiting: 'Awaiting approval',
    servicePageLocationsAwaiting: 'To be confirmed',
    servicePageConceptNotice: 'Service concept only. This preview does not confirm availability.',
    servicePageBookLabel: 'Choose your location',
    barbersPageTitle: 'Meet your next barber.',
    barbersPageText: 'A conversation. A fresh perspective. A look that feels like you.',
    barbersPageComing: "We're preparing the team introductions. Names, portraits and branch assignments will appear after approval.",
    barbersPageBookLabel: 'Explore booking',
    pridePageTitle: 'The Pride Club.',
    pridePageText: 'A closer connection to the Leoz experience.',
    pridePageEyebrow: 'THE NEXT CHAPTER',
    pridePageHeading: 'Some things are worth belonging to.',
    pridePageBody: 'The club is taking shape. Membership details and benefits will be shared once confirmed.',
    pridePageButton: 'Keep me in the loop',
    pridePageInterest: 'The interest list isn’t open yet. No personal details have been collected. Please check back for the approved programme.',
    journalPageTitle: 'A considered life.',
    journalPageText: 'Conversations on grooming, personal style and making time for yourself.',
    contactPageTitle: 'Let’s make it personal.',
    contactPageText: 'Palm Jumeirah or DIFC. Start with your location.',
    contactPageContact: 'Contact this location',
    contactPageAddressAwaiting: 'Address awaiting verification.',
    contactPageHoursAwaiting: 'Opening hours awaiting verification.',
    aboutPageTitle: 'A higher standard.',
    aboutPageText: 'A considered approach, from the first conversation to the final detail.',
    ritualPageTitle: 'Consult. Craft. Finish.',
    ritualPageText: 'A considered approach, from the first conversation to the final detail.',
    ritualConsultCopy: 'Start with a conversation. Your look, your routine, your point of view.',
    ritualCraftCopy: 'Make room for the details. Shape, texture and the way it all comes together.',
    ritualFinishCopy: 'A final look. A fresh perspective. Ready for whatever comes next.',
    privacyTitle: 'Your privacy.',
    privacyBody: 'This local website is a design preview. It cannot submit appointments, payments or membership registrations.<p>Optional analytics consent and your chosen location are stored in this browser. No external analytics provider is connected. Concept imagery and illustrative content are pending approval.<p>Approved business policies must replace this preview notice before release.',
    termsTitle: 'Terms of use.',
    termsBody: 'This local website is a design preview. It cannot submit appointments, payments or membership registrations.<p>Optional analytics consent and your chosen location are stored in this browser. No external analytics provider is connected. Concept imagery and illustrative content are pending approval.<p>Approved business policies must replace this preview notice before release.',
  },
  ar: {
    brand: 'ليوز جنتس صالون',
    navLocations: 'المواقع',
    navServices: 'الخدمات',
    navBarbers: 'الحلاقون',
    navRitual: 'طقوس العناية',
    navPrideClub: 'نادي الفخر',
    navJournal: 'اليوميات',
    cta: 'احجز مقعدك',
    book: 'احجز',
    whatsapp: 'واتساب',
    directions: 'الاتجاهات',
    call: 'اتصل',
    viewProfile: 'عرض الملف الشخصي',
    viewAllServices: 'عرض جميع الخدمات',
    meetTheTeam: 'تعرف على الفريق',
    discoverTheClub: 'اكتشف النادي',
    exploreTheJournal: 'استكشف اليوميات',
    backHome: 'الرئيسية',
    en: 'EN',
    ar: 'العربية',
    skip: 'انتقل إلى المحتوى',
    locations: 'المواقع',
    explore: 'استكشف',
    worldOfLeoz: 'عالم ليوز',
    ourStory: 'قصتنا',
    contact: 'اتصل بنا',
    privacy: 'الخصوصية',
    terms: 'الشروط',
    cookieSettings: 'إعدادات الكوكيز',
    english: 'الإنجليزية',
    arabic: 'العربية',
    yourNextChapter: 'الفصل التالي يبدأ في الكرسي.',
    previewDisclosure: 'معاينة تصميم · أعمال فنية مفهومية وقوائم توضيحية ومقالات تحريرية. تفاصيل العمل وروابط الحجز في انتظار الموافقة.',
    stagingLabel: 'معاينة تجريبية · صور مكانية مؤقتة',
    welcomeToTheDen: 'مرحباً بك في الدن.',
    aModernGentlemansClub: 'نادي رجل عصري.',
    palmJumeirahDubai: 'نخلة جميرا · مركز دبي المالي العالمي · دبي',
    bookingDialogTitle: 'تجربتك في ليوز',
    bookingDialogIntro: 'إعدادان. ليوز واحد.',
    chooseAnotherLocation: 'اختر موقعاً آخر',
    previewOnly: 'معاينة فقط · روابط الحجز المعتمدة قيد الانتظار.',
    bookingUnavailable: 'الحجز يُفتح بعد التحقق.',
    contactDetailsVerifying: 'تفاصيل الاتصال قيد التحقق.',
    privacyPreferences: 'تفضيلات الخصوصية',
    allowAnalytics: 'السماح بالتحليلات',
    essentialOnly: 'أساسي فقط',
    yourPreferences: 'تفضيلاتك',
    aLittlePrivacy: 'خصوصية بسيطة.',
    previewStoresBranch: 'هذه المعاينة تخزن موقعك المختار للجلسة. التحليلات الاختيارية مغلقة ما لم تسمح بها. لا يوجد مزود تحليلات متصل حالياً.',
    closeNavigation: 'إغلاق القائمة',
    mobileUtilitiesBook: 'احجز',
    mobileUtilitiesWhatsapp: 'واتساب',
    mobileUtilitiesDirections: 'الاتجاهات',
    eyebrowHero: 'دبي · ليوز جنتس صالون',
    titleHero: 'نادي رجل عصري.',
    descriptionHero: 'عناية استثنائية.<br />معيار أعلى.',
    locationsHero: 'نخلة جميرا · مركز دبي المالي العالمي',
    discoverYourDen: 'اكتشف مكانك.',
    warmTimelessRefined: 'دافئ. خالد. راق.',
    conceptPhotography: 'التصوير المفهوم.',
    trustTwoLocations: 'موقعتان في دبي.',
    trustGrooming: 'فن العناية.',
    trustPeopleCraft: 'الأشخاص والحرفة.',
    trustRitual: 'طقوس ليوز.',
    trustPrideClub: 'نادي الفخر.',
    eyebrowLocations: 'معيار واحد. مكانان مميزان.',
    titleLocations: 'اختر مكانك.',
    linkLocations: 'استكشف المواقع.',
    eyebrowServices: 'متأمل، حتى التفصيل.',
    titleServices: 'التوقيع على العناية.',
    linkServices: 'عرض جميع الخدمات.',
    eyebrowTeam: 'حلاقو الأساتذة · الأشخاص وراء الحرفة.',
    titleTeam: 'تعرف على الفريق.',
    linkTeam: 'عرض جميع الحلاقين.',
    eyebrowReviews: 'آراء العملاء.',
    titleReviews: 'كلمات من الكرسي.',
    eyebrowRitual: 'أكثر من لحظة في الكرسي.',
    titleRitual: 'طقوس ليوز.',
    linkRitual: 'اكتشف الطقس.',
    eyebrowPrideClub: 'مكان للانتماء.',
    titlePrideClub: 'نادي الفخر.',
    eyebrowJournal: 'ملاحظات من الدن.',
    titleJournal: 'يوميات الرجل الأنيق.',
    linkJournal: 'استكشف اليوميات.',
    ritualConsult: '01 · الاستشارة.',
    ritualCraft: '02 · التنفيذ.',
    ritualFinish: '03 · اللمسة الأخيرة.',
    spaceBannerEyebrow: 'مرحباً في الدن.',
    spaceBannerTitle: 'مكان تدعوه ملكك.',
    spaceBannerText: 'أنسجة دافئة. تفاصيل متأملة.<br />إيقاع مختلف.',
    spaceBannerLink: 'ادخل.',
    branchPageHeroDifc: 'مدينتك. إيقاعك.',
    branchPageHeroPalm: 'لحظة، فقط لك.',
    branchPageBook: 'احجز {name}',
    branchPageFindUs: 'أين تجدنا.',
    branchPageHours: 'ساعات العمل.',
    branchPagePlanVisit: 'خطط لزيارتك.',
    branchPageBeforeArrive: 'قبل الوصول.',
    branchPageBookHow: 'كيف أحجز هذا الموقع؟.',
    branchPageBookAnswer: 'سيظهر وجهة الحجز المعتمدة هنا بمجرد التأكيد.',
    servicePageTitle: 'مظهرك. متأمل.',
    servicePageText: 'اكتشف التفاصيل التي تصنع الفرق.',
    servicePageFilterAll: 'الجميع.',
    servicePageFilterHair: 'الشعر.',
    servicePageFilterBeard: 'اللحية.',
    servicePageFilterRituals: 'طقوس العناية.',
    servicePageIntro: 'مفاهيم خدمة توضيحية. القائمة المعتمدة والأسعار والمدة وتوافر الفروع قادمة قريباً.',
    servicePagePrice: 'السعر.',
    servicePageDuration: 'المدة.',
    servicePageLocations: 'الفروع.',
    servicePagePriceAwaiting: 'في انتظار الموافقة.',
    servicePageDurationAwaiting: 'في انتظار الموافقة.',
    servicePageLocationsAwaiting: 'سيتم التأكيد لاحقاً.',
    servicePageConceptNotice: 'مفهوم خدمة توضيحي فقط. هذه المعاينة لا تؤكد التوفر.',
    servicePageBookLabel: 'اختر موقعك.',
    barbersPageTitle: 'تعرف على الحلاق التالي.',
    barbersPageText: 'محادثة. منظور جديد. مظهر يشعرك بك.',
    barbersPageComing: "نعدdef introductions 팀. الأسماء والصور وتخصيصات الفروع ستظهر بعد الموافقة.",
    barbersPageBookLabel: 'استكشف الحجز.',
    pridePageTitle: 'نادي الفخر.',
    pridePageText: 'صلة أوثق بتجربة ليوز.',
    pridePageEyebrow: 'الفصل التالي.',
    pridePageHeading: 'بعض الأمور تستحق الانتماء.',
    pridePageBody: 'النادي يتشكل. تفاصيل العضوية والمزايا ستشارك بمجرد التأكيد.',
    pridePageButton: 'ابق على تواصل.',
    pridePageInterest: 'قائمة الاهتمام ليست مفتوحة بعد. لم يتم جمع أي تفاصيل شخصية. يرجى العودة للبرنامج المعتمد.',
    journalPageTitle: 'حياة متأملة.',
    journalPageText: 'محادثات عن العناية، الأسلوب الشخصي وإيجاد الوقت لنفسك.',
    contactPageTitle: 'لن نجعلها شخصية.',
    contactPageText: 'نخلة جميرا أو مركز دبي المالي العالمي. ابدأ بموقعك.',
    contactPageContact: 'اتصل بهذا الموقع.',
    contactPageAddressAwaiting: 'العنوان في انتظار التحقق.',
    contactPageHoursAwaiting: 'ساعات العمل في انتظار التحقق.',
    aboutPageTitle: 'معيار أعلى.',
    aboutPageText: 'نهج متأمل، من المحادثة الأولى إلى التفاصيل النهائية.',
    ritualPageTitle: 'استشر. صمم. أنهِ.',
    ritualPageText: 'نهج متأمل، من المحادثة الأولى إلى التفاصيل النهائية.',
    ritualConsultCopy: 'ابدأ بمحادثة. مظهرك، روتينك، وجهات نظرك.',
    ritualCraftCopy: 'أفسح مكاناً للتفاصيل. الشكل، الملمس وكيف يتحد كل شيء.',
    ritualFinishCopy: 'مظهر نهائي. منظور جديد. مستعد لأي شيء يأتي بعد.',
    privacyTitle: 'خصوصيتك.',
    privacyBody: 'هذا الموقع المحلي هو معاينة تصميم. لا يمكنه إرسال مواعيد أو مدفوعات أو تسجيلات عضوية.<p>موافقة التحليلات الاختيارية وموقعك المختار مخزنة في هذا المتصفح. لا يوجد مزود تحليلات خارجي متصل. الصور المفهومة والمحتوى التوضيحي في انتظار الموافقة.<p>يجب استبدال إشعار المعاينة هذا بسياسات أعمال معتمدة قبل الإطلاق.',
    termsTitle: 'شروط الاستخدام.',
    termsBody: 'هذا الموقع المحلي هو معاينة تصميم. لا يمكنه إرسال مواعيد أو مدفوعات أو تسجيلات عضوية.<p>موافقة التحليلات الاختيارية وموقعك المختار مخزنة في هذا المتصفح. لا يوجد مزود تحليلات خارجي متصل. الصور المفهومة والمحتوى التوضيحي في انتظار الموافقة.<p>يجب استبدال إشعار المعاينة هذا بسياسات أعمال معتمدة قبل الإطلاق.',
  },
};

export const articles = [
  { slug: 'a-better-barber-consultation', category: 'THE DETAILS', title: 'A better cut starts with a conversation.', image: '/images/craft.webp', body: ['Bring a reference, but bring your routine too. How you wear your hair on an ordinary morning is as useful as a photograph of how you want it to look.', 'Talk about what you want to keep, what you want to change, and how much time you want to spend styling. A clear conversation gives your barber a useful starting point.', 'Before you leave, ask how to recreate the finish. The right questions can help make your next appointment more considered.'] },
  { slug: 'make-time-for-yourself', category: 'THE RITUAL', title: 'The art of making time for yourself.', image: '/images/ritual.webp', body: ['A grooming appointment can be a small pause in a busy day. Put it in the calendar with the same intention as anything else that deserves your attention.', 'Think about what you want from the visit before you arrive. A simple refresh and a complete change start with different conversations.', 'Choose a rhythm that works for your look and your routine. Consistency starts with something you can make time for.'] },
  { slug: 'two-sides-of-dubai', category: 'THE CITY', title: 'One city. Two different rhythms.', image: '/images/palm.webp', body: ['Palm Jumeirah and DIFC give the Leoz experience two distinct settings. The creative direction for Palm is warm and unhurried; DIFC takes on a more architectural, focused mood.', 'Explore each location page to find your preferred setting. Confirm the approved branch details and booking options before planning your visit.'] },
];

type SiteActions = {
  open: (action?: Action, branch?: string, service?: string) => void;
  selectLocation: (location: Location) => void;
  setBooking: (value: BookingState) => void;
  arabic: boolean;
  route: string;
  filter: string;
  setFilter: (value: string) => void;
  interest: boolean;
  setInterest: (value: boolean) => void;
  setConsent: (value: boolean) => void;
};
const SiteContext = createContext<SiteActions | null>(null);
function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error('Site controls require SiteContext');
  return context;
}

function BookButton({ branch, service, label = 'Claim your chair', secondary = false }: { branch?: string; service?: string; label?: string; secondary?: boolean }) {
  const { open } = useSite();
  return <button className={`button ${secondary ? 'button-outline' : ''}`} onClick={() => open('book', branch, service)}>{label}<Arrow /></button>;
}

function LocationCards() {
  return <div className="location-grid">{locations.map((location, index) => <article className={`location-card location-${location.id}`} key={location.id}>
    <Photo src={location.image} alt={`Concept cityscape for ${location.name}`} sizes="(max-width: 600px) 100vw, 45vw" />
    <div className="location-top"><span className="eyebrow">0{index + 1} / DUBAI</span><span className="location-symbol"><MapPin size={22} weight="light" /></span></div>
    <div className="location-copy"><h3>{location.name}</h3><p>{location.tagline}</p><Link className="button" href={`/${location.id}`}>Explore {index === 0 ? 'the Palm' : 'DIFC'}<Arrow /></Link></div>
  </article>)}</div>;
}

function ServiceCard({ service }: { service: Service }) {
  const { open, route } = useSite();
  return <article className="service-card"><Link href={`/services/${service.slug}`} className="service-image"><Photo src={service.image} alt={`Concept artwork: ${service.name}`} sizes="(max-width: 600px) 106px, (max-width: 900px) 40vw, 30vw" /><span className="image-arrow"><ArrowUpRight size={20} /></span></Link><div className="service-details"><Link href={`/services/${service.slug}`}><h3>{service.name}</h3></Link><p>{service.description}</p><div className="service-meta"><span>{service.price !== null ? `AED ${service.price}` : '—'} · {service.duration !== null ? `${service.duration} min` : '—'}</span><button aria-label={`View booking for ${service.name}`} onClick={() => open('book', locations.find(location => location.id === route)?.id, service.slug)}><Arrow /></button></div></div></article>;
}

function Journal({ arabic }: { arabic?: boolean }) {
  const t = translations[arabic ? 'ar' : 'en'];
  return <section className="section journal"><SectionTitle label={t.eyebrowJournal} title={t.titleJournal} href="/journal" link={t.linkJournal} /><div className="journal-grid">{journal.map(article => <Link className="journal-card" href={`/journal/${article.slug}`} key={article.slug}><div className="journal-image"><Photo src={article.image} sizes="(max-width: 600px) 100vw, 30vw" /></div><p className="eyebrow">{article.category} <span>· EDITORIAL DRAFT</span></p><h3>{article.title}<ArrowUpRight size={22} /></h3></Link>)}</div></section>;
}

function Pride({ arabic }: { arabic?: boolean }) {
  const t = translations[arabic ? 'ar' : 'en'];
  return <section className="pride-banner"><Photo src="/images/club.webp" /><div><p className="eyebrow">{t.eyebrowPrideClub}</p><h2>{membership.name}.</h2><p>{membership.description}</p><Link className="button button-outline" href={membership.interestUrl || '/pride-club'}>{t.discoverTheClub}<Arrow /></Link></div></section>;
}

function branchNames(ids: string[]) {
  return ids.map(id => locations.find(l => l.id === id)?.name || id).join(' · ');
}

function BarberCard({ barber }: { barber: typeof barbers[number] }) {
  return <article className="barber-card"><div className="barber-photo"><Photo src={barber.portrait} alt={`Portrait of ${barber.name} — concept placeholder` } sizes="(max-width: 600px) 100vw, 28vw" /><span className="barber-status">{barber.verified ? '' : 'APPROVAL PENDING'}</span></div><div className="barber-copy"><h3>{barber.name}</h3><p className="eyebrow">{branchNames(barber.branchIds)}</p><p>{barber.specialties.join(' · ')}</p>{barber.languages && barber.languages.length > 0 && <span className="barber-languages">{barber.languages.join(' · ')}</span>}<Link href={`/barbers/${barber.slug}`} className="text-link">View profile<Arrow /></Link></div></article>;
}

function Team({ arabic }: { arabic?: boolean }) {
  const t = translations[arabic ? 'ar' : 'en'];
  return <section className="section team-section"><SectionTitle label={t.eyebrowTeam} title={t.titleTeam} href="/barbers" link={t.linkTeam} /><div className="barbers-grid">{barbers.map(barber => <BarberCard key={barber.slug} barber={barber} />)}</div>{barbers.every(b => !b.verified) && <p className="section-footnote">Staff profiles are staging placeholders. Approved portraits and biographies will appear after verification.</p>}</section>;
}

function ReviewCard({ review }: { review: typeof reviews[number] }) {
  const location = locations.find(l => l.id === review.branchId);
  return <article className="review-card"><blockquote>{review.quote}</blockquote><footer><strong>{review.attribution}</strong>{location && <span> · {location.name}</span>}<span className="review-status">{review.verified ? '' : 'SOURCE PENDING'}</span></footer></article>;
}
function Home({ arabic }: { arabic?: boolean }) {
  const t = translations[arabic ? 'ar' : 'en'];
  return <>
    <section className="hero"><video className="hero-video" autoPlay loop muted playsInline poster="/images/interior.webp" /><div className="hero-shade" /><div className="hero-content"><p className="eyebrow hero-eyebrow"><span />{t.eyebrowHero}</p><h1>A modern<br />gentleman’s<br /><em>club.</em></h1><p className="hero-description" dangerouslySetInnerHTML={{ __html: t.descriptionHero }} /><p className="hero-locations">{t.locationsHero}</p><BookButton /></div><div className="hero-bottom"><a href="#locations" className="hero-explore">{t.discoverYourDen} <CaretDown size={16} /></a><span>{t.warmTimelessRefined}</span><span className="concept-label">{t.conceptPhotography}</span></div></section>
    <section className="trust-strip" aria-label="Explore Leoz"><Link href="#locations"><MapPin /><span>{t.trustTwoLocations}</span></Link><Link href="/services"><Scissors /><span>{t.trustGrooming}</span></Link><Link href="/barbers"><ShieldCheck /><span>{t.trustPeopleCraft}</span></Link><Link href="/the-ritual"><Diamond /><span>{t.trustRitual}</span></Link><Link href="/pride-club"><Crown /><span>{t.trustPrideClub}</span></Link></section>
    <section className="section locations-section" id="locations"><SectionTitle label={t.eyebrowLocations} title={t.titleLocations} href="/contact" link={t.linkLocations} /><LocationCards /></section>
    <section className="section services-section"><SectionTitle label={t.eyebrowServices} title={t.titleServices} href="/services" link={t.linkServices} /><div className="services-grid">{services.slice(0, 4).map(service => <ServiceCard key={service.slug} service={service} />)}</div><p className="section-footnote">Illustrative menu · Services, availability and prices pending verification.</p></section>
    <section className="ritual-banner"><Photo src="/images/ritual.webp" /><div><p className="eyebrow">{t.eyebrowRitual}</p><h2>{t.titleRitual}</h2><div className="ritual-steps"><span>{t.ritualConsult}</span><Arrow /><span>{t.ritualCraft}</span><Arrow /><span>{t.ritualFinish}</span></div><Link href="/the-ritual" className="text-link">{t.linkRitual}<Arrow /></Link></div></section>
    <Team arabic={arabic} />
    <section className="brand-statement reviews-section" aria-labelledby="reviews-title"><p className="eyebrow">{t.eyebrowReviews}</p><h2 id="reviews-title">{t.titleReviews}</h2><div className="reviews-grid">{reviews.map(review => <ReviewCard key={review.id} review={review} />)}</div>{reviews.every(r => !r.verified) && <p className="section-footnote">Client stories are staging placeholders. Approved reviews with source attribution will appear after verification.</p>}</section>
    <section className="space-banner"><Photo src="/images/interior.webp" /><div><p className="eyebrow">{t.spaceBannerEyebrow}</p><h2 dangerouslySetInnerHTML={{ __html: t.spaceBannerTitle }} /><p dangerouslySetInnerHTML={{ __html: t.spaceBannerText }} /><Link href="/about" className="button button-outline">{t.spaceBannerLink}<Arrow /></Link></div></section>
    <Pride arabic={arabic} /><Journal arabic={arabic} />
  </>;
}

function PageHero({ title, label, text, image }: { title: string; label: string; text?: string; image?: string }) {
  return <section className={`page-hero ${image ? 'with-image' : ''}`}>{image && <><Photo src={image} priority /><div className="page-shade" /></>}<div className="page-hero-content"><Link className="breadcrumb" href="/">Home <span>/</span></Link><p className="eyebrow">{label}</p><h1>{title}</h1>{text && <p>{text}</p>}</div></section>;
}

function BranchPage({ location }: { location: Location }) {
  const { open, arabic } = useSite();
  const t = translations[arabic ? 'ar' : 'en'];
  return <><PageHero label={location.eyebrow} title={location.id === 'difc' ? t.branchPageHeroDifc : t.branchPageHeroPalm} text={location.description} image={location.image} /><section className="branch-summary section"><div><p className="eyebrow">LEOZ GENTS SALON · {location.name.toUpperCase()}</p><h2>{location.tagline}</h2><BookButton branch={location.id} label={t.branchPageBook.replace('{name}', location.name)} /></div><div className="branch-facts"><div><MapPin /><span><strong>{t.branchPageFindUs}</strong>{location.address || 'Exact address awaiting verification'}</span></div><div><GlobeHemisphereWest /><span><strong>{t.branchPageHours}</strong>{location.hours || 'Opening hours awaiting verification'}</span></div><div className="branch-actions"><button onClick={() => open('directions', location.id)}>{t.mobileUtilitiesDirections}<ArrowUpRight /></button><button onClick={() => open('whatsapp', location.id)}>{t.mobileUtilitiesWhatsapp}<ArrowUpRight /></button><button onClick={() => open('call', location.id)}>{t.call}<ArrowUpRight /></button></div></div></section><section className="section services-section"><SectionTitle label={`AT ${location.name.toUpperCase()}`} title="Find your ritual." /><p className="intro-note">This is an illustrative menu. Branch availability, prices and durations are awaiting approval.</p><div className="services-grid">{services.slice(0, 4).map(service => <ServiceCard key={service.slug} service={service} />)}</div></section><section className="section branch-notes"><div><p className="eyebrow">PLAN YOUR VISIT</p><h2>{location.id === 'difc' ? 'In the heart of your day.' : 'Make room for a slower moment.'}</h2><p>{location.id === 'difc' ? 'Choose the DIFC / Sky Gardens location for the sharper, architectural side of Leoz. Booking and arrival details will appear here once verified.' : 'Choose Palm Jumeirah for the warmer, more relaxed side of Leoz. Verified arrival information will help you plan your first visit.'}</p></div><div><h3>Before you arrive</h3><details><summary>How do I book this location?</summary><p>The approved {location.name} booking link is pending. This preview cannot accept appointments.</p></details><details><summary>Where can I find the current menu?</summary><p>The branch-specific menu will be shown once its services, prices and durations are verified.</p></details></div></section><section className="section"><SectionTitle label="THE PEOPLE & THE EXPERIENCE" title="A personal introduction." /><p className="intro-note">Verified {location.name} barber profiles and attributed client reviews are awaiting approval.</p></section></>;
}

function BookingPage() {
  const { setBooking, selectLocation } = useSite();
  return <><PageHero label="YOUR NEXT CHAPTER STARTS HERE" title="Claim your chair." text="Two locations. One considered experience. Choose your Leoz." /><section className="section booking-page"><div className="booking-location-grid">{locations.map(location => <button className="booking-location" key={location.id} onClick={() => { setBooking({ action: 'book' }); selectLocation(location); }}><div className="booking-location-image"><Photo src={location.image} /></div><span><small className="eyebrow">DUBAI</small><strong>{location.name}</strong><small>{location.tagline}</small><span className="text-link">Select location<Arrow /></span></span></button>)}</div><p className="staging-notice"><ShieldCheck size={20} /> Preview only. Booking destinations are awaiting approval; no appointment can be submitted.</p></section></>;
}

function Content() {
  const { arabic, route, filter, setFilter, open, interest, setInterest, setConsent } = useSite();
  if (arabic) return <><PageHero label="ليوز جنتس صالون" title="عناية تليق بك." text="نخلة جميرا · مركز دبي المالي العالمي" image="/images/interior.webp" /><section className="section arabic-preview"><h2>اختر وجهتك</h2><p>نسخة معاينة. المحتوى العربي ومعلومات الحجز قيد المراجعة.</p><div className="arabic-actions">{locations.map(location => <button key={location.id} className="button" onClick={() => open('book', location.id)}>{location.id === 'difc' ? 'مركز دبي المالي العالمي' : 'نخلة جميرا'}<Arrow /></button>)}</div><Link className="text-link" href="/" lang="en">Explore the English preview<Arrow /></Link></section></>;
  if (!route) return <Home arabic={arabic} />;
  const location = locations.find(item => item.id === route);
  if (location) return <BranchPage location={location} />;
  if (route === 'book') return <BookingPage />;
  if (route === 'services') return <><PageHero label="THE GROOMING EDIT" title="Your look. Considered." text="Discover the details that make a difference." image="/images/craft.webp" /><section className="section services-section"><div className="filter-bar" aria-label="Filter services">{['All', 'Hair', 'Beard', 'Rituals'].map(item => <button key={item} aria-pressed={filter === item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div><p className="intro-note">Illustrative service concepts. The approved menu, prices, durations and branch availability are coming soon.</p><div className="services-grid service-directory">{services.filter(item => filter === 'All' || item.category === filter).map(service => <ServiceCard key={service.slug} service={service} />)}</div></section></>;
  if (route.startsWith('services/')) {
    const service = services.find(item => route === `services/${item.slug}`);
    if (service) return <><PageHero label="THE GROOMING EDIT · ILLUSTRATIVE SERVICE" title={service.name} text={service.description} image={service.image} /><section className="section detail-grid"><div><p className="eyebrow">YOUR TIME IN THE CHAIR</p><h2>It starts with you.</h2><p>Tell us the look you have in mind. The approved service description, duration and inclusions will appear here once confirmed.</p><BookButton service={service.slug} label="Choose your location" /></div><div className="details-panel"><div><span>Price</span><strong>Awaiting approval</strong></div><div><span>Duration</span><strong>Awaiting approval</strong></div><div><span>Locations</span><strong>To be confirmed</strong></div><p>Service concept only. This preview does not confirm availability.</p></div></section></>;
  }
  if (route === 'barbers') return <><PageHero label="THE PEOPLE BEHIND THE CRAFT" title="Meet your next barber." text="A conversation. A fresh perspective. A look that feels like you." image="/images/craft.webp" /><section className="section empty-editorial"><Scissors size={38} weight="light" /><h2>Every great look<br />has a person behind it.</h2><p>We’re preparing the team introductions.<br />Names, portraits and branch assignments will appear after approval.</p><BookButton label="Explore booking" /></section></>;
  if (route === 'pride-club') return <><PageHero label="A PLACE TO BELONG" title="The Pride Club." text="A closer connection to the Leoz experience." image="/images/club.webp" /><section className="section club-copy"><Crown size={40} weight="light" /><p className="eyebrow">THE NEXT CHAPTER</p><h2>Some things are<br />worth belonging to.</h2><p>The club is taking shape. Membership details and benefits will be shared once confirmed.</p><button className="button" onClick={() => { track('pride_club_interest'); setInterest(true); }}>Keep me in the loop<Arrow /></button>{interest && <p role="status" className="interest-message">The interest list isn’t open yet. No personal details have been collected. Please check back for the approved programme.</p>}</section></>;
  if (route === 'journal') return <><PageHero label="NOTES FROM THE DEN" title="A considered life." text="Conversations on grooming, personal style and making time for yourself." /><Journal /></>;
  if (route.startsWith('journal/')) {
    const article = articles.find(item => route === `journal/${item.slug}`);
    if (article) return <><PageHero label={`${article.category} · EDITORIAL DRAFT`} title={article.title} image={article.image} /><article className="section article-body">{article.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<Link href="/journal" className="text-link">Back to the journal<Arrow /></Link></article></>;
  }
  if (route === 'contact') return <><PageHero label="FIND YOUR DEN" title="Let’s make it personal." text="Palm Jumeirah or DIFC. Start with your location." /><section className="section"><LocationCards /><div className="contact-grid">{locations.map(location => <article key={location.id}><h2>{location.name}</h2><p>{location.address || 'Address awaiting verification.'}</p><p>{location.hours || 'Opening hours awaiting verification.'}</p><button className="text-link" onClick={() => open('whatsapp', location.id)}>Contact this location<Arrow /></button></article>)}</div></section></>;
  if (route === 'the-ritual' || route === 'about') return <><PageHero label={route === 'about' ? 'WELCOME TO THE DEN' : 'THE LEOZ RITUAL'} title={route === 'about' ? 'A higher standard.' : 'Consult. Craft. Finish.'} text="A considered approach, from the first conversation to the final detail." image={route === 'about' ? '/images/interior.webp' : '/images/ritual.webp'} /><section className="section ritual-story">{[{title: 'Consult', copy: 'Start with a conversation. Your look, your routine, your point of view.'}, {title: 'Craft', copy: 'Make room for the details. Shape, texture and the way it all comes together.'}, {title: 'Finish', copy: 'A final look. A fresh perspective. Ready for whatever comes next.'}].map((step, index) => <div key={step.title}><span className="eyebrow">0{index + 1}</span><h2>{step.title}.</h2><p>{step.copy}</p></div>)}</section><section className="section"><SectionTitle label="DISCOVER LEOZ" title="Find your setting." /><LocationCards /></section></>;
  return <><PageHero label="PREVIEW INFORMATION" title={route === 'privacy' ? 'Your privacy.' : 'Terms of use.'} /><section className="section article-body"><p>This local website is a design preview. It cannot submit appointments, payments or membership registrations.</p><p>Optional analytics consent and your chosen location are stored in this browser. No external analytics provider is connected. Concept imagery and illustrative content are pending approval.</p><p>Approved business policies must replace this preview notice before release.</p><button className="button button-outline" onClick={() => setConsent(true)}>Privacy preferences<Arrow /></button></section></>;
}

export default function Site({ path = '' }: { path?: string }) {
  const arabic = path === 'ar' || path.startsWith('ar/');
  const route = arabic ? path.replace(/^ar\/?/, '') : path;
  const t = translations[arabic ? 'ar' : 'en'];
  const [booking, setBooking] = useState<BookingState>(null);
  const [selected, setSelected] = useState<string | undefined>();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [consent, setConsent] = useState(false);
  const [interest, setInterest] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const menuDialog = useRef<HTMLDialogElement>(null);
  const consentDialog = useRef<HTMLDialogElement>(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 35);
    scroll(); window.addEventListener('scroll', scroll, { passive: true });
    return () => window.removeEventListener('scroll', scroll);
  }, []);

  useEffect(() => {
    if (booking) {
      dialog.current?.showModal();
      dialog.current?.querySelector('h2')?.focus();
    } else dialog.current?.close();
  }, [booking]);
  useEffect(() => {
    if (menu) menuDialog.current?.showModal(); else menuDialog.current?.close();
  }, [menu]);
  useEffect(() => {
    if (consent) consentDialog.current?.showModal(); else consentDialog.current?.close();
  }, [consent]);
  useEffect(() => {
    document.documentElement.lang = arabic ? 'ar' : 'en';
    document.documentElement.dir = arabic ? 'rtl' : 'ltr';
    return () => { document.documentElement.lang = 'en'; document.documentElement.dir = 'ltr'; };
  }, [arabic]);

  function open(action: Action = 'book', branch?: string, service?: string) {
    track(service ? 'service_book_click' : action === 'book' ? 'book_click' : action === 'whatsapp' ? 'whatsapp_click' : action === 'call' ? 'call_click' : 'directions_click', { branch: branch || 'unselected', ...(service ? { service } : {}) });
    const location = locations.find(item => item.id === branch);
    if (location) {
      setSelected(location.id);
      sessionStorage.setItem('leoz-location', location.id);
      track('book_location_selected', { branch: location.id, action });
    }
    const destination = getDestination(location, action);
    if (destination) window.location.assign(destination);
    else setBooking({ action, branch, service });
  }

  function selectLocation(location: Location) {
    const action = booking?.action || 'book';
    track('book_location_selected', { branch: location.id, action });
    setSelected(location.id);
    sessionStorage.setItem('leoz-location', location.id);
    const destination = getDestination(location, action);
    if (location.verified && destination) window.location.assign(destination);
    else setBooking({ ...booking, action, branch: location.id });
  }

  const activeBranch = locations.find(location => location.id === booking?.branch);
  const isHero = !route || !!locations.find(location => location.id === route) || ['services', 'barbers', 'pride-club', 'the-ritual', 'about'].includes(route) || route.startsWith('services/') || route.startsWith('journal/');

  return <SiteContext.Provider value={{ open, selectLocation, setBooking, arabic, route, filter, setFilter, interest, setInterest, setConsent }}><div className={`site ${arabic ? 'rtl' : ''}`} lang={arabic ? 'ar' : 'en'} dir={arabic ? 'rtl' : 'ltr'} onClickCapture={event => { const anchor = (event.target as Element).closest('a'); if (anchor) track('navigation_click', { destination: anchor.getAttribute('href') || '', label: anchor.textContent?.trim().slice(0, 80) || 'brand' }); }}>
    <a className="skip-link" href="#main">{t.skip}</a>
    <header className={`header ${scrolled || !isHero ? 'header-solid' : ''}`}><Brand /><nav className="desktop-nav" aria-label="Main navigation" lang="en" dir={arabic ? 'rtl' : 'ltr'}>{[['Locations', t.navLocations, '/#locations'], ['Services', t.navServices, '/services'], ['Barbers', t.navBarbers, '/barbers'], ['The ritual', t.navRitual, '/the-ritual'], ['Pride Club', t.navPrideClub, '/pride-club'], ['Journal', t.navJournal, '/journal']].map(([label, href]) => <Link key={href} href={href} aria-current={route && href === `/${route}` ? 'page' : undefined} lang="en">{label}</Link>)}</nav><div className="header-actions"><Link className="language-link" href={arabic ? '/' : '/ar'} onClick={() => track('language_switch', { language: arabic ? 'en' : 'ar' })}>{arabic ? t.en : t.ar}</Link><BookButton label={t.cta} /><button className="menu-button" aria-label="Open navigation menu" onClick={() => setMenu(true)}><List size={25} /></button></div></header>
    <aside className="staging-label" role="note">{t.stagingLabel}</aside><main id="main" tabIndex={-1}><Content /></main>
    <footer className="footer" lang={arabic ? 'ar' : 'en'} dir={arabic ? 'rtl' : 'ltr'}><div className="footer-top"><div><Brand /><p>{t.aModernGentlemansClub}<br />{t.palmJumeirahDubai}</p></div><div><h3>{t.locations}</h3>{locations.map(location => <Link key={location.id} href={`/${location.id}`}>{location.name}</Link>)}</div><div><h3>{t.explore}</h3><Link href="/services">{t.navServices}</Link><Link href="/barbers">{t.navBarbers}</Link><Link href="/the-ritual">{t.navRitual}</Link></div><div><h3>{t.worldOfLeoz}</h3><Link href="/about">{t.ourStory}</Link><Link href="/pride-club">{t.navPrideClub}</Link><Link href="/journal">{t.navJournal}</Link><Link href="/contact">{t.contact}</Link></div><div className="footer-book"><p>{t.yourNextChapter}</p><BookButton label={t.cta} /></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Leoz Gents Salon.</span><div><Link href="/privacy">{t.privacy}</Link><Link href="/terms">{t.terms}</Link><button onClick={() => setConsent(true)}>{t.cookieSettings}</button><Link href={arabic ? '/' : '/ar'} onClick={() => track('language_switch', { language: arabic ? 'en' : 'ar' })}>{arabic ? t.english : t.arabic}</Link></div><span>{t.warmTimelessRefined}</span></div><p className="preview-disclosure">{t.previewDisclosure}</p></footer>
    <div className="mobile-utilities"><button onClick={() => open('book', resolveBranchId(route, selected || sessionStorage.getItem('leoz-location'), locations))}><Scissors size={19} /><span>{t.mobileUtilitiesBook}</span></button><button onClick={() => open('whatsapp', resolveBranchId(route, selected || sessionStorage.getItem('leoz-location'), locations))}><WhatsappLogo size={20} /><span>{t.mobileUtilitiesWhatsapp}</span></button><button onClick={() => open('directions', resolveBranchId(route, selected || sessionStorage.getItem('leoz-location'), locations))}><MapPin size={20} /><span>{t.mobileUtilitiesDirections}</span></button></div>
    <dialog ref={dialog} className="booking-dialog" lang={arabic ? 'ar' : 'en'} onCancel={() => setBooking(null)} onClick={event => { if (event.target === event.currentTarget) setBooking(null); }} aria-labelledby="booking-title"><button className="close-button" onClick={() => setBooking(null)} aria-label="Close booking"><X size={24} /></button><p className="eyebrow">{t.bookingDialogTitle}</p><h2 id="booking-title" tabIndex={-1}>{activeBranch ? activeBranch.name : 'Choose your den.'}</h2>{activeBranch ? <><p className="dialog-intro">{activeBranch.tagline}</p><div className="unavailable-state"><ShieldCheck size={30} weight="light" /><h3>{booking?.action === 'book' ? t.bookingUnavailable : t.contactDetailsVerifying}</h3><p>{booking?.action === 'book' ? 'This design preview cannot accept appointments. The approved booking destination for this branch has not been supplied.' : `The approved ${booking?.action === 'directions' ? 'map and address' : booking?.action === 'call' ? 'telephone number' : 'WhatsApp contact'} for this branch has not been supplied.`}</p>{booking?.service && <small>Selected concept: {services.find(service => service.slug === booking.service)?.name}</small>}</div><button className="text-link" onClick={() => setBooking({ action: booking?.action || 'book', service: booking?.service })}>{t.chooseAnotherLocation}<Arrow /></button></> : <><p className="dialog-intro">{t.bookingDialogIntro}</p><div className="dialog-locations">{locations.map(location => <button key={location.id} onClick={() => selectLocation(location)}><div><Photo src={location.image} /></div><span><strong>{location.name}</strong><small>{location.tagline}</small></span><Arrow /></button>)}</div><p className="draft-note">{t.previewOnly}</p></>}</dialog>
    <dialog ref={menuDialog} className="menu-dialog" lang={arabic ? 'ar' : 'en'} onCancel={() => setMenu(false)} aria-label="Main navigation"><button className="close-button" aria-label="Close navigation" onClick={() => setMenu(false)}><X size={26} /></button><Brand /><nav>{[['Locations', t.navLocations, '/#locations'], ['Services', t.navServices, '/services'], ['Barbers', t.navBarbers, '/barbers'], ['The ritual', t.navRitual, '/the-ritual'], ['Pride Club', t.navPrideClub, '/pride-club'], ['Journal', t.navJournal, '/journal'], ['Contact', t.contact, '/contact']].map(([label, href]) => <Link key={href} href={href} onClick={() => setMenu(false)} lang="en">{label}<ArrowUpRight size={24} /></Link>)}<Link href={arabic ? '/' : '/ar'} onClick={() => { setMenu(false); track('language_switch', { language: arabic ? 'en' : 'ar' }); }}>{arabic ? t.english : t.arabic}<GlobeHemisphereWest size={24} /></Link></nav><button className="button" onClick={() => { setMenu(false); open(); }}>{t.cta}<Arrow /></button></dialog>
    <dialog ref={consentDialog} className="booking-dialog" aria-labelledby="consent-title" onCancel={() => setConsent(false)}><button className="close-button" aria-label="Close preferences" onClick={() => setConsent(false)}><X size={24} /></button><p className="eyebrow">{t.yourPreferences}</p><h2 id="consent-title">{t.aLittlePrivacy}</h2><p className="dialog-intro">{t.previewStoresBranch}</p><div className="consent-actions"><button className="button" onClick={() => { localStorage.setItem('leoz-consent', 'accepted'); setConsent(false); }}>{t.allowAnalytics}<Check /></button><button className="button button-outline" onClick={() => { localStorage.setItem('leoz-consent', 'rejected'); setConsent(false); }}>{t.essentialOnly}<Arrow /></button></div></dialog>
  </div></SiteContext.Provider>;
}
