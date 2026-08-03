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
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

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

  const filteredItems = items.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                        item.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = filterStatus === 'all' || 
                        (filterStatus === 'published' && item.isPublished) ||
                        (filterStatus === 'draft' && !item.isPublished) ||
                        (filterStatus === 'featured' && item.isFeatured);
    return matchSearch && matchStatus;
  });

  const stats = {
    total: items.length,
    published: items.filter(s => s.isPublished).length,
    draft: items.filter(s => !s.isPublished).length,
    featured: items.filter(s => s.isFeatured).length,
  };

  if (loading) {
    return (
      <AdminLayout title="Blog" module="blog">
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Blog" module="blog">
      <div className="admin-header">
        <div className="header-left">
          <h1 className="header-title">📝 Gestion du Blog</h1>
          <p className="header-desc">Gérez les articles de blog ICS GROUPE</p>
        </div>
        <Link href="/admin/blog/new">
          <span className="btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Nouvel Article
          </span>
        </Link>
      </div>

      {/* ===== STATS ===== */}
      <div className="stats-grid">
        <div className="stat-card total">
          <span className="stat-icon">📚</span>
          <div>
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total articles</span>
          </div>
        </div>
        <div className="stat-card published">
          <span className="stat-icon">✅</span>
          <div>
            <span className="stat-value">{stats.published}</span>
            <span className="stat-label">Publiés</span>
          </div>
        </div>
        <div className="stat-card draft">
          <span className="stat-icon">📄</span>
          <div>
            <span className="stat-value">{stats.draft}</span>
            <span className="stat-label">Brouillons</span>
          </div>
        </div>
        <div className="stat-card featured">
          <span className="stat-icon">⭐</span>
          <div>
            <span className="stat-value">{stats.featured}</span>
            <span className="stat-label">En vedette</span>
          </div>
        </div>
      </div>

      {/* ===== FILTERS ===== */}
      <div className="filters-bar">
        <div className="filters-left">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Rechercher un article..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select 
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tous les statuts</option>
            <option value="published">✅ Publiés</option>
            <option value="draft">📄 Brouillons</option>
            <option value="featured">⭐ En vedette</option>
          </select>
        </div>
        <span className="results-count">{filteredItems.length} résultat(s)</span>
      </div>

      {/* ===== TABLE ===== */}
      <div className="table-container">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Titre</th>
                <th>Auteur</th>
                <th>Tags</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={item.id}>
                  <td className="col-index">{index + 1}</td>
                  <td>
                    {item.featuredImage ? (
                      <img src={item.featuredImage} alt={item.title} className="thumbnail" />
                    ) : (
                      <div className="thumbnail-placeholder">📝</div>
                    )}
                  </td>
                  <td>
                    <span className="title-text">{item.title}</span>
                    <span className="title-slug">/{item.slug}</span>
                  </td>
                  <td>{item.authorName || <span className="text-muted">ICS GROUPE</span>}</td>
                  <td>
                    <div className="tags-wrapper">
                      {item.tags?.slice(0, 2).map((tag, i) => (
                        <span key={i} className="tag">#{tag}</span>
                      ))}
                      {item.tags?.length > 2 && (
                        <span className="tag-more">+{item.tags.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="status-wrapper">
                      <button 
                        onClick={() => handleTogglePublish(item.id)}
                        className={`status-badge ${item.isPublished ? 'published' : 'draft'}`}
                      >
                        {item.isPublished ? '✅ Publié' : '📄 Brouillon'}
                      </button>
                      {item.isFeatured && (
                        <span className="featured-badge">⭐</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="actions">
                      <Link href={`/admin/blog/${item.slug}`} title="Voir">
                        <span className="action-btn view">👁️</span>
                      </Link>
                      <Link href={`/admin/blog/edit/${item.slug}`} title="Modifier">
                        <span className="action-btn edit">✏️</span>
                      </Link>
                      <button 
                        onClick={() => handleTogglePublish(item.id)} 
                        className="action-btn toggle"
                        title={item.isPublished ? 'Mettre en brouillon' : 'Publier'}
                      >
                        {item.isPublished ? '📌' : '📄'}
                      </button>
                      <button 
                        onClick={() => handleToggleFeatured(item.id)} 
                        className={`action-btn featured ${item.isFeatured ? 'active' : ''}`}
                        title={item.isFeatured ? 'Retirer de la une' : 'Mettre en une'}
                      >
                        ⭐
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        className="action-btn delete"
                        title="Supprimer"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan="7" className="empty-state">
                    <span className="empty-icon">✍️</span>
                    <p className="empty-text">Aucun article trouvé</p>
                    <Link href="/admin/blog/new">
                      <span className="btn-primary btn-sm">Écrire votre premier article</span>
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        /* ===== HEADER ===== */
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .header-title {
          font-size: 24px;
          font-weight: 700;
          color: #0A0A2E;
          margin: 0;
        }
        .header-desc {
          color: #6b7280;
          margin: 4px 0 0;
          font-size: 14px;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          background: linear-gradient(135deg, #1B5E20, #4CAF50);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          font-size: 14px;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(27, 94, 32, 0.25);
          color: #fff;
        }
        .btn-primary.btn-sm {
          padding: 8px 18px;
          font-size: 13px;
        }

        /* ===== STATS ===== */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }
        .stat-card {
          background: #fff;
          border-radius: 14px;
          padding: 18px 22px;
          border: 1px solid #eef0f2;
          display: flex;
          align-items: center;
          gap: 14px;
          transition: all 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
        }
        .stat-icon {
          font-size: 28px;
        }
        .stat-value {
          display: block;
          font-size: 22px;
          font-weight: 700;
          color: #0A0A2E;
          line-height: 1.2;
        }
        .stat-label {
          font-size: 12px;
          color: #8c8f9c;
          font-weight: 500;
        }
        .stat-card.published .stat-value { color: #4CAF50; }
        .stat-card.draft .stat-value { color: #F57C00; }
        .stat-card.featured .stat-value { color: #F57F17; }

        /* ===== FILTERS ===== */
        .filters-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 20px;
          background: #fff;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid #eef0f2;
        }
        .filters-left {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .search-input {
          padding: 8px 14px;
          border: 1px solid #eef0f2;
          border-radius: 8px;
          font-size: 14px;
          min-width: 200px;
          transition: border-color 0.3s ease;
          background: #f8f9fb;
        }
        .search-input:focus {
          outline: none;
          border-color: #4CAF50;
          background: #fff;
        }
        .filter-select {
          padding: 8px 14px;
          border: 1px solid #eef0f2;
          border-radius: 8px;
          font-size: 14px;
          background: #f8f9fb;
          cursor: pointer;
        }
        .results-count {
          font-size: 13px;
          color: #8c8f9c;
          font-weight: 500;
        }

        /* ===== TABLE ===== */
        .table-container {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #eef0f2;
          overflow: hidden;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
          margin: 0;
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
          text-align: left;
        }
        .table tbody td {
          padding: 12px 16px;
          vertical-align: middle;
          border-bottom: 1px solid #f0f1f3;
          font-size: 14px;
        }
        .table tbody tr:hover {
          background: #f8f9fb;
        }
        .table tbody tr:last-child td {
          border-bottom: none;
        }

        .col-index {
          width: 40px;
          color: #8c8f9c;
          font-weight: 500;
        }
        .thumbnail {
          width: 50px;
          height: 50px;
          border-radius: 8px;
          object-fit: cover;
          border: 1px solid #eef0f2;
        }
        .thumbnail-placeholder {
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
        .title-text {
          font-weight: 500;
          color: #0A0A2E;
        }
        .title-slug {
          display: block;
          font-size: 12px;
          color: #8c8f9c;
        }

        .tags-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
        .tag {
          background: #F3E5F5;
          color: #6A1B9A;
          padding: 2px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;
        }
        .tag-more {
          background: #ECEFF1;
          color: #546E7A;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 11px;
        }

        .status-wrapper {
          display: flex;
          align-items: center;
          gap: 6px;
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
          font-size: 14px;
        }

        .actions {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }
        .action-btn {
          width: 34px;
          height: 34px;
          border: none;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
          text-decoration: none;
          background: transparent;
        }
        .action-btn:hover {
          transform: scale(1.05);
        }
        .action-btn.view {
          background: #E3F2FD;
          color: #1565C0;
        }
        .action-btn.view:hover { background: #BBDEFB; }
        .action-btn.edit {
          background: #E8F5E9;
          color: #1B5E20;
        }
        .action-btn.edit:hover { background: #C8E6C9; }
        .action-btn.toggle {
          background: #F3E5F5;
          color: #6A1B9A;
        }
        .action-btn.toggle:hover { background: #E1BEE7; }
        .action-btn.featured {
          background: #FFF8E1;
          color: #F57F17;
        }
        .action-btn.featured:hover { background: #FFECB3; }
        .action-btn.featured.active {
          background: #FFD54F;
          color: #E65100;
        }
        .action-btn.delete {
          background: #FFEBEE;
          color: #C62828;
        }
        .action-btn.delete:hover { background: #FFCDD2; }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
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
          .stats-grid { grid-template-columns: 1fr 1fr; }
          .filters-bar { flex-direction: column; align-items: stretch; }
          .filters-left { flex-direction: column; }
          .search-input { min-width: auto; width: 100%; }
          .admin-header { flex-direction: column; align-items: flex-start; }
          .table-container { overflow-x: auto; }
          .table { font-size: 13px; }
          .thumbnail, .thumbnail-placeholder { width: 40px; height: 40px; }
          .action-btn { width: 30px; height: 30px; font-size: 12px; }
        }
      `}</style>
    </AdminLayout>
  );
}