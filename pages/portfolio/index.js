import React, { useState } from 'react';
import Navbar from '../../components/Layouts/Navbar';
import Footer from '../../components/Layouts/Footer';
import PageBannerContent from '../../components/Common/PageBannerContent';

const PortfolioPage = () => {
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
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

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
    <>
      {/* Navbar */}
      <Navbar />
       <PageBannerContent 
                    pageTitle="Notre Portfolio" 
                    pageCaption="              Découvrez une sélection de nos réalisations récentes. Chaque projet témoigne de notre expertise, 
              de notre engagement et de la satisfaction de nos clients à travers le Tchad et au-delà." 
                />



      {/* Filtres + Galerie */}
      <section className="portfolio-area ptb-100 bg- mt-5">
        <div className="container">
          {/* Filtres */}
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

          {/* Grille projets */}
          <div className="row justify-content-center g-4 mb-5">
            {filteredProjects.map(project => (
              <div key={project.id} className="col-lg-4 col-md-6">
                <div className="portfolio-card h-100 rounded-xl overflow-hidden shadow-lg">
                  <div className="portfolio-img-wrapper position-relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="img-fluid w-100"
                      style={{ height: "260px", objectFit: "cover" }}
                    />
                    <div className="portfolio-overlay">
                      <div className="overlay-content">
                        <h4>{project.title}</h4>
                        <p>{project.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white text-center">
                    <span className="text-primary small fw-bold text-uppercase">
                      {categories.find(c => c.key === project.category)?.label}
                    </span>
                    <h3 className="h5 mt-2 mb-3">{project.title}</h3>
                    <a href="#" className="btn btn-primary rounded-pill px-4 py-2 mt-3">
                      Voir le projet →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Styles premium */}
      <style jsx>{`
        .bg-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .page-banner-area h1 {
          text-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
        .banner-bar {
          width: 120px;
          height: 6px;
          background: white;
          margin: 25px auto;
          border-radius: 3px;
        }
        .max-w-900 {
          max-width: 900px;
        }

        .portfolio-filters .filter-btn {
          background: white;
          color: #333;
          border: 2px solid #e0e0e0;
          border-radius: 50px;
          padding: 12px 28px;
          font-weight: 600;
          transition: all 0.4s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        .portfolio-filters .filter-btn:hover,
        .portfolio-filters .filter-btn.active {
          background: #E7376E;
          color: white;
          border-color: #E7376E;
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(167, 169, 172,0.3);
        }

        .portfolio-card {
          background: white;
          transition: all 0.5s ease;
        }
        .portfolio-card:hover {
          transform: translateY(-20px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.2) !important;
        }

        .portfolio-img-wrapper {
          position: relative;
          overflow: hidden;
        }
        .portfolio-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
          display: flex;
          align-items: flex-end;
          padding: 20px;
        }
        .portfolio-card:hover .portfolio-overlay {
          opacity: 1;
        }
        .overlay-content h4, .overlay-content p {
          color: white;
          margin: 0;
        }
        .overlay-content h4 {
          font-size: 1.3rem;
          font-weight: 700;
        }

  
      `}</style>
    </>
  );
};

export default PortfolioPage;