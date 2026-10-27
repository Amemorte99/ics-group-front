// pages/admin/index.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { authApi, adminDashboardApi } from '../../utils/adminApi';
import AdminLayout from '../../components/AdminLayout';
import AdminIcon from '../../components/admin/AdminIcon';

const TYPE_LABELS = {
  portfolio: 'Projet',
  blog: 'Article',
  service: 'Service',
  testimonial: 'Témoignage',
  partner: 'Partenaire',
};

const TYPE_ICONS = {
  portfolio: 'portfolio',
  blog: 'blog',
  service: 'services',
  testimonial: 'testimonials',
  partner: 'partners',
};

const QUICK_ACTIONS = [
  { label: 'Nouveau service', href: '/admin/services/new' },
  { label: 'Nouveau projet', href: '/admin/portfolios/new' },
  { label: 'Nouvel article', href: '/admin/blog/new' },
  { label: 'Nouveau témoignage', href: '/admin/testimonials/new' },
  { label: 'Nouveau partenaire', href: '/admin/partners/new' },
];

const monthLabel = (key) =>
  new Date(`${key}-01T00:00:00`).toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '');

const timeAgo = (value) => {
  const minutes = Math.round((Date.now() - new Date(value).getTime()) / 60000);
  if (minutes < 1) return "À l'instant";
  if (minutes < 60) return `Il y a ${minutes} min`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `Il y a ${hours} h`;
  const days = Math.round(hours / 24);
  return days < 30 ? `Il y a ${days} j` : new Date(value).toLocaleDateString('fr-FR');
};

