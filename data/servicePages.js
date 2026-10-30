// data/servicePages.js
// Contenu des pages de détail des services, en français, anglais et arabe.
// Dans les textes, **mot** met en gras. Les images sont locales (aucune dépendance à un site tiers).
const t = (fr, en, ar) => ({ fr, en, ar });
const list = (fr, en, ar) => ({ fr, en, ar });

const servicePages = {
  cybersecurite: {
    image: '/images/services/cybersecurite.webp',
    alt: t('Cybersécurité ICS GROUPE - Protection avancée des données', 'ICS GROUPE cybersecurity - Advanced data protection', 'الأمن السيبراني من ICS GROUPE - حماية متقدمة للبيانات'),
    heading: t('Renforcez la résilience cybersécurité de votre entreprise', 'Strengthen your company’s cybersecurity resilience', 'عزّزوا صمود شركتكم أمام التهديدات السيبرانية'),
    paragraphs: [
      t('La transformation digitale s’accélère et offre de réelles opportunités de proposer des services à valeur ajoutée. Cependant, elle présente aussi de nombreuses menaces pour les entreprises avec l’ouverture des systèmes d’information vers de nouveaux partenaires.',
        'Digital transformation is accelerating and creates real opportunities to offer value-added services. It also brings many threats to businesses as information systems open up to new partners.',
        'يتسارع التحول الرقمي ويتيح فرصًا حقيقية لتقديم خدمات ذات قيمة مضافة، لكنه يحمل أيضًا تهديدات كثيرة للشركات مع انفتاح نظم المعلومات على شركاء جدد.'),
      t('Abordez l’avenir des technologies en toute sérénité en maîtrisant les risques, dans un contexte où les cyberattaques et les fraudes internes sont de plus en plus nombreuses et ciblées.',
        'Face the future of technology with confidence by controlling risks, in a context where cyberattacks and internal fraud are increasingly frequent and targeted.',
        'واجهوا مستقبل التقنيات بثقة من خلال التحكم في المخاطر، في سياق تتزايد فيه الهجمات السيبرانية والاحتيال الداخلي وتستهدف أهدافًا محددة.'),
      t('Avec une vision globale de la cybersécurité, **ICS GROUPE** met à votre disposition une équipe d’experts certifiés :',
        'With a global vision of cybersecurity, **ICS GROUPE** provides a team of certified experts:',
        'برؤية شاملة للأمن السيبراني، تضع **ICS GROUPE** تحت تصرفكم فريقًا من الخبراء المعتمدين:'),
    ],
    items: [
      t('ISO 27001, ISO 27005', 'ISO 27001, ISO 27005', 'ISO 27001 وISO 27005'),
      t('CISM, CISSP', 'CISM, CISSP', 'CISM وCISSP'),
      t('Spécialistes en continuité d’activité (CBCP, CBCI, ISO 22301)', 'Business continuity specialists (CBCP, CBCI, ISO 22301)', 'متخصصون في استمرارية الأعمال (CBCP وCBCI وISO 22301)'),
      t('Experts en investigation numérique (CCFP, CCE, CHFI, CFCE, GSFA, GSFE GIAC)', 'Digital forensics experts (CCFP, CCE, CHFI, CFCE, GSFA, GSFE GIAC)', 'خبراء في التحقيق الرقمي (CCFP وCCE وCHFI وCFCE وGSFA وGSFE GIAC)'),
    ],
    quote: t('« La résilience cybersécurité de nos clients est notre raison d’être ! »', '“Our clients’ cybersecurity resilience is our reason for being!”', '«صمود عملائنا أمام التهديدات السيبرانية هو سبب وجودنا!»'),
  },

  web: {
    image: '/images/services/web-mobile.webp',
    alt: t('Sites Web & Applications Mobiles ICS GROUPE - Développement digital sur mesure', 'ICS GROUPE websites & mobile apps - Custom digital development', 'مواقع وتطبيقات جوال من ICS GROUPE - تطوير رقمي مخصص'),
    heading: t('Votre présence digitale optimisée', 'Your optimized digital presence', 'حضوركم الرقمي في أفضل صورة'),
    paragraphs: [
      t('Ce pôle d’activité prend en compte les services suivants : création de sites web, développement d’applications mobiles, informatisation des systèmes d’information et gestion de bases de données.',
        'This business unit covers the following services: website creation, mobile app development, information system computerization and database management.',
        'يشمل هذا القطاع الخدمات التالية: إنشاء المواقع الإلكترونية وتطوير تطبيقات الجوال ورقمنة نظم المعلومات وإدارة قواعد البيانات.'),
      t('Nous concevons et développons des sites web modernes, responsives et des applications mobiles natives ou hybrides parfaitement adaptées à vos besoins et à ceux de vos utilisateurs.',
        'We design and build modern, responsive websites and native or hybrid mobile apps perfectly suited to your needs and those of your users.',
        'نصمم ونطوّر مواقع حديثة ومتجاوبة وتطبيقات جوال أصلية أو هجينة تناسب تمامًا احتياجاتكم واحتياجات مستخدميكم.'),
      t('De la conception à la maintenance, nous assurons une informatisation complète de vos processus pour une performance optimale et une évolutivité durable.',
        'From design to maintenance, we computerize your processes end to end for optimal performance and lasting scalability.',
        'من التصميم إلى الصيانة، نضمن رقمنة كاملة لعملياتكم لأداء مثالي وقابلية للتطور على المدى الطويل.'),
    ],
    items: [
      t('Création de sites web professionnels et responsives', 'Professional, responsive website creation', 'إنشاء مواقع إلكترونية احترافية ومتجاوبة'),
      t('Développement d’applications mobiles (iOS & Android)', 'Mobile app development (iOS & Android)', 'تطوير تطبيقات الجوال (iOS وAndroid)'),
      t('Informatisation des systèmes d’information', 'Information system computerization', 'رقمنة نظم المعلومات'),
      t('Conception et gestion de bases de données sécurisées', 'Design and management of secure databases', 'تصميم قواعد بيانات آمنة وإدارتها'),
      t('Maintenance, mises à jour et évolution continue', 'Maintenance, updates and continuous improvement', 'الصيانة والتحديثات والتطوير المستمر'),
      t('Solutions techniques adaptées à votre secteur', 'Technical solutions adapted to your industry', 'حلول تقنية تناسب قطاعكم'),
    ],
  },

  energie: {
    image: '/images/services/energie-solaire.webp',
    alt: t('Énergies Renouvelables ICS GROUPE - Installation solaire complète', 'ICS GROUPE renewable energy - Complete solar installation', 'الطاقات المتجددة من ICS GROUPE - تركيب شمسي متكامل'),
    heading: t('Énergie solaire professionnelle et accessible', 'Professional, accessible solar energy', 'طاقة شمسية احترافية وفي المتناول'),
    paragraphs: [
      t('Panneaux solaires, fixations des panneaux solaires, régulateur solaire, batterie solaire, chargeur de batterie solaire, onduleur solaire 230V, onduleur chargeur 230V, convertisseur DC/DC, éclairage solaire, câbles et accessoires...',
        'Solar panels, panel mounts, solar charge controllers, solar batteries, solar battery chargers, 230V solar inverters, 230V inverter chargers, DC/DC converters, solar lighting, cables and accessories...',
        'ألواح شمسية ودعامات تثبيت ومنظّمات شحن شمسية وبطاريات شمسية وشواحن بطاريات ومحوّلات شمسية 230 فولت ومحوّلات-شواحن 230 فولت ومحوّلات DC/DC وإضاءة شمسية وكابلات وملحقات...'),
      t('Que ce soit par l’information, la formation, la conception, la vente, l’installation ou la maintenance de systèmes d’efficacité énergétique, ICS GROUPE offre à ses clients un service professionnel qualifié et adapté à leurs besoins particuliers.',
        'Whether through information, training, design, sales, installation or maintenance of energy efficiency systems, ICS GROUPE offers its clients a qualified, professional service tailored to their specific needs.',
        'سواء عبر المعلومات أو التدريب أو التصميم أو البيع أو التركيب أو صيانة أنظمة كفاءة الطاقة، تقدّم ICS GROUPE لعملائها خدمة احترافية مؤهلة تناسب احتياجاتهم الخاصة.'),
      t('Nous étudions vos besoins dès le départ et y trouvons ensuite une solution rapidement, dans le respect de votre budget. Nos produits et services permettent aux entreprises et particuliers d’optimiser leur rendement énergétique, de réduire leur empreinte écologique, tout en maximisant leur retour sur investissement le plus rapidement possible, avec une équipe professionnelle, responsable et dynamique !',
        'We study your needs from the start, then quickly find a solution that respects your budget. Our products and services help businesses and individuals optimize their energy yield and reduce their environmental footprint while maximizing their return on investment as quickly as possible, with a professional, responsible and dynamic team!',
        'ندرس احتياجاتكم منذ البداية ثم نجد لها حلًا بسرعة مع احترام ميزانيتكم. تتيح منتجاتنا وخدماتنا للشركات والأفراد تحسين مردودهم من الطاقة وتقليل بصمتهم البيئية مع تعظيم عائد استثمارهم في أسرع وقت، بفريق محترف ومسؤول ونشيط!'),
    ],
    items: [
      t('Étude personnalisée de vos besoins', 'Personalized study of your needs', 'دراسة مخصصة لاحتياجاتكم'),
      t('Solutions adaptées à votre budget', 'Solutions tailored to your budget', 'حلول تناسب ميزانيتكم'),
      t('Optimisation du rendement énergétique', 'Energy yield optimization', 'تحسين مردود الطاقة'),
      t('Réduction de l’empreinte écologique', 'Reduced environmental footprint', 'تقليل البصمة البيئية'),
      t('Retour sur investissement rapide', 'Fast return on investment', 'عائد سريع على الاستثمار'),
      t('Équipe dynamique et responsable', 'Dynamic, responsible team', 'فريق نشيط ومسؤول'),
      t('Maintenance et formation incluses', 'Maintenance and training included', 'الصيانة والتدريب مشمولان'),
    ],
  },

  reseaux: {
    image: '/images/services/reseaux-telecoms.webp',
    alt: t('Réseaux & Télécommunications ICS GROUPE - Infrastructure fiable et performante', 'ICS GROUPE networks & telecommunications - Reliable, high-performance infrastructure', 'الشبكات والاتصالات من ICS GROUPE - بنية تحتية موثوقة وعالية الأداء'),
    heading: t('Solutions globales de réseaux et télécommunications', 'Complete network and telecommunications solutions', 'حلول متكاملة للشبكات والاتصالات'),
    paragraphs: [
      t('ICS GROUPE vous accompagne dans l’interconnexion de vos sites avec liaisons multiples, en concevant des supports de communication optimisés pour une visibilité maximale et une efficacité accrue.',
        'ICS GROUPE supports you in interconnecting your sites with multiple links, designing communication infrastructure optimized for maximum visibility and greater efficiency.',
        'ترافقكم ICS GROUPE في ربط مواقعكم عبر وصلات متعددة، مع تصميم دعائم اتصال محسّنة لأقصى ظهور وكفاءة أعلى.'),
      t('Nous proposons un accompagnement complet pour la conception, la maintenance et la gestion des infrastructures des fournisseurs d’accès internet, garantissant ainsi un service fiable et performant pour vos utilisateurs.',
        'We provide full support for the design, maintenance and management of internet service provider infrastructure, ensuring a reliable, high-performance service for your users.',
        'نقدّم مرافقة كاملة لتصميم بنى مزودي خدمة الإنترنت التحتية وصيانتها وإدارتها، بما يضمن خدمة موثوقة وعالية الأداء لمستخدميكم.'),
      t('Nous offrons également des services de conseil et d’assistance dans le domaine des réseaux et télécommunications, vous aidant à optimiser vos infrastructures et à garantir des solutions efficaces pour répondre à vos besoins spécifiques.',
        'We also provide consulting and assistance in networks and telecommunications, helping you optimize your infrastructure and ensure effective solutions for your specific needs.',
        'نقدّم أيضًا خدمات استشارية ومساعدة في مجال الشبكات والاتصالات، لمساعدتكم على تحسين بنيتكم التحتية وضمان حلول فعّالة تلبي احتياجاتكم الخاصة.'),
    ],
    items: [
      t('Interconnexion de sites avec liaisons multiples', 'Site interconnection with multiple links', 'ربط المواقع عبر وصلات متعددة'),
      t('Conception de supports optimisés pour visibilité et efficacité', 'Infrastructure design optimized for visibility and efficiency', 'تصميم دعائم محسّنة للظهور والكفاءة'),
      t('Support et maintenance des infrastructures FAI', 'ISP infrastructure support and maintenance', 'دعم وصيانة البنى التحتية لمزودي الإنترنت'),
      t('Gestion complète et service fiable pour vos utilisateurs', 'Full management and reliable service for your users', 'إدارة كاملة وخدمة موثوقة لمستخدميكم'),
      t('Conseil et assistance technique personnalisée', 'Personalized consulting and technical assistance', 'استشارات ومساعدة تقنية مخصصة'),
      t('Optimisation continue de vos réseaux', 'Continuous network optimization', 'تحسين مستمر لشبكاتكم'),
    ],
  },

  data: {
    image: '/images/services/data-analysis.webp',
    alt: t('Data Analysis ICS GROUPE - Transformation des données en insights stratégiques', 'ICS GROUPE data analysis - Turning data into strategic insights', 'تحليل البيانات من ICS GROUPE - تحويل البيانات إلى رؤى استراتيجية'),
    heading: t('Analysez vos données pour prendre les meilleures décisions', 'Analyze your data to make the best decisions', 'حلّلوا بياناتكم لاتخاذ أفضل القرارات'),
    lead: t('« Analyser les données pour aider à la prise de décisions... »', '“Analyzing data to support decision-making...”', '«تحليل البيانات للمساعدة في اتخاذ القرارات...»'),
    paragraphs: [
      t('Notre service d’analyse de données prend en compte toute la complexité de vos données et vous aide notamment à :',
        'Our data analysis service takes into account the full complexity of your data and helps you in particular to:',
        'تأخذ خدمة تحليل البيانات لدينا في الحسبان كامل تعقيد بياناتكم وتساعدكم خصوصًا على:'),
    ],
    items: [
      t('Analyser de grands volumes de données provenant de sources disparates, sous diverses formes et types, en temps opportun', 'Analyze large volumes of data from disparate sources, in various forms and types, in a timely manner', 'تحليل كميات كبيرة من البيانات من مصادر متفرقة وبأشكال وأنواع مختلفة في الوقت المناسب'),
      t('Prendre rapidement des décisions éclairées pour élaborer des stratégies efficaces (amélioration de la chaîne d’approvisionnement, logistique, prise de décision tactique)', 'Quickly make informed decisions to build effective strategies (supply chain improvement, logistics, tactical decision-making)', 'اتخاذ قرارات مستنيرة بسرعة لوضع استراتيجيات فعّالة (تحسين سلسلة الإمداد واللوجستيات واتخاذ القرارات التكتيكية)'),
      t('Réaliser des économies grâce à l’efficacité accrue et à l’optimisation des processus commerciaux', 'Save money through greater efficiency and optimized business processes', 'تحقيق وفورات بفضل زيادة الكفاءة وتحسين العمليات التجارية'),
      t('Mettre en place des techniques de gestion des risques plus éclairées basées sur des échantillons de données de grande taille', 'Implement better-informed risk management techniques based on large data samples', 'اعتماد تقنيات أكثر استنارة لإدارة المخاطر تستند إلى عينات بيانات كبيرة'),
      t('Obtenir une meilleure connaissance du comportement, des demandes et des sentiments des consommateurs pour améliorer le développement de produits et les processus de gestion stratégique', 'Gain a better understanding of consumer behavior, demands and sentiment to improve product development and strategic management processes', 'اكتساب فهم أفضل لسلوك المستهلكين وطلباتهم ومشاعرهم لتحسين تطوير المنتجات وعمليات الإدارة الاستراتيجية'),
    ],
    closing: t('Grâce à notre expertise en Business Intelligence et visualisation de données, nous transformons vos données brutes en insights actionnables qui boostent votre performance globale.',
      'Thanks to our expertise in Business Intelligence and data visualization, we turn your raw data into actionable insights that boost your overall performance.',
      'بفضل خبرتنا في ذكاء الأعمال وتصوير البيانات، نحوّل بياناتكم الخام إلى رؤى قابلة للتنفيذ ترفع أداءكم العام.'),
  },

  marketing: {
    image: '/images/services/marketing-digital.webp',
    alt: t('Marketing Digital ICS GROUPE - Stratégie digitale personnalisée', 'ICS GROUPE digital marketing - Personalized digital strategy', 'التسويق الرقمي من ICS GROUPE - استراتيجية رقمية مخصصة'),
    heading: t('Marketing Digital sur mesure', 'Tailor-made digital marketing', 'تسويق رقمي مصمم حسب الطلب'),
    paragraphs: [
      t('Nous collectons vos besoins et attentes. Puis nous les analysons en tenant compte des paramètres tels que la persona, la zone d’activité, l’étude du marché, la veille concurrentielle... pour définir une feuille de route claire.',
        'We gather your needs and expectations, then analyze them taking into account factors such as the persona, area of activity, market research and competitive monitoring... to define a clear roadmap.',
        'نجمع احتياجاتكم وتطلعاتكم ثم نحلّلها مع مراعاة عوامل مثل الشخصية المستهدفة ومجال النشاط ودراسة السوق ومراقبة المنافسين... لوضع خارطة طريق واضحة.'),
      t('Au terme de cette étude, nous définissons trois (3) outils essentiels pour votre succès digital :',
        'At the end of this study, we define three (3) essential tools for your digital success:',
        'في ختام هذه الدراسة، نحدد ثلاث (3) أدوات أساسية لنجاحكم الرقمي:'),
    ],
    items: [
      t('Le **plan marketing** : stratégie de positionnement qui va en droite ligne avec les comportements de la persona et les réalités du marché', 'The **marketing plan**: a positioning strategy aligned with the persona’s behavior and market realities', '**الخطة التسويقية**: استراتيجية تموضع تنسجم مع سلوك الشخصية المستهدفة وواقع السوق'),
      t('Les **outils techniques et plateformes numériques** : sélection des plateformes appropriées en fonction de vos produits, services et du profil de votre cible', 'The **technical tools and digital platforms**: selection of the right platforms for your products, services and target profile', '**الأدوات التقنية والمنصات الرقمية**: اختيار المنصات المناسبة لمنتجاتكم وخدماتكم وملف جمهوركم المستهدف'),
      t('Les **outils et indicateurs de performance** : implémentation du plan d’action opérationnel avec suivi régulier et KPI pour évaluer et optimiser les stratégies', 'The **performance tools and indicators**: implementation of the operational action plan with regular follow-up and KPIs to assess and optimize strategies', '**أدوات ومؤشرات الأداء**: تنفيذ خطة العمل التشغيلية مع متابعة منتظمة ومؤشرات أداء لتقييم الاستراتيجيات وتحسينها'),
    ],
    closing: t('Nous participons à l’implémentation et assurons un suivi continu pour garantir des résultats concrets et durables.',
      'We take part in the implementation and provide continuous follow-up to ensure concrete, lasting results.',
      'نشارك في التنفيذ ونضمن متابعة مستمرة لتحقيق نتائج ملموسة ودائمة.'),
  },

  design: {
    image: '/images/services/design-graphique.webp',
    alt: t('Design Graphique & Communication ICS GROUPE - Création visuelle professionnelle', 'ICS GROUPE graphic design & communication - Professional visual creation', 'التصميم الجرافيكي والاتصال من ICS GROUPE - إبداع بصري احترافي'),
    heading: t('Design au service de votre entreprise', 'Design at the service of your business', 'التصميم في خدمة شركتكم'),
    paragraphs: [
      t('ICS GROUPE vous accompagne dans la conception de supports de communication optimisés qui répondent aux normes de communication et aux codes marketing.',
        'ICS GROUPE helps you design optimized communication materials that meet communication standards and marketing codes.',
        'ترافقكم ICS GROUPE في تصميم مواد اتصال محسّنة تستجيب لمعايير الاتصال وأعراف التسويق.'),
      t('Nous mettons l’art du design graphique au service de votre entreprise grâce à des contenus visuels et textuels correspondant parfaitement à vos attentes et à celles de votre public cible.',
        'We put the art of graphic design at the service of your business with visual and written content that perfectly matches your expectations and those of your target audience.',
        'نضع فن التصميم الجرافيكي في خدمة شركتكم عبر محتوى بصري ونصي يطابق تمامًا تطلعاتكم وتطلعات جمهوركم المستهدف.'),
      t('Nous vous aidons à travailler vos propositions de valeur pour améliorer votre positionnement marketing et créer des argumentaires commerciaux plus pertinents qui feront la différence sur le terrain.',
        'We help you refine your value propositions to improve your marketing positioning and create more relevant sales pitches that make the difference in the field.',
        'نساعدكم على صقل عروض القيمة لديكم لتحسين تموضعكم التسويقي وصياغة عروض تجارية أكثر صلة تصنع الفارق على أرض الواقع.'),
    ],
    items: [
      t('Création d’identité visuelle (logo, charte graphique)', 'Visual identity creation (logo, brand guidelines)', 'ابتكار الهوية البصرية (الشعار والدليل الجرافيكي)'),
      t('Supports print et digitaux (flyers, brochures, bannières, réseaux sociaux)', 'Print and digital materials (flyers, brochures, banners, social media)', 'مواد مطبوعة ورقمية (منشورات ونشرات ولافتات وشبكات اجتماعية)'),
      t('Optimisation de vos propositions de valeur', 'Optimization of your value propositions', 'تحسين عروض القيمة لديكم'),
      t('Argumentaires commerciaux pertinents et différenciants', 'Relevant, differentiating sales pitches', 'عروض تجارية ملائمة ومميِّزة'),
      t('Contenus adaptés à votre public cible', 'Content tailored to your target audience', 'محتوى يناسب جمهوركم المستهدف'),
    ],
  },

  consulting: {
    image: '/images/services/consulting-formation.webp',
    alt: t('Consulting & Formations ICS GROUPE - Expertise et transfert de compétences', 'ICS GROUPE consulting & training - Expertise and skills transfer', 'الاستشارات والتدريب من ICS GROUPE - خبرة ونقل مهارات'),
    heading: t('Accompagnement global et formation sur mesure', 'End-to-end support and tailor-made training', 'مرافقة شاملة وتدريب مصمم حسب الحاجة'),
    paragraphs: [
      t('Nous assurons un **consulting global** pour tous vos besoins ayant une droite ligne avec nos pôles d’activités.',
        'We provide **comprehensive consulting** for all your needs related to our areas of activity.',
        'نقدّم **استشارات شاملة** لجميع احتياجاتكم المرتبطة بمجالات نشاطنا.'),
      t('Nous vous livrons un **cahier des charges complet** prêt à l’exploitation et à l’exécution.',
        'We deliver a **complete requirements specification**, ready for use and execution.',
        'نسلّمكم **دفتر شروط كاملًا** جاهزًا للاستغلال والتنفيذ.'),
      t('Nous offrons des **formations** dans tous nos domaines de compétences. Il est également possible de solliciter un **service de transfert de compétences** dédié à vos équipes techniques, avec un accompagnement post-formation.',
        'We offer **training** in all our areas of expertise. You can also request a dedicated **skills transfer service** for your technical teams, with post-training support.',
        'نقدّم **دورات تدريبية** في جميع مجالات خبرتنا. ويمكنكم أيضًا طلب **خدمة نقل مهارات** مخصصة لفرقكم التقنية، مع مرافقة بعد التدريب.'),
    ],
    items: [
      t('Rédaction d’un cahier des charges détaillé et prêt à l’exécution', 'Drafting of a detailed requirements specification, ready for execution', 'إعداد دفتر شروط مفصّل جاهز للتنفيذ'),
      t('Conseil stratégique et technique personnalisé', 'Personalized strategic and technical advice', 'استشارات استراتيجية وتقنية مخصصة'),
      t('Formations spécialisées dans tous nos domaines (cybersécurité, réseaux, énergie solaire, data, etc.)', 'Specialized training in all our fields (cybersecurity, networks, solar energy, data, etc.)', 'دورات تدريبية متخصصة في جميع مجالاتنا (الأمن السيبراني والشبكات والطاقة الشمسية والبيانات وغيرها)'),
      t('Transfert de compétences pour vos équipes techniques', 'Skills transfer for your technical teams', 'نقل المهارات لفرقكم التقنية'),
      t('Accompagnement et suivi post-formation', 'Post-training support and follow-up', 'مرافقة ومتابعة بعد التدريب'),
    ],
  },
};

export default servicePages;
