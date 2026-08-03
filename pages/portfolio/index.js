// pages/portfolio/index.js
import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
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
        <meta property="og:url" content="https://icsolution.fr/portfolio" />
        <meta property="og:image" content="https://icsolution.fr/images/og-portfolio.jpg" />
        <link rel="canonical" href="https://icsolution.fr/portfolio" />
      </Head>

      <Navbar />

      {/* ===== HERO CINÉMATIQUE ===== */}
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
              
              <h1 className="hero-title animate-on-scroll">
                <span className="title-line">Nos</span>
                <span className="title-highlight">réalisations</span>
              </h1>
              
              <p className="hero-subtitle animate-on-scroll">
                Chaque projet raconte une histoire de passion, d&apos;expertise et d&apos;innovation.
                Découvrez comment nous accompagnons nos clients vers la réussite.
              </p>

              <div className="hero-stats animate-on-scroll" ref={statsRef}>
                <div className="stat-item">
                  <span className="stat-number" data-count="150" data-suffix="+">0+</span>
                  <span className="stat-label">Projets réalisés</span>
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
                  <span className="vc-icon">🔒</span>
                  <span className="vc-label">Cybersécurité</span>
                </div>
                <div className="visual-card vc2">
                  <span className="vc-icon">☀️</span>
                  <span className="vc-label">Énergie</span>
                </div>
                <div className="visual-card vc3">
                  <span className="vc-icon">🌐</span>
                  <span className="vc-label">Web</span>
                </div>
                <div className="visual-card vc4">
                  <span className="vc-icon">📱</span>
                  <span className="vc-label">Mobile</span>
                </div>
                <div className="visual-card vc5">
                  <span className="vc-icon">☁️</span>
                  <span className="vc-label">Cloud</span>
                </div>
                <div className="visual-card vc6">
                  <span className="vc-icon">📊</span>
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

      {/* ===== PORTFOLIO CONTENT ===== */}
      <div id="portfolio-grid">
        <PortfolioContent />
      </div>

      {/* ===== TESTIMONIALS PREVIEW ===== */}
      <section className="testimonials-preview">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Ils nous font confiance</span>
            <h2 className="section-title">Ce que disent nos clients</h2>
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
                  <span className="tc-role">CTO, Safricom</span>
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
                  <span className="tc-role">CEO, TechLab</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
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

      <style jsx>{`
        /* ============================================
           HERO CINÉMATIQUE
        ============================================ */
        .hero-cinematic {
          position: relative;
          padding: 120px 0 60px;
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
          font-size: 28px;
          margin-bottom: 6px;
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
          margin-bottom: 0;
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
            padding: 80px 0 40px;
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
            font-size: 22px;
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
            font-size: 18px;
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