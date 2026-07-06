import React, { Component } from 'react';
import Link from 'next/link';

class PartnerContent extends Component {
    render() {
        const partners = [
            {
                id: 1,
                name: 'Huawei',
                logo: 'https://cdn.vectorstock.com/i/500p/39/34/huawei-logo-brand-phone-symbol-red-with-name-white-vector-46213934.jpg',
                website: 'https://www.huawei.com',
                category: 'Technologie & Réseaux',
                description: 'Leader mondial des solutions ICT'
            },
            {
                id: 2,
                name: 'Cisco',
                logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1200px-Cisco_logo_blue_2016.svg.png',
                website: 'https://www.cisco.com',
                category: 'Réseaux & Sécurité',
                description: 'Expert en infrastructure réseau'
            },
            {
                id: 3,
                name: 'Fortinet',
                logo: 'https://download.logo.wine/logo/Fortinet/Fortinet-Logo.wine.png',
                website: 'https://www.fortinet.com',
                category: 'Cybersécurité',
                description: 'Solutions de sécurité avancées'
            },
            {
                id: 4,
                name: 'Schneider Electric',
                logo: 'https://logos-world.net/wp-content/uploads/2023/02/Schneider-Electric-Logo.png',
                website: 'https://www.se.com',
                category: 'Énergie & Automatisation',
                description: 'Solutions énergétiques durables'
            },
            {
                id: 5,
                name: 'Victron Energy',
                logo: 'https://s3-eu-west-1.amazonaws.com/tpd/logos/5fe2f2418dd76d0001f7c704/0x0.png',
                website: 'https://www.victronenergy.com',
                category: 'Énergie Renouvelable',
                description: 'Solutions solaires innovantes'
            },
            {
                id: 6,
                name: 'ISO 27001',
                logo: 'https://codific.com/wp-content/uploads/2023/05/ISO-logo.png',
                website: 'https://www.iso.org/standard/27001',
                category: 'Certification',
                description: 'Norme de sécurité de l\'information'
            },
            {
                id: 7,
                name: 'Microsoft Partner',
                logo: 'https://partner.microsoft.com/-/media/mssc/mpn/partner/marketing/badge.jpeg?h=433&iar=0&w=650&hash=5B1A3192DF4B6B2928187A6319C4110B',
                website: 'https://partner.microsoft.com',
                category: 'Technologie',
                description: 'Partenaire Microsoft certifié'
            },
            {
                id: 8,
                name: 'Oracle Partner',
                logo: 'https://mma.prnewswire.com/media/2814553/I_care_o_prtnr_Logo.jpg?p=facebook',
                website: 'https://www.oracle.com/partners',
                category: 'Base de données',
                description: 'Solutions Oracle certifiées'
            },
            {
                id: 9,
                name: 'SolarEdge',
                logo: 'https://cdn-jiaid.nitrocdn.com/sBOmYoPflieFmyCBYUQxHgieeDkCXAdy/assets/images/optimized/rev-1a1179f/csesolarusa.com/wp-content/uploads/2023/06/SolarEdge-logo-2.png',
                website: 'https://www.solaredge.com',
                category: 'Énergie Solaire',
                description: 'Innovation en énergie solaire'
            },
            {
                id: 10,
                name: 'SHT Tchad',
                logo: '/images/sht.jpeg',
                website: 'https://sht-td.com/',
                category: 'Énergie & Pétrole',
                description: 'Société des Hydrocarbures du Tchad'
            },
            {
                id: 11,
                name: 'CFAO Equipment Tchad',
                logo: '/images/CFAO-Motor-TCHAD.jpg',
                website: 'https://cfaoequipment-tchad.com',
                category: 'Équipement & Services',
                description: 'Solutions industrielles'
            },
            {
                id: 12,
                name: 'CPA Tchad',
                logo: '/images/logo-cpa-1.png',
                website: 'https://cpa-tchad.org',
                category: 'Services & Consulting',
                description: 'Conseil et accompagnement'
            }
        ];

        return (
            <section className="partners-section">
                {/* Arrière-plan décoratif */}
                <div className="partners-bg">
                    <div className="bg-circle bg-circle-1"></div>
                    <div className="bg-circle bg-circle-2"></div>
                    <div className="bg-circle bg-circle-3"></div>
                    <div className="bg-dots"></div>
                </div>

                <div className="container">
                    {/* En-tête */}
                    <div className="section-header">
                        <div className="header-badge">
                            <span className="badge-dot"></span>
                            Nos partenaires
                        </div>
                        <h2 className="section-title">
                            Des partenaires de confiance<br />
                            pour votre <span className="highlight">réussite</span>
                        </h2>
                        <div className="section-divider">
                            <span className="divider-line"></span>
                            <span className="divider-icon">◆</span>
                            <span className="divider-line"></span>
                        </div>
                        <p className="section-description">
                            <strong>ICS GROUPE</strong> collabore avec des leaders mondiaux en cybersécurité, 
                            réseaux, énergies renouvelables et technologies pour vous offrir les meilleures 
                            solutions innovantes et certifiées.
                        </p>
                    </div>

                    {/* Grille partenaires */}
                    <div className="partners-grid">
                        {partners.map((partner) => (
                            <div key={partner.id} className="partner-card">
                                <a 
                                    href={partner.website} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="partner-link"
                                >
                                    <div className="partner-logo-box">
                                        <img 
                                            src={partner.logo} 
                                            alt={partner.name}
                                            className="partner-logo"
                                            loading="lazy"
                                        />
                                        <div className="partner-overlay">
                                            <span className="overlay-category">{partner.category}</span>
                                            <span className="overlay-name">{partner.name}</span>
                                            <span className="overlay-link">Voir le site →</span>
                                        </div>
                                    </div>
                                    <span className="partner-name">{partner.name}</span>
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="stats-section">
                        <div className="stats-container">
                            <div className="stat-item">
                                <div className="stat-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round"/>
                                        <circle cx="9" cy="7" r="4"/>
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round"/>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round"/>
                                    </svg>
                                </div>
                                <div>
                                    <span className="stat-number">12+</span>
                                    <span className="stat-label">Partenaires actifs</span>
                                </div>
                            </div>

                            <div className="stat-divider"></div>

                            <div className="stat-item">
                                <div className="stat-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <line x1="2" y1="12" x2="22" y2="12"/>
                                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                                    </svg>
                                </div>
                                <div>
                                    <span className="stat-number">8</span>
                                    <span className="stat-label">Pays représentés</span>
                                </div>
                            </div>

                            <div className="stat-divider"></div>

                            <div className="stat-item">
                                <div className="stat-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <polyline points="12 6 12 12 16 14"/>
                                    </svg>
                                </div>
                                <div>
                                    <span className="stat-number">10+</span>
                                    <span className="stat-label">Années de collaboration</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Partenaire */}
                    <div className="cta-partner">
                        <div className="cta-partner-content">
                            <div className="cta-partner-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round"/>
                                    <circle cx="9" cy="7" r="4"/>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round"/>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <div className="cta-partner-text">
                                <h4>Devenez partenaire d'ICS GROUPE</h4>
                                <p>Rejoignez notre réseau de partenaires et bénéficiez d'une collaboration gagnant-gagnant</p>
                            </div>
                            <Link href="/contact">
                                <a className="cta-partner-btn">
                                    <span>Nous rejoindre</span>
                                    <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');

                    /* ====== COULEURS ICS ====== */
                    :root {
                        --main-color: #49B96D;
                        --optional-color: #80C353;
                        --white-color: #ffffff;
                        --black-color: #212529;
                        --paragraph-color: #57647c;
                        --dark-bg: #0a0e27;
                        --light-bg: #f8f9fa;
                        --gradient-main: linear-gradient(135deg, #49B96D, #80C353);
                        --font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    }

                    /* ====== SECTION ====== */
                    .partners-section {
                        position: relative;
                        padding: 100px 0 80px;
                        background: var(--white-color);
                        overflow: hidden;
                        font-family: var(--font-family);
                    }

                    /* ====== ARRIÈRE-PLAN ====== */
                    .partners-bg {
                        position: absolute;
                        inset: 0;
                        z-index: 0;
                        overflow: hidden;
                    }

                    .bg-circle {
                        position: absolute;
                        border-radius: 50%;
                        opacity: 0.04;
                    }

                    .bg-circle-1 {
                        width: 500px;
                        height: 500px;
                        background: var(--main-color);
                        top: -150px;
                        right: -150px;
                        animation: float 12s ease-in-out infinite;
                    }

                    .bg-circle-2 {
                        width: 400px;
                        height: 400px;
                        background: var(--optional-color);
                        bottom: -100px;
                        left: 10%;
                        animation: float 15s ease-in-out infinite reverse;
                    }

                    .bg-circle-3 {
                        width: 250px;
                        height: 250px;
                        background: var(--main-color);
                        top: 50%;
                        left: -100px;
                        animation: float 10s ease-in-out infinite 2s;
                    }

                    .bg-dots {
                        position: absolute;
                        inset: 0;
                        background-image: radial-gradient(circle, var(--main-color) 1px, transparent 1px);
                        background-size: 30px 30px;
                        opacity: 0.03;
                    }

                    @keyframes float {
                        0%, 100% { transform: translate(0, 0) scale(1); }
                        50% { transform: translate(30px, -30px) scale(1.1); }
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
                        margin-bottom: 60px;
                    }

                    .header-badge {
                        display: inline-flex;
                        align-items: center;
                        gap: 10px;
                        padding: 8px 24px 8px 18px;
                        background: rgba(73, 185, 109, 0.08);
                        border: 1px solid rgba(73, 185, 109, 0.12);
                        border-radius: 50px;
                        font-size: 13px;
                        font-weight: 600;
                        color: var(--main-color);
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        margin-bottom: 24px;
                    }

                    .badge-dot {
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: var(--main-color);
                        animation: pulse-dot 2s ease-in-out infinite;
                    }

                    @keyframes pulse-dot {
                        0%, 100% { opacity: 1; transform: scale(1); }
                        50% { opacity: 0.3; transform: scale(0.7); }
                    }

                    .section-title {
                        font-size: 42px;
                        font-weight: 800;
                        color: var(--black-color);
                        line-height: 1.15;
                        margin-bottom: 20px;
                    }

  
                    .section-divider {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 16px;
                        margin-bottom: 24px;
                    }

                    .divider-line {
                        width: 60px;
                        height: 3px;
                        border-radius: 2px;
                        background: var(--gradient-main);
                    }

                    .divider-icon {
                        font-size: 12px;
                        color: var(--main-color);
                        opacity: 0.3;
                    }

                    .section-description {
                        font-size: 17px;
                        color: var(--paragraph-color);
                        max-width: 750px;
                        margin: 0 auto;
                        line-height: 1.8;
                        font-weight: 400;
                    }

                    .section-description strong {
                        color: var(--main-color);
                        font-weight: 700;
                    }

                    /* ====== GRILLE ====== */
                    .partners-grid {
                        display: grid;
                        grid-template-columns: repeat(6, 1fr);
                        gap: 20px;
                        margin-bottom: 60px;
                    }

                    .partner-card {
                        background: var(--white-color);
                        border-radius: 16px;
                        border: 1px solid rgba(0, 0, 0, 0.04);
                        padding: 16px;
                        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.02);
                        position: relative;
                    }

                    .partner-card::before {
                        content: '';
                        position: absolute;
                        inset: -1px;
                        border-radius: 16px;
                        background: var(--gradient-main);
                        opacity: 0;
                        transition: opacity 0.4s ease;
                        z-index: -1;
                    }

                    .partner-card:hover {
                        transform: translateY(-8px);
                        border-color: transparent;
                        box-shadow: 0 20px 60px rgba(73, 185, 109, 0.12);
                    }

                    .partner-card:hover::before {
                        opacity: 1;
                    }

                    .partner-link {
                        text-decoration: none;
                        display: block;
                    }

                    .partner-logo-box {
                        position: relative;
                        height: 80px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: rgba(248, 249, 250, 0.5);
                        border-radius: 12px;
                        margin-bottom: 12px;
                        overflow: hidden;
                        transition: all 0.4s ease;
                    }

                    .partner-card:hover .partner-logo-box {
                        background: rgba(73, 185, 109, 0.04);
                    }

                    .partner-logo {
                        max-width: 100%;
                        max-height: 50px;
                        object-fit: contain;
                        filter: grayscale(30%) brightness(0.95);
                        transition: all 0.5s ease;
                    }

                    .partner-card:hover .partner-logo {
                        filter: grayscale(0%) brightness(1);
                        transform: scale(1.05);
                    }

                    .partner-overlay {
                        position: absolute;
                        inset: 0;
                        background: rgba(10, 14, 39, 0.92);
                        backdrop-filter: blur(8px);
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        opacity: 0;
                        transition: opacity 0.4s ease;
                        padding: 12px;
                        border-radius: 12px;
                    }

                    .partner-card:hover .partner-overlay {
                        opacity: 1;
                    }

                    .overlay-category {
                        font-size: 10px;
                        font-weight: 600;
                        color: var(--main-color);
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }

                    .overlay-name {
                        font-size: 13px;
                        font-weight: 600;
                        color: var(--white-color);
                        margin: 4px 0;
                    }

                    .overlay-link {
                        font-size: 11px;
                        font-weight: 500;
                        color: var(--white-color);
                        border-bottom: 2px solid var(--main-color);
                        padding-bottom: 2px;
                    }

                    .partner-name {
                        font-size: 13px;
                        font-weight: 600;
                        color: var(--black-color);
                        text-align: center;
                        display: block;
                        transition: color 0.3s ease;
                    }

                    .partner-card:hover .partner-name {
                        color: var(--main-color);
                    }

                    /* ====== STATS ====== */
                    .stats-section {
                        margin-bottom: 60px;
                    }

                    .stats-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 40px;
                        padding: 32px 40px;
                        background: linear-gradient(135deg, rgba(10, 14, 39, 0.02), rgba(73, 185, 109, 0.03));
                        border-radius: 20px;
                        border: 1px solid rgba(73, 185, 109, 0.06);
                    }

                    .stat-item {
                        display: flex;
                        align-items: center;
                        gap: 14px;
                    }

                    .stat-icon {
                        width: 44px;
                        height: 44px;
                        border-radius: 12px;
                        background: rgba(73, 185, 109, 0.08);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-shrink: 0;
                    }

                    .stat-icon svg {
                        width: 22px;
                        height: 22px;
                        color: var(--main-color);
                    }

                    .stat-number {
                        font-size: 28px;
                        font-weight: 800;
                        color: var(--main-color);
                        display: block;
                        line-height: 1.2;
                    }

                    .stat-label {
                        font-size: 13px;
                        color: var(--paragraph-color);
                        font-weight: 500;
                        display: block;
                    }

                    .stat-divider {
                        width: 1px;
                        height: 44px;
                        background: rgba(0, 0, 0, 0.06);
                    }

                    /* ====== CTA PARTENAIRE ====== */
                    .cta-partner {
                        background: linear-gradient(135deg, var(--dark-bg), #141b33);
                        border-radius: 24px;
                        padding: 48px 50px;
                        border: 1px solid rgba(255, 255, 255, 0.05);
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
                        position: relative;
                        overflow: hidden;
                    }

                    .cta-partner::before {
                        content: '';
                        position: absolute;
                        inset: 0;
                        background: radial-gradient(circle at 30% 50%, rgba(73, 185, 109, 0.06), transparent 60%);
                    }

                    .cta-partner::after {
                        content: '';
                        position: absolute;
                        inset: 0;
                        background: radial-gradient(circle at 70% 50%, rgba(128, 195, 83, 0.04), transparent 60%);
                    }

                    .cta-partner-content {
                        position: relative;
                        z-index: 1;
                        display: flex;
                        align-items: center;
                        gap: 30px;
                    }

                    .cta-partner-icon {
                        width: 64px;
                        height: 64px;
                        border-radius: 50%;
                        background: rgba(73, 185, 109, 0.12);
                        border: 2px solid rgba(73, 185, 109, 0.15);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-shrink: 0;
                    }

                    .cta-partner-icon svg {
                        width: 30px;
                        height: 30px;
                        color: var(--main-color);
                    }

                    .cta-partner-text {
                        flex: 1;
                    }

                    .cta-partner-text h4 {
                        font-size: 22px;
                        font-weight: 700;
                        color: var(--white-color);
                        margin: 0 0 4px 0;
                    }

                    .cta-partner-text p {
                        font-size: 15px;
                        color: rgba(255, 255, 255, 0.5);
                        margin: 0;
                    }

                    .cta-partner-btn {
                        display: inline-flex;
                        align-items: center;
                        gap: 12px;
                        padding: 14px 34px;
                        background: var(--gradient-main);
                        color: var(--white-color);
                        font-size: 15px;
                        font-weight: 600;
                        border-radius: 50px;
                        text-decoration: none;
                        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        box-shadow: 0 8px 30px rgba(73, 185, 109, 0.3);
                        flex-shrink: 0;
                        position: relative;
                        overflow: hidden;
                    }

                    .cta-partner-btn::before {
                        content: '';
                        position: absolute;
                        inset: 0;
                        background: linear-gradient(135deg, #3a9e5d, #6cb343);
                        opacity: 0;
                        transition: opacity 0.4s ease;
                    }

                    .cta-partner-btn span,
                    .cta-partner-btn .btn-arrow {
                        position: relative;
                        z-index: 1;
                    }

                    .cta-partner-btn:hover {
                        transform: translateY(-3px) scale(1.02);
                        box-shadow: 0 12px 50px rgba(73, 185, 109, 0.4);
                        color: var(--white-color);
                    }

                    .cta-partner-btn:hover::before {
                        opacity: 1;
                    }

                    .btn-arrow {
                        width: 20px;
                        height: 20px;
                        transition: transform 0.3s ease;
                        position: relative;
                        z-index: 1;
                    }

                    .cta-partner-btn:hover .btn-arrow {
                        transform: translateX(6px);
                    }

                    /* ====== RESPONSIVE ====== */
                    @media (max-width: 1200px) {
                        .partners-grid {
                            grid-template-columns: repeat(4, 1fr);
                        }
                    }

                    @media (max-width: 992px) {
                        .partners-grid {
                            grid-template-columns: repeat(3, 1fr);
                        }

                        .section-title {
                            font-size: 36px;
                        }

                        .cta-partner-content {
                            flex-wrap: wrap;
                            justify-content: center;
                            text-align: center;
                        }

                        .cta-partner-text {
                            flex: 1 1 100%;
                        }

                        .cta-partner-btn {
                            width: 100%;
                            justify-content: center;
                        }

                        .stats-container {
                            flex-wrap: wrap;
                            gap: 20px;
                            padding: 24px;
                        }

                        .stat-divider {
                            display: none;
                        }
                    }

                    @media (max-width: 768px) {
                        .partners-section {
                            padding: 60px 0 40px;
                        }

                        .container {
                            padding: 0 20px;
                        }

                        .section-title {
                            font-size: 30px;
                        }

                        .section-description {
                            font-size: 15px;
                        }

                        .partners-grid {
                            grid-template-columns: repeat(2, 1fr);
                            gap: 16px;
                        }

                        .partner-card {
                            padding: 12px;
                        }

                        .partner-logo-box {
                            height: 60px;
                        }

                        .partner-logo {
                            max-height: 36px;
                        }

                        .partner-name {
                            font-size: 11px;
                        }

                        .partner-overlay {
                            display: none;
                        }

                        .cta-partner {
                            padding: 30px 24px;
                        }

                        .cta-partner-text h4 {
                            font-size: 20px;
                        }

                        .cta-partner-text p {
                            font-size: 14px;
                        }

                        .cta-partner-icon {
                            width: 52px;
                            height: 52px;
                        }

                        .cta-partner-icon svg {
                            width: 24px;
                            height: 24px;
                        }

                        .stat-item {
                            flex-direction: column;
                            text-align: center;
                            gap: 6px;
                        }

                        .stat-number {
                            font-size: 24px;
                        }
                    }

                    @media (max-width: 480px) {
                        .partners-grid {
                            grid-template-columns: repeat(2, 1fr);
                            gap: 12px;
                        }

                        .partner-card {
                            padding: 10px 8px;
                            border-radius: 12px;
                        }

                        .partner-logo-box {
                            height: 50px;
                            border-radius: 8px;
                            margin-bottom: 8px;
                        }

                        .partner-logo {
                            max-height: 30px;
                        }

                        .partner-name {
                            font-size: 10px;
                        }

                        .section-title {
                            font-size: 26px;
                        }

                        .cta-partner-btn {
                            font-size: 14px;
                            padding: 12px 24px;
                        }

                        .cta-partner-text h4 {
                            font-size: 18px;
                        }

                        .stats-container {
                            padding: 16px;
                            gap: 12px;
                        }

                        .stat-number {
                            font-size: 20px;
                        }

                        .stat-label {
                            font-size: 11px;
                        }
                    }
                `}</style>
            </section>
        );
    }
}

export default PartnerContent;