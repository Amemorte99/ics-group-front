// components/SEO.js
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function SEO({
  title = 'ICS GROUPE - Solutions Digitales & Cybersécurité',
  description = 'ICS GROUPE est un leader africain en solutions digitales, cybersécurité, énergies renouvelables et transformation numérique.',
  keywords = 'ICS GROUPE, cybersécurité, énergies renouvelables, transformation digitale, Tchad, Afrique, solutions digitales',
  ogImage = '/images/og-image.jpg',
  ogType = 'website',
  canonical = '',
  noIndex = false,
  author = 'ICS GROUPE',
  publishedDate = '',
  modifiedDate = '',
  tags = [],
  category = '',
  readingTime = '',
  wordCount = 0,
  isArticle = false,
}) {
  const router = useRouter();
  const siteUrl = 'https://www.icsolution.fr';
  const currentUrl = canonical || `${siteUrl}${router.asPath}`;
  const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  // Générer les mots-clés enrichis
  const allKeywords = [...new Set([
    keywords,
    ...(tags || []),
    'ICS GROUPE',
    'N\'Djamena',
    'Tchad',
    'Afrique',
    'solutions digitales',
    'cybersécurité',
    'innovation'
  ])].filter(Boolean).join(', ');

  return (
    <Head>
      {/* ===== MÉTADONNÉES DE BASE ===== */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="googlebot" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="theme-color" content="#1B5E20" />

      {/* ===== OPEN GRAPH (Facebook, LinkedIn) ===== */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={isArticle ? 'article' : ogType} />
      <meta property="og:site_name" content="ICS GROUPE" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="fb:app_id" content="YOUR_FB_APP_ID" />

      {/* ===== TWITTER CARDS ===== */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@icsgroupe" />
      <meta name="twitter:creator" content="@icsgroupe" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title} />

      {/* ===== ARTICLE (Blog) ===== */}
      {isArticle && (
        <>
          <meta property="article:published_time" content={publishedDate} />
          <meta property="article:modified_time" content={modifiedDate || publishedDate} />
          <meta property="article:author" content={author} />
          <meta property="article:section" content={category || 'Blog'} />
          {tags?.map((tag, i) => (
            <meta key={i} property="article:tag" content={tag} />
          ))}
          {readingTime && <meta property="article:reading_time" content={readingTime} />}
        </>
      )}

      {/* ===== CANONICAL ===== */}
      <link rel="canonical" href={currentUrl} />

      {/* ===== ALTERNATE LANGUAGES ===== */}
      <link rel="alternate" href={currentUrl} hrefLang="fr" />
      <link rel="alternate" href={currentUrl} hrefLang="x-default" />

      {/* ===== PREV / NEXT (pagination) ===== */}
      {router.query?.page && (
        <>
          {parseInt(router.query.page) > 1 && (
            <link rel="prev" href={`${siteUrl}${router.pathname}?page=${parseInt(router.query.page) - 1}`} />
          )}
          <link rel="next" href={`${siteUrl}${router.pathname}?page=${parseInt(router.query.page) + 1}`} />
        </>
      )}

      {/* ===== PRECONNECT ===== */}
      <link rel="preconnect" href="https://api.icsolution.fr" />
      <link rel="preconnect" href="https://res.cloudinary.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />

      {/* ===== FAVICON ===== */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* ===== JSON-LD : ORGANISATION ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'ICS GROUPE',
            url: siteUrl,
            logo: `${siteUrl}/images/logo.png`,
            description: 'Leader africain en solutions digitales et cybersécurité',
            email: 'contact@icsolution.fr',
            telephone: '+235 XX XX XX XX',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'TD',
              addressLocality: "N'Djamena",
              addressRegion: 'N\'Djamena',
              postalCode: 'B.P. 1234',
              streetAddress: 'Avenue Charles de Gaulle',
            },
            sameAs: [
              'https://www.facebook.com/icsgroupe',
              'https://www.linkedin.com/company/ics-groupe',
              'https://twitter.com/icsgroupe',
              'https://www.youtube.com/@icsgroupe',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+235 XX XX XX XX',
              contactType: 'sales',
              availableLanguage: ['French', 'English', 'Arabic'],
            },
          }),
        }}
      />

      {/* ===== JSON-LD : WEBSITE ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'ICS GROUPE',
            url: siteUrl,
            potentialAction: {
              '@type': 'SearchAction',
              target: `${siteUrl}/search?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />

      {/* ===== JSON-LD : BREADCRUMB ===== */}
      {router.asPath !== '/' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Accueil',
                  item: siteUrl,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: title.split('|')[0]?.trim() || 'ICS GROUPE',
                  item: currentUrl,
                },
              ],
            }),
          }}
        />
      )}
    </Head>
  );
}