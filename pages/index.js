// pages/index.js
import React, { Component } from 'react';
import SEO from '../components/SEO';
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
import AccountCreateArea from '../components/Common/AccountCreateArea';
import BlogCard from '../components/Common/BlogCard';
import Footer from '../components/Layouts/Footer';
import Rates from '../components/Rates/Rates';
import PortfolioContent from '../components/portfolio/PortfolioContent';

class Index extends Component {
    render() {
        return (
            <>
                <SEO
                    home
                    title="ICS GROUPE | Cybersécurité, énergie solaire et digital — Tchad, France, international"
                    description="ICS GROUPE accompagne entreprises et institutions au Tchad, en France et à l'international : cybersécurité, énergies renouvelables, développement web et transformation digitale."
                    keywords="ICS GROUPE, cybersécurité Tchad, cybersécurité France, énergie solaire N'Djamena, développement web Afrique, transformation digitale, audit sécurité informatique"
                    path="/"
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

                {/* À propos / atouts */}
                <OurFeaturesContent />
                <EasyPaymentBorrow />

                {/* Chiffres clés */}
                <FunFacts />

                {/* Réalisations */}
                <section aria-labelledby="portfolio-title">
                    <h2 id="portfolio-title" className="sr-only">Nos réalisations</h2>
                    <PortfolioContent limit={6} />
                    <div className="portfolio-cta">
                        <Link href="/portfolio">
                            <a className="btn-outline">
                                Voir tout notre portfolio
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </a>
                        </Link>
                    </div>
                </section>

                {/* Témoignages (masqués s'il n'y en a pas) */}
                <CustomersFeedback />

                {/* Partenaires */}
                <PartnerContent />

                {/* Appel à l'action unique */}
                <AccountCreateArea />

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
                        text-align: center;
                        padding: 8px 0 64px;
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
                        gap: 10px;
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