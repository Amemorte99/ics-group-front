// components/portfolio/PortfolioContent.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { portfolioApi } from '../../utils/api';

const PortfolioContent = ({ limit }) => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const modalRef = useRef(null);
  const gridRef = useRef(null);

  // Load portfolios
  useEffect(() => {
    const loadPortfolios = async () => {
      try {
        setLoading(true);
        const response = await portfolioApi.getAll();
        
        let items = [];
        if (response?.data?.items) {
          items = response.data.items;
        } else if (response?.data && Array.isArray(response.data)) {
          items = response.data;
        } else if (Array.isArray(response)) {
          items = response;
        }

        if (!items || items.length === 0) {
          setProjects([]);
          setLoading(false);
          return;
        }

        const mapped = items.map((item) => ({
          id: item.id,
          title: item.title || 'Sans titre',
          shortDesc: item.description?.substring(0, 120) || 'Description courte non disponible',
          longDesc: item.description || 'Description longue non disponible',
          category: item.category || 'autre',
          client: item.client || 'Confidentiel',
          completionDate: item.completionDate
            ? new Date(item.completionDate).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : 'N/C',
          link: item.link || null,
          // ✅ IMAGE PRINCIPALE
          image: item.image || null,
          // ✅ Utiliser jusqu'à 3 images
          images: item.images?.length > 0
            ? item.images.slice(0, 3)
            : item.image
            ? [item.image]
            : ['/images/placeholder.png'],
          isActive: item.isActive !== undefined ? item.isActive : true,
          createdAt: item.createdAt,
        }));
        setProjects(mapped);

        const uniqueCategories = [...new Set(mapped.map((p) => p.category))];
        const categoryList = [
          { key: 'all', label: 'Tous les projets' },
          ...uniqueCategories.map((cat) => ({
            key: cat,
            label: cat.charAt(0).toUpperCase() + cat.slice(1),
          })),
        ];
        setCategories(categoryList);

      } catch (err) {
        console.error('❌ Erreur chargement portfolios:', err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolios();
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage(e);
      if (e.key === 'ArrowLeft') prevImage(e);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, selectedProject]);

  const displayedProjects = limit
    ? projects.slice(0, limit)
    : filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter);

  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentImgIndex(0);
    setIsImageLoading(true);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    setTimeout(() => {
      setSelectedProject(null);
      setCurrentImgIndex(0);
    }, 400);
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    if (selectedProject && selectedProject.images.length > 1) {
      setIsImageLoading(true);
      setCurrentImgIndex((prev) => (prev + 1) % selectedProject.images.length);
    }
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    if (selectedProject && selectedProject.images.length > 1) {
      setIsImageLoading(true);
      setCurrentImgIndex(
        (prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length
      );
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      web: '#2563EB',
      mobile: '#7C3AED',
      cybersecurite: '#DC2626',
      energie: '#059669',
      reseaux: '#0891B2',
      data: '#D97706',
      marketing: '#EC4899',
      design: '#8B5CF6',
      consulting: '#4F46E5',
    };
    return colors[category] || '#6B7280';
  };

  // ✅ Fonction pour obtenir l'image principale
  const getMainImage = (project) => {
    return project.image || project.images?.[0] || '/images/placeholder.png';
  };

  if (loading) {
    return (
      <div className="portfolio-loader">
        <div className="loader-scene">
          <div className="loader-cube">
            <div className="cube-face"></div>
            <div className="cube-face"></div>
            <div className="cube-face"></div>
            <div className="cube-face"></div>
            <div className="cube-face"></div>
            <div className="cube-face"></div>
          </div>
          <p className="loader-text">Chargement de nos réalisations</p>
          <div className="loader-progress">
            <div className="loader-progress-bar"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="portfolio-section">
        <div className="container">
          {/* Header */}
          <div className="portfolio-header">
            <div className="header-glow"></div>
            <div className="header-content">
              <div className="badge-wrapper">
                <span className="badge-dot"></span>
                <span className="section-badge">Notre excellence en images</span>
              </div>
              <h2 className="section-title">
                {limit ? (
                  <>
                    <span className="title-line">Nos dernières</span>
                    <span className="title-highlight">réalisations</span>
                  </>
                ) : (
                  <>
                    <span className="title-line">Notre</span>
                    <span className="title-highlight">portfolio complet</span>
                  </>
                )}
              </h2>
              <p className="section-subtitle">
                {limit
                  ? 'Découvrez une sélection de nos projets les plus récents'
                  : 'Explorez l\'ensemble de nos réalisations et laissez-vous inspirer par notre savoir-faire'}
              </p>
            </div>
          </div>

          {/* Filtres */}
          {!limit && categories.length > 1 && (
            <div className="filter-container">
              <div className="filter-scroll">
                <div className="filter-wrapper">
                  {categories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setFilter(cat.key)}
                      className={`filter-btn ${filter === cat.key ? 'active' : ''}`}
                      data-active={filter === cat.key}
                    >
                      <span className="filter-dot"></span>
                      {cat.label}
                      {filter === cat.key && (
                        <span className="filter-check">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Grille */}
          <div className="portfolio-grid" ref={gridRef}>
            {displayedProjects.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon-wrapper">
                  <span className="empty-icon">🎯</span>
                </div>
                <h3>Aucun projet trouvé</h3>
                <p>Essayez de modifier votre filtre ou revenez plus tard</p>
                <button className="empty-reset" onClick={() => setFilter('all')}>
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              displayedProjects.map((project, index) => {
                const delay = (index % 6) * 0.08;
                // ✅ Récupérer l'image principale
                const mainImage = getMainImage(project);
                
                return (
                  <div
                    key={project.id}
                    className="portfolio-item"
                    style={{ animationDelay: `${delay}s` }}
                    onClick={() => openModal(project)}
                  >
                    <div className="portfolio-card">
                      <div className="card-media">
                        <div className="card-image-wrapper">
                          <img
                            src={mainImage}
                            alt={project.title}
                            className="card-image"
                            loading="lazy"
                          />
                          <div className="card-overlay">
                            <div className="overlay-ring"></div>
                            <div className="overlay-content">
                              <div className="overlay-tags">
                                <span className="overlay-tag">
                                  {categories.find((c) => c.key === project.category)?.label ||
                                    project.category ||
                                    'Projet'}
                                </span>
                              </div>
                              <h3 className="overlay-title">{project.title}</h3>
                              <p className="overlay-desc">{project.shortDesc}</p>
                              <div className="overlay-action">
                                <span className="overlay-link">
                                  Explorer
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="footer-left">
                          <span
                            className="footer-category"
                            style={{ color: getCategoryColor(project.category) }}
                          >
                            {categories.find((c) => c.key === project.category)?.label ||
                              project.category ||
                              'Projet'}
                          </span>
                          <h4 className="footer-title">{project.title}</h4>
                        </div>
                        <div className="footer-right">
                          <span className="footer-client">{project.client}</span>
                          <span className="footer-arrow">→</span>
                        </div>
                      </div>
                      <div className="card-shimmer"></div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* View All */}
          {limit && projects.length > limit && (
            <div className="view-all-wrapper">
              <Link href="/portfolio">
                <span className="view-all-btn">
                  <span className="btn-text">Voir tout le portfolio</span>
                  <span className="btn-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Modal Premium */}
      {isModalOpen && selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-backdrop-blur"></div>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} ref={modalRef}>
            {/* Header */}
            <div className="modal-header-bar">
              <div className="modal-header-left">
                <span className="modal-header-category">
                  {categories.find((c) => c.key === selectedProject.category)?.label ||
                    selectedProject.category ||
                    'Projet'}
                </span>
                <span className="modal-header-divider">•</span>
                <span className="modal-header-client">{selectedProject.client}</span>
              </div>
              <button className="modal-close" onClick={closeModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="modal-close-label">Fermer</span>
              </button>
            </div>

            {/* Content */}
            <div className="modal-grid">
              {/* Images */}
              <div className="modal-images">
                <div className="main-image-container">
                  {isImageLoading && (
                    <div className="image-loader">
                      <div className="image-loader-spinner"></div>
                    </div>
                  )}
                  <img
                    src={
                      // ✅ Afficher l'image principale ou l'image courante
                      currentImgIndex === 0 && selectedProject.image
                        ? selectedProject.image
                        : selectedProject.images?.[currentImgIndex] || '/images/placeholder.png'
                    }
                    alt={selectedProject.title}
                    className={`main-image ${isImageLoading ? 'loading' : 'loaded'}`}
                    onLoad={() => setIsImageLoading(false)}
                  />
                  {selectedProject.images.length > 1 && (
                    <>
                      <button className="nav-btn prev" onClick={prevImage}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button className="nav-btn next" onClick={nextImage}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <div className="image-counter">
                        <span className="counter-current">{String(currentImgIndex + 1).padStart(2, '0')}</span>
                        <span className="counter-separator">/</span>
                        <span className="counter-total">{String(selectedProject.images.length).padStart(2, '0')}</span>
                      </div>
                    </>
                  )}
                </div>

                {selectedProject.images.length > 1 && (
                  <div className="thumbnails">
                    {selectedProject.images.map((img, index) => (
                      <button
                        key={index}
                        className={`thumbnail-btn ${index === currentImgIndex ? 'active' : ''}`}
                        onClick={() => {
                          setIsImageLoading(true);
                          setCurrentImgIndex(index);
                        }}
                      >
                        <img src={img} alt={`Miniature ${index + 1}`} />
                        {index === currentImgIndex && (
                          <div className="thumbnail-active-indicator"></div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="modal-info">
                <div className="modal-info-content">
                  <div className="info-header">
                    <h2 className="modal-title">{selectedProject.title}</h2>
                    <div className="modal-meta">
                      <div className="meta-item">
                        <span className="meta-label">Client</span>
                        <span className="meta-value">{selectedProject.client}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">Date de livraison</span>
                        <span className="meta-value">{selectedProject.completionDate}</span>
                      </div>
                      {selectedProject.link && (
                        <div className="meta-item">
                          <span className="meta-label">Lien</span>
                          <a
                            href={selectedProject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="meta-link"
                          >
                            Voir en ligne →
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="modal-description-wrapper">
                    <p className="modal-description">{selectedProject.longDesc}</p>
                  </div>

                  <div className="modal-actions">
                    <Link href="/contact">
                      <span className="modal-cta primary" onClick={closeModal}>
                        <span>Discuter de votre projet</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </Link>
                    <button className="modal-cta secondary" onClick={() => {
                      if (selectedProject.link) {
                        window.open(selectedProject.link, '_blank');
                      }
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 15V3M12 3L9 6M12 3L15 6M5 15L5 17C5 18.1046 5.89543 19 7 19H17C18.1046 19 19 18.1046 19 17L19 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Voir le projet
                    </button>
                  </div>

                  <div className="modal-share">
                    <span className="share-label">Partager</span>
                    <div className="share-buttons">
                      <button className="share-btn" onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: selectedProject.title,
                            text: `Découvrez ${selectedProject.title} par ICS GROUPE`,
                            url: window.location.href,
                          });
                        }
                      }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M12 3V15M12 3L9 6M12 3L15 6M4 13L4 19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19L20 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* ===== LOADER ULTRA ===== */
        .portfolio-loader {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 600px;
          background: #f8fafc;
        }

        .loader-scene {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
        }

        .loader-cube {
          position: relative;
          width: 64px;
          height: 64px;
          transform-style: preserve-3d;
          animation: cubeRotate 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes cubeRotate {
          0% { transform: rotateX(-20deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(-20deg) rotateY(360deg) rotateZ(0deg); }
        }

        .cube-face {
          position: absolute;
          width: 64px;
          height: 64px;
          border: 2px solid rgba(27, 94, 32, 0.2);
          border-radius: 4px;
          background: rgba(27, 94, 32, 0.04);
          backdrop-filter: blur(8px);
        }

        .cube-face:nth-child(1) { transform: rotateY(0deg) translateZ(32px); }
        .cube-face:nth-child(2) { transform: rotateY(180deg) translateZ(32px); }
        .cube-face:nth-child(3) { transform: rotateX(90deg) translateZ(32px); }
        .cube-face:nth-child(4) { transform: rotateX(-90deg) translateZ(32px); }
        .cube-face:nth-child(5) { transform: rotateY(90deg) translateZ(32px); }
        .cube-face:nth-child(6) { transform: rotateY(-90deg) translateZ(32px); }

        .loader-text {
          font-size: 16px;
          color: #6b7280;
          font-weight: 400;
          letter-spacing: 2px;
        }

        .loader-progress {
          width: 200px;
          height: 2px;
          background: rgba(27, 94, 32, 0.1);
          border-radius: 2px;
          overflow: hidden;
        }

        .loader-progress-bar {
          width: 0%;
          height: 100%;
          background: linear-gradient(90deg, #1B5E20, #4CAF50);
          border-radius: 2px;
          animation: progress 1.8s ease-in-out infinite;
        }

        @keyframes progress {
          0% { width: 0%; transform: translateX(0); }
          50% { width: 70%; }
          100% { width: 100%; transform: translateX(100%); }
        }

        /* ===== SECTION ===== */
        .portfolio-section {
          padding: 100px 0;
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          position: relative;
          overflow: hidden;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
        }

        /* ===== HEADER ===== */
        .portfolio-header {
          position: relative;
          text-align: center;
          margin-bottom: 64px;
          padding-top: 20px;
        }

        .header-glow {
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 300px;
          background: radial-gradient(ellipse, rgba(27, 94, 32, 0.06), transparent 70%);
          pointer-events: none;
        }

        .header-content {
          position: relative;
        }

        .badge-wrapper {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(27, 94, 32, 0.06);
          padding: 6px 20px 6px 16px;
          border-radius: 50px;
          margin-bottom: 20px;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4CAF50;
          animation: pulseDot 2s ease-in-out infinite;
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }

        .section-badge {
          font-size: 13px;
          font-weight: 500;
          color: #1B5E20;
          letter-spacing: 0.5px;
        }

        .section-title {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 16px;
        }

        .title-line {
          color: #0A0A2E;
          display: block;
        }

        .title-highlight {
          background: linear-gradient(135deg, #1B5E20, #4CAF50);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-subtitle {
          font-size: 18px;
          color: #6b7280;
          max-width: 560px;
          margin: 0 auto;
          line-height: 1.7;
          font-weight: 400;
        }

        /* ===== FILTRES ===== */
        .filter-container {
          display: flex;
          justify-content: center;
          margin-bottom: 56px;
        }

        .filter-scroll {
          overflow-x: auto;
          padding: 4px;
          width: 100%;
          max-width: 800px;
        }

        .filter-scroll::-webkit-scrollbar {
          height: 0;
        }

        .filter-wrapper {
          display: flex;
          gap: 6px;
          background: #fff;
          padding: 6px;
          border-radius: 60px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02);
          min-width: max-content;
        }

        .filter-btn {
          position: relative;
          padding: 10px 28px;
          border: none;
          border-radius: 40px;
          font-size: 14px;
          font-weight: 500;
          color: #4a4d5e;
          background: transparent;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filter-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: transparent;
          transition: all 0.3s ease;
        }

        .filter-btn.active .filter-dot {
          background: #4CAF50;
        }

        .filter-check {
          font-size: 12px;
          margin-left: 4px;
          opacity: 0;
          transform: scale(0.5);
          transition: all 0.3s ease;
        }

        .filter-btn.active .filter-check {
          opacity: 1;
          transform: scale(1);
        }

        .filter-btn:hover {
          color: #1B5E20;
          background: rgba(27, 94, 32, 0.04);
        }

        .filter-btn.active {
          color: #fff;
          background: linear-gradient(135deg, #1B5E20, #4CAF50);
          box-shadow: 0 4px 20px rgba(27, 94, 32, 0.15);
        }

        /* ===== GRILLE ===== */
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 32px;
        }

        .portfolio-item {
          opacity: 0;
          transform: translateY(40px);
          animation: fadeUpItem 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes fadeUpItem {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .portfolio-card {
          position: relative;
          background: #fff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.02);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          isolation: isolate;
        }

        .portfolio-card:hover {
          transform: translateY(-12px) scale(1.01);
          box-shadow: 0 40px 80px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.04);
        }

        .card-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
          pointer-events: none;
        }

        .portfolio-card:hover .card-shimmer {
          transform: translateX(100%);
        }

        .card-media {
          position: relative;
          overflow: hidden;
        }

        .card-image-wrapper {
          position: relative;
          padding-top: 70%;
          background: #f0f2f5;
        }

        .card-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .portfolio-card:hover .card-image {
          transform: scale(1.05);
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 100%);
          opacity: 0;
          transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: flex-end;
          padding: 32px;
        }

        .portfolio-card:hover .card-overlay {
          opacity: 1;
        }

        .overlay-ring {
          position: absolute;
          inset: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          opacity: 0;
          transform: scale(0.95);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .portfolio-card:hover .overlay-ring {
          opacity: 1;
          transform: scale(1);
        }

        .overlay-content {
          position: relative;
          transform: translateY(20px);
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%;
        }

        .portfolio-card:hover .overlay-content {
          transform: translateY(0);
        }

        .overlay-tags {
          display: flex;
          gap: 8px;
          margin-bottom: 8px;
        }

        .overlay-tag {
          font-size: 11px;
          font-weight: 500;
          color: rgba(255,255,255,0.8);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: rgba(255,255,255,0.12);
          padding: 4px 12px;
          border-radius: 20px;
          backdrop-filter: blur(8px);
        }

        .overlay-title {
          font-size: 22px;
          font-weight: 600;
          color: #fff;
          margin: 0 0 6px 0;
          line-height: 1.2;
        }

        .overlay-desc {
          font-size: 14px;
          color: rgba(255,255,255,0.7);
          margin: 0 0 16px 0;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .overlay-action {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .overlay-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          border-bottom: 2px solid rgba(255,255,255,0.3);
          padding-bottom: 4px;
          transition: all 0.3s ease;
        }

        .overlay-link svg {
          transition: transform 0.3s ease;
        }

        .overlay-link:hover svg {
          transform: translateX(4px);
        }

        .card-footer {
          padding: 20px 24px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex: 1;
          gap: 12px;
        }

        .footer-left {
          flex: 1;
          min-width: 0;
        }

        .footer-category {
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .footer-title {
          font-size: 16px;
          font-weight: 600;
          color: #0A0A2E;
          margin: 4px 0 0 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .footer-right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .footer-client {
          font-size: 13px;
          color: #8c8f9c;
        }

        .footer-arrow {
          font-size: 18px;
          color: #1B5E20;
          transition: transform 0.3s ease;
        }

        .portfolio-card:hover .footer-arrow {
          transform: translateX(4px);
        }

        /* ===== VIEW ALL ===== */
        .view-all-wrapper {
          text-align: center;
          margin-top: 72px;
        }

        .view-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 40px;
          border-radius: 60px;
          background: #fff;
          border: 1px solid rgba(27, 94, 32, 0.2);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          color: #1B5E20;
        }

        .view-all-btn:hover {
          background: linear-gradient(135deg, #1B5E20, #4CAF50);
          border-color: transparent;
          color: #fff;
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(27, 94, 32, 0.15);
        }

        .btn-text {
          font-size: 16px;
          font-weight: 600;
        }

        .btn-icon svg {
          transition: transform 0.3s ease;
        }

        .view-all-btn:hover .btn-icon svg {
          transform: translateX(4px);
        }

        /* ===== EMPTY STATE ===== */
        .empty-state {
          text-align: center;
          padding: 100px 20px;
          grid-column: 1 / -1;
        }

        .empty-icon-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: rgba(27, 94, 32, 0.06);
          margin-bottom: 24px;
        }

        .empty-icon {
          font-size: 48px;
        }

        .empty-state h3 {
          font-size: 24px;
          color: #0A0A2E;
          margin-bottom: 8px;
        }

        .empty-state p {
          color: #8c8f9c;
          margin-bottom: 20px;
        }

        .empty-reset {
          padding: 10px 32px;
          border: none;
          border-radius: 40px;
          background: linear-gradient(135deg, #1B5E20, #4CAF50);
          color: #fff;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .empty-reset:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(27, 94, 32, 0.2);
        }

        /* ===== MODAL ULTRA ===== */
        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          animation: modalFadeIn 0.4s ease;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-backdrop-blur {
          position: absolute;
          inset: -40px;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .modal-container {
          position: relative;
          background: #fff;
          border-radius: 28px;
          max-width: 1300px;
          width: 100%;
          max-height: 92vh;
          overflow: hidden;
          animation: modalSlideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
        }

        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .modal-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          border-bottom: 1px solid #eef0f2;
          flex-shrink: 0;
        }

        .modal-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
        }

        .modal-header-category {
          font-weight: 500;
          color: #1B5E20;
        }

        .modal-header-divider {
          color: #d0d2d8;
        }

        .modal-header-client {
          color: #6b7280;
        }

        .modal-close {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: #4a4d5e;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .modal-close:hover {
          background: rgba(0,0,0,0.04);
          color: #EF5350;
        }

        .modal-close-label {
          font-size: 14px;
        }

        .modal-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          height: 100%;
          overflow: hidden;
        }

        .modal-images {
          background: #f8fafc;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          overflow-y: auto;
        }

        .main-image-container {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background: #fff;
          flex: 1;
          min-height: 400px;
        }

        .image-loader {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
        }

        .image-loader-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(27, 94, 32, 0.1);
          border-top-color: #1B5E20;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .main-image {
          width: 100%;
          height: 100%;
          max-height: 500px;
          object-fit: contain;
          display: block;
          transition: opacity 0.4s ease;
        }

        .main-image.loading {
          opacity: 0;
        }
        .main-image.loaded {
          opacity: 1;
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(12px);
          color: #1a1a2e;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          opacity: 0;
        }

        .main-image-container:hover .nav-btn {
          opacity: 1;
        }

        .nav-btn:hover {
          background: #fff;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          transform: translateY(-50%) scale(1.05);
        }

        .nav-btn.prev { left: 16px; }
        .nav-btn.next { right: 16px; }

        .image-counter {
          position: absolute;
          bottom: 16px;
          right: 16px;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          color: #fff;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 4px;
          letter-spacing: 0.5px;
        }

        .counter-current { color: #fff; }
        .counter-separator { opacity: 0.4; }
        .counter-total { opacity: 0.6; }

        .thumbnails {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          flex-shrink: 0;
        }

        .thumbnail-btn {
          position: relative;
          width: 80px;
          height: 60px;
          border-radius: 10px;
          overflow: hidden;
          border: 2px solid transparent;
          cursor: pointer;
          padding: 0;
          flex-shrink: 0;
          transition: all 0.3s ease;
          background: #eef0f2;
        }

        .thumbnail-btn.active {
          border-color: #1B5E20;
          box-shadow: 0 0 0 3px rgba(27, 94, 32, 0.15);
          transform: scale(1.02);
        }

        .thumbnail-btn:hover {
          transform: scale(1.04);
        }

        .thumbnail-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .thumbnail-active-indicator {
          position: absolute;
          inset: 0;
          border: 2px solid #1B5E20;
          border-radius: 8px;
        }

        .modal-info {
          padding: 40px 48px 48px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .modal-info-content {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .info-header {
          margin-bottom: 24px;
        }

        .modal-title {
          font-size: 32px;
          font-weight: 700;
          color: #0A0A2E;
          margin: 0 0 16px 0;
          line-height: 1.2;
        }

        .modal-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px 24px;
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .meta-label {
          font-size: 12px;
          font-weight: 500;
          color: #8c8f9c;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .meta-value {
          font-size: 14px;
          font-weight: 500;
          color: #0A0A2E;
        }

        .meta-link {
          font-size: 14px;
          font-weight: 500;
          color: #1B5E20;
          text-decoration: none;
          transition: color 0.2s;
        }

        .meta-link:hover {
          color: #4CAF50;
        }

        .modal-description-wrapper {
          flex: 1;
          padding: 20px 0;
        }

        .modal-description {
          font-size: 16px;
          line-height: 1.8;
          color: #4a4d5e;
          margin: 0;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          padding-top: 24px;
          border-top: 1px solid #eef0f2;
        }

        .modal-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 60px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          text-decoration: none;
        }

        .modal-cta.primary {
          background: linear-gradient(135deg, #1B5E20, #4CAF50);
          color: #fff;
          flex: 1;
          justify-content: center;
        }

        .modal-cta.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(27, 94, 32, 0.2);
        }

        .modal-cta.secondary {
          background: rgba(27, 94, 32, 0.06);
          color: #1B5E20;
          flex: 1;
          justify-content: center;
        }

        .modal-cta.secondary:hover {
          background: rgba(27, 94, 32, 0.1);
          transform: translateY(-2px);
        }

        .modal-share {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 16px;
          margin-top: 16px;
          border-top: 1px solid #eef0f2;
        }

        .share-label {
          font-size: 13px;
          color: #8c8f9c;
        }

        .share-buttons {
          display: flex;
          gap: 6px;
        }

        .share-btn {
          padding: 8px;
          border-radius: 50%;
          border: 1px solid #eef0f2;
          background: none;
          color: #4a4d5e;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .share-btn:hover {
          background: #1B5E20;
          color: #fff;
          border-color: #1B5E20;
          transform: translateY(-2px);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1200px) {
          .modal-grid {
            grid-template-columns: 1fr 1fr;
          }
          .modal-images {
            padding: 24px;
          }
          .modal-info {
            padding: 32px 32px 40px;
          }
        }

        @media (max-width: 992px) {
          .portfolio-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 24px;
          }
          .modal-grid {
            grid-template-columns: 1fr;
          }
          .modal-images {
            padding: 20px;
          }
          .modal-info {
            padding: 24px 28px 32px;
          }
          .modal-title {
            font-size: 26px;
          }
          .modal-meta {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .portfolio-section {
            padding: 60px 0;
          }
          .container {
            padding: 0 20px;
          }
          .portfolio-grid {
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
          .filter-wrapper {
            border-radius: 30px;
            padding: 4px;
          }
          .filter-btn {
            padding: 8px 16px;
            font-size: 13px;
          }
          .filter-btn .filter-dot,
          .filter-btn .filter-check {
            display: none;
          }
          .card-footer {
            padding: 16px 18px 18px;
          }
          .footer-title {
            font-size: 14px;
          }
          .modal-container {
            max-height: 95vh;
            border-radius: 20px;
          }
          .modal-overlay {
            padding: 16px;
          }
          .modal-header-bar {
            padding: 12px 16px;
          }
          .modal-close-label {
            display: none;
          }
          .modal-images {
            padding: 12px;
          }
          .main-image-container {
            min-height: 250px;
          }
          .modal-info {
            padding: 20px;
          }
          .modal-title {
            font-size: 22px;
          }
          .modal-actions {
            flex-direction: column;
          }
          .modal-cta {
            flex: 1;
            justify-content: center;
          }
          .view-all-btn {
            padding: 14px 28px;
          }
        }

        @media (max-width: 480px) {
          .portfolio-grid {
            grid-template-columns: 1fr;
          }
          .section-title {
            font-size: 28px;
          }
          .filter-wrapper {
            flex-direction: column;
            background: transparent;
            padding: 0;
            box-shadow: none;
            gap: 4px;
          }
          .filter-btn {
            border-radius: 12px;
            text-align: center;
            background: #fff;
            border: 1px solid #eef0f2;
            justify-content: center;
          }
          .filter-btn.active {
            border-color: #1B5E20;
          }
          .overlay-title {
            font-size: 18px;
          }
          .modal-title {
            font-size: 20px;
          }
          .nav-btn {
            width: 40px;
            height: 40px;
          }
          .thumbnails {
            gap: 6px;
          }
          .thumbnail-btn {
            width: 60px;
            height: 44px;
          }
        }
      `}</style>
    </>
  );
};

export default PortfolioContent;