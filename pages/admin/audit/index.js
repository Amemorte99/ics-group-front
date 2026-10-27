// pages/admin/audit/index.js
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { adminAuditApi, authApi } from '../../../utils/adminApi';
import AdminLayout from '../../../components/AdminLayout';

const LIMIT = 50;

const LABELS = {
  LOGIN: 'Connexion',
  LOGOUT: 'Déconnexion',
  LOGIN_FAILED: 'Échec de connexion',
  LOGIN_LOCKED: 'Compte verrouillé',
  LOGIN_2FA_FAILED: 'Échec du code 2FA',
  PASSWORD_CHANGED: 'Mot de passe modifié',
  '2FA_ENABLED': '2FA activée',
  '2FA_DISABLED': '2FA désactivée',
  POST: 'Création',
  PUT: 'Modification',
  PATCH: 'Modification',
  DELETE: 'Suppression',
};

const RISKY = new Set(['LOGIN_FAILED', 'LOGIN_LOCKED', 'LOGIN_2FA_FAILED', '2FA_DISABLED', 'PASSWORD_CHANGED']);

const label = (action) => {
  const [verb, ...rest] = action.split(' ');
  return LABELS[action] || [LABELS[verb] || verb, rest.join(' ')].filter(Boolean).join(' · ');
};

export default function AdminAudit() {
  const router = useRouter();
  const [data, setData] = useState({ items: [], total: 0 });
  const [page, setPage] = useState(1);
  const [onlyRisky, setOnlyRisky] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      const res = await adminAuditApi.list({ page, limit: LIMIT });
      setData(res.data);
      setError('');
    } catch (err) {
      setError(err.response?.status === 403 ? 'Réservé aux administrateurs.' : 'Impossible de charger le journal.');
    }
  }, [page]);

  useEffect(() => {
    if (!authApi.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    load();
  }, [load, router]);

  const pages = Math.max(1, Math.ceil(data.total / LIMIT));
  const rows = onlyRisky ? data.items.filter((i) => RISKY.has(i.action)) : data.items;

  return (
    <AdminLayout title="Journal d'audit" module="audit">
      <div className="head">
        <div>
          <h1>Journal d'audit</h1>
          <p>{data.total} événement(s) · connexions, modifications et changements de sécurité</p>
        </div>
        <label className="toggle">
          <input type="checkbox" checked={onlyRisky} onChange={(e) => setOnlyRisky(e.target.checked)} />
          Événements sensibles uniquement
        </label>
      </div>

      {error && <div className="msg">{error}</div>}

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Date</th><th>Utilisateur</th><th>Action</th><th>Adresse IP</th></tr>
          </thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={4} className="empty">Aucun événement.</td></tr>}
            {rows.map((i) => (
              <tr key={i.id} className={RISKY.has(i.action) ? 'risky' : ''}>
                <td>{new Date(i.createdAt).toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
                <td>{i.userEmail || '—'}</td>
                <td>{label(i.action)}{i.resourceId ? ` #${i.resourceId}` : ''}</td>
                <td>{i.ip || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pager">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Précédent</button>
        <span>Page {page} / {pages}</span>
        <button disabled={page >= pages} onClick={() => setPage(page + 1)}>Suivant</button>
      </div>

      <style jsx>{`
        .head { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; flex-wrap: wrap; margin-bottom: 20px; }
        .head h1 { font-size: 24px; font-weight: 700; color: #1a1a2e; margin: 0; }
        .head p { margin: 4px 0 0; color: #8c8f9c; font-size: 14px; }
        .toggle { font-size: 13px; color: #4a4d5e; display: flex; align-items: center; gap: 8px; }
        .msg { background: #fdecea; color: #b3261e; padding: 12px 16px; border-radius: 10px; margin-bottom: 16px; font-size: 14px; }
        .table-wrap { background: #fff; border: 1px solid #eef0f2; border-radius: 16px; overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; font-size: 14px; }
        th { text-align: left; font-size: 12px; text-transform: uppercase; letter-spacing: .04em; color: #8c8f9c; padding: 12px 16px; border-bottom: 1px solid #eef0f2; }
        td { padding: 11px 16px; border-bottom: 1px solid #f4f5f7; color: #2b2d3a; white-space: nowrap; }
        tr:last-child td { border-bottom: 0; }
        tr.risky td:nth-child(3) { color: #b3261e; font-weight: 600; }
        .empty { text-align: center; color: #8c8f9c; padding: 28px; }
        .pager { display: flex; align-items: center; justify-content: center; gap: 14px; margin-top: 16px; font-size: 13px; color: #4a4d5e; }
        .pager button { border: 1px solid #d7e5da; background: #fff; color: #14532d; padding: 7px 14px; border-radius: 10px; cursor: pointer; }
        .pager button:disabled { opacity: .5; cursor: default; }
      `}</style>
    </AdminLayout>
  );
}
