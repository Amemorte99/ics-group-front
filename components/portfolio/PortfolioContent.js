import React, { useState } from 'react';

const PortfolioContent = ({ limit }) => {  // Nouvelle prop "limit"
  const [filter, setFilter] = useState("all");

  const projects = [
    { id: 1, title: "Site E-commerce pour Boutique Locale", description: "Site responsive avec paiement en ligne, gestion stock et SEO optimisé.", category: "web", image: "https://img.freepik.com/free-vector/web-development-illustration_52683-47931.jpg" },
    { id: 2, title: "Application Mobile de Gestion Interne", description: "App hybride pour suivi des projets et communication d'équipe en temps réel.", category: "web", image: "https://img.freepik.com/free-vector/app-development-illustration_52683-47931.jpg" },
    { id: 3, title: "Audit & Renforcement Cybersécurité Banque", description: "Audit complet, pentest, formation et mise en conformité ISO 27001.", category: "cybersecurite", image: "https://img.freepik.com/free-vector/cyber-security-concept_23-2148524799.jpg" },
    { id: 4, title: "Installation Solaire 50kW pour Usine", description: "Système photovoltaïque complet avec monitoring en temps réel et batteries.", category: "energie", image: "https://img.freepik.com/free-vector/solar-energy-concept-illustration_114360-1109.jpg" },
    { id: 5, title: "Réseau Fibre Optique Multisite", description: "Interconnexion sécurisée de 6 sites avec redondance et haute disponibilité.", category: "reseaux", image: "https://img.freepik.com/free-vector/network-concept-illustration_114360-147.jpg" },
    { id: 6, title: "Dashboard Logistique & Supply Chain", description: "Tableau de bord BI interactif pour optimisation des flux et prévisions.", category: "data", image: "https://img.freepik.com/free-vector/data-analysis-concept-illustration_114360-916.jpg" },
    { id: 7, title: "Campagne Marketing Digital pour Lancement Produit", description: "Stratégie multi-canal : Google Ads, Facebook, SEO, email marketing.", category: "marketing", image: "https://img.freepik.com/free-vector/digital-marketing-team-with-laptops-light-bulb_1262-17389.jpg" },
    { id: 8, title: "Refonte Identité Visuelle Entreprise", description: "Nouveau logo, charte graphique complète, supports print et web.", category: "design", image: "https://img.freepik.com/free-vector/graphic-designer-workplace_23-2148479690.jpg" },
    { id: 9, title: "Formation Cybersécurité pour 50 Collaborateurs", description: "Programme certifiant avec transfert de compétences et accompagnement.", category: "consulting", image: "https://img.freepik.com/free-vector/business-consulting-concept-illustration_114360-1039.jpg" },
    // Tu peux en ajouter plus ici si tu veux (ils apparaîtront seulement sur /portfolio)
  ];

  let displayedProjects = projects;

  // Si un limit est passé (ex: accueil), on limite l'affichage
  if (limit) {
    displayedProjects = projects.slice(0, limit);
  } else {
    // Sinon (page portfolio), on applique le filtre
    displayedProjects = filter === "all" 
      ? projects 
      : projects.filter(project => project.category === filter);
  }

  const categories = [
    { key: "all", label: "Tout" },
    { key: "web", label: "Web & Apps" },
    { key: "cybersecurite", label: "Cybersécurité" },
    { key: "energie", label: "Énergies Renouvelables" },
    { key: "reseaux", label: "Réseaux" },
    { key: "data", label: "Data Analysis" },
    { key: "marketing", label: "Marketing Digital" },
    { key: "design", label: "Design Graphique" },
    { key: "consulting", label: "Consulting & Formations" },
  ];

  return (
    <section className="portfolio-content ptb-100 bg-light">
      <div className="container">
        {/* Titre différent selon la page */}
        <div className="section-title text-center mb-5">
          <h2>{limit ? "Nos Réalisations Récentes" : "Notre Portfolio Complet"}</h2>
          {!limit && <p className="lead mt-3">Filtrez par catégorie pour découvrir tous nos projets</p>}
        </div>

        {/* Filtres seulement sur la page complète */}
        {!limit && (
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
          {displayedProjects.map(project => (
            <div key={project.id} className="col-lg-4 col-md-6">
              <div className="portfolio-card h-100 rounded-xl overflow-hidden shadow-lg bg-white">
                <div className="portfolio-img-wrapper position-relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="img-fluid w-100"
                    style={{ height: "280px", objectFit: "cover" }}
                  />
                  <div className="portfolio-overlay">
                    <div className="overlay-content">
                      <h4 className="text-white fw-bold">{project.title}</h4>
                      <p className="text-white small">{project.description}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <span className="text-primary small fw-bold text-uppercase d-block mb-2">
                    {categories.find(c => c.key === project.category)?.label}
                  </span>
                  <h3 className="h5 mb-4">{project.title}</h3>
                  <a href="#" className="btn btn-primary rounded-pill px-5 py-2">
                    Voir le projet →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton "Voir tout le portfolio" sur l'accueil */}
        {limit && (
          <div className="text-center mt-5">
            <a href="/portfolio" className="btn btn-outline-primary btn-lg rounded-pill px-5">
              Voir tout le portfolio →
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioContent;