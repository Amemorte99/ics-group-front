import React from 'react';
import Link from 'next/link';
import { useI18n } from '../../lib/i18n';

const POINTS = [
    { fr: 'Experts certifiés en cybersécurité, énergie et développement', en: 'Certified experts in cybersecurity, energy and development', ar: 'خبراء معتمدون في الأمن السيبراني والطاقة والتطوير' },
    { fr: 'Une seule équipe, de l’audit à la maintenance', en: 'One team, from audit to maintenance', ar: 'فريق واحد من التدقيق إلى الصيانة' },
    { fr: 'Solutions adaptées au contexte africain et international', en: 'Solutions adapted to the African and international context', ar: 'حلول تناسب السياق الأفريقي والدولي' },
    { fr: 'Support réactif et suivi après livraison', en: 'Responsive support and after-delivery follow-up', ar: 'دعم سريع ومتابعة بعد التسليم' },
];

const HomeWhy = () => {
    const { tx } = useI18n();
    return (
        <section className="why">
            <div className="why-wrap">
                <div className="why-img">
                    <img src="/images/services/consulting-formation.webp" alt="" width="640" height="480" loading="lazy" />
                    <div className="badge"><b>24/7</b><span>{tx({ fr: 'Assistance', en: 'Support', ar: 'دعم' })}</span></div>
                </div>
                <div className="why-text">
                    <span className="tag">{tx({ fr: 'Pourquoi ICS GROUPE', en: 'Why ICS GROUPE', ar: 'لماذا ICS GROUPE' })}</span>
                    <h2>
                        {tx({ fr: 'Un partenaire ', en: 'A partner ', ar: 'شريك ' })}
                        <strong>{tx({ fr: 'fiable', en: 'you can trust', ar: 'موثوق' })}</strong>
                        {tx({ fr: ' sur le long terme', en: ' for the long run', ar: ' على المدى الطويل' })}
                    </h2>
                    <ul>
                        {POINTS.map((p) => (
                            <li key={p.fr}><span className="tick" aria-hidden="true">✓</span>{tx(p)}</li>
                        ))}
                    </ul>
                    <Link href="/about-us"><a className="btn">{tx({ fr: 'En savoir plus sur nous', en: 'More about us', ar: 'اعرف المزيد عنا' })}</a></Link>
                </div>
            </div>
            <style jsx>{`
                .why { background: linear-gradient(180deg, #f3faf4 0%, #fff 100%); padding: 80px 24px; }
                .why-wrap { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
                .why-img { position: relative; border-radius: 28px; padding: 14px; background: #fff; box-shadow: 0 24px 60px rgba(11,36,21,.12); border-inline-start: 6px solid #4CAF50; }
                .why-img img { width: 100%; height: auto; display: block; border-radius: 18px; }
                .badge { position: absolute; right: -14px; bottom: 28px; background: #0b2415; color: #fff; border-radius: 18px; padding: 14px 22px; display: flex; flex-direction: column; box-shadow: 0 16px 36px rgba(0,0,0,.25); }
                .badge b { font-size: 26px; color: #66d36b; line-height: 1; }
                .badge span { font-size: 12px; opacity: .85; }
                .tag { display: inline-block; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; color: #2e7d32; background: #e8f5e9; padding: 6px 16px; border-radius: 40px; }
                h2 { font-size: clamp(26px, 3.6vw, 40px); font-weight: 300; color: #0b2415; margin: 16px 0 22px; line-height: 1.2; }
                h2 strong { font-weight: 800; color: #2e7d32; }
                ul { list-style: none; padding: 0; margin: 0 0 30px; }
                li { display: flex; gap: 14px; align-items: flex-start; font-size: 16px; line-height: 1.55; color: #36424a; margin-bottom: 14px; }
                .tick { flex: 0 0 26px; height: 26px; border-radius: 50%; background: #4CAF50; color: #fff; display: grid; place-items: center; font-size: 14px; font-weight: 700; }
                .btn { display: inline-block; padding: 13px 32px; border-radius: 60px; font-weight: 700; color: #fff; background: #2e7d32; text-decoration: none; box-shadow: 0 10px 26px rgba(46,125,50,.3); transition: transform .25s, background .25s; }
                .btn:hover { background: #256528; transform: translateY(-3px); }
                @media (max-width: 900px) { .why-wrap { grid-template-columns: 1fr; gap: 40px; } .badge { right: 10px; } }
            `}</style>
        </section>
    );
};

export default HomeWhy;
