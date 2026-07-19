// pages/admin/index.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { authApi } from '../../utils/adminApi';
import {
  adminPortfolioApi,
  adminServiceApi,
  adminBlogApi,
  adminTestimonialApi,
  adminPartnerApi,
} from '../../utils/adminApi';
import AdminLayout from '../../components/AdminLayout';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    portfolios: 0,
    services: 0,
    blogs: 0,
    testimonials: 0,
    partners: 0,
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!authApi.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    setUser(authApi.getCurrentUser());
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [portfolios, services, blogs, testimonials, partners] = await Promise.all([
        adminPortfolioApi.getAll(),
        adminServiceApi.getAll(),
        adminBlogApi.getAll(),
        adminTestimonialApi.getAll(),
        adminPartnerApi.getAll(),
      ]);

      setStats({
        portfolios: portfolios.data?.length || 0,
        services: services.data?.length || 0,
        blogs: blogs.data?.length || 0,
        testimonials: testimonials.data?.length || 0,
        partners: partners.data?.length || 0,
      });
    } catch (error) {
      console.error('Erreur chargement stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authApi.logout();
  };

  const menuItems = [
    { name: 'Services', icon: '📦', path: '/admin/services', count: stats.services },
    { name: 'Portfolio', icon: '🎨', path: '/admin/portfolios', count: stats.portfolios },
    { name: 'Blog', icon: '📝', path: '/admin/blog', count: stats.blogs },
    { name: 'Témoignages', icon: '💬', path: '/admin/testimonials', count: stats.testimonials },
    { name: 'Partenaires', icon: '🤝', path: '/admin/partners', count: stats.partners },
  ];

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout title="Dashboard" module="">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
        <div>
          <span className="me-3">👋 Bonjour {user?.name || 'Admin'}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4">
        {menuItems.map((item) => (
          <div key={item.path} className="col-md-3">
            <Link href={item.path}>
              {/* ✅ Un seul enfant : un span ou div */}
              <span className="text-decoration-none d-block">
                <div className="card shadow-sm h-100">
                  <div className="card-body text-center">
                    <div className="display-1">{item.icon}</div>
                    <h2 className="display-4">{item.count}</h2>
                    <p className="text-muted">{item.name}</p>
                    <span className="btn btn-outline-primary btn-sm">Gérer →</span>
                  </div>
                </div>
              </span>
            </Link>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-5">
        <h3>Actions rapides</h3>
        <div className="row g-3">
          <div className="col-md-3">
            <Link href="/admin/services/new">
              <span className="btn btn-primary w-100">➕ Nouveau Service</span>
            </Link>
          </div>
          <div className="col-md-3">
            <Link href="/admin/portfolios/new">
              <span className="btn btn-primary w-100">➕ Nouveau Portfolio</span>
            </Link>
          </div>
          <div className="col-md-3">
            <Link href="/admin/blog/new">
              <span className="btn btn-primary w-100">➕ Nouvel Article</span>
            </Link>
          </div>
          <div className="col-md-3">
            <Link href="/admin/testimonials/new">
              <span className="btn btn-primary w-100">➕ Nouveau Témoignage</span>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}