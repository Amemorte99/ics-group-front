// components/portfolio/PortfolioContent.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPortfolios, getCategories } from '../../utils/api';

const PortfolioContent = ({ limit }) => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les portfolios
  useEffect(() => {
    const loadPortfolios = async () => {
      try {
        const items = await getPortfolios();

        if (!items || items.length === 0) {
          setProjects([]);
          return;
        }

        const mapped = items.map(item => {
          // Images
          const images = item.images?.length > 0
            ? item.images.map(img => 
                `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`
              )
            : ['/images/placeholder.png'];

          // Description longue (rich text)
          const longDesc = Array.isArray(item.longDesc)
            ? item.longDesc
                .map(block => {
                  if (block.type === 'paragraph' && Array.isArray(block.children)) {
                    return block.children
                      .map(child => child.text || '')
                      .join('');
                  }
                  return '';
                })
                .filter(Boolean)
                .join('\n\n')
            : 'Description longue non disponible';

          // Catégorie
          const categoryKey = item.category?.key || 'autre';

          return {
            id: item.id,
            title: item.title || 'Sans titre',
            shortDesc: item.shortDesc || 'Description courte non disponible',
            longDesc,
            category: categoryKey,
            client: item.client || 'Confidentiel',
            duration: item.duration || 'N/C',
            technologies: item.technologies || 'Divers',
            images,
          };
        });

        setProjects(mapped);
      } catch (err) {
        console.error('Erreur chargement portfolios:', err);
        setProjects([]);
      }
    };

    loadPortfolios();
  }, []);

  // Charger les catégories depuis Strapi
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await getCategories();

        const mappedCats = cats.map(cat => ({
          key: cat.key,
          label: cat.label,
        }));

        // Ajouter "Tout" en premier si pas déjà présent
        const hasAll = mappedCats.some(c => c.key === 'all');
        const finalCategories = hasAll
          ? mappedCats
          : [{ key: 'all', label: 'Tout' }, ...mappedCats];

        setCategories(finalCategories);
      } catch (err) {
        console.error('Erreur chargement catégories:', err);
        // Fallback statique en cas d'erreur
        setCategories([
          { key: 'all', label: 'Tout' },
          { key: 'web', label: 'Web & Apps' },
          { key: 'cybersecurite', label: 'Cybersécurité' },
          { key: 'energie', label: 'Énergies Renouvelables' },
          { key: 'reseaux', label: 'Réseaux' },
          { key: 'data', label: 'Data Analysis' },
          { key: 'marketing', label: 'Marketing Digital' },
          { key: 'design', label: 'Design Graphique' },
          { key: 'consulting', label: 'Consulting & Formations' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Filtrage des projets
  let displayedProjects = projects;

  if (limit) {
    displayedProjects = projects.slice(0, limit);
  } else {
    displayedProjects =
      filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);
  }

  const openModal = project => {
    setSelectedProject(project);
    setCurrentImgIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImgIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImgIndex(prev => (prev + 1) % selectedProject.images.length);
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImgIndex(
        prev => (prev - 1 + selectedProject.images.length) % selectedProject.images.length
      );
    }
  };

  if (loading) {
    return (
      <section className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
        <p className="mt-3">Chargement du portfolio...</p>
      </section>
    );
  }

  return (
    <section className="portfolio-content ptb-100 bg-light py-5">
      <div className="container">
        {/* Titre */}
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">
            {limit ? 'Nos Récentes Réalisations' : 'Notre Portfolio Complet'}
          </h2>
          {!limit && (
            <p className="lead text-muted mt-3">
              Filtrez par catégorie pour découvrir tous nos projets
            </p>
          )}
        </div>

        {/* Filtres (uniquement sur la page complète) */}
        {!limit && categories.length > 1 && (
          <div className="text-center mb-5">
            <div className="portfolio-filters d-inline-flex flex-wrap justify-content-center gap-3">
              {categories.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setFilter(cat.key)}
                  className={`filter-btn ${filter === cat.key ? 'active' : ''}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Grille des projets */}
        <div className="row justify-content-center g-5">
          {displayedProjects.length === 0 ? (
            <div className="col-12 text-center py-5">
              <p className="text-muted">Aucun projet trouvé dans cette catégorie.</p>
            </div>
          ) : (
            displayedProjects.map(project => (
              <div key={project.id} className="col-lg-4 col-md-6">
                <div
                  className="portfolio-card h-100 rounded-xl overflow-hidden shadow-lg bg-white cursor-pointer"
                  onClick={() => openModal(project)}
                >
                  <div className="position-relative overflow-hidden">
                    <img
                      src={project.images?.[0] || '/images/placeholder.png'}
                      alt={project.title}
                      className="img-fluid w-100"
                      style={{ height: '280px', objectFit: 'cover' }}
                    />
                    <div className="card-overlay">
                      <div className="overlay-text text-white p-4">
                        <h4 className="h5 fw-bold mb-2">{project.title}</h4>
                        <p className="small mb-0">{project.shortDesc}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <span className="text-primary small fw-bold text-uppercase d-block mb-2">
                      {categories.find(c => c.key === project.category)?.label || 'Autre'}
                    </span>
                    <h3 className="h5 mb-4">{project.title}</h3>
                    <button className="btn btn-primary rounded-pill px-5 py-2">
                      Voir le projet →
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bouton "Voir tout" sur la page d'accueil */}
        {limit && (
          <div className="text-center mt-5">
            <Link href="/portfolio">
              <a className="btn btn-outline-primary btn-lg rounded-pill px-5">
                Voir tout le portfolio →
              </a>
            </Link>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="portfolio-modal-backdrop" onClick={closeModal}>
          <div
            className="portfolio-modal-content"
            onClick={e => e.stopPropagation()}
          >
            <button className="modal-close-btn" onClick={closeModal}>
              ×
            </button>

            <div className="modal-header text-center py-4 text-white">
              <h3 className="mb-0">{selectedProject.title}</h3>
              <p className="mb-0 mt-2 opacity-90">
                {categories.find(c => c.key === selectedProject.category)?.label || 'Autre'}
              </p>
            </div>

            <div className="modal-body p-4 p-md-5">
              <div className="modal-carousel mb-4 position-relative">
                <img
                  src={selectedProject.images[currentImgIndex]}
                  alt={selectedProject.title}
                  className="img-fluid rounded-xl shadow w-100"
                  style={{ maxHeight: '500px', objectFit: 'contain' }}
                />
                {selectedProject.images.length > 1 && (
                  <>
                    <button className="carousel-btn prev" onClick={prevImage}>
                      ‹
                    </button>
                    <button className="carousel-btn next" onClick={nextImage}>
                      ›
                    </button>
                  </>
                )}
              </div>

              {selectedProject.images.length > 1 && (
                <div className="thumbnails d-flex justify-content-center gap-3 flex-wrap mb-4">
                  {selectedProject.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Miniature ${index + 1}`}
                      className={`thumb-img ${index === currentImgIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImgIndex(index)}
                    />
                  ))}
                </div>
              )}

              <p className="lead">{selectedProject.longDesc}</p>

              <div className="project-info row text-muted mt-4">
                <div className="col-md-4 mb-3">
                  <strong>Client :</strong> {selectedProject.client}
                </div>
                <div className="col-md-4 mb-3">
                  <strong>Durée :</strong> {selectedProject.duration}
                </div>
                <div className="col-md-4 mb-3">
                  <strong>Technologies :</strong> {selectedProject.technologies}
                </div>
              </div>

              <div className="text-center mt-5">
                <Link href="/contact">
                  <a
                    className="btn btn-primary btn-lg rounded-pill px-5"
                    onClick={closeModal}
                  >
                    Demander un projet similaire
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioContent;