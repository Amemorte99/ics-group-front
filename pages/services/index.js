import Link from "next/link";
import services from "../../data/services";

export default function ServicesPage() {
  return (
    <>
      <section className="services-list-area ptb-100">
        <div className="container">
          <div className="section-title text-center mb-50">
            <h1>Nos Services</h1>
            <div className="bar mx-auto"></div>
            <p className="mt-3">
              ICS GROUPE vous accompagne dans tous vos projets numériques, sécuritaires et énergétiques avec des solutions sur mesure.
            </p>
          </div>

          <div className="row justify-content-center">
            {services.map((service) => (
              <div key={service.slug} className="col-lg-4 col-md-6 col-sm-8 mb-4">
                <div className="service-card text-center h-100 shadow-sm rounded overflow-hidden">
                  <div className="service-image">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="img-fluid w-100" 
                      style={{ height: "220px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="h4 mb-3">{service.title}</h3>
                    <p className="text-muted mb-4">{service.caption}</p>
                    <Link href={`/services/${service.slug}`}>
                      <a className="btn btn-primary btn-sm">
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

      <style jsx>{`
        .service-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background: white;
        }
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
        }
        .section-title .bar {
          width: 80px;
          height: 4px;
          background: #007bff;
          margin: 20px auto;
        }
      `}</style>
    </>
  );
}