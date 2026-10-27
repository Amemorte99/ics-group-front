// pages/admin/security/index.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { authApi } from '../../../utils/adminApi';
import AdminLayout from '../../../components/AdminLayout';

const errorText = (err, fallback) => {
  const detail = err.response?.data?.message;
  return Array.isArray(detail) ? detail.join(' · ') : detail || fallback;
};

export default function AdminSecurity() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  // mot de passe
  const [pwd, setPwd] = useState({ current: '', next: '', confirm: '' });
  const [pwdBusy, setPwdBusy] = useState(false);

  // double authentification
  const [setup, setSetup] = useState(null); // { qrCode, secret }
  const [code, setCode] = useState('');
  const [recoveryCodes, setRecoveryCodes] = useState(null);
  const [disable, setDisable] = useState({ open: false, password: '', code: '' });

  useEffect(() => {
    if (!authApi.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    authApi
      .profile()
      .then((res) => setProfile(res.data))
      .catch(() => setMessage({ type: 'error', text: 'Impossible de charger votre profil.' }));
  }, [router]);

  const notify = (type, text) => setMessage({ type, text });

  const changePassword = async (e) => {
    e.preventDefault();
    if (pwd.next !== pwd.confirm) return notify('error', 'La confirmation ne correspond pas au nouveau mot de passe.');
    setPwdBusy(true);
    try {
      await authApi.changePassword(pwd.current, pwd.next);
      authApi.logout(); // toutes les sessions sont révoquées côté serveur : on se reconnecte
    } catch (err) {
      notify('error', errorText(err, 'Impossible de changer le mot de passe.'));
      setPwdBusy(false);
    }
  };

  const startSetup = async () => {
    try {
      const res = await authApi.setupTwoFactor();
      setSetup(res.data);
      setMessage({ type: '', text: '' });
    } catch (err) {
      notify('error', errorText(err, 'Configuration impossible.'));
    }
  };

  const enable = async (e) => {
    e.preventDefault();
    try {
      const res = await authApi.enableTwoFactor(code.trim());
      setRecoveryCodes(res.data.recoveryCodes);
      setSetup(null);
      setCode('');
      setProfile((p) => ({ ...p, twoFactorEnabled: true }));
      notify('ok', 'Double authentification activée.');
    } catch (err) {
      notify('error', errorText(err, 'Code incorrect.'));
    }
  };

  const confirmDisable = async (e) => {
    e.preventDefault();
    try {
      await authApi.disableTwoFactor(disable.password, disable.code.trim());
      setDisable({ open: false, password: '', code: '' });
      setProfile((p) => ({ ...p, twoFactorEnabled: false }));
      notify('ok', 'Double authentification désactivée.');
    } catch (err) {
      notify('error', errorText(err, 'Impossible de désactiver.'));
    }
  };

  return (
    <AdminLayout title="Sécurité" module="security">
      <div className="head">
        <h1>Sécurité du compte</h1>
        <p>{profile ? `${profile.name} · ${profile.email}` : ''}</p>
      </div>

      {message.text && <div className={`msg ${message.type}`}>{message.text}</div>}

      <div className="grid">
        <section className="card">
          <h2>Double authentification</h2>
          <p className="hint">
            Ajoute un code à usage unique (application Google Authenticator, Authy, 1Password…) à chaque connexion.
            Fortement recommandé pour les administrateurs.
          </p>

          {profile?.twoFactorEnabled && !recoveryCodes && (
            <>
              <p className="status on">Activée</p>
              {!disable.open ? (
                <button className="danger" onClick={() => setDisable({ ...disable, open: true })}>Désactiver</button>
              ) : (
                <form onSubmit={confirmDisable}>
                  <label htmlFor="dpwd">Mot de passe</label>
                  <input id="dpwd" type="password" value={disable.password} onChange={(e) => setDisable({ ...disable, password: e.target.value })} required />
                  <label htmlFor="dcode">Code à 6 chiffres ou code de secours</label>
                  <input id="dcode" value={disable.code} onChange={(e) => setDisable({ ...disable, code: e.target.value })} required />
                  <div className="buttons">
                    <button className="danger" type="submit">Confirmer la désactivation</button>
                    <button type="button" onClick={() => setDisable({ open: false, password: '', code: '' })}>Annuler</button>
                  </div>
                </form>
              )}
            </>
          )}

          {profile && !profile.twoFactorEnabled && !setup && (
            <>
              <p className="status off">Désactivée</p>
              <button className="primary" onClick={startSetup}>Activer la double authentification</button>
            </>
          )}

          {setup && (
            <form onSubmit={enable}>
              <ol className="steps">
                <li>Scannez ce QR code avec votre application d'authentification.</li>
                <li>Saisissez le code à 6 chiffres qu'elle affiche.</li>
              </ol>
              <img className="qr" src={setup.qrCode} alt="QR code de configuration" width="180" height="180" />
              <p className="hint">Saisie manuelle : <code>{setup.secret}</code></p>
              <label htmlFor="code">Code à 6 chiffres</label>
              <input id="code" inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={code} onChange={(e) => setCode(e.target.value)} required />
              <div className="buttons">
                <button className="primary" type="submit">Vérifier et activer</button>
                <button type="button" onClick={() => setSetup(null)}>Annuler</button>
              </div>
            </form>
          )}

          {recoveryCodes && (
            <div className="recovery">
              <h3>Codes de secours</h3>
              <p className="hint">
                Conservez-les en lieu sûr : chacun ne sert qu'une fois si vous perdez votre téléphone. Ils ne seront plus affichés.
              </p>
              <ul>{recoveryCodes.map((c) => <li key={c}><code>{c}</code></li>)}</ul>
              <button onClick={() => setRecoveryCodes(null)}>J'ai noté mes codes</button>
            </div>
          )}
        </section>

        <section className="card">
          <h2>Mot de passe</h2>
          <p className="hint">12 caractères minimum. Le changement déconnecte toutes vos sessions.</p>
          <form onSubmit={changePassword}>
            <label htmlFor="cur">Mot de passe actuel</label>
            <input id="cur" type="password" autoComplete="current-password" value={pwd.current} onChange={(e) => setPwd({ ...pwd, current: e.target.value })} required />
            <label htmlFor="new">Nouveau mot de passe</label>
            <input id="new" type="password" autoComplete="new-password" minLength={12} value={pwd.next} onChange={(e) => setPwd({ ...pwd, next: e.target.value })} required />
            <label htmlFor="conf">Confirmation</label>
            <input id="conf" type="password" autoComplete="new-password" minLength={12} value={pwd.confirm} onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })} required />
            <div className="buttons">
              <button className="primary" type="submit" disabled={pwdBusy}>{pwdBusy ? 'Enregistrement…' : 'Changer le mot de passe'}</button>
            </div>
          </form>
        </section>
      </div>

      <style jsx>{`
        .head h1 { font-size: 24px; font-weight: 700; color: #1a1a2e; margin: 0; }
        .head p { margin: 4px 0 20px; color: #8c8f9c; font-size: 14px; }
        .msg { padding: 12px 16px; border-radius: 10px; margin-bottom: 16px; font-size: 14px; }
        .msg.ok { background: #e8f5e9; color: #14532d; }
        .msg.error { background: #fdecea; color: #b3261e; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 20px; align-items: start; }
        .card { background: #fff; border: 1px solid #eef0f2; border-radius: 16px; padding: 24px; display: flex; flex-direction: column; gap: 6px; }
        h2 { font-size: 17px; margin: 0; color: #1a1a2e; }
        h3 { font-size: 15px; margin: 0; }
        .hint { font-size: 13px; color: #8c8f9c; margin: 0 0 8px; }
        .status { font-size: 13px; font-weight: 600; margin: 4px 0 10px; }
        .status.on { color: #14532d; } .status.off { color: #b3261e; }
        label { font-size: 13px; font-weight: 600; color: #1a1a2e; margin-top: 10px; display: block; }
        input { border: 1px solid #e5e8ec; border-radius: 10px; padding: 10px 14px; font-size: 14px; width: 100%; margin-top: 4px; }
        input:focus { outline: 2px solid rgba(34, 163, 74, 0.35); border-color: #22a34a; }
        button { border: 1px solid #d7e5da; background: #fff; color: #14532d; padding: 9px 16px; border-radius: 10px; font-size: 13px; font-weight: 500; cursor: pointer; align-self: flex-start; }
        button.primary { background: #14532d; border-color: #14532d; color: #fff; }
        button.danger { color: #b3261e; border-color: #f1c9c6; }
        button:disabled { opacity: .6; cursor: wait; }
        .buttons { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 14px; }
        .steps { font-size: 13px; color: #4a4d5e; padding-left: 18px; margin: 0 0 8px; }
        .qr { border: 1px solid #eef0f2; border-radius: 10px; padding: 6px; align-self: flex-start; }
        code { background: #f3f5f7; padding: 2px 6px; border-radius: 6px; font-size: 12px; word-break: break-all; }
        .recovery ul { list-style: none; padding: 0; margin: 8px 0 14px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
        .recovery code { font-size: 14px; display: block; text-align: center; padding: 8px; }
      `}</style>
    </AdminLayout>
  );
}
