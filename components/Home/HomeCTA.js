import React from 'react';
import Link from 'next/link';
import { useI18n } from '../../lib/i18n';

const HomeCTA = () => {
    const { tx } = useI18n();
    return (
        <section className="cta">
            <div className="cta-box">
                <div>
                    <h2>{tx({ fr: 'Un projet ? Parlons-en dès aujourd’hui.', en: 'Got a project? Let’s talk today.', ar: 'لديكم مشروع؟ لنتحدث اليوم.' })}</h2>
                    <p>{tx({ fr: 'Recevez un devis personnalisé sous 24 h.', en: 'Get a personalised quote within 24 hours.', ar: 'احصلوا على عرض سعر مخصص خلال 24 ساعة.' })}</p>
                </div>
                <Link href="/contact"><a className="btn">{tx({ fr: 'Nous contacter', en: 'Contact us', ar: 'اتصلوا بنا' })}</a></Link>
            </div>
            <style jsx>{`
                .cta { padding: 20px 24px 90px; background: #fff; }
                .cta-box { max-width: 1100px; margin: 0 auto; border-radius: 28px; padding: 46px 50px; display: flex; align-items: center; justify-content: space-between; gap: 28px; background: linear-gradient(135deg, #06140b 0%, #123d22 100%); color: #fff; box-shadow: 0 26px 60px rgba(11,36,21,.3); position: relative; overflow: hidden; }
                .cta-box::after { content: ''; position: absolute; width: 280px; height: 280px; border-radius: 50%; background: rgba(76,175,80,.3); filter: blur(70px); right: -60px; top: -90px; }
                h2 { font-size: clamp(22px, 3vw, 32px); font-weight: 800; margin: 0 0 6px; color: #fff; }
                p { margin: 0; color: rgba(255,255,255,.78); }
                .btn { position: relative; z-index: 1; white-space: nowrap; padding: 15px 36px; border-radius: 60px; background: #4CAF50; color: #fff; font-weight: 700; text-decoration: none; box-shadow: 0 10px 30px rgba(76,175,80,.45); transition: transform .25s, background .25s; }
                .btn:hover { background: #43a047; transform: translateY(-3px); }
                @media (max-width: 760px) { .cta-box { flex-direction: column; align-items: flex-start; padding: 34px 26px; } .btn { width: 100%; text-align: center; } }
            `}</style>
        </section>
    );
};

export default HomeCTA;
