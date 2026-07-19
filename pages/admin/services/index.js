// pages/admin/services/index.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { adminServiceApi, authApi } from '../../../utils/adminApi';

export default function AdminServices() {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

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

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-2 d-md-block bg-dark vh-100 p-3">
          <h5 className="text-white mb-4">ICS Admin</h5>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link href="/admin" className="nav-link text-white">📊 Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/services" className="nav-link text-white active">📦 Services</Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/portfolios" className="nav-link text-white">🎨 Portfolio</Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/blog" className="nav-link text-white">📝 Blog</Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/testimonials" className="nav-link text-white">💬 Témoignages</Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/partners" className="nav-link text-white">🤝 Partenaires</Link>
            </li>
            <li className="nav-item mt-3">
              <button onClick={() => authApi.logout()} className="btn btn-danger w-100">
                🚪 Déconnexion
              </button>
            </li>
          </ul>
        </nav>

        {/* Main */}
        <main className="col-md-10 ms-sm-auto px-md-4 py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Services</h1>
            <Link href="/admin/services/new" className="btn btn-primary">
              ➕ Nouveau Service
            </Link>
          </div>

          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nom</th>
                  <th>Slug</th>
                  <th>Ordre</th>
                  <th>Actif</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr key={service.id}>
                    <td>{index + 1}</td>
                    <td>{service.name}</td>
                    <td><code>{service.slug}</code></td>
                    <td>{service.order || 0}</td>
                    <td>
                      <span className={`badge ${service.isActive ? 'bg-success' : 'bg-danger'}`}>
                        {service.isActive ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td>
                      <Link href={`/admin/services/${service.id}`} className="btn btn-sm btn-primary me-1">
                        ✏️
                      </Link>
                      <button onClick={() => handleDelete(service.id)} className="btn btn-sm btn-danger">
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
                {services.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      Aucun service trouvé
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}