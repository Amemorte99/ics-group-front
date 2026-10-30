// Titres et descriptions par défaut de chaque page, dans les trois langues.
// Le back office (SEO) peut les remplacer page par page ; les services portent aussi leur bandeau (caption).
const p = (fr, en, ar) => ({ fr, en, ar });

export const PAGE_SEO = {
  '/services': {
    title: p('Nos services : cybersécurité, énergie solaire, web et réseaux', 'Our services: cybersecurity, solar energy, web and networks', 'خدماتنا: الأمن السيبراني والطاقة الشمسية والويب والشبكات'),
    description: p(
      "Cybersécurité, énergies renouvelables, développement web et mobile, réseaux et télécoms, data, marketing digital et consulting : les services d'ICS GROUPE au Tchad, en France et à distance.",
      'Cybersecurity, renewable energy, web and mobile development, networks and telecoms, data, digital marketing and consulting: ICS GROUPE services in Chad, France and remotely.',
      'الأمن السيبراني والطاقات المتجددة وتطوير الويب والجوال والشبكات والاتصالات والبيانات والتسويق الرقمي والاستشارات: خدمات ICS GROUPE في تشاد وفرنسا وعن بُعد.'
    ),
    caption: p('Des solutions complètes pour votre transformation', 'Complete solutions for your transformation', 'حلول متكاملة لتحوّلكم'),
    heading: p('Nos services', 'Our services', 'خدماتنا'),
  },
  '/services/cybersecurite': {
    title: p('Cybersécurité : audit, protection et formation', 'Cybersecurity: audit, protection and training', 'الأمن السيبراني: تدقيق وحماية وتدريب'),
    description: p("Audit de sécurité, protection des systèmes, continuité d'activité et formation : ICS GROUPE sécurise vos données et vos infrastructures.", 'Security audit, system protection, business continuity and training: ICS GROUPE secures your data and infrastructure.', 'تدقيق أمني وحماية للأنظمة واستمرارية للأعمال وتدريب: تؤمّن ICS GROUPE بياناتكم وبنيتكم التحتية.'),
    heading: p('Cybersécurité', 'Cybersecurity', 'الأمن السيبراني'),
    caption: p('Protégez votre entreprise contre les menaces numériques', 'Protect your business against digital threats', 'احموا شركتكم من التهديدات الرقمية'),
  },
  '/services/energie': {
    title: p('Énergie solaire : étude, installation et maintenance', 'Solar energy: study, installation and maintenance', 'الطاقة الشمسية: دراسة وتركيب وصيانة'),
    description: p("Panneaux solaires, onduleurs, batteries et maintenance : ICS GROUPE conçoit et installe des solutions solaires adaptées à votre budget, à N'Djamena et partout au Tchad.", "Solar panels, inverters, batteries and maintenance: ICS GROUPE designs and installs solar solutions tailored to your budget, in N'Djamena and across Chad.", 'ألواح شمسية ومحوّلات وبطاريات وصيانة: تصمم ICS GROUPE وتركّب حلولًا شمسية تناسب ميزانيتكم في إنجامينا وفي كل أنحاء تشاد.'),
    heading: p('Énergies Renouvelables', 'Renewable Energy', 'الطاقات المتجددة'),
    caption: p('Solutions solaires complètes pour réduire votre facture et votre empreinte carbone', 'Complete solar solutions to cut your bill and carbon footprint', 'حلول شمسية متكاملة لتقليل فاتورتكم وبصمتكم الكربونية'),
  },
  '/services/web': {
    title: p('Création de sites web et applications mobiles sur mesure', 'Custom website and mobile app development', 'تطوير مواقع وتطبيقات جوال مخصصة'),
    description: p("Sites vitrines, e-commerce, applications web et mobiles : ICS GROUPE développe des solutions performantes et sécurisées pour les entreprises au Tchad, en France et à l'international.", 'Showcase sites, e-commerce, web and mobile apps: ICS GROUPE builds high-performance, secure solutions for businesses in Chad, France and worldwide.', 'مواقع تعريفية ومتاجر إلكترونية وتطبيقات ويب وجوال: تطوّر ICS GROUPE حلولًا عالية الأداء وآمنة للشركات في تشاد وفرنسا وحول العالم.'),
    heading: p('Sites Web & Applications Mobiles', 'Websites & Mobile Apps', 'المواقع وتطبيقات الجوال'),
    caption: p('Des solutions digitales performantes et sur mesure', 'High-performance, tailor-made digital solutions', 'حلول رقمية عالية الأداء ومصممة حسب الطلب'),
  },
  '/services/reseaux': {
    title: p('Réseaux et télécommunications : conception et maintenance', 'Networks and telecommunications: design and maintenance', 'الشبكات والاتصالات: تصميم وصيانة'),
    description: p("Interconnexion de sites, Wi-Fi professionnel, maintenance d'infrastructures et conseil : une connectivité fiable et sécurisée pour votre entreprise.", 'Site interconnection, professional Wi-Fi, infrastructure maintenance and advice: reliable, secure connectivity for your business.', 'ربط المواقع وشبكات واي فاي احترافية وصيانة البنى التحتية والاستشارات: اتصال موثوق وآمن لشركتكم.'),
    heading: p('Réseaux & Télécommunications', 'Networks & Telecommunications', 'الشبكات والاتصالات'),
    caption: p('Une connectivité fiable pour votre entreprise', 'Reliable connectivity for your business', 'اتصال موثوق لشركتكم'),
  },
  '/services/data': {
    title: p('Data et bases de données : analyse et automatisation', 'Data and databases: analysis and automation', 'البيانات وقواعد البيانات: تحليل وأتمتة'),
    description: p('Conception de bases de données, analyse de données et automatisation des processus : transformez vos données en décisions fiables.', 'Database design, data analysis and process automation: turn your data into reliable decisions.', 'تصميم قواعد البيانات وتحليل البيانات وأتمتة العمليات: حوّلوا بياناتكم إلى قرارات موثوقة.'),
    heading: p('Data Analysis', 'Data Analysis', 'تحليل البيانات'),
    caption: p('Des décisions fondées sur vos données', 'Decisions grounded in your data', 'قرارات مبنية على بياناتكم'),
  },
  '/services/marketing': {
    title: p('Marketing digital : visibilité en ligne et SEO', 'Digital marketing: online visibility and SEO', 'التسويق الرقمي: الظهور على الإنترنت وتحسين محركات البحث'),
    description: p("Stratégie digitale, référencement naturel, publicité en ligne et réseaux sociaux : boostez la visibilité de votre entreprise.", 'Digital strategy, SEO, online advertising and social media: boost your business visibility.', 'استراتيجية رقمية وتحسين محركات البحث وإعلانات وشبكات اجتماعية: عزّزوا ظهور شركتكم.'),
    heading: p('Marketing Digital', 'Digital Marketing', 'التسويق الرقمي'),
    caption: p('Boostez votre visibilité en ligne', 'Boost your online visibility', 'عزّزوا ظهوركم على الإنترنت'),
  },
  '/services/design': {
    title: p('Design graphique et communication visuelle', 'Graphic design and visual communication', 'التصميم الجرافيكي والاتصال البصري'),
    description: p("Logos, identités visuelles, supports print et digitaux : une image de marque cohérente et professionnelle.", 'Logos, visual identities, print and digital materials: a consistent, professional brand image.', 'شعارات وهويات بصرية ومواد مطبوعة ورقمية: صورة علامة تجارية متناسقة واحترافية.'),
    heading: p('Design Graphique & Communication', 'Graphic Design & Communication', 'التصميم الجرافيكي والاتصال'),
    caption: p('Une image de marque cohérente et professionnelle', 'A consistent, professional brand image', 'صورة علامة تجارية متناسقة واحترافية'),
  },
  '/services/consulting': {
    title: p('Consulting IT et transformation digitale', 'IT consulting and digital transformation', 'الاستشارات التقنية والتحول الرقمي'),
    description: p("Diagnostic, feuille de route et accompagnement de la transformation digitale : de l'étude à la mise en œuvre.", 'Assessment, roadmap and support for digital transformation: from study to implementation.', 'تشخيص وخارطة طريق ومرافقة للتحول الرقمي: من الدراسة إلى التنفيذ.'),
    heading: p('Consulting & Formations', 'Consulting & Training', 'الاستشارات والتدريب'),
    caption: p('Conseil et transfert de compétences pour vos équipes', 'Advice and skills transfer for your teams', 'استشارات ونقل مهارات لفرقكم'),
  },
  '/portfolio': {
    title: p('Réalisations en cybersécurité, énergie et web', 'Projects in cybersecurity, energy and web', 'مشاريع في الأمن السيبراني والطاقة والويب'),
    description: p("Découvrez les projets réalisés par ICS GROUPE : cybersécurité, énergie solaire, développement web et réseaux pour des clients au Tchad, en France et à l'international.", 'Discover the projects delivered by ICS GROUPE: cybersecurity, solar energy, web development and networks for clients in Chad, France and worldwide.', 'اكتشفوا المشاريع التي أنجزتها ICS GROUPE: الأمن السيبراني والطاقة الشمسية وتطوير المواقع والشبكات لعملاء في تشاد وفرنسا وحول العالم.'),
  },
  '/blog': {
    title: p('Blog cybersécurité, énergie et digital', 'Cybersecurity, energy and digital blog', 'مدونة الأمن السيبراني والطاقة والرقمنة'),
    description: p("Analyses et conseils d'ICS GROUPE sur la cybersécurité, les énergies renouvelables et la transformation digitale.", 'ICS GROUPE analysis and advice on cybersecurity, renewable energy and digital transformation.', 'تحليلات ونصائح من ICS GROUPE حول الأمن السيبراني والطاقات المتجددة والتحول الرقمي.'),
  },
  '/about-us': {
    title: p("À propos : une équipe d'experts basée à N'Djamena", "About us: a team of experts based in N'Djamena", 'من نحن: فريق خبراء مقره إنجامينا'),
    description: p("ICS GROUPE réunit des experts en cybersécurité, énergies renouvelables, développement web et réseaux, basés à N'Djamena et actifs au Tchad, en France et à l'international.", "ICS GROUPE brings together experts in cybersecurity, renewable energy, web development and networks, based in N'Djamena and active in Chad, France and worldwide.", 'تجمع ICS GROUPE خبراء في الأمن السيبراني والطاقات المتجددة وتطوير المواقع والشبكات، مقرهم إنجامينا وينشطون في تشاد وفرنسا وحول العالم.'),
  },
  '/faq': {
    title: p('Questions fréquentes', 'Frequently asked questions', 'الأسئلة الشائعة'),
    description: p("Réponses aux questions fréquentes sur les services d'ICS GROUPE : cybersécurité, énergie solaire, développement web, délais et accompagnement.", 'Answers to frequently asked questions about ICS GROUPE services: cybersecurity, solar energy, web development, timelines and support.', 'إجابات عن الأسئلة الشائعة حول خدمات ICS GROUPE: الأمن السيبراني والطاقة الشمسية وتطوير المواقع والمواعيد والمرافقة.'),
  },
  '/privacy-policy': {
    title: p('Politique de confidentialité', 'Privacy policy', 'سياسة الخصوصية'),
    description: p("Politique de confidentialité d'ICS GROUPE : données collectées, usage et droits des utilisateurs.", 'ICS GROUPE privacy policy: data collected, use and user rights.', 'سياسة خصوصية ICS GROUPE: البيانات المجمّعة واستخدامها وحقوق المستخدمين.'),
  },
  '/terms-condition': {
    title: p('Conditions générales', 'Terms and conditions', 'الشروط والأحكام'),
    description: p("Conditions générales d'utilisation du site et des services d'ICS GROUPE.", 'General terms of use for the ICS GROUPE website and services.', 'الشروط العامة لاستخدام موقع وخدمات ICS GROUPE.'),
  },
};
