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