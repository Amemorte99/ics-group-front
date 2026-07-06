import React, { Component } from 'react';
import Link from 'next/link';

class AppDownloadContent extends Component {
    render() {
        return (
            <section className="app-download-section">
                {/* Arrière-plan avec dominante verte intense */}
                <div className="app-bg">
                    <div className="bg-circle bg-circle-1"></div>
                    <div className="bg-circle bg-circle-2"></div>
                    <div className="bg-circle bg-circle-3"></div>
                    <div className="bg-pattern">
                        <div className="pattern-dot"></div>
                        <div className="pattern-dot"></div>
                        <div className="pattern-dot"></div>
                        <div className="pattern-dot"></div>
                        <div className="pattern-dot"></div>
                        <div className="pattern-dot"></div>
                        <div className="pattern-dot"></div>
                        <div className="pattern-dot"></div>
                        <div className="pattern-dot"></div>
                        <div className="pattern-dot"></div>
                        <div className="pattern-dot"></div>
                        <div className="pattern-dot"></div>
                    </div>
                </div>

                <div className="container">
                    <div className="app-wrapper">
                        {/* Image - Gauche */}
                        <div className="app-image-wrapper">
                            <div className="app-image-container">
                                {/* Téléphone principal - Version verte intense */}
                                <div className="phone-mockup phone-main">
                                    <div className="phone-screen">
                                        <div className="phone-status-bar">
                                            <span className="status-time">09:41</span>
                                            <div className="status-icons">
                                                <span className="status-signal">📶</span>
                                                <span className="status-wifi">📶</span>
                                                <span className="status-battery">🔋</span>
                                            </div>
                                        </div>
                                        <div className="phone-content">
                                            <div className="app-icon">
                                                <div className="icon-gradient"></div>
                                                <span>ICS</span>
                                            </div>
                                            <h4>Bienvenue</h4>
                                            <p>Gérez vos projets en un clic</p>
                                            <div className="phone-features">
                                                <div className="phone-feature">
                                                    <span className="feature-dot"></span>
                                                    <span>Suivi en temps réel</span>
                                                </div>
                                                <div className="phone-feature">
                                                    <span className="feature-dot"></span>
                                                    <span>Alertes & notifications</span>
                                                </div>
                                                <div className="phone-feature">
                                                    <span className="feature-dot"></span>
                                                    <span>Rapports détaillés</span>
                                                </div>
                                            </div>
                                            <div className="phone-bottom-nav">
                                                <span className="nav-item active">🏠</span>
                                                <span className="nav-item">📊</span>
                                                <span className="nav-item">🔔</span>
                                                <span className="nav-item">👤</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="phone-home-button"></div>
                                </div>

                                {/* Petits téléphones flottants */}
                                <div className="phone-mockup phone-small phone-small-1">
                                    <div className="phone-screen-small">
                                        <div className="small-content">
                                            <span className="small-icon">⚡</span>
                                            <span>Énergie</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="phone-mockup phone-small phone-small-2">
                                    <div className="phone-screen-small">
                                        <div className="small-content">
                                            <span className="small-icon">🔒</span>
                                            <span>Sécurité</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Badges flottants verts intenses */}
                                <div className="floating-badge badge-1">
                                    <span className="badge-icon">⭐</span>
                                    <div>
                                        <span className="badge-title">4.9/5</span>
                                        <span className="badge-sub">Note moyenne</span>
                                    </div>
                                </div>

                                <div className="floating-badge badge-2">
                                    <span className="badge-icon">📱</span>
                                    <div>
                                        <span className="badge-title">10K+</span>
                                        <span className="badge-sub">Téléchargements</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contenu - Droite */}
                        <div className="app-content-wrapper">
                            <div className="app-content">
                                <div className="content-badge">
                                    <span className="badge-dot"></span>
                                    Application mobile
                                </div>

                                <h2 className="app-title">
                                    Gérez tous vos projets<br />
                                    avec l'application <span className="highlight">ICS GROUPE</span>
                                </h2>

                                <div className="content-divider">
                                    <span className="divider-line"></span>
                                    <span className="divider-icon">◆</span>
                                    <span className="divider-line"></span>
                                </div>

