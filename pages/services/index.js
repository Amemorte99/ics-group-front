import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Layouts/Navbar';
import Footer from '../../components/Layouts/Footer';
import PageBannerContent from '../../components/Common/PageBannerContent';
import services from '../../data/services';

const ServicesPage = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Bannière */}
      <PageBannerContent 
        pageTitle="Nos Services" 
        pageCaption="ICS GROUPE vous accompagne dans tous vos projets numériques, sécuritaires et énergétiques avec des solutions innovantes et sur mesure."
      />

      {/* Liste des services en cartes jolies */}
      <section className="services-list-area ptb-100 bg-light py-5">
        <div className="container">
          <div className="row justify-content-center">
            {services.map((service) => (
              <div key={service.slug} className="col-lg-4 col-md-6 col-sm-10 mb-5">
                <div className="service-card h-100 rounded-lg shadow-lg overflow-hidden bg-white position-relative transition-all">
                  <div className="service-img-wrapper">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="img-fluid w-100"
                      style={{ height: "240px", objectFit: "cover" }}
                    />
                  </div>

                  <div className="p-5 text-center">
                    <h3 className="h4 fw-bold text-dark mb-3">{service.title}</h3>
                    <p className="text-muted mb-4 px-3">{service.caption}</p>
                    <Link href={`/services/${service.slug}`}>
                      <a className="btn btn-primary rounded-pill px-5 py-2 shadow-sm">
                        En savoir plus →
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Styles améliorés pour plus de beauté */}
      <style jsx>{`
        .services-list-area {
          background: #f8f9fa;
        }

        .service-card {
          transition: all 0.4s ease;
          border: none;
        }

        .service-card:hover {
          transform: translateY(-15px);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15) !important;
        }

        .service-img-wrapper {
          overflow: hidden;
        }

        .service-img-wrapper img {
          transition: transform 0.5s ease;
        }

        .service-card:hover .service-img-wrapper img {
          transform: scale(1.1);
        }

        .btn-primary {
          background: #007bff;
          border: none;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          background: #0056b3;
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,123,255,0.3);
        }

        @media (max-width: 768px) {
          .service-card {
            margin-bottom: 30px;
          }
        }
      `}</style>
    </>
  );
};

export default ServicesPage;