import React, { useState } from 'react';
import Link from 'next/link';

const PortfolioContent = ({ limit }) => {
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

 const projects = [
  {
    id: 1,
    title: "Site E-commerce pour Boutique Locale",
    shortDesc: "Site responsive avec paiement en ligne, gestion stock et SEO optimisé.",
    longDesc: "Nous avons développé un site e-commerce complet pour une boutique de mode à N'Djamena. Le site intègre un système de paiement sécurisé compatible Orange Money et Mobile Money, une gestion de stock en temps réel, un catalogue produit dynamique et une optimisation SEO locale pour un meilleur positionnement sur les moteurs de recherche au Tchad.",
    category: "web",
    client: "Boutique Fashion & Beauté",
    duration: "3 mois",
    technologies: "Next.js, Node.js, MongoDB, Tailwind CSS, Orange Money API",
    images: [
      "https://img.freepik.com/free-psd/e-commerce-web-page-template_23-2147569657.jpg",
      "https://img.freepik.com/free-psd/online-shopping-web-template_23-2147569660.jpg",
      "https://img.freepik.com/free-psd/mobile-shopping-web-template_23-2147569663.jpg"
    ]
  },
  {
    id: 2,
    title: "Application Mobile de Gestion Interne",
    shortDesc: "App hybride pour suivi des projets et communication d'équipe en temps réel.",
    longDesc: "Application mobile interne pour une entreprise de logistique permettant le suivi en temps réel des interventions terrain, la communication instantanée entre équipes, la géolocalisation des véhicules et collaborateurs, ainsi que la génération automatique de rapports journaliers.",
    category: "web",
    client: "Logistics Pro Tchad",
    duration: "4 mois",
    technologies: "React Native, Firebase, Google Maps API, Redux",
    images: [
      "https://img.freepik.com/free-vector/app-development-illustration_52683-47931.jpg",
      "https://img.freepik.com/free-vector/mobile-app-development-concept-illustration_114360-135.jpg",
      "https://img.freepik.com/free-vector/team-work-concept-illustration_114360-789.jpg"
    ]
  },
  {
    id: 3,
    title: "Audit & Renforcement Cybersécurité Banque",
    shortDesc: "Audit complet, pentest, formation et mise en conformité ISO 27001.",
    longDesc: "Mission complète de cybersécurité pour une institution bancaire : audit de vulnérabilités, tests d'intrusion (pentest), renforcement des infrastructures réseau et serveurs, mise en place de politiques de sécurité, et formation certifiante du personnel IT.",
    category: "cybersecurite",
    client: "Banque Commerciale du Chari",
    duration: "5 mois",
    technologies: "ISO 27001, Kali Linux, Nessus, Fortinet, Cisco Secure",
    images: [
      "https://img.freepik.com/free-vector/cyber-security-concept_23-2148524799.jpg",
      "https://img.freepik.com/free-vector/flat-design-illustration-cyber-security_23-2148533321.jpg",
      "https://img.freepik.com/free-vector/data-protection-concept-illustration_114360-102.jpg"
    ]
  },
  {
    id: 4,
    title: "Installation Solaire 50kW pour Usine",
    shortDesc: "Système photovoltaïque complet avec monitoring en temps réel et batteries.",
    longDesc: "Conception et installation d’un système solaire de 50kW pour une usine agroalimentaire. Inclut panneaux solaires haute efficacité, onduleurs hybrides, batteries lithium pour stockage, système de monitoring à distance et maintenance annuelle.",
    category: "energie",
    client: "Agro Industries Tchad",
    duration: "2 mois",
    technologies: "Panneaux Canadian Solar, Onduleurs Victron Energy, Batteries Pylontech",
    images: [
      "https://img.freepik.com/free-vector/solar-energy-concept-illustration_114360-1109.jpg",
      "https://img.freepik.com/free-photo/solar-panels-roof-modern-house_1353-276.jpg",
      "https://img.freepik.com/free-photo/technician-installing-solar-panels-roof_1353-277.jpg"
    ]
  },
  {
    id: 5,
    title: "Réseau Fibre Optique Multisite",
    shortDesc: "Interconnexion sécurisée de 6 sites avec redondance et haute disponibilité.",
    longDesc: "Déploiement d’un réseau fibre optique reliant 6 sites d’une entreprise nationale : conception du backbone, installation de switches Cisco, configuration VPN site-to-site, redondance des liaisons et monitoring centralisé.",
    category: "reseaux",
    client: "Groupe Télécom National",
    duration: "6 mois",
    technologies: "Cisco Catalyst, Fibre optique monomode, FortiGate Firewall",
    images: [
      "https://img.freepik.com/free-vector/network-concept-illustration_114360-147.jpg",
      "https://img.freepik.com/free-photo/fiber-optic-cables-connected-server-room_1353-278.jpg",
      "https://img.freepik.com/free-photo/technician-working-data-center_1353-279.jpg"
    ]
  },
  {
    id: 6,
    title: "Dashboard Logistique & Supply Chain",
    shortDesc: "Tableau de bord BI interactif pour optimisation des flux et prévisions.",
    longDesc: "Création d’un dashboard Business Intelligence permettant le suivi en temps réel des stocks, des livraisons, des coûts logistiques et des prévisions de demande grâce à l’intelligence artificielle.",
    category: "data",
    client: "Import-Export Tchad",
    duration: "3 mois",
    technologies: "Power BI, Python, SQL Server, Machine Learning",
    images: [
      "https://img.freepik.com/free-vector/data-analysis-concept-illustration_114360-916.jpg",
      "https://img.freepik.com/free-vector/business-intelligence-dashboard-concept-illustration_114360-917.jpg",
      "https://img.freepik.com/free-vector/analytics-concept-illustration_114360-918.jpg"
    ]
  },
  {
    id: 7,
    title: "Campagne Marketing Digital pour Lancement Produit",
    shortDesc: "Stratégie multi-canal : Google Ads, Facebook, SEO, email marketing.",
    longDesc: "Campagne complète de lancement d’un nouveau produit sur le marché tchadien : création de contenu, publicité ciblée sur Facebook et Google, référencement naturel, email marketing et suivi des conversions.",
    category: "marketing",
    client: "Cosmétiques Naturels SA",
    duration: "2 mois",
    technologies: "Google Ads, Meta Business Suite, Mailchimp, Google Analytics",
    images: [
      "https://img.freepik.com/free-vector/digital-marketing-team-with-laptops-light-bulb_1262-17389.jpg",
      "https://img.freepik.com/free-vector/social-media-marketing-concept-illustration_114360-124.jpg",
      "https://img.freepik.com/free-vector/email-marketing-concept-illustration_114360-125.jpg"
    ]
  },
  {
    id: 8,
    title: "Refonte Identité Visuelle Entreprise",
    shortDesc: "Nouveau logo, charte graphique complète, supports print et web.",
    longDesc: "Refonte complète de l’identité visuelle d’une entreprise tchadienne : création de logo moderne, charte graphique détaillée, déclinaison sur cartes de visite, papier en-tête, site web et réseaux sociaux.",
    category: "design",
    client: "Holding Invest Tchad",
    duration: "1.5 mois",
    technologies: "Adobe Illustrator, Photoshop, Figma",
    images: [
      "https://img.freepik.com/free-vector/graphic-designer-workplace_23-2148479690.jpg",
      "https://img.freepik.com/free-vector/branding-concept-illustration_114360-126.jpg",
      "https://img.freepik.com/free-vector/logo-design-concept-illustration_114360-127.jpg"
    ]
  },
  {
    id: 9,
    title: "Formation Cybersécurité pour 50 Collaborateurs",
    shortDesc: "Programme certifiant avec transfert de compétences et accompagnement.",
    longDesc: "Formation intensive en cybersécurité pour 50 employés d’une administration publique : sensibilisation, bonnes pratiques, détection des attaques phishing, sécurisation des postes de travail et remise de certificats.",
    category: "consulting",
    client: "Ministère de l'Administration",
    duration: "2 mois",
    technologies: "Supports pédagogiques, plateforme e-learning, certification ICS GROUPE",
    images: [
      "https://img.freepik.com/free-vector/business-consulting-concept-illustration_114360-1039.jpg",
      "https://img.freepik.com/free-vector/online-learning-concept-illustration_114360-1040.jpg",
      "https://img.freepik.com/free-vector/team-work-concept-illustration_114360-789.jpg"
    ]
  }
];

  let displayedProjects = projects;

  if (limit) {
    displayedProjects = projects.slice(0, limit);
  } else {
    displayedProjects = filter === "all"
      ? projects
      : projects.filter(p => p.category === filter);
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

  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentImgIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImgIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImgIndex((prev) => (prev + 1) % selectedProject.images.length);
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImgIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
    }
  };

  return (
    <section className="portfolio-content ptb-100 bg-light py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">
            {limit ? "Nos Réalisations Récentes" : "Notre Portfolio Complet"}
          </h2>
          {!limit && <p className="lead text-muted mt-3">Filtrez par catégorie pour découvrir tous nos projets</p>}
        </div>

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

        <div className="row justify-content-center g-5">
          {displayedProjects.map(project => (
            <div key={project.id} className="col-lg-4 col-md-6">
              <div className="portfolio-card h-100 rounded-xl overflow-hidden shadow-lg bg-white cursor-pointer" onClick={() => openModal(project)}>
                <div className="position-relative overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="img-fluid w-100"
                    style={{ height: "280px", objectFit: "cover" }}
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
                    {categories.find(c => c.key === project.category)?.label}
                  </span>
                  <h3 className="h5 mb-4">{project.title}</h3>
                  <button className="btn btn-primary rounded-pill px-5 py-2">
                    Voir le projet →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

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

      {/* Modal détail projet */}
      {selectedProject && (
        <div className="portfolio-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={closeModal}>×</span>

            <div className="modal-gallery position-relative">
              <img 
                src={selectedProject.images[currentImgIndex]} 
                alt={selectedProject.title}
                className="modal-main-img"
              />
              {selectedProject.images.length > 1 && (
                <>
                  <button className="modal-nav prev" onClick={prevImage}>‹</button>
                  <button className="modal-nav next" onClick={nextImage}>›</button>
                  <div className="modal-thumbnails">
                    {selectedProject.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Miniature ${index + 1}`}
                        className={`thumbnail ${index === currentImgIndex ? 'active' : ''}`}
                        onClick={() => setCurrentImgIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="modal-info p-5">
              <span className="text-primary small fw-bold text-uppercase">
                {categories.find(c => c.key === selectedProject.category)?.label}
              </span>
              <h2 className="h3 mt-2 mb-4">{selectedProject.title}</h2>
              <p className="lead mb-5">{selectedProject.longDesc}</p>

              <div className="project-meta row text-muted">
                <div className="col-md-4 mb-3"><strong>Client :</strong> {selectedProject.client || "Confidentiel"}</div>
                <div className="col-md-4 mb-3"><strong>Durée :</strong> {selectedProject.duration || "N/C"}</div>
                <div className="col-md-4 mb-3"><strong>Technologies :</strong> {selectedProject.technologies || "Divers"}</div>
              </div>

              <div className="text-center mt-5">
                <Link href="/contact">
                  <a className="btn btn-primary btn-lg rounded-pill px-5" onClick={closeModal}>
                    Demander un projet similaire
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Modal full-screen premium */
        .portfolio-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.95);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal-content {
          max-width: 1200px;
          width: 100%;
          max-height: 95vh;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
        }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 30px;
          font-size: 40px;
          color: white;
          cursor: pointer;
          z-index: 10;
          text-shadow: 0 2px 10px black;
        }

        .modal-gallery {
          height: 60vh;
          position: relative;
          background: #000;
        }

        .modal-main-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .modal-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.9);
          color: #333;
          border: none;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          font-size: 30px;
          cursor: pointer;
          z-index: 10;
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }

        .prev { left: 30px; }
        .next { right: 30px; }

        .modal-thumbnails {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
        }

        .thumbnail {
          width: 80px;
          height: 60px;
          object-fit: cover;
          border-radius: 8px;
          cursor: pointer;
          opacity: 0.6;
          border: 3px solid transparent;
          transition: all 0.3s;
        }

        .thumbnail.active {
          opacity: 1;
          border-color: #E7376E;
        }

        .modal-info {
          flex: 1;
          overflow-y: auto;
        }

        @media (max-width: 992px) {
          .modal-content {
            flex-direction: column;
            max-height: 98vh;
          }
          .modal-gallery {
            height: 50vh;
          }
        }
      `}</style>
    </section>
  );
};

export default PortfolioContent;