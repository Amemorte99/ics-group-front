// components/Contact/ContactInfoContent.js
import React, { Component } from 'react';

class ContactInfoContent extends Component {
    render() {
        return (
            <>
                {/* ============================================
                    SCHEMA.ORG - LOCAL BUSINESS
                    ============================================ */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "LocalBusiness",
                            "name": "ICS GROUPE",
                            "description": "Expert en cybersécurité, énergies renouvelables et développement web au Tchad et en Afrique",
                            "url": "https://icsolution.fr",
                            "telephone": "+23564788831",
                            "email": "info@icsgroupe.com",
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "Rue de Corniche, Sabangali",
                                "addressLocality": "N'Djamena",
                                "addressCountry": "Tchad"
                            },
                            "openingHours": "Mo-Fr 08:00-17:00",
                            "priceRange": "$$",
                            "sameAs": [
                                "https://www.linkedin.com/company/ics-groupe",
                                "https://twitter.com/ics_groupe",
                                "https://www.facebook.com/icsgroupe"
                            ]
                        })
                    }}
                />

                <div className="contact-info-wrapper">
                    {/* En-tête */}
                    <div className="info-header">
                        <span className="info-badge">📌 Coordonnées</span>
                        <h3 className="info-title">Nos informations de contact</h3>
                        <p className="info-subtitle">
                            N'hésitez pas à nous contacter par téléphone, email ou à nous rendre visite.
                        </p>
                    </div>

                    {/* Liste des contacts */}
                    <ul className="info-list">
                        <li className="info-item">
                            <div className="info-icon">📍</div>
                            <div className="info-content">
                                <span className="info-label">Adresse</span>
                                <p className="info-text">
                                    Rue de Corniche, Sabangali<br />
                                    N'Djamena, Tchad
                                </p>
                                <a 
                                    href="https://maps.google.com/maps?q=Rue+de+Corniche+Sabangali+N'Djamena+Tchad" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="info-map-link"
                                >
                                    Voir sur Google Maps →
                                </a>
                            </div>
                        </li>

                        <li className="info-item">
                            <div className="info-icon">📧</div>
                            <div className="info-content">
                                <span className="info-label">Email</span>
                                <a href="mailto:info@icsgroupe.com" className="info-link">
                                    info@icsgroupe.com
                                </a>
                                <span className="info-hint">Réponse sous 24h</span>
                            </div>
                        </li>

                        <li className="info-item">
                            <div className="info-icon">📞</div>
                            <div className="info-content">
                                <span className="info-label">Téléphone</span>
                                <a href="tel:+23564788831" className="info-link">
                                    +235 64 78 88 31
                                </a>
                                <span className="info-hint">Lun-Ven, 8h-17h</span>
                            </div>
                        </li>

                        <li className="info-item">
                            <div className="info-icon">🌐</div>
                            <div className="info-content">
                                <span className="info-label">Site web</span>
                                <a 
                                    href="https://www.icsgroupe.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="info-link"
                                >
                                    www.icsgroupe.com
                                </a>
                            </div>
                        </li>
                    </ul>

                    {/* Réseaux sociaux */}
                    <div className="social-section">
                        <span className="social-label">Suivez-nous</span>
                        <div className="social-links">
                            <a href="#" className="social-link linkedin">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                            <a href="#" className="social-link twitter">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </a>
                            <a href="#" className="social-link facebook">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a href="#" className="social-link youtube">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    .contact-info-wrapper {
                        background: #ffffff;
                        border-radius: 20px;
                        padding: 32px 28px;
                        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
                        border: 1px solid #f0f2f5;
                    }

                    /* ====== HEADER ====== */
                    .info-header {
                        margin-bottom: 24px;
                    }

                    .info-badge {
                        display: inline-block;
                        font-size: 12px;
                        font-weight: 600;
                        color: #4CAF50;
                        background: rgba(76, 175, 80, 0.08);
                        padding: 4px 14px;
                        border-radius: 50px;
                        letter-spacing: 0.5px;
                        margin-bottom: 8px;
                    }

                    .info-title {
                        font-size: 20px;
                        font-weight: 700;
                        color: #0A0A2E;
                        margin: 0 0 4px 0;
                    }

                    .info-subtitle {
                        font-size: 14px;
                        color: #8c8f9c;
                        margin: 0;
                        line-height: 1.6;
                    }

                    /* ====== LISTE ====== */
                    .info-list {
                        list-style: none;
                        padding: 0;
                        margin: 0 0 24px 0;
                        display: flex;
                        flex-direction: column;
                        gap: 14px;
                    }

                    .info-item {
                        display: flex;
                        align-items: flex-start;
                        gap: 14px;
                        padding: 14px 16px;
                        background: #f8fafc;
                        border-radius: 14px;
                        transition: all 0.3s ease;
                        border: 1px solid transparent;
                    }

                    .info-item:hover {
                        background: #ffffff;
                        border-color: rgba(76, 175, 80, 0.15);
                        transform: translateX(4px);
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
                    }

                    .info-icon {
                        font-size: 20px;
                        width: 40px;
                        height: 40px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: rgba(76, 175, 80, 0.08);
                        border-radius: 12px;
                        flex-shrink: 0;
                    }

                    .info-content {
                        flex: 1;
                        min-width: 0;
                    }

                    .info-label {
                        display: block;
                        font-size: 11px;
                        font-weight: 700;
                        color: #b0b8c4;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        margin-bottom: 2px;
                    }

                    .info-text {
                        font-size: 15px;
                        color: #1a1a2e;
                        margin: 0;
                        line-height: 1.6;
                        font-weight: 500;
                    }

                    .info-link {
                        font-size: 15px;
                        color: #1B5E20;
                        text-decoration: none;
                        font-weight: 600;
                        transition: color 0.2s;
                    }

                    .info-link:hover {
                        color: #4CAF50;
                    }

                    .info-hint {
                        display: block;
                        font-size: 12px;
                        color: #b0b8c4;
                        margin-top: 2px;
                    }

                    .info-map-link {
                        display: inline-block;
                        font-size: 12px;
                        font-weight: 600;
                        color: #4CAF50;
                        text-decoration: none;
                        margin-top: 4px;
                        transition: all 0.2s;
                    }

                    .info-map-link:hover {
                        color: #1B5E20;
                        transform: translateX(2px);
                    }

                    /* ====== RÉSEAUX SOCIAUX ====== */
                    .social-section {
                        padding-top: 20px;
                        border-top: 1px solid #f0f2f5;
                        text-align: center;
                    }

                    .social-label {
                        display: block;
                        font-size: 11px;
                        font-weight: 600;
                        color: #b0b8c4;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        margin-bottom: 12px;
                    }

                    .social-links {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                    }

                    .social-link {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        color: #8c8f9c;
                        background: #f8fafc;
                        transition: all 0.3s ease;
                        border: 1px solid #f0f2f5;
                    }

                    .social-link svg {
                        width: 18px;
                        height: 18px;
                    }

                    .social-link:hover {
                        transform: translateY(-3px);
                        border-color: transparent;
                    }

                    .social-link.linkedin:hover {
                        color: #0A66C2;
                        background: rgba(10, 102, 194, 0.08);
                        border-color: rgba(10, 102, 194, 0.2);
                    }

                    .social-link.twitter:hover {
                        color: #1DA1F2;
                        background: rgba(29, 161, 242, 0.08);
                        border-color: rgba(29, 161, 242, 0.2);
                    }

                    .social-link.facebook:hover {
                        color: #1877F2;
                        background: rgba(24, 119, 242, 0.08);
                        border-color: rgba(24, 119, 242, 0.2);
                    }

                    .social-link.youtube:hover {
                        color: #FF0000;
                        background: rgba(255, 0, 0, 0.08);
                        border-color: rgba(255, 0, 0, 0.2);
                    }

                    /* ====== RESPONSIVE ====== */
                    @media (max-width: 768px) {
                        .contact-info-wrapper {
                            padding: 24px 20px;
                        }

                        .info-title {
                            font-size: 18px;
                        }

                        .info-item {
                            padding: 12px 14px;
                            gap: 12px;
                        }

                        .info-icon {
                            width: 36px;
                            height: 36px;
                            font-size: 17px;
                        }

                        .info-text,
                        .info-link {
                            font-size: 14px;
                        }
                    }

                    @media (max-width: 480px) {
                        .contact-info-wrapper {
                            padding: 20px 16px;
                        }

                        .info-title {
                            font-size: 16px;
                        }

                        .info-item {
                            padding: 10px 12px;
                        }

                        .info-icon {
                            width: 32px;
                            height: 32px;
                            font-size: 15px;
                            border-radius: 10px;
                        }

                        .social-link {
                            width: 36px;
                            height: 36px;
                        }

                        .social-link svg {
                            width: 16px;
                            height: 16px;
                        }
                    }
                `}</style>
            </>
        );
    }
}

export default ContactInfoContent;