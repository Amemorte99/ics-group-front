// pages/admin/portfolios/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { adminPortfolioApi, authApi } from '../../../utils/adminApi';
import AdminLayout from '../../../components/AdminLayout';
import ImageUpload from '../../../components/ImageUpload';

export default function EditPortfolio() {
  const router = useRouter();
  const { id } = router.query; // ✅ Utiliser ID
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    slug: '',
    category: '',
    image: '',
    images: [],
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
      setLoading(true);
      console.log('🔍 Récupération du projet avec ID:', id);
      
      const response = await adminPortfolioApi.getById(id);
      
      if (response && response.data) {
        console.log('✅ Projet trouvé:', response.data);
        setFormData({
          id: response.data.id || '',
          title: response.data.title || '',
          slug: response.data.slug || '',
          category: response.data.category || '',
          image: response.data.image || '',
          images: response.data.images || [],
          description: response.data.description || '',
          client: response.data.client || '',
          completionDate: response.data.completionDate || '',
          link: response.data.link || '',
          isActive: response.data.isActive !== undefined ? response.data.isActive : true,
        });
        setError('');
      } else {
        setError('Projet non trouvé');
      }
    } catch (err) {
      console.error('❌ Erreur fetch:', err);
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

  const handleImageUpload = (url) => {
    if (!formData.image) {
      setFormData({ ...formData, image: url });
    } else {
      if (formData.images.length < 3) {
        setFormData({ ...formData, images: [...formData.images, url] });
      } else {
        alert('Vous ne pouvez ajouter que 3 images maximum');
      }
    }
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const removeMainImage = () => {
    setFormData({ ...formData, image: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const updateData = {
        title: formData.title,
        slug: formData.slug,
        category: formData.category,
        image: formData.image,
        images: formData.images,
        description: formData.description,
        client: formData.client,
        completionDate: formData.completionDate || null,
        link: formData.link,
        isActive: formData.isActive,
      };

      console.log('📝 Mise à jour du projet ID:', formData.id);
      await adminPortfolioApi.update(formData.id, updateData);
      router.push('/admin/portfolios');
    } catch (err) {
      console.error('❌ Erreur update:', err);
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Modifier Projet" module="portfolios">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error || !formData.id) {
    return (
      <AdminLayout title="Modifier Projet" module="portfolios">
        <div className="text-center py-5">
          <div className="alert alert-danger" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h4>❌ Projet non trouvé</h4>
            <p>Le projet que vous essayez de modifier n'existe pas.</p>
            <Link href="/admin/portfolios">
              <span className="btn btn-ics-primary">Retour au portfolio</span>
            </Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Modifier Projet" module="portfolios">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0" style={{ color: '#1a1a2e' }}>
          Modifier : {formData.title}
        </h1>
        <Link href="/admin/portfolios">
          <span className="btn btn-secondary">← Retour</span>
        </Link>
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
            <label className="form-label">Image principale</label>
            <ImageUpload
              onUpload={handleImageUpload}
              currentImage={formData.image}
              label="Image principale"
              folder="portfolios"
            />
            {formData.image && (
              <div className="mt-2">
                <small className="text-muted">Image principale</small>
                <button
                  type="button"
                  className="btn btn-sm btn-danger mt-1"
                  onClick={removeMainImage}
                >
                  Supprimer l'image principale
                </button>
              </div>
            )}
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Images supplémentaires (max 3)</label>
            <div className="row g-2">
              {[0, 1, 2].map((index) => (
                <div key={index} className="col-4">
                  <div className="border rounded p-2 text-center" style={{ minHeight: '100px', backgroundColor: '#f8f9fb' }}>
                    {formData.images[index] ? (
                      <div className="position-relative">
                        <img 
                          src={formData.images[index]} 
                          alt={`Image ${index + 1}`} 
                          style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '4px' }} 
                        />
                        <button
                          type="button"
                          className="btn btn-danger btn-sm position-absolute top-0 end-0"
                          style={{ borderRadius: '50%', width: '24px', height: '24px', padding: '0', fontSize: '12px' }}
                          onClick={() => removeImage(index)}
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="text-muted small" style={{ paddingTop: '20px' }}>
                        <span className="d-block" style={{ fontSize: '24px' }}>📷</span>
                        <span>Image {index + 1}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <small className="text-muted">{formData.images.length} / 3 images ajoutées</small>
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
              placeholder="https://exemple.com"
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