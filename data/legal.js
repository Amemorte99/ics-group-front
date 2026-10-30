// data/legal.js
// Pages légales (confidentialité, conditions d'utilisation) et FAQ, en français, anglais et arabe.
// Textes à faire relire par un juriste avant d'être considérés comme définitifs.
const t = (fr, en, ar) => ({ fr, en, ar });

export const privacy = {
  updated: t('Dernière mise à jour : octobre 2026', 'Last updated: October 2026', 'آخر تحديث: أكتوبر 2026'),
  intro: t(
    "La présente politique explique quelles données personnelles ICS GROUPE collecte sur ce site, pourquoi, et quels sont vos droits.",
    'This policy explains which personal data ICS GROUPE collects on this website, why, and what your rights are.',
    'توضح هذه السياسة البيانات الشخصية التي تجمعها ICS GROUPE عبر هذا الموقع وسبب جمعها وحقوقكم.'
  ),
  sections: [
    {
      title: t('Qui est responsable de vos données ?', 'Who is responsible for your data?', 'من المسؤول عن بياناتكم؟'),
      paragraphs: [
        t("ICS GROUPE, dont le siège est situé Rue de Corniche, Sabangali, N'Djamena (Tchad), est responsable du traitement des données collectées sur ce site. Contact : info@icsgroupe.com.",
          'ICS GROUPE, headquartered at Rue de Corniche, Sabangali, N\'Djamena (Chad), is responsible for the data collected on this website. Contact: info@icsgroupe.com.',
          'ICS GROUPE، ومقرها شارع الكورنيش، سابانغالي، إنجامينا (تشاد)، هي المسؤولة عن معالجة البيانات المجمّعة عبر هذا الموقع. للتواصل: info@icsgroupe.com.'),
      ],
    },
    {
      title: t('Données que nous collectons', 'Data we collect', 'البيانات التي نجمعها'),
      paragraphs: [t('Nous ne collectons que les données nécessaires :', 'We only collect the data we need:', 'نجمع فقط البيانات الضرورية:')],
      items: [
        t('Formulaire de contact : nom, adresse e-mail, numéro de téléphone, sujet et message que vous saisissez.', 'Contact form: the name, email address, phone number, subject and message you enter.', 'نموذج الاتصال: الاسم والبريد الإلكتروني ورقم الهاتف والموضوع والرسالة التي تدخلونها.'),
        t("Données techniques : adresse IP et type de navigateur, enregistrés par les serveurs pour assurer la sécurité et le bon fonctionnement du site.", 'Technical data: IP address and browser type, recorded by our servers to ensure the security and proper operation of the site.', 'بيانات تقنية: عنوان IP ونوع المتصفح، تسجلها خوادمنا لضمان أمن الموقع وحسن سيره.'),
        t("Mesure d'audience : le cas échéant, des statistiques de fréquentation, uniquement si ces outils sont activés sur le site.", 'Audience measurement: where applicable, traffic statistics, only if such tools are enabled on the site.', 'قياس الجمهور: عند الاقتضاء، إحصاءات الزيارات، وذلك فقط إذا كانت هذه الأدوات مفعّلة على الموقع.'),
      ],
    },
    {
      title: t('Pourquoi nous utilisons ces données', 'Why we use this data', 'لماذا نستخدم هذه البيانات'),
      items: [
        t('Répondre à vos demandes de devis, de renseignements ou de contact.', 'To reply to your quote, information or contact requests.', 'للرد على طلباتكم المتعلقة بعروض الأسعار أو المعلومات أو الاتصال.'),
        t('Assurer la sécurité du site et prévenir les abus.', 'To keep the site secure and prevent abuse.', 'لضمان أمن الموقع ومنع إساءة الاستخدام.'),
        t("Améliorer le site à partir de statistiques de fréquentation, si elles sont activées.", 'To improve the site using traffic statistics, if enabled.', 'لتحسين الموقع بالاعتماد على إحصاءات الزيارات، إن كانت مفعّلة.'),
      ],
    },
    {
      title: t('Cookies', 'Cookies', 'ملفات تعريف الارتباط'),
      paragraphs: [
        t("Le site public n'utilise pas de cookie publicitaire. Des cookies strictement nécessaires servent à la connexion à l'espace d'administration. Des cookies de mesure d'audience ne sont déposés que si ces outils sont activés.",
          'The public site does not use advertising cookies. Strictly necessary cookies are used to sign in to the administration area. Audience measurement cookies are only set if such tools are enabled.',
          'لا يستخدم الموقع العام ملفات تعريف ارتباط إعلانية. تُستخدم ملفات ضرورية تمامًا لتسجيل الدخول إلى لوحة الإدارة. ولا تُوضع ملفات قياس الجمهور إلا إذا كانت هذه الأدوات مفعّلة.'),
      ],
    },
    {
      title: t('Partage et conservation', 'Sharing and retention', 'المشاركة والاحتفاظ'),
      paragraphs: [
        t("Vos données ne sont ni vendues ni cédées à des fins commerciales. Elles sont accessibles à l'équipe d'ICS GROUPE et aux prestataires techniques qui hébergent le site. Elles sont conservées le temps nécessaire au traitement de votre demande, puis supprimées ou archivées de manière sécurisée.",
          'Your data is neither sold nor transferred for commercial purposes. It is accessible to the ICS GROUPE team and to the technical providers that host the site. It is kept for as long as needed to handle your request, then deleted or securely archived.',
          'لا تُباع بياناتكم ولا تُحال لأغراض تجارية. يطّلع عليها فريق ICS GROUPE ومزودو الخدمات التقنية الذين يستضيفون الموقع. يُحتفظ بها للمدة اللازمة لمعالجة طلبكم، ثم تُحذف أو تُؤرشف بشكل آمن.'),
      ],
    },
    {
      title: t('Vos droits', 'Your rights', 'حقوقكم'),
      paragraphs: [
        t("Vous pouvez demander l'accès à vos données, leur rectification ou leur suppression, ou vous opposer à leur traitement, en écrivant à info@icsgroupe.com. Nous vous répondrons dans un délai raisonnable.",
          'You may request access to your data, its correction or deletion, or object to its processing, by writing to info@icsgroupe.com. We will reply within a reasonable time.',
          'يمكنكم طلب الاطلاع على بياناتكم أو تصحيحها أو حذفها أو الاعتراض على معالجتها بمراسلتنا على info@icsgroupe.com. سنرد عليكم خلال مدة معقولة.'),
      ],
    },
    {
      title: t('Sécurité', 'Security', 'الأمن'),
      paragraphs: [
        t("Les échanges avec le site sont chiffrés (HTTPS) et l'accès aux données est limité aux personnes habilitées. Aucune transmission sur Internet n'étant totalement infaillible, nous ne pouvons toutefois garantir une sécurité absolue.",
          'Communication with the site is encrypted (HTTPS) and access to data is limited to authorized people. As no transmission over the Internet is completely infallible, we cannot guarantee absolute security.',
          'التواصل مع الموقع مشفّر (HTTPS) والوصول إلى البيانات مقصور على المخوَّلين. ولأن أي نقل عبر الإنترنت لا يخلو تمامًا من المخاطر، لا يمكننا ضمان أمان مطلق.'),
      ],
    },
    {
      title: t('Modifications', 'Changes', 'التعديلات'),
      paragraphs: [
        t('Cette politique peut évoluer. La date de dernière mise à jour figure en haut de cette page.', 'This policy may change. The date of the last update appears at the top of this page.', 'قد تتغير هذه السياسة. يظهر تاريخ آخر تحديث أعلى هذه الصفحة.'),
      ],
    },
  ],
};

