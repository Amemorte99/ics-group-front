// utils/seo.js - Fichier centralisé pour le SEO
export const seoData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LE MARCHAND ELU SARL",
    "legalName": "LE MARCHAND ELU SARL",
    "url": "https://lemarchand.sn",
    "logo": "https://lemarchand.sn/images/logoo.jpeg",
    "description": "Plateforme de commerce et marketplace pour l'Afrique de l'Ouest",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Avenue Charles de Gaulle",
      "addressLocality": "N'Djaména",
      "addressCountry": "Tchad"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+228 97 55 59 08",
      "contactType": "support",
      "availableLanguage": ["French", "English"]
    },
    "sameAs": [
      "https://facebook.com/lemarchand",
      "https://instagram.com/lemarchand"
    ]
  },
  
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "LE MARCHAND ELU SARL",
    "url": "https://lemarchand.sn",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://lemarchand.sn/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  },
  
  breadcrumb: (items) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  })
};