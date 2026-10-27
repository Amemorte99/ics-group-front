// pages/sitemap.xml.js
import { blogApi } from '../utils/api';
import { SITE_URL, MARKETS } from '../lib/site';

// Uniquement des pages qui existent réellement.
const staticPages = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/services', priority: '0.9', changefreq: 'monthly' },
  { loc: '/services/cybersecurite', priority: '0.9', changefreq: 'monthly' },
  { loc: '/services/energie', priority: '0.9', changefreq: 'monthly' },
  { loc: '/services/web', priority: '0.8', changefreq: 'monthly' },
  { loc: '/services/reseaux', priority: '0.8', changefreq: 'monthly' },
  { loc: '/services/data', priority: '0.7', changefreq: 'monthly' },
  { loc: '/services/marketing', priority: '0.7', changefreq: 'monthly' },
  { loc: '/services/design', priority: '0.7', changefreq: 'monthly' },
  { loc: '/services/consulting', priority: '0.7', changefreq: 'monthly' },
  { loc: '/portfolio', priority: '0.8', changefreq: 'weekly' },
  { loc: '/blog', priority: '0.8', changefreq: 'daily' },
  { loc: '/about-us', priority: '0.6', changefreq: 'monthly' },
  { loc: '/team', priority: '0.5', changefreq: 'monthly' },
  { loc: '/contact', priority: '0.7', changefreq: 'monthly' },
  { loc: '/faq', priority: '0.5', changefreq: 'monthly' },
  { loc: '/pricing', priority: '0.5', changefreq: 'monthly' },
];

const escapeXml = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function urlEntry({ loc, lastmod, priority, changefreq }) {
  const href = `${SITE_URL}${loc === '/' ? '/' : loc}`;
  const alternates = [...MARKETS.map((m) => m.hreflang), 'x-default']
    .map((lang) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${escapeXml(href)}"/>`)
    .join('');
  const date = lastmod ? new Date(lastmod) : null;
  return `<url><loc>${escapeXml(href)}</loc>${date && !isNaN(date) ? `<lastmod>${date.toISOString().split('T')[0]}</lastmod>` : ''}<changefreq>${changefreq}</changefreq><priority>${priority}</priority>${alternates}</url>`;
}

export async function getServerSideProps({ res }) {
  let blogs = [];
  try {
    const response = await blogApi.getAll();
    blogs = Array.isArray(response.data) ? response.data : response.data?.data || [];
  } catch (error) {
    console.error('Sitemap: articles indisponibles');
  }

  const entries = [
    ...staticPages,
    ...blogs
      .filter((b) => b.slug && b.isPublished !== false)
      .map((b) => ({
        loc: `/blog/${b.slug}`,
        lastmod: b.updatedAt || b.createdAt,
        priority: '0.7',
        changefreq: 'monthly',
      })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.map(urlEntry).join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(xml);
  res.end();
  return { props: {} };
}

export default function Sitemap() {
  return null;
}
