// pages/contact.js
import React, { Component } from 'react';
import SEO from '../components/SEO';
import Link from 'next/link';
import Navbar from '../components/Layouts/Navbar';
import PageBannerContent from '../components/Common/PageBannerContent';
import ContactContent from '../components/Contact/ContactContent';
import Footer from '../components/Layouts/Footer';

class Contact extends Component {
    render() {
        return (
            <>
                <SEO
                    title="Contact et demande de devis"
                    description="Contactez ICS GROUPE pour un devis en cybersécurité, énergie solaire, développement web ou réseaux. Basés à N'Djamena, nous intervenons au Tchad, en France et à distance partout dans le monde."
                    path="/contact"
                />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ContactPage",
                            "name": "Contactez ICS GROUPE",
                            "description": "Contactez notre équipe pour vos projets en cybersécurité, énergies renouvelables et développement web.",
                            "url": "https://icsolution.fr/contact",
                            "mainEntity": {
                                "@type": "Organization",
                                "name": "ICS GROUPE",
                                "url": "https://icsolution.fr",
                                "contactPoint": {
                                    "@type": "ContactPoint",
                                    "telephone": "+235-XX-XX-XX-XX",
                                    "contactType": "Commercial",
                                    "availableLanguage": ["French", "Arabic"],
                                    "email": "contact@icsolution.fr"
                                },
                                "address": {
                                    "@type": "PostalAddress",
                                    "addressLocality": "N'Djamena",
                                    "addressCountry": "Tchad"
                                }
                            }
                        })
                    }}
                />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://icsolution.fr" },
                                { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://icsolution.fr/contact" }
                            ]
                        })
                    }}
                />

                <Navbar />

                <PageBannerContent 
                    pageTitle="Contactez-nous" 
                    pageCaption="Besoin d'un devis, d'un conseil ou d'informations ? Nous sommes à votre écoute." 
                />

                <ContactContent />

                <section className="cta-section">
                    <div className="container">
                        <div className="cta-content">
                            <span className="cta-tag">🚀 Prêt à démarrer</span>
                            <h2 className="cta-title">Vous avez un projet ?</h2>
                            <p className="cta-text">
                                Installation solaire, audit cybersécurité, site web ou formation — 
                                notre équipe vous répond dans les plus brefs délais.
                            </p>
                            <Link href="/contact">
                                <span className="cta-btn">
                                    <span className="cta-btn-content">
                                        Envoyer un message
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </span>
                                </span>
                            </Link>
                        </div>
                    </div>
                </section>

                <Footer />

                <style jsx>{`
                    .cta-section {
                        padding: 80px 0;
                        background: linear-gradient(145deg, #0A0A2E 0%, #0D2B1A 50%, #1B5E20 100%);
                    }

                    .container {
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 0 24px;
                    }

                    .cta-content {
                        text-align: center;
                        max-width: 700px;
                        margin: 0 auto;
                    }

                    .cta-tag {
                        display: inline-block;
                        font-size: 13px;
                        font-weight: 600;
                        color: #4CAF50;
                        background: rgba(76, 175, 80, 0.12);
                        padding: 4px 16px;
                        border-radius: 50px;
                        letter-spacing: 0.5px;
                        margin-bottom: 12px;
                    }

                    .cta-title {
                        font-size: clamp(28px, 4vw, 40px);
                        font-weight: 700;
                        color: #ffffff;
                        margin-bottom: 12px;
                    }

                    .cta-text {
                        font-size: 16px;
                        color: rgba(255, 255, 255, 0.6);
                        max-width: 500px;
                        margin: 0 auto 32px;
                        line-height: 1.7;
                    }

                    .cta-btn {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        padding: 14px 40px;
                        background: linear-gradient(135deg, #1B5E20, #4CAF50);
                        border-radius: 60px;
                        font-size: 16px;
                        font-weight: 700;
                        color: #fff;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 30px rgba(27, 94, 32, 0.3);
                    }

                    .cta-btn:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 12px 50px rgba(27, 94, 32, 0.4);
                    }

                    .cta-btn-content {
                        display: inline-flex;
                        align-items: center;
                        gap: 10px;
                    }

                    .cta-btn-content svg {
                        transition: transform 0.3s ease;
                    }

                    .cta-btn:hover .cta-btn-content svg {
                        transform: translateX(4px);
                    }

                    @media (max-width: 768px) {
                        .cta-section {
                            padding: 60px 0;
                        }

                        .cta-title {
                            font-size: 24px;
                        }

                        .cta-text {
                            font-size: 14px;
                            padding: 0 16px;
                        }

                        .cta-btn {
                            width: 100%;
                            justify-content: center;
                            padding: 12px 24px;
                            font-size: 14px;
                        }
                    }
                `}</style>
            </>
        );
    }
}

export default Contact;