export const terms = {
  updated: t('Dernière mise à jour : octobre 2026', 'Last updated: October 2026', 'آخر تحديث: أكتوبر 2026'),
  intro: t(
    "En utilisant ce site, vous acceptez les conditions ci-dessous. Si vous ne les acceptez pas, merci de ne pas l'utiliser.",
    'By using this website, you accept the conditions below. If you do not accept them, please do not use it.',
    'باستخدامكم هذا الموقع، فإنكم توافقون على الشروط أدناه. وإن لم توافقوا عليها، يرجى عدم استخدامه.'
  ),
  sections: [
    {
      title: t('Éditeur du site', 'Site publisher', 'ناشر الموقع'),
      paragraphs: [
        t("Ce site est édité par ICS GROUPE, Rue de Corniche, Sabangali, N'Djamena (Tchad). Téléphone : +235 64 78 88 31. E-mail : info@icsgroupe.com.",
          "This website is published by ICS GROUPE, Rue de Corniche, Sabangali, N'Djamena (Chad). Phone: +235 64 78 88 31. Email: info@icsgroupe.com.",
          'يصدر هذا الموقع عن ICS GROUPE، شارع الكورنيش، سابانغالي، إنجامينا (تشاد). الهاتف: 31 88 78 64 235+. البريد الإلكتروني: info@icsgroupe.com.'),
      ],
    },
    {
      title: t('Contenu du site', 'Website content', 'محتوى الموقع'),
      paragraphs: [
        t("Les informations présentées sur ce site sont données à titre indicatif et peuvent être modifiées à tout moment. Elles ne constituent pas une offre contractuelle : tout service fait l'objet d'un devis ou d'un contrat distinct.",
          'The information on this site is provided for guidance and may be changed at any time. It does not constitute a contractual offer: every service is covered by a separate quote or contract.',
          'المعلومات المعروضة في هذا الموقع إرشادية ويمكن تعديلها في أي وقت. ولا تُعد عرضًا تعاقديًا: فكل خدمة تخضع لعرض سعر أو عقد مستقل.'),
      ],
    },
    {
      title: t('Propriété intellectuelle', 'Intellectual property', 'الملكية الفكرية'),
      paragraphs: [
        t("Les textes, logos, images et autres éléments du site appartiennent à ICS GROUPE ou à leurs titulaires respectifs. Toute reproduction ou réutilisation sans autorisation écrite préalable est interdite.",
          'The texts, logos, images and other elements of the site belong to ICS GROUPE or to their respective owners. Any reproduction or reuse without prior written permission is prohibited.',
          'النصوص والشعارات والصور وسائر عناصر الموقع مملوكة لـ ICS GROUPE أو لأصحابها. يُمنع أي نسخ أو إعادة استخدام دون إذن كتابي مسبق.'),
      ],
    },
    {
      title: t('Utilisation du site', 'Use of the site', 'استخدام الموقع'),
      paragraphs: [
        t("Vous vous engagez à utiliser le site de manière légale et à ne pas tenter d'en perturber le fonctionnement ou d'accéder sans autorisation à ses systèmes.",
          'You agree to use the site lawfully and not to try to disrupt its operation or gain unauthorized access to its systems.',
          'تتعهدون باستخدام الموقع بطريقة قانونية وبعدم محاولة تعطيل عمله أو الدخول إلى أنظمته دون إذن.'),
      ],
    },
    {
      title: t('Responsabilité', 'Liability', 'المسؤولية'),
      paragraphs: [
        t("Nous nous efforçons de maintenir le site disponible et ses informations exactes, mais ne pouvons garantir l'absence d'interruption ou d'erreur. ICS GROUPE ne saurait être tenue responsable des dommages indirects liés à l'utilisation du site.",
          'We do our best to keep the site available and its information accurate, but we cannot guarantee that it will be free of interruptions or errors. ICS GROUPE cannot be held liable for indirect damages arising from the use of the site.',
          'نسعى إلى إبقاء الموقع متاحًا ومعلوماته دقيقة، لكن لا يمكننا ضمان خلوّه من الانقطاعات أو الأخطاء. ولا تتحمل ICS GROUPE مسؤولية الأضرار غير المباشرة الناتجة عن استخدام الموقع.'),
      ],
    },
    {
      title: t('Liens externes', 'External links', 'الروابط الخارجية'),
      paragraphs: [
        t("Le site peut contenir des liens vers des sites tiers (par exemple ceux de nos partenaires). ICS GROUPE n'exerce aucun contrôle sur leur contenu et décline toute responsabilité à leur égard.",
          'The site may contain links to third-party sites (for example our partners’). ICS GROUPE has no control over their content and accepts no responsibility for them.',
          'قد يحتوي الموقع على روابط لمواقع أطراف ثالثة (مثل مواقع شركائنا). لا تمارس ICS GROUPE أي رقابة على محتواها ولا تتحمل أي مسؤولية عنها.'),
      ],
    },
    {
      title: t('Données personnelles', 'Personal data', 'البيانات الشخصية'),
      paragraphs: [
        t('Le traitement de vos données personnelles est décrit dans notre politique de confidentialité.', 'The processing of your personal data is described in our privacy policy.', 'تُوصف معالجة بياناتكم الشخصية في سياسة الخصوصية لدينا.'),
      ],
    },
    {
      title: t('Modification des conditions', 'Changes to these terms', 'تعديل الشروط'),
      paragraphs: [
        t('Ces conditions peuvent être modifiées à tout moment ; la version en ligne fait foi.', 'These terms may be changed at any time; the online version prevails.', 'يجوز تعديل هذه الشروط في أي وقت، والنسخة المنشورة على الإنترنت هي المعتمدة.'),
      ],
    },
  ],
};

