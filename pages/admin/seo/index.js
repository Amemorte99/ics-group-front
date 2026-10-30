// pages/admin/seo/index.js
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { adminSeoApi, authApi } from '../../../utils/adminApi';
import AdminLayout from '../../../components/AdminLayout';
import MediaPicker from '../../../components/admin/MediaPicker';
import { SEO_PAGES, SITE_URL } from '../../../lib/site';
import { LOCALES, LOCALE_META } from '../../../lib/i18n';

const EMPTY = { title: '', description: '', keywords: '', ogImage: '', noIndex: false };
const TITLE_MAX = 60;
const DESC_MAX = 160;

const counterClass = (length, max) => (length === 0 ? '' : length > max ? 'over' : 'ok');

export default function AdminSeo() {
  const router = useRouter();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('fr');
  const [basePath, setBasePath] = useState('/');
  // Le français est à la racine ; /en et /ar pour les autres langues.
  const withLang = (p, code = lang) => (code === 'fr' ? p : `/${code}${p === '/' ? '' : p}`);
  const path = withLang(basePath);
  const [form, setForm] = useState(EMPTY);
  const [customPath, setCustomPath] = useState('');
  const [picker, setPicker] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const byPath = useCallback((list) => Object.fromEntries(list.map((e) => [e.path, e])), []);
  const entry = byPath(entries)[path];

  const load = useCallback(async () => {
    try {
      const res = await adminSeoApi.getAll();
      setEntries(res.data || []);
    } catch (err) {
      setMessage({ type: 'error', text: 'Impossible de charger les réglages SEO.' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authApi.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    load();
  }, [load, router]);

  useEffect(() => {
    const current = entries.find((e) => e.path === path);
    setForm(
      current
        ? { title: current.title || '', description: current.description || '', keywords: current.keywords || '', ogImage: current.ogImage || '', noIndex: !!current.noIndex }
        : EMPTY
    );
  }, [path, entries]);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const save = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    try {
      await adminSeoApi.save({ path, ...form });
      await load();
      setMessage({ type: 'ok', text: 'Enregistré. Le site applique le changement sous 5 minutes.' });
    } catch (err) {
      const detail = err.response?.data?.message;
      setMessage({ type: 'error', text: Array.isArray(detail) ? detail.join(' · ') : detail || "Erreur lors de l'enregistrement." });
    }
  };

  const reset = async () => {
    if (!entry || !confirm('Revenir aux réglages par défaut de cette page ?')) return;
    try {
      await adminSeoApi.delete(entry.id);
      await load();
      setMessage({ type: 'ok', text: 'Réglages par défaut rétablis.' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Erreur lors de la réinitialisation.' });
    }
  };

  const addCustom = () => {
    const value = customPath.trim();
    if (!value.startsWith('/')) {
      setMessage({ type: 'error', text: 'Le chemin doit commencer par / (ex : /blog/mon-article).' });
      return;
    }
    setBasePath(value.length > 1 ? value.replace(/\/+$/, '') : value);
    setCustomPath('');
    setMessage({ type: '', text: '' });
  };

  const known = new Set(SEO_PAGES.map((p) => p.path));
  const stripLang = (p) => p.replace(/^\/(en|ar)(?=\/|$)/, '') || '/';
  const customEntries = entries.filter((e) => !known.has(stripLang(e.path)));
  const customBases = [...new Set(customEntries.map((e) => stripLang(e.path)))];
  const pages = [...SEO_PAGES, ...customBases.map((p) => ({ path: p, label: p })), ...(!known.has(basePath) && !customBases.includes(basePath) ? [{ path: basePath, label: basePath }] : [])];
  const configured = byPath(entries);
  const isConfigured = (p) => LOCALES.some((code) => configured[withLang(p, code)]);
  const previewTitle = form.title || 'Titre par défaut de la page';
  const previewDesc = form.description || 'La description par défaut de la page sera utilisée.';

  return (
    <AdminLayout title="SEO" module="seo">
      <div className="head">
        <h1>Référencement des pages</h1>
        <p>Personnalisez le titre, la description et l'image de partage de chaque page. Les champs vides gardent la valeur par défaut.</p>
      </div>

      {message.text && <div className={`msg ${message.type}`}>{message.text}</div>}

      <div className="layout">
        <nav className="pages" aria-label="Pages">
          <div className="langs" role="tablist" aria-label="Langue">
            {LOCALES.map((code) => (
              <button key={code} role="tab" aria-selected={lang === code} className={lang === code ? 'on' : ''} onClick={() => setLang(code)}>
                {LOCALE_META[code].label}
              </button>
            ))}
          </div>
          {loading && <p className="note">Chargement…</p>}
          {pages.map((p) => (
            <button key={p.path} className={`page ${p.path === basePath ? 'active' : ''}`} onClick={() => setBasePath(p.path)}>
              <span>{p.label}</span>
              {isConfigured(p.path) && <i title="Personnalisé" />}
            </button>
          ))}
          <div className="custom">
            <input value={customPath} onChange={(e) => setCustomPath(e.target.value)} placeholder="/blog/mon-article" onKeyDown={(e) => e.key === 'Enter' && addCustom()} />
            <button onClick={addCustom}>Ajouter</button>
          </div>
        </nav>

        <form className="editor" onSubmit={save}>
          <h2>{path}</h2>

          <div className="snippet" aria-label="Aperçu Google">
            <span className="s-url">{SITE_URL}{path === '/' ? '' : path}</span>
            <span className="s-title">{previewTitle}</span>
            <span className="s-desc">{previewDesc}</span>
          </div>

          <label htmlFor="title">Titre <small className={counterClass(form.title.length, TITLE_MAX)}>{form.title.length}/{TITLE_MAX}</small></label>
          <input id="title" value={form.title} maxLength={120} onChange={set('title')} placeholder="Ex : Audit de cybersécurité au Tchad et en France" />

          <label htmlFor="description">Description <small className={counterClass(form.description.length, DESC_MAX)}>{form.description.length}/{DESC_MAX}</small></label>
          <textarea id="description" rows={3} maxLength={320} value={form.description} onChange={set('description')} placeholder="Résumé affiché dans les résultats Google (recommandé : 120 à 160 caractères)" />

          <label htmlFor="keywords">Mots-clés</label>
          <input id="keywords" value={form.keywords} maxLength={500} onChange={set('keywords')} placeholder="cybersécurité Tchad, audit sécurité N'Djamena, …" />

          <label htmlFor="ogImage">Image de partage (réseaux sociaux)</label>
          <div className="field-row">
            <input id="ogImage" value={form.ogImage} onChange={set('ogImage')} placeholder="https://… ou /images/…" />
            <button type="button" onClick={() => setPicker(true)}>Médiathèque</button>
          </div>
          {form.ogImage && <img className="og" src={form.ogImage} alt="Aperçu de l'image de partage" />}

          <label className="check">
            <input type="checkbox" checked={form.noIndex} onChange={set('noIndex')} />
            Masquer cette page des moteurs de recherche (noindex)
          </label>

          <div className="buttons">
            <button type="submit" className="primary">Enregistrer</button>
            {entry && <button type="button" className="danger" onClick={reset}>Rétablir les valeurs par défaut</button>}
          </div>
        </form>
      </div>

      {picker && (
        <MediaPicker
          onClose={() => setPicker(false)}
          onSelect={(asset) => {
            setForm((f) => ({ ...f, ogImage: asset.url }));
            setPicker(false);
          }}
        />
      )}

      <style jsx>{`
        .head h1 { font-size: 24px; font-weight: 700; color: #1a1a2e; margin: 0; }
        .head p { margin: 4px 0 20px; color: #8c8f9c; font-size: 14px; max-width: 680px; }
        .msg { padding: 12px 16px; border-radius: 10px; margin-bottom: 16px; font-size: 14px; }
        .msg.ok { background: #e8f5e9; color: #14532d; }
        .msg.error { background: #fdecea; color: #b3261e; }
        .layout { display: grid; grid-template-columns: 280px 1fr; gap: 20px; align-items: start; }
        .pages { background: #fff; border: 1px solid #eef0f2; border-radius: 16px; padding: 8px; display: flex; flex-direction: column; gap: 2px; }
        .page { display: flex; justify-content: space-between; align-items: center; border: 0; background: transparent; text-align: left; padding: 10px 12px; border-radius: 10px; font-size: 14px; color: #4a4d5e; cursor: pointer; }
        .page:hover { background: #f3f8f4; }
        .page.active { background: #14532d; color: #fff; }
        .page i { width: 8px; height: 8px; border-radius: 50%; background: #22a34a; }
        .page.active i { background: #fff; }
        .langs { display: flex; gap: 4px; padding: 4px; margin-bottom: 6px; background: #f3f5f7; border-radius: 10px; }
        .langs button { flex: 1; border: 0; background: transparent; padding: 6px 4px; border-radius: 8px; font-size: 12px; color: #4a4d5e; cursor: pointer; }
        .langs button.on { background: #14532d; color: #fff; }
        .custom { display: flex; gap: 6px; padding: 10px 6px 4px; border-top: 1px solid #f1f3f5; margin-top: 6px; }
        .custom input { flex: 1; min-width: 0; }
        .note { color: #8c8f9c; font-size: 14px; padding: 12px; }
        .editor { background: #fff; border: 1px solid #eef0f2; border-radius: 16px; padding: 24px; display: flex; flex-direction: column; gap: 6px; }
        .editor h2 { font-size: 16px; margin: 0 0 8px; color: #14532d; font-family: monospace; }
        .snippet { border: 1px solid #eef0f2; border-radius: 12px; padding: 14px 16px; display: flex; flex-direction: column; gap: 2px; margin-bottom: 10px; background: #fcfdfc; }
        .s-url { font-size: 12px; color: #4d5156; word-break: break-all; }
        .s-title { font-size: 19px; color: #1a0dab; line-height: 1.3; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
        .s-desc { font-size: 13px; color: #4d5156; line-height: 1.5; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
        label { font-size: 13px; font-weight: 600; color: #1a1a2e; margin-top: 10px; display: flex; justify-content: space-between; }
        label small { font-weight: 500; color: #8c8f9c; }
        label small.ok { color: #14532d; } label small.over { color: #b3261e; }
        input, textarea { border: 1px solid #e5e8ec; border-radius: 10px; padding: 10px 14px; font-size: 14px; font-family: inherit; width: 100%; }
        input:focus, textarea:focus { outline: 2px solid rgba(34, 163, 74, 0.35); border-color: #22a34a; }
        .field-row { display: flex; gap: 8px; }
        .og { max-width: 240px; border-radius: 10px; border: 1px solid #eef0f2; margin-top: 6px; }
        .check { flex-direction: row; justify-content: flex-start; align-items: center; gap: 8px; font-weight: 500; }
        .check input { width: auto; }
        button { border: 1px solid #d7e5da; background: #fff; color: #14532d; padding: 9px 16px; border-radius: 10px; font-size: 13px; font-weight: 500; cursor: pointer; white-space: nowrap; }
        button.primary { background: #14532d; border-color: #14532d; color: #fff; }
        button.danger { color: #b3261e; border-color: #f1c9c6; }
        .buttons { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 16px; }
        @media (max-width: 900px) { .layout { grid-template-columns: 1fr; } }
      `}</style>
    </AdminLayout>
  );
}
