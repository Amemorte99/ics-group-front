// pages/admin/partners/new.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { adminPartnerApi, authApi } from '../../../utils/adminApi';
import AdminLayout from '../../../components/AdminLayout';
import ImageUpload from '../../../components/ImageUpload';

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

  const handleImageUpload = (url) => {
    setFormData({ ...formData, logo: url });
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
        <h1 className="h3 mb-0" style={{ color: '#1a1a2e' }}>Nouveau Partenaire</h1>
        <Link href="/admin/partners">
          <span className="btn btn-secondary">← Retour</span>
        </Link>
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
            <label className="form-label">Logo du partenaire *</label>
            <ImageUpload
              onUpload={handleImageUpload}
              currentImage={formData.logo}
              label="Logo du partenaire"
              folder="partners"
              required
            />
            {formData.logo && (
              <div className="mt-2">
                <small className="text-muted">URL: {formData.logo}</small>
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
            <button type="submit" className="btn btn-ics-primary" disabled={loading}>
              {loading ? 'Création...' : 'Créer le partenaire'}
            </button>
          </div>
        </div>
      </form>

      <style jsx>{`
        .btn-ics-primary {
          background: linear-gradient(135deg, #1B5E20, #4CAF50);
          color: #fff;
          border: none;
          padding: 10px 24px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-ics-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(27, 94, 32, 0.3);
          color: #fff;
        }
        .btn-secondary {
          background: #f0f1f3;
          color: #4a4d5e;
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
          text-decoration: none;
        }
        .btn-secondary:hover {
          background: #e0e1e3;
        }
        .alert {
          padding: 12px 16px;
          border-radius: 10px;
          margin-bottom: 16px;
        }
        .alert-danger {
          background: #FFEBEE;
          border: 1px solid #FFCDD2;
          color: #C62828;
        }
        .form-control {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #eef0f2;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.3s ease;
        }
        .form-control:focus {
          outline: none;
          border-color: #4CAF50;
          box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
        }
        .form-select {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #eef0f2;
          border-radius: 8px;
          font-size: 14px;
          background: #fff;
        }
        .form-check-input {
          width: 18px;
          height: 18px;
          margin-right: 8px;
          accent-color: #4CAF50;
        }
        .form-check-label {
          font-size: 14px;
          color: #4a4d5e;
        }
      `}</style>
    </AdminLayout>
  );
}