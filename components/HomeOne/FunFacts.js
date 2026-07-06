import React, { Component } from 'react';
import Link from 'next/link';

class FunFacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            counts: [0, 0, 0, 0]
        };
        this.counterRef = React.createRef();
    }

    componentDidMount() {
        // Observer pour déclencher l'animation quand la section est visible
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !this.state.isVisible) {
                        this.setState({ isVisible: true });
                        this.startCounters();
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (this.counterRef.current) {
            observer.observe(this.counterRef.current);
        }
    }

    startCounters = () => {
        const targets = [180, 20, 500, 70];
        const duration = 2000; // 2 secondes
        const interval = 20; // 20ms
        const steps = duration / interval;

        targets.forEach((target, index) => {
            let current = 0;
            const increment = target / steps;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                const newCounts = [...this.state.counts];
                newCounts[index] = Math.floor(current);
                this.setState({ counts: newCounts });
            }, interval);
        });
    };

    render() {
        const stats = [
            {
                id: 1,
                value: 180,
                suffix: 'K',
                label: 'Projets réalisés',
                icon: 'fa-project-diagram',
                description: 'Projets livrés avec succès'
            },
            {
                id: 2,
                value: 20,
                suffix: 'K',
                label: 'Clients satisfaits',
                icon: 'fa-smile',
                description: 'Retours positifs'
            },
            {
                id: 3,
                value: 500,
                suffix: '+',
                label: 'Partenaires',
                icon: 'fa-handshake',
                description: 'Entreprises partenaires'
            },
            {
                id: 4,
                value: 70,
                suffix: '+',
                label: 'Experts',
                icon: 'fa-users',
                description: 'Professionnels dédiés'
            }
        ];

        return (
            <section className="funfacts-area" ref={this.counterRef}>
                {/* Arrière-plan avec effets */}
                <div className="funfacts-background">
                    <div className="glow-spot glow-1"></div>
                    <div className="glow-spot glow-2"></div>
                    <div className="glow-spot glow-3"></div>
                </div>

                <div className="container">
                    {/* En-tête de section */}
                    <div className="section-header">
                        <span className="section-tag">NOS CHIFFRES</span>
                        <h2 className="section-title">
                            Nous nous efforçons toujours de comprendre<br />
                            les attentes de nos <span className="highlight">clients</span>
                        </h2>
                        <div className="section-bar"></div>
                        <p className="section-description">
                            Chez <strong>ICS GROUPE</strong>, la satisfaction client est notre priorité. 
                            Nous mettons tout en œuvre pour proposer des solutions innovantes, 
                            sécurisées et parfaitement adaptées à vos besoins en transformation digitale, 
                            cybersécurité et énergies renouvelables.
                        </p>
                    </div>

                    {/* Statistiques */}
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <div key={stat.id} className="stat-item">
                                <div className="stat-icon">
                                    <i className={`fas ${stat.icon}`}></i>
                                </div>
                                <div className="stat-number">
                                    <span>
                                        {this.state.isVisible ? this.state.counts[index] : 0}
                                        {stat.suffix}
                                    </span>
                                </div>
                                <h4 className="stat-label">{stat.label}</h4>
                                <p className="stat-description">{stat.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTA Contact */}
                    <div className="cta-box">
                        <div className="cta-box-background">
                            <div className="cta-glow"></div>
                        </div>
                        <div className="cta-box-content">
                            <div className="cta-box-icon">
                                <i className="fas fa-phone-alt"></i>
                            </div>
                            <h3 className="cta-box-title">
                                Des questions à nous poser ?
                            </h3>
                            <p className="cta-box-text">
                                N'hésitez pas à nous contacter, notre équipe est là pour vous répondre.
                            </p>
                            <Link href="/contact">
                                <a className="cta-box-button">
                                    <span>Nous Contacter</span>
                                    <svg className="cta-box-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    /* ====== IMPORT DES POLICES ====== */
                    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');

                    /* ====== VARIABLES ====== */
                    :root {
                        --ics-primary: #49B96D;
                        --ics-secondary: #80C353;
                        --ics-dark: #0a0e27;
                        --ics-light: #f8f9fa;
                        --ics-white: #ffffff;
                        --ics-gradient: linear-gradient(135deg, #49B96D, #80C353);
                        --ics-font: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                    }

                    /* ====== SECTION PRINCIPALE ====== */
                    .funfacts-area {
                        position: relative;
                        padding: 80px 0 60px;
                        background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
                        overflow: hidden;
                        font-family: var(--ics-font);
                    }

                    /* ====== ARRIÈRE-PLAN ====== */
                    .funfacts-background {
                        position: absolute;
                        inset: 0;
                        z-index: 0;
                        overflow: hidden;
                    }

                    .glow-spot {
                        position: absolute;
                        border-radius: 50%;
                        filter: blur(100px);
                        opacity: 0.06;
                    }

                    .glow-1 {
                        width: 400px;
                        height: 400px;
                        background: var(--ics-primary);
                        top: -100px;
                        right: -100px;
                        animation: floatGlow 8s ease-in-out infinite;
                    }

                    .glow-2 {
                        width: 300px;
                        height: 300px;
                        background: var(--ics-secondary);
                        bottom: -50px;
                        left: 20%;
                        animation: floatGlow 10s ease-in-out infinite reverse;
                    }

                    .glow-3 {
                        width: 200px;
                        height: 200px;
                        background: var(--ics-primary);
                        top: 50%;
                        left: -50px;
                        animation: floatGlow 6s ease-in-out infinite 2s;
                    }

                    @keyframes floatGlow {
                        0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.06; }
                        50% { transform: translate(30px, -30px) scale(1.2); opacity: 0.1; }
                    }

                    /* ====== CONTAINER ====== */
                    .container {
                        position: relative;
                        z-index: 1;
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 0 30px;
                    }

                    /* ====== EN-TÊTE ====== */
                    .section-header {
                        text-align: center;
                        margin-bottom: 50px;
                    }

                    .section-tag {
                        display: inline-block;
                        padding: 6px 20px;
                        background: rgba(73, 185, 109, 0.1);
                        color: var(--ics-primary);
                        font-size: 13px;
                        font-weight: 600;
                        letter-spacing: 0.5px;
                        border-radius: 50px;
                        text-transform: uppercase;
                        margin-bottom: 16px;
                        border: 1px solid rgba(73, 185, 109, 0.15);
                        font-family: var(--ics-font);
                    }

                    .section-title {
                        font-size: 38px;
                        font-weight: 800;
                        color: var(--ics-dark);
                        line-height: 1.25;
                        margin-bottom: 16px;
                        font-family: var(--ics-font);
                    }

                    .highlight {
                        background: var(--ics-gradient);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }

                    .section-bar {
                        width: 60px;
                        height: 4px;
                        background: var(--ics-gradient);
                        border-radius: 2px;
                        margin: 0 auto 20px;
                        transition: width 0.4s ease;
                    }

                    .section-header:hover .section-bar {
                        width: 100px;
                    }

                    .section-description {
                        font-size: 17px;
                        color: #6c757d;
                        max-width: 750px;
                        margin: 0 auto;
                        line-height: 1.8;
                        font-family: var(--ics-font);
                        font-weight: 400;
                    }

                    .section-description strong {
                        color: var(--ics-primary);
                        font-weight: 700;
                    }

                    /* ====== GRILLE DE STATISTIQUES ====== */
                    .stats-grid {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 30px;
                        margin-bottom: 60px;
                    }

                    .stat-item {
                        text-align: center;
                        padding: 40px 20px 30px;
                        background: var(--ics-white);
                        border-radius: 20px;
                        border: 1px solid rgba(0, 0, 0, 0.04);
                        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
                        position: relative;
                        overflow: hidden;
                    }

                    .stat-item::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        height: 4px;
                        background: var(--ics-gradient);
                        opacity: 0;
                        transition: opacity 0.4s ease;
                    }

                    .stat-item:hover::before {
                        opacity: 1;
                    }

                    .stat-item:hover {
                        transform: translateY(-10px);
                        box-shadow: 0 20px 60px rgba(73, 185, 109, 0.08);
                        border-color: rgba(73, 185, 109, 0.1);
                    }

                    .stat-icon {
                        width: 60px;
                        height: 60px;
                        border-radius: 16px;
                        background: rgba(73, 185, 109, 0.08);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 16px;
                        transition: all 0.4s ease;
                    }

                    .stat-item:hover .stat-icon {
                        transform: scale(1.05) rotate(-3deg);
                        background: rgba(73, 185, 109, 0.15);
                    }

                    .stat-icon i {
                        font-size: 26px;
                        color: var(--ics-primary);
                        transition: all 0.4s ease;
                    }

                    .stat-item:hover .stat-icon i {
                        transform: scale(1.1);
                    }

                    .stat-number {
                        font-size: 44px;
                        font-weight: 900;
                        color: var(--ics-dark);
                        line-height: 1.1;
                        margin-bottom: 4px;
                        font-family: var(--ics-font);
                    }

                    .stat-number span {
                        background: var(--ics-gradient);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }

                    .stat-label {
                        font-size: 16px;
                        font-weight: 600;
                        color: var(--ics-dark);
                        margin-bottom: 4px;
                        font-family: var(--ics-font);
                    }

                    .stat-description {
                        font-size: 13px;
                        color: #6c757d;
                        margin: 0;
                        font-family: var(--ics-font);
                        font-weight: 400;
                    }

                    /* ====== CTA BOX ====== */
                    .cta-box {
                        position: relative;
                        padding: 50px 40px;
                        background: linear-gradient(135deg, #0a0e27 0%, #141b33 100%);
                        border-radius: 24px;
                        text-align: center;
                        overflow: hidden;
                        border: 1px solid rgba(255, 255, 255, 0.05);
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
                    }

                    .cta-box-background {
                        position: absolute;
                        inset: 0;
                        z-index: 0;
                    }

                    .cta-glow {
                        position: absolute;
                        width: 400px;
                        height: 400px;
                        background: radial-gradient(circle, rgba(73, 185, 109, 0.08) 0%, transparent 70%);
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        animation: pulseGlow 6s ease-in-out infinite;
                    }

                    @keyframes pulseGlow {
                        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
                        50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
                    }

                    .cta-box-content {
                        position: relative;
                        z-index: 1;
                    }

                    .cta-box-icon {
                        width: 64px;
                        height: 64px;
                        border-radius: 50%;
                        background: rgba(73, 185, 109, 0.15);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 16px;
                        border: 2px solid rgba(73, 185, 109, 0.2);
                    }

                    .cta-box-icon i {
                        font-size: 28px;
                        color: var(--ics-primary);
                    }

                    .cta-box-title {
                        font-size: 28px;
                        font-weight: 700;
                        color: #ffffff;
                        margin-bottom: 8px;
                        font-family: var(--ics-font);
                    }

                    .cta-box-text {
                        font-size: 16px;
                        color: rgba(255, 255, 255, 0.6);
                        margin-bottom: 24px;
                        font-family: var(--ics-font);
                        font-weight: 400;
                    }

                    .cta-box-button {
                        display: inline-flex;
                        align-items: center;
                        gap: 12px;
                        padding: 16px 36px;
                        background: var(--ics-gradient);
                        color: #ffffff;
                        font-size: 16px;
                        font-weight: 600;
                        border-radius: 50px;
                        text-decoration: none;
                        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        box-shadow: 0 8px 30px rgba(73, 185, 109, 0.35);
                        font-family: var(--ics-font);
                        position: relative;
                        overflow: hidden;
                    }

                    .cta-box-button::before {
                        content: '';
                        position: absolute;
                        inset: 0;
                        background: linear-gradient(135deg, #3a9e5d, #6cb343);
                        opacity: 0;
                        transition: opacity 0.4s ease;
                    }

                    .cta-box-button span,
                    .cta-box-button .cta-box-arrow {
                        position: relative;
                        z-index: 1;
                    }

                    .cta-box-button:hover {
                        transform: translateY(-3px) scale(1.02);
                        box-shadow: 0 12px 50px rgba(73, 185, 109, 0.5);
                        color: #ffffff;
                    }

                    .cta-box-button:hover::before {
                        opacity: 1;
                    }

                    .cta-box-arrow {
                        width: 20px;
                        height: 20px;
                        transition: transform 0.3s ease;
                        position: relative;
                        z-index: 1;
                    }

                    .cta-box-button:hover .cta-box-arrow {
                        transform: translateX(6px);
                    }

                    /* ====== RESPONSIVE ====== */
                    @media (max-width: 992px) {
                        .stats-grid {
                            grid-template-columns: repeat(2, 1fr);
                            gap: 20px;
                        }

                        .section-title {
                            font-size: 32px;
                        }

                        .stat-number {
                            font-size: 38px;
                        }

                        .cta-box {
                            padding: 40px 30px;
                        }

                        .cta-box-title {
                            font-size: 24px;
                        }
                    }

                    @media (max-width: 768px) {
                        .funfacts-area {
                            padding: 60px 0 40px;
                        }

                        .container {
                            padding: 0 20px;
                        }

                        .section-title {
                            font-size: 28px;
                        }

                        .section-description {
                            font-size: 15px;
                        }

                        .stats-grid {
                            grid-template-columns: repeat(2, 1fr);
                            gap: 16px;
                        }

                        .stat-item {
                            padding: 30px 16px 24px;
                        }

                        .stat-number {
                            font-size: 32px;
                        }

                        .stat-label {
                            font-size: 14px;
                        }

                        .stat-description {
                            font-size: 12px;
                        }

                        .stat-icon {
                            width: 48px;
                            height: 48px;
                        }

                        .stat-icon i {
                            font-size: 20px;
                        }

                        .cta-box {
                            padding: 30px 20px;
                        }

                        .cta-box-title {
                            font-size: 22px;
                        }

                        .cta-box-text {
                            font-size: 15px;
                        }

                        .cta-box-button {
                            width: 100%;
                            justify-content: center;
                            padding: 14px 28px;
                            font-size: 15px;
                        }

                        .cta-box-icon {
                            width: 52px;
                            height: 52px;
                        }

                        .cta-box-icon i {
                            font-size: 22px;
                        }
                    }

                    @media (max-width: 480px) {
                        .stats-grid {
                            grid-template-columns: 1fr 1fr;
                            gap: 12px;
                        }

                        .stat-item {
                            padding: 24px 12px 20px;
                            border-radius: 16px;
                        }

                        .stat-number {
                            font-size: 28px;
                        }

                        .stat-label {
                            font-size: 13px;
                        }

                        .stat-description {
                            display: none;
                        }

                        .stat-icon {
                            width: 40px;
                            height: 40px;
                            border-radius: 12px;
                            margin-bottom: 12px;
                        }

                        .stat-icon i {
                            font-size: 18px;
                        }

                        .section-title {
                            font-size: 24px;
                        }

                        .cta-box-title {
                            font-size: 20px;
                        }

                        .cta-box-text {
                            font-size: 14px;
                        }
                    }
                `}</style>
            </section>
        );
    }
}

export default FunFacts;