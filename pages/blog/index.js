// pages/blog/index.js
import React, { useRef, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Layouts/Navbar';
import Footer from '../../components/Layouts/Footer';
import { blogApi } from '../../utils/api';

export default function BlogPage({ posts = [], error = '' }) {
  const gridRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [isVisible, setIsVisible] = useState(false);

  // Récupérer tous les tags uniques
  const allTags = ['Tous', ...new Set(posts.flatMap(p => p.tags || []))];

  useEffect(() => {
    // Filtrer les posts par tag
    if (activeFilter === 'Tous') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(p => p.tags?.includes(activeFilter)));
    }
  }, [activeFilter, posts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const cards = document.querySelectorAll('.article-card-animated');
    cards.forEach((card) => observer.observe(card));

    // Animation du compteur
    setIsVisible(true);

    return () => observer.disconnect();
  }, [filteredPosts]);

  // Compter les articles par tag
  const getTagCount = (tag) => {
    if (tag === 'Tous') return posts.length;
    return posts.filter(p => p.tags?.includes(tag)).length;
  };

  return (
    <>
      <Head>
        <title>Blog | ICS GROUPE — Cybersécurité & Innovation</title>
        <meta name="description" content="Explorez nos analyses approfondies sur la cybersécurité, les tendances tech et les stratégies digitales qui transforment les entreprises." />
        <meta property="og:title" content="Blog | ICS GROUPE — Cybersécurité & Innovation" />
        <meta property="og:description" content="Explorez nos analyses approfondies sur la cybersécurité, les tendances tech et les stratégies digitales qui transforment les entreprises." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.icsolution.fr/blog" />
        <meta property="og:image" content="https://www.icsolution.fr/images/og-blog.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Navbar />

      {/* ===== HERO CINÉMATIQUE ===== */}
      <section className="hero-cinematic">
        <div className="hero-particles" id="particles"></div>
        <div className="hero-glow"></div>
        <div className="container">
          <div className="hero-wrapper">
            <div className="hero-text pt-5">
              <div className="hero-badge pt-4">
                <span className="badge-dot"></span>
                Notre blog
              </div>
              <h1 className="hero-title">
                <span className="title-line">Là où la</span>
                <span className="title-gradient">cybersécurité</span>
                <span className="title-line">rencontre l'innovation</span>
              </h1>
              <p className="hero-desc">
                Des analyses profondes, des stratégies concrètes et une vision
                prospective pour naviguer dans l'ère numérique.
              </p>
              <div className="hero-cta">
                <a href="#articles" className="cta-primary">
                  Explorer les articles
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <span className="cta-secondary">
                  <span className="cta-stats" id="articleCount">{posts.length}</span>
                  articles disponibles
                </span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="floating-cards">
                <div className="float-card c1">
                  <span className="card-icon">🔒</span>
                  <span>Sécurité</span>
                </div>
                <div className="float-card c2">
                  <span className="card-icon">☁️</span>
                  <span>Cloud</span>
                </div>
                <div className="float-card c3">
                  <span className="card-icon">🤖</span>
                  <span>IA</span>
                </div>
                <div className="float-card c4">
                  <span className="card-icon">📊</span>
                  <span>Data</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,40 C360,120 720,0 1080,60 C1260,90 1380,60 1440,40 L1440,120 L0,120 Z" fill="#ffffff" opacity="1"/>
          </svg>
        </div>
      </section>

      {/* ===== FILTER BAR AMÉLIORÉE ===== */}
      <div className="filter-bar" id="articles">
        <div className="container">
          <div className="filter-wrapper">
            <span className="filter-label">Filtrer par :</span>
            <div className="filter-tags">
              {allTags.slice(0, 8).map((tag) => (
                <button
                  key={tag}
                  className={`filter-tag ${activeFilter === tag ? 'active' : ''}`}
                  onClick={() => setActiveFilter(tag)}
                >
                  {tag}
                  <span className="tag-count">{getTagCount(tag)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== FEATURED ARTICLE ===== */}
      {filteredPosts.length > 0 && (
        <section className="featured-section">
          <div className="container">
            <div className="featured-card">
              <div className="featured-image">
                <img
                  src={filteredPosts[0].featuredImage || '/images/blog/default.jpg'}
                  alt={filteredPosts[0].title}
                />
                <div className="featured-badge">À la une</div>
              </div>
              <div className="featured-content">
                <div className="featured-meta">
                  <span className="featured-category">
                    {filteredPosts[0].tags?.[0] || 'Article'}
                  </span>
                  <span className="featured-date">
                    {new Date(filteredPosts[0].publishedDate || filteredPosts[0].createdAt).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <h2 className="featured-title">
                  <Link href={`/blog/${filteredPosts[0].slug}`}>
                    {filteredPosts[0].title}
                  </Link>
                </h2>
                <p className="featured-desc">
                  {filteredPosts[0].content?.replace(/<[^>]*>/g, '').slice(0, 180)}...
                </p>
                <Link href={`/blog/${filteredPosts[0].slug}`}>
                  <span className="featured-cta">
                    Lire l'article
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== ARTICLES GRID ===== */}
      <section className="articles-grid-section">
        <div className="container">
          <div className="grid-header">
            <div>
              <span className="grid-tag">Tous les articles</span>
              <h2 className="grid-title">
                Nos dernières publications
                {activeFilter !== 'Tous' && (
                  <span className="filter-label-active"> • {activeFilter}</span>
                )}
              </h2>
            </div>
            <div className="grid-count">
              <span>{filteredPosts.length}</span> articles
              {filteredPosts.length !== posts.length && (
                <span className="filtered-badge">filtrés</span>
              )}
            </div>
          </div>

          {error ? (
            <div className="state-container error">
              <span className="state-icon">⚠️</span>
              <h3>Une erreur est survenue</h3>
              <p>{error}</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="state-container empty">
              <span className="state-icon">🔍</span>
              <h3>Aucun résultat</h3>
              <p>Aucun article ne correspond au tag <strong>"{activeFilter}"</strong></p>
              <button 
                className="reset-filter-btn"
                onClick={() => setActiveFilter('Tous')}
              >
                Voir tous les articles
              </button>
            </div>
          ) : (
            <div className="articles-grid" ref={gridRef}>
              {filteredPosts.slice(0, 1).map((post, index) => (
                <ArticleCard key={post.id} post={post} index={index} featured={true} />
              ))}
              {filteredPosts.slice(1).map((post, index) => (
                <ArticleCard key={post.id} post={post} index={index + 1} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA NEWSLETTER ===== */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-card">
            <div className="newsletter-icon">📬</div>
            <h3>Ne manquez aucun article</h3>
            <p>Recevez nos meilleurs contenus directement dans votre boîte mail.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="votre@email.com" required />
              <button type="submit">S'abonner</button>
            </form>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        /* ===== HERO ===== */
        .hero-cinematic {
          position: relative;
          min-height: 80vh;
          display: flex;
          align-items: center;
          background: #0A0A1A;
          overflow: hidden;
        }
        .hero-particles {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.05), transparent),
            radial-gradient(2px 2px at 40% 70%, rgba(255,255,255,0.03), transparent),
            radial-gradient(2px 2px at 60% 20%, rgba(255,255,255,0.04), transparent),
            radial-gradient(2px 2px at 80% 80%, rgba(255,255,255,0.03), transparent);
          background-size: 200px 200px;
        }
        .hero-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(ellipse, rgba(76, 175, 80, 0.08), transparent 70%);
          top: -100px;
          right: -100px;
          animation: glowPulse 8s ease-in-out infinite;
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .hero-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 2;
          padding: 60px 0;
        }
        .hero-text {
          animation: fadeInLeft 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
          transform: translateX(-40px);
        }
        @keyframes fadeInLeft {
          to { opacity: 1; transform: translateX(0); }
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 6px 18px 6px 12px;
          background: rgba(255,255,255,0.04);
          border-radius: 50px;
          color: rgba(255,255,255,0.5);
          font-size: 13px;
          border: 1px solid rgba(255,255,255,0.04);
          margin-bottom: 24px;
        }
        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4CAF50;
          animation: pulseDot 2s ease-in-out infinite;
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
        .hero-title {
          font-size: clamp(44px, 6vw, 72px);
          font-weight: 800;
          line-height: 1.05;
          margin-bottom: 20px;
        }
        .title-line {
          display: block;
          color: #fff;
        }
        .title-gradient {
          display: block;
          background: linear-gradient(135deg, #4CAF50, #66BB6A, #A5D6A7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-desc {
          font-size: 18px;
          color: rgba(255,255,255,0.4);
          max-width: 480px;
          line-height: 1.8;
          margin-bottom: 32px;
          font-weight: 300;
        }
        .hero-cta {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 32px;
          background: linear-gradient(135deg, #1B5E20, #4CAF50);
          border-radius: 50px;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 30px rgba(27, 94, 32, 0.3);
          text-decoration: none;
        }
        .cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 50px rgba(27, 94, 32, 0.4);
        }
        .cta-primary svg {
          transition: transform 0.3s ease;
        }
        .cta-primary:hover svg {
          transform: translateX(4px);
        }
        .cta-secondary {
          color: rgba(255,255,255,0.3);
          font-size: 14px;
        }
        .cta-stats {
          font-weight: 700;
          color: #4CAF50;
          font-size: 18px;
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
          animation: fadeInRight 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
          transform: translateX(40px);
        }
        @keyframes fadeInRight {
          to { opacity: 1; transform: translateX(0); }
        }
        .floating-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          width: 100%;
          max-width: 400px;
        }
        .float-card {
          padding: 24px;
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.04);
          text-align: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
          animation: float 6s ease-in-out infinite;
        }
        .float-card:hover {
          transform: translateY(-8px);
          background: rgba(255,255,255,0.06);
          border-color: rgba(76, 175, 80, 0.15);
        }
        .float-card .card-icon {
          display: block;
          font-size: 28px;
          margin-bottom: 8px;
        }
        .float-card span {
          display: block;
          color: rgba(255,255,255,0.5);
          font-size: 13px;
          font-weight: 500;
        }
        .float-card.c1 { animation-delay: 0s; }
        .float-card.c2 { animation-delay: 1.5s; margin-top: 20px; }
        .float-card.c3 { animation-delay: 3s; }
        .float-card.c4 { animation-delay: 4.5s; margin-top: 20px; }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .hero-wave {
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          z-index: 3;
        }
        .hero-wave svg {
          width: 100%;
          height: 80px;
        }

        /* ===== FILTER BAR ===== */
        .filter-bar {
          background: #ffffff;
          border-bottom: 1px solid #eef0f2;
          padding: 16px 0;
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(20px);
          background: rgba(255,255,255,0.9);
        }
        .filter-wrapper {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .filter-label {
          font-size: 13px;
          color: #8c8f9c;
          font-weight: 500;
        }
        .filter-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .filter-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 16px;
          border-radius: 50px;
          border: none;
          background: transparent;
          color: #6b7280;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .filter-tag:hover {
          color: #1B5E20;
          background: #f0f2f5;
        }
        .filter-tag.active {
          background: #1B5E20;
          color: #fff;
        }
        .filter-tag .tag-count {
          font-size: 10px;
          background: rgba(0,0,0,0.06);
          padding: 1px 8px;
          border-radius: 50px;
          font-weight: 600;
        }
        .filter-tag.active .tag-count {
          background: rgba(255,255,255,0.2);
          color: #fff;
        }

        /* ===== FEATURED ===== */
        .featured-section {
          padding: 60px 0;
          background: #ffffff;
        }
        .featured-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          background: #f8fafc;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid #eef0f2;
        }
        .featured-image {
          position: relative;
          overflow: hidden;
          min-height: 300px;
        }
        .featured-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .featured-image:hover img {
          transform: scale(1.03);
        }
        .featured-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          padding: 4px 16px;
          background: #1B5E20;
          color: #fff;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .featured-content {
          padding: 40px 40px 40px 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .featured-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        .featured-category {
          padding: 2px 12px;
          background: #eef0f2;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 500;
          color: #4a4d5e;
        }
        .featured-date {
          font-size: 13px;
          color: #8c8f9c;
        }
        .featured-title {
          font-size: 28px;
          font-weight: 700;
          color: #0A0A2E;
          margin: 0 0 12px 0;
          line-height: 1.2;
        }
        .featured-title a {
          color: inherit;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .featured-title a:hover {
          color: #1B5E20;
        }
        .featured-desc {
          color: #6b7280;
          line-height: 1.7;
          margin-bottom: 20px;
          flex: 1;
        }
        .featured-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #1B5E20;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .featured-cta:hover {
          gap: 16px;
        }
        .featured-cta svg {
          transition: transform 0.3s ease;
        }
        .featured-cta:hover svg {
          transform: translateX(4px);
        }

        /* ===== GRID ===== */
        .articles-grid-section {
          padding: 60px 0 80px;
          background: #ffffff;
        }
        .grid-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .grid-tag {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #4CAF50;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 4px;
        }
        .grid-title {
          font-size: 28px;
          font-weight: 700;
          color: #0A0A2E;
        }
        .filter-label-active {
          color: #4CAF50;
          font-weight: 600;
        }
        .grid-count {
          font-size: 14px;
          color: #8c8f9c;
          padding: 6px 16px;
          background: #f0f2f5;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .grid-count span {
          font-weight: 600;
          color: #1a1a2e;
        }
        .filtered-badge {
          font-size: 10px;
          font-weight: 600;
          color: #4CAF50;
          background: #E8F5E9;
          padding: 1px 8px;
          border-radius: 50px;
          text-transform: uppercase;
        }

        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 32px;
        }

        /* ===== NEWSLETTER ===== */
        .newsletter-section {
          padding: 60px 0 80px;
          background: #f8fafc;
        }
        .newsletter-card {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
          padding: 48px 40px;
          background: #ffffff;
          border-radius: 24px;
          box-shadow: 0 4px 40px rgba(0,0,0,0.04);
        }
        .newsletter-icon {
          font-size: 40px;
          margin-bottom: 16px;
        }
        .newsletter-card h3 {
          font-size: 24px;
          font-weight: 700;
          color: #0A0A2E;
          margin-bottom: 8px;
        }
        .newsletter-card p {
          color: #6b7280;
          margin-bottom: 24px;
        }
        .newsletter-form {
          display: flex;
          gap: 12px;
          max-width: 400px;
          margin: 0 auto;
        }
        .newsletter-form input {
          flex: 1;
          padding: 12px 20px;
          border: 1px solid #eef0f2;
          border-radius: 50px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.3s ease;
        }
        .newsletter-form input:focus {
          border-color: #4CAF50;
        }
        .newsletter-form button {
          padding: 12px 28px;
          background: linear-gradient(135deg, #1B5E20, #4CAF50);
          border: none;
          border-radius: 50px;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .newsletter-form button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(27, 94, 32, 0.25);
        }

        /* ===== STATES ===== */
        .state-container {
          text-align: center;
          padding: 80px 20px;
          background: #f8fafc;
          border-radius: 24px;
        }
        .state-icon {
          font-size: 48px;
          display: block;
          margin-bottom: 16px;
        }
        .state-container h3 {
          font-size: 22px;
          color: #0A0A2E;
          margin-bottom: 8px;
        }
        .state-container p {
          color: #6b7280;
        }
        .reset-filter-btn {
          margin-top: 16px;
          padding: 10px 28px;
          background: linear-gradient(135deg, #1B5E20, #4CAF50);
          color: #fff;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .reset-filter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(27, 94, 32, 0.25);
        }

        @media (max-width: 1024px) {
          .hero-wrapper { grid-template-columns: 1fr; text-align: center; }
          .hero-desc { margin: 0 auto 32px; }
          .hero-cta { justify-content: center; }
          .floating-cards { margin: 0 auto; }
          .featured-card { grid-template-columns: 1fr; }
          .featured-content { padding: 24px; }
        }
        @media (max-width: 768px) {
          .hero-cinematic { min-height: 70vh; }
          .hero-title { font-size: 32px; }
          .hero-desc { font-size: 16px; }
          .hero-cta { flex-direction: column; align-items: center; }
          .featured-title { font-size: 22px; }
          .grid-header { flex-direction: column; align-items: flex-start; gap: 12px; }
          .articles-grid { grid-template-columns: 1fr; }
          .newsletter-form { flex-direction: column; }
          .filter-wrapper { flex-direction: column; align-items: flex-start; }
          .filter-tags { width: 100%; overflow-x: auto; flex-wrap: nowrap; padding-bottom: 4px; }
          .filter-tag { white-space: nowrap; }
        }
      `}</style>
    </>
  );
}

// ===================== ARTICLE CARD COMPONENT =====================

const ArticleCard = ({ post, index, featured = false }) => {
  const formattedDate = new Date(post.publishedDate || post.createdAt).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className={`article-card-animated ${featured ? 'featured-card' : ''}`} style={{ animationDelay: `${index * 0.05}s` }}>
      <div className="article-card-inner">
        <Link href={`/blog/${post.slug}`}>
          <div className="card-media">
            <img
              src={post.featuredImage || '/images/blog/default.jpg'}
              alt={post.title}
              loading="lazy"
            />
            <div className="card-overlay">
              <span className="card-read">
                Lire
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
            <div className="card-tag">
              {post.tags?.[0] || 'Article'}
            </div>
          </div>
        </Link>

        <div className="card-body">
          <div className="card-meta">
            <span className="meta-date">{formattedDate}</span>
            <span className="meta-dot">•</span>
            <span className="meta-read">{post.readTime || 5} min</span>
            {featured && (
              <>
                <span className="meta-dot">•</span>
                <span className="meta-featured">⭐ En vedette</span>
              </>
            )}
          </div>

          <Link href={`/blog/${post.slug}`}>
            <h3 className="card-title">{post.title}</h3>
          </Link>

          <p className="card-excerpt">
            {post.content?.replace(/<[^>]*>/g, '').slice(0, 110)}...
          </p>

          <div className="card-footer">
            <div className="card-author">
              <div className="author-avatar">
                <span>{post.authorName?.[0] || 'A'}</span>
              </div>
              <span className="author-name">{post.authorName || 'Admin'}</span>
            </div>
            <span className="card-arrow">→</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .article-card-animated {
          opacity: 0;
          transform: translateY(30px);
          animation: cardAppear 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes cardAppear {
          to { opacity: 1; transform: translateY(0); }
        }
        .article-card-inner {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.04);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }
        .article-card-inner:hover {
          transform: translateY(-12px);
          box-shadow: 0 24px 80px rgba(0,0,0,0.08);
          border-color: rgba(76, 175, 80, 0.1);
        }
        .card-media {
          position: relative;
          overflow: hidden;
          padding-top: 60%;
          background: #f0f2f5;
        }
        .card-media img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .article-card-inner:hover .card-media img {
          transform: scale(1.06);
        }
        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(27,94,32,0.85), rgba(0,0,0,0.6));
          opacity: 0;
          transition: opacity 0.4s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .article-card-inner:hover .card-overlay {
          opacity: 1;
        }
        .card-read {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(10px);
          border-radius: 50px;
          color: #fff;
          font-weight: 600;
          font-size: 14px;
          transform: translateY(20px);
          transition: all 0.4s ease;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .article-card-inner:hover .card-read {
          transform: translateY(0);
        }
        .card-read svg {
          transition: transform 0.3s ease;
        }
        .card-read:hover svg {
          transform: translateX(4px);
        }
        .card-tag {
          position: absolute;
          top: 16px;
          left: 16px;
          padding: 3px 14px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(8px);
          border-radius: 50px;
          font-size: 11px;
          font-weight: 600;
          color: #1B5E20;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .card-body {
          padding: 24px 28px 28px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .card-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #8c8f9c;
          margin-bottom: 12px;
        }
        .meta-dot { color: #d0d2d8; }
        .meta-featured {
          color: #F57F17;
          font-weight: 600;
        }
        .card-title {
          font-size: 20px;
          font-weight: 700;
          color: #0A0A2E;
          margin: 0 0 10px 0;
          line-height: 1.3;
          transition: color 0.3s ease;
        }
        .card-title:hover { color: #1B5E20; }
        .card-excerpt {
          font-size: 15px;
          color: #6b7280;
          line-height: 1.6;
          margin: 0 0 16px 0;
          flex: 1;
        }
        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid #f0f2f5;
        }
        .card-author {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .author-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1B5E20, #4CAF50);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
        }
        .author-name {
          font-size: 14px;
          font-weight: 500;
          color: #1a1a2e;
        }
        .card-arrow {
          font-size: 20px;
          color: #d0d2d8;
          transition: all 0.3s ease;
        }
        .article-card-inner:hover .card-arrow {
          color: #1B5E20;
          transform: translateX(4px);
        }
        .featured-card .article-card-inner {
          border-color: rgba(76, 175, 80, 0.15);
        }
      `}</style>
    </article>
  );
};

// ===================== SERVER SIDE =====================

export async function getServerSideProps() {
  try {
    const response = await blogApi.getAll();
    return {
      props: {
        posts: response.data || [],
        error: '',
      },
    };
  } catch (err) {
    console.error('❌ Erreur SSR blog:', err);
    return {
      props: {
        posts: [],
        error: 'Impossible de charger les articles',
      },
    };
  }
}