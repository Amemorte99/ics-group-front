// components/SEO.js
import { useContext } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SeoContext } from '../lib/SeoContext';
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_IMAGE,
  CONTACT,
  MARKETS,
  absoluteUrl,
  organizationJsonLd,
  websiteJsonLd,
} from '../lib/site';

const DEFAULT_DESCRIPTION =
  'ICS GROUPE : cybersécurité, énergies renouvelables, développement web et transformation digitale pour les entreprises au Tchad, en France et à l\'international.';

const jsonLd = (data) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);

export default function SEO({
  title: defaultTitle,
  description: defaultDescription = DEFAULT_DESCRIPTION,
  keywords: defaultKeywords,
  image: defaultImage = DEFAULT_IMAGE,
  type = 'website',
  path,
  noIndex: defaultNoIndex = false,
  home = false,
  breadcrumb,
  article,
}) {
  const router = useRouter();
  const cleanPath = (path ?? router.asPath).split('?')[0].split('#')[0] || '/';
  const normalized = cleanPath === '/' ? '/' : cleanPath.replace(/\/$/, '');
  const url = absoluteUrl(normalized);

  // Les réglages saisis dans le back office priment sur les valeurs par défaut de la page.
  const override = useContext(SeoContext)[normalized] || {};
  const title = override.title || defaultTitle;
  const description = override.description || defaultDescription;
  const keywords = override.keywords || defaultKeywords;
  const image = override.ogImage || defaultImage;
  const noIndex = override.noIndex || defaultNoIndex;
  const fullTitle = !title || title.includes(SITE_NAME) ? title || SITE_NAME : `${title} | ${SITE_NAME}`;
  const imageUrl = absoluteUrl(image);
  const robots = noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1';

  const crumbs = breadcrumb || (home ? null : [{ name: title || SITE_NAME, path: cleanPath }]);

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <link rel="canonical" href={url} />

      {/* Même contenu français pour chaque marché ciblé (Tchad, France, monde francophone) */}
      {!noIndex &&
        MARKETS.map((m) => <link key={m.hreflang} rel="alternate" hrefLang={m.hreflang} href={url} />)}
      {!noIndex && <link rel="alternate" hrefLang="x-default" href={url} />}

      {/* Géolocalisation du siège */}
      <meta name="geo.region" content="TD-ND" />
      <meta name="geo.placename" content={CONTACT.city} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={article ? 'article' : type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content="fr_FR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {article && (
        <>
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.author && <meta property="article:author" content={article.author} />}
          {(article.tags || []).map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {home && jsonLd(organizationJsonLd())}
      {home && jsonLd(websiteJsonLd())}
      {crumbs &&
        jsonLd({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
            ...crumbs.map((c, i) => ({
              '@type': 'ListItem',
              position: i + 2,
              name: c.name,
              item: absoluteUrl(c.path),
            })),
          ],
        })}
    </Head>
  );
}