                                <p className="app-description">
                                    Suivez en temps réel vos installations solaires, consultez vos audits cybersécurité, 
                                    gérez vos réseaux et accédez à vos analyses de données où que vous soyez.
                                </p>

                                <p className="app-description-secondary">
                                    Notre application vous permet de rester connecté à vos projets, recevoir des alertes, 
                                    demander une intervention ou consulter vos rapports en toute simplicité et sécurité.
                                </p>

                                {/* Boutons de téléchargement verts intenses */}
                                <div className="download-buttons">
                                    <a 
                                        href="https://www.apple.com/app-store/" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="download-btn app-store"
                                    >
                                        <div className="btn-icon">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                            </svg>
                                        </div>
                                        <div className="btn-text">
                                            <span className="btn-sub">Télécharger sur</span>
                                            <span className="btn-main">App Store</span>
                                        </div>
                                        <span className="btn-arrow">→</span>
                                    </a>

                                    <a 
                                        href="https://play.google.com/store/apps" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="download-btn play-store"
                                    >
                                        <div className="btn-icon">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M3.609 1.814L13.792 12 3.61 22.186a1.131 1.131 0 0 1-.067-.065l.067.065A1.13 1.13 0 0 1 3 21.402V2.598c0-.44.253-.84.609-1.066L13.792 12 3.609 1.814z"/>
                                                <path d="M14.688 11.063l-2.896-2.896L3.609 1.814 14.688 11.063z" opacity="0.5"/>
                                                <path d="M3.609 22.186L11.792 13.96l2.896-2.896L3.609 22.186z" opacity="0.5"/>
                                                <path d="M16.191 12.205l-3.575-3.575-.704.704L16.191 12.205z" opacity="0.5"/>
                                                <path d="M12.616 16.595l-.704.704 4.279 4.279L16.191 12.205z" opacity="0.5"/>
                                                <path d="M20.391 8.358l-4.279-4.279-.704.704L20.391 8.358z" opacity="0.5"/>
                                            </svg>
                                        </div>
                                        <div className="btn-text">
                                            <span className="btn-sub">Télécharger sur</span>
                                            <span className="btn-main">Google Play</span>
                                        </div>
                                        <span className="btn-arrow">→</span>
                                    </a>
                                </div>

                                {/* Statistiques vertes intenses */}
                                <div className="app-stats">
                                    <div className="app-stat">
                                        <span className="stat-number">4.9</span>
                                        <div className="stat-stars">
                                            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                                        </div>
                                        <span className="stat-label">Note moyenne</span>
                                    </div>
                                    <div className="stat-divider"></div>
                                    <div className="app-stat">
                                        <span className="stat-number">10K+</span>
                                        <span className="stat-label">Téléchargements</span>
                                    </div>
                                    <div className="stat-divider"></div>
                                    <div className="app-stat">
                                        <span className="stat-number">99%</span>
                                        <span className="stat-label">Satisfaction</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');

