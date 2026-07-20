// pages/admin/services/[slug].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { adminServiceApi, authApi } from '../../../utils/adminApi';
import AdminLayout from '../../../components/AdminLayout';

export default function EditService() {
  const router = useRouter();
  const { slug } = router.query;
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    icon: '',
    features: [],
    order: 0,
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
    if (slug) {
      fetchItem();
    }
  }, [slug]);

  const fetchItem = async () => {
    try {
      const response = await adminServiceApi.getById(slug);
      setFormData(response.data);
    } catch (error) {
      console.error('Erreur:', error);
      setError('Service non trouvé');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // ✅ Convertir 'order' en nombre
    if (name === 'order') {
      setFormData({
        ...formData,
        [name]: value === '' ? 0 : parseInt(value, 10),
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleFeatures = (e) => {
    const features = e.target.value.split('\n').filter(f => f.trim());
    setFormData({ ...formData, features });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await adminServiceApi.update(slug, formData);
      router.push('/admin/services');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Modifier Service" module="services">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Modifier Service" module="services">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0" style={{ color: '#1a1a2e' }}>
          Modifier : {formData.name}
        </h1>
        <Link href="/admin/services">
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
            <label className="form-label">Icône / Image</label>
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
                <img src={formData.icon} alt="Icône" style={{ maxHeight: '60px', objectFit: 'contain' }} />
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
              min="0"
              step="1"
            />
            <small className="text-muted">Nombre entier positif</small>
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Fonctionnalités (une par ligne)</label>
            <textarea
              className="form-control"
              rows="5"
              defaultValue={formData.features?.join('\n')}
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
            <button type="submit" className="btn btn-ics-primary" disabled={saving}>
              {saving ? 'Enregistrement...' : 'Enregistrer'}
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
        .text-muted {
          color: #8c8f9c;
          font-size: 12px;
        }
      `}</style>
    </AdminLayout>
  );
}