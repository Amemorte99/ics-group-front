// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
          { key: 'X-Robots-Tag', value: 'index, follow' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/admin/(.*)',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },

  // ✅ Redirections SEO
  async redirects() {
    return [
      { source: '/index', destination: '/', permanent: true },
      { source: '/index2', destination: '/', permanent: true },
      { source: '/index3', destination: '/', permanent: true },
      { source: '/index4', destination: '/', permanent: true },
      { source: '/home', destination: '/', permanent: true },
    ];
  },

  compress: true,
  poweredByHeader: false,
  generateEtags: true,
};

module.exports = nextConfig;