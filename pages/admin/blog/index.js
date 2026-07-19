// pages/admin/blog/index.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { adminBlogApi, authApi } from '../../../utils/adminApi';
import AdminLayout from '../../../components/AdminLayout';

export default function AdminBlog() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authApi.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await adminBlogApi.getAll();
      setItems(response.data || []);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        await adminBlogApi.delete(id);
        fetchItems();
      } catch (error) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      await adminBlogApi.togglePublish(id);
      fetchItems();
    } catch (error) {
      alert('Erreur lors du changement de statut');
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      await adminBlogApi.toggleFeatured(id);
      fetchItems();
    } catch (error) {
      alert('Erreur lors du changement de statut');
    }
  };

  if (loading) {
    return <AdminLayout title="Blog"><div className="text-center py-5">Chargement...</div></AdminLayout>;
  }

  return (
    <AdminLayout title="Blog" module="blog">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Articles du Blog</h1>
        <Link href="/admin/blog/new" className="btn btn-primary">
          ➕ Nouvel Article
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Titre</th>
              <th>Auteur</th>
              <th>Tags</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  {item.featuredImage && (
                    <img src={item.featuredImage} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                  )}
                </td>
                <td>{item.title}</td>
                <td>{item.author || 'ICS GROUPE'}</td>
                <td>
                  {item.tags?.slice(0, 2).map((tag, i) => (
                    <span key={i} className="badge bg-secondary me-1">{tag}</span>
                  ))}
                  {item.tags?.length > 2 && <span className="badge bg-secondary">+{item.tags.length - 2}</span>}
                </td>
                <td>
                  <span className={`badge ${item.isPublished ? 'bg-success' : 'bg-warning'}`}>
                    {item.isPublished ? 'Publié' : 'Brouillon'}
                  </span>
                  {item.isFeatured && <span className="badge bg-info ms-1">⭐ Vedette</span>}
                </td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <Link href={`/admin/blog/${item.id}`} className="btn btn-primary">
                      ✏️
                    </Link>
                    <button onClick={() => handleTogglePublish(item.id)} className="btn btn-secondary">
                      {item.isPublished ? '📌' : '📄'}
                    </button>
                    <button onClick={() => handleToggleFeatured(item.id)} className="btn btn-warning">
                      ⭐
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="btn btn-danger">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">Aucun article trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}