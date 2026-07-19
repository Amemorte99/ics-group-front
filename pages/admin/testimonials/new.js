// pages/admin/testimonials/new.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { adminTestimonialApi, authApi } from '../../../utils/adminApi';
import AdminLayout from '../../../components/AdminLayout';

export default function NewTestimonial() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    clientName: '',
    clientPosition: '',
    clientCompany: '',
    content: '',
    rating: 5,
    photo: '',
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
      await adminTestimonialApi.create(formData);
      router.push('/admin/testimonials');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création');
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Nouveau Témoignage" module="testimonials">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Nouveau Témoignage</h1>
        <Link href="/admin/testimonials" className="btn btn-secondary">← Retour</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card shadow p-4">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Nom du client *</label>
            <input
              type="text"
              name="clientName"
              className="form-control"
              value={formData.clientName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Poste</label>
            <input
              type="text"
              name="clientPosition"
              className="form-control"
              value={formData.clientPosition}
              onChange={handleChange}
              placeholder="CEO, Directeur, etc."
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Entreprise</label>
            <input
              type="text"
              name="clientCompany"
              className="form-control"
              value={formData.clientCompany}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Note (1-5)</label>
            <select
              name="rating"
              className="form-select"
              value={formData.rating}
              onChange={handleChange}
            >
              <option value="5">⭐⭐⭐⭐⭐ (5)</option>
              <option value="4">⭐⭐⭐⭐ (4)</option>
              <option value="3">⭐⭐⭐ (3)</option>
              <option value="2">⭐⭐ (2)</option>
              <option value="1">⭐ (1)</option>
            </select>
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Photo (URL)</label>
            <input
              type="text"
              name="photo"
              className="form-control"
              value={formData.photo}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Témoignage *</label>
            <textarea
              name="content"
              className="form-control"
              rows="4"
              value={formData.content}
              onChange={handleChange}
              required
              placeholder="Le témoignage du client..."
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
              {loading ? 'Création...' : 'Créer le témoignage'}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}