                    /* ====== COULEURS ICS GROUP - VERSION VERTE INTENSE ====== */
                    :root {
                        --main-color: #49B96D;
                        --main-color-light: #6CD48E;
                        --main-color-dark: #2D8A4E;
                        --main-color-glow: rgba(73, 185, 109, 0.4);
                        --optional-color: #80C353;
                        --white-color: #ffffff;
                        --black-color: #0a1a0e;
                        --paragraph-color: #2a4a3a;
                        --dark-bg: #06100a;
                        --light-bg: #e8f5ed;
                        --gradient-main: linear-gradient(135deg, #49B96D, #2D8A4E);
                        --gradient-light: linear-gradient(135deg, #6CD48E, #49B96D);
                        --font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    }

                    /* ====== SECTION ====== */
                    .app-download-section {
                        position: relative;
                        padding: 100px 0 80px;
                        background: linear-gradient(180deg, #e8f5ed 0%, #f0faf5 100%);
                        overflow: hidden;
                        font-family: var(--font-family);
                    }

                    /* ====== ARRIÈRE-PLAN VERT INTENSE ====== */
                    .app-bg {
                        position: absolute;
                        inset: 0;
                        z-index: 0;
                        overflow: hidden;
                    }

                    .bg-circle {
                        position: absolute;
                        border-radius: 50%;
                        opacity: 0.08;
                    }

                    .bg-circle-1 {
                        width: 600px;
                        height: 600px;
                        background: radial-gradient(circle, #49B96D, transparent);
                        top: -200px;
                        right: -200px;
                        animation: float 14s ease-in-out infinite;
                        opacity: 0.06;
                    }

                    .bg-circle-2 {
                        width: 500px;
                        height: 500px;
                        background: radial-gradient(circle, #6CD48E, transparent);
                        bottom: -150px;
                        left: 10%;
                        animation: float 16s ease-in-out infinite reverse;
                        opacity: 0.05;
                    }

                    .bg-circle-3 {
                        width: 400px;
                        height: 400px;
                        background: radial-gradient(circle, #49B96D, transparent);
                        top: 40%;
                        left: -150px;
                        animation: float 12s ease-in-out infinite 2s;
                        opacity: 0.04;
                    }

                    @keyframes float {
                        0%, 100% { transform: translate(0, 0) scale(1); }
                        50% { transform: translate(40px, -40px) scale(1.1); }
                    }

                    /* ====== PATTERN VERT ====== */
                    .bg-pattern {
                        position: absolute;
                        inset: 0;
                        display: grid;
                        grid-template-columns: repeat(6, 1fr);
                        grid-template-rows: repeat(6, 1fr);
                        gap: 20px;
                        padding: 40px;
                        opacity: 0.04;
                    }

                    .pattern-dot {
                        width: 100%;
                        height: 100%;
                        background: radial-gradient(circle, #49B96D 3px, transparent 3px);
                        background-size: 24px 24px;
                    }

                    /* ====== CONTAINER ====== */
                    .container {
                        position: relative;
                        z-index: 1;
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 0 30px;
                    }

                    .app-wrapper {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 60px;
                        align-items: center;
                    }

                    /* ====== IMAGE ====== */
                    .app-image-wrapper {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .app-image-container {
                        position: relative;
                        width: 100%;
                        max-width: 420px;
                    }

                    /* Téléphone principal - Version verte intense */
                    .phone-mockup {
                        position: relative;
                        background: var(--dark-bg);
                        border-radius: 40px;
                        padding: 12px;
                        box-shadow: 0 30px 80px rgba(73, 185, 109, 0.2), 0 10px 30px rgba(73, 185, 109, 0.1);
                        border: 2px solid rgba(73, 185, 109, 0.15);
                    }

                    .phone-main {
                        width: 100%;
                        aspect-ratio: 9/19;
                        max-width: 320px;
                        margin: 0 auto;
                    }

                    .phone-screen {
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(180deg, #4ce47c, #80C353);
                        border-radius: 32px;
                        overflow: hidden;
                        padding: 16px 14px;
                        display: flex;
                        flex-direction: column;
                    }

                    .phone-status-bar {
                        display: flex;
                        justify-content: space-between;
                        padding: 0 4px 12px;
                        font-size: 12px;
                        color: rgba(255, 255, 255, 0.9);
                    }

                    .status-time {
                        font-weight: 600;
                        color: rgba(255, 255, 255, 0.9);
                    }

                    .status-icons {
                        display: flex;
                        gap: 4px;
                    }

                   /* ====== CONTENU DU TÉLÉPHONE  ====== */
.phone-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 8px 0;
    position: relative;
}

/* Icône de l'application - Version premium */
.app-icon {
    width: 70px;
    height: 70px;
    border-radius: 18px;
    background: var(--gradient-main);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 20px;
    color: var(--white-color);
    margin-bottom: 18px;
    position: relative;
    box-shadow: 
        0 12px 40px rgba(73, 185, 109, 0.4),
        0 0 60px rgba(73, 185, 109, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transform: translateY(0);
    transition: all 0.3s ease;
    animation: iconPulse 3s ease-in-out infinite;
    z-index: 1;
}

.app-icon::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(73, 185, 109, 0.3), transparent);
    z-index: -1;
    filter: blur(10px);
    animation: iconGlow 3s ease-in-out infinite;
}

@keyframes iconPulse {
    0%, 100% { 
        transform: scale(1);
        box-shadow: 0 12px 40px rgba(73, 185, 109, 0.4), 0 0 60px rgba(73, 185, 109, 0.1);
    }
    50% { 
        transform: scale(1.02);
        box-shadow: 0 15px 50px rgba(73, 185, 109, 0.6), 0 0 80px rgba(73, 185, 109, 0.2);
    }
}

@keyframes iconGlow {
    0%, 100% { 
        opacity: 0.5;
        transform: scale(1);
    }
    50% { 
        opacity: 1;
        transform: scale(1.1);
    }
}

.icon-gradient {
    position: absolute;
    inset: 0;
    border-radius: 18px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, transparent 50%);
    pointer-events: none;
}

/* Titre du téléphone */
.phone-content h4 {
    color: var(--white-color);
    font-size: 22px;
    font-weight: 700;
    margin: 0 0 4px 0;
    letter-spacing: -0.3px;
    background: linear-gradient(180deg, #ffffff 60%, rgba(255, 255, 255, 0.6));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: none;
}

/* Sous-titre */
.phone-content p {
    color: rgba(255, 255, 255, 0.35);
    font-size: 13px;
    margin: 0 0 22px 0;
    font-weight: 400;
    letter-spacing: 0.2px;
}

/* Liste des fonctionnalités */
.phone-features {
    width: 100%;
    text-align: left;
    padding: 0 8px;
    margin-bottom: 4px;
}

.phone-feature {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 7px 12px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
    border-radius: 8px;
    transition: all 0.3s ease;
    cursor: default;
    position: relative;
}

.phone-feature:hover {
    background: rgba(73, 185, 109, 0.06);
    color: white;
    transform: translateX(4px);
}

.phone-feature .feature-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--gradient-light);
    flex-shrink: 0;
    box-shadow: 0 0 15px rgba(73, 185, 109, 0.5);
    position: relative;
    animation: dotGlow 2s ease-in-out infinite;
}

.phone-feature:nth-child(2) .feature-dot {
    animation-delay: 0.3s;
}

.phone-feature:nth-child(3) .feature-dot {
    animation-delay: 0.6s;
}

@keyframes dotGlow {
    0%, 100% { 
        box-shadow: 0 0 15px rgba(73, 185, 109, 0.5);
    }
    50% { 
        box-shadow: 0 0 30px rgba(73, 185, 109, 0.8), 0 0 60px rgba(73, 185, 109, 0.2);
    }
}

/* Navigation du bas */
.phone-bottom-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 14px 4px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.04);
    margin-top: 16px;
    width: 100%;
    position: relative;
}

.phone-bottom-nav::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 20%;
    right: 20%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(73, 185, 109, 0.2), transparent);
}

.nav-item {
    font-size: 18px;
    opacity: 0.25;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 8px;
    position: relative;
}

.nav-item:hover {
    opacity: 0.6;
    transform: translateY(-2px);
}

.nav-item.active {
    opacity: 1;
    color: #49B96D;
    transform: translateY(-2px);
}

.nav-item.active::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #49B96D;
    box-shadow: 0 0 15px rgba(73, 185, 109, 0.5);
    animation: navDotPulse 2s ease-in-out infinite;
}

@keyframes navDotPulse {
    0%, 100% { 
        opacity: 1;
        transform: translateX(-50%) scale(1);
    }
    50% { 
        opacity: 0.3;
        transform: translateX(-50%) scale(0.6);
    }
}

/* ====== STYLES RESPONSIVE ====== */
@media (max-width: 768px) {
    .app-icon {
        width: 60px;
        height: 60px;
        font-size: 17px;
        border-radius: 16px;
    }
    
    .phone-content h4 {
        font-size: 19px;
    }
    
    .phone-features {
        padding: 0 4px;
    }
    
    .phone-feature {
        padding: 5px 10px;
        font-size: 11px;
    }
    
    .phone-bottom-nav {
        padding: 10px 4px 0;
        margin-top: 12px;
    }
    
    .nav-item {
        font-size: 16px;
    }
}

@media (max-width: 480px) {
    .app-icon {
        width: 52px;
        height: 52px;
        font-size: 15px;
        border-radius: 14px;
        margin-bottom: 12px;
    }
    
    .phone-content h4 {
        font-size: 17px;
    }
    
    .phone-content p {
        font-size: 11px;
        margin-bottom: 16px;
    }
    
    .phone-feature {
        padding: 4px 8px;
        font-size: 10px;
        gap: 8px;
    }
    
    .phone-feature .feature-dot {
        width: 6px;
        height: 6px;
    }
    
    .phone-bottom-nav {
        padding: 8px 0 0;
        margin-top: 10px;
    }
    
    .nav-item {
        font-size: 14px;
    }
    
    .nav-item.active::after {
        width: 3px;
        height: 3px;
    }
}

