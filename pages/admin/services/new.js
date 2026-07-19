// pages/admin/services/new.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { adminServiceApi, authApi } from '../../../utils/adminApi';
import AdminLayout from '../../../components/AdminLayout';

export default function NewService() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    icon: '',
    features: [],
    order: 0,
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authApi.isAuthenticated()) {
      router.push('/admin/login');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFeatures = (e) => {
    const features = e.target.value.split('\n').filter(f => f.trim());
    setFormData({ ...formData, features });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await adminServiceApi.create(formData);
      router.push('/admin/services');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création');
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Nouveau Service" module="services">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Nouveau Service</h1>
        <Link href="/admin/services" className="btn btn-secondary">← Retour</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card shadow p-4">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Nom *</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Slug *</label>
            <input
              type="text"
              name="slug"
              className="form-control"
              value={formData.slug}
              onChange={handleChange}
              placeholder="ex: cybersecurite"
              required
            />
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Description *</label>
            <textarea
              name="description"
              className="form-control"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Icône (URL)</label>
            <input
              type="text"
              name="icon"
              className="form-control"
              value={formData.icon}
              onChange={handleChange}
              placeholder="https://example.com/icon.png"
            />
            {formData.icon && (
              <div className="mt-2">
                <img src={formData.icon} alt="Icône" style={{ maxHeight: '60px' }} />
              </div>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Ordre d'affichage</label>
            <input
              type="number"
              name="order"
              className="form-control"
              value={formData.order}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Fonctionnalités (une par ligne)</label>
            <textarea
              className="form-control"
              rows="5"
              onChange={handleFeatures}
              placeholder="Audit & conseil en sécurité&#10;Déploiement de solutions de protection&#10;Continuité d'activité"
            />
          </div>

          <div className="col-12 mb-3 form-check">
            <input
              type="checkbox"
              name="isActive"
              className="form-check-input"
              checked={formData.isActive}
              onChange={handleChange}
            />
            <label className="form-check-label">Actif</label>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Création...' : 'Créer le service'}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}