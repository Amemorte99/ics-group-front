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
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

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

  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentImgIndex(0);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      setSelectedProject(null);
      setCurrentImgIndex(0);
    }, 300);
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    if (selectedProject) {
      const images = selectedProject.images?.length > 0 ? selectedProject.images : [selectedProject.image];
      setCurrentImgIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    if (selectedProject) {
      const images = selectedProject.images?.length > 0 ? selectedProject.images : [selectedProject.image];
      setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

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
          <span className="btn btn-ics-primary">➕ Nouveau Projet</span>
        </Link>
      </div>

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

      <div className="table-container">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th style={{ width: '50px' }}>#</th>
                <th style={{ width: '60px' }}>Image</th>
                <th>Titre</th>
                <th style={{ width: '110px' }}>Catégorie</th>
                <th style={{ width: '110px' }}>Client</th>
                <th style={{ width: '90px' }}>Statut</th>
                <th style={{ width: '190px' }}>Actions</th>
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
                      <button 
                        onClick={() => openModal(item)}
                        className="btn-action view"
                        title="Aperçu"
                      >
                        👁️
                      </button>
                      <Link href={`/admin/portfolios/${item.slug}`}>
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

      {/* Modal de prévisualisation */}
      {isModalOpen && selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>

            <div className="modal-content">
              {/* Images */}
              <div className="modal-images">
                <div className="main-image-container">
                  {(() => {
                    const images = selectedProject.images?.length > 0 
                      ? selectedProject.images 
                      : selectedProject.image 
                        ? [selectedProject.image] 
                        : ['/images/placeholder.png'];
                    return (
                      <>
                        <img
                          src={images[currentImgIndex]}
                          alt={selectedProject.title}
                          className="main-image"
                        />
                        {images.length > 1 && (
                          <>
                            <button className="nav-btn prev" onClick={prevImage}>‹</button>
                            <button className="nav-btn next" onClick={nextImage}>›</button>
                            <div className="image-counter">
                              {currentImgIndex + 1} / {images.length}
                            </div>
                          </>
                        )}
                      </>
                    );
                  })()}
                </div>
                {(() => {
                  const images = selectedProject.images?.length > 0 
                    ? selectedProject.images 
                    : selectedProject.image 
                      ? [selectedProject.image] 
                      : ['/images/placeholder.png'];
                  return images.length > 1 && (
                    <div className="thumbnails">
                      {images.map((img, index) => (
                        <button
                          key={index}
                          className={`thumbnail-btn ${index === currentImgIndex ? 'active' : ''}`}
                          onClick={() => setCurrentImgIndex(index)}
                        >
                          <img src={img} alt={`Miniature ${index + 1}`} />
                        </button>
                      ))}
                    </div>
                  );
                })()}
              </div>

              {/* Infos */}
              <div className="modal-info">
                <h2 className="modal-title">{selectedProject.title}</h2>
                <div className="modal-meta">
                  <span className="modal-category">{selectedProject.category}</span>
                  {selectedProject.client && (
                    <span className="modal-client">👤 {selectedProject.client}</span>
                  )}
                  {selectedProject.completionDate && (
                    <span className="modal-date">
                      📅 {new Date(selectedProject.completionDate).toLocaleDateString('fr-FR')}
                    </span>
                  )}
                </div>
                <p className="modal-description">{selectedProject.description}</p>
                {selectedProject.link && (
                  <a 
                    href={selectedProject.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="modal-link"
                  >
                    🔗 Voir le projet en ligne
                  </a>
                )}
                <div className="modal-actions-footer">
                  <span className={`status-badge ${selectedProject.isActive ? 'active' : 'inactive'}`}>
                    {selectedProject.isActive ? '✅ Actif' : '⛔ Inactif'}
                  </span>
                  <Link href={`/admin/portfolios/${selectedProject.slug}`}>
                    <span className="btn-edit">✏️ Modifier</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
          width: 40px;
          height: 40px;
          border-radius: 8px;
          object-fit: cover;
          border: 1px solid #eef0f2;
        }
        .project-thumbnail-placeholder {
          width: 40px;
          height: 40px;
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
          gap: 4px;
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
        .btn-action.view {
          background: #E8F5E9;
          color: #1B5E20;
        }
        .btn-action.view:hover {
          background: #C8E6C9;
          transform: scale(1.05);
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

        /* ===== MODAL ===== */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-container {
          background: #fff;
          border-radius: 20px;
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          overflow: auto;
          position: relative;
          animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .modal-close {
          position: absolute;
          top: 12px;
          right: 16px;
          font-size: 28px;
          background: none;
          border: none;
          cursor: pointer;
          color: #4a4d5e;
          z-index: 10;
          transition: transform 0.3s ease;
          padding: 4px 8px;
        }

        .modal-close:hover {
          transform: rotate(90deg);
        }

        .modal-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
        }

        .modal-images {
          background: #f8fafc;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .main-image-container {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: #fff;
          aspect-ratio: 1.3;
        }

        .main-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,0.9);
          cursor: pointer;
          font-size: 20px;
          transition: all 0.3s ease;
        }

        .nav-btn:hover {
          background: #fff;
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
        }

        .nav-btn.prev { left: 10px; }
        .nav-btn.next { right: 10px; }

        .image-counter {
          position: absolute;
          bottom: 12px;
          right: 12px;
          background: rgba(0,0,0,0.6);
          color: #fff;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 13px;
        }

        .thumbnails {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .thumbnail-btn {
          width: 60px;
          height: 44px;
          border-radius: 6px;
          overflow: hidden;
          border: 2px solid transparent;
          cursor: pointer;
          padding: 0;
          transition: all 0.3s ease;
        }

        .thumbnail-btn.active {
          border-color: #1B5E20;
          box-shadow: 0 0 0 3px rgba(27, 94, 32, 0.15);
        }

        .thumbnail-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-info {
          padding: 32px;
          display: flex;
          flex-direction: column;
        }

        .modal-title {
          font-size: 24px;
          font-weight: 700;
          color: #0A0A2E;
          margin: 0 0 12px 0;
        }

        .modal-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 16px;
        }

        .modal-category {
          background: #E3F2FD;
          color: #1565C0;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
        }

        .modal-client, .modal-date {
          font-size: 14px;
          color: #4a4d5e;
        }

        .modal-description {
          font-size: 15px;
          line-height: 1.8;
          color: #4a4d5e;
          flex: 1;
          margin: 0 0 16px 0;
        }

        .modal-link {
          color: #1B5E20;
          text-decoration: none;
          font-weight: 500;
          margin-bottom: 16px;
          display: inline-block;
        }

        .modal-link:hover {
          text-decoration: underline;
        }

        .modal-actions-footer {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 16px;
          border-top: 1px solid #eef0f2;
          margin-top: auto;
        }

        .btn-edit {
          background: linear-gradient(135deg, #1B5E20, #4CAF50);
          color: #fff;
          padding: 8px 20px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
          text-decoration: none;
        }

        .btn-edit:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(27, 94, 32, 0.2);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .modal-content {
            grid-template-columns: 1fr;
          }
          .modal-images {
            padding: 16px;
          }
          .modal-info {
            padding: 20px;
          }
          .modal-overlay {
            padding: 16px;
          }
          .main-image-container {
            aspect-ratio: 1.2;
          }
          .thumbnail-btn {
            width: 50px;
            height: 36px;
          }
        }
      `}</style>
    </AdminLayout>
  );
}