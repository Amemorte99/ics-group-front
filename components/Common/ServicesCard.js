import React, { Component } from 'react';
import Image from 'next/image';
import Link from 'next/link';

class ServicesCard extends Component {
    render() {
        // Couleurs officielles de la charte graphique ICS GROUP
        const colors = {
            primary: '#49B96D',      // Vert principal
            secondary: '#80C353',    // Vert secondaire
            dark: '#0a0e27',         // Fond sombre
            light: '#f8f9fa',        // Fond clair
            white: '#ffffff',
            gradient: 'linear-gradient(135deg, #49B96D, #80C353)'
        };

        const services = [
            {
                id: 1,
                title: 'Design Graphique & Communication',
                description: 'ICS GROUPE vous accompagne dans la conception de supports de communication optimisés, conformes aux normes marketing, avec des contenus visuels et textuels sur mesure pour renforcer votre image de marque et vos argumentaires commerciaux.',
                image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop&q=80',
                icon: 'fa-palette',
                color: colors.primary,
                features: [
                    'Création de logos & identités visuelles',
                    'Supports print & digitaux (flyers, brochures, bannières)',
                    'Optimisation du positionnement marketing',
                    'Contenus adaptés à votre public cible'
                ],
                position: 'right'
            },
            {
                id: 2,
                title: 'Site Web & Applications Mobiles',
                description: 'Nous développons des solutions digitales performantes : sites web responsive, applications mobiles natives ou hybrides, informatisation des systèmes d\'information et gestion de bases de données.',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80',
                icon: 'fa-laptop-code',
                color: colors.secondary,
                features: [
                    'Création de sites web sur mesure',
                    'Développement d\'applications mobiles',
                    'Informatisation & automatisation',
                    'Conception et gestion de bases de données'
                ],
                position: 'left'
            },
            {
                id: 3,
                title: 'Cybersécurité',
                description: 'Renforcez la résilience de vos systèmes face aux cybermenaces grâce à nos experts certifiés (ISO 27001, CISSP, etc.) qui accompagnent, conseillent et déploient des solutions innovantes.',
                image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop&q=80',
                icon: 'fa-shield-halved',
                color: colors.primary,
                features: [
                    'Audit & conseil en sécurité',
                    'Déploiement de solutions de protection',
                    'Continuité d\'activité & investigation numérique',
                    'Maîtrise des risques dans la transformation digitale'
                ],
                position: 'right'
            },
            {
                id: 4,
                title: 'Énergies Renouvelables',
                description: 'De l\'étude à la maintenance, nous proposons des solutions solaires complètes adaptées à votre budget pour optimiser votre consommation et réduire votre empreinte écologique.',
                image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop&q=80',
                icon: 'fa-solar-panel',
                color: colors.secondary,
                features: [
                    'Vente & installation de panneaux solaires',
                    'Batteries, onduleurs, régulateurs & accessoires',
                    'Étude personnalisée & suivi',
                    'Maintenance & formation'
                ],
                position: 'left'
            },
            {
                id: 5,
                title: 'Réseaux & Télécommunications',
                description: 'Nous concevons, déployons et maintenons des infrastructures réseaux fiables : interconnexion de sites, support FAI et conseil expert pour une connectivité optimale.',
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80',
                icon: 'fa-network-wired',
                color: colors.primary,
                features: [
                    'Interconnexion multisites',
                    'Maintenance infrastructures internet',
                    'Conseil & optimisation réseaux',
                    'Solutions télécom sur mesure'
                ],
                position: 'right'
            },
            {
                id: 6,
                title: 'Cloud & Infrastructure',
                description: 'Optimisez votre infrastructure IT avec nos solutions cloud sécurisées, scalables et performantes pour une agilité maximale et une réduction des coûts.',
                image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80',
                icon: 'fa-cloud',
                color: colors.secondary,
                features: [
                    'Migration vers le cloud',
                    'Infrastructure as a Service (IaaS)',
                    'Sauvegarde & reprise d\'activité',
                    'Optimisation des coûts cloud'
                ],
                position: 'left'
            }
        ];

        return (
            <div className="services-wrapper">
                {/* En-tête de section */}
                <div className="services-header">
                    <div className="header-background">
                        <div className="header-glow"></div>
                    </div>
                    <div className="header-content">
                        <span className="header-tag">NOS EXPERTISES</span>
                        <h2 className="header-title">
                            Des services <span className="highlight">complets</span><br />
                            pour votre <span className="highlight">transformation</span>
                        </h2>
                        <p className="header-description">
                            Découvrez notre gamme complète de services conçus pour répondre aux défis
                            de votre entreprise et propulser votre croissance.
                        </p>
                    </div>
                </div>

                {/* Liste des services */}
                {services.map((service, index) => (
                    <div 
                        key={service.id} 
                        className={`service-block ${service.position === 'left' ? 'service-left' : 'service-right'}`}
                    >
                        <div className="service-container">
                            {/* Image */}
                            <div className="service-image-wrapper">
                                <div className="service-image-frame">
                                    <div className="image-glow" style={{ background: `radial-gradient(circle, ${service.color}30, transparent 70%)` }}></div>
                                    <img 
                                        src={service.image} 
                                        alt={service.title}
                                        className="service-image"
                                        loading="lazy"
                                    />
                                    <div className="image-overlay-gradient"></div>
                                    <div className="image-shine"></div>
                                    
                                    {/* Badge flottant ICS GROUP */}
                                    <div className="image-badge" style={{ background: service.color }}>
                                        <i className={`fas ${service.icon}`}></i>
                                        <span>ICS GROUPE</span>
                                    </div>

                                    {/* Badge de statistique */}
                                    <div className="image-stats-badge">
                                        <span className="stats-number">{String(index + 1).padStart(2, '0')}</span>
                                        <span className="stats-label">Service</span>
                                    </div>
                                </div>
                            </div>

                            {/* Contenu */}
                            <div className="service-content-wrapper">
                                <div className="service-content">
                                    <div className="service-number" style={{ color: service.color }}>
                                        {String(service.id).padStart(2, '0')}
                                    </div>
                                    
                                    <div className="service-icon" style={{ background: `${service.color}15`, color: service.color }}>
                                        <i className={`fas ${service.icon}`}></i>
                                    </div>
                                    
                                    <h3 className="service-title">{service.title}</h3>
                                    <div className="service-bar" style={{ background: `linear-gradient(90deg, ${service.color}, ${service.color}60)` }}></div>
                                    
                                    <p className="service-description">{service.description}</p>
                                    
                                    <ul className="service-features">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx}>
                                                <span className="feature-icon" style={{ color: service.color }}>
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    
                                    <Link href="/contact">
                                        <a className="service-cta" style={{ 
                                            background: `linear-gradient(135deg, ${service.color}, ${service.color}80)`,
                                            boxShadow: `0 8px 30px ${service.color}40`
                                        }}>
                                            <span>En savoir plus</span>
                                            <svg className="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* ====== CTA FINAL AMÉLIORÉ ====== */}
                <div className="final-cta">
                    {/* Arrière-plan avec effets */}
                    <div className="final-cta-background">
                        <div className="final-cta-glow-1"></div>
                        <div className="final-cta-glow-2"></div>
                        <div className="final-cta-pattern"></div>
                    </div>

                    <div className="final-cta-container">
                        <div className="final-cta-content">
                            {/* Branding ICS GROUPE */}
                            <div className="cta-brand">
                                <span className="cta-brand-dot"></span>
                                <span className="cta-brand-text">ICS GROUPE</span>
                                <span className="cta-brand-badge">Expertise</span>
                            </div>

                            {/* Titre principal */}
                            <h3 className="final-cta-title">
                                Prêt à <span className="highlight">transformer</span> votre entreprise ?
                            </h3>

                            {/* Description */}
                            <p className="final-cta-text">
                                Contactez-nous dès aujourd'hui pour discuter de votre projet et découvrir
                                comment <strong>ICS GROUPE</strong> peut vous accompagner vers le succès.
                            </p>

                            {/* Bouton CTA */}
                            <Link href="/contact">
                                <a className="final-cta-button">
                                    <span>Commencer maintenant</span>
                                    <svg className="final-cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </a>
                            </Link>

                            {/* Petits indicateurs de confiance */}
                            <div className="cta-trust">
                                <span className="trust-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Sécurisé
                                </span>
                                <span className="trust-divider"></span>
                                <span className="trust-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Expertise
                                </span>
                                <span className="trust-divider"></span>
                                <span className="trust-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Qualité
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    /* ====== IMPORT DES POLICES ====== */
                    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');

                    /* ====== VARIABLES ICS GROUP ====== */
                    :root {
                        --ics-primary: #49B96D;
                        --ics-secondary: #80C353;
                        --ics-dark: #0a0e27;
                        --ics-light: #f8f9fa;
                        --ics-white: #ffffff;
                        --ics-gradient: linear-gradient(135deg, #49B96D, #80C353);
                        --ics-font: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                    }

                    /* ====== WRAPPER ====== */
                    .services-wrapper {
                        background: linear-gradient(180deg, var(--ics-light) 0%, var(--ics-white) 100%);
                        overflow: hidden;
                        font-family: var(--ics-font);
                    }

                    .highlight {
                        background: var(--ics-gradient);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: #49B96D;
                        background-clip: text;
                    }

                    /* ====== EN-TÊTE ====== */
                    .services-header {
                        position: relative;
                        padding: 80px 30px 60px;
                        text-align: center;
                        overflow: hidden;
                    }

                    .header-background {
                        position: absolute;
                        inset: 0;
                        z-index: 0;
                    }

                    .header-glow {
                        position: absolute;
                        width: 600px;
                        height: 600px;
                        background: radial-gradient(circle, rgba(73, 185, 109, 0.05) 0%, transparent 70%);
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        animation: headerGlow 8s ease-in-out infinite;
                    }

                    @keyframes headerGlow {
                        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
                        50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
                    }

                    .header-content {
                        position: relative;
                        z-index: 1;
                        max-width: 800px;
                        margin: 0 auto;
                    }

                    .header-tag {
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

                    .header-title {
                        font-size: 44px;
                        font-weight: 800;
                        color: var(--ics-dark);
                        line-height: 1.2;
                        margin-bottom: 16px;
                        font-family: var(--ics-font);
                    }

                    .header-description {
                        font-size: 18px;
                        color: #6c757d;
                        max-width: 600px;
                        margin: 0 auto;
                        line-height: 1.7;
                        font-family: var(--ics-font);
                        font-weight: 400;
                    }

                    /* ====== SERVICE BLOC ====== */
                    .service-block {
                        padding: 60px 0;
                        position: relative;
                    }

                    .service-block:nth-child(even) {
                        background: rgba(10, 14, 39, 0.02);
                    }

                    .service-container {
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 0 30px;
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 60px;
                        align-items: center;
                    }

                    /* ====== IMAGE ====== */
                    .service-image-wrapper {
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .service-left .service-image-wrapper {
                        order: 0;
                    }

                    .service-right .service-image-wrapper {
                        order: 1;
                    }

                    .service-image-frame {
                        position: relative;
                        width: 100%;
                        max-width: 500px;
                        border-radius: 24px;
                        overflow: hidden;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
                        transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        border: 1px solid rgba(73, 185, 109, 0.08);
                    }

                    .service-image-frame:hover {
                        transform: translateY(-8px) scale(1.01);
                        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.15);
                        border-color: rgba(73, 185, 109, 0.15);
                    }

                    .image-glow {
                        position: absolute;
                        inset: -50%;
                        z-index: 0;
                        animation: glowPulse 6s ease-in-out infinite;
                    }

                    @keyframes glowPulse {
                        0%, 100% { transform: scale(1); opacity: 0.5; }
                        50% { transform: scale(1.1); opacity: 1; }
                    }

                    .service-image {
                        width: 100%;
                        height: 340px;
                        object-fit: cover;
                        display: block;
                        position: relative;
                        z-index: 1;
                        transition: transform 0.6s ease;
                    }

                    .service-image-frame:hover .service-image {
                        transform: scale(1.05);
                    }

                    .image-overlay-gradient {
                        position: absolute;
                        inset: 0;
                        background: linear-gradient(135deg, rgba(10, 14, 39, 0.02), transparent 60%);
                        z-index: 2;
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
                            rgba(255, 255, 255, 0.05) 50%,
                            transparent 70%
                        );
                        transform: rotate(45deg) translate(-100%, -100%);
                        transition: transform 0.8s ease;
                        z-index: 3;
                        pointer-events: none;
                    }

                    .service-image-frame:hover .image-shine {
                        transform: rotate(45deg) translate(50%, 50%);
                    }

                    /* Badges ICS GROUP */
                    .image-badge {
                        position: absolute;
                        bottom: 20px;
                        right: 20px;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        padding: 10px 16px;
                        border-radius: 12px;
                        color: #fff;
                        font-size: 12px;
                        font-weight: 600;
                        z-index: 4;
                        backdrop-filter: blur(10px);
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                        animation: floatBadge 3s ease-in-out infinite;
                        font-family: var(--ics-font);
                    }

                    .image-badge i {
                        font-size: 16px;
                    }

                    .image-stats-badge {
                        position: absolute;
                        top: 20px;
                        left: 20px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        width: 48px;
                        height: 48px;
                        background: rgba(255, 255, 255, 0.95);
                        backdrop-filter: blur(10px);
                        border-radius: 12px;
                        z-index: 4;
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                        border: 1px solid rgba(73, 185, 109, 0.1);
                    }

                    .stats-number {
                        font-size: 18px;
                        font-weight: 800;
                        color: var(--ics-dark);
                        line-height: 1;
                        font-family: var(--ics-font);
                    }

                    .stats-label {
                        font-size: 8px;
                        font-weight: 600;
                        color: var(--ics-primary);
                        text-transform: uppercase;
                        letter-spacing: 0.3px;
                        font-family: var(--ics-font);
                    }

                    @keyframes floatBadge {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-5px); }
                    }

                    /* ====== CONTENU ====== */
                    .service-content-wrapper {
                        display: flex;
                        align-items: center;
                    }

                    .service-left .service-content-wrapper {
                        order: 1;
                    }

                    .service-right .service-content-wrapper {
                        order: 0;
                    }

                    .service-content {
                        position: relative;
                        padding: 20px 0;
                    }

                    .service-number {
                        font-size: 72px;
                        font-weight: 900;
                        opacity: 0.7;
                        line-height: 1;
                        position: absolute;
                        top: -20px;
                        right: 0;
                        font-family: var(--ics-font);
                        pointer-events: none;
                    }

                    .service-icon {
                        width: 56px;
                        height: 56px;
                        border-radius: 16px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 24px;
                        margin-bottom: 20px;
                        transition: all 0.4s ease;
                    }

                    .service-content:hover .service-icon {
                        transform: scale(1.05) rotate(-3deg);
                    }

                    .service-title {
                        font-size: 28px;
                        font-weight: 700;
                        color: var(--ics-dark);
                        margin-bottom: 12px;
                        font-family: var(--ics-font);
                    }

                    .service-bar {
                        width: 60px;
                        height: 4px;
                        border-radius: 2px;
                        margin-bottom: 20px;
                        transition: width 0.4s ease;
                    }

                    .service-content:hover .service-bar {
                        width: 80px;
                    }

                    .service-description {
                        font-size: 16px;
                        line-height: 1.8;
                        color: #6c757d;
                        margin-bottom: 24px;
                        font-family: var(--ics-font);
                        font-weight: 400;
                    }

                    /* ====== FEATURES ====== */
                    .service-features {
                        list-style: none;
                        padding: 0;
                        margin: 0 0 30px 0;
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 12px;
                    }

                    .service-features li {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        font-size: 14px;
                        color: #2c3e50;
                        padding: 8px 12px;
                        background: rgba(0, 0, 0, 0.02);
                        border-radius: 8px;
                        transition: all 0.3s ease;
                        font-family: var(--ics-font);
                        font-weight: 400;
                    }

                    .service-features li:hover {
                        background: rgba(73, 185, 109, 0.05);
                        transform: translateX(4px);
                    }

                    .feature-icon {
                        display: inline-flex;
                        width: 20px;
                        height: 20px;
                        flex-shrink: 0;
                    }

                    .feature-icon svg {
                        width: 100%;
                        height: 100%;
                    }

                    /* ====== CTA ====== */
                    .service-cta {
                        display: inline-flex;
                        align-items: center;
                        gap: 10px;
                        padding: 14px 32px;
                        color: #fff;
                        font-weight: 600;
                        font-size: 15px;
                        border-radius: 50px;
                        text-decoration: none;
                        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        border: none;
                        cursor: pointer;
                        font-family: var(--ics-font);
                    }

                    .service-cta:hover {
                        transform: translateY(-3px) scale(1.02);
                        box-shadow: 0 12px 40px rgba(73, 185, 109, 0.4) !important;
                        color: #fff;
                    }

                    .cta-arrow {
                        width: 20px;
                        height: 20px;
                        transition: transform 0.3s ease;
                    }

                    .service-cta:hover .cta-arrow {
                        transform: translateX(6px);
                    }

                    /* ====== FINAL CTA AMÉLIORÉ ====== */
                    .final-cta {
                        position: relative;
                        padding: 100px 30px;
                        overflow: hidden;
                        background: linear-gradient(135deg, #0a0e27 0%, #141b33 50%, #1a2340 100%);
                    }

                    /* Arrière-plan avec effets */
                    .final-cta-background {
                        position: absolute;
                        inset: 0;
                        z-index: 0;
                        overflow: hidden;
                    }

                    .final-cta-glow-1 {
                        position: absolute;
                        width: 600px;
                        height: 600px;
                        background: radial-gradient(circle, rgba(73, 185, 109, 0.15) 0%, transparent 70%);
                        top: -200px;
                        right: -200px;
                        animation: glowPulse 8s ease-in-out infinite;
                    }

                    .final-cta-glow-2 {
                        position: absolute;
                        width: 400px;
                        height: 400px;
                        background: radial-gradient(circle, rgba(128, 195, 83, 0.1) 0%, transparent 70%);
                        bottom: -100px;
                        left: -100px;
                        animation: glowPulse 10s ease-in-out infinite reverse;
                    }

                    .final-cta-pattern {
                        position: absolute;
                        inset: 0;
                        background-image: 
                            radial-gradient(circle at 20% 50%, rgba(73, 185, 109, 0.03) 0%, transparent 50%),
                            radial-gradient(circle at 80% 50%, rgba(128, 195, 83, 0.03) 0%, transparent 50%);
                        z-index: 0;
                    }

                    .final-cta-container {
                        position: relative;
                        z-index: 1;
                        max-width: 900px;
                        margin: 0 auto;
                    }

                    .final-cta-content {
                        text-align: center;
                        background: rgba(255, 255, 255, 0.02);
                        border: 1px solid rgba(255, 255, 255, 0.06);
                        border-radius: 32px;
                        padding: 60px 50px;
                        backdrop-filter: blur(20px);
                        box-shadow: 0 40px 80px rgba(0, 0, 0, 0.3);
                    }

                    /* Branding */
                    .cta-brand {
                        display: inline-flex;
                        align-items: center;
                        gap: 12px;
                        padding: 8px 24px 8px 18px;
                        background: rgba(73, 185, 109, 0.12);
                        border: 1px solid rgba(73, 185, 109, 0.2);
                        border-radius: 50px;
                        font-family: var(--ics-font);
                        margin-bottom: 28px;
                    }

                    .cta-brand-dot {
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: var(--ics-primary);
                        animation: dotPulse 2s ease-in-out infinite;
                        flex-shrink: 0;
                    }

                    .cta-brand-text {
                        font-size: 14px;
                        font-weight: 700;
                        color: #a8d5b5;
                        letter-spacing: 0.5px;
                    }

                    .cta-brand-badge {
                        padding: 2px 12px;
                        background: rgba(73, 185, 109, 0.2);
                        border-radius: 50px;
                        font-size: 10px;
                        font-weight: 700;
                        color: var(--ics-primary);
                        text-transform: uppercase;
                        letter-spacing: 0.3px;
                    }

                    @keyframes dotPulse {
                        0%, 100% { opacity: 1; transform: scale(1); }
                        50% { opacity: 0.3; transform: scale(0.7); }
                    }

                    /* Titre */
                    .final-cta-title {
                        font-size: 42px;
                        font-weight: 800;
                        color: #ffffff;
                        margin-bottom: 20px;
                        line-height: 1.2;
                        font-family: var(--ics-font);
                    }

                    /* Description */
                    .final-cta-text {
                        font-size: 18px;
                        color: rgba(255, 255, 255, 0.7);
                        max-width: 600px;
                        margin: 0 auto 36px;
                        line-height: 1.8;
                        font-family: var(--ics-font);
                        font-weight: 400;
                    }

                    .final-cta-text strong {
                        color: var(--ics-primary);
                        font-weight: 600;
                    }

                    /* Bouton */
                    .final-cta-button {
                        display: inline-flex;
                        align-items: center;
                        gap: 14px;
                        padding: 18px 44px;
                        background: var(--ics-gradient);
                        color: #fff;
                        font-size: 17px;
                        font-weight: 700;
                        border-radius: 50px;
                        text-decoration: none;
                        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        box-shadow: 0 8px 40px rgba(73, 185, 109, 0.35);
                        font-family: var(--ics-font);
                        position: relative;
                        overflow: hidden;
                    }

                    .final-cta-button::before {
                        content: '';
                        position: absolute;
                        inset: 0;
                        background: linear-gradient(135deg, #3a9e5d, #6cb343);
                        opacity: 0;
                        transition: opacity 0.4s ease;
                    }

                    .final-cta-button span,
                    .final-cta-button .final-cta-arrow {
                        position: relative;
                        z-index: 1;
                    }

                    .final-cta-button:hover {
                        transform: translateY(-4px) scale(1.02);
                        box-shadow: 0 16px 60px rgba(73, 185, 109, 0.5);
                        color: #fff;
                    }

                    .final-cta-button:hover::before {
                        opacity: 1;
                    }

                    .final-cta-arrow {
                        width: 22px;
                        height: 22px;
                        transition: transform 0.3s ease;
                        position: relative;
                        z-index: 1;
                    }

                    .final-cta-button:hover .final-cta-arrow {
                        transform: translateX(8px);
                    }

                    /* Indicateurs de confiance */
                    .cta-trust {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 20px;
                        margin-top: 36px;
                        padding-top: 32px;
                        border-top: 1px solid rgba(255, 255, 255, 0.06);
                    }

                    .trust-item {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-size: 13px;
                        font-weight: 500;
                        color: rgba(255, 255, 255, 0.5);
                        font-family: var(--ics-font);
                    }

                    .trust-item svg {
                        width: 18px;
                        height: 18px;
                        color: var(--ics-primary);
                    }

                    .trust-divider {
                        width: 1px;
                        height: 20px;
                        background: rgba(255, 255, 255, 0.06);
                    }

                    /* ====== RESPONSIVE ====== */
                    @media (max-width: 992px) {
                        .service-container {
                            grid-template-columns: 1fr;
                            gap: 40px;
                        }

                        .service-left .service-image-wrapper {
                            order: 0;
                        }
                        .service-right .service-image-wrapper {
                            order: 0;
                        }
                        .service-left .service-content-wrapper {
                            order: 1;
                        }
                        .service-right .service-content-wrapper {
                            order: 1;
                        }

                        .service-image-frame {
                            max-width: 100%;
                        }

                        .service-image {
                            height: 280px;
                        }

                        .service-number {
                            font-size: 56px;
                            top: -10px;
                        }

                        .service-features {
                            grid-template-columns: 1fr;
                        }

                        .header-title {
                            font-size: 36px;
                        }

                        .final-cta-content {
                            padding: 40px 30px;
                        }

                        .final-cta-title {
                            font-size: 34px;
                        }

                        .cta-trust {
                            flex-wrap: wrap;
                            gap: 12px;
                        }
                    }

                    @media (max-width: 768px) {
                        .service-block {
                            padding: 40px 0;
                        }

                        .service-container {
                            padding: 0 20px;
                            gap: 30px;
                        }

                        .service-image {
                            height: 220px;
                        }

                        .service-title {
                            font-size: 24px;
                        }

                        .service-description {
                            font-size: 15px;
                        }

                        .header-title {
                            font-size: 30px;
                        }

                        .header-description {
                            font-size: 16px;
                        }

                        .services-header {
                            padding: 60px 20px 40px;
                        }

                        .image-badge {
                            bottom: 12px;
                            right: 12px;
                            padding: 8px 12px;
                            font-size: 11px;
                        }

                        .image-badge i {
                            font-size: 14px;
                        }

                        .image-stats-badge {
                            width: 40px;
                            height: 40px;
                            top: 12px;
                            left: 12px;
                        }

                        .stats-number {
                            font-size: 14px;
                        }

                        .final-cta {
                            padding: 60px 20px;
                        }

                        .final-cta-content {
                            padding: 30px 20px;
                        }

                        .final-cta-title {
                            font-size: 28px;
                        }

                        .final-cta-text {
                            font-size: 16px;
                        }

                        .final-cta-button {
                            width: 100%;
                            justify-content: center;
                            padding: 16px 32px;
                            font-size: 15px;
                        }

                        .cta-brand-text {
                            font-size: 12px;
                        }

                        .cta-brand-badge {
                            display: none;
                        }
                    }

                    @media (max-width: 480px) {
                        .service-image {
                            height: 180px;
                        }

                        .service-title {
                            font-size: 20px;
                        }

                        .header-title {
                            font-size: 26px;
                        }

                        .service-number {
                            font-size: 40px;
                        }

                        .service-cta {
                            width: 100%;
                            justify-content: center;
                        }

                        .service-features li {
                            font-size: 13px;
                        }

                        .final-cta-title {
                            font-size: 24px;
                        }

                        .final-cta-content {
                            padding: 24px 16px;
                            border-radius: 24px;
                        }

                        .cta-trust {
                            flex-direction: column;
                            gap: 8px;
                        }

                        .trust-divider {
                            display: none;
                        }
                    }
                `}</style>
            </div>
        );
    }
}

export default ServicesCard;