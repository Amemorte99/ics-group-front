// data/featuredServices.js
// Textes par langue : { fr, en, ar } (lus avec tx() depuis lib/i18n).
const featuredServices = [
  {
    title: { fr: "Marketing Digital", en: "Digital Marketing", ar: "التسويق الرقمي" },
    description: {
      fr: "Stratégie digitale, publicité en ligne et SEO pour booster votre visibilité.",
      en: "Digital strategy, online advertising and SEO to boost your visibility.",
      ar: "استراتيجية رقمية وإعلانات عبر الإنترنت وتحسين محركات البحث لزيادة ظهوركم.",
    },
    icon: "fas fa-bullhorn",
    color: "color-fb7756",
    link: "/services/marketing",
  },
  {
    title: { fr: "Design Graphique & Communication", en: "Graphic Design & Communication", ar: "التصميم الجرافيكي والاتصال" },
    description: {
      fr: "Création d’identité visuelle et supports print/digitaux impactants.",
      en: "Visual identity creation and high-impact print and digital materials.",
      ar: "ابتكار الهوية البصرية ومواد مطبوعة ورقمية مؤثرة.",
    },
    icon: "fas fa-palette",
    color: "color-facd60",
    link: "/services/design",
  },
  {
    title: { fr: "Sites Web & Applications Mobiles", en: "Websites & Mobile Apps", ar: "المواقع وتطبيقات الجوال" },
    description: {
      fr: "Sites responsives et apps mobiles performantes sur mesure.",
      en: "Responsive websites and high-performance custom mobile apps.",
      ar: "مواقع متجاوبة وتطبيقات جوال عالية الأداء مصممة حسب الطلب.",
    },
    icon: "fas fa-laptop-code",
    color: "color-1ac0c6",
    link: "/services/web",
  },
  {
    title: { fr: "Cybersécurité", en: "Cybersecurity", ar: "الأمن السيبراني" },
    description: {
      fr: "Audit, protection et formation contre les cybermenaces.",
      en: "Audit, protection and training against cyber threats.",
      ar: "تدقيق وحماية وتدريب لمواجهة التهديدات السيبرانية.",
    },
    icon: "fas fa-shield-alt",
    color: "",
    link: "/services/cybersecurite",
  },
  {
    title: { fr: "Énergies Renouvelables", en: "Renewable Energy", ar: "الطاقات المتجددة" },
    description: {
      fr: "Solutions solaires complètes : installation, batteries et maintenance.",
      en: "Complete solar solutions: installation, batteries and maintenance.",
      ar: "حلول شمسية متكاملة: تركيب وبطاريات وصيانة.",
    },
    icon: "fas fa-solar-panel",
    color: "color-fb7756",
    link: "/services/energie",
  },
  {
    title: { fr: "Réseaux & Télécommunications", en: "Networks & Telecoms", ar: "الشبكات والاتصالات" },
    description: {
      fr: "Interconnexion multisite et optimisation de votre infrastructure réseau.",
      en: "Multi-site interconnection and optimization of your network infrastructure.",
      ar: "ربط المواقع المتعددة وتحسين بنيتكم التحتية للشبكات.",
    },
    icon: "fas fa-network-wired",
    color: "color-facd60",
    link: "/services/reseaux",
  },
  {
    title: { fr: "Data Analysis", en: "Data Analysis", ar: "تحليل البيانات" },
    description: {
      fr: "Tableaux de bord BI et insights stratégiques à partir de vos données.",
      en: "BI dashboards and strategic insights drawn from your data.",
      ar: "لوحات معلومات ذكاء الأعمال ورؤى استراتيجية مستخلصة من بياناتكم.",
    },
    icon: "fas fa-chart-bar",
    color: "color-1ac0c6",
    link: "/services/data",
  },
  {
    title: { fr: "Consulting & Formations", en: "Consulting & Training", ar: "الاستشارات والتدريب" },
    description: {
      fr: "Cahier des charges, conseil et transfert de compétences pour vos équipes.",
      en: "Requirements, advice and skills transfer for your teams.",
      ar: "تحديد المتطلبات والاستشارة ونقل المهارات لفرقكم.",
    },
    icon: "fas fa-chalkboard-teacher",
    color: "",
    link: "/services/consulting",
  },
];

export default featuredServices;
