// lib/seo.js
export const defaultSEO = {
  title: 'ICS GROUPE - Solutions Digitales & Cybersécurité',
  description: 'ICS GROUPE est un leader africain en solutions digitales, cybersécurité, énergies renouvelables et transformation numérique.',
  ogImage: '/images/og-image.jpg',
  siteName: 'ICS GROUPE',
  twitterHandle: '@icsgroupe',
};

export const generateArticleSchema = (post) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: post.content?.replace(/<[^>]*>/g, '').slice(0, 160),
  image: post.featuredImage,
  datePublished: post.publishedDate,
  dateModified: post.updatedAt,
  author: {
    '@type': 'Person',
    name: post.authorName || 'ICS GROUPE',
  },
  publisher: {
    '@type': 'Organization',
    name: 'ICS GROUPE',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.icsolution.fr/images/logo.png',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://www.icsolution.fr/blog/${post.slug}`,
  },
});

export const generateBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});