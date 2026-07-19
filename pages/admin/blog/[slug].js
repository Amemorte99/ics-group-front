// pages/blog/[slug].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { blogApi } from '../../utils/api';

export default function BlogDetail() {
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
      const response = await blogApi.getBySlug(slug);
      setItem(response.data);
      setError(null);
    } catch (err) {
      setError('Article non trouvé');
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
        <p className="lead">Article non trouvé</p>
        <Link href="/blog" className="btn btn-primary">
          Retour au blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="page-title-section" style={{ background: 'linear-gradient(135deg, #0a0a2e 0%, #1a1a4e 100%)', padding: '60px 0' }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="text-white">{item.title}</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link href="/" className="text-white-50">Accueil</Link></li>
                  <li className="breadcrumb-item"><Link href="/blog" className="text-white-50">Blog</Link></li>
                  <li className="breadcrumb-item active text-white" aria-current="page">{item.title}</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {item.featuredImage && (
                <img src={item.featuredImage} alt={item.title} className="img-fluid rounded mb-4" />
              )}
              <div className="mb-3">
                {item.tags && item.tags.map((tag, index) => (
                  <span key={index} className="badge bg-secondary me-1">{tag}</span>
                ))}
                {item.isFeatured && (
                  <span className="badge bg-warning text-dark ms-2">⭐ Vedette</span>
                )}
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="text-muted">Par {item.author || 'ICS GROUPE'}</span>
                <span className="text-muted">
                  {item.publishedDate ? new Date(item.publishedDate).toLocaleDateString('fr-FR') : 'Date non définie'}
                </span>
              </div>
              <div dangerouslySetInnerHTML={{ __html: item.content.replace(/\n/g, '<br />') }} />
            </div>
            <div className="col-lg-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Partager</h5>
                  <hr />
                  <div className="d-flex gap-2">
                    <button className="btn btn-primary btn-sm">Facebook</button>
                    <button className="btn btn-info btn-sm text-white">Twitter</button>
                    <button className="btn btn-danger btn-sm">LinkedIn</button>
                  </div>
                </div>
              </div>
              <div className="card shadow-sm mt-3">
                <div className="card-body">
                  <h5 className="card-title">Contact</h5>
                  <hr />
                  <p className="small">Besoin d'informations ?</p>
                  <Link href="/contact" className="btn btn-primary w-100">
                    Nous contacter
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