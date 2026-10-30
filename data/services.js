// data/services.js
// Liste des services (page /services). Textes en { fr, en, ar } à lire avec tx().
const services = [
  {
    slug: "marketing",
    icon: "fa-bullhorn",
    title: { fr: "Marketing Digital", en: "Digital Marketing", ar: "التسويق الرقمي" },
    caption: {
      fr: "Stratégie digitale personnalisée pour booster votre visibilité et vos ventes",
      en: "Personalized digital strategy to boost your visibility and sales",
      ar: "استراتيجية رقمية مخصصة لزيادة ظهوركم ومبيعاتكم",
    },
  },
  {
    slug: "design",
    icon: "fa-palette",
    title: { fr: "Design Graphique & Communication", en: "Graphic Design & Communication", ar: "التصميم الجرافيكي والاتصال" },
    caption: {
      fr: "Supports visuels impactants pour renforcer votre image de marque",
      en: "High-impact visuals to strengthen your brand image",
      ar: "مواد بصرية مؤثرة لتعزيز صورة علامتكم التجارية",
    },
  },
  {
    slug: "web",
    icon: "fa-laptop-code",
    title: { fr: "Sites Web & Applications Mobiles", en: "Websites & Mobile Apps", ar: "المواقع وتطبيقات الجوال" },
    caption: {
      fr: "Solutions digitales performantes et sur mesure",
      en: "High-performance, tailor-made digital solutions",
      ar: "حلول رقمية عالية الأداء ومصممة حسب الطلب",
    },
  },
  {
    slug: "cybersecurite",
    icon: "fa-shield-halved",
    title: { fr: "Cybersécurité", en: "Cybersecurity", ar: "الأمن السيبراني" },
    caption: {
      fr: "Protégez votre entreprise contre les menaces numériques",
      en: "Protect your business against digital threats",
      ar: "احموا شركتكم من التهديدات الرقمية",
    },
  },
  {
    slug: "energie",
    icon: "fa-solar-panel",
    title: { fr: "Énergies Renouvelables", en: "Renewable Energy", ar: "الطاقات المتجددة" },
    caption: {
      fr: "Solutions solaires complètes pour réduire votre facture énergétique",
      en: "Complete solar solutions to cut your energy bill",
      ar: "حلول شمسية متكاملة لتقليل فاتورة الطاقة",
    },
  },
  {
    slug: "reseaux",
    icon: "fa-network-wired",
    title: { fr: "Réseaux & Télécommunications", en: "Networks & Telecommunications", ar: "الشبكات والاتصالات" },
    caption: {
      fr: "Connectivité fiable et performante pour votre infrastructure",
      en: "Reliable, high-performance connectivity for your infrastructure",
      ar: "اتصال موثوق وعالي الأداء لبنيتكم التحتية",
    },
  },
  {
    slug: "data",
    icon: "fa-chart-bar",
    title: { fr: "Data Analysis", en: "Data Analysis", ar: "تحليل البيانات" },
    caption: {
      fr: "Transformez vos données en décisions stratégiques",
      en: "Turn your data into strategic decisions",
      ar: "حوّلوا بياناتكم إلى قرارات استراتيجية",
    },
  },
  {
    slug: "consulting",
    icon: "fa-chalkboard-teacher",
    title: { fr: "Consulting & Formations", en: "Consulting & Training", ar: "الاستشارات والتدريب" },
    caption: {
      fr: "Expertise et transfert de compétences pour vos équipes",
      en: "Expertise and skills transfer for your teams",
      ar: "خبرة ونقل مهارات لفرقكم",
    },
  },
];

export default services;
