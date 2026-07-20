// pages/admin/partners/new.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { adminPartnerApi, authApi } from '../../../utils/adminApi';
import AdminLayout from '../../../components/AdminLayout';

export default function NewPartner() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    website: '',
    category: '',
    description: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await adminPartnerApi.create(formData);
      router.push('/admin/partners');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création');
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Nouveau Partenaire" module="partners">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Nouveau Partenaire</h1>
        <Link href="/admin/partners" ><span class="btn btn-secondary">← Retour</span></Link>
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
            <label className="form-label">Catégorie</label>
            <input
              type="text"
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
              placeholder="Technologie, Énergie, etc."
            />
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Logo (URL) *</label>
            <input
              type="text"
              name="logo"
              className="form-control"
              value={formData.logo}
              onChange={handleChange}
              placeholder="https://example.com/logo.png"
              required
            />
            {formData.logo && (
              <div className="mt-2">
                <img src={formData.logo} alt={formData.name} style={{ maxHeight: '80px', objectFit: 'contain' }} />
              </div>
            )}
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Site Web</label>
            <input
              type="url"
              name="website"
              className="form-control"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://partenaire.com"
            />
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="3"
              value={formData.description}
              onChange={handleChange}
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
              {loading ? 'Création...' : 'Créer le partenaire'}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}

