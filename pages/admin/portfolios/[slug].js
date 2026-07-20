// pages/portfolio/[slug].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { portfolioApi } from '../../utils/api';

export default function PortfolioDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      fetchItem();
    }
  }, [slug]);

  const fetchItem = async () => {
    try {
      setLoading(true);
      const response = await portfolioApi.getBySlug(slug);
      setItem(response.data);
      setError(null);
    } catch (err) {
      setError('Projet non trouvé');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p className="text-muted mt-3">Chargement du projet...</p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="container py-5 text-center">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="error-404">
              <span className="error-icon">🔍</span>
              <h1 className="display-1 fw-bold text-primary">404</h1>
              <h2 className="mb-3">Projet non trouvé</h2>
              <p className="text-muted mb-4">Le projet que vous recherchez n'existe pas ou a été déplacé.</p>
              <Link href="/portfolio">
                <span className="btn btn-ics-primary">Retour au portfolio</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section 
        className="portfolio-hero"
        style={{
          background: 'linear-gradient(135deg, #0A0A2E 0%, #1B5E20 70%, #0D3B0F 100%)',
          padding: '80px 0 60px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container position-relative">
          <div className="row">
            <div className="col-lg-8">
              <span className="category-badge mb-3">{item.category}</span>
              <h1 className="text-white display-3 fw-bold mb-3">{item.title}</h1>
              {item.client && (
                <p className="text-white-50 lead mb-0">
                  <span className="me-3">👤 Client : {item.client}</span>
                  {item.completionDate && (
                    <span>📅 {new Date(item.completionDate).toLocaleDateString('fr-FR', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  )}
                </p>
              )}
            </div>
            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-lg-end" style={{ background: 'transparent', padding: 0 }}>
                  <li className="breadcrumb-item">
                    <Link href="/" className="text-white-50 text-decoration-none">Accueil</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href="/portfolio" className="text-white-50 text-decoration-none">Portfolio</Link>
                  </li>
                  <li className="breadcrumb-item active text-white" aria-current="page">
                    {item.title.length > 20 ? item.title.substring(0, 20) + '...' : item.title}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        {/* Decorative shapes */}
        <div className="hero-shape shape-1"></div>
        <div className="hero-shape shape-2"></div>
      </section>

      {/* Détail du projet */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {/* Contenu principal */}
            <div className="col-lg-8">
              {item.image && (
                <div className="project-image-container mb-4">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="img-fluid rounded-3 w-100"
                    style={{ maxHeight: '500px', objectFit: 'cover' }}
                  />
                </div>
              )}
              
              <div className="project-content">
                <h2 className="section-title">À propos du projet</h2>
                <div className="project-description">
                  <p className="lead">{item.description}</p>
                </div>
                
                {item.link && (
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-ics-primary btn-lg mt-3"
                  >
                    Voir le projet en ligne →
                  </a>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="info-card">
                <h5 className="info-card-title">📋 Informations</h5>
                <div className="info-item">
                  <span className="info-label">Client</span>
                  <span className="info-value">{item.client || 'Non spécifié'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Catégorie</span>
                  <span className="info-value">
                    <span className="category-badge-sm">{item.category}</span>
                  </span>
                </div>
                {item.completionDate && (
                  <div className="info-item">
                    <span className="info-label">Date de livraison</span>
                    <span className="info-value">
                      {new Date(item.completionDate).toLocaleDateString('fr-FR', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                )}
                <hr />
                <Link href="/contact">
                  <span className="btn btn-ics-primary w-100">
                    💬 Demander un devis
                  </span>
                </Link>
              </div>

              {/* Autres projets */}
              <div className="info-card mt-4">
                <h5 className="info-card-title">🔗 Autres projets</h5>
                <p className="text-muted small">Découvrez nos autres réalisations</p>
                <Link href="/portfolio">
                  <span className="btn btn-outline-ics w-100">Voir le portfolio</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .btn-ics-primary {
          background: linear-gradient(135deg, #1B5E20, #4CAF50);
          color: #fff;
          border: none;
          padding: 12px 28px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
          text-decoration: none;
        }
        .btn-ics-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(27, 94, 32, 0.3);
          color: #fff;
        }

        .btn-outline-ics {
          background: transparent;
          color: #1B5E20;
          border: 2px solid #1B5E20;
          padding: 10px 24px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
          text-decoration: none;
          text-align: center;
        }
        .btn-outline-ics:hover {
          background: #1B5E20;
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(27, 94, 32, 0.2);
        }

        .category-badge {
          display: inline-block;
          background: rgba(76, 175, 80, 0.3);
          color: #4CAF50;
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .category-badge-sm {
          display: inline-block;
          background: #E8F5E9;
          color: #1B5E20;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
        }

        .hero-shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
          pointer-events: none;
        }
        .shape-1 {
          width: 300px;
          height: 300px;
          background: #4CAF50;
          top: -100px;
          right: -50px;
        }
        .shape-2 {
          width: 200px;
          height: 200px;
          background: #1B5E20;
          bottom: -50px;
          left: -50px;
        }

        .section-title {
          font-size: 28px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 20px;
          position: relative;
          padding-bottom: 12px;
        }
        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, #1B5E20, #4CAF50);
          border-radius: 4px;
        }

        .project-description {
          font-size: 16px;
          line-height: 1.8;
          color: #4a4d5e;
        }

        .project-image-container {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        .info-card {
          background: #fff;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid #eef0f2;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .info-card-title {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 16px;
        }
        .info-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #f0f1f3;
        }
        .info-item:last-child {
          border-bottom: none;
        }
        .info-label {
          color: #8c8f9c;
          font-size: 14px;
        }
        .info-value {
          color: #1a1a2e;
          font-weight: 500;
          font-size: 14px;
          text-align: right;
        }

        .error-404 {
          padding: 40px 0;
        }
        .error-icon {
          font-size: 64px;
          display: block;
          margin-bottom: 16px;
        }

        .breadcrumb-item + .breadcrumb-item::before {
          color: rgba(255,255,255,0.4);
        }

        @media (max-width: 768px) {
          .portfolio-hero {
            padding: 50px 0 40px;
          }
          .section-title {
            font-size: 24px;
          }
          .project-description {
            font-size: 15px;
          }
          .info-card {
            padding: 16px;
          }
        }
      `}</style>
    </>
  );
}