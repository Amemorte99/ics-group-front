// pages/admin/messages/index.js
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { adminContactApi, authApi } from '../../../utils/adminApi';
import AdminLayout from '../../../components/AdminLayout';
import AdminIcon from '../../../components/admin/AdminIcon';

const formatDate = (value) =>
  new Date(value).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

export default function AdminMessages() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState('');

  const fetchMessages = useCallback(async () => {
    try {
      const response = await adminContactApi.getAll();
      setMessages(response.data || []);
      setError('');
    } catch (err) {
      setError('Impossible de charger les messages.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authApi.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    fetchMessages();
  }, [fetchMessages, router]);

  const visible = messages.filter((m) => filter === 'all' || !m.isRead);
  const selected = messages.find((m) => m.id === selectedId) || null;
  const unread = messages.filter((m) => !m.isRead).length;

  const setRead = async (message, isRead) => {
    setMessages((list) => list.map((m) => (m.id === message.id ? { ...m, isRead } : m)));
    try {
      await adminContactApi.setRead(message.id, isRead);
    } catch (err) {
      fetchMessages();
    }
  };

  const open = (message) => {
    setSelectedId(message.id);
    if (!message.isRead) setRead(message, true);
  };

  const remove = async (message) => {
    if (!confirm('Supprimer définitivement ce message ?')) return;
    try {
      await adminContactApi.delete(message.id);
      setSelectedId(null);
      fetchMessages();
    } catch (err) {
      alert(err.response?.status === 403 ? 'Réservé aux administrateurs.' : 'Erreur lors de la suppression');
    }
  };

  return (
    <AdminLayout title="Messages" module="messages">
      <div className="msg-head">
        <div>
          <h1>Messages de contact</h1>
          <p>{messages.length} message(s) reçu(s) · {unread} non lu(s)</p>
        </div>
        <div className="msg-tabs" role="tablist">
          <button className={filter === 'all' ? 'on' : ''} onClick={() => setFilter('all')}>Tous</button>
          <button className={filter === 'unread' ? 'on' : ''} onClick={() => setFilter('unread')}>Non lus</button>
        </div>
      </div>

      {error && <div className="msg-error">{error}</div>}

      <div className="msg-layout">
        <ul className="msg-list">
          {loading && <li className="msg-empty">Chargement…</li>}
          {!loading && visible.length === 0 && <li className="msg-empty">Aucun message.</li>}
          {visible.map((m) => (
            <li key={m.id}>
              <button className={`msg-item ${m.id === selectedId ? 'active' : ''} ${m.isRead ? '' : 'unread'}`} onClick={() => open(m)}>
                <span className="msg-dot" />
                <span className="msg-main">
                  <span className="msg-top">
                    <strong>{m.name}</strong>
                    <time>{formatDate(m.createdAt)}</time>
                  </span>
                  <span className="msg-subject">{m.subject}</span>
                  <span className="msg-preview">{m.message}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <section className="msg-detail">
          {!selected ? (
            <div className="msg-placeholder">
              <AdminIcon name="mail" size={36} />
              <p>Sélectionnez un message pour le lire</p>
            </div>
          ) : (
            <>
              <header>
                <h2>{selected.subject}</h2>
                <div className="msg-meta">
                  <span>{selected.name}</span>
                  <a href={`mailto:${selected.email}`}>{selected.email}</a>
                  {selected.phone && <a href={`tel:${selected.phone}`}>{selected.phone}</a>}
                  <time>{formatDate(selected.createdAt)}</time>
                </div>
              </header>
              <p className="msg-body">{selected.message}</p>
              <footer>
                <a className="btn-reply" href={`mailto:${selected.email}?subject=${encodeURIComponent('Re: ' + selected.subject)}`}>
                  Répondre par email
                </a>
                <button onClick={() => setRead(selected, false)}>Marquer non lu</button>
                <button className="danger" onClick={() => remove(selected)}>Supprimer</button>
              </footer>
            </>
          )}
        </section>
      </div>

      <style jsx>{`
        .msg-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; flex-wrap: wrap; margin-bottom: 20px; }
        .msg-head h1 { font-size: 24px; font-weight: 700; color: #1a1a2e; margin: 0; }
        .msg-head p { margin: 4px 0 0; color: #8c8f9c; font-size: 14px; }
        .msg-tabs { display: flex; background: #fff; border: 1px solid #e5e8ec; border-radius: 10px; padding: 3px; }
        .msg-tabs button { border: 0; background: transparent; padding: 6px 16px; border-radius: 8px; font-size: 13px; color: #4a4d5e; cursor: pointer; }
        .msg-tabs button.on { background: #14532d; color: #fff; }
        .msg-error { background: #fdecea; color: #b3261e; padding: 12px 16px; border-radius: 10px; margin-bottom: 16px; font-size: 14px; }
        .msg-layout { display: grid; grid-template-columns: minmax(280px, 380px) 1fr; gap: 20px; align-items: start; }
        .msg-list { list-style: none; margin: 0; padding: 0; background: #fff; border: 1px solid #eef0f2; border-radius: 16px; overflow: hidden; max-height: 70vh; overflow-y: auto; }
        .msg-empty { padding: 32px; text-align: center; color: #8c8f9c; font-size: 14px; }
        .msg-item { width: 100%; display: flex; gap: 10px; text-align: left; border: 0; border-bottom: 1px solid #f1f3f5; background: #fff; padding: 14px 16px; cursor: pointer; }
        .msg-item:hover, .msg-item.active { background: #f3f8f4; }
        .msg-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 7px; flex: none; background: transparent; }
        .msg-item.unread .msg-dot { background: #22a34a; }
        .msg-main { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1; }
        .msg-top { display: flex; justify-content: space-between; gap: 8px; font-size: 14px; color: #1a1a2e; }
        .msg-top time { font-size: 12px; color: #8c8f9c; white-space: nowrap; }
        .msg-item:not(.unread) .msg-top strong { font-weight: 500; }
        .msg-subject { font-size: 13px; color: #1a1a2e; }
        .msg-preview { font-size: 13px; color: #8c8f9c; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .msg-detail { background: #fff; border: 1px solid #eef0f2; border-radius: 16px; padding: 28px; min-height: 320px; }
        .msg-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; min-height: 260px; color: #b0b4bd; }
        .msg-detail h2 { font-size: 20px; margin: 0 0 12px; color: #1a1a2e; }
        .msg-meta { display: flex; flex-wrap: wrap; gap: 6px 16px; font-size: 13px; color: #4a4d5e; padding-bottom: 16px; border-bottom: 1px solid #f1f3f5; }
        .msg-meta a { color: #14532d; }
        .msg-body { white-space: pre-wrap; word-break: break-word; font-size: 15px; line-height: 1.7; color: #2b2d3a; margin: 20px 0 28px; }
        footer { display: flex; flex-wrap: wrap; gap: 10px; }
        footer button, footer .btn-reply { border: 1px solid #d7e5da; background: #fff; color: #14532d; padding: 9px 16px; border-radius: 10px; font-size: 13px; font-weight: 500; cursor: pointer; text-decoration: none; }
        footer .btn-reply { background: #14532d; border-color: #14532d; color: #fff; }
        footer button.danger { color: #b3261e; border-color: #f1c9c6; margin-left: auto; }
        @media (max-width: 900px) { .msg-layout { grid-template-columns: 1fr; } }
      `}</style>
    </AdminLayout>
  );
}
