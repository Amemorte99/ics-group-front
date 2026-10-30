import React from 'react';
import Link from 'next/link';
import { useI18n } from '../../lib/i18n';

const ITEMS = [
    { href: '/services/cybersecurite', img: 'cybersecurite', title: { fr: 'Cybersécurité', en: 'Cybersecurity', ar: 'الأمن السيبراني' }, text: { fr: 'Audit, protection des données et résilience face aux cybermenaces.', en: 'Audit, data protection and resilience against cyber threats.', ar: 'تدقيق وحماية للبيانات وصمود أمام التهديدات السيبرانية.' } },
    { href: '/services/energie', img: 'energie-solaire', title: { fr: 'Énergie solaire', en: 'Solar energy', ar: 'الطاقة الشمسية' }, text: { fr: 'Installation, maintenance et optimisation énergétique.', en: 'Installation, maintenance and energy optimisation.', ar: 'تركيب وصيانة وتحسين لاستهلاك الطاقة.' } },
    { href: '/services/web', img: 'web-mobile', title: { fr: 'Web & mobile', en: 'Web & mobile', ar: 'الويب والجوال' }, text: { fr: 'Sites performants, applications et solutions sur mesure.', en: 'High-performance sites, apps and custom solutions.', ar: 'مواقع عالية الأداء وتطبيقات وحلول مخصصة.' } },
    { href: '/services/reseaux', img: 'reseaux-telecoms', title: { fr: 'Réseaux & télécoms', en: 'Networks & telecoms', ar: 'الشبكات والاتصالات' }, text: { fr: 'Interconnexion fiable et maintenance des infrastructures.', en: 'Reliable interconnection and infrastructure maintenance.', ar: 'ربط موثوق وصيانة للبنى التحتية.' } },
    { href: '/services/data', img: 'data-analysis', title: { fr: 'Data & analyse', en: 'Data & analytics', ar: 'البيانات والتحليل' }, text: { fr: 'Bases de données, tableaux de bord et aide à la décision.', en: 'Databases, dashboards and decision support.', ar: 'قواعد بيانات ولوحات متابعة ودعم القرار.' } },
    { href: '/services/marketing', img: 'marketing-digital', title: { fr: 'Marketing digital', en: 'Digital marketing', ar: 'التسويق الرقمي' }, text: { fr: 'Visibilité, référencement et campagnes qui convertissent.', en: 'Visibility, SEO and campaigns that convert.', ar: 'حضور وتحسين محركات البحث وحملات فعّالة.' } },
];

const HomeServices = () => {
    const { tx } = useI18n();
    return (
        <section className="sv" aria-labelledby="home-services-title">
            <div className="sv-wrap">
                <header>
                    <span className="tag">{tx({ fr: 'Nos expertises', en: 'Our expertise', ar: 'خبراتنا' })}</span>
                    <h2 id="home-services-title">
                        {tx({ fr: 'Tout ce qu’il faut pour ', en: 'Everything you need to ', ar: 'كل ما تحتاجونه ل' })}
                        <strong>{tx({ fr: 'avancer en confiance', en: 'move forward with confidence', ar: 'المضي بثقة' })}</strong>
                    </h2>
                </header>
                <div className="grid">
                    {ITEMS.map((s) => (
                        <Link href={s.href} key={s.href}>
                            <a className="card">
                                <div className="pic"><img src={`/images/services/${s.img}.webp`} alt="" width="400" height="300" loading="lazy" /></div>
                                <h3>{tx(s.title)}</h3>
                                <p>{tx(s.text)}</p>
                                <span className="more">{tx({ fr: 'En savoir plus', en: 'Learn more', ar: 'اعرف المزيد' })} <i aria-hidden="true">→</i></span>
                            </a>
                        </Link>
                    ))}
                </div>
                <div className="all">
                    <Link href="/services"><a className="btn">{tx({ fr: 'Voir tous les services', en: 'See all services', ar: 'عرض كل الخدمات' })}</a></Link>
                </div>
            </div>
            <style jsx>{`
                .sv { padding: 90px 24px 70px; background: #fff; }
                .sv-wrap { max-width: 1200px; margin: 0 auto; }
                header { text-align: center; margin-bottom: 46px; }
                .tag { display: inline-block; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; color: #2e7d32; background: #e8f5e9; padding: 6px 16px; border-radius: 40px; }
                h2 { font-size: clamp(28px, 4vw, 42px); font-weight: 300; color: #0b2415; margin: 16px 0 0; line-height: 1.2; }
                h2 strong { font-weight: 800; color: #2e7d32; }
                .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px; }
                .card { display: flex; flex-direction: column; background: #fff; border-radius: 22px; padding: 16px 16px 24px; border: 1px solid #e6efe7; box-shadow: 0 8px 28px rgba(11,36,21,.06); text-decoration: none; transition: transform .3s, box-shadow .3s, border-color .3s; }
                .card:hover { transform: translateY(-8px); box-shadow: 0 22px 50px rgba(46,125,50,.2); border-color: #4CAF50; }
                .pic { border-radius: 16px; overflow: hidden; background: #f1f8f2; }
                .pic img { width: 100%; height: auto; display: block; transition: transform .5s; }
                .card:hover .pic img { transform: scale(1.05); }
                h3 { font-size: 20px; font-weight: 700; color: #0b2415; margin: 18px 8px 6px; }
                p { font-size: 15px; line-height: 1.6; color: #5b6770; margin: 0 8px 14px; flex: 1; }
                .more { margin: 0 8px; font-weight: 700; color: #2e7d32; font-size: 14px; }
                .more i { font-style: normal; display: inline-block; transition: transform .25s; }
                .card:hover .more i { transform: translateX(5px); }
                .all { text-align: center; margin-top: 44px; }
                .btn { display: inline-block; padding: 13px 34px; border-radius: 60px; font-weight: 700; color: #2e7d32; border: 2px solid #4CAF50; text-decoration: none; transition: all .25s; }
                .btn:hover { background: #4CAF50; color: #fff; transform: translateY(-3px); }
                @media (max-width: 992px) { .grid { grid-template-columns: repeat(2, 1fr); } }
                @media (max-width: 600px) { .grid { grid-template-columns: 1fr; } .sv { padding: 60px 16px 50px; } }
            `}</style>
        </section>
    );
};

export default HomeServices;
