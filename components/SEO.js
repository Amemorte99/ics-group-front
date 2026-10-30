// components/SEO.js
import { useContext } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SeoContext } from '../lib/SeoContext';
import { PAGE_SEO } from '../lib/seoPages';
import { LOCALES, LOCALE_META, localizedUrl, useI18n } from '../lib/i18n';
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

const DEFAULT_DESCRIPTION = {
  fr: "ICS GROUPE : cybersécurité, énergies renouvelables, développement web et transformation digitale pour les entreprises au Tchad, en France et à l'international.",
  en: 'ICS GROUPE: cybersecurity, renewable energy, web development and digital transformation for businesses in Chad, France and worldwide.',
  ar: 'ICS GROUPE: الأمن السيبراني والطاقات المتجددة وتطوير المواقع والتحول الرقمي للشركات في تشاد وفرنسا وحول العالم.',
};

const jsonLd = (data) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);

export default function SEO({
  title: rawTitle,
  description: rawDescription,
  keywords: rawKeywords,
  image: defaultImage = DEFAULT_IMAGE,
  type = 'website',
  path,
  noIndex: defaultNoIndex = false,
  home = false,
  breadcrumb,
  article,
}) {
  const router = useRouter();
  const { locale, tx } = useI18n();
  const cleanPath = (path ?? router.asPath).split('?')[0].split('#')[0] || '/';
  const normalized = cleanPath === '/' ? '/' : cleanPath.replace(/\/$/, '');
  const url = localizedUrl(normalized, locale);
  const preset = PAGE_SEO[normalized] || {};
  const defaultTitle = tx(rawTitle ?? preset.title);
  const defaultDescription = tx(rawDescription ?? preset.description ?? undefined) || tx(DEFAULT_DESCRIPTION);
  const defaultKeywords = tx(rawKeywords);

  // Les réglages saisis dans le back office priment sur les valeurs par défaut de la page.
  // Réglages du back office : chemin tel quel en français, préfixé par la langue (/en/contact) sinon.
  const overrideKey = locale === 'fr' ? normalized : `/${locale}${normalized === '/' ? '' : normalized}`;
  const override = useContext(SeoContext)[overrideKey] || {};
  const title = override.title || defaultTitle;
  const description = override.description || defaultDescription;
  const keywords = override.keywords || defaultKeywords;
  const image = override.ogImage || defaultImage;
  const noIndex = override.noIndex || defaultNoIndex;
  const fullTitle = !title || title.includes(SITE_NAME) ? title || SITE_NAME : `${title} | ${SITE_NAME}`;
  const imageUrl = absoluteUrl(image);
  const robots = noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1';

  const crumbs = breadcrumb || (home ? null : [{ name: title || SITE_NAME, path: normalized }]);

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <link rel="canonical" href={url} />

      {/* Même contenu français pour chaque marché ciblé (Tchad, France, monde francophone) */}
      {!noIndex && (
        <>
          {LOCALES.map((code) => (
            <link key={code} rel="alternate" hrefLang={code} href={localizedUrl(normalized, code)} />
          ))}
          {MARKETS.filter((m) => m.hreflang !== 'fr').map((m) => (
            <link key={m.hreflang} rel="alternate" hrefLang={m.hreflang} href={localizedUrl(normalized, 'fr')} />
          ))}
          <link rel="alternate" hrefLang="x-default" href={localizedUrl(normalized, 'fr')} />
        </>
      )}

      {/* Géolocalisation du siège */}
      <meta name="geo.region" content="TD-ND" />
      <meta name="geo.placename" content={CONTACT.city} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={article ? 'article' : type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content={LOCALE_META[locale].og} />

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

      {home && jsonLd(organizationJsonLd(locale))}
      {home && jsonLd(websiteJsonLd(locale))}
      {crumbs &&
        jsonLd({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: tx({ fr: 'Accueil', en: 'Home', ar: 'الرئيسية' }), item: localizedUrl('/', locale) },
            ...crumbs.map((c, i) => ({
              '@type': 'ListItem',
              position: i + 2,
              name: tx(c.name),
              item: c.path ? localizedUrl(c.path, locale) : url,
            })),
          ],
        })}
    </Head>
  );
}
