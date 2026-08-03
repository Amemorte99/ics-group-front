// pages/admin/blog/[slug].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { adminBlogApi, authApi } from '../../../utils/adminApi';
import AdminLayout from '../../../components/AdminLayout';

export default function AdminBlogDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authApi.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    if (slug) {
      fetchItem();
    }
  }, [slug]);

  const fetchItem = async () => {
    try {
      setLoading(true);
      console.log('🔍 Récupération de l\'article avec slug:', slug);
      
      let response;
      // Vérifier si c'est un ID ou un slug
      if (!isNaN(slug)) {
        response = await adminBlogApi.getById(parseInt(slug));
      } else {
        response = await adminBlogApi.getBySlug(slug);
      }
      
      console.log('✅ Article récupéré:', response.data);
      setItem(response.data);
      setError(null);
    } catch (err) {
      console.error('❌ Erreur fetch:', err);
      setError('Article non trouvé');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'Date non définie';
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content) => {
    if (!content) return '1 min';
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min de lecture`;
  };

  if (loading) {
    return (
      <AdminLayout title="Chargement..." module="blog">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
          <div className="text-center">
            <div className="spinner-border text-success" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Chargement...</span>
            </div>
            <p className="text-muted mt-3">Chargement de l'article...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !item) {
    return (
      <AdminLayout title="Article non trouvé" module="blog">
        <div className="container py-5 text-center">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="error-404">
                <span className="error-icon">📝</span>
                <h1 className="display-1 fw-bold text-success">404</h1>
                <h2 className="mb-3">Article non trouvé</h2>
                <p className="text-muted mb-4">L'article que vous recherchez n'existe pas ou a été déplacé.</p>
                <Link href="/admin/blog">
                  <span className="btn btn-ics-primary">Retour au blog</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={item.title} module="blog">
      {/* ===== HEADER ===== */}
      <div className="detail-header">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <Link href="/admin/blog">
              <span className="back-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Retour
              </span>
            </Link>
            <h1 className="detail-title">{item.title}</h1>
            <div className="detail-meta">
              <span className="meta-item">
                <span className="meta-icon">📅</span>
                {formatDate(item.publishedDate || item.createdAt)}
              </span>
              <span className="meta-divider">•</span>
              <span className="meta-item">
                <span className="meta-icon">⏱️</span>
                {getReadingTime(item.content)}
              </span>
              <span className="meta-divider">•</span>
              <span className="meta-item">
                <span className="meta-icon">👤</span>
                {item.author || 'Admin'}
              </span>
              <span className="meta-divider">•</span>
              <span className={`status-badge ${item.isPublished ? 'published' : 'draft'}`}>
                {item.isPublished ? '✅ Publié' : '📝 Brouillon'}
              </span>
              {item.isFeatured && (
                <span className="status-badge featured">⭐ En vedette</span>
              )}
            </div>
          </div>
          <div className="detail-actions">
            <Link href={`/admin/blog/edit/${item.slug}`}>
              <span className="btn btn-edit">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89783 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Modifier
              </span>
            </Link>
            <button 
              onClick={() => {
                if (confirm('Supprimer cet article ?')) {
                  adminBlogApi.delete(item.id)
                    .then(() => router.push('/admin/blog'))
                    .catch(err => console.error(err));
                }
              }}
              className="btn btn-delete"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 6L18 20C18 20.5304 17.7893 21.0391 17.4142 21.4142C17.0391 21.7893 16.5304 22 16 22H8C7.46957 22 6.96086 21.7893 6.58579 21.4142C6.21071 21.0391 6 20.5304 6 20L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Supprimer
            </button>
          </div>
        </div>
      </div>

      {/* ===== CONTENU ===== */}
      <div className="detail-content">
        <div className="row g-4">
          <div className="col-lg-8">
            {/* Image */}
            {item.featuredImage && (
              <div className="article-image">
                <img src={item.featuredImage} alt={item.title} />
              </div>
            )}

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="tags-container">
                {item.tags.map((tag, index) => (
                  <span key={index} className="tag-item">#{tag}</span>
                ))}
              </div>
            )}

            {/* Contenu */}
            <div className="article-content">
              <div 
                className="content-body" 
                dangerouslySetInnerHTML={{ 
                  __html: item.content?.replace(/\n/g, '<br />') || 'Contenu non disponible' 
                }} 
              />
            </div>
          </div>

          {/* ===== SIDEBAR ===== */}
          <div className="col-lg-4">
            <div className="sidebar-card">
              <h5 className="sidebar-title">📊 Informations</h5>
              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">ID</span>
                  <span className="info-value">#{item.id}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Slug</span>
                  <span className="info-value">{item.slug}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Statut</span>
                  <span className={`status-badge ${item.isPublished ? 'published' : 'draft'}`}>
                    {item.isPublished ? '✅ Publié' : '📝 Brouillon'}
                  </span>
                </div>
                {item.isFeatured && (
                  <div className="info-item">
                    <span className="info-label">Vedette</span>
                    <span className="status-badge featured">⭐ Oui</span>
                  </div>
                )}
                <div className="info-item">
                  <span className="info-label">Vues</span>
                  <span className="info-value">{item.views || 0}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Créé le</span>
                  <span className="info-value">{formatDate(item.createdAt)}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Mis à jour</span>
                  <span className="info-value">{formatDate(item.updatedAt)}</span>
                </div>
              </div>
            </div>

            <div className="sidebar-card">
              <h5 className="sidebar-title">🔗 Actions rapides</h5>
              <div className="quick-actions">
                <Link href={`/admin/blog/edit/${item.slug}`}>
                  <span className="action-btn edit">✏️ Modifier l'article</span>
                </Link>
                <a href={`/blog/${item.slug}`} target="_blank" rel="noopener noreferrer">
                  <span className="action-btn view">👁️ Voir sur le site</span>
                </a>
                <button 
                  onClick={() => {
                    adminBlogApi.togglePublish(item.id)
                      .then(() => fetchItem())
                      .catch(err => console.error(err));
                  }}
                  className="action-btn toggle"
                >
                  {item.isPublished ? '📥 Mettre en brouillon' : '📤 Publier'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
        }
        .btn-ics-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(27, 94, 32, 0.3);
          color: #fff;
        }

        .detail-header {
          background: #fff;
          border-radius: 16px;
          padding: 24px 28px;
          margin-bottom: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          border: 1px solid #eef0f2;
        }
        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #6b7280;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .back-btn:hover {
          color: #1B5E20;
          transform: translateX(-4px);
        }
        .detail-title {
          font-size: 28px;
          font-weight: 700;
          color: #0A0A2E;
          margin: 8px 0 12px 0;
          line-height: 1.2;
        }
        .detail-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #6b7280;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .meta-icon { font-size: 14px; }
        .meta-divider { color: #d0d2d8; }
        .detail-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .btn-edit, .btn-delete {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          border-radius: 10px;
          border: none;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .btn-edit {
          background: #E8F5E9;
          color: #1B5E20;
        }
        .btn-edit:hover {
          background: #1B5E20;
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(27, 94, 32, 0.2);
        }
        .btn-delete {
          background: #FFEBEE;
          color: #C62828;
        }
        .btn-delete:hover {
          background: #C62828;
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(198, 40, 40, 0.2);
        }

        .detail-content {
          background: #fff;
          border-radius: 16px;
          padding: 32px 28px;
          border: 1px solid #eef0f2;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .article-image {
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }
        .article-image img {
          width: 100%;
          max-height: 400px;
          object-fit: cover;
        }
        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }
        .tag-item {
          padding: 4px 14px;
          background: #f0f2f5;
          border-radius: 50px;
          font-size: 13px;
          color: #4a4d5e;
          font-weight: 500;
        }
        .article-content {
          font-size: 16px;
          line-height: 1.9;
          color: #1a1a2e;
        }
        .content-body {
          font-size: 16px;
          line-height: 1.9;
        }
        .content-body p { margin-bottom: 1rem; }
        .content-body strong { color: #1B5E20; }
        .content-body h2, .content-body h3 { 
          color: #0A0A2E; 
          margin-top: 2rem; 
          margin-bottom: 1rem; 
        }
        .content-body blockquote {
          border-left: 4px solid #4CAF50;
          padding: 1rem 1.5rem;
          margin: 1.5rem 0;
          background: #f8fafc;
          border-radius: 0 8px 8px 0;
          font-style: italic;
          color: #4a4d5e;
        }
        .content-body code {
          background: #f0f2f5;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          font-size: 0.9rem;
        }

        .sidebar-card {
          background: #f8fafc;
          border-radius: 16px;
          padding: 20px 24px;
          margin-bottom: 20px;
          border: 1px solid #eef0f2;
        }
        .sidebar-title {
          font-size: 15px;
          font-weight: 600;
          color: #0A0A2E;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #eef0f2;
        }
        .info-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .info-label {
          font-size: 13px;
          color: #8c8f9c;
          font-weight: 500;
        }
        .info-value {
          font-size: 13px;
          color: #1a1a2e;
          font-weight: 500;
        }

        .status-badge {
          padding: 3px 12px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 600;
        }
        .status-badge.published {
          background: #E8F5E9;
          color: #1B5E20;
        }
        .status-badge.draft {
          background: #FFF3E0;
          color: #E65100;
        }
        .status-badge.featured {
          background: #FFF8E1;
          color: #F57F17;
        }

        .quick-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .action-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 10px;
          border: 1px solid #eef0f2;
          background: #fff;
          color: #1a1a2e;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        }
        .action-btn.edit:hover { border-color: #1B5E20; color: #1B5E20; }
        .action-btn.view:hover { border-color: #4CAF50; color: #4CAF50; }
        .action-btn.toggle:hover { border-color: #FF9800; color: #FF9800; }

        .error-404 { padding: 40px 0; }
        .error-icon { font-size: 64px; display: block; margin-bottom: 16px; }

        @media (max-width: 992px) {
          .detail-header { padding: 20px; }
          .detail-content { padding: 24px 20px; }
          .detail-title { font-size: 22px; }
          .detail-actions { margin-top: 12px; }
        }
        @media (max-width: 768px) {
          .detail-meta { flex-direction: column; align-items: flex-start; gap: 4px; }
          .meta-divider { display: none; }
          .btn-edit, .btn-delete { width: 100%; justify-content: center; }
        }
      `}</style>
    </AdminLayout>
  );
}