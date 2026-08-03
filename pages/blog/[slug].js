// pages/blog/[slug].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Layouts/Navbar';
import Footer from '../../components/Layouts/Footer';
import { blogApi } from '../../utils/api';

export default function SingleBlogPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await blogApi.getBySlug(slug);
        setPost(response.data);
      } catch {
        setError('Article non trouvé');
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) return <LoadingState />;
  if (error || !post) return <NotFoundState />;

  return (
    <>
      <Head>
        <title>{post.title} | ICS GROUPE Blog</title>
        <meta name="description" content={post.content?.replace(/<[^>]*>/g, '').slice(0, 160)} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.content?.replace(/<[^>]*>/g, '').slice(0, 200)} />
        {post.featuredImage && <meta property="og:image" content={post.featuredImage} />}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.icsolution.fr/blog/${post.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Navbar />
      <ArticleHero post={post} />
      <ArticleContent post={post} />
      <Footer />
    </>
  );
}

// ===================== COMPOSANTS =====================

const LoadingState = () => (
  <>
    <Navbar />
    <div className="loading-container">
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <p className="loading-text">Chargement de l'article...</p>
      </div>
    </div>
    <Footer />
    <style jsx>{`
      .loading-container {
        min-height: 60vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
      }
      .loading-content {
        text-align: center;
      }
      .loading-spinner {
        width: 48px;
        height: 48px;
        border: 3px solid rgba(27, 94, 32, 0.1);
        border-top-color: #1B5E20;
        border-radius: 50%;
        animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        margin: 0 auto 20px;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
      .loading-text {
        color: #6b7280;
        font-size: 16px;
        font-weight: 400;
      }
    `}</style>
  </>
);

const NotFoundState = () => (
  <>
    <Navbar />
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="notfound-icon">📄</div>
        <h1 className="notfound-title">Article non trouvé</h1>
        <p className="notfound-desc">
          Désolé, l'article que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <Link href="/blog">
          <span className="notfound-btn">← Retour au blog</span>
        </Link>
      </div>
    </div>
    <Footer />
    <style jsx>{`
      .notfound-container {
        min-height: 60vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
        padding: 40px 20px;
      }
      .notfound-content {
        text-align: center;
        max-width: 500px;
      }
      .notfound-icon {
        font-size: 72px;
        margin-bottom: 24px;
      }
      .notfound-title {
        font-size: 32px;
        font-weight: 700;
        color: #0A0A2E;
        margin-bottom: 12px;
      }
      .notfound-desc {
        color: #6b7280;
        font-size: 18px;
        margin-bottom: 32px;
        line-height: 1.6;
      }
      .notfound-btn {
        display: inline-block;
        padding: 14px 40px;
        background: linear-gradient(135deg, #1B5E20, #4CAF50);
        color: #fff;
        border-radius: 50px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 20px rgba(27, 94, 32, 0.25);
      }
      .notfound-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 40px rgba(27, 94, 32, 0.35);
      }
    `}</style>
  </>
);

// ===================== ARTICLE HERO =====================

