// pages/admin/testimonials/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { adminTestimonialApi, authApi } from '../../../utils/adminApi';
import AdminLayout from '../../../components/AdminLayout';

export default function EditTestimonial() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    clientName: '',
    clientPosition: '',
    clientCompany: '',
    content: '',
    rating: 5,
    photo: '',
    isActive: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authApi.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    if (id) {
      fetchItem();
    }
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await adminTestimonialApi.getById(id);
      setFormData(response.data);
    } catch (error) {
      console.error('Erreur:', error);
      setError('Témoignage non trouvé');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await adminTestimonialApi.update(id, formData);
      router.push('/admin/testimonials');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour');
      setSaving(false);
    }
  };

  if (loading) {
    return <AdminLayout title="Modifier Témoignage"><div className="text-center py-5">Chargement...</div></AdminLayout>;
  }

  return (
    <AdminLayout title="Modifier Témoignage" module="testimonials">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Modifier : {formData.clientName}</h1>
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
            />
            {formData.photo && (
              <div className="mt-2">
                <img src={formData.photo} alt="Prévisualisation" style={{ maxHeight: '100px', borderRadius: '50%' }} />
              </div>
            )}
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
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}