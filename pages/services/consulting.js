import ServiceLayout from "../../components/Layouts/ServiceLayout";

const ConsultingService = () => {
  return (
    <ServiceLayout
      title="Consulting & Formations"
      caption="Expertise et transfert de compétences pour vos équipes"
    >
      <section className="container ptb-70 services-page">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h2>Accompagnement global et formation sur mesure</h2>
            
            <p>
              Nous assurons un <strong>consulting global</strong> pour tous vos besoins ayant une droite ligne avec nos pôles d’activités.
            </p>

            <p>
              Nous vous livrons un <strong>cahier des charges complet</strong> prêt à l’exploitation et à l’exécution.
            </p>

            <p>
              Nous offrons des <strong>formations</strong> dans tous nos domaines de compétences. Il est également possible de solliciter un <strong>service de transfert de compétences</strong> dédié à vos équipes techniques, avec un accompagnement post-formation.
            </p>

            <ul className="list-check">
              <li>Rédaction d’un cahier des charges détaillé et prêt à l’exécution</li>
              <li>Conseil stratégique et technique personnalisé</li>
              <li>Formations spécialisées dans tous nos domaines (cybersécurité, réseaux, énergie solaire, data, etc.)</li>
              <li>Transfert de compétences pour vos équipes techniques</li>
              <li>Accompagnement et suivi post-formation</li>
            </ul>
          </div>

          <div className="col-lg-6">
            <img 
              src="https://img.freepik.com/free-vector/business-consulting-concept-illustration_114360-1039.jpg" 
              alt="Consulting & Formations ICS GROUPE - Expertise et transfert de compétences" 
              className="img-fluid rounded shadow" 
            />
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
};

export default ConsultingService;