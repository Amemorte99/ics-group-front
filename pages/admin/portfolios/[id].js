// pages/admin/portfolios/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { adminPortfolioApi, authApi } from '../../../utils/adminApi';
import AdminLayout from '../../../components/AdminLayout';

export default function EditPortfolio() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    image: '',
    description: '',
    client: '',
    completionDate: '',
    link: '',
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
      const response = await adminPortfolioApi.getById(id);
      setFormData(response.data);
    } catch (error) {
      console.error('Erreur:', error);
      setError('Projet non trouvé');
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
      await adminPortfolioApi.update(id, formData);
      router.push('/admin/portfolios');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour');
      setSaving(false);
    }
  };

  if (loading) {
    return <AdminLayout title="Modifier Projet"><div className="text-center py-5">Chargement...</div></AdminLayout>;
  }

  if (error) {
    return <AdminLayout title="Modifier Projet"><div className="alert alert-danger">{error}</div></AdminLayout>;
  }

  return (
    <AdminLayout title="Modifier Projet" module="portfolios">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Modifier : {formData.title}</h1>
        <Link href="/admin/portfolios" className="btn btn-secondary">← Retour</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card shadow p-4">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Titre *</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
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
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Catégorie *</label>
            <select
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner...</option>
              <option value="Web">Web</option>
              <option value="Mobile">Mobile</option>
              <option value="Cybersécurité">Cybersécurité</option>
              <option value="Énergie">Énergie</option>
              <option value="Réseaux">Réseaux</option>
              <option value="Design">Design</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Client</label>
            <input
              type="text"
              name="client"
              className="form-control"
              value={formData.client}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Image (URL)</label>
            <input
              type="text"
              name="image"
              className="form-control"
              value={formData.image}
              onChange={handleChange}
            />
            {formData.image && (
              <div className="mt-2">
                <img src={formData.image} alt="Prévisualisation" style={{ maxHeight: '100px' }} />
              </div>
            )}
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
            <label className="form-label">Date de livraison</label>
            <input
              type="date"
              name="completionDate"
              className="form-control"
              value={formData.completionDate}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Lien du projet</label>
            <input
              type="url"
              name="link"
              className="form-control"
              value={formData.link}
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
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}