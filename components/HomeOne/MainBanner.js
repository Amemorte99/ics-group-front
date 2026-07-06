import React, { Component } from 'react';
import Link from 'next/link';
import Image from 'next/image';

class MainBanner extends Component {
    render() {
        return (
            <div className="main-banner-wrapper">
                {/* Arrière-plan avec effet de lumière */}
                <div className="banner-background">
                    <div className="gradient-overlay"></div>
                    <div className="glow-spot glow-1"></div>
                    <div className="glow-spot glow-2"></div>
                    <div className="glow-spot glow-3"></div>
                    <div className="particles-container">
                        <div className="particle particle-1"></div>
                        <div className="particle particle-2"></div>
                        <div className="particle particle-3"></div>
                        <div className="particle particle-4"></div>
                        <div className="particle particle-5"></div>
                        <div className="particle particle-6"></div>
                    </div>
                </div>

                <div className="banner-container">
                    <div className="banner-grid">
                        {/* Texte - Gauche */}
                        <div className="banner-text">
                            <div className="banner-label">
                                <span className="label-dot"></span>
                                <span className="label-text">ICS GROUPE</span>
                                <span className="label-badge">Expert depuis 2012</span>
                            </div>
                            
                            <h1 className="banner-heading">
                                Des solutions <br />
                                <span className="highlight">innovantes</span> pour<br />
                                votre <span className="highlight">réussite</span>
                            </h1>
                            
                            <p className="banner-description">
                                Nous accompagnons les entreprises dans leur transformation digitale,
                                cybersécurité et énergies renouvelables avec des solutions sur mesure.
                            </p>

                            <div className="banner-actions">
                                <Link href="/contact">
                                    <a className="btn-primary-custom">
                                        <span>Démarrer un projet</span>
                                        <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7"/>
                                        </svg>
                                    </a>
                                </Link>
                                <Link href="/services">
                                    <a className="btn-outline-custom">
                                        <svg className="play-icon" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                        Nos services
                                    </a>
                                </Link>
                            </div>

                            {/* Statistiques - Réintégrées */}
                            <div className="banner-stats mb-4">
                                <div className="stat-item">
                                    <span className="stat-number">150+</span>
                                    <span className="stat-label">Clients satisfaits</span>
                                </div>
                                <div className="stat-divider"></div>
                                <div className="stat-item">
                                    <span className="stat-number">98%</span>
                                    <span className="stat-label">Taux de satisfaction</span>
                                </div>
                                <div className="stat-divider"></div>
                                <div className="stat-item">
                                    <span className="stat-number">12 ans</span>
                                    <span className="stat-label">D'expérience</span>
                                </div>
                            </div>
                        </div>

                        {/* Image - Droite */}
                        <div className="banner-image-wrapper">
                            <div className="image-container">
                                <div className="image-frame">
                                    <Image
                                        src="/images/vert2.webp"
                                        alt="ICS GROUPE Solutions innovantes"
                                        width={600}
                                        height={500}
                                        className="banner-img"
                                        priority
                                    />
                                    <div className="image-overlay"></div>
                                    <div className="image-shine"></div>
                                </div>
                                
                                {/* Badges flottants */}
                                <div className="floating-badge badge-1">
                                    <div className="badge-icon">
                                        <i className="fas fa-shield-alt"></i>
                                    </div>
                                    <div className="badge-content">
                                        <span className="badge-title">Cybersécurité</span>
                                        <span className="badge-sub">Protection avancée</span>
                                    </div>
                                </div>
                                
                                <div className="floating-badge badge-2">
                                    <div className="badge-icon">
                                        <i className="fas fa-solar-panel"></i>
                                    </div>
                                    <div className="badge-content">
                                        <span className="badge-title">Énergie verte</span>
                                        <span className="badge-sub">Durable & innovante</span>
                                    </div>
                                </div>
                                
                                <div className="floating-badge badge-3">
                                    <div className="badge-icon">
                                        <i className="fas fa-code"></i>
                                    </div>
                                    <div className="badge-content">
                                        <span className="badge-title">Dev Web</span>
                                        <span className="badge-sub">Applications modernes</span>
                                    </div>
                                </div>

                                {/* Cercle pulsant décoratif */}
                                <div className="pulse-ring"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Indicateur de défilement */}
                <div className="scroll-indicator">
                    <div className="scroll-mouse">
                        <div className="scroll-wheel"></div>
                    </div>
                    <span className="scroll-text">Défiler</span>
                </div>

                <style jsx>{`
                    /* ====== WRAPPER PRINCIPAL ====== */
                    .main-banner-wrapper {
                        position: relative;
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        background: linear-gradient(135deg, #0a0e27 0%, #141b33 40%, #1a2340 100%);
                        overflow: hidden;
                        padding: 120px 0 80px;
                    }

                    /* ====== ARRIÈRE-PLAN ====== */
                    .banner-background {
                        position: absolute;
                        inset: 0;
                        z-index: 0;
                        overflow: hidden;
                    }

                    .gradient-overlay {
                        position: absolute;
                        inset: 0;
                        background: 
                            radial-gradient(ellipse at 70% 30%, rgba(73, 185, 109, 0.12) 0%, transparent 60%),
                            radial-gradient(ellipse at 30% 80%, rgba(128, 195, 83, 0.08) 0%, transparent 50%),
                            radial-gradient(ellipse at 90% 70%, rgba(73, 185, 109, 0.05) 0%, transparent 40%);
                    }

                    .glow-spot {
                        position: absolute;
                        border-radius: 50%;
                        filter: blur(100px);
                        opacity: 0.12;
                    }

                    .glow-1 {
                        width: 600px;
                        height: 600px;
                        background: #49B96D;
                        top: -200px;
                        right: -200px;
                        animation: glowPulse 8s ease-in-out infinite;
                    }

                    .glow-2 {
                        width: 400px;
                        height: 400px;
                        background: #80C353;
                        bottom: -100px;
                        left: 10%;
                        animation: glowPulse 12s ease-in-out infinite reverse;
                    }

                    .glow-3 {
                        width: 300px;
                        height: 300px;
                        background: #49B96D;
                        top: 50%;
                        left: -100px;
                        animation: glowPulse 10s ease-in-out infinite 2s;
                    }

                    @keyframes glowPulse {
                        0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.12; }
                        50% { transform: scale(1.4) translate(40px, -40px); opacity: 0.2; }
                    }

                    /* ====== PARTICULES ====== */
                    .particles-container {
                        position: absolute;
                        inset: 0;
                        overflow: hidden;
                    }

                    .particle {
                        position: absolute;
                        width: 4px;
                        height: 4px;
                        background: rgba(73, 185, 109, 0.3);
                        border-radius: 50%;
                        animation: floatParticle 15s linear infinite;
                    }

                    .particle-1 { top: 20%; left: 10%; animation-delay: 0s; width: 6px; height: 6px; }
                    .particle-2 { top: 60%; left: 85%; animation-delay: -3s; }
                    .particle-3 { top: 80%; left: 20%; animation-delay: -6s; width: 8px; height: 8px; opacity: 0.2; }
                    .particle-4 { top: 30%; left: 75%; animation-delay: -9s; }
                    .particle-5 { top: 70%; left: 50%; animation-delay: -12s; width: 5px; height: 5px; }
                    .particle-6 { top: 10%; left: 40%; animation-delay: -5s; width: 7px; height: 7px; opacity: 0.15; }

                    @keyframes floatParticle {
                        0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
                        10% { opacity: 1; }
                        90% { opacity: 1; }
                        100% { transform: translate(100px, -200px) rotate(720deg); opacity: 0; }
                    }

                    /* ====== CONTAINER ====== */
                    .banner-container {
                        position: relative;
                        z-index: 1;
                        width: 100%;
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 0 30px;
                    }

                    .banner-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 80px;
                        align-items: center;
                    }

                    /* ====== TEXTE ====== */
                    .banner-text {
                        color: #fff;
                    }

                    .banner-label {
                        display: inline-flex;
                        align-items: center;
                        gap: 12px;
                        padding: 8px 24px 8px 16px;
                        background: rgba(73, 185, 109, 0.1);
                        border: 1px solid rgba(73, 185, 109, 0.15);
                        border-radius: 50px;
                        font-size: 13px;
                        font-weight: 500;
                        letter-spacing: 0.5px;
                        color: #a8d5b5;
                        margin-bottom: 32px;
                        backdrop-filter: blur(10px);
                    }

                    .label-dot {
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: #49B96D;
                        animation: dotPulse 2s ease-in-out infinite;
                        flex-shrink: 0;
                    }

                    .label-text {
                        font-weight: 600;
                    }

                    .label-badge {
                        padding: 2px 12px;
                        background: rgba(73, 185, 109, 0.2);
                        border-radius: 50px;
                        font-size: 10px;
                        font-weight: 700;
                        color: #49B96D;
                        text-transform: uppercase;
                        letter-spacing: 0.3px;
                    }

                    @keyframes dotPulse {
                        0%, 100% { opacity: 1; transform: scale(1); }
                        50% { opacity: 0.3; transform: scale(0.7); }
                    }

                    .banner-heading {
                        font-size: 58px;
                        font-weight: 800;
                        line-height: 1.08;
                        margin-bottom: 24px;
                        color: #fff;
                    }

                    .highlight {
                        background: linear-gradient(135deg, #49B96D, #80C353);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: #49B96D;;
                        background-clip: text;
                        position: relative;
                    }
                       

                    .banner-description {
                        font-size: 18px;
                        line-height: 1.8;
                        color: rgba(255, 255, 255, 0.65);
                        max-width: 480px;
                        margin-bottom: 36px;
                    }

                    /* ====== BOUTONS ====== */
                    .banner-actions {
                        display: flex;
                        gap: 16px;
                        flex-wrap: wrap;
                        margin-bottom: 48px;
                    }

                    .btn-primary-custom {
                        display: inline-flex;
                        align-items: center;
                        gap: 12px;
                        padding: 16px 36px;
                        background: linear-gradient(135deg, #49B96D, #80C353);
                        color: #fff;
                        border-radius: 50px;
                        font-weight: 600;
                        font-size: 15px;
                        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        text-decoration: none;
                        border: none;
                        cursor: pointer;
                        box-shadow: 0 8px 30px rgba(73, 185, 109, 0.35);
                        position: relative;
                        overflow: hidden;
                    }

                    .btn-primary-custom::before {
                        content: '';
                        position: absolute;
                        inset: 0;
                        background: linear-gradient(135deg, #3a9e5d, #6cb343);
                        opacity: 0;
                        transition: opacity 0.4s ease;
                    }

                    .btn-primary-custom:hover::before {
                        opacity: 1;
                    }

                    .btn-primary-custom span,
                    .btn-primary-custom .arrow-icon {
                        position: relative;
                        z-index: 1;
                    }

                    .btn-primary-custom:hover {
                        transform: translateY(-3px) scale(1.02);
                        box-shadow: 0 12px 50px rgba(73, 185, 109, 0.5);
                    }

                    .arrow-icon {
                        width: 20px;
                        height: 20px;
                        transition: transform 0.3s ease;
                        position: relative;
                        z-index: 1;
                    }

                    .btn-primary-custom:hover .arrow-icon {
                        transform: translateX(6px);
                    }

                    .btn-outline-custom {
                        display: inline-flex;
                        align-items: center;
                        gap: 10px;
                        padding: 16px 32px;
                        color: #fff;
                        border: 2px solid rgba(255, 255, 255, 0.12);
                        border-radius: 50px;
                        font-weight: 600;
                        font-size: 15px;
                        transition: all 0.3s ease;
                        text-decoration: none;
                        background: transparent;
                        position: relative;
                    }

                    .btn-outline-custom:hover {
                        border-color: #49B96D;
                        background: rgba(73, 185, 109, 0.08);
                        transform: translateY(-3px);
                        box-shadow: 0 8px 30px rgba(73, 185, 109, 0.15);
                    }

                    .play-icon {
                        width: 18px;
                        height: 18px;
                        color: #49B96D;
                    }

                    /* ====== STATISTIQUES ====== */
                    .banner-stats {
                        display: flex;
                        align-items: center;
                        gap: 32px;
                        padding: 20px 0;
                        border-top: 1px solid rgba(255, 255, 255, 0.06);
                    }

                    .stat-item {
                        display: flex;
                        flex-direction: column;
                    }

                    .stat-number {
                        font-size: 28px;
                        font-weight: 800;
                        color: #49B96D;
                        line-height: 1.2;
                    }

                    .stat-label {
                        font-size: 13px;
                        color: rgba(255, 255, 255, 0.4);
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        margin-top: 2px;
                    }

                    .stat-divider {
                        width: 1px;
                        height: 32px;
                        background: rgba(255, 255, 255, 0.06);
                    }

                    /* ====== IMAGE ====== */
                    .banner-image-wrapper {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .image-container {
                        position: relative;
                        width: 100%;
                        max-width: 520px;
                    }

                    .image-frame {
                        position: relative;
                        border-radius: 24px;
                        overflow: hidden;
                        background: rgba(73, 185, 109, 0.03);
                        border: 1px solid rgba(73, 185, 109, 0.08);
                        box-shadow: 0 40px 80px rgba(0, 0, 0, 0.5), 0 0 60px rgba(73, 185, 109, 0.03);
                        transition: all 0.5s ease;
                    }

                    .image-frame:hover {
                        box-shadow: 0 50px 100px rgba(0, 0, 0, 0.6), 0 0 80px rgba(73, 185, 109, 0.05);
                    }

                    .image-overlay {
                        position: absolute;
                        inset: 0;
                        background: linear-gradient(135deg, rgba(73, 185, 109, 0.05), transparent 50%);
                        z-index: 1;
                        pointer-events: none;
                    }

                    .image-shine {
                        position: absolute;
                        top: -50%;
                        left: -50%;
                        width: 200%;
                        height: 200%;
                        background: linear-gradient(
                            45deg,
                            transparent 30%,
                            rgba(255, 255, 255, 0.03) 50%,
                            transparent 70%
                        );
                        transform: rotate(45deg);
                        transition: transform 0.8s ease;
                        z-index: 2;
                        pointer-events: none;
                    }

                    .image-frame:hover .image-shine {
                        transform: rotate(45deg) translate(20%, 20%);
                    }

                    .banner-img {
                        width: 100%;
                        height: auto;
                        display: block;
                        transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    }

                    .image-frame:hover .banner-img {
                        transform: scale(1.03);
                    }

                    /* Cercle pulsant */
                    .pulse-ring {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 120%;
                        height: 120%;
                        border: 1px solid rgba(73, 185, 109, 0.05);
                        border-radius: 50%;
                        animation: pulseRing 4s ease-in-out infinite;
                        pointer-events: none;
                    }

                    @keyframes pulseRing {
                        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
                        50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0; }
                    }

                    /* ====== BADGES FLOTTANTS ====== */
                    .floating-badge {
                        position: absolute;
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        padding: 14px 20px;
                        background: rgba(10, 14, 39, 0.7);
                        backdrop-filter: blur(20px);
                        border: 1px solid rgba(255, 255, 255, 0.06);
                        border-radius: 16px;
                        color: #fff;
                        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
                        animation: floatBadge 5s ease-in-out infinite;
                        min-width: 140px;
                    }

                    .badge-icon {
                        width: 36px;
                        height: 36px;
                        border-radius: 10px;
                        background: rgba(73, 185, 109, 0.12);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-shrink: 0;
                    }

                    .badge-icon i {
                        color: #49B96D;
                        font-size: 16px;
                    }

                    .badge-content {
                        display: flex;
                        flex-direction: column;
                    }

                    .badge-title {
                        font-size: 13px;
                        font-weight: 600;
                        line-height: 1.3;
                    }

                    .badge-sub {
                        font-size: 10px;
                        color: rgba(255, 255, 255, 0.4);
                        text-transform: uppercase;
                        letter-spacing: 0.3px;
                    }

                    .badge-1 {
                        top: -15px;
                        right: -20px;
                        animation-delay: 0s;
                    }

                    .badge-2 {
                        bottom: 40px;
                        left: -35px;
                        animation-delay: -1.5s;
                    }

                    .badge-3 {
                        top: 45%;
                        right: -30px;
                        animation-delay: -3s;
                    }

                    @keyframes floatBadge {
                        0%, 100% { transform: translateY(0) rotate(0deg); }
                        50% { transform: translateY(-12px) rotate(1.5deg); }
                    }

                    /* ====== INDICATEUR DE DÉFILEMENT ====== */
                    .scroll-indicator {
                        position: absolute;
                        bottom: 30px;
                        left: 50%;
                        transform: translateX(-50%);
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 8px;
                        z-index: 2;
                        opacity: 0.4;
                        animation: scrollBounce 2s ease-in-out infinite;
                        cursor: pointer;
                    }

                    .scroll-mouse {
                        width: 24px;
                        height: 38px;
                        border: 2px solid rgba(255, 255, 255, 0.3);
                        border-radius: 12px;
                        display: flex;
                        justify-content: center;
                        padding-top: 8px;
                    }

                    .scroll-wheel {
                        width: 3px;
                        height: 8px;
                        background: #49B96D;
                        border-radius: 3px;
                        animation: scrollWheel 1.5s ease-in-out infinite;
                    }

                    .scroll-text {
                        font-size: 11px;
                        color: rgba(255, 255, 255, 0.3);
                        letter-spacing: 1px;
                        text-transform: uppercase;
                    }

                    @keyframes scrollWheel {
                        0%, 100% { transform: translateY(0); opacity: 1; }
                        50% { transform: translateY(8px); opacity: 0.3; }
                    }

                    @keyframes scrollBounce {
                        0%, 100% { transform: translateX(-50%) translateY(0); }
                        50% { transform: translateX(-50%) translateY(-5px); }
                    }

                    /* ====== RESPONSIVE ====== */
                    @media (max-width: 1200px) {
                        .banner-heading {
                            font-size: 48px;
                        }
                    }

                    @media (max-width: 992px) {
                        .banner-grid {
                            grid-template-columns: 1fr;
                            gap: 50px;
                            text-align: center;
                        }

                        .banner-heading {
                            font-size: 44px;
                        }

                        .banner-description {
                            max-width: 100%;
                            margin-left: auto;
                            margin-right: auto;
                        }

                        .banner-actions {
                            justify-content: center;
                        }

                        .banner-stats {
                            justify-content: center;
                        }

                        .banner-image-wrapper {
                            order: -1;
                        }

                        .image-container {
                            max-width: 420px;
                            margin: 0 auto;
                        }

                        .floating-badge {
                            display: none;
                        }

                        .scroll-indicator {
                            display: none;
                        }

                        .label-badge {
                            display: none;
                        }
                    }

                    @media (max-width: 768px) {
                        .main-banner-wrapper {
                            padding: 80px 0 60px;
                            min-height: auto;
                        }

                        .banner-heading {
                            font-size: 34px;
                        }

                        .banner-description {
                            font-size: 16px;
                        }

                        .banner-actions {
                            flex-direction: column;
                            align-items: center;
                            width: 100%;
                        }

                        .btn-primary-custom,
                        .btn-outline-custom {
                            width: 100%;
                            justify-content: center;
                        }

                        .banner-stats {
                            gap: 20px;
                            flex-wrap: wrap;
                        }

                        .stat-number {
                            font-size: 24px;
                        }

                        .image-container {
                            max-width: 320px;
                        }

                        .pulse-ring {
                            display: none;
                        }
                    }

                    @media (max-width: 480px) {
                        .main-banner-wrapper {
                            padding: 60px 0 40px;
                        }

                        .banner-heading {
                            font-size: 28px;
                        }

                        .banner-container {
                            padding: 0 16px;
                        }

                        .banner-label {
                            font-size: 11px;
                            padding: 6px 16px 6px 12px;
                        }

                        .label-badge {
                            display: none;
                        }

                        .banner-stats {
                            flex-direction: column;
                            gap: 12px;
                            align-items: center;
                        }

                        .stat-divider {
                            display: none;
                        }

                        .image-container {
                            max-width: 280px;
                        }
                    }
                `}</style>
            </div>
        );
    }
}

export default MainBanner;