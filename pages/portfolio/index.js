// pages/portfolio/index.js
import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Layouts/Navbar';
import Footer from '../../components/Layouts/Footer';
import PortfolioContent from '../../components/portfolio/PortfolioContent';

const PortfolioPage = () => {
  const statsRef = useRef(null);

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

    // Compteur animé
    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-count'));
      if (!target || isNaN(target)) return;
      
      const duration = 2000;
      const start = performance.now();
      
      const updateCounter = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        el.textContent = current + (el.dataset.suffix || '');
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };
      
      requestAnimationFrame(updateCounter);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
              if (!counter.dataset.animated) {
                counter.dataset.animated = 'true';
                animateCounter(counter);
              }
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* ============================================
          HEAD - META TAGS OPTIMISÉS SEO
          ============================================ */}
      <Head>
        {/* Titre principal avec mots-clés forts */}
        <title>Portfolio ICS GROUPE | 150+ Projets en Cybersécurité, Énergie & Web au Tchad</title>
        
        {/* Meta description avec CTA et statistiques */}
        <meta 
          name="description" 
          content="Découvrez le portfolio d'ICS GROUPE : +150 projets réalisés en cybersécurité, énergies renouvelables et développement web au Tchad et en Afrique. Taux de satisfaction 98%." 
        />
        
        {/* Mots-clés secondaires */}
        <meta 
          name="keywords" 
          content="portfolio ICS GROUPE, réalisations cybersécurité Tchad, projets énergie Afrique, développement web N'Djamena, transformation digitale, études de cas, agence digitale Afrique" 
        />
        
        {/* Open Graph / Facebook / LinkedIn */}
        <meta property="og:title" content="Portfolio ICS GROUPE - Nos Réalisations en Afrique" />
        <meta property="og:description" content="Découvrez nos 150+ projets innovants en cybersécurité, énergie et digital au Tchad et en Afrique." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://icsolution.fr/portfolio" />
        <meta property="og:image" content="https://icsolution.fr/images/og-portfolio.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="ICS GROUPE" />
        <meta property="og:image:alt" content="Portfolio ICS GROUPE - Réalisations en Afrique" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio ICS GROUPE - Nos Réalisations en Afrique" />
        <meta name="twitter:description" content="Découvrez nos 150+ projets innovants en cybersécurité, énergie et digital." />
        <meta name="twitter:image" content="https://icsolution.fr/images/og-portfolio.jpg" />
        <meta name="twitter:site" content="@ics_groupe" />
        
        {/* Canonical URL - Évite le contenu dupliqué */}
        <link rel="canonical" href="https://icsolution.fr/portfolio" />
        
        {/* Alternates pour les langues (si multilingue) */}
        <link rel="alternate" href="https://icsolution.fr/portfolio" hreflang="fr" />
        <link rel="alternate" href="https://icsolution.fr/en/portfolio" hreflang="en" />
        
        {/* Indexation */}
        <meta name="robots" content="index, follow" />
        
        {/* Author et Publisher */}
        <meta name="author" content="ICS GROUPE" />
        <meta name="publisher" content="ICS GROUPE" />
        
        {/* Vérification Google Search Console (à remplacer par votre code) */}
        <meta name="google-site-verification" content="VOTRE_CODE_VERIFICATION" />
      </Head>

      {/* ============================================
          SCHEMA.ORG - DONNÉES STRUCTURÉES
          (Ajouter juste après le Head)
          ============================================ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Portfolio ICS GROUPE",
            "description": "Découvrez nos réalisations en cybersécurité, énergie et développement web au Tchad et en Afrique.",
            "url": "https://icsolution.fr/portfolio",
            "inLanguage": "fr",
            "about": {
              "@type": "Organization",
              "name": "ICS GROUPE",
              "url": "https://icsolution.fr",
              "logo": {
                "@type": "ImageObject",
                "url": "https://icsolution.fr/images/logo.png"
              },
              "sameAs": [
                "https://www.linkedin.com/company/ics-groupe",
                "https://twitter.com/ics_groupe",
                "https://www.facebook.com/icsgroupe"
              ],
              "description": "ICS GROUPE est une entreprise spécialisée en cybersécurité, énergies renouvelables et transformation digitale au Tchad et en Afrique.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "N'Djamena",
                "addressCountry": "Tchad"
              }
            },
            "mainEntity": {
              "@type": "ItemList",
              "name": "Projets réalisés par ICS GROUPE",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "url": "https://icsolution.fr/portfolio/cybersecurite-banque",
                  "name": "Cybersécurité - Banque Africaine"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "url": "https://icsolution.fr/portfolio/energie-solaire-ecole",
                  "name": "Énergie solaire - École Tchadienne"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "url": "https://icsolution.fr/portfolio/web-ecommerce",
                  "name": "Site web e-commerce - N'Djamena"
                }
              ]
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Accueil",
                  "item": "https://icsolution.fr"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Portfolio",
                  "item": "https://icsolution.fr/portfolio"
                }
              ]
            }
          })
        }}
      />

      {/* ============================================
          SCHEMA.ORG - SERVICES OFFERTS
          ============================================ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Services numériques et énergétiques",
            "provider": {
              "@type": "Organization",
              "name": "ICS GROUPE",
              "url": "https://icsolution.fr"
            },
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "XAF",
              "availability": "https://schema.org/InStock",
              "description": "Services de cybersécurité, énergies renouvelables, développement web et transformation digitale en Afrique"
            },
            "areaServed": {
              "@type": "Place",
              "name": "Afrique centrale et de l'Ouest"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Catalogue de services ICS GROUPE",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Cybersécurité",
                    "description": "Protection des systèmes d'information et infrastructures critiques"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Énergies renouvelables",
                    "description": "Solutions solaires et énergies durables pour entreprises et collectivités"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Développement Web",
                    "description": "Sites vitrines, e-commerce et applications web sur mesure"
                  }
                }
              ]
            }
          })
        }}
      />

      <Navbar />

      {/* ============================================
          BREADCRUMB - FIL D'ARIANE
          (Ajouter juste après Navbar)
          ============================================ */}
      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <div className="container">
          <ol>
            <li>
              <Link href="/">Accueil</Link>
            </li>
            <li aria-current="page">
              <span>Portfolio</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* ============================================
          HERO CINÉMATIQUE
          ============================================ */}
      <section className="hero-cinematic">
        <div className="hero-background">
          <div className="hero-particles">
            <span className="particle p1"></span>
            <span className="particle p2"></span>
            <span className="particle p3"></span>
            <span className="particle p4"></span>
            <span className="particle p5"></span>
            <span className="particle p6"></span>
          </div>
          <div className="hero-glow g1"></div>
          <div className="hero-glow g2"></div>
          <div className="hero-gradient"></div>
        </div>
        
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge animate-on-scroll">
                <span className="badge-dot"></span>
                <span className="badge-text">Notre excellence en images</span>
                <span className="badge-pulse"></span>
              </div>
              
              {/* H1 optimisé avec mots-clés */}
              <h1 className="hero-title animate-on-scroll">
                <span className="title-line">Nos</span>
                <span className="title-highlight">réalisations en Afrique</span>
              </h1>
              
              {/* Description enrichie avec mots-clés et statistiques */}
              <p className="hero-subtitle animate-on-scroll">
                ICS GROUPE c'est <strong>150+ projets</strong> réalisés en cybersécurité, 
                énergies renouvelables et développement digital au Tchad et en Afrique. 
                Découvrez comment nous accompagnons nos clients vers l'excellence.
              </p>

              <div className="hero-stats animate-on-scroll" ref={statsRef}>
                <div className="stat-item">
                  <span className="stat-number" data-count="150" data-suffix="+">0+</span>
                  <span className="stat-label">
                    <Link href="#portfolio-grid" style={{ color: 'inherit', textDecoration: 'none' }}>
                      Projets réalisés →
                    </Link>
                  </span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-number" data-count="98" data-suffix="%">0%</span>
                  <span className="stat-label">Taux de satisfaction</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-number" data-count="12" data-suffix=" ans">0 ans</span>
                  <span className="stat-label">D&apos;expérience</span>
                </div>
              </div>

              <div className="hero-actions animate-on-scroll">
                <Link href="#portfolio-grid">
                  <span className="btn-primary">
                    Voir nos projets
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
                <Link href="/contact">
                  <span className="btn-secondary">Discuter de votre projet</span>
                </Link>
              </div>
            </div>

            {/* ===== VISUAL ===== */}
            <div className="hero-visual animate-on-scroll">
              <div className="visual-grid">
                <div className="visual-card vc1">
                  <Image 
                    src="/images/icons/cybersecurity.svg" 
                    alt="Cybersécurité - expertise ICS GROUPE" 
                    width={40} 
                    height={40}
                    className="vc-icon"
                  />
                  <span className="vc-label">Cybersécurité</span>
                </div>
                <div className="visual-card vc2">
                  <Image 
                    src="/images/icons/solar.svg" 
                    alt="Énergie solaire - solutions ICS GROUPE" 
                    width={40} 
                    height={40}
                    className="vc-icon"
                  />
                  <span className="vc-label">Énergie</span>
                </div>
                <div className="visual-card vc3">
                  <Image 
                    src="/images/icons/web.svg" 
                    alt="Développement web - agence digitale ICS GROUPE" 
                    width={40} 
                    height={40}
                    className="vc-icon"
                  />
                  <span className="vc-label">Web</span>
                </div>
                <div className="visual-card vc4">
                  <Image 
                    src="/images/icons/mobile.svg" 
                    alt="Applications mobiles - développement ICS GROUPE" 
                    width={40} 
                    height={40}
                    className="vc-icon"
                  />
                  <span className="vc-label">Mobile</span>
                </div>
                <div className="visual-card vc5">
                  <Image 
                    src="/images/icons/cloud.svg" 
                    alt="Solutions cloud - infrastructure ICS GROUPE" 
                    width={40} 
                    height={40}
                    className="vc-icon"
                  />
                  <span className="vc-label">Cloud</span>
                </div>
                <div className="visual-card vc6">
                  <Image 
                    src="/images/icons/data.svg" 
                    alt="Data science - analyse de données ICS GROUPE" 
                    width={40} 
                    height={40}
                    className="vc-icon"
                  />
                  <span className="vc-label">Data</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== WAVE ===== */}
        <div className="hero-wave">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,40 C360,120 720,0 1080,60 C1260,90 1380,60 1440,40 L1440,120 L0,120 Z" fill="#ffffff" opacity="1"/>
          </svg>
        </div>
      </section>

      {/* ============================================
          PORTFOLIO CONTENT
          ============================================ */}
      <div id="portfolio-grid">
        <PortfolioContent />
      </div>

      {/* ============================================
          TESTIMONIALS PREVIEW
          ============================================ */}
      <section className="testimonials-preview">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Ils nous font confiance</span>
            {/* H2 optimisé */}
            <h2 className="section-title">Témoignages de nos clients</h2>
            <p className="section-subtitle">
              Découvrez les retours de nos clients sur nos réalisations en Afrique
            </p>
          </div>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="tc-quote">“</div>
              <p className="tc-text">
                ICS GROUPE a réalisé notre plateforme de cybersécurité avec un professionnalisme exceptionnel.
              </p>
              <div className="tc-author">
                <div className="tc-avatar">JD</div>
                <div>
                  <span className="tc-name">Jean Dupont</span>
                  <span className="tc-role">CTO, Safricom Tchad</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="tc-quote">“</div>
              <p className="tc-text">
                Grâce à ICS, notre site web a été modernisé et notre présence en ligne s&apos;est considérablement améliorée.
              </p>
              <div className="tc-author">
                <div className="tc-avatar">MD</div>
                <div>
                  <span className="tc-name">Marie Diallo</span>
                  <span className="tc-role">Directrice, Energies SA</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="tc-quote">“</div>
              <p className="tc-text">
                Une équipe réactive et compétente qui a su comprendre nos besoins et y répondre efficacement.
              </p>
              <div className="tc-author">
                <div className="tc-avatar">AK</div>
                <div>
                  <span className="tc-name">Abdoulaye Kone</span>
                  <span className="tc-role">CEO, TechLab Afrique</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <span className="cta-badge">💡 Vous avez un projet ?</span>
              <h2>Prêt à donner vie à votre idée ?</h2>
              <p>Contactez-nous dès aujourd'hui pour discuter de votre projet et découvrir comment nous pouvons vous accompagner vers la réussite.</p>
            </div>
            <div className="cta-actions">
              <Link href="/contact">
                <span className="btn-primary">
                  Démarrer un projet
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
              <Link href="/services">
                <span className="btn-secondary">Nos services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* ============================================
          STYLES - CSS COMPLETS
          ============================================ */}
      <style jsx>{`
        /* ============================================
           BREADCRUMB
        ============================================ */
        .breadcrumb {
          background: rgba(10, 10, 46, 0.95);
          padding: 12px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          z-index: 3;
        }
        
        .breadcrumb ol {
          display: flex;
          gap: 8px;
          list-style: none;
          padding: 0;
          margin: 0;
          flex-wrap: wrap;
        }
        
        .breadcrumb li {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
        }
        
        .breadcrumb li:not(:last-child)::after {
          content: '/';
          margin-left: 8px;
          color: rgba(255, 255, 255, 0.2);
        }
        
        .breadcrumb a {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: color 0.2s;
        }
        
        .breadcrumb a:hover {
          color: #4CAF50;
        }
        
        .breadcrumb li:last-child {
          color: rgba(255, 255, 255, 0.8);
        }

        /* ============================================
           HERO CINÉMATIQUE
        ============================================ */
        .hero-cinematic {
          position: relative;
          padding: 40px 0 60px;
          background: linear-gradient(145deg, #0A0A2E 0%, #0D2B1A 40%, #1B5E20 100%);
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

        /* Particules */
        .hero-particles {
          position: absolute;
          inset: 0;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(76, 175, 80, 0.3);
          border-radius: 50%;
          animation: particleFloat 20s linear infinite;
        }

        .p1 { left: 10%; top: 20%; animation-duration: 18s; }
        .p2 { left: 25%; top: 60%; animation-duration: 22s; animation-delay: 2s; }
        .p3 { left: 50%; top: 10%; animation-duration: 16s; animation-delay: 4s; }
        .p4 { left: 75%; top: 70%; animation-duration: 20s; animation-delay: 1s; }
        .p5 { left: 90%; top: 30%; animation-duration: 24s; animation-delay: 3s; }
        .p6 { left: 60%; top: 80%; animation-duration: 19s; animation-delay: 5s; }

        @keyframes particleFloat {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          25% { transform: translate(30px, -40px) scale(1.5); opacity: 0.8; }
          50% { transform: translate(-20px, 20px) scale(0.8); opacity: 0.2; }
          75% { transform: translate(40px, 30px) scale(1.2); opacity: 0.6; }
        }

        .hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.15;
        }

        .g1 {
          width: 500px;
          height: 500px;
          background: #4CAF50;
          top: -150px;
          right: -100px;
          animation: glowPulse 8s ease-in-out infinite;
        }

        .g2 {
          width: 300px;
          height: 300px;
          background: #1B5E20;
          bottom: -100px;
          left: -100px;
          animation: glowPulse 10s ease-in-out infinite reverse;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.3); }
        }

        .hero-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 70% 30%, rgba(76, 175, 80, 0.08), transparent 60%);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 2;
          width: 100%;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        /* ---- Hero Content ---- */
        .hero-content {
          max-width: 100%;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          padding: 6px 18px 6px 12px;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          margin-bottom: 28px;
          position: relative;
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

        .badge-pulse {
          position: absolute;
          inset: -2px;
          border-radius: 50px;
          border: 1px solid rgba(76, 175, 80, 0.2);
          animation: badgePulse 2s ease-in-out infinite;
        }

        @keyframes badgePulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0; }
        }

        .hero-title {
          font-size: clamp(40px, 5.5vw, 68px);
          font-weight: 700;
          line-height: 1.05;
          margin-bottom: 20px;
        }

        .title-line {
          color: #fff;
          display: block;
        }

        .title-highlight {
          display: block;
          background: linear-gradient(135deg, #4CAF50, #81C784, #A5D6A7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.8;
          max-width: 480px;
          margin-bottom: 36px;
        }

        .hero-subtitle strong {
          color: rgba(255, 255, 255, 0.85);
          font-weight: 600;
        }

        .hero-stats {
          display: flex;
          align-items: center;
          gap: 32px;
          margin-bottom: 40px;
          padding: 16px 24px;
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(12px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          max-width: 480px;
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
          font-feature-settings: "tnum";
        }

        .stat-label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 400;
          letter-spacing: 0.3px;
        }

        .stat-label a {
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          transition: color 0.2s;
        }

        .stat-label a:hover {
          color: #4CAF50;
        }

        .stat-divider {
          width: 1px;
          height: 32px;
          background: rgba(255, 255, 255, 0.08);
        }

        .hero-actions {
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
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          box-shadow: 0 4px 30px rgba(27, 94, 32, 0.25);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 50px rgba(27, 94, 32, 0.35);
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
          border: 1px solid rgba(255, 255, 255, 0.15);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-3px);
        }

        /* ---- Hero Visual ---- */
        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .visual-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 14px;
          max-width: 380px;
          width: 100%;
        }

        .visual-card {
          padding: 20px 12px;
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(12px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          text-align: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
          animation: visualFloat 6s ease-in-out infinite;
        }

        .visual-card:hover {
          transform: translateY(-6px);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(76, 175, 80, 0.2);
        }

        .vc-icon {
          display: block;
          margin: 0 auto 6px;
          width: 40px;
          height: 40px;
          filter: brightness(0) invert(1) opacity(0.8);
        }

        .vc-label {
          display: block;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .vc1 { animation-delay: 0s; }
        .vc2 { animation-delay: 1s; margin-top: 16px; }
        .vc3 { animation-delay: 2s; }
        .vc4 { animation-delay: 0.5s; margin-top: 16px; }
        .vc5 { animation-delay: 1.5s; }
        .vc6 { animation-delay: 2.5s; }

        @keyframes visualFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        /* ---- Wave ---- */
        .hero-wave {
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          z-index: 3;
          line-height: 0;
        }

        .hero-wave svg {
          width: 100%;
          height: 80px;
          display: block;
        }

        /* ============================================
           TESTIMONIALS PREVIEW
        ============================================ */
        .testimonials-preview {
          padding: 80px 0;
          background: #f8fafc;
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
          font-size: 32px;
          font-weight: 700;
          color: #0A0A2E;
          margin-bottom: 8px;
        }

        .section-subtitle {
          font-size: 16px;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto;
        }

        .testimonial-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .testimonial-card {
          background: #fff;
          border-radius: 20px;
          padding: 28px 24px 32px;
          border: 1px solid #eef0f2;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06);
          border-color: rgba(76, 175, 80, 0.15);
        }

        .tc-quote {
          font-size: 40px;
          color: #4CAF50;
          font-family: Georgia, serif;
          line-height: 1;
          margin-bottom: 8px;
          opacity: 0.3;
        }

        .tc-text {
          font-size: 15px;
          color: #4a4d5e;
          line-height: 1.7;
          margin-bottom: 16px;
        }

        .tc-author {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .tc-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1B5E20, #4CAF50);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 600;
          font-size: 16px;
          flex-shrink: 0;
        }

        .tc-name {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #0A0A2E;
        }

        .tc-role {
          display: block;
          font-size: 12px;
          color: #8c8f9c;
        }

        /* ============================================
           CTA SECTION
        ============================================ */
        .cta-section {
          padding: 80px 0;
          background: linear-gradient(145deg, #0A0A2E 0%, #0D2B1A 50%, #1B5E20 100%);
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
          color: rgba(255, 255, 255, 0.55);
          max-width: 480px;
          line-height: 1.7;
        }

        .cta-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          flex-shrink: 0;
        }

        /* ============================================
           ANIMATIONS
        ============================================ */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .animate-on-scroll:nth-child(1) { transition-delay: 0s; }
        .animate-on-scroll:nth-child(2) { transition-delay: 0.1s; }
        .animate-on-scroll:nth-child(3) { transition-delay: 0.2s; }
        .animate-on-scroll:nth-child(4) { transition-delay: 0.3s; }

        /* ============================================
           RESPONSIVE
        ============================================ */
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 40px;
          }

          .hero-subtitle {
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
          }

          .hero-stats {
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
            justify-content: center;
          }

          .hero-actions {
            justify-content: center;
          }

          .visual-grid {
            max-width: 320px;
            margin: 0 auto;
          }
        }

        @media (max-width: 768px) {
          .hero-cinematic {
            padding: 60px 0 40px;
            min-height: auto;
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
            align-items: center;
            padding: 16px 20px;
          }

          .stat-divider {
            width: 60px;
            height: 1px;
          }

          .hero-actions {
            flex-direction: column;
            width: 100%;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
            justify-content: center;
          }

          .visual-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            max-width: 280px;
          }

          .visual-card {
            padding: 14px 8px;
          }

          .vc-icon {
            width: 30px;
            height: 30px;
          }
          .vc-label {
            font-size: 10px;
          }

          .testimonial-grid {
            grid-template-columns: 1fr;
          }

          .cta-content {
            flex-direction: column;
            text-align: center;
          }

          .cta-text p {
            max-width: 100%;
          }

          .cta-actions {
            width: 100%;
            flex-direction: column;
          }

          .cta-actions .btn-primary,
          .cta-actions .btn-secondary {
            width: 100%;
            justify-content: center;
          }

          .hero-wave svg {
            height: 40px;
          }

          .section-title {
            font-size: 24px;
          }

          .breadcrumb {
            padding: 8px 0;
          }
          
          .breadcrumb li {
            font-size: 12px;
          }
        }

        @media (max-width: 420px) {
          .hero-title {
            font-size: 26px;
          }

          .visual-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            max-width: 220px;
          }

          .visual-card {
            padding: 10px 6px;
          }

          .vc-icon {
            width: 24px;
            height: 24px;
          }
          .vc-label {
            font-size: 8px;
            letter-spacing: 0.3px;
          }
        }
      `}</style>
    </>
  );
};

export default PortfolioPage;