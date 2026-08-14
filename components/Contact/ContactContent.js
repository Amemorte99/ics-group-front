// components/Contact/ContactContent.js
import React, { Component } from 'react';
import Image from 'next/image';
import ContactInfoContent from './ContactInfoContent';
import ContactForm from './ContactForm';

class ContactContent extends Component {
    render() {
        return (
            <>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "LocalBusiness",
                            "name": "ICS GROUPE",
                            "description": "Expert en cybersécurité, énergies renouvelables et développement web au Tchad et en Afrique",
                            "url": "https://icsolution.fr",
                            "telephone": "+235-XX-XX-XX-XX",
                            "email": "contact@icsolution.fr",
                            "address": {
                                "@type": "PostalAddress",
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

                <section className="contact-section">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-tag">📞 Contact</span>
                            <h2 className="section-title">Parlons de votre projet</h2>
                            <div className="section-bar"></div>
                            <p className="section-desc">
                                Que ce soit pour un projet en <strong>cybersécurité</strong>, 
                                <strong>énergies renouvelables</strong>, <strong>réseaux & télécommunications</strong>, 
                                ou une formation, notre équipe est à votre écoute.
                            </p>
                        </div>

                        <div className="contact-grid">
                            <div className="contact-info-col">
                                <ContactInfoContent />
                            </div>
                            <div className="contact-form-col">
                                <ContactForm />
                            </div>
                        </div>
                    </div>

                    <div className="bg-map">
                        <Image 
                            src="/images/bg-map.png" 
                            alt="Carte de localisation ICS GROUPE - N'Djamena, Tchad"
                            width={800}
                            height={600}
                            loading="lazy"
                        />
                    </div>
                </section>

                <style jsx>{`
                    .contact-section {
                        position: relative;
                        padding: 70px 0;
                        overflow: hidden;
                        background: #fafbfc;
                    }

                    .container {
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 0 24px;
                        position: relative;
                        z-index: 1;
                    }

                    .section-header {
                        text-align: center;
                        margin-bottom: 48px;
                    }

                    .section-tag {
                        display: inline-block;
                        font-size: 13px;
                        font-weight: 600;
                        color: #4CAF50;
                        text-transform: uppercase;
                        letter-spacing: 1.5px;
                        margin-bottom: 8px;
                    }

                    .section-title {
                        font-size: clamp(28px, 3.5vw, 40px);
                        font-weight: 700;
                        color: #0A0A2E;
                        margin-bottom: 12px;
                    }

                    .section-bar {
                        width: 60px;
                        height: 4px;
                        background: linear-gradient(90deg, #4CAF50, #80C353);
                        border-radius: 2px;
                        margin: 0 auto 16px;
                    }

                    .section-desc {
                        font-size: 16px;
                        color: #6b7280;
                        max-width: 700px;
                        margin: 0 auto;
                        line-height: 1.8;
                    }

                    .section-desc strong {
                        color: #1B5E20;
                        font-weight: 600;
                    }

                    .contact-grid {
                        display: grid;
                        grid-template-columns: 5fr 7fr;
                        gap: 40px;
                        align-items: start;
                    }

                    .bg-map {
                        position: absolute;
                        right: -5%;
                        bottom: -5%;
                        width: 40%;
                        height: 60%;
                        opacity: 0.04;
                        z-index: 0;
                        pointer-events: none;
                    }

                    .bg-map img {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                    }

                    @media (max-width: 992px) {
                        .contact-grid {
                            grid-template-columns: 1fr;
                            gap: 30px;
                        }

                        .bg-map {
                            display: none;
                        }
                    }

                    @media (max-width: 768px) {
                        .contact-section {
                            padding: 40px 0;
                        }

                        .section-header {
                            margin-bottom: 32px;
                        }

                        .section-title {
                            font-size: 24px;
                        }

                        .section-desc {
                            font-size: 14px;
                            padding: 0 16px;
                        }
                    }
                `}</style>
            </>
        );
    }
}

export default ContactContent;