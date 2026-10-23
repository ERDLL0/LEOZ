const pages = {
  barbers: {
    label: 'THE PEOPLE BEHIND THE CRAFT',
    title: 'Meet your next barber.',
    text: 'A conversation. A fresh perspective. A look that feels like you.',
    headingLines: ['Every great look', 'has a person behind it.'],
    copy: 'Team introductions are in preparation. Names, portraits and branch assignments will appear after approval.',
    cardLabel: 'Profile pending approval',
    cardLine: 'Portrait & biography to follow',
    note: 'Concept portrait grid · No staff identities are shown until approved.',
  },
  ritual: {
    label: 'THE LEOZ RITUAL',
    title: 'Consult. Craft. Finish.',
    text: 'A considered approach, from the first conversation to the final detail.',
  },
  pride: {
    label: 'A PLACE TO BELONG',
    title: 'The Pride Club.',
    text: 'A closer connection to the Leoz experience.',
    eyebrow: 'THE NEXT CHAPTER',
    headingLines: ['Some things are worth', 'belonging to.'],
    copy: 'The club is taking shape. Membership details and benefits will be shared once confirmed.',
    interest:
      'The interest list isn’t open yet. No personal details have been collected. Check back for the approved programme.',
  },
  about: {
    label: 'WELCOME TO THE DEN',
    title: 'A higher standard.',
    text: 'A considered approach, from the first conversation to the final detail.',
    paragraphs: [
      'Leoz Gents Salon brings a considered, modern take on men’s grooming to two distinct Dubai settings.',
      'Warm textures and unhurried service on Palm Jumeirah. A sharper, architectural rhythm in DIFC / Sky Gardens.',
      'The imagery on this staging preview is temporary concept artwork. Original photography and the approved brand story will replace it before release.',
    ],
  },
  contact: {
    label: 'FIND YOUR DEN',
    title: 'Let’s make it personal.',
    text: 'Palm Jumeirah or DIFC. Start with your location.',
  },
  book: {
    label: 'YOUR NEXT CHAPTER STARTS HERE',
    title: 'Claim your chair.',
    text: 'Two locations. One considered experience. Choose your Leoz.',
    notice: 'Booking continues to the verified Leoz booking destination. Confirm final details with the branch.',
  },
  journal: {
    label: 'NOTES FROM THE DEN',
    title: 'A considered life.',
    text: 'Conversations on grooming, personal style and making time for yourself.',
    draftTag: 'EDITORIAL DRAFT',
    readArticle: 'Read the note',
    articles: [
      {
        slug: 'a-better-barber-consultation',
        category: 'THE DETAILS',
        title: 'A better cut starts with a conversation.',
        body: [
          'Bring a reference, but bring your routine too. How you wear your hair on an ordinary morning is as useful as a photograph of how you want it to look.',
          'Talk about what you want to keep, what you want to change, and how much time you want to spend styling. A clear conversation gives your barber a useful starting point.',
          'Before you leave, ask how to recreate the finish. The right questions can help make your next appointment more considered.',
        ],
      },
      {
        slug: 'make-time-for-yourself',
        category: 'THE RITUAL',
        title: 'The art of making time for yourself.',
        body: [
          'A grooming appointment can be a small pause in a busy day. Put it in the calendar with the same intention as anything else that deserves your attention.',
          'Think about what you want from the visit before you arrive. A simple refresh and a complete change start with different conversations.',
          'Choose a rhythm that works for your look and your routine. Consistency starts with something you can make time for.',
        ],
      },
      {
        slug: 'two-sides-of-dubai',
        category: 'THE CITY',
        title: 'One city. Two different rhythms.',
        body: [
          'Palm Jumeirah and DIFC give the Leoz experience two distinct settings. The creative direction for Palm is warm and unhurried; DIFC takes on a more architectural, focused mood.',
          'Explore each location page to find your preferred setting. Confirm the approved branch details and booking options before planning your visit.',
        ],
      },
    ],
  },
  legal: {
    privacy: {
      label: 'PREVIEW INFORMATION',
      title: 'Your privacy.',
      paragraphs: [
        'This website is a design preview. It cannot submit appointments, payments or membership registrations.',
        'Your language choice and selected branch are stored in this browser. Optional analytics consent is stored locally. No external analytics provider is connected.',
        'Business-approved privacy and cookie policies must replace this preview notice before release.',
      ],
      settings: 'Privacy preferences',
    },
    terms: {
      label: 'PREVIEW INFORMATION',
      title: 'Terms of use.',
      paragraphs: [
        'This website is a design preview for Leoz Gents Salon. It does not constitute an offer, and no appointment, payment or membership is created by using it.',
        'Service names, prices and imagery are illustrative or awaiting final approval. Prices shown are taken from the published Leoz price list (Feb 2025) and may change.',
        'Business-approved terms must replace this preview notice before release.',
      ],
      settings: 'Privacy preferences',
    },
  },
};

export default pages;
