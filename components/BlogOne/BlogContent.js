// components/BlogOne/BlogContent.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { blogApi } from '../../utils/api';

const BlogContent = ({ posts: initialPosts = [], loading: initialLoading = false, error: initialError = '' }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState(initialError);

  useEffect(() => {
    if (initialPosts.length > 0) {
      setPosts(initialPosts);
      setLoading(false);
      setError('');
      return;
    }

    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await blogApi.getAll();
        setPosts(response.data || []);
        setError('');
      } catch (err) {
        console.error('❌ Erreur chargement blog:', err);
        setError('Impossible de charger les articles');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [initialPosts]);

  if (posts.length > 0) return <BlogGrid posts={posts} />;
  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;
  return <EmptyState />;
};

// ===== LOADING =====
const LoadingState = () => (
  <section className="blog-area ptb-80">
    <div className="container">
      <div className="text-center py-5">
        <div className="loading-spinner"></div>
        <p className="loading-text">Chargement des articles...</p>
      </div>
    </div>
    <style jsx>{`
      .blog-area { padding: 80px 0; background: #f8fafc; }
      .loading-spinner {
        width: 48px;
        height: 48px;
        border: 3px solid rgba(27,94,32,0.1);
        border-top-color: #1B5E20;
        border-radius: 50%;
        animation: spin 0.8s cubic-bezier(0.4,0,0.2,1) infinite;
        margin: 0 auto 20px;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
      .loading-text { color: #6b7280; font-size: 16px; }
    `}</style>
  </section>
);

// ===== ERROR =====
const ErrorState = () => (
  <section className="blog-area ptb-80">
    <div className="container">
      <div className="text-center py-5">
        <span className="error-icon">⚠️</span>
        <h3 className="error-title">Une erreur est survenue</h3>
        <p className="error-text">Impossible de charger les articles. Veuillez réessayer plus tard.</p>
      </div>
    </div>
    <style jsx>{`
      .blog-area { padding: 80px 0; background: #f8fafc; }
      .error-icon { font-size: 48px; display: block; margin-bottom: 16px; }
      .error-title { color: #EF5350; font-size: 22px; margin-bottom: 8px; }
      .error-text { color: #6b7280; }
    `}</style>
  </section>
);

// ===== EMPTY =====
const EmptyState = () => (
  <section className="blog-area ptb-80">
    <div className="container">
      <div className="text-center py-5">
        <span className="empty-icon">📝</span>
        <h3 className="empty-title">Aucun article trouvé</h3>
        <p className="empty-text">Revenez bientôt pour découvrir nos nouveaux articles !</p>
      </div>
    </div>
    <style jsx>{`
      .blog-area { padding: 80px 0; background: #f8fafc; }
      .empty-icon { font-size: 48px; display: block; margin-bottom: 16px; }
      .empty-title { color: #1a1a2e; font-size: 22px; margin-bottom: 8px; }
      .empty-text { color: #6b7280; }
    `}</style>
  </section>
);

// ===== BLOG GRID =====
const BlogGrid = ({ posts }) => (
  <section className="blog-area ptb-80" itemScope itemType="https://schema.org/Blog">
    <div className="container">
      <div className="blog-header">
        <div className="header-content">
          <span className="section-tag">📖 Notre blog</span>
          <h2 className="section-title">Nos derniers articles</h2>
          <p className="section-desc">
            Découvrez nos analyses et conseils sur la cybersécurité, les solutions digitales et l'innovation en Afrique.
          </p>
        </div>
      </div>

      <div className="blog-grid">
        {posts.map((post, index) => (
          <article 
            key={post.id} 
            className="blog-card"
            itemScope 
            itemType="https://schema.org/BlogPosting"
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <Link href={`/blog/${post.slug}`} className="blog-link">
              <div className="blog-image">
                <img
                  src={post.featuredImage || '/images/blog/default.jpg'}
                  alt={post.title}
                  loading="lazy"
                  className="blog-img"
                  onError={(e) => { e.target.src = '/images/blog/default.jpg'; }}
                />
                <div className="blog-badge">
                  {post.tags?.[0] || 'Article'}
                </div>
                <div className="blog-overlay">
                  <span className="overlay-text">Lire l'article</span>
                </div>
              </div>

              <div className="blog-body">
                <div className="blog-meta">
                  <span className="meta-author">
                    <i className="fas fa-user"></i> {post.authorName || 'Admin'}
                  </span>
                  <span className="meta-date">
                    <i className="fas fa-calendar"></i> 
                    {new Date(post.publishedDate || post.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  </span>
                  <span className="meta-read">
                    <i className="fas fa-clock"></i> {post.readTime || 5} min
                  </span>
                </div>

                <h3 className="blog-title" itemProp="headline">
                  {post.title}
                </h3>

                <p className="blog-excerpt" itemProp="description">
                  {post.content?.replace(/<[^>]*>/g, '').slice(0, 130)}...
                </p>

                <div className="blog-footer">
                  <span className="read-more">
                    Lire la suite
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {post.isFeatured && <span className="featured-badge">⭐ En vedette</span>}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>

    <style jsx>{`
      .blog-area {
        padding: 80px 0;
        background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
      }
      .blog-header {
        text-align: center;
        margin-bottom: 50px;
      }
      .section-tag {
        display: inline-block;
        font-size: 13px;
        font-weight: 600;
        color: #4CAF50;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        margin-bottom: 8px;
      }
      .section-title {
        font-size: 32px;
        font-weight: 700;
        color: #0A0A2E;
        margin-bottom: 12px;
      }
      .section-desc {
        color: #6b7280;
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.7;
      }

      .blog-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
        gap: 30px;
      }

      .blog-card {
        background: #ffffff;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 2px 20px rgba(0,0,0,0.04);
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid rgba(0,0,0,0.03);
        opacity: 0;
        transform: translateY(30px);
        animation: cardAppear 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }
      @keyframes cardAppear {
        to { opacity: 1; transform: translateY(0); }
      }
      .blog-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 60px rgba(0,0,0,0.08);
        border-color: rgba(76, 175, 80, 0.1);
      }

      .blog-link {
        text-decoration: none;
        display: block;
        height: 100%;
      }

      .blog-image {
        position: relative;
        overflow: hidden;
        padding-top: 60%;
        background: #f0f2f5;
      }
      .blog-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .blog-card:hover .blog-img {
        transform: scale(1.05);
      }

      .blog-badge {
        position: absolute;
        top: 14px;
        left: 14px;
        padding: 4px 14px;
        background: rgba(255,255,255,0.92);
        backdrop-filter: blur(8px);
        border-radius: 50px;
        font-size: 11px;
        font-weight: 600;
        color: #1B5E20;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .blog-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(27,94,32,0.85), rgba(0,0,0,0.6));
        opacity: 0;
        transition: opacity 0.4s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .blog-card:hover .blog-overlay {
        opacity: 1;
      }
      .overlay-text {
        padding: 10px 28px;
        background: rgba(255,255,255,0.12);
        backdrop-filter: blur(10px);
        border-radius: 50px;
        color: #fff;
        font-weight: 600;
        font-size: 14px;
        transform: translateY(20px);
        transition: transform 0.4s ease;
        border: 1px solid rgba(255,255,255,0.08);
      }
      .blog-card:hover .overlay-text {
        transform: translateY(0);
      }

      .blog-body {
        padding: 24px 28px 28px;
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .blog-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        font-size: 13px;
        color: #8c8f9c;
        margin-bottom: 12px;
      }
      .blog-meta span {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .blog-meta i {
        font-size: 12px;
        color: #4CAF50;
      }

      .blog-title {
        font-size: 20px;
        font-weight: 700;
        color: #0A0A2E;
        margin: 0 0 10px 0;
        line-height: 1.3;
        transition: color 0.3s ease;
      }
      .blog-title:hover {
        color: #1B5E20;
      }

      .blog-excerpt {
        color: #6b7280;
        line-height: 1.7;
        margin: 0 0 16px 0;
        flex: 1;
        font-size: 15px;
      }

      .blog-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 16px;
        border-top: 1px solid #f0f2f5;
      }

      .read-more {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: #1B5E20;
        font-weight: 600;
        font-size: 14px;
        transition: all 0.3s ease;
      }
      .read-more svg {
        transition: transform 0.3s ease;
      }
      .read-more:hover {
        gap: 14px;
        color: #4CAF50;
      }
      .read-more:hover svg {
        transform: translateX(4px);
      }

      .featured-badge {
        font-size: 12px;
        color: #F57F17;
        background: #FFF8E1;
        padding: 2px 12px;
        border-radius: 50px;
        font-weight: 600;
      }

      @media (max-width: 768px) {
        .blog-area { padding: 50px 0; }
        .blog-grid { grid-template-columns: 1fr; }
        .section-title { font-size: 26px; }
        .blog-body { padding: 20px; }
        .blog-meta { font-size: 12px; gap: 8px; }
      }
    `}</style>
  </section>
);

export default BlogContent;