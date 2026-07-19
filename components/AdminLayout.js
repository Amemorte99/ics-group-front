// components/AdminLayout.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import { authApi } from '../utils/adminApi';

export default function AdminLayout({ children, title, module }) {
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', icon: '📊', path: '/admin' },
    { name: 'Services', icon: '📦', path: '/admin/services' },
    { name: 'Portfolio', icon: '🎨', path: '/admin/portfolios' },
    { name: 'Blog', icon: '📝', path: '/admin/blog' },
    { name: 'Témoignages', icon: '💬', path: '/admin/testimonials' },
    { name: 'Partenaires', icon: '🤝', path: '/admin/partners' },
  ];

  const handleLogout = () => {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      authApi.logout();
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-2 d-md-block bg-dark vh-100 p-3 position-fixed" style={{ width: '16.666%' }}>
          <h5 className="text-white mb-4">ICS Admin</h5>
          <ul className="nav flex-column">
            {menuItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link href={item.path}>
                  <span className={`nav-link text-white ${module === item.path.replace('/admin/', '') ? 'active bg-primary rounded' : ''}`}>
                    <span>{item.icon}</span> {item.name}
                  </span>
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
        <main className="col-md-10 ms-auto px-md-4 py-4" style={{ marginLeft: '16.666%' }}>
          <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
            <h1>{title}</h1>
            <div>
              <span className="text-muted">
                👋 {typeof window !== 'undefined' && JSON.parse(localStorage.getItem('adminUser') || '{}')?.name || 'Admin'}
              </span>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}