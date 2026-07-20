// pages/admin/services/index.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { adminServiceApi, authApi } from '../../../utils/adminApi';
import AdminLayout from '../../../components/AdminLayout';

export default function AdminServices() {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authApi.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await adminServiceApi.getAll();
      setServices(response.data || []);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      try {
        await adminServiceApi.delete(id);
        fetchServices();
      } catch (error) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await adminServiceApi.update(id, { isActive: !currentStatus });
      fetchServices();
    } catch (error) {
      alert('Erreur lors du changement de statut');
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Services" module="services">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Services" module="services">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-0" style={{ color: '#1a1a2e' }}>Services</h1>
          <p className="text-muted small mt-1">Gérez les services proposés par ICS GROUPE</p>
        </div>
        {/* ✅ CORRECTION : Link avec un seul enfant span */}
        <Link href="/admin/services/new">
          <span className="btn btn-ics-primary">➕ Nouveau Service</span>
        </Link>
      </div>

      {/* Statistiques */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="stat-mini-card">
            <span className="stat-mini-value">{services.length}</span>
            <span className="stat-mini-label">Total</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-mini-card success">
            <span className="stat-mini-value">{services.filter(s => s.isActive).length}</span>
            <span className="stat-mini-label">Actifs</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-mini-card danger">
            <span className="stat-mini-value">{services.filter(s => !s.isActive).length}</span>
            <span className="stat-mini-label">Inactifs</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-mini-card info">
            <span className="stat-mini-value">{services.reduce((max, s) => Math.max(max, s.order || 0), 0)}</span>
            <span className="stat-mini-label">Ordre max</span>
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
                <th>Nom</th>
                <th>Slug</th>
                <th style={{ width: '80px' }}>Ordre</th>
                <th style={{ width: '100px' }}>Statut</th>
                <th style={{ width: '180px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={service.id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      {service.icon && (
                        <img 
                          src={service.icon} 
                          alt={service.name} 
                          style={{ width: '30px', height: '30px', objectFit: 'contain', marginRight: '12px' }} 
                        />
                      )}
                      <span className="fw-medium">{service.name}</span>
                    </div>
                  </td>
                  <td>
                    <code className="slug-code">{service.slug}</code>
                  </td>
                  <td className="text-center">{service.order || 0}</td>
                  <td>
                    <button 
                      onClick={() => handleToggleStatus(service.id, service.isActive)}
                      className={`status-badge ${service.isActive ? 'active' : 'inactive'}`}
                    >
                      {service.isActive ? '✅ Actif' : '⛔ Inactif'}
                    </button>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link href={`/admin/services/${service.id}`}>
                        <span className="btn-action edit" title="Modifier">✏️</span>
                      </Link>
                      <button 
                        onClick={() => handleDelete(service.id)} 
                        className="btn-action delete"
                        title="Supprimer"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    <div className="empty-state">
                      <span className="empty-icon">📦</span>
                      <p className="empty-text">Aucun service trouvé</p>
                      <Link href="/admin/services/new">
                        <span className="btn btn-ics-primary btn-sm">Créer votre premier service</span>
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
        .stat-mini-card.danger .stat-mini-value { color: #EF5350; }
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
          padding: 14px 16px;
          vertical-align: middle;
          border-bottom: 1px solid #f0f1f3;
        }
        .table tbody tr:hover {
          background: #f8f9fb;
        }

        .slug-code {
          background: #f0f1f3;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 13px;
          color: #4a4d5e;
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
        }
      `}</style>
    </AdminLayout>
  );
}