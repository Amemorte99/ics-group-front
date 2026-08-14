// pages/index.js
import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Layouts/Navbar';
import MainBanner from '../components/HomeOne/MainBanner';
import FeaturedCard from '../components/HomeOne/FeaturedCard';
import ServicesCard from '../components/Common/ServicesCard';
import ComparisonsTable from '../components/Common/ComparisonsTable';
import OurFeaturesContent from '../components/Common/OurFeaturesContent';
import EasyPaymentBorrow from '../components/Common/EasyPaymentBorrow';
import FunFacts from '../components/HomeOne/FunFacts';
import CustomersFeedback from '../components/Common/CustomersFeedback';
import PartnerContent from '../components/Common/PartnerContent';
import AppDownloadContent from '../components/HomeOne/AppDownloadContent';
import AccountCreateArea from '../components/Common/AccountCreateArea';
import BlogCard from '../components/Common/BlogCard';
import Footer from '../components/Layouts/Footer';
import Rates from '../components/Rates/Rates';
import PortfolioContent from '../components/portfolio/PortfolioContent';

class Index extends Component {
    render() {
        return (
            <>
                {/* ============================================
                    HEAD - META TAGS OPTIMISÉS SEO
                    ============================================ */}
                <Head>
                    {/* Titre principal avec mots-clés stratégiques */}
                    <title>ICS GROUPE | Cybersécurité, Énergie Solaire & Digital au Tchad</title>
                    
                    {/* Meta description avec CTA et mots-clés */}
                    <meta 
                        name="description" 
                        content="ICS GROUPE : Expert en cybersécurité, énergies renouvelables et développement web au Tchad et en Afrique. +150 projets réalisés, 98% de satisfaction. Contactez-nous !" 
                    />
                    
                    {/* Mots-clés secondaires */}
                    <meta 
                        name="keywords" 
                        content="ICS GROUPE, cybersécurité Tchad, énergie solaire N'Djamena, développement web Afrique, transformation digitale, sécurité informatique, agence digitale" 
                    />
                    
                    {/* Open Graph / Facebook / LinkedIn */}
                    <meta property="og:title" content="ICS GROUPE - Expert en Cybersécurité, Énergie & Digital en Afrique" />
                    <meta property="og:description" content="ICS GROUPE accompagne les entreprises et institutions au Tchad et en Afrique dans leur transformation digitale, cybersécurité et énergies renouvelables." />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://icsolution.fr" />
                    <meta property="og:image" content="https://icsolution.fr/images/og-home.jpg" />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                    <meta property="og:locale" content="fr_FR" />
                    <meta property="og:site_name" content="ICS GROUPE" />
                    <meta property="og:image:alt" content="ICS GROUPE - Solutions cybersécurité, énergie et digital en Afrique" />
                    
                    {/* Twitter Cards */}
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="ICS GROUPE - Expert en Cybersécurité, Énergie & Digital" />
                    <meta name="twitter:description" content="ICS GROUPE accompagne les entreprises au Tchad et en Afrique dans leur transformation digitale." />
                    <meta name="twitter:image" content="https://icsolution.fr/images/og-home.jpg" />
                    <meta name="twitter:site" content="@ics_groupe" />
                    
                    {/* Canonical URL */}
                    <link rel="canonical" href="https://icsolution.fr" />
                    
                    {/* ✅ CORRECTION : hrefLang au lieu de hreflang */}
                    <link rel="alternate" href="https://icsolution.fr" hrefLang="fr" />
                    <link rel="alternate" href="https://icsolution.fr/en" hrefLang="en" />
                    
                    {/* Indexation */}
                    <meta name="robots" content="index, follow" />
                    
                    {/* Author et Publisher */}
                    <meta name="author" content="ICS GROUPE" />
                    <meta name="publisher" content="ICS GROUPE" />
                    
                    {/* Vérification Google Search Console (à remplacer par votre code) */}
                    <meta name="google-site-verification" content="VOTRE_CODE_VERIFICATION" />
                    
                    {/* Référencement mobile */}
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    
                    {/* Thème couleur */}
                    <meta name="theme-color" content="#1B5E20" />
                </Head>

                {/* ============================================
                    SCHEMA.ORG - ORGANISATION
                    ============================================ */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "ICS GROUPE",
                            "url": "https://icsolution.fr",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://icsolution.fr/images/logo.png",
                                "width": 200,
                                "height": 60
                            },
                            "description": "ICS GROUPE est une entreprise spécialisée en cybersécurité, énergies renouvelables et transformation digitale au Tchad et en Afrique.",
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "N'Djamena",
                                "addressCountry": "Tchad",
                                "addressRegion": "N'Djamena"
                            },
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "telephone": "+235-XX-XX-XX-XX",
                                "contactType": "Commercial",
                                "availableLanguage": ["French", "Arabic"]
                            },
                            "sameAs": [
                                "https://www.linkedin.com/company/ics-groupe",
                                "https://twitter.com/ics_groupe",
                                "https://www.facebook.com/icsgroupe",
                                "https://www.youtube.com/c/icsgroupe",
                                "https://www.instagram.com/ics_groupe"
                            ],
                            "foundingDate": "2014",
                            "numberOfEmployees": {
                                "@type": "QuantitativeValue",
                                "value": "25"
                            },
                            "hasOfferCatalog": {
                                "@type": "OfferCatalog",
                                "name": "Services ICS GROUPE",
                                "itemListElement": [
                                    {
                                        "@type": "Offer",
                                        "itemOffered": {
                                            "@type": "Service",
                                            "name": "Cybersécurité",
                                            "description": "Audit, protection des données et infrastructures critiques",
                                            "url": "https://icsolution.fr/services/cybersecurite"
                                        }
                                    },
                                    {
                                        "@type": "Offer",
                                        "itemOffered": {
                                            "@type": "Service",
                                            "name": "Énergies Renouvelables",
                                            "description": "Solutions solaires et énergies durables",
                                            "url": "https://icsolution.fr/services/energie"
                                        }
                                    },
                                    {
                                        "@type": "Offer",
                                        "itemOffered": {
                                            "@type": "Service",
                                            "name": "Développement Web",
                                            "description": "Sites vitrines, e-commerce et applications web",
                                            "url": "https://icsolution.fr/services/web"
                                        }
                                    }
                                ]
                            }
                        })
                    }}
                />

                {/* ============================================
                    SCHEMA.ORG - WEBSITE
                    ============================================ */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            "url": "https://icsolution.fr",
                            "name": "ICS GROUPE",
                            "description": "Solutions en cybersécurité, énergie et digital en Afrique",
                            "potentialAction": {
                                "@type": "SearchAction",
                                "target": {
                                    "@type": "EntryPoint",
                                    "urlTemplate": "https://icsolution.fr/search?q={search_term_string}"
                                },
                                "query-input": "required name=search_term_string"
                            },
                            "inLanguage": "fr"
                        })
                    }}
                />

                {/* ============================================
                    SCHEMA.ORG - BREADCRUMB
                    ============================================ */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Accueil",
                                    "item": "https://icsolution.fr"
                                }
                            ]
                        })
                    }}
                />

                {/* ============================================
                    CONTENU DE LA PAGE
                    ============================================ */}
                <Navbar />

                {/* La section MainBanner contient déjà son propre H1 */}
                <MainBanner />

                {/* Section des services en vedette */}
                <section aria-labelledby="featured-services-title">
                    <h2 id="featured-services-title" className="sr-only">Nos services en vedette</h2>
                    <FeaturedCard limit={4} />
                </section>

                {/* Section des services */}
                <section aria-labelledby="services-title">
                    <h2 id="services-title" className="sr-only">Nos services ICS GROUPE</h2>
                    <ServicesCard />
                </section>

                {/* Tableau comparatif (commenté par défaut) */}
                {/* <ComparisonsTable /> */}

                {/* Fonctionnalités */}
                <OurFeaturesContent />

                {/* Paiement facile */}
                <EasyPaymentBorrow />

                {/* Chiffres clés */}
                <FunFacts />

                {/* Témoignages clients */}
                <CustomersFeedback />

                {/* Partenaires */}
                <PartnerContent />

                {/* Téléchargement application */}
                <AppDownloadContent />

                {/* Création de compte */}
                <AccountCreateArea />

                {/* ============================================
                    SECTION PORTFOLIO AVEC BOUTON CORRIGÉ
                    ============================================ */}
                <section aria-labelledby="portfolio-title">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-tag">Nos réalisations</span>
                            <h2 id="portfolio-title" className="section-title">Découvrez nos projets</h2>
                            <p className="section-subtitle">
                                +150 projets réalisés en cybersécurité, énergie solaire et développement digital
                            </p>
                            <div className="portfolio-cta">
                                {/* ✅ CORRECTION : Un seul enfant dans <Link> */}
                                <Link href="/portfolio">
                                    <span className="btn-outline">
                                        <span className="btn-content">
                                            Voir tout notre portfolio
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <PortfolioContent limit={6} />
                </section>

                <Footer />

                {/* ============================================
                    STYLES CSS
                    ============================================ */}
                <style jsx>{`
                    /* ============================================
                       CONTAINER
                    ============================================ */
                    .container {
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 0 24px;
                    }

                    /* ============================================
                       SECTION HEADER
                    ============================================ */
                    .section-header {
                        text-align: center;
                        padding: 40px 0 20px;
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
                        font-size: clamp(28px, 4vw, 40px);
                        font-weight: 700;
                        color: #0A0A2E;
                        margin-bottom: 12px;
                    }

                    .section-subtitle {
                        font-size: 16px;
                        color: #6b7280;
                        max-width: 600px;
                        margin: 0 auto 24px;
                    }

                    /* ============================================
                       PORTFOLIO CTA
                    ============================================ */
                    .portfolio-cta {
                        margin-top: 16px;
                    }

                    .btn-outline {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        padding: 12px 32px;
                        border-radius: 60px;
                        font-size: 15px;
                        font-weight: 600;
                        color: #1B5E20;
                        background: transparent;
                        border: 2px solid #4CAF50;
                        cursor: pointer;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        text-decoration: none;
                    }

                    .btn-outline:hover {
                        background: #4CAF50;
                        color: #fff;
                        transform: translateY(-3px);
                        box-shadow: 0 8px 30px rgba(76, 175, 80, 0.25);
                    }

                    .btn-content {
                        display: inline-flex;
                        align-items: center;
                        gap: 10px;
                    }

                    .btn-content svg {
                        transition: transform 0.3s ease;
                    }

                    .btn-outline:hover .btn-content svg {
                        transform: translateX(4px);
                    }

                    /* ============================================
                       SR-ONLY - Accessibilité
                    ============================================ */
                    .sr-only {
                        position: absolute !important;
                        width: 1px !important;
                        height: 1px !important;
                        padding: 0 !important;
                        margin: -1px !important;
                        overflow: hidden !important;
                        clip: rect(0, 0, 0, 0) !important;
                        border: 0 !important;
                    }

                    /* ============================================
                       RESPONSIVE
                    ============================================ */
                    @media (max-width: 768px) {
                        .section-header {
                            padding: 30px 0 10px;
                        }

                        .section-title {
                            font-size: 24px;
                        }

                        .section-subtitle {
                            font-size: 14px;
                            padding: 0 16px;
                        }

                        .btn-outline {
                            padding: 10px 24px;
                            font-size: 14px;
                            width: 100%;
                            justify-content: center;
                        }

                        .portfolio-cta {
                            width: 100%;
                            padding: 0 16px;
                        }
                    }
                `}</style>
            </>
        );
    }
}

export default Index;