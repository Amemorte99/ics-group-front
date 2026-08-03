// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // ✅ SEO : Sitemap et robots
  images: {
    domains: [
      'localhost',
      'api.icsolution.fr',
      'www.icsolution.fr',
      'icsolution.fr',
      'res.cloudinary.com'  // Pour les images Cloudinary
    ],
  },
  
  // ✅ SEO : Headers pour le crawl
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
        ],
      },
      {
        source: '/admin/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ];
  },
  
  // ✅ SEO : Redirections
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;