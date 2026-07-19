// pages/admin/blog/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { adminBlogApi, authApi } from '../../../utils/adminApi';
import AdminLayout from '../../../components/AdminLayout';

export default function EditBlog() {
  const router = useRouter();
  const { id } = router.query;
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
      const response = await adminBlogApi.getById(id);
      setFormData(response.data);
    } catch (error) {
      console.error('Erreur:', error);
      setError('Article non trouvé');
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

  const handleTags = (e) => {
    const tags = e.target.value.split(',').map(t => t.trim()).filter(t => t);
    setFormData({ ...formData, tags });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await adminBlogApi.update(id, formData);
      router.push('/admin/blog');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour');
      setSaving(false);
    }
  };

  if (loading) {
    return <AdminLayout title="Modifier Article"><div className="text-center py-5">Chargement...</div></AdminLayout>;
  }

  return (
    <AdminLayout title="Modifier Article" module="blog">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Modifier : {formData.title}</h1>
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
            />
            {formData.featuredImage && (
              <div className="mt-2">
                <img src={formData.featuredImage} alt="Prévisualisation" style={{ maxHeight: '100px' }} />
              </div>
            )}
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Tags (séparés par des virgules)</label>
            <input
              type="text"
              className="form-control"
              defaultValue={formData.tags?.join(', ')}
              onChange={handleTags}
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
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}