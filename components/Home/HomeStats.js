import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '../../lib/i18n';

const STATS = [
    { value: 150, suffix: '+', label: { fr: 'Clients accompagnés', en: 'Clients supported', ar: 'عميل رافقناه' } },
    { value: 98, suffix: '%', label: { fr: 'Taux de satisfaction', en: 'Satisfaction rate', ar: 'نسبة الرضا' } },
    { value: 12, suffix: '+', label: { fr: "Années d'expérience", en: 'Years of experience', ar: 'سنة من الخبرة' } },
    { value: 3, suffix: '', label: { fr: 'Continents desservis', en: 'Continents served', ar: 'قارات نخدمها' } },
];

const Counter = ({ to, suffix, run }) => {
    const [n, setN] = useState(0);
    useEffect(() => {
        if (!run) return undefined;
        let raf; const start = performance.now();
        const tick = (now) => {
            const p = Math.min((now - start) / 1400, 1);
            setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [run, to]);
    return <>{run ? n : to}{suffix}</>;
};

const HomeStats = () => {
    const { tx } = useI18n();
    const ref = useRef(null);
    const [run, setRun] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el || typeof IntersectionObserver === 'undefined') { setRun(true); return undefined; }
        const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setRun(true); io.disconnect(); } }, { threshold: 0.3 });
        io.observe(el);
        return () => io.disconnect();
    }, []);
    return (
        <section className="hs" ref={ref}>
            <div className="hs-grid">
                {STATS.map((s) => (
                    <div className="hs-item" key={s.suffix + s.value}>
                        <b><Counter to={s.value} suffix={s.suffix} run={run} /></b>
                        <span>{tx(s.label)}</span>
                    </div>
                ))}
            </div>
            <style jsx>{`
                .hs { margin-top: -60px; position: relative; z-index: 2; padding: 0 24px; }
                .hs-grid { max-width: 1100px; margin: 0 auto; background: #fff; border-radius: 24px; box-shadow: 0 20px 60px rgba(11,36,21,.14); display: grid; grid-template-columns: repeat(4, 1fr); padding: 30px 10px; }
                .hs-item { text-align: center; padding: 6px 12px; border-inline-end: 1px solid #e8f0e9; }
                .hs-item:last-child { border-inline-end: 0; }
                b { display: block; font-size: clamp(30px, 4vw, 44px); font-weight: 800; color: #2e7d32; line-height: 1.1; }
                span { font-size: 14px; color: #4b5563; }
                @media (max-width: 700px) {
                    .hs-grid { grid-template-columns: repeat(2, 1fr); row-gap: 20px; }
                    .hs-item:nth-child(2) { border-inline-end: 0; }
                }
            `}</style>
        </section>
    );
};

export default HomeStats;
