// pages/admin/portfolios/index.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { adminPortfolioApi, authApi } from '../../../utils/adminApi';
import AdminLayout from '../../../components/AdminLayout';

export default function AdminPortfolios() {
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
      const response = await adminPortfolioApi.getAll();
      setItems(response.data || []);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      try {
        await adminPortfolioApi.delete(id);
        fetchItems();
      } catch (error) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  if (loading) {
    return <AdminLayout title="Portfolio"><div className="text-center py-5">Chargement...</div></AdminLayout>;
  }

  return (
    <AdminLayout title="Portfolio" module="portfolios">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Projets Portfolio</h1>
        <Link href="/admin/portfolios/new" className="btn btn-primary">
          ➕ Nouveau Projet
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Titre</th>
              <th>Catégorie</th>
              <th>Client</th>
              <th>Actif</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  {item.image && (
                    <img src={item.image} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                  )}
                </td>
                <td>{item.title}</td>
                <td><span className="badge bg-info">{item.category}</span></td>
                <td>{item.client || '-'}</td>
                <td>
                  <span className={`badge ${item.isActive ? 'bg-success' : 'bg-danger'}`}>
                    {item.isActive ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td>
                  <Link href={`/admin/portfolios/${item.id}`} className="btn btn-sm btn-primary me-1">
                    ✏️
                  </Link>
                  <button onClick={() => handleDelete(item.id)} className="btn btn-sm btn-danger">
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">Aucun projet trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}