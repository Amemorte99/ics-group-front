// components/admin/MediaPicker.js
import { useState, useEffect } from 'react';
import { adminMediaApi } from '../../utils/adminApi';

// Fenêtre de sélection d'une image de la médiathèque.
export default function MediaPicker({ onSelect, onClose }) {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      adminMediaApi
        .getAll(search)
        .then((res) => setAssets(res.data || []))
        .catch(() => setAssets([]))
        .finally(() => setLoading(false));
    }, 250);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="mp-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Choisir une image">
      <div className="mp-modal" onClick={(e) => e.stopPropagation()}>
        <header>
          <h3>Choisir une image</h3>
          <button onClick={onClose} aria-label="Fermer">×</button>
        </header>
        <input type="search" placeholder="Rechercher par nom ou texte alternatif…" value={search} onChange={(e) => setSearch(e.target.value)} autoFocus />
        <div className="grid">
          {loading && <p className="note">Chargement…</p>}
          {!loading && assets.length === 0 && <p className="note">Aucune image. Importez-en depuis la médiathèque.</p>}
          {assets.map((a) => (
            <button key={a.id} className="tile" onClick={() => onSelect(a)}>
              <img src={a.url} alt={a.alt || a.filename} loading="lazy" />
              <span>{a.filename}</span>
            </button>
          ))}
        </div>
      </div>
      <style jsx>{`
        .mp-overlay { position: fixed; inset: 0; background: rgba(10, 20, 14, 0.55); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .mp-modal { background: #fff; border-radius: 16px; width: min(760px, 100%); max-height: 85vh; display: flex; flex-direction: column; padding: 22px; gap: 14px; }
        header { display: flex; justify-content: space-between; align-items: center; }
        h3 { margin: 0; font-size: 18px; color: #1a1a2e; }
        header button { border: 0; background: transparent; font-size: 26px; line-height: 1; cursor: pointer; color: #8c8f9c; }
        input { border: 1px solid #e5e8ec; border-radius: 10px; padding: 10px 14px; font-size: 14px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 12px; overflow-y: auto; min-height: 120px; }
        .tile { border: 1px solid #eef0f2; border-radius: 12px; background: #fff; padding: 0; cursor: pointer; overflow: hidden; text-align: left; }
        .tile:hover { border-color: #22a34a; }
        .tile img { width: 100%; height: 96px; object-fit: cover; display: block; background: #f3f5f7; }
        .tile span { display: block; padding: 6px 8px; font-size: 12px; color: #4a4d5e; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .note { grid-column: 1 / -1; text-align: center; color: #8c8f9c; font-size: 14px; }
      `}</style>
    </div>
  );
}
