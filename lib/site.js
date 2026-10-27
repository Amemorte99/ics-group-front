// Source unique des informations du site utilisées par le SEO.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.icsolution.fr').replace(/\/$/, '');
export const SITE_NAME = 'ICS GROUPE';
export const DEFAULT_IMAGE = '/images/og-home.jpg';

export const CONTACT = {
  email: 'info@icsgroupe.com',
  phone: '+235 64 78 88 31',
  street: 'Rue de Corniche, Sabangali',
  city: "N'Djamena",
  country: 'TD',
};

// Marchés ciblés : le site est en français, langue commune au Tchad, à la France et à l'Afrique francophone.
export const MARKETS = [
  { hreflang: 'fr-TD', country: 'Tchad' },
  { hreflang: 'fr-FR', country: 'France' },
  { hreflang: 'fr', country: 'Monde francophone' },
];

export const SOCIAL_LINKS = [
  'https://www.linkedin.com/company/ics-groupe',
  'https://www.facebook.com/icsgroupe',
  'https://twitter.com/ics_groupe',
  'https://www.youtube.com/c/icsgroupe',
].filter(Boolean);

export const absoluteUrl = (path = '/') => (/^https?:\/\//.test(path) ? path : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`);

export const organizationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl('/images/logo.png'),
  email: CONTACT.email,
  telephone: CONTACT.phone,
  description:
    'ICS GROUPE accompagne les entreprises et institutions au Tchad, en France et à l\'international en cybersécurité, énergies renouvelables, développement web et transformation digitale.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: CONTACT.street,
    addressLocality: CONTACT.city,
    addressCountry: CONTACT.country,
  },
  areaServed: [
    { '@type': 'Country', name: 'Tchad' },
    { '@type': 'Country', name: 'France' },
    { '@type': 'Place', name: 'Afrique' },
    { '@type': 'Place', name: 'Monde' },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: CONTACT.phone,
    email: CONTACT.email,
    contactType: 'customer service',
    availableLanguage: ['French'],
  },
  sameAs: SOCIAL_LINKS,
});

export const websiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: 'fr',
  publisher: { '@id': `${SITE_URL}/#organization` },
});

// Pages dont le référencement peut être personnalisé depuis le back office.
export const SEO_PAGES = [
  { path: '/', label: 'Accueil' },
  { path: '/services', label: 'Services' },
  { path: '/services/cybersecurite', label: 'Service · Cybersécurité' },
  { path: '/services/energie', label: 'Service · Énergies renouvelables' },
  { path: '/services/web', label: 'Service · Web & mobile' },
  { path: '/services/reseaux', label: 'Service · Réseaux & télécoms' },
  { path: '/services/data', label: 'Service · Data' },
  { path: '/services/marketing', label: 'Service · Marketing digital' },
  { path: '/services/design', label: 'Service · Design & communication' },
  { path: '/services/consulting', label: 'Service · Consulting' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/blog', label: 'Blog' },
  { path: '/about-us', label: 'À propos' },
  { path: '/team', label: 'Équipe' },
  { path: '/contact', label: 'Contact' },
  { path: '/faq', label: 'FAQ' },
  { path: '/pricing', label: 'Tarifs' },
];
