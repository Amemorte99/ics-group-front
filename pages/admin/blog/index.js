// pages/admin/blog/new.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { adminBlogApi, authApi } from '../../../utils/adminApi';
import AdminLayout from '../../../components/AdminLayout';
import ImageUpload from '../../../components/ImageUpload';

export default function NewBlog() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    featuredImage: '',
    author: '',
    tags: [],
    publishedDate: '',
    isPublished: true,
    isFeatured: false,
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

  const handleTags = (e) => {
    const tags = e.target.value.split(',').map(t => t.trim()).filter(t => t);
    setFormData({ ...formData, tags });
  };

  const handleImageUpload = (url) => {
    setFormData({ ...formData, featuredImage: url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await adminBlogApi.create(formData);
      router.push('/admin/blog');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création');
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Nouvel Article" module="blog">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0" style={{ color: '#1a1a2e' }}>Nouvel Article</h1>
        <Link href="/admin/blog">
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
              placeholder="ex: tendances-2026"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Auteur</label>
            <input
              type="text"
              name="author"
              className="form-control"
              value={formData.author}
              onChange={handleChange}
              placeholder="Nom de l'auteur"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Date de publication</label>
            <input
              type="date"
              name="publishedDate"
              className="form-control"
              value={formData.publishedDate}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Image principale</label>
            <ImageUpload
              onUpload={handleImageUpload}
              currentImage={formData.featuredImage}
              label="Image de l'article"
              folder="blog"
            />
            {formData.featuredImage && (
              <div className="mt-2">
                <small className="text-muted">URL: {formData.featuredImage}</small>
              </div>
            )}
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Tags (séparés par des virgules)</label>
            <input
              type="text"
              className="form-control"
              onChange={handleTags}
              placeholder="tech, innovation, IA"
            />
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Contenu *</label>
            <textarea
              name="content"
              className="form-control"
              rows="10"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3 form-check">
            <input
              type="checkbox"
              name="isPublished"
              className="form-check-input"
              checked={formData.isPublished}
              onChange={handleChange}
            />
            <label className="form-check-label">Publié</label>
          </div>

          <div className="col-md-6 mb-3 form-check">
            <input
              type="checkbox"
              name="isFeatured"
              className="form-check-input"
              checked={formData.isFeatured}
              onChange={handleChange}
            />
            <label className="form-check-label">Article en vedette</label>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-ics-primary" disabled={loading}>
              {loading ? 'Création...' : 'Publier l\'article'}
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
          font-family: inherit;
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
        textarea.form-control {
          resize: vertical;
          min-height: 200px;
        }
      `}</style>
    </AdminLayout>
  );
}