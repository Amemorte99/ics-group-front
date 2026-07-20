// components/AdminLayout.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import { authApi } from '../utils/adminApi';
import { useState, useEffect, useRef } from 'react';

export default function AdminLayout({ children, title, module }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, text: 'Nouveau message de contact', time: '2 min' },
    { id: 2, text: 'Article publié avec succès', time: '1 heure' },
  ]);
  const profileRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('adminUser');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }

    // Fermer le menu profile au clic en dehors
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


const menuItems = [
  { name: 'Dashboard', icon: '📊', path: '/admin', description: "Vue d'ensemble" },
  { name: 'Services', icon: '🛠️', path: '/admin/services', description: 'Gérer les services' },
  { name: 'Portfolio', icon: '🎨', path: '/admin/portfolios', description: 'Gérer les projets' },
  { name: 'Blog', icon: '✍️', path: '/admin/blog', description: 'Gérer les articles' },
  { name: 'Témoignages', icon: '💬', path: '/admin/testimonials', description: 'Gérer les avis' },
  { name: 'Partenaires', icon: '🤝', path: '/admin/partners', description: 'Gérer les partenaires' },
  { name: 'Utilisateurs', icon: '👥', path: '/admin/users', description: 'Gérer les utilisateurs' }, // ✅ AJOUT
];
  const handleLogout = () => {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      authApi.logout();
    }
  };

  const getInitials = (name) => {
    if (!name) return 'A';
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">
            <span className="brand-dot"></span>
            <span className="brand-dot"></span>
            <span className="brand-dot"></span>
          </div>
          <div className="brand-text">
            <span className="brand-name">ICS</span>
            <span className="brand-sub">Administration</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const isActive = module === item.path.replace('/admin/', '') || 
                            (item.path === '/admin' && module === '');
            return (
              <Link key={item.path} href={item.path}>
                <span className={`nav-item ${isActive ? 'active' : ''}`}>
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-content">
                    <span className="nav-name">{item.name}</span>
                    <span className="nav-description">{item.description}</span>
                  </span>
                  {isActive && <span className="nav-indicator"></span>}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <span className="logout-icon">🚪</span>
            <span className="logout-text">Déconnexion</span>
          </button>
          <div className="sidebar-version">v2.0.0</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div className="header-left">
            <button 
              className="mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="hamburger"></span>
            </button>
            <div className="header-title">
              <h1>{title}</h1>
              <div className="header-breadcrumb">
                <Link href="/admin">Dashboard</Link>
                {module && <span className="separator">/</span>}
                {module && <span className="current">{title}</span>}
              </div>
            </div>
          </div>

          <div className="header-right">
            {/* Notifications */}
            <div className="notifications-wrapper">
              <button className="notif-btn">
                <span className="notif-icon">🔔</span>
                <span className="notif-badge">{notifications.length}</span>
              </button>
            </div>

            {/* Profile */}
            <div className="profile-wrapper" ref={profileRef}>
              <button 
                className={`profile-btn ${isProfileOpen ? 'open' : ''}`}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="profile-avatar" style={{ 
                  background: 'linear-gradient(135deg, #1B5E20, #4CAF50)'
                }}>
                  {getInitials(user?.name)}
                </div>
                <div className="profile-info">
                  <span className="profile-name">{user?.name || 'Admin'}</span>
                  <span className="profile-role">{user?.role || 'Administrateur'}</span>
                </div>
                <span className="profile-chevron">▾</span>
              </button>

              {isProfileOpen && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <div className="dropdown-avatar" style={{ 
                      background: 'linear-gradient(135deg, #1B5E20, #4CAF50)'
                    }}>
                      {getInitials(user?.name)}
                    </div>
                    <div className="dropdown-user">
                      <span className="dropdown-name">{user?.name || 'Admin'}</span>
                      <span className="dropdown-email">{user?.email || 'admin@icsgroupe.com'}</span>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item">
                    <span>👤</span> Mon profil
                  </button>
                  <button className="dropdown-item">
                    <span>⚙️</span> Paramètres
                  </button>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    <span>🚪</span> Déconnexion
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="admin-content">
          {children}
        </div>
      </main>

      {/* Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        .admin-container {
          display: flex;
          min-height: 100vh;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #f0f2f5;
        }

        /* ===== SIDEBAR ===== */
        .admin-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 280px;
          height: 100vh;
          background: linear-gradient(180deg, #0A0A1A 0%, #0D2B1A 50%, #0A1A0D 100%);
          padding: 28px 20px;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          overflow-y: auto;
        }

        .admin-sidebar::-webkit-scrollbar {
          width: 3px;
        }
        .admin-sidebar::-webkit-scrollbar-track {
          background: transparent;
        }
        .admin-sidebar::-webkit-scrollbar-thumb {
          background: rgba(76, 175, 80, 0.3);
          border-radius: 10px;
        }

        /* Brand */
        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-bottom: 28px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 24px;
        }

        .brand-icon {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .brand-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4CAF50, #2E7D32);
          display: inline-block;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        .brand-dot:nth-child(2) { animation-delay: 0.3s; }
        .brand-dot:nth-child(3) { animation-delay: 0.6s; }

        @keyframes pulse-dot {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.5px;
          line-height: 1;
        }

        .brand-sub {
          font-size: 10px;
          font-weight: 400;
          color: rgba(255,255,255,0.4);
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-top: 2px;
        }

        /* Navigation */
        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 16px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
        }

        .nav-item:hover {
          color: rgba(255,255,255,0.8);
          background: rgba(255,255,255,0.05);
        }

        .nav-item.active {
          color: #fff;
          background: linear-gradient(135deg, rgba(27, 94, 32, 0.4), rgba(76, 175, 80, 0.2));
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
        }

        .nav-item.active .nav-icon {
          transform: scale(1.1);
        }

        .nav-icon {
          font-size: 20px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: rgba(255,255,255,0.05);
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .nav-item.active .nav-icon {
          background: rgba(76, 175, 80, 0.2);
        }

        .nav-content {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
        }

        .nav-name {
          font-size: 14px;
          font-weight: 500;
          line-height: 1.3;
        }

        .nav-description {
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          font-weight: 400;
          margin-top: 1px;
        }

        .nav-item.active .nav-description {
          color: rgba(255,255,255,0.5);
        }

        .nav-indicator {
          width: 4px;
          height: 20px;
          background: linear-gradient(180deg, #4CAF50, #2E7D32);
          border-radius: 4px;
          flex-shrink: 0;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from { transform: scaleY(0); opacity: 0; }
          to { transform: scaleY(1); opacity: 1; }
        }

        /* Sidebar Footer */
        .sidebar-footer {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .logout-btn {
          width: 100%;
          padding: 12px 16px;
          border: none;
          border-radius: 12px;
          background: rgba(244, 67, 54, 0.1);
          color: rgba(255,255,255,0.6);
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
          font-weight: 500;
          font-family: inherit;
        }

        .logout-btn:hover {
          background: rgba(244, 67, 54, 0.2);
          color: #EF5350;
        }

        .logout-icon {
          font-size: 18px;
        }

        .sidebar-version {
          text-align: center;
          font-size: 10px;
          color: rgba(255,255,255,0.15);
          margin-top: 12px;
          letter-spacing: 2px;
        }

        /* ===== MAIN ===== */
        .admin-main {
          flex: 1;
          margin-left: 280px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* ===== HEADER ===== */
        .admin-header {
          background: #fff;
          padding: 16px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid #eef0f2;
          backdrop-filter: blur(10px);
          background: rgba(255,255,255,0.95);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }

        .hamburger {
          display: block;
          width: 24px;
          height: 2px;
          background: #1a1a2e;
          position: relative;
          transition: all 0.3s ease;
        }
        .hamburger::before,
        .hamburger::after {
          content: '';
          position: absolute;
          width: 24px;
          height: 2px;
          background: #1a1a2e;
          transition: all 0.3s ease;
        }
        .hamburger::before { top: -6px; }
        .hamburger::after { bottom: -6px; }

        .header-title h1 {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
          letter-spacing: -0.3px;
        }

        .header-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #8c8f9c;
          margin-top: 2px;
        }

        .header-breadcrumb a {
          color: #4CAF50;
          text-decoration: none;
          transition: color 0.2s;
        }
        .header-breadcrumb a:hover {
          color: #2E7D32;
        }

        .header-breadcrumb .separator {
          color: #d0d2d8;
        }
        .header-breadcrumb .current {
          color: #8c8f9c;
        }

        /* Header Right */
        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .notif-btn {
          position: relative;
          background: none;
          border: none;
          font-size: 22px;
          cursor: pointer;
          padding: 8px;
          border-radius: 12px;
          transition: background 0.2s;
        }
        .notif-btn:hover {
          background: #f5f6f8;
        }

        .notif-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          background: #EF5350;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Profile */
        .profile-wrapper {
          position: relative;
        }

        .profile-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px 12px 6px 6px;
          border-radius: 50px;
          transition: background 0.2s;
        }
        .profile-btn:hover {
          background: #f5f6f8;
        }

        .profile-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          flex-shrink: 0;
        }

        .profile-info {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .profile-name {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a2e;
          line-height: 1.2;
        }

        .profile-role {
          font-size: 11px;
          color: #8c8f9c;
          font-weight: 400;
        }

        .profile-chevron {
          font-size: 10px;
          color: #8c8f9c;
          margin-left: 4px;
          transition: transform 0.3s ease;
        }

        .profile-btn.open .profile-chevron {
          transform: rotate(180deg);
        }

        /* Profile Dropdown */
        .profile-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          min-width: 260px;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
          padding: 8px;
          animation: dropdownSlide 0.2s ease;
          z-index: 200;
        }

        @keyframes dropdownSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dropdown-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 14px;
          border-radius: 12px;
          background: #f8f9fb;
        }

        .dropdown-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 700;
          font-size: 16px;
          flex-shrink: 0;
        }

        .dropdown-user {
          display: flex;
          flex-direction: column;
        }

        .dropdown-name {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a2e;
        }

        .dropdown-email {
          font-size: 12px;
          color: #8c8f9c;
        }

        .dropdown-divider {
          height: 1px;
          background: #eef0f2;
          margin: 8px 0;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border: none;
          background: none;
          width: 100%;
          border-radius: 10px;
          cursor: pointer;
          font-size: 14px;
          color: #1a1a2e;
          transition: all 0.2s;
          font-family: inherit;
        }
        .dropdown-item:hover {
          background: #f5f6f8;
        }
        .dropdown-item.logout {
          color: #EF5350;
        }
        .dropdown-item.logout:hover {
          background: rgba(239, 83, 80, 0.08);
        }
        .dropdown-item span {
          font-size: 18px;
        }

        /* ===== CONTENT ===== */
        .admin-content {
          flex: 1;
          padding: 24px 32px 32px;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .admin-sidebar {
            transform: translateX(-100%);
          }
          .admin-sidebar.open {
            transform: translateX(0);
          }
          .admin-main {
            margin-left: 0;
          }
          .mobile-toggle {
            display: block;
          }
          .profile-info {
            display: none;
          }
          .admin-content {
            padding: 16px;
          }
          .admin-header {
            padding: 12px 16px;
          }
        }

        @media (max-width: 640px) {
          .header-title h1 {
            font-size: 17px;
          }
          .header-breadcrumb {
            font-size: 12px;
          }
          .notif-btn {
            font-size: 18px;
          }
          .profile-btn {
            padding: 4px;
          }
          .profile-chevron {
            display: none;
          }
          .admin-content {
            padding: 12px;
          }
        }

        /* ===== OVERLAY ===== */
        .admin-sidebar.open::before {
          content: '';
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.3);
          z-index: -1;
        }

        /* ===== SCROLLBAR STYLING ===== */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #d0d2d8;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #b0b2b8;
        }

        /* ===== ANIMATIONS ===== */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .admin-content > * {
          animation: fadeIn 0.4s ease;
        }
      `}</style>
    </div>
  );
}