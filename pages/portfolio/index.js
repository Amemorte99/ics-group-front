// pages/portfolio/index.js
import React, { useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Layouts/Navbar';
import Footer from '../../components/Layouts/Footer';
import PortfolioContent from '../../components/portfolio/PortfolioContent';

const PortfolioPage = () => {
  useEffect(() => {
    // Animation au scroll
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        if (isVisible) {
          el.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Vérifier au chargement

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Notre Portfolio | ICS GROUPE - Réalisations & Projets</title>
        <meta 
          name="description" 
          content="Découvrez le portfolio d'ICS GROUPE : nos réalisations en cybersécurité, énergies renouvelables, développement web et transformation digitale au Tchad et en Afrique." 
        />
        <meta 
          name="keywords" 
          content="portfolio, réalisations, projets, cybersécurité, énergie, web, Tchad, Afrique" 
        />
        <meta property="og:title" content="Notre Portfolio | ICS GROUPE" />
        <meta property="og:description" content="Découvrez nos réalisations et projets innovants" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://icsolution.fr/portfolio" />
      </Head>

      <Navbar />

      {/* Hero Section Premium */}
      <section className="portfolio-hero-premium">
        <div className="hero-background">
          <div className="hero-pattern"></div>
          <div className="hero-gradient"></div>
        </div>
        
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge animate-on-scroll">
              <span className="badge-dot"></span>
              <span className="badge-text">Notre excellence en images</span>
            </div>
            
            <h1 className="hero-title animate-on-scroll">
              <span className="title-line">Nos</span>
              <span className="title-highlight">réalisations</span>
            </h1>
            
            <p className="hero-subtitle animate-on-scroll">
              Chaque projet raconte une histoire de passion, d&apos;expertise et d&apos;innovation.
              Découvrez comment nous accompagnons nos clients vers la réussite.
            </p>

            <div className="hero-stats animate-on-scroll">
              <div className="stat-item">
                <span className="stat-number" data-count="150">150+</span>
                <span className="stat-label">Projets réalisés</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number" data-count="98">98%</span>
                <span className="stat-label">Taux de satisfaction</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number" data-count="12">12 ans</span>
                <span className="stat-label">D&apos;expérience</span>
              </div>
            </div>

            <div className="hero-cta animate-on-scroll">
              <a href="#portfolio-grid" className="btn-primary">
                Voir nos projets
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="/contact" className="btn-secondary">
                Discuter de votre projet
              </a>
            </div>
          </div>

          {/* Floating shapes */}
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>
      </section>

      {/* Portfolio Content */}
      <div id="portfolio-grid">
        <PortfolioContent />
      </div>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <span className="cta-badge">💡 Vous avez un projet ?</span>
              <h2>Prêt à donner vie à votre idée ?</h2>
              <p>Contactez-nous dès aujourd'hui pour discuter de votre projet et découvrir comment nous pouvons vous accompagner vers la réussite.</p>
            </div>
            <div className="cta-buttons">
              <a href="/contact" className="btn-primary">
                Démarrer un projet
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="/services" className="btn-secondary">
                Nos services
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        /* ===== HERO PREMIUM ===== */
        .portfolio-hero-premium {
          position: relative;
          padding: 120px 0 80px;
          background: linear-gradient(135deg, #0A0A2E 0%, #0D2B1A 40%, #1B5E20 100%);
          overflow: hidden;
          min-height: 600px;
          display: flex;
          align-items: center;
        }

        .hero-background {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .hero-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(76, 175, 80, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(27, 94, 32, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 50% 80%, rgba(76, 175, 80, 0.08) 0%, transparent 40%);
          background-size: 100% 100%;
        }

        .hero-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 70% 30%, rgba(76, 175, 80, 0.15), transparent 60%);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 2;
        }

        .hero-content {
          max-width: 700px;
        }

        /* Badge */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(12px);
          padding: 6px 16px 6px 12px;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 24px;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4CAF50;
          animation: pulseDot 2s ease-in-out infinite;
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }

        .badge-text {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          letter-spacing: 0.5px;
        }

        /* Titre */
        .hero-title {
          font-size: clamp(40px, 5.5vw, 64px);
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 20px;
        }

        .title-line {
          color: #fff;
          display: block;
        }

        .title-highlight {
          background: linear-gradient(135deg, #4CAF50, #A5D6A7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Sous-titre */
        .hero-subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.7;
          max-width: 500px;
          margin-bottom: 36px;
        }

        /* Stats */
        .hero-stats {
          display: flex;
          align-items: center;
          gap: 32px;
          margin-bottom: 40px;
          padding: 20px 28px;
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(12px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          max-width: 500px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
        }

        .stat-label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 400;
        }

        .stat-divider {
          width: 1px;
          height: 30px;
          background: rgba(255, 255, 255, 0.1);
        }

        /* CTA Buttons */
        .hero-cta {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          border-radius: 60px;
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, #1B5E20, #4CAF50);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(27, 94, 32, 0.3);
        }

        .btn-primary svg {
          transition: transform 0.3s ease;
        }

        .btn-primary:hover svg {
          transform: translateX(4px);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          padding: 14px 32px;
          border-radius: 60px;
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
        }

        /* Floating Shapes */
        .floating-shapes {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.06;
        }

        .shape-1 {
          width: 400px;
          height: 400px;
          background: #4CAF50;
          top: -100px;
          right: -50px;
          animation: floatShape 25s ease-in-out infinite;
        }

        .shape-2 {
          width: 200px;
          height: 200px;
          background: #1B5E20;
          bottom: 50px;
          left: 10%;
          animation: floatShape 20s ease-in-out infinite reverse;
        }

        .shape-3 {
          width: 150px;
          height: 150px;
          background: #A5D6A7;
          top: 40%;
          right: 20%;
          animation: floatShape 30s ease-in-out infinite;
        }

        .shape-4 {
          width: 80px;
          height: 80px;
          background: #4CAF50;
          bottom: 30%;
          left: 40%;
          animation: floatShape 18s ease-in-out infinite reverse;
        }

        @keyframes floatShape {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(40px, -30px) scale(1.05); }
          50% { transform: translate(-20px, 40px) scale(0.95); }
          75% { transform: translate(30px, 20px) scale(1.02); }
        }

        /* ===== CTA SECTION ===== */
        .cta-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #0A0A2E 0%, #0D2B1A 50%, #1B5E20 100%);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .cta-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .cta-text {
          flex: 1;
        }

        .cta-badge {
          display: inline-block;
          font-size: 13px;
          font-weight: 500;
          color: #4CAF50;
          background: rgba(76, 175, 80, 0.12);
          padding: 4px 16px;
          border-radius: 50px;
          margin-bottom: 12px;
        }

        .cta-text h2 {
          font-size: clamp(28px, 3.5vw, 40px);
          font-weight: 700;
          color: #fff;
          margin-bottom: 12px;
        }

        .cta-text p {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.6);
          max-width: 500px;
          line-height: 1.7;
        }

        .cta-buttons {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          flex-shrink: 0;
        }

        /* ===== ANIMATIONS ===== */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .animate-on-scroll:nth-child(2) { transition-delay: 0.1s; }
        .animate-on-scroll:nth-child(3) { transition-delay: 0.2s; }
        .animate-on-scroll:nth-child(4) { transition-delay: 0.3s; }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 992px) {
          .portfolio-hero-premium {
            padding: 100px 0 60px;
            min-height: auto;
          }

          .hero-stats {
            padding: 16px 20px;
            gap: 20px;
          }

          .stat-number {
            font-size: 22px;
          }

          .cta-content {
            flex-direction: column;
            text-align: center;
          }

          .cta-text p {
            max-width: 100%;
          }

          .cta-buttons {
            justify-content: center;
          }
        }

        @media (max-width: 640px) {
          .portfolio-hero-premium {
            padding: 80px 0 40px;
          }

          .hero-title {
            font-size: 32px;
          }

          .hero-subtitle {
            font-size: 16px;
          }

          .hero-stats {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
            padding: 16px;
          }

          .stat-divider {
            display: none;
          }

          .hero-cta {
            flex-direction: column;
            width: 100%;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
            justify-content: center;
          }

          .cta-buttons {
            flex-direction: column;
            width: 100%;
          }

          .cta-buttons .btn-primary,
          .cta-buttons .btn-secondary {
            width: 100%;
            justify-content: center;
          }

          .floating-shapes {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default PortfolioPage;