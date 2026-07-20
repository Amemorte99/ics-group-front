// pages/admin/portfolios/new.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { adminPortfolioApi, authApi } from '../../../utils/adminApi';
import AdminLayout from '../../../components/AdminLayout';
import ImageUpload from '../../../components/ImageUpload';

export default function NewPortfolio() {
  const router = useRouter();
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authApi.isAuthenticated()) {
      router.push('/admin/login');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // ✅ Convertir les nombres si nécessaire
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

  const handleImageUpload = (url) => {
    setFormData({ ...formData, image: url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // ✅ Valider les champs avant l'envoi
    if (formData.title.length < 3) {
      setError('Le titre doit contenir au moins 3 caractères');
      setLoading(false);
      return;
    }

    if (formData.description.length < 10) {
      setError('La description doit contenir au moins 10 caractères');
      setLoading(false);
      return;
    }

    try {
      // ✅ S'assurer que la date est au bon format
      const submitData = {
        ...formData,
        completionDate: formData.completionDate || null,
      };

      await adminPortfolioApi.create(submitData);
      router.push('/admin/portfolios');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création');
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Nouveau Projet" module="portfolios">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0" style={{ color: '#1a1a2e' }}>Nouveau Projet Portfolio</h1>
        <Link href="/admin/portfolios">
          <span className="btn btn-secondary">← Retour</span>
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="card shadow p-4">
        <div className="row">
          {/* Titre */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Titre * <span className="text-danger">(min 3 caractères)</span></label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              placeholder="ex: Site E-commerce"
              minLength="3"
              required
            />
            {formData.title && formData.title.length < 3 && (
              <small className="text-danger">Le titre doit contenir au moins 3 caractères</small>
            )}
          </div>

          {/* Slug */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Slug *</label>
            <input
              type="text"
              name="slug"
              className="form-control"
              value={formData.slug}
              onChange={handleChange}
              placeholder="ex: site-e-commerce"
              required
            />
            <small className="text-muted">Identifiant unique pour l'URL</small>
          </div>

          {/* Catégorie */}
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

          {/* Client */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Client</label>
            <input
              type="text"
              name="client"
              className="form-control"
              value={formData.client}
              onChange={handleChange}
              placeholder="Nom du client"
            />
          </div>

          {/* Image */}
          <div className="col-12 mb-3">
            <label className="form-label">Image du projet</label>
            <ImageUpload
              onUpload={handleImageUpload}
              currentImage={formData.image}
              label="Image du projet"
              folder="portfolios"
            />
            {formData.image && (
              <div className="mt-2">
                <small className="text-muted">URL: {formData.image}</small>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="col-12 mb-3">
            <label className="form-label">Description * <span className="text-danger">(min 10 caractères)</span></label>
            <textarea
              name="description"
              className="form-control"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description détaillée du projet..."
              minLength="10"
              required
            />
            {formData.description && formData.description.length < 10 && (
              <small className="text-danger">La description doit contenir au moins 10 caractères</small>
            )}
          </div>

          {/* Date de livraison */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Date de livraison</label>
            <input
              type="date"
              name="completionDate"
              className="form-control"
              value={formData.completionDate}
              onChange={handleChange}
            />
            <small className="text-muted">Format: JJ/MM/AAAA (sélectionnez dans le calendrier)</small>
          </div>

          {/* Lien du projet */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Lien du projet</label>
            <input
              type="url"
              name="link"
              className="form-control"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://exemple.com"
            />
          </div>

          {/* Actif */}
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

          {/* Bouton */}
          <div className="col-12">
            <button type="submit" className="btn btn-ics-primary" disabled={loading}>
              {loading ? 'Création...' : 'Créer le projet'}
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
        .text-muted {
          color: #8c8f9c;
          font-size: 12px;
        }
        .text-danger {
          color: #EF5350;
          font-size: 12px;
        }
      `}</style>
    </AdminLayout>
  );
}