import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Layouts/Navbar';
import Footer from '../../components/Layouts/Footer';
import PageBannerContent from '../../components/Common/PageBannerContent';
import services from '../../data/services';

const ServicesPage = () => {
  // Fonction pour obtenir la classe d'icône selon le service
  const getServiceIcon = (title) => {
    const iconMap = {
      'Cybersécurité': 'fa-shield-halved',
      'Développement Web': 'fa-code',
      'Énergies Renouvelables': 'fa-solar-panel',
      'Cloud & Infrastructure': 'fa-cloud',
      'Data & IA': 'fa-brain',
      'Consulting IT': 'fa-handshake',
      'Audit Sécurité': 'fa-shield-check',
      'Formation': 'fa-graduation-cap',
    };
    return iconMap[title] || 'fa-cube';
  };

  // Fonction pour obtenir la couleur selon le service
  const getServiceColor = (title) => {
    const colorMap = {
      'Cybersécurité': '#49B96D',
      'Développement Web': '#80C353',
      'Énergies Renouvelables': '#49B96D',
      'Cloud & Infrastructure': '#80C353',
      'Data & IA': '#49B96D',
      'Consulting IT': '#80C353',
      'Audit Sécurité': '#49B96D',
      'Formation': '#80C353',
    };
    return colorMap[title] || '#49B96D';
  };

  return (
    <>
      <Navbar />

      <PageBannerContent 
        pageTitle="Nos Services" 
        pageCaption="ICS GROUPE vous accompagne dans tous vos projets numériques, sécuritaires et énergétiques avec des solutions innovantes et sur mesure."
      />

      {/* Services Cards Section */}
      <section className="services-section">
        <div className="section-background">
          <div className="gradient-overlay"></div>
          <div className="glow-spot glow-1"></div>
          <div className="glow-spot glow-2"></div>
        </div>

        <div className="container">
          {/* En-tête de section */}
          <div className="section-header">
            <span className="section-tag">NOS EXPERTISES</span>
            <h2 className="section-title">
              Des solutions <span className="highlight">innovantes</span> pour<br />
              votre <span className="highlight">transformation</span>
            </h2>
            <p className="section-description">
              Découvrez notre gamme complète de services conçus pour répondre aux défis
              de votre entreprise et propulser votre croissance.
            </p>
          </div>

          {/* Grille des services */}
          <div className="services-grid">
            {services.map((service) => {
              const iconClass = getServiceIcon(service.title);
              const color = getServiceColor(service.title);
              
              return (
                <div key={service.id || service.slug} className="service-card-wrapper">
                  <div className="service-card">
                    {/* Icône */}
                    <div className="service-icon-wrapper" style={{ background: `${color}15` }}>
                      <i className={`fas ${iconClass}`} style={{ color }}></i>
                    </div>
                    
                    {/* Titre */}
                    <h3 className="service-title">{service.title}</h3>
                    
                    {/* Description */}
                    <p className="service-description">{service.caption}</p>
                    
                    {/* Tags/technologies */}
                    {service.tags && service.tags.length > 0 && (
                      <div className="service-tags">
                        {service.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="service-tag">{tag}</span>
                        ))}
                      </div>
                    )}
                    
                    {/* Lien */}
                    <Link href={`/services/${service.slug}`}>
                      <a className="service-link">
                        <span>Explorer</span>
                        <svg className="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    </Link>
                    
                    {/* Numéro décoratif */}
                    <div className="service-number">
                      {String(services.indexOf(service) + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA supplémentaire */}
          <div className="cta-wrapper">
            <div className="cta-box">
              <div className="cta-content">
                <h3 className="cta-title">
                  Vous avez un projet <span className="highlight">spécifique</span> ?
                </h3>
                <p className="cta-text">
                  Contactez-nous pour une solution personnalisée adaptée à vos besoins.
                </p>
                <Link href="/contact">
                  <a className="btn-cta">
                    Discuter de mon projet
                    <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        /* ====== SECTION PRINCIPALE ====== */
        .services-section {
          position: relative;
          padding: 100px 0 80px;
          background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
          overflow: hidden;
        }

        /* Arrière-plan avec effets */
        .section-background {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .gradient-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 20% 50%, rgba(73, 185, 109, 0.03) 0%, transparent 70%),
                      radial-gradient(ellipse at 80% 50%, rgba(128, 195, 83, 0.03) 0%, transparent 70%);
        }

        .glow-spot {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.08;
        }

        .glow-1 {
          width: 400px;
          height: 400px;
          background: #49B96D;
          top: -100px;
          right: -100px;
          animation: floatGlow 8s ease-in-out infinite;
        }

        .glow-2 {
          width: 300px;
          height: 300px;
          background: #80C353;
          bottom: -100px;
          left: -50px;
          animation: floatGlow 10s ease-in-out infinite reverse;
        }

        @keyframes floatGlow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.2); }
        }

        .container {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ====== EN-TÊTE ====== */
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-tag {
          display: inline-block;
          padding: 6px 20px;
          background: rgba(73, 185, 109, 0.1);
          color: #49B96D;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.5px;
          border-radius: 50px;
          text-transform: uppercase;
          margin-bottom: 16px;
          border: 1px solid rgba(73, 185, 109, 0.15);
        }

        .section-title {
          font-size: 42px;
          font-weight: 800;
          color: #0a0e27;
          line-height: 1.2;
          margin-bottom: 16px;
        }

        .highlight {
          background: linear-gradient(135deg, #49B96D, #80C353);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-description {
          font-size: 18px;
          color: #6c757d;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* ====== GRILLE DES SERVICES ====== */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        .service-card-wrapper {
          perspective: 1000px;
        }

        .service-card {
          position: relative;
          padding: 40px 30px 35px;
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid rgba(0, 0, 0, 0.04);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          height: 100%;
          min-height: 320px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
        }

        .service-card:hover {
          transform: translateY(-10px) scale(1.01);
          border-color: rgba(73, 185, 109, 0.15);
          box-shadow: 0 20px 60px rgba(73, 185, 109, 0.08), 0 10px 30px rgba(0, 0, 0, 0.04);
        }

        /* Icône */
        .service-icon-wrapper {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          transition: all 0.4s ease;
          flex-shrink: 0;
        }

        .service-card:hover .service-icon-wrapper {
          transform: scale(1.05) rotate(-3deg);
        }

        .service-icon-wrapper i {
          font-size: 26px;
          transition: all 0.4s ease;
        }

        .service-card:hover .service-icon-wrapper i {
          transform: scale(1.1);
        }

        /* Titre */
        .service-title {
          font-size: 20px;
          font-weight: 700;
          color: #0a0e27;
          margin-bottom: 12px;
        }

        /* Description */
        .service-description {
          font-size: 15px;
          line-height: 1.7;
          color: #6c757d;
          flex: 1;
          margin-bottom: 16px;
        }

        /* Tags */
        .service-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .service-tag {
          padding: 4px 12px;
          background: rgba(73, 185, 109, 0.06);
          color: #49B96D;
          font-size: 11px;
          font-weight: 600;
          border-radius: 50px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          border: 1px solid rgba(73, 185, 109, 0.08);
        }

        /* Lien */
        .service-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #49B96D;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.3s ease;
          margin-top: auto;
        }

        .service-link:hover {
          gap: 14px;
          color: #3a8f5a;
        }

        .link-icon {
          width: 20px;
          height: 20px;
          transition: transform 0.3s ease;
        }

        .service-link:hover .link-icon {
          transform: translateX(4px);
        }

        /* Numéro décoratif */
        .service-number {
          position: absolute;
          bottom: 16px;
          right: 24px;
          font-size: 64px;
          font-weight: 900;
          color: rgba(0, 0, 0, 0.02);
          line-height: 1;
          pointer-events: none;
          font-family: 'Arial', sans-serif;
          transition: color 0.4s ease;
        }

        .service-card:hover .service-number {
          color: rgba(73, 185, 109, 0.04);
        }

        /* ====== CTA BOX ====== */
        .cta-wrapper {
          margin-top: 20px;
        }

        .cta-box {
          padding: 60px 40px;
          background: linear-gradient(135deg, #0a0e27 0%, #141b33 100%);
          border-radius: 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-box::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 50%, rgba(73, 185, 109, 0.05) 0%, transparent 70%);
        }

        .cta-content {
          position: relative;
          z-index: 1;
        }

        .cta-title {
          font-size: 32px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 12px;
        }

        .cta-title .highlight {
          background: linear-gradient(135deg, #49B96D, #80C353);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cta-text {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 30px;
        }

        .btn-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 36px;
          background: linear-gradient(135deg, #49B96D, #80C353);
          color: #ffffff;
          font-weight: 600;
          font-size: 16px;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.4s ease;
          box-shadow: 0 8px 30px rgba(73, 185, 109, 0.35);
        }

        .btn-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 50px rgba(73, 185, 109, 0.5);
          color: #ffffff;
        }

        .btn-arrow {
          width: 22px;
          height: 22px;
          transition: transform 0.3s ease;
        }

        .btn-cta:hover .btn-arrow {
          transform: translateX(6px);
        }

        /* ====== RESPONSIVE ====== */
        @media (max-width: 992px) {
          .services-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          }

          .section-title {
            font-size: 36px;
          }

          .cta-title {
            font-size: 28px;
          }
        }

        @media (max-width: 768px) {
          .services-section {
            padding: 60px 0 40px;
          }

          .services-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .section-title {
            font-size: 30px;
          }

          .section-description {
            font-size: 16px;
          }

          .service-card {
            min-height: auto;
            padding: 30px 24px;
          }

          .cta-box {
            padding: 40px 24px;
          }

          .cta-title {
            font-size: 24px;
          }

          .btn-cta {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .section-title {
            font-size: 26px;
          }

          .service-number {
            font-size: 48px;
          }
        }
      `}</style>
    </>
  );
};

export default ServicesPage;