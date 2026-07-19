// pages/admin/partners/index.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { adminPartnerApi, authApi } from '../../../utils/adminApi';
import AdminLayout from '../../../components/AdminLayout';

export default function AdminPartners() {
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
      const response = await adminPartnerApi.getAll();
      setItems(response.data || []);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce partenaire ?')) {
      try {
        await adminPartnerApi.delete(id);
        fetchItems();
      } catch (error) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  if (loading) {
    return <AdminLayout title="Partenaires"><div className="text-center py-5">Chargement...</div></AdminLayout>;
  }

  return (
    <AdminLayout title="Partenaires" module="partners">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Partenaires</h1>
        <Link href="/admin/partners/new" className="btn btn-primary">
          ➕ Nouveau Partenaire
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Logo</th>
              <th>Nom</th>
              <th>Catégorie</th>
              <th>Site Web</th>
              <th>Actif</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  {item.logo && (
                    <img src={item.logo} alt={item.name} style={{ width: '60px', height: '40px', objectFit: 'contain' }} />
                  )}
                </td>
                <td><strong>{item.name}</strong></td>
                <td>{item.category || '-'}</td>
                <td>
                  {item.website && (
                    <a href={item.website} target="_blank" rel="noopener noreferrer">
                      🔗 Voir
                    </a>
                  )}
                </td>
                <td>
                  <span className={`badge ${item.isActive ? 'bg-success' : 'bg-danger'}`}>
                    {item.isActive ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td>
                  <Link href={`/admin/partners/${item.id}`} className="btn btn-sm btn-primary me-1">
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
                <td colSpan="7" className="text-center py-4">Aucun partenaire trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}