export const faq = {
  intro: t(
    "Les réponses aux questions que l'on nous pose le plus souvent. Une autre question ? Écrivez-nous, nous répondons volontiers.",
    'Answers to the questions we are asked most often. Another question? Write to us, we are happy to help.',
    'إجابات عن الأسئلة التي تُطرح علينا بكثرة. هل لديكم سؤال آخر؟ راسلونا ويسعدنا الرد.'
  ),
  items: [
    {
      q: t('Quels services propose ICS GROUPE ?', 'Which services does ICS GROUPE offer?', 'ما الخدمات التي تقدمها ICS GROUPE؟'),
      a: t("Cybersécurité, énergies renouvelables (solaire), sites web et applications mobiles, réseaux et télécommunications, analyse de données, marketing digital, design graphique et communication, ainsi que consulting et formations.",
           'Cybersecurity, renewable energy (solar), websites and mobile apps, networks and telecommunications, data analysis, digital marketing, graphic design and communication, as well as consulting and training.',
           'الأمن السيبراني والطاقات المتجددة (الشمسية) والمواقع وتطبيقات الجوال والشبكات والاتصالات وتحليل البيانات والتسويق الرقمي والتصميم الجرافيكي والاتصال، إضافة إلى الاستشارات والتدريب.'),
    },
    {
      q: t('Où intervenez-vous ?', 'Where do you work?', 'أين تعملون؟'),
      a: t("Nous sommes basés à N'Djamena (Tchad) et intervenons au Tchad. Nous accompagnons aussi des clients en France et ailleurs dans le monde, à distance pour tout ce qui peut se faire en ligne.",
           "We are based in N'Djamena (Chad) and work across Chad. We also support clients in France and elsewhere in the world, remotely for anything that can be done online.",
           'مقرنا في إنجامينا (تشاد) ونعمل في أنحاء تشاد. كما نرافق عملاء في فرنسا وفي بقية أنحاء العالم عن بُعد في كل ما يمكن إنجازه عبر الإنترنت.'),
    },
    {
      q: t('Comment obtenir un devis ?', 'How can I get a quote?', 'كيف أحصل على عرض سعر؟'),
      a: t("Décrivez votre projet dans le formulaire de la page Contact, ou écrivez-nous à info@icsgroupe.com ou appelez-nous au +235 64 78 88 31. Nous étudions vos besoins puis vous proposons une solution adaptée à votre budget.",
           'Describe your project in the form on the Contact page, or write to info@icsgroupe.com or call +235 64 78 88 31. We study your needs, then propose a solution that fits your budget.',
           'صفوا مشروعكم في نموذج صفحة «اتصل بنا»، أو راسلونا على info@icsgroupe.com أو اتصلوا بنا على 31 88 78 64 235+. ندرس احتياجاتكم ثم نقترح حلًا يناسب ميزانيتكم.'),
    },
    {
      q: t('Vos experts sont-ils certifiés ?', 'Are your experts certified?', 'هل خبراؤكم حاصلون على شهادات؟'),
      a: t("En cybersécurité, notre équipe compte des experts certifiés, notamment ISO 27001, ISO 27005, CISM et CISSP, ainsi que des spécialistes en continuité d'activité et en investigation numérique.",
           'In cybersecurity, our team includes certified experts, notably ISO 27001, ISO 27005, CISM and CISSP, as well as business continuity and digital forensics specialists.',
           'في الأمن السيبراني، يضم فريقنا خبراء معتمدين، منهم ISO 27001 وISO 27005 وCISM وCISSP، إضافة إلى متخصصين في استمرارية الأعمال والتحقيق الرقمي.'),
    },
    {
      q: t("Quel matériel solaire fournissez-vous ?", 'What solar equipment do you supply?', 'ما المعدات الشمسية التي توفرونها؟'),
      a: t("Panneaux et fixations, régulateurs, batteries et chargeurs, onduleurs 230 V, convertisseurs DC/DC, éclairage solaire, câbles et accessoires, avec étude personnalisée, installation et maintenance.",
           'Panels and mounts, charge controllers, batteries and chargers, 230 V inverters, DC/DC converters, solar lighting, cables and accessories, with personalized study, installation and maintenance.',
           'ألواح ودعامات تثبيت ومنظّمات شحن وبطاريات وشواحن ومحوّلات 230 فولت ومحوّلات DC/DC وإضاءة شمسية وكابلات وملحقات، مع دراسة مخصصة وتركيب وصيانة.'),
    },
    {
      q: t('Proposez-vous des formations ?', 'Do you offer training?', 'هل تقدمون دورات تدريبية؟'),
      a: t("Oui. Nous proposons des formations dans tous nos domaines (cybersécurité, réseaux, énergie solaire, data…) et un service de transfert de compétences pour vos équipes techniques, avec un suivi après la formation.",
           'Yes. We offer training in all our fields (cybersecurity, networks, solar energy, data…) and a skills transfer service for your technical teams, with follow-up after the training.',
           'نعم. نقدّم دورات في جميع مجالاتنا (الأمن السيبراني والشبكات والطاقة الشمسية والبيانات…) وخدمة نقل مهارات لفرقكم التقنية، مع متابعة بعد التدريب.'),
    },
    {
      q: t('Dans quelles langues le site et vos services sont-ils disponibles ?', 'Which languages are the site and your services available in?', 'بأي لغات يتوفر الموقع وخدماتكم؟'),
      a: t("Le site est disponible en français, en anglais et en arabe. Contactez-nous pour discuter de la langue de travail de votre projet.",
           'The site is available in French, English and Arabic. Contact us to discuss the working language for your project.',
           'الموقع متاح بالفرنسية والإنجليزية والعربية. تواصلوا معنا لمناقشة لغة العمل في مشروعكم.'),
    },
  ],
};
