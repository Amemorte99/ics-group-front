// pages/sitemap.xml.js
import { blogApi, serviceApi, portfolioApi } from '../utils/api';

const siteUrl = 'https://www.icsolution.fr';

// Pages statiques avec leur priorité et fréquence
const staticPages = [
  { loc: '/', priority: '1.0', changefreq: 'daily' },
  { loc: '/blog', priority: '0.9', changefreq: 'daily' },
  { loc: '/portfolio', priority: '0.8', changefreq: 'weekly' },
  { loc: '/services', priority: '0.8', changefreq: 'weekly' },
  { loc: '/about', priority: '0.7', changefreq: 'monthly' },
  { loc: '/contact', priority: '0.6', changefreq: 'monthly' },
  { loc: '/testimonials', priority: '0.5', changefreq: 'monthly' },
  { loc: '/partners', priority: '0.4', changefreq: 'monthly' },
];

function generateUrl(loc, lastmod, priority = '0.5', changefreq = 'weekly') {
  return `
  <url>
    <loc>${siteUrl}${loc}</loc>
    ${lastmod ? `<lastmod>${new Date(lastmod).toISOString().split('T')[0]}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function getServerSideProps({ res }) {
  try {
    // Récupérer tous les contenus dynamiques en parallèle
    const [blogsRes, servicesRes, portfoliosRes] = await Promise.all([
      blogApi.getAll().catch(() => ({ data: [] })),
      serviceApi.getAll().catch(() => ({ data: [] })),
      portfolioApi.getAll().catch(() => ({ data: [] })),
    ]);

    const blogs = blogsRes.data || [];
    const services = servicesRes.data || [];
    const portfolios = portfoliosRes.data || [];

    // Générer les URLs pour chaque type de contenu
    const blogUrls = blogs
      .filter(b => b.isPublished !== false)
      .map(b => generateUrl(
        `/blog/${b.slug}`,
        b.updatedAt || b.createdAt,
        '0.7',
        'weekly'
      ));

    const serviceUrls = services
      .filter(s => s.isActive !== false)
      .map(s => generateUrl(
        `/services/${s.slug}`,
        s.updatedAt || s.createdAt,
        '0.6',
        'monthly'
      ));

    const portfolioUrls = portfolios
      .filter(p => p.isActive !== false)
      .map(p => generateUrl(
        `/portfolio/${p.slug}`,
        p.updatedAt || p.createdAt,
        '0.6',
        'monthly'
      ));

    // Générer le sitemap complet
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${staticPages.map(p => generateUrl(p.loc, new Date().toISOString(), p.priority, p.changefreq)).join('')}
  ${blogUrls.join('')}
  ${serviceUrls.join('')}
  ${portfolioUrls.join('')}
</urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=3600');
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error('❌ Erreur génération sitemap:', error);
    res.statusCode = 500;
    res.end();
  }

  return { props: {} };
}

export default function Sitemap() {
  return null;
}