function ActivityChart({ data }) {
  const width = 560;
  const height = 220;
  const pad = { top: 16, right: 8, bottom: 28, left: 28 };
  const max = Math.max(4, ...data.flatMap((d) => [d.messages, d.content]));
  const step = (width - pad.left - pad.right) / data.length;
  const barW = Math.min(22, step / 3);
  const y = (v) => pad.top + (height - pad.top - pad.bottom) * (1 - v / max);
  const ticks = [0, Math.round(max / 2), max];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Messages reçus et contenus créés par mois" className="chart">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={pad.left} x2={width - pad.right} y1={y(t)} y2={y(t)} stroke="#eef0f2" />
          <text x={pad.left - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#8c8f9c">{t}</text>
        </g>
      ))}
      {data.map((d, i) => {
        const cx = pad.left + step * i + step / 2;
        return (
          <g key={d.month}>
            <rect x={cx - barW - 2} y={y(d.messages)} width={barW} height={y(0) - y(d.messages)} rx="4" fill="#22a34a">
              <title>{`${d.messages} message(s)`}</title>
            </rect>
            <rect x={cx + 2} y={y(d.content)} width={barW} height={y(0) - y(d.content)} rx="4" fill="#14532d" opacity="0.55">
              <title>{`${d.content} contenu(s) créé(s)`}</title>
            </rect>
            <text x={cx} y={height - 8} textAnchor="middle" fontSize="12" fill="#4a4d5e">{monthLabel(d.month)}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!authApi.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    setUser(authApi.getCurrentUser());
    adminDashboardApi
      .overview()
      .then((res) => setData(res.data))
      .catch(() => setError('Impossible de charger les statistiques.'));
  }, []);

  const t = data?.totals;
  const kpis = t
    ? [
        { label: 'Messages non lus', value: t.unreadMessages, sub: `${t.messages} reçus au total`, href: '/admin/messages', icon: 'mail', alert: t.unreadMessages > 0 },
        { label: 'Articles publiés', value: t.publishedBlogs, sub: `${t.blogs} au total`, href: '/admin/blog', icon: 'blog' },
        { label: 'Vues du blog', value: t.blogViews.toLocaleString('fr-FR'), sub: 'Cumul tous articles', href: '/admin/blog', icon: 'eye' },
        { label: 'Projets', value: t.portfolios, sub: `${t.services} services · ${t.partners} partenaires`, href: '/admin/portfolios', icon: 'portfolio' },
      ]
    : [];

  return (
    <AdminLayout title="Tableau de bord" module="">
      <div className="head">
        <div>
          <h1>Bonjour, {user?.name || 'Admin'}</h1>
          <p>
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      {error && <div className="error">{error}</div>}
      {!data && !error && <div className="loading">Chargement du tableau de bord…</div>}

      {data && (
        <>
          <div className="kpis">
            {kpis.map((k) => (
              <Link key={k.label} href={k.href}>
                <a className={`kpi ${k.alert ? 'alert' : ''}`}>
                  <span className="kpi-icon"><AdminIcon name={k.icon} size={22} /></span>
                  <span className="kpi-value">{k.value}</span>
                  <span className="kpi-label">{k.label}</span>
                  <span className="kpi-sub">{k.sub}</span>
                </a>
              </Link>
            ))}
          </div>

          <div className="grid">
            <section className="card wide">
              <div className="card-head">
                <h3>Activité des 6 derniers mois</h3>
                <div className="legend">
                  <span><i style={{ background: '#22a34a' }} />Messages</span>
                  <span><i style={{ background: '#14532d', opacity: 0.55 }} />Contenus créés</span>
                </div>
              </div>
              <ActivityChart data={data.monthly} />
            </section>

            <section className="card">
              <div className="card-head"><h3>Messages à traiter</h3><Link href="/admin/messages"><a className="more">Tout voir</a></Link></div>
              {data.latestMessages.length === 0 ? (
                <p className="empty">Aucun message non lu.</p>
              ) : (
                <ul className="list">
                  {data.latestMessages.map((m) => (
                    <li key={m.id}>
                      <Link href="/admin/messages">
                        <a>
                          <strong>{m.name}</strong>
                          <span>{m.subject}</span>
                          <time>{timeAgo(m.createdAt)}</time>
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="card wide">
              <div className="card-head"><h3>Activité récente</h3></div>
              {data.recent.length === 0 ? (
                <p className="empty">Aucune activité pour le moment.</p>
              ) : (
                <ul className="timeline">
                  {data.recent.map((r, i) => (
                    <li key={`${r.type}-${i}`}>
                      <span className="tl-icon"><AdminIcon name={TYPE_ICONS[r.type]} size={16} /></span>
                      <span className="tl-text">
                        <strong>{r.isNew ? 'Créé' : 'Modifié'}</strong> · {TYPE_LABELS[r.type]} « {r.title} »
                      </span>
                      <time>{timeAgo(r.date)}</time>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="card">
              <div className="card-head"><h3>Articles les plus lus</h3></div>
              {data.topArticles.length === 0 ? (
                <p className="empty">Aucun article.</p>
              ) : (
                <ol className="top">
                  {data.topArticles.map((a) => (
                    <li key={a.id}>
                      <span className="top-title">{a.title}</span>
                      <span className="top-views">{a.views.toLocaleString('fr-FR')} vues</span>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          </div>

          <div className="quick">
            {QUICK_ACTIONS.map((a) => (
              <Link key={a.href} href={a.href}>
                <a><AdminIcon name="plus" size={16} /> {a.label}</a>
              </Link>
            ))}
          </div>
        </>
      )}

      <style jsx>{`
        .head h1 { font-size: 24px; font-weight: 700; color: #1a1a2e; margin: 0; letter-spacing: -0.3px; }
        .head p { margin: 4px 0 24px; color: #8c8f9c; font-size: 14px; }
        .loading, .error { padding: 40px; text-align: center; color: #8c8f9c; }
        .error { color: #b3261e; background: #fdecea; border-radius: 12px; }
        .kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 16px; margin-bottom: 20px; }
        .kpi { display: flex; flex-direction: column; background: #fff; border: 1px solid #eef0f2; border-radius: 16px; padding: 20px; text-decoration: none; transition: border-color .2s, transform .2s; }
        .kpi:hover { border-color: #22a34a; transform: translateY(-2px); }
        .kpi.alert { border-color: #22a34a; box-shadow: 0 0 0 3px rgba(34,163,74,.12); }
        .kpi-icon { width: 40px; height: 40px; border-radius: 10px; background: #e8f5e9; color: #14532d; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
        .kpi-value { font-size: 30px; font-weight: 700; color: #1a1a2e; letter-spacing: -0.5px; line-height: 1.1; }
        .kpi-label { font-size: 14px; color: #4a4d5e; margin-top: 4px; }
        .kpi-sub { font-size: 12px; color: #8c8f9c; margin-top: 2px; }
        .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px; }
        .card { background: #fff; border: 1px solid #eef0f2; border-radius: 16px; padding: 22px; min-width: 0; }
        .card.wide { grid-column: span 2; }
        .card-head { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 14px; flex-wrap: wrap; }
        .card-head h3 { font-size: 16px; font-weight: 600; color: #1a1a2e; margin: 0; }
        .more { font-size: 13px; color: #14532d; text-decoration: none; }
        .legend { display: flex; gap: 14px; font-size: 12px; color: #4a4d5e; }
        .legend span { display: inline-flex; align-items: center; gap: 6px; }
        .legend i { width: 10px; height: 10px; border-radius: 3px; display: inline-block; }
        .chart { width: 100%; height: auto; display: block; }
        .empty { color: #8c8f9c; font-size: 14px; margin: 8px 0; }
        .list, .timeline, .top { list-style: none; margin: 0; padding: 0; }
        .list li a { display: grid; grid-template-columns: 1fr auto; gap: 2px 8px; padding: 10px 0; border-bottom: 1px solid #f1f3f5; text-decoration: none; }
        .list li:last-child a { border-bottom: 0; }
        .list strong { font-size: 14px; color: #1a1a2e; }
        .list span { grid-column: 1; font-size: 13px; color: #8c8f9c; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .list time { grid-row: 1; grid-column: 2; font-size: 12px; color: #8c8f9c; }
        .timeline li { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid #f1f3f5; font-size: 14px; color: #4a4d5e; }
        .timeline li:last-child { border-bottom: 0; }
        .tl-icon { width: 32px; height: 32px; border-radius: 8px; background: #f3f8f4; color: #14532d; display: flex; align-items: center; justify-content: center; flex: none; }
        .tl-text { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .tl-text strong { color: #1a1a2e; font-weight: 600; }
        .timeline time { font-size: 12px; color: #8c8f9c; white-space: nowrap; }
        .top { counter-reset: rank; }
        .top li { display: flex; justify-content: space-between; gap: 12px; padding: 10px 0; border-bottom: 1px solid #f1f3f5; font-size: 14px; counter-increment: rank; }
        .top li:last-child { border-bottom: 0; }
        .top-title { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #1a1a2e; }
        .top-title::before { content: counter(rank) '. '; color: #8c8f9c; }
        .top-views { color: #14532d; font-weight: 600; white-space: nowrap; }
        .quick { display: flex; flex-wrap: wrap; gap: 10px; }
        .quick a { display: inline-flex; align-items: center; gap: 6px; padding: 10px 16px; border: 1px solid #d7e5da; border-radius: 10px; background: #fff; color: #14532d; font-size: 13px; font-weight: 500; text-decoration: none; }
        .quick a:hover { background: #14532d; border-color: #14532d; color: #fff; }
        @media (max-width: 1024px) { .grid { grid-template-columns: 1fr; } .card.wide { grid-column: auto; } }
      `}</style>
    </AdminLayout>
  );
}
