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
    // Vérifier l'authentification
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
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-2 d-md-block bg-dark vh-100 p-3">
          <h5 className="text-white mb-4">ICS Admin</h5>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link href="/admin" className="nav-link text-white active">
                <span>📊</span> Dashboard
              </Link>
            </li>
            {menuItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link href={item.path} className="nav-link text-white">
                  <span>{item.icon}</span> {item.name}
                  <span className="badge bg-primary float-end">{item.count}</span>
                </Link>
              </li>
            ))}
            <li className="nav-item mt-3">
              <button onClick={handleLogout} className="btn btn-danger w-100">
                🚪 Déconnexion
              </button>
            </li>
          </ul>
        </nav>

        {/* Main content */}
        <main className="col-md-10 ms-sm-auto px-md-4 py-4">
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
                <Link href={item.path} className="text-decoration-none">
                  <div className="card shadow-sm h-100">
                    <div className="card-body text-center">
                      <div className="display-1">{item.icon}</div>
                      <h2 className="display-4">{item.count}</h2>
                      <p className="text-muted">{item.name}</p>
                      <button className="btn btn-outline-primary btn-sm">
                        Gérer →
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-5">
            <h3>Actions rapides</h3>
            <div className="row g-3">
              <div className="col-md-3">
                <Link href="/admin/services/new" className="btn btn-primary w-100">
                  ➕ Nouveau Service
                </Link>
              </div>
              <div className="col-md-3">
                <Link href="/admin/portfolios/new" className="btn btn-primary w-100">
                  ➕ Nouveau Portfolio
                </Link>
              </div>
              <div className="col-md-3">
                <Link href="/admin/blog/new" className="btn btn-primary w-100">
                  ➕ Nouvel Article
                </Link>
              </div>
              <div className="col-md-3">
                <Link href="/admin/testimonials/new" className="btn btn-primary w-100">
                  ➕ Nouveau Témoignage
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}