                    .nav-item {
                        font-size: 18px;
                        opacity: 0.3;
                        transition: all 0.3s ease;
                        cursor: pointer;
                    }

                    .nav-item.active {
                        opacity: 1;
                        color: #49B96D;
                    }

                    .phone-home-button {
                        width: 40px;
                        height: 4px;
                        background: rgba(73, 185, 109, 0.2);
                        border-radius: 2px;
                        margin: 8px auto 0;
                    }

                    /* Petits téléphones */
                    .phone-small {
                        position: absolute;
                        width: 90px;
                        border-radius: 20px;
                        padding: 6px;
                        box-shadow: 0 10px 40px rgba(73, 185, 109, 0.15);
                        border: 2px solid rgba(73, 185, 109, 0.1);
                        animation: float-phone 6s ease-in-out infinite;
                    }

                    .phone-small-1 {
                        top: -20px;
                        right: -40px;
                        animation-delay: 0s;
                    }

                    .phone-small-2 {
                        bottom: 40px;
                        left: -50px;
                        animation-delay: -3s;
                    }

                    .phone-screen-small {
                        height: 60px;
                        background: linear-gradient(180deg, #06100a, #0a1a0e);
                        border-radius: 16px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 4px;
                    }

                    .small-content {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 2px;
                    }

                    .small-icon {
                        font-size: 16px;
                    }

                    .small-content span:last-child {
                        font-size: 7px;
                        color: rgba(255, 255, 255, 0.5);
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 0.3px;
                    }

                    @keyframes float-phone {
                        0%, 100% { transform: translateY(0) rotate(0deg); }
                        50% { transform: translateY(-8px) rotate(3deg); }
                    }

                    /* Badges flottants verts intenses */
                    .floating-badge {
                        position: absolute;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        padding: 10px 16px;
                        background: rgba(6, 16, 10, 0.92);
                        backdrop-filter: blur(16px);
                        border: 2px solid rgba(73, 185, 109, 0.2);
                        border-radius: 14px;
                        box-shadow: 0 8px 30px rgba(73, 185, 109, 0.2);
                        animation: float-badge 4s ease-in-out infinite;
                    }

                    .badge-1 {
                        top: 15%;
                        right: -50px;
                        animation-delay: 0s;
                    }

                    .badge-2 {
                        bottom: 25%;
                        left: -60px;
                        animation-delay: -2s;
                    }

                    .badge-icon {
                        font-size: 20px;
                    }

                    .badge-title {
                        font-size: 14px;
                        font-weight: 700;
                        color: #6CD48E;
                        display: block;
                        line-height: 1.2;
                    }

                    .badge-sub {
                        font-size: 10px;
                        color: rgba(255, 255, 255, 0.4);
                        display: block;
                    }

                    @keyframes float-badge {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-8px); }
                    }

                    /* ====== CONTENU ====== */
                    .app-content-wrapper {
                        display: flex;
                        align-items: center;
                    }

                    .app-content {
                        width: 100%;
                    }

                    .content-badge {
                        display: inline-flex;
                        align-items: center;
                        gap: 10px;
                        padding: 6px 20px 6px 14px;
                        background: rgba(73, 185, 109, 0.12);
                        border: 2px solid rgba(73, 185, 109, 0.15);
                        border-radius: 50px;
                        font-size: 12px;
                        font-weight: 600;
                        color: #49B96D;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        margin-bottom: 20px;
                    }

                    .badge-dot {
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: #49B96D;
                        animation: pulse-dot 2s ease-in-out infinite;
                        box-shadow: 0 0 15px rgba(73, 185, 109, 0.4);
                    }

                    @keyframes pulse-dot {
                        0%, 100% { opacity: 1; transform: scale(1); }
                        50% { opacity: 0.3; transform: scale(0.7); }
                    }

                    .app-title {
                        font-size: 38px;
                        font-weight: 800;
                        color: var(--black-color);
                        line-height: 1.15;
                        margin-bottom: 16px;
                    }

                    .highlight {
                        background: var(--gradient-main);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: #49B96D;
                        background-clip: text;

                    }

                    .content-divider {
                        display: flex;
                        align-items: center;
                        gap: 14px;
                        margin-bottom: 20px;
                    }

                    .divider-line {
                        width: 50px;
                        height: 3px;
                        border-radius: 2px;
                        background: var(--gradient-main);
                    }

                    .divider-icon {
                        font-size: 10px;
                        color: #49B96D;
                        opacity: 0.4;
                    }

                    .app-description {
                        font-size: 16px;
                        color: var(--paragraph-color);
                        line-height: 1.8;
                        margin-bottom: 16px;
                        font-weight: 500;
                    }

                    .app-description-secondary {
                        font-size: 15px;
                        color: var(--paragraph-color);
                        line-height: 1.8;
                        margin-bottom: 30px;
                        opacity: 0.85;
                        font-weight: 400;
                    }

                    /* ====== BOUTONS VERTS INTENSES ====== */
                    .download-buttons {
                        display: flex;
                        gap: 16px;
                        flex-wrap: wrap;
                        margin-bottom: 30px;
                    }

                    .download-btn {
                        display: flex;
                        align-items: center;
                        gap: 14px;
                        padding: 14px 24px;
                        border-radius: 14px;
                        text-decoration: none;
                        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        border: 2px solid rgba(73, 185, 109, 0.1);
                        flex: 1;
                        min-width: 180px;
                        position: relative;
                        overflow: hidden;
                    }

                    .download-btn::before {
                        content: '';
                        position: absolute;
                        inset: 0;
                        opacity: 0;
                        transition: opacity 0.4s ease;
                    }

                    .app-store {
                        background: var(--dark-bg);
                        color: var(--white-color);
                        border-color: rgba(73, 185, 109, 0.2);
                    }

                    .app-store::before {
                        background: linear-gradient(135deg, #1a3a1e, var(--dark-bg));
                    }

                    .app-store .btn-main {
                        color: #6CD48E;
                    }

                    .play-store {
                        background: var(--white-color);
                        color: var(--black-color);
                        border-color: rgba(73, 185, 109, 0.15);
                    }

                    .play-store::before {
                        background: rgba(73, 185, 109, 0.05);
                    }

                    .play-store .btn-main {
                        color: #2D8A4E;
                    }

                    .download-btn:hover {
                        transform: translateY(-4px) scale(1.02);
                        box-shadow: 0 12px 40px rgba(73, 185, 109, 0.2);
                        border-color: #49B96D;
                    }

                    .download-btn:hover::before {
                        opacity: 1;
                    }

                    .download-btn .btn-icon,
                    .download-btn .btn-text,
                    .download-btn .btn-arrow {
                        position: relative;
                        z-index: 1;
                    }

                    .btn-icon {
                        width: 36px;
                        height: 36px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-shrink: 0;
                    }

                    .btn-icon svg {
                        width: 28px;
                        height: 28px;
                    }

                    .app-store .btn-icon svg {
                        fill: #6CD48E;
                    }

                    .play-store .btn-icon svg {
                        fill: #2D8A4E;
                    }

                    .btn-text {
                        display: flex;
                        flex-direction: column;
                        line-height: 1.2;
                    }

                    .btn-sub {
                        font-size: 10px;
                        opacity: 0.6;
                        font-weight: 500;
                        text-transform: uppercase;
                        letter-spacing: 0.3px;
                    }

                    .btn-main {
                        font-size: 16px;
                        font-weight: 700;
                    }

                    .btn-arrow {
                        font-size: 18px;
                        margin-left: auto;
                        transition: transform 0.3s ease;
                        color: #49B96D;
                    }

                    .download-btn:hover .btn-arrow {
                        transform: translateX(4px);
                    }

                    /* ====== STATISTIQUES VERTES INTENSES ====== */
                    .app-stats {
                        display: flex;
                        align-items: center;
                        gap: 30px;
                        padding-top: 24px;
                        border-top: 2px solid rgba(73, 185, 109, 0.08);
                    }

                    .app-stat {
                        display: flex;
                        flex-direction: column;
                    }

                    .stat-number {
                        font-size: 28px;
                        font-weight: 800;
                        color: #49B96D;
                        line-height: 1.2;
                        text-shadow: 0 0 30px rgba(73, 185, 109, 0.1);
                    }

                    .stat-stars {
                        color: #f5b342;
                        font-size: 14px;
                        letter-spacing: 2px;
                    }

                    .stat-label {
                        font-size: 12px;
                        color: var(--paragraph-color);
                        font-weight: 500;
                        opacity: 0.7;
                    }

                    .stat-divider {
                        width: 2px;
                        height: 36px;
                        background: rgba(73, 185, 109, 0.1);
                    }

                    /* ====== RESPONSIVE ====== */
                    @media (max-width: 992px) {
                        .app-wrapper {
                            grid-template-columns: 1fr;
                            gap: 50px;
                        }

                        .app-image-wrapper {
                            order: 0;
                        }

                        .app-content-wrapper {
                            order: 1;
                            text-align: center;
                        }

                        .app-title {
                            font-size: 34px;
                        }

                        .content-divider {
                            justify-content: center;
                        }

                        .download-buttons {
                            justify-content: center;
                        }

                        .app-stats {
                            justify-content: center;
                        }

                        .app-image-container {
                            max-width: 320px;
                            margin: 0 auto;
                        }

                        .floating-badge {
                            display: none;
                        }

                        .phone-small {
                            display: none;
                        }
                    }

                    @media (max-width: 768px) {
                        .app-download-section {
                            padding: 60px 0 40px;
                        }

                        .container {
                            padding: 0 20px;
                        }

                        .app-title {
                            font-size: 28px;
                        }

                        .app-description {
                            font-size: 15px;
                        }

                        .download-buttons {
                            flex-direction: column;
                            align-items: center;
                        }

                        .download-btn {
                            width: 100%;
                            max-width: 280px;
                            justify-content: center;
                        }

                        .app-stats {
                            flex-wrap: wrap;
                            gap: 16px;
                        }

                        .stat-divider {
                            display: none;
                        }

                        .app-image-container {
                            max-width: 260px;
                        }

                        .phone-main {
                            max-width: 260px;
                        }
                    }

                    @media (max-width: 480px) {
                        .app-title {
                            font-size: 24px;
                        }

                        .app-image-container {
                            max-width: 220px;
                        }

                        .phone-main {
                            max-width: 220px;
                            border-radius: 30px;
                            padding: 8px;
                        }

                        .phone-screen {
                            border-radius: 24px;
                            padding: 12px;
                        }

                        .phone-content h4 {
                            font-size: 16px;
                        }

                        .phone-content p {
                            font-size: 11px;
                        }

                        .phone-feature {
                            font-size: 10px;
                            padding: 4px 0;
                        }

                        .phone-bottom-nav {
                            font-size: 14px;
                        }

                        .app-icon {
                            width: 48px;
                            height: 48px;
                            font-size: 14px;
                        }

                        .download-btn {
                            padding: 12px 18px;
                            min-width: auto;
                        }

                        .btn-main {
                            font-size: 14px;
                        }

                        .stat-number {
                            font-size: 22px;
                        }
                    }
                `}</style>
            </section>
        );
    }
}

export default AppDownloadContent;