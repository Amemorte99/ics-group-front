import ServiceLayout from "../../components/Layouts/ServiceLayout";

const ReseauxService = () => {
  return (
    <ServiceLayout
      title="Réseaux & Télécommunications"
      caption="Connectivité fiable et performante pour votre entreprise"
    >
      <section className="container ptb-70 services-page">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h2>Solutions globales de réseaux et télécommunications</h2>
            
            <p>
              ICS GROUPE vous accompagne dans l’interconnexion de vos sites avec liaisons multiples, en concevant des supports de communication optimisés pour une visibilité maximale et une efficacité accrue.
            </p>

            <p>
              Nous proposons un accompagnement complet pour la conception, la maintenance et la gestion des infrastructures des fournisseurs d’accès internet, garantissant ainsi un service fiable et performant pour vos utilisateurs.
            </p>

            <p>
              Nous offrons également des services de conseil et d’assistance dans le domaine des réseaux et télécommunications, vous aidant à optimiser vos infrastructures et à garantir des solutions efficaces pour répondre à vos besoins spécifiques.
            </p>

            <ul className="list-check">
              <li>Interconnexion de sites avec liaisons multiples</li>
              <li>Conception de supports optimisés pour visibilité et efficacité</li>
              <li>Support et maintenance des infrastructures FAI</li>
              <li>Gestion complète et service fiable pour vos utilisateurs</li>
              <li>Conseil et assistance technique personnalisée</li>
              <li>Optimisation continue de vos réseaux</li>
            </ul>
          </div>

          <div className="col-lg-6">
            <img 
              src="https://img.freepik.com/free-vector/network-concept-illustration_114360-147.jpg" 
              alt="Réseaux & Télécommunications ICS GROUPE - Infrastructure fiable et performante" 
              className="img-fluid rounded shadow" 
            />
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
};

export default ReseauxService;