// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Français à la racine, /en et /ar pour les autres langues. Pas de redirection automatique selon le navigateur
  // (URL stables, meilleurs résultats pour le référencement).
  i18n: {
    locales: ['fr', 'en', 'ar'],
    defaultLocale: 'fr',
    localeDetection: false,
  },
  swcMinify: true,

  images: {
    // ✅ Configuration pour les images distantes
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.icsolution.fr',
        port: '',
        pathname: '/**',
      },
    ],
    // ✅ Fallback pour les anciennes versions
    domains: [
      'localhost',
      'images.unsplash.com',
      'res.cloudinary.com',
      'api.icsolution.fr',
      'www.icsolution.fr',
      'icsolution.fr',
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // ✅ SEO Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },

  // ✅ Redirections SEO
  async redirects() {
    return [
      // L'administration reste en français : pas de version /en ou /ar
      { source: '/:locale(en|ar)/admin/:path*', destination: '/admin/:path*', permanent: false, locale: false },
      { source: '/:locale(en|ar)/admin', destination: '/admin', permanent: false, locale: false },
      { source: '/index', destination: '/', permanent: true },
      { source: '/index2', destination: '/', permanent: true },
      { source: '/index3', destination: '/', permanent: true },
      { source: '/index4', destination: '/', permanent: true },
      { source: '/home', destination: '/', permanent: true },
      // Pages restées du modèle d'origine (faux contenu) : redirigées vers les vraies pages
      { source: '/team', destination: '/about-us', permanent: true },
      { source: '/pricing', destination: '/contact', permanent: true },
      { source: '/blog-one', destination: '/blog', permanent: true },
      { source: '/blog-two', destination: '/blog', permanent: true },
      { source: '/single-blog', destination: '/blog', permanent: true },
      { source: '/features-one', destination: '/services', permanent: true },
      { source: '/features-two', destination: '/services', permanent: true },
      { source: '/sign-up', destination: '/', permanent: true },
      { source: '/forgot-password', destination: '/', permanent: true },
      { source: '/login', destination: '/admin/login', permanent: false },
    ];
  },

  compress: true,
  poweredByHeader: false,
  generateEtags: true,
};

module.exports = nextConfig;