// pages/admin/media/index.js
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { adminMediaApi, authApi } from '../../../utils/adminApi';
import AdminLayout from '../../../components/AdminLayout';
import AdminIcon from '../../../components/admin/AdminIcon';

const formatSize = (bytes) => (bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} Mo` : `${Math.max(1, Math.round(bytes / 1024))} Ko`);

export default function AdminMedia() {
  const router = useRouter();
  const inputRef = useRef(null);
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [alt, setAlt] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const load = useCallback(async (term) => {
    try {
      const res = await adminMediaApi.getAll(term);
      setAssets(res.data || []);
    } catch (err) {
      setMessage({ type: 'error', text: 'Impossible de charger la médiathèque.' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authApi.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    const timer = setTimeout(() => load(search), 250);
    return () => clearTimeout(timer);
  }, [search, load, router]);

  const selected = assets.find((a) => a.id === selectedId) || null;

  const select = (asset) => {
    setSelectedId(asset.id);
    setAlt(asset.alt || '');
  };

  const upload = async (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setMessage({ type: '', text: '' });
    try {
      const res = await adminMediaApi.upload(files);
      setMessage({ type: 'ok', text: `${res.data.length} image(s) importée(s).` });
      await load(search);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || "Échec de l'import (formats JPG, PNG, GIF, WebP — 5 Mo max)." });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const saveAlt = async () => {
    try {
      const res = await adminMediaApi.updateAlt(selected.id, alt);
      setAssets((list) => list.map((a) => (a.id === selected.id ? res.data : a)));
      setMessage({ type: 'ok', text: 'Texte alternatif enregistré.' });
    } catch (err) {
      setMessage({ type: 'error', text: "Erreur lors de l'enregistrement." });
    }
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(selected.url);
      setMessage({ type: 'ok', text: 'Lien copié.' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Copie impossible, sélectionnez le lien manuellement.' });
    }
  };

  const remove = async () => {
    if (!confirm('Supprimer définitivement cette image ? Elle disparaîtra des pages qui l\'utilisent.')) return;
    try {
      await adminMediaApi.delete(selected.id);
      setSelectedId(null);
      await load(search);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.status === 403 ? 'Réservé aux administrateurs.' : 'Erreur lors de la suppression.' });
    }
  };

  return (
    <AdminLayout title="Médiathèque" module="media">
      <div className="head">
        <div>
          <h1>Médiathèque</h1>
          <p>{assets.length} image(s)</p>
        </div>
        <div className="actions">
          <input type="search" placeholder="Rechercher…" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="primary" onClick={() => inputRef.current?.click()} disabled={uploading}>
            <AdminIcon name="plus" size={16} /> {uploading ? 'Import en cours…' : 'Importer des images'}
          </button>
          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/gif,image/webp" multiple hidden onChange={(e) => upload(e.target.files)} />
        </div>
      </div>

      {message.text && <div className={`msg ${message.type}`}>{message.text}</div>}

      <div
        className="layout"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          upload(e.dataTransfer.files);
        }}
      >
        <div className="grid">
          {loading && <p className="note">Chargement…</p>}
          {!loading && assets.length === 0 && (
            <p className="note">Aucune image. Glissez des fichiers ici ou cliquez sur « Importer des images ».</p>
          )}
          {assets.map((a) => (
            <button key={a.id} className={`tile ${a.id === selectedId ? 'active' : ''}`} onClick={() => select(a)}>
              <img src={a.url} alt={a.alt || a.filename} loading="lazy" />
              {!a.alt && <span className="warn" title="Texte alternatif manquant">ALT</span>}
            </button>
          ))}
        </div>

        <aside className="detail">
          {!selected ? (
            <p className="note">Sélectionnez une image pour voir ses détails.</p>
          ) : (
            <>
              <img className="preview" src={selected.url} alt={selected.alt || selected.filename} />
              <dl>
                <dt>Fichier</dt><dd>{selected.filename}</dd>
                <dt>Taille</dt><dd>{formatSize(selected.bytes)}{selected.width ? ` · ${selected.width}×${selected.height}` : ''}</dd>
                <dt>Ajouté le</dt><dd>{new Date(selected.createdAt).toLocaleDateString('fr-FR')}{selected.uploadedBy ? ` par ${selected.uploadedBy}` : ''}</dd>
              </dl>
              <label htmlFor="alt">Texte alternatif</label>
              <input id="alt" value={alt} maxLength={255} onChange={(e) => setAlt(e.target.value)} placeholder="Décrivez l'image (SEO et accessibilité)" />
              <div className="buttons">
                <button className="primary" onClick={saveAlt}>Enregistrer</button>
                <button onClick={copyUrl}>Copier le lien</button>
                <button className="danger" onClick={remove}>Supprimer</button>
              </div>
            </>
          )}
        </aside>
      </div>

      <style jsx>{`
        .head { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; flex-wrap: wrap; margin-bottom: 20px; }
        .head h1 { font-size: 24px; font-weight: 700; color: #1a1a2e; margin: 0; }
        .head p { margin: 4px 0 0; color: #8c8f9c; font-size: 14px; }
        .actions { display: flex; gap: 10px; flex-wrap: wrap; }
        .actions input[type='search'], .detail input { border: 1px solid #e5e8ec; border-radius: 10px; padding: 9px 14px; font-size: 14px; background: #fff; }
        button { border: 1px solid #d7e5da; background: #fff; color: #14532d; padding: 9px 16px; border-radius: 10px; font-size: 13px; font-weight: 500; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; }
        button.primary { background: #14532d; border-color: #14532d; color: #fff; }
        button.danger { color: #b3261e; border-color: #f1c9c6; }
        button:disabled { opacity: 0.6; cursor: wait; }
        .msg { padding: 12px 16px; border-radius: 10px; margin-bottom: 16px; font-size: 14px; }
        .msg.ok { background: #e8f5e9; color: #14532d; }
        .msg.error { background: #fdecea; color: #b3261e; }
        .layout { display: grid; grid-template-columns: 1fr 320px; gap: 20px; align-items: start; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; background: #fff; border: 1px dashed #cfd8d1; border-radius: 16px; padding: 16px; min-height: 260px; align-content: start; }
        .tile { position: relative; padding: 0; border: 2px solid transparent; border-radius: 12px; overflow: hidden; aspect-ratio: 1; background: #f3f5f7; }
        .tile.active { border-color: #22a34a; }
        .tile img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .warn { position: absolute; top: 6px; left: 6px; background: #fff3cd; color: #8a6d00; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 6px; }
        .note { grid-column: 1 / -1; text-align: center; color: #8c8f9c; font-size: 14px; margin: 24px 0; }
        .detail { background: #fff; border: 1px solid #eef0f2; border-radius: 16px; padding: 18px; position: sticky; top: 16px; display: flex; flex-direction: column; gap: 8px; }
        .preview { width: 100%; max-height: 200px; object-fit: contain; background: #f3f5f7; border-radius: 10px; }
        dl { margin: 6px 0; display: grid; grid-template-columns: 70px 1fr; gap: 4px 8px; font-size: 13px; }
        dt { color: #8c8f9c; } dd { margin: 0; color: #1a1a2e; word-break: break-all; }
        label { font-size: 13px; font-weight: 600; color: #1a1a2e; margin-top: 6px; }
        .buttons { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
        @media (max-width: 960px) { .layout { grid-template-columns: 1fr; } .detail { position: static; } }
      `}</style>
    </AdminLayout>
  );
}