const ArticleHero = ({ post }) => (
  <div className="hero-section">
    <div className="hero-background">
      {post.featuredImage && (
        <div className="hero-image-wrapper">
          <img src={post.featuredImage} alt={post.title} className="hero-image" />
        </div>
      )}
      <div className="hero-gradient"></div>
    </div>

    <div className="hero-content container">
      <div className="hero-inner">
        <div className="hero-meta">
          <span className="hero-category">
            {post.tags?.[0] || 'Article'}
          </span>
          <span className="hero-divider">•</span>
          <span className="hero-date">
            {new Date(post.publishedDate || post.createdAt).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span className="hero-divider">•</span>
          <span className="hero-readtime">
            <i className="far fa-clock"></i> {post.readTime || 5} min
          </span>
        </div>

        <h1 className="hero-title">{post.title}</h1>

        <div className="hero-author">
          <div className="author-avatar">
            <span>{post.authorName?.[0] || 'A'}</span>
          </div>
          <div className="author-info">
            <span className="author-name">{post.authorName || 'Admin'}</span>
            <span className="author-role">Auteur</span>
          </div>
        </div>
      </div>
    </div>

    <style jsx>{`
      .hero-section {
        position: relative;
        height: 75vh;
        min-height: 500px;
        max-height: 800px;
        overflow: hidden;
        display: flex;
        align-items: center;
      }
      .hero-background {
        position: absolute;
        inset: 0;
      }
      .hero-image-wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      .hero-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scale(1.02);
        transition: transform 8s ease;
      }
      .hero-image:hover {
        transform: scale(1);
      }
      .hero-gradient {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          135deg,
          rgba(0, 0, 0, 0.85) 0%,
          rgba(0, 0, 0, 0.5) 40%,
          rgba(0, 0, 0, 0.2) 100%
        );
      }
      .hero-content {
        position: relative;
        z-index: 2;
        width: 100%;
        padding: 0 20px;
      }
      .hero-inner {
        max-width: 800px;
        margin: 0 auto;
        animation: fadeUp 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        opacity: 0;
        transform: translateY(30px);
      }
      @keyframes fadeUp {
        to { opacity: 1; transform: translateY(0); }
      }
      .hero-meta {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
        margin-bottom: 20px;
        color: rgba(255, 255, 255, 0.7);
        font-size: 14px;
      }
      .hero-category {
        background: rgba(76, 175, 80, 0.2);
        backdrop-filter: blur(10px);
        padding: 4px 16px;
        border-radius: 50px;
        color: #4CAF50;
        font-weight: 500;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        border: 1px solid rgba(76, 175, 80, 0.15);
      }
      .hero-divider {
        color: rgba(255, 255, 255, 0.2);
      }
      .hero-date, .hero-readtime {
        font-weight: 300;
      }
      .hero-readtime i {
        margin-right: 4px;
      }
      .hero-title {
        font-size: clamp(36px, 5.5vw, 64px);
        font-weight: 800;
        color: #fff;
        line-height: 1.1;
        margin-bottom: 28px;
        letter-spacing: -0.02em;
        text-shadow: 0 4px 40px rgba(0, 0, 0, 0.1);
      }
      .hero-author {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .author-avatar {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background: linear-gradient(135deg, #1B5E20, #4CAF50);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: 700;
        font-size: 20px;
        box-shadow: 0 4px 20px rgba(27, 94, 32, 0.3);
      }
      .author-info {
        display: flex;
        flex-direction: column;
      }
      .author-name {
        color: #fff;
        font-weight: 600;
        font-size: 16px;
      }
      .author-role {
        color: rgba(255, 255, 255, 0.5);
        font-size: 13px;
        font-weight: 300;
      }
      @media (max-width: 768px) {
        .hero-section { height: 60vh; min-height: 400px; }
        .hero-meta { font-size: 12px; gap: 8px; }
        .hero-title { font-size: 28px; }
        .author-avatar { width: 44px; height: 44px; font-size: 16px; }
      }
    `}</style>
  </div>
);

// ===================== ARTICLE CONTENT =====================

const ArticleContent = ({ post }) => (
  <section className="content-section">
    <div className="container">
      <div className="content-grid">
        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="tags-wrapper">
            {post.tags.map((tag) => (
              <span key={tag} className="tag-item">#{tag}</span>
            ))}
          </div>
        )}

        {/* Article */}
        <article className="article-body">
          <div dangerouslySetInnerHTML={{ __html: post.content || 'Contenu non disponible' }} />
        </article>

        {/* Footer */}
        <div className="article-footer">
          <Link href="/blog">
            <span className="back-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Tous les articles
            </span>
          </Link>

          <div className="share-section">
            <span className="share-label">Partager</span>
            <div className="share-buttons">
              <a href={`https://www.facebook.com/sharer/sharer.php?u=https://www.icsolution.fr/blog/${post.slug}`} target="_blank" rel="noopener" className="share-btn fb" aria-label="Partager sur Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={`https://twitter.com/intent/tweet?url=https://www.icsolution.fr/blog/${post.slug}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener" className="share-btn tw" aria-label="Partager sur Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=https://www.icsolution.fr/blog/${post.slug}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener" className="share-btn in" aria-label="Partager sur LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style jsx>{`
      .content-section {
        padding: 60px 0 80px;
        background: #ffffff;
        position: relative;
      }
      .content-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(27, 94, 32, 0.1), transparent);
      }
      .content-grid {
        max-width: 820px;
        margin: 0 auto;
        padding: 0 20px;
      }
      .tags-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 40px;
      }
      .tag-item {
        padding: 6px 18px;
        background: #f0f2f5;
        border-radius: 50px;
        font-size: 13px;
        color: #4a4d5e;
        font-weight: 500;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: default;
      }
      .tag-item:hover {
        background: #1B5E20;
        color: #fff;
        transform: translateY(-2px);
      }
      .article-body {
        font-size: 1.15rem;
        line-height: 1.9;
        color: #1a1a2e;
      }
      .article-body h1, .article-body h2, .article-body h3 {
        margin-top: 2.4rem;
        margin-bottom: 1rem;
        font-weight: 700;
        color: #0A0A2E;
        letter-spacing: -0.01em;
      }
      .article-body h2 { font-size: 1.8rem; }
      .article-body h3 { font-size: 1.4rem; }
      .article-body p { margin-bottom: 1.4rem; }
      .article-body ul, .article-body ol {
        margin-bottom: 1.4rem;
        padding-left: 1.5rem;
      }
      .article-body li { margin-bottom: 0.5rem; }
      .article-body blockquote {
        border-left: 4px solid #4CAF50;
        padding: 1.2rem 1.8rem;
        margin: 2rem 0;
        background: #f8fafc;
        border-radius: 0 12px 12px 0;
        font-style: italic;
        color: #4a4d5e;
        font-size: 1.05rem;
      }
      .article-body code {
        background: #f0f2f5;
        padding: 0.2rem 0.6rem;
        border-radius: 4px;
        font-size: 0.9rem;
        font-family: 'Courier New', monospace;
        color: #1B5E20;
      }
      .article-body pre {
        background: #0A0A1A;
        color: #e4e4e4;
        padding: 1.5rem;
        border-radius: 12px;
        overflow-x: auto;
        margin: 1.5rem 0;
        font-size: 0.9rem;
      }
      .article-body img {
        max-width: 100%;
        height: auto;
        border-radius: 16px;
        margin: 2rem 0;
        box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
      }
      .article-footer {
        margin-top: 48px;
        padding-top: 32px;
        border-top: 1px solid #eef0f2;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
      }
      .back-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 28px;
        background: #f0f2f5;
        border-radius: 50px;
        font-weight: 600;
        color: #1a1a2e;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        text-decoration: none;
        border: none;
        font-size: 14px;
      }
      .back-btn:hover {
        background: #1B5E20;
        color: #fff;
        transform: translateX(-4px);
        box-shadow: 0 4px 20px rgba(27, 94, 32, 0.2);
      }
      .back-btn svg {
        transition: transform 0.3s ease;
      }
      .back-btn:hover svg {
        transform: translateX(-4px);
      }
      .share-section {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .share-label {
        color: #8c8f9c;
        font-size: 13px;
        font-weight: 500;
      }
      .share-buttons {
        display: flex;
        gap: 6px;
      }
      .share-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #eef0f2;
        color: #4a4d5e;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        text-decoration: none;
      }
      .share-btn:hover {
        transform: translateY(-3px);
        color: #fff;
        border-color: transparent;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
      }
      .share-btn.fb:hover { background: #1877f2; }
      .share-btn.tw:hover { background: #000; }
      .share-btn.in:hover { background: #0a66c2; }
      @media (max-width: 768px) {
        .content-section { padding: 40px 0 60px; }
        .article-body { font-size: 1rem; }
        .article-body h2 { font-size: 1.4rem; }
        .article-body h3 { font-size: 1.2rem; }
        .article-footer { flex-direction: column; align-items: stretch; }
        .back-btn { justify-content: center; }
        .share-section { justify-content: center; }
      }
    `}</style>
  </section>
);

// ===================== SERVER SIDE =====================

export async function getServerSideProps({ params }) {
  try {
    const response = await blogApi.getBySlug(params.slug);
    return {
      props: {
        post: response.data || null,
        error: '',
      },
    };
  } catch (err) {
    return {
      props: {
        post: null,
        error: 'Article non trouvé',
      },
    };
  }
}