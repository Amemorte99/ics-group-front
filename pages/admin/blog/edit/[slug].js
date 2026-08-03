// pages/admin/blog/edit/[slug].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { adminBlogApi, authApi } from '../../../../utils/adminApi';
import AdminLayout from '../../../../components/AdminLayout';
import ImageUpload from '../../../../components/ImageUpload';

export default function EditBlog() {
  const router = useRouter();
  const { slug } = router.query;
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    slug: '',
    content: '',
    featuredImage: '',
    images: [],
    authorName: '', // ✅ CHANGÉ : author → authorName
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
    if (slug) {
      fetchItem();
    }
  }, [slug]);

  const fetchItem = async () => {
    try {
      setLoading(true);
      let response;
      
      if (!isNaN(slug)) {
        response = await adminBlogApi.getById(parseInt(slug));
      } else {
        response = await adminBlogApi.getBySlug(slug);
      }
      
      const data = response.data;
      setFormData({
        id: data.id || '',
        title: data.title || '',
        slug: data.slug || '',
        content: data.content || '',
        featuredImage: data.featuredImage || '',
        images: data.images || [],
        authorName: data.authorName || data.author || '', // ✅ CHANGÉ
        tags: data.tags || [],
        publishedDate: data.publishedDate || '',
        isPublished: data.isPublished !== undefined ? data.isPublished : true,
        isFeatured: data.isFeatured || false,
      });
    } catch (err) {
      console.error('❌ Erreur fetch:', err);
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

  const handleImageUpload = (url) => {
    if (!formData.featuredImage) {
      setFormData({ ...formData, featuredImage: url });
    } else {
      if (formData.images.length < 5) {
        setFormData({ ...formData, images: [...formData.images, url] });
      } else {
        alert('Vous ne pouvez ajouter que 5 images maximum');
      }
    }
  };

  const handleMultipleImages = (urls) => {
    setFormData({ ...formData, images: urls });
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const removeMainImage = () => {
    setFormData({ ...formData, featuredImage: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      // ✅ CHANGÉ : author → authorName
      const updateData = {
        title: formData.title,
        slug: formData.slug,
        content: formData.content,
        featuredImage: formData.featuredImage,
        images: formData.images,
        authorName: formData.authorName,
        tags: formData.tags,
        publishedDate: formData.publishedDate || null,
        isPublished: formData.isPublished,
        isFeatured: formData.isFeatured,
      };
      
      console.log('📝 Mise à jour:', updateData);
      await adminBlogApi.update(formData.id, updateData);
      router.push('/admin/blog');
    } catch (err) {
      console.error('❌ Erreur update:', err);
      console.error('❌ Response:', err.response?.data);
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Chargement..." module="blog">
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p className="text-muted mt-3">Chargement de l'article...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error || !formData.id) {
    return (
      <AdminLayout title="Article non trouvé" module="blog">
        <div className="text-center py-5">
          <div className="alert alert-danger" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h4>❌ Article non trouvé</h4>
            <p>L'article que vous essayez de modifier n'existe pas.</p>
            <Link href="/admin/blog">
              <span className="btn btn-ics-primary">Retour au blog</span>
            </Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`Modifier : ${formData.title}`} module="blog">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-0" style={{ color: '#1a1a2e' }}>✏️ Modifier : {formData.title}</h1>
          <p className="text-muted small mt-1">Modifiez votre article de blog</p>
        </div>
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
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Auteur</label>
            <input
              type="text"
              name="authorName" // ✅ CHANGÉ
              className="form-control"
              value={formData.authorName}
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

          {/* Image principale */}
          <div className="col-12 mb-3">
            <label className="form-label">Image principale</label>
            <ImageUpload
              onUpload={handleImageUpload}
              currentImage={formData.featuredImage}
              label="Image principale"
              folder="blog"
            />
            {formData.featuredImage && (
              <div className="mt-2 d-flex align-items-center gap-3">
                <img 
                  src={formData.featuredImage} 
                  alt="Aperçu" 
                  style={{ width: '100px', height: '70px', objectFit: 'cover', borderRadius: '8px' }} 
                />
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={removeMainImage}
                >
                  🗑️ Supprimer
                </button>
              </div>
            )}
          </div>

          {/* Images multiples */}
          <div className="col-12 mb-3">
            <label className="form-label">Images supplémentaires (max 5)</label>
            <ImageUpload
              onMultipleUpload={handleMultipleImages}
              existingImages={formData.images}
              label="Images supplémentaires"
              folder="blog"
              multiple={true}
            />
            {formData.images.length > 0 && (
              <div className="mt-2">
                <div className="row g-2">
                  {formData.images.map((img, index) => (
                    <div key={index} className="col-3 col-md-2">
                      <div className="image-thumbnail">
                        <img src={img} alt={`Image ${index + 1}`} />
                        <button
                          type="button"
                          className="remove-thumb"
                          onClick={() => removeImage(index)}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <small className="text-muted">{formData.images.length} / 5 images ajoutées</small>
              </div>
            )}
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Tags (séparés par des virgules)</label>
            <input
              type="text"
              className="form-control"
              value={formData.tags.join(', ')}
              onChange={handleTags}
              placeholder="tech, innovation, IA"
            />
            {formData.tags.length > 0 && (
              <div className="mt-2 d-flex flex-wrap gap-2">
                {formData.tags.map((tag, i) => (
                  <span key={i} className="tag-badge">#{tag}</span>
                ))}
              </div>
            )}
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Contenu *</label>
            <textarea
              name="content"
              className="form-control"
              rows="12"
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
              id="isPublished"
            />
            <label className="form-check-label" htmlFor="isPublished">✅ Publié</label>
          </div>

          <div className="col-md-6 mb-3 form-check">
            <input
              type="checkbox"
              name="isFeatured"
              className="form-check-input"
              checked={formData.isFeatured}
              onChange={handleChange}
              id="isFeatured"
            />
            <label className="form-check-label" htmlFor="isFeatured">⭐ En vedette</label>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-ics-primary" disabled={saving}>
              {saving ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Enregistrement...
                </>
              ) : (
                '💾 Enregistrer'
              )}
            </button>
          </div>
        </div>
      </form>

      <style jsx>{`
        .btn-ics-primary {
          background: linear-gradient(135deg, #1B5E20, #4CAF50);
          color: #fff;
          border: none;
          padding: 12px 32px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
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
        .btn-danger {
          background: #FFEBEE;
          color: #C62828;
          border: none;
          padding: 6px 16px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-danger:hover {
          background: #FFCDD2;
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
        .alert-danger {
          background: #FFEBEE;
          border: 1px solid #FFCDD2;
          color: #C62828;
          padding: 12px 16px;
          border-radius: 10px;
          margin-bottom: 16px;
        }
        .tag-badge {
          display: inline-block;
          padding: 4px 14px;
          background: #E8F5E9;
          color: #1B5E20;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 500;
        }
        .image-thumbnail {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #eef0f2;
          background: #f8f9fb;
          aspect-ratio: 1;
        }
        .image-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .remove-thumb {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 24px;
          height: 24px;
          border: none;
          border-radius: 50%;
          background: rgba(239, 83, 80, 0.9);
          color: #fff;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .remove-thumb:hover {
          background: #EF5350;
          transform: scale(1.1);
        }
        .spinner-border {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </AdminLayout>
  );
}