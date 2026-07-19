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
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="container py-5 text-center">
        <h1 className="display-4 text-danger">404</h1>
        <p className="lead">Projet non trouvé</p>
        <Link href="/portfolio" className="btn btn-primary">
          Retour au portfolio
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Page Title */}
      <section className="page-title-section" style={{ background: 'linear-gradient(135deg, #0a0a2e 0%, #1a1a4e 100%)', padding: '60px 0' }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="text-white">{item.title}</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link href="/" className="text-white-50">Accueil</Link></li>
                  <li className="breadcrumb-item"><Link href="/portfolio" className="text-white-50">Portfolio</Link></li>
                  <li className="breadcrumb-item active text-white" aria-current="page">{item.title}</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* Détail du projet */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {item.image && (
                <img src={item.image} alt={item.title} className="img-fluid rounded mb-4" />
              )}
              <div className="mb-4">
                <span className="badge bg-primary me-2">{item.category}</span>
                {item.completionDate && (
                  <span className="badge bg-secondary">{new Date(item.completionDate).toLocaleDateString('fr-FR')}</span>
                )}
              </div>
              <h2 className="mb-3">À propos du projet</h2>
              <p className="lead">{item.description}</p>
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Voir le projet en ligne →
                </a>
              )}
            </div>
            <div className="col-lg-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Informations</h5>
                  <hr />
                  <p><strong>Client :</strong> {item.client || 'Non spécifié'}</p>
                  <p><strong>Catégorie :</strong> {item.category}</p>
                  {item.completionDate && (
                    <p><strong>Date de livraison :</strong> {new Date(item.completionDate).toLocaleDateString('fr-FR')}</p>
                  )}
                  <Link href="/contact" className="btn btn-primary w-100">
                    Demander un devis
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}