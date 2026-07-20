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

  // Formatage de la date
  const formatDate = (date) => {
    if (!date) return 'Date non définie';
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calcul du temps de lecture estimé
  const getReadingTime = (content) => {
    if (!content) return '1 min';
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min de lecture`;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p className="text-muted mt-3">Chargement de l'article...</p>
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
              <span className="error-icon">📝</span>
              <h1 className="display-1 fw-bold text-primary">404</h1>
              <h2 className="mb-3">Article non trouvé</h2>
              <p className="text-muted mb-4">L'article que vous recherchez n'existe pas ou a été déplacé.</p>
              <Link href="/blog">
                <span className="btn btn-ics-primary">Retour au blog</span>
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
        className="blog-hero"
        style={{
          background: 'linear-gradient(135deg, #0A0A2E 0%, #1B5E20 70%, #0D3B0F 100%)',
          padding: '80px 0 60px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {item.featuredImage && (
          <div 
            className="hero-background"
            style={{
              backgroundImage: `url(${item.featuredImage})`,
              opacity: 0.15,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'absolute',
              inset: 0,
            }}
          />
        )}
        <div className="container position-relative">
          <div className="row">
            <div className="col-lg-10 mx-auto text-center">
              {item.tags && item.tags.length > 0 && (
                <div className="tags-container mb-3">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="tag-badge">{tag}</span>
                  ))}
                  {item.isFeatured && (
                    <span className="featured-badge">⭐ Article en vedette</span>
                  )}
                </div>
              )}
              <h1 className="text-white display-3 fw-bold mb-3">{item.title}</h1>
              <div className="d-flex justify-content-center align-items-center gap-4 text-white-50">
                <span>👤 {item.author || 'ICS GROUPE'}</span>
                <span className="separator">•</span>
                <span>📅 {formatDate(item.publishedDate)}</span>
                <span className="separator">•</span>
                <span>⏱️ {getReadingTime(item.content)}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative shapes */}
        <div className="hero-shape shape-1"></div>
        <div className="hero-shape shape-2"></div>
      </section>

      {/* Contenu de l'article */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {/* Contenu principal */}
            <div className="col-lg-8">
              {item.featuredImage && (
                <div className="article-image-container mb-4">
                  <img 
                    src={item.featuredImage} 
                    alt={item.title} 
                    className="img-fluid rounded-3 w-100"
                    style={{ maxHeight: '500px', objectFit: 'cover' }}
                  />
                </div>
              )}
              
              <div className="article-content">
                <div 
                  className="content-body"
                  dangerouslySetInnerHTML={{ 
                    __html: item.content
                      .replace(/\n/g, '<br />')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em>$1</em>')
                  }} 
                />
              </div>

              {/* Partage */}
              <div className="share-section mt-5 pt-4 border-top">
                <h5 className="mb-3">📤 Partager cet article</h5>
                <div className="d-flex gap-2 flex-wrap">
                  <button 
                    className="share-btn facebook"
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                  >
                    <span>📘</span> Facebook
                  </button>
                  <button 
                    className="share-btn twitter"
                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(item.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  >
                    <span>🐦</span> Twitter
                  </button>
                  <button 
                    className="share-btn linkedin"
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  >
                    <span>💼</span> LinkedIn
                  </button>
                  <button 
                    className="share-btn whatsapp"
                    onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(item.title + ' ' + window.location.href)}`, '_blank')}
                  >
                    <span>💬</span> WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              {/* Auteur */}
              <div className="info-card mb-4">
                <h5 className="info-card-title">✍️ À propos de l'auteur</h5>
                <div className="author-info">
                  <div className="author-avatar">
                    {item.author?.charAt(0) || 'I'}
                  </div>
                  <div>
                    <strong>{item.author || 'ICS GROUPE'}</strong>
                    <p className="text-muted small mb-0">
                      Expert en transformation digitale et innovation
                    </p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="info-card mb-4">
                  <h5 className="info-card-title">🏷️ Tags</h5>
                  <div className="tags-container-sidebar">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="tag-sidebar">{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact */}
              <div className="info-card">
                <h5 className="info-card-title">💬 Besoin d'informations ?</h5>
                <p className="text-muted small">
                  Notre équipe est à votre disposition pour répondre à vos questions.
                </p>
                <Link href="/contact">
                  <span className="btn btn-ics-primary w-100">
                    Nous contacter
                  </span>
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
          padding: 10px 24px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
          text-decoration: none;
          text-align: center;
        }
        .btn-ics-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(27, 94, 32, 0.3);
          color: #fff;
        }

        .blog-hero {
          position: relative;
        }

        .hero-background {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
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

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }

        .tag-badge {
          display: inline-block;
          background: rgba(76, 175, 80, 0.2);
          color: #4CAF50;
          padding: 4px 14px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 500;
        }

        .featured-badge {
          display: inline-block;
          background: rgba(255, 215, 0, 0.2);
          color: #FFD700;
          padding: 4px 14px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 500;
        }

        .separator {
          opacity: 0.3;
        }

        .article-image-container {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        .article-content {
          font-size: 17px;
          line-height: 1.9;
          color: #2d2d3f;
        }

        .content-body {
          font-size: 17px;
          line-height: 1.9;
        }
        .content-body p {
          margin-bottom: 1.2rem;
        }
        .content-body strong {
          color: #1B5E20;
        }
        .content-body h2, .content-body h3 {
          color: #1a1a2e;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .share-section {
          border-color: #eef0f2 !important;
        }

        .share-btn {
          padding: 8px 18px;
          border: none;
          border-radius: 50px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }
        .share-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .share-btn.facebook {
          background: #E3F2FD;
          color: #1565C0;
        }
        .share-btn.twitter {
          background: #E1F5FE;
          color: #0277BD;
        }
        .share-btn.linkedin {
          background: #E8F0FE;
          color: #0A66C2;
        }
        .share-btn.whatsapp {
          background: #E8F5E9;
          color: #1B5E20;
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

        .author-info {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .author-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1B5E20, #4CAF50);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 600;
          flex-shrink: 0;
        }

        .tags-container-sidebar {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .tag-sidebar {
          background: #f0f1f3;
          color: #4a4d5e;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
        }
        .tag-sidebar:hover {
          background: #e0e1e3;
        }

        .error-404 {
          padding: 40px 0;
        }
        .error-icon {
          font-size: 64px;
          display: block;
          margin-bottom: 16px;
        }

        @media (max-width: 768px) {
          .blog-hero {
            padding: 50px 0 40px;
          }
          .blog-hero h1 {
            font-size: 28px !important;
          }
          .d-flex.gap-4 {
            flex-direction: column;
            gap: 8px !important;
          }
          .separator {
            display: none;
          }
          .article-content {
            font-size: 15px;
          }
          .content-body {
            font-size: 15px;
          }
        }
      `}</style>
    </>
  );
}