import React from 'react';
import Link from 'next/link';
import { useI18n } from '../../lib/i18n';

const HomeHero = () => {
    const { tx } = useI18n();
    const chips = [
        { icon: 'fas fa-shield-alt', label: { fr: 'Cybersécurité', en: 'Cybersecurity', ar: 'الأمن السيبراني' } },
        { icon: 'fas fa-solar-panel', label: { fr: 'Énergie solaire', en: 'Solar energy', ar: 'الطاقة الشمسية' } },
        { icon: 'fas fa-code', label: { fr: 'Web & mobile', en: 'Web & mobile', ar: 'ويب وجوال' } },
    ];
    return (
        <section className="hh">
            <div className="hh-bg" aria-hidden="true"><span className="g1" /><span className="g2" /></div>
            <div className="hh-wrap">
                <div className="hh-text">
                    <span className="hh-tag">
                        <i className="dot" />
                        {tx({ fr: 'Tchad · France · International', en: 'Chad · France · Worldwide', ar: 'تشاد · فرنسا · حول العالم' })}
                    </span>
                    <h1>
                        {tx({ fr: 'Des solutions ', en: 'Smart solutions ', ar: 'حلول ' })}
                        <strong>{tx({ fr: 'sûres', en: 'secure', ar: 'آمنة' })}</strong>
                        {tx({ fr: ' et ', en: ' and ', ar: ' و' })}
                        <em>{tx({ fr: 'durables', en: 'sustainable', ar: 'مستدامة' })}</em>
                        <br />
                        {tx({ fr: 'pour votre croissance', en: 'for your growth', ar: 'لنمو أعمالكم' })}
                    </h1>
                    <p>
                        {tx({
                            fr: 'Cybersécurité, énergie solaire, réseaux et développement digital : ICS GROUPE accompagne entreprises et institutions de A à Z.',
                            en: 'Cybersecurity, solar energy, networks and digital development: ICS GROUPE supports businesses and institutions end to end.',
                            ar: 'الأمن السيبراني والطاقة الشمسية والشبكات والتطوير الرقمي: ترافق ICS GROUPE الشركات والمؤسسات من الفكرة إلى التنفيذ.',
                        })}
                    </p>
                    <div className="hh-actions">
                        <Link href="/contact"><a className="hh-btn primary">{tx({ fr: 'Démarrer un projet', en: 'Start a project', ar: 'ابدأ مشروعك' })}</a></Link>
                        <Link href="/services"><a className="hh-btn ghost">{tx({ fr: 'Découvrir nos services', en: 'Explore our services', ar: 'اكتشف خدماتنا' })}</a></Link>
                    </div>
                    <ul className="hh-chips">
                        {chips.map((c) => (
                            <li key={c.icon}><i className={c.icon} aria-hidden="true" />{tx(c.label)}</li>
                        ))}
                    </ul>
                </div>

                <div className="hh-visual">
                    <div className="hh-card">
                        <img src="/images/services/cybersecurite.webp" alt={tx({ fr: 'ICS GROUPE, solutions numériques et énergétiques', en: 'ICS GROUPE, digital and energy solutions', ar: 'ICS GROUPE، حلول رقمية وطاقية' })} width="640" height="480" />
                    </div>
                    <div className="hh-float f1"><b>12+</b><span>{tx({ fr: "ans d'expérience", en: 'years of experience', ar: 'سنة من الخبرة' })}</span></div>
                    <div className="hh-float f2"><b>98%</b><span>{tx({ fr: 'clients satisfaits', en: 'satisfied clients', ar: 'عملاء راضون' })}</span></div>
                </div>
            </div>
            <svg className="hh-cut" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><polygon points="0,80 1440,0 1440,80" fill="#fff" /></svg>

            <style jsx>{`
                .hh { position: relative; background: linear-gradient(135deg, #06140b 0%, #0b2415 55%, #123d22 100%); color: #fff; overflow: hidden; padding: 150px 0 130px; }
                .hh-bg span { position: absolute; border-radius: 50%; filter: blur(90px); }
                .g1 { width: 420px; height: 420px; background: rgba(76,175,80,.35); top: -120px; right: -80px; }
                .g2 { width: 320px; height: 320px; background: rgba(129,199,132,.18); bottom: -100px; left: -60px; }
                .hh-wrap { position: relative; max-width: 1200px; margin: 0 auto; padding: 0 24px; display: grid; grid-template-columns: 1.1fr .9fr; gap: 48px; align-items: center; }
                .hh-tag { display: inline-flex; align-items: center; gap: 10px; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 600; padding: 7px 16px; border-radius: 40px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.14); }
                .dot { width: 8px; height: 8px; border-radius: 50%; background: #4CAF50; box-shadow: 0 0 0 4px rgba(76,175,80,.25); }
                h1 { font-size: clamp(32px, 5vw, 56px); line-height: 1.12; font-weight: 300; margin: 22px 0 18px; color: #fff; }
                h1 strong { font-weight: 800; color: #fff; }
                h1 em { font-style: normal; font-weight: 800; color: #66d36b; }
                p { font-size: 17px; line-height: 1.7; color: rgba(255,255,255,.78); max-width: 540px; margin: 0 0 30px; }
                .hh-actions { display: flex; flex-wrap: wrap; gap: 14px; }
                .hh-btn { display: inline-flex; align-items: center; justify-content: center; padding: 14px 30px; border-radius: 60px; font-weight: 700; font-size: 15px; text-decoration: none; transition: transform .25s, box-shadow .25s, background .25s; }
                .hh-btn.primary { background: #4CAF50; color: #fff; box-shadow: 0 10px 30px rgba(76,175,80,.4); }
                .hh-btn.primary:hover { background: #43a047; transform: translateY(-3px); }
                .hh-btn.ghost { color: #fff; border: 2px solid rgba(255,255,255,.35); }
                .hh-btn.ghost:hover { background: rgba(255,255,255,.1); transform: translateY(-3px); }
                .hh-chips { list-style: none; padding: 0; margin: 34px 0 0; display: flex; flex-wrap: wrap; gap: 22px; }
                .hh-chips li { display: flex; align-items: center; gap: 8px; font-size: 14px; color: rgba(255,255,255,.85); }
                .hh-chips i { color: #66d36b; }
                .hh-visual { position: relative; }
                .hh-card { border-radius: 28px; padding: 14px; background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.14); box-shadow: 0 30px 70px rgba(0,0,0,.45); backdrop-filter: blur(6px); }
                .hh-card img { width: 100%; height: auto; display: block; border-radius: 18px; }
                .hh-float { position: absolute; background: #fff; color: #0b2415; border-radius: 18px; padding: 14px 20px; box-shadow: 0 18px 40px rgba(0,0,0,.35); display: flex; flex-direction: column; animation: hhf 5s ease-in-out infinite; }
                .hh-float b { font-size: 28px; line-height: 1; color: #2e7d32; }
                .hh-float span { font-size: 12px; color: #4b5563; margin-top: 4px; }
                .f1 { left: -22px; bottom: 36px; }
                .f2 { right: -14px; top: 28px; animation-delay: 1.5s; }
                .hh-cut { position: absolute; bottom: -1px; left: 0; width: 100%; height: 70px; display: block; }
                @keyframes hhf { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
                @media (max-width: 900px) {
                    .hh { padding: 120px 0 100px; }
                    .hh-wrap { grid-template-columns: 1fr; gap: 40px; }
                    .f1 { left: 8px; } .f2 { right: 8px; }
                }
                @media (max-width: 480px) { .hh-btn { width: 100%; } }
                @media (prefers-reduced-motion: reduce) { .hh-float { animation: none; } }
            `}</style>
        </section>
    );
};

export default HomeHero;
