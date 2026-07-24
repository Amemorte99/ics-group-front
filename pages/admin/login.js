// pages/admin/login.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { authApi } from '../../utils/adminApi';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      router.push('/admin');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authApi.login(email, password);
      console.log('✅ Login success:', response.data);

      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminUser', JSON.stringify(response.data.user));
      
      window.location.href = '/admin';
    } catch (err) {
      console.error('❌ Erreur:', err);
      console.error('❌ Response:', err.response);
      
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error ||
                          'Email ou mot de passe incorrect. Veuillez réessayer.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Background gradient */}
      <div className="login-bg">
        <div className="bg-circle c1"></div>
        <div className="bg-circle c2"></div>
        <div className="bg-circle c3"></div>
      </div>

      <div className="login-card" >
        {/* ✅ Bouton retour à l'accueil */}
        <Link href="/" >
          <a className="back-home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Retour à l'accueil
          </a>
        </Link>

        {/* Logo */}
        <div className="login-header">
          <div className="logo-container">
            <div className="logo-icon">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <span className="logo-text">ICS</span>
          </div>
          <h1>Bienvenue</h1>
          <p>Connectez-vous à votre espace d'administration</p>
        </div>

        {/* Error */}
        {error && (
          <div className="error-alert">
            <span className="error-icon">⚠️</span>
            {error}
            <button className="error-close" onClick={() => setError('')}>✕</button>
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>
              <span className="label-icon">📧</span>
              Adresse email
            </label>
            <input
              type="email"
              placeholder="admin@icsgroupe.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>
              <span className="label-icon">🔒</span>
              Mot de passe
            </label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Connexion en cours...
              </>
            ) : (
              <>
                <span>Se connecter</span>
                <span className="btn-arrow">→</span>
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <span className="footer-dot"></span>
          <span>ICS GROUPE © 2026</span>
          <span className="footer-dot"></span>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          background: #0A0A1A;
          font-family: 'Inter', -apple-system, sans-serif;
          overflow: hidden;
        }

        /* Background */
        .login-bg {
          position: fixed;
          inset: 0;
          overflow: hidden;
          z-index: 0;
        }

        .bg-circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
          animation: float 20s ease-in-out infinite;
        }

        .c1 {
          width: 500px;
          height: 500px;
          background: #1B5E20;
          top: -150px;
          right: -100px;
          animation-delay: 0s;
        }

        .c2 {
          width: 400px;
          height: 400px;
          background: #4CAF50;
          bottom: -100px;
          left: -100px;
          animation-delay: -7s;
        }

        .c3 {
          width: 300px;
          height: 300px;
          background: #0A0A2E;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -14s;
          opacity: 0.5;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -30px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 30px) scale(1.05); }
        }

        /* Card */
        .login-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 420px;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          border-radius: 32px;
          padding: 48px 40px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
          animation: slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
          transform: translateY(30px);
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Header */
        .login-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 24px;
        }

        .logo-icon {
          display: flex;
          gap: 4px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4CAF50, #1B5E20);
          display: inline-block;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        .dot:nth-child(2) { animation-delay: 0.3s; }
        .dot:nth-child(3) { animation-delay: 0.6s; }

        @keyframes pulse-dot {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }

        .logo-text {
          font-size: 28px;
          font-weight: 800;
          color: #1B5E20;
          letter-spacing: -0.5px;
        }

        .login-header h1 {
          font-size: 26px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 6px;
          letter-spacing: -0.5px;
        }

        .login-header p {
          font-size: 14px;
          color: #8c8f9c;
          font-weight: 400;
        }

        /* Error */
        .error-alert {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(239, 83, 80, 0.08);
          border: 1px solid rgba(239, 83, 80, 0.15);
          color: #EF5350;
          padding: 12px 16px;
          border-radius: 12px;
          margin-bottom: 20px;
          font-size: 14px;
          animation: shake 0.4s ease;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }

        .error-icon { font-size: 18px; }
        .error-close {
          margin-left: auto;
          background: none;
          border: none;
          color: #EF5350;
          cursor: pointer;
          font-size: 16px;
          padding: 0 4px;
        }

        /* Form */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-size: 13px;
          font-weight: 600;
          color: #1a1a2e;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .label-icon { font-size: 16px; }

        .form-group input {
          padding: 14px 18px;
          border: 2px solid #eef0f2;
          border-radius: 14px;
          font-size: 15px;
          font-family: inherit;
          transition: all 0.3s ease;
          background: #f8f9fb;
          color: #1a1a2e;
          width: 100%;
        }

        .form-group input:focus {
          outline: none;
          border-color: #4CAF50;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(76, 175, 80, 0.1);
        }

        .form-group input::placeholder {
          color: #b0b2b8;
        }

        .password-wrapper {
          position: relative;
        }

        .password-wrapper input {
          padding-right: 50px;
        }

        .toggle-password {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          font-size: 18px;
          padding: 4px;
          opacity: 0.6;
          transition: opacity 0.2s;
        }

        .toggle-password:hover {
          opacity: 1;
        }

        .login-btn {
          padding: 16px 24px;
          border: none;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 600;
          font-family: inherit;
          background: linear-gradient(135deg, #1B5E20, #4CAF50);
          color: #fff;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 4px;
        }

        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(27, 94, 32, 0.35);
        }

        .login-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-arrow {
          transition: transform 0.3s ease;
        }

        .login-btn:hover:not(:disabled) .btn-arrow {
          transform: translateX(4px);
        }

        .spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Footer */
        .login-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 28px;
          font-size: 12px;
          color: #8c8f9c;
        }

        .footer-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #4CAF50;
          display: inline-block;
        }

        /* ✅ Bouton retour à l'accueil */
        .back-home {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #1B5E20;
          text-decoration: none;
          font-size: 14px;
          font-weight: 400;
          transition: all 0.3s ease;
          margin-bottom: 20px;
          padding: 6px 14px;
          border-radius: 50px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.06);
        }

        .back-home:hover {
          color: #fff;
          background: #4CAF50;
          transform: translateX(-4px);
        }

        .back-home svg {
          flex-shrink: 0;
        }

        /* Responsive */
        @media (max-width: 480px) {
          .login-card {
            padding: 32px 24px;
            border-radius: 24px;
          }
          .login-header h1 {
            font-size: 22px;
          }
          .logo-text {
            font-size: 24px;
          }
          .login-form {
            gap: 16px;
          }
          .form-group input {
            padding: 12px 16px;
            font-size: 14px;
          }
          .login-btn {
            padding: 14px 20px;
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
}