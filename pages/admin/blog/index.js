// pages/admin/blog/index.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { adminBlogApi, authApi } from '../../../utils/adminApi';
import AdminLayout from '../../../components/AdminLayout';

export default function AdminBlog() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authApi.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await adminBlogApi.getAll();
      setItems(response.data || []);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        await adminBlogApi.delete(id);
        fetchItems();
      } catch (error) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      await adminBlogApi.togglePublish(id);
      fetchItems();
    } catch (error) {
      alert('Erreur lors du changement de statut');
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      await adminBlogApi.toggleFeatured(id);
      fetchItems();
    } catch (error) {
      alert('Erreur lors du changement de statut');
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Blog" module="blog">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Blog" module="blog">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-0" style={{ color: '#1a1a2e' }}>Articles du Blog</h1>
          <p className="text-muted small mt-1">Gérez les articles de blog ICS GROUPE</p>
        </div>
        <Link href="/admin/blog/new">
          <span className="btn btn-ics-primary">
            ➕ Nouvel Article
          </span>
        </Link>
      </div>

      {/* Statistiques rapides */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="stat-mini-card">
            <span className="stat-mini-value">{items.length}</span>
            <span className="stat-mini-label">Total articles</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-mini-card success">
            <span className="stat-mini-value">{items.filter(s => s.isPublished).length}</span>
            <span className="stat-mini-label">Publiés</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-mini-card warning">
            <span className="stat-mini-value">{items.filter(s => !s.isPublished).length}</span>
            <span className="stat-mini-label">Brouillons</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-mini-card info">
            <span className="stat-mini-value">{items.filter(s => s.isFeatured).length}</span>
            <span className="stat-mini-label">En vedette ⭐</span>
          </div>
        </div>
      </div>

      {/* Tableau */}
      <div className="table-container">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th style={{ width: '50px' }}>#</th>
                <th style={{ width: '70px' }}>Image</th>
                <th>Titre</th>
                <th style={{ width: '120px' }}>Auteur</th>
                <th style={{ width: '130px' }}>Tags</th>
                <th style={{ width: '150px' }}>Statut</th>
                <th style={{ width: '170px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    {item.featuredImage ? (
                      <img 
                        src={item.featuredImage} 
                        alt={item.title} 
                        className="article-thumbnail" 
                      />
                    ) : (
                      <div className="article-thumbnail-placeholder">
                        <span>📝</span>
                      </div>
                    )}
                  </td>
                  <td>
                    <span className="fw-medium">{item.title}</span>
                  </td>
                  <td>{item.author || <span className="text-muted">ICS GROUPE</span>}</td>
                  <td>
                    {item.tags && item.tags.length > 0 ? (
                      <div className="tags-container">
                        {item.tags.slice(0, 2).map((tag, i) => (
                          <span key={i} className="tag-badge">{tag}</span>
                        ))}
                        {item.tags.length > 2 && (
                          <span className="tag-badge more">+{item.tags.length - 2}</span>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td>
                    <div className="status-group">
                      <button 
                        onClick={() => handleTogglePublish(item.id)}
                        className={`status-badge ${item.isPublished ? 'published' : 'draft'}`}
                      >
                        {item.isPublished ? '✅ Publié' : '📄 Brouillon'}
                      </button>
                      {item.isFeatured && (
                        <span className="featured-badge">⭐ Vedette</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link href={`/admin/blog/${item.id}`}>
                        <span className="btn-action edit" title="Modifier">✏️</span>
                      </Link>
                      <button 
                        onClick={() => handleTogglePublish(item.id)} 
                        className="btn-action toggle-publish"
                        title={item.isPublished ? 'Mettre en brouillon' : 'Publier'}
                      >
                        {item.isPublished ? '📌' : '📄'}
                      </button>
                      <button 
                        onClick={() => handleToggleFeatured(item.id)} 
                        className={`btn-action toggle-featured ${item.isFeatured ? 'active' : ''}`}
                        title={item.isFeatured ? 'Retirer de la une' : 'Mettre en une'}
                      >
                        ⭐
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        className="btn-action delete"
                        title="Supprimer"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    <div className="empty-state">
                      <span className="empty-icon">✍️</span>
                      <p className="empty-text">Aucun article dans le blog</p>
                      <Link href="/admin/blog/new">
                        <span className="btn btn-ics-primary btn-sm">Écrire votre premier article</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .btn-ics-primary {
          background: linear-gradient(135deg, #1B5E20, #4CAF50);
          color: #fff;
          border: none;
          padding: 10px 20px;
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

        .stat-mini-card {
          background: #fff;
          border-radius: 12px;
          padding: 16px 20px;
          border: 1px solid #eef0f2;
          text-align: center;
          transition: all 0.3s ease;
        }
        .stat-mini-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        }
        .stat-mini-card .stat-mini-value {
          display: block;
          font-size: 24px;
          font-weight: 700;
          color: #1a1a2e;
        }
        .stat-mini-card .stat-mini-label {
          font-size: 12px;
          color: #8c8f9c;
          font-weight: 500;
        }
        .stat-mini-card.success .stat-mini-value { color: #4CAF50; }
        .stat-mini-card.warning .stat-mini-value { color: #F57C00; }
        .stat-mini-card.info .stat-mini-value { color: #1565C0; }

        .table-container {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #eef0f2;
          overflow: hidden;
        }

        .table {
          margin-bottom: 0;
        }
        .table thead {
          background: #f8f9fb;
        }
        .table thead th {
          padding: 14px 16px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #4a4d5e;
          border-bottom: none;
        }
        .table tbody td {
          padding: 12px 16px;
          vertical-align: middle;
          border-bottom: 1px solid #f0f1f3;
        }
        .table tbody tr:hover {
          background: #f8f9fb;
        }

        .article-thumbnail {
          width: 50px;
          height: 50px;
          border-radius: 8px;
          object-fit: cover;
          border: 1px solid #eef0f2;
        }

        .article-thumbnail-placeholder {
          width: 50px;
          height: 50px;
          border-radius: 8px;
          background: #f8f9fb;
          border: 1px solid #eef0f2;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #c0c2c8;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
        .tag-badge {
          background: #F3E5F5;
          color: #6A1B9A;
          padding: 2px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;
        }
        .tag-badge.more {
          background: #ECEFF1;
          color: #546E7A;
        }

        .status-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: flex-start;
        }

        .status-badge {
          border: none;
          padding: 4px 14px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .status-badge.published {
          background: #E8F5E9;
          color: #1B5E20;
        }
        .status-badge.published:hover {
          background: #C8E6C9;
        }
        .status-badge.draft {
          background: #FFF3E0;
          color: #E65100;
        }
        .status-badge.draft:hover {
          background: #FFE0B2;
        }

        .featured-badge {
          background: #FFF8E1;
          color: #F57F17;
          padding: 2px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          display: inline-block;
        }

        .action-buttons {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }
        .btn-action {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
          text-decoration: none;
        }
        .btn-action.edit {
          background: #E3F2FD;
          color: #1565C0;
        }
        .btn-action.edit:hover {
          background: #BBDEFB;
          transform: scale(1.05);
        }
        .btn-action.toggle-publish {
          background: #F3E5F5;
          color: #6A1B9A;
        }
        .btn-action.toggle-publish:hover {
          background: #E1BEE7;
          transform: scale(1.05);
        }
        .btn-action.toggle-featured {
          background: #FFF8E1;
          color: #F57F17;
        }
        .btn-action.toggle-featured:hover {
          background: #FFECB3;
          transform: scale(1.05);
        }
        .btn-action.toggle-featured.active {
          background: #FFD54F;
          color: #E65100;
        }
        .btn-action.delete {
          background: #FFEBEE;
          color: #C62828;
        }
        .btn-action.delete:hover {
          background: #FFCDD2;
          transform: scale(1.05);
        }

        .empty-state {
          padding: 40px 20px;
        }
        .empty-icon {
          font-size: 48px;
          display: block;
          margin-bottom: 12px;
        }
        .empty-text {
          color: #8c8f9c;
          margin-bottom: 16px;
          font-size: 16px;
        }

        @media (max-width: 768px) {
          .stat-mini-card .stat-mini-value {
            font-size: 20px;
          }
          .table thead th {
            font-size: 10px;
          }
          .table tbody td {
            font-size: 13px;
            padding: 10px 12px;
          }
          .article-thumbnail,
          .article-thumbnail-placeholder {
            width: 40px;
            height: 40px;
          }
          .action-buttons {
            gap: 3px;
          }
          .btn-action {
            width: 28px;
            height: 28px;
            font-size: 12px;
          }
        }
      `}</style>
    </AdminLayout>
  );
}

