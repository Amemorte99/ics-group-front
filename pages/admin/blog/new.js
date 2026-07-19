// pages/admin/blog/new.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { adminBlogApi, authApi } from '../../../utils/adminApi';
import AdminLayout from '../../../components/AdminLayout';

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
        <h1>Nouvel Article</h1>
        <Link href="/admin/blog" className="btn btn-secondary">← Retour</Link>
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
            <label className="form-label">Image principale (URL)</label>
            <input
              type="text"
              name="featuredImage"
              className="form-control"
              value={formData.featuredImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
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
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Création...' : 'Publier l\'article'}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}