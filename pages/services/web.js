import ServiceLayout from "../../components/Layouts/ServiceLayout";

const WebService = () => {
  return (
    <ServiceLayout
      title="Sites Web & Applications Mobiles"
      caption="Des solutions digitales performantes et sur mesure"
    >
      <section className="container ptb-70 services-page">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h2>Votre présence digitale optimisée</h2>
            
            <p>
              Ce pôle d’activité prend en compte les services suivants : création de sites web, développement d’applications mobiles, informatisation des systèmes d’information et gestion de bases de données.
            </p>

            <p>
              Nous concevons et développons des sites web modernes, responsives et des applications mobiles natives ou hybrides parfaitement adaptées à vos besoins et à ceux de vos utilisateurs.
            </p>

            <p>
              De la conception à la maintenance, nous assurons une informatisation complète de vos processus pour une performance optimale et une évolutivité durable.
            </p>

            <ul className="list-check">
              <li>Création de sites web professionnels et responsives</li>
              <li>Développement d’applications mobiles (iOS & Android)</li>
              <li>Informatisation des systèmes d’information</li>
              <li>Conception et gestion de bases de données sécurisées</li>
              <li>Maintenance, mises à jour et évolution continue</li>
              <li>Solutions techniques adaptées à votre secteur</li>
            </ul>
          </div>

          <div className="col-lg-6">
            <img 
              src="https://img.freepik.com/free-vector/app-development-illustration_52683-47931.jpg" 
              alt="Sites Web & Applications Mobiles ICS GROUPE - Développement digital sur mesure" 
              className="img-fluid rounded shadow" 
            />
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
};

export default WebService;