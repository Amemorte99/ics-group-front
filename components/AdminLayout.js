// components/AdminLayout.js
import Link from 'next/link';
import { authApi } from '../utils/adminApi';

export default function AdminLayout({ children, title, module }) {
  const menuItems = [
    { name: 'Dashboard', icon: '📊', path: '/admin' },
    { name: 'Services', icon: '📦', path: '/admin/services' },
    { name: 'Portfolio', icon: '🎨', path: '/admin/portfolios' },
    { name: 'Blog', icon: '📝', path: '/admin/blog' },
    { name: 'Témoignages', icon: '💬', path: '/admin/testimonials' },
    { name: 'Partenaires', icon: '🤝', path: '/admin/partners' },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-2 d-md-block bg-dark vh-100 p-3 position-fixed">
          <h5 className="text-white mb-4">ICS Admin</h5>
          <ul className="nav flex-column">
            {menuItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link
                  href={item.path}
                  className={`nav-link text-white ${module === item.path.replace('/admin/', '') ? 'active bg-primary rounded' : ''}`}
                >
                  <span>{item.icon}</span> {item.name}
                </Link>
              </li>
            ))}
            <li className="nav-item mt-3">
              <button onClick={() => authApi.logout()} className="btn btn-danger w-100">
                🚪 Déconnexion
              </button>
            </li>
          </ul>
        </nav>

        {/* Main */}
        <main className="col-md-10 ms-auto px-md-4 py-4" style={{ marginLeft: '16.666%' }}>
          <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
            <h1>{title}</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}