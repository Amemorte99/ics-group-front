// pages/admin/testimonials/index.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { adminTestimonialApi, authApi } from '../../../utils/adminApi';
import AdminLayout from '../../../components/AdminLayout';

export default function AdminTestimonials() {
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
      const response = await adminTestimonialApi.getAll();
      setItems(response.data || []);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) {
      try {
        await adminTestimonialApi.delete(id);
        fetchItems();
      } catch (error) {
        alert('Erreur lors de la suppression');
      }
    }
  };

  if (loading) {
    return <AdminLayout title="Témoignages"><div className="text-center py-5">Chargement...</div></AdminLayout>;
  }

  return (
    <AdminLayout title="Témoignages" module="testimonials">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Témoignages Clients</h1>
        <Link href="/admin/testimonials/new" className="btn btn-primary">
          ➕ Nouveau Témoignage
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Client</th>
              <th>Entreprise</th>
              <th>Note</th>
              <th>Actif</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  {item.photo && (
                    <img src={item.photo} alt={item.clientName} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  )}
                </td>
                <td>
                  <strong>{item.clientName}</strong>
                  <br />
                  <small className="text-muted">{item.clientPosition}</small>
                </td>
                <td>{item.clientCompany || '-'}</td>
                <td>
                  <span className="text-warning">
                    {'⭐'.repeat(item.rating || 5)}
                  </span>
                </td>
                <td>
                  <span className={`badge ${item.isActive ? 'bg-success' : 'bg-danger'}`}>
                    {item.isActive ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td>
                  <Link href={`/admin/testimonials/${item.id}`} className="btn btn-sm btn-primary me-1">
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
                <td colSpan="7" className="text-center py-4">Aucun témoignage trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}