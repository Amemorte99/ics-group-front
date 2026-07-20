// pages/admin/portfolios/index.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { adminPortfolioApi, authApi } from '../../../utils/adminApi';
import AdminLayout from '../../../components/AdminLayout';

export default function AdminPortfolios() {
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
      const response = await adminPortfolioApi.getAll();
      setItems(response.data || []);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      try {
        await adminPortfolioApi.delete(id);
        fetchItems();
      } catch (error) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await adminPortfolioApi.update(id, { isActive: !currentStatus });
      fetchItems();
    } catch (error) {
      alert('Erreur lors du changement de statut');
    }
  };

  // Compter les projets par catégorie
  const categoryCount = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  if (loading) {
    return (
      <AdminLayout title="Portfolio" module="portfolios">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Portfolio" module="portfolios">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-0" style={{ color: '#1a1a2e' }}>Portfolio</h1>
          <p className="text-muted small mt-1">Gérez les projets réalisés par ICS GROUPE</p>
        </div>
        <Link href="/admin/portfolios/new">
          <span className="btn btn-ics-primary">
            ➕ Nouveau Projet
          </span>
        </Link>
      </div>

      {/* Statistiques rapides */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="stat-mini-card">
            <span className="stat-mini-value">{items.length}</span>
            <span className="stat-mini-label">Total projets</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-mini-card success">
            <span className="stat-mini-value">{items.filter(s => s.isActive).length}</span>
            <span className="stat-mini-label">Actifs</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-mini-card warning">
            <span className="stat-mini-value">{Object.keys(categoryCount).length}</span>
            <span className="stat-mini-label">Catégories</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-mini-card info">
            <span className="stat-mini-value">{items.filter(s => s.client).length}</span>
            <span className="stat-mini-label">Avec client</span>
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
                <th style={{ width: '80px' }}>Image</th>
                <th>Titre</th>
                <th style={{ width: '120px' }}>Catégorie</th>
                <th style={{ width: '120px' }}>Client</th>
                <th style={{ width: '100px' }}>Statut</th>
                <th style={{ width: '160px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="project-thumbnail" 
                      />
                    ) : (
                      <div className="project-thumbnail-placeholder">
                        <span>📷</span>
                      </div>
                    )}
                  </td>
                  <td>
                    <span className="fw-medium">{item.title}</span>
                  </td>
                  <td>
                    <span className="category-badge">{item.category}</span>
                  </td>
                  <td>{item.client || <span className="text-muted">—</span>}</td>
                  <td>
                    <button 
                      onClick={() => handleToggleStatus(item.id, item.isActive)}
                      className={`status-badge ${item.isActive ? 'active' : 'inactive'}`}
                    >
                      {item.isActive ? '✅ Actif' : '⛔ Inactif'}
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link href={`/admin/portfolios/${item.id}`}>
                        <span className="btn-action edit" title="Modifier">✏️</span>
                      </Link>
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
                      <span className="empty-icon">🎨</span>
                      <p className="empty-text">Aucun projet dans le portfolio</p>
                      <Link href="/admin/portfolios/new">
                        <span className="btn btn-ics-primary btn-sm">Ajouter votre premier projet</span>
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

        .project-thumbnail {
          width: 50px;
          height: 50px;
          border-radius: 8px;
          object-fit: cover;
          border: 1px solid #eef0f2;
        }

        .project-thumbnail-placeholder {
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

        .category-badge {
          background: #E3F2FD;
          color: #1565C0;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          display: inline-block;
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
        .status-badge.active {
          background: #E8F5E9;
          color: #1B5E20;
        }
        .status-badge.active:hover {
          background: #C8E6C9;
        }
        .status-badge.inactive {
          background: #FFEBEE;
          color: #C62828;
        }
        .status-badge.inactive:hover {
          background: #FFCDD2;
        }

        .action-buttons {
          display: flex;
          gap: 6px;
        }
        .btn-action {
          width: 34px;
          height: 34px;
          border: none;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 16px;
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
          .project-thumbnail,
          .project-thumbnail-placeholder {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </AdminLayout>
  );
}

