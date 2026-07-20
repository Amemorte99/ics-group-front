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
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    if (!authApi.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    setUser(authApi.getCurrentUser());
    fetchStats();
    fetchRecentActivities();
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

  const fetchRecentActivities = async () => {
    const activities = [
      { id: 1, type: 'service', action: 'Création', name: 'Cybersécurité', time: 'Il y a 2 min', icon: '🛠️' },
      { id: 2, type: 'portfolio', action: 'Publication', name: 'Site E-commerce', time: 'Il y a 15 min', icon: '🎨' },
      { id: 3, type: 'blog', action: 'Mise à jour', name: 'Tendances 2026', time: 'Il y a 1 heure', icon: '✍️' },
      { id: 4, type: 'testimonial', action: 'Ajout', name: 'Jean Dupont', time: 'Il y a 3 heures', icon: '💬' },
    ];
    setRecentActivities(activities);
  };

  const menuItems = [
    { 
      name: 'Services', 
      icon: '🛠️', 
      path: '/admin/services', 
      count: stats.services,
      gradient: 'linear-gradient(135deg, #1B5E20, #4CAF50)'
    },
    { 
      name: 'Portfolio', 
      icon: '🎨', 
      path: '/admin/portfolios', 
      count: stats.portfolios,
      gradient: 'linear-gradient(135deg, #E65100, #FF6F00)'
    },
    { 
      name: 'Blog', 
      icon: '✍️', 
      path: '/admin/blog', 
      count: stats.blogs,
      gradient: 'linear-gradient(135deg, #0D47A1, #1565C0)'
    },
    { 
      name: 'Témoignages', 
      icon: '💬', 
      path: '/admin/testimonials', 
      count: stats.testimonials,
      gradient: 'linear-gradient(135deg, #4A148C, #6A1B9A)'
    },
    { 
      name: 'Partenaires', 
      icon: '🤝', 
      path: '/admin/partners', 
      count: stats.partners,
      gradient: 'linear-gradient(135deg, #006064, #00838F)'
    },
  ];

  if (loading) {
    return (
      <AdminLayout title="Dashboard" module="">
        <div className="dashboard-loader">
          <div className="loader-spinner"></div>
          <p>Chargement du tableau de bord...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Tableau de bord" module="">
      {/* En-tête */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <div className="welcome-text">
            <span className="welcome-emoji">👋</span>
            <div>
              <h1>Bonjour, {user?.name || 'Admin'} !</h1>
              <p>Voici un aperçu de votre activité sur ICS GROUPE</p>
            </div>
          </div>
          <div className="welcome-stats">
            <span className="stat-badge">
              <span className="stat-dot"></span>
              En ligne
            </span>
          </div>
        </div>
        <div className="dashboard-date">
          <span className="date-icon">📅</span>
          {new Date().toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          })}
        </div>
      </div>

      {/* Statistiques */}
      <div className="stats-grid">
        {menuItems.map((item) => (
          <Link key={item.path} href={item.path}>
            {/* ✅ UN SEUL ENFANT : un span qui contient tout */}
            <span className="stat-card-link">
              <div className="stat-card">
                <div className="stat-card-icon" style={{ background: item.gradient }}>
                  {item.icon}
                </div>
                <div className="stat-card-content">
                  <span className="stat-card-value">{item.count}</span>
                  <span className="stat-card-label">{item.name}</span>
                </div>
                <div className="stat-card-progress">
                  <div 
                    className="stat-card-progress-bar" 
                    style={{ 
                      width: `${Math.min((item.count / 100) * 100, 100)}%`,
                      background: item.gradient 
                    }}
                  ></div>
                </div>
                <span className="stat-card-action">Gérer →</span>
              </div>
            </span>
          </Link>
        ))}
      </div>

      {/* Activités + Actions rapides */}
      <div className="dashboard-bottom">
        <div className="recent-activities">
          <div className="section-header">
            <h3>📋 Activités récentes</h3>
            <span className="section-more">Voir tout →</span>
          </div>
          <div className="activities-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <span className="activity-icon">{activity.icon}</span>
                <div className="activity-content">
                  <span className="activity-text">
                    <strong>{activity.action}</strong> {activity.type} : {activity.name}
                  </span>
                  <span className="activity-time">{activity.time}</span>
                </div>
                <span className="activity-dot"></span>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-actions">
          <div className="section-header">
            <h3>⚡ Actions rapides</h3>
          </div>
          <div className="actions-grid">
            {/* ✅ CORRECTION : Link avec un seul enfant span */}
            <Link href="/admin/services/new">
              <span className="action-btn green">➕ Nouveau Service</span>
            </Link>
            <Link href="/admin/portfolios/new">
              <span className="action-btn orange">➕ Nouveau Portfolio</span>
            </Link>
            <Link href="/admin/blog/new">
              <span className="action-btn blue">➕ Nouvel Article</span>
            </Link>
            <Link href="/admin/testimonials/new">
              <span className="action-btn purple">➕ Nouveau Témoignage</span>
            </Link>
            <Link href="/admin/partners/new">
              <span className="action-btn teal">➕ Nouveau Partenaire</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-loader {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          gap: 16px;
        }

        .loader-spinner {
          width: 48px;
          height: 48px;
          border: 3px solid #eef0f2;
          border-top-color: #4CAF50;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .welcome-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex: 1;
          flex-wrap: wrap;
          gap: 16px;
        }

        .welcome-text {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .welcome-emoji {
          font-size: 40px;
          line-height: 1;
        }

        .welcome-text h1 {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
          letter-spacing: -0.3px;
        }

        .welcome-text p {
          font-size: 14px;
          color: #8c8f9c;
          margin: 4px 0 0;
        }

        .welcome-stats {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .stat-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: #E8F5E9;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 500;
          color: #1B5E20;
        }

        .stat-dot {
          width: 8px;
          height: 8px;
          background: #4CAF50;
          border-radius: 50%;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }

        .dashboard-date {
          padding: 8px 16px;
          background: #f8f9fb;
          border-radius: 12px;
          font-size: 14px;
          color: #4a4d5e;
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }

        .date-icon {
          font-size: 16px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }

        .stat-card-link {
          text-decoration: none;
          display: block;
          cursor: pointer;
        }

        .stat-card {
          background: #fff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
          border: 1px solid #eef0f2;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
          border-color: #4CAF50;
        }

        .stat-card-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #fff;
          margin-bottom: 16px;
        }

        .stat-card-content {
          flex: 1;
        }

        .stat-card-value {
          font-size: 32px;
          font-weight: 700;
          color: #1a1a2e;
          display: block;
          letter-spacing: -0.5px;
        }

        .stat-card-label {
          font-size: 14px;
          color: #8c8f9c;
          font-weight: 500;
        }

        .stat-card-progress {
          width: 100%;
          height: 4px;
          background: #eef0f2;
          border-radius: 4px;
          margin: 12px 0 8px;
          overflow: hidden;
        }

        .stat-card-progress-bar {
          height: 100%;
          border-radius: 4px;
          transition: width 1s ease;
        }

        .stat-card-action {
          font-size: 13px;
          font-weight: 600;
          color: #4CAF50;
          align-self: flex-end;
          transition: transform 0.3s ease;
        }

        .stat-card:hover .stat-card-action {
          transform: translateX(4px);
        }

        .dashboard-bottom {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }

        .recent-activities,
        .quick-actions {
          background: #fff;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid #eef0f2;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .section-header h3 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a2e;
          margin: 0;
        }

        .section-more {
          font-size: 13px;
          color: #4CAF50;
          cursor: pointer;
          font-weight: 500;
        }

        .activities-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 14px;
          border-radius: 12px;
          background: #f8f9fb;
          transition: background 0.2s;
          position: relative;
        }

        .activity-item:hover {
          background: #f0f1f3;
        }

        .activity-icon {
          font-size: 20px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          border-radius: 10px;
          flex-shrink: 0;
        }

        .activity-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .activity-text {
          font-size: 14px;
          color: #1a1a2e;
        }

        .activity-text strong {
          font-weight: 600;
        }

        .activity-time {
          font-size: 12px;
          color: #8c8f9c;
        }

        .activity-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4CAF50;
          flex-shrink: 0;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .action-btn {
          padding: 12px 16px;
          border-radius: 12px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          color: #fff;
          justify-content: center;
          text-align: center;
        }

        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          color: #fff;
        }

        .action-btn.green {
          background: linear-gradient(135deg, #1B5E20, #4CAF50);
        }
        .action-btn.orange {
          background: linear-gradient(135deg, #E65100, #FF6F00);
        }
        .action-btn.blue {
          background: linear-gradient(135deg, #0D47A1, #1565C0);
        }
        .action-btn.purple {
          background: linear-gradient(135deg, #4A148C, #6A1B9A);
        }
        .action-btn.teal {
          background: linear-gradient(135deg, #006064, #00838F);
        }

        .action-btn span {
          font-size: 16px;
        }

        @media (max-width: 1024px) {
          .dashboard-bottom {
            grid-template-columns: 1fr;
          }
          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          }
        }

        @media (max-width: 640px) {
          .dashboard-header {
            flex-direction: column;
          }
          .welcome-text {
            flex-direction: column;
            align-items: flex-start;
          }
          .welcome-text h1 {
            font-size: 20px;
          }
          .stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
          .stat-card {
            padding: 16px;
          }
          .stat-card-value {
            font-size: 24px;
          }
          .actions-grid {
            grid-template-columns: 1fr;
          }
          .dashboard-date {
            font-size: 12px;
            padding: 6px 12px;
          }
        }

        @media (max-width: 400px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </AdminLayout>
  );
}