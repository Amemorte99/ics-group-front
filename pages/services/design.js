import ServiceLayout from "../../components/Layouts/ServiceLayout";

const DesignService = () => {
  return (
    <ServiceLayout
      title="Design Graphique & Communication"
      caption="Des supports visuels impactants pour renforcer votre image de marque"
    >
      <section className="container ptb-70 services-page">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h2>Design au service de votre entreprise</h2>
            
            <p>
              ICS GROUPE vous accompagne dans la conception de supports de communication optimisés qui répondent aux normes de communication et aux codes marketing.
            </p>

            <p>
              Nous mettons l’art du design graphique au service de votre entreprise grâce à des contenus visuels et textuels correspondant parfaitement à vos attentes et à celles de votre public cible.
            </p>

            <p>
              Nous vous aidons à travailler vos propositions de valeur pour améliorer votre positionnement marketing et créer des argumentaires commerciaux plus pertinents qui feront la différence sur le terrain.
            </p>

            <ul className="list-check">
              <li>Création d’identité visuelle (logo, charte graphique)</li>
              <li>Supports print et digitaux (flyers, brochures, bannières, réseaux sociaux)</li>
              <li>Optimisation de vos propositions de valeur</li>
              <li>Argumentaires commerciaux pertinents et différenciants</li>
              <li>Contenus adaptés à votre public cible</li>
            </ul>
          </div>

          <div className="col-lg-6">
            <img 
              src="https://img.freepik.com/premium-vector/designers-agency-concept-with-modern-flat-design-web-man-woman-working-creative-project-making-graphics-content-site-layout-elements-optimizating-visual-page-vector-illustration_9209-16814.jpg" 
              alt="Design Graphique & Communication ICS GROUPE - Création visuelle professionnelle" 
              className="img-fluid rounded shadow" 
            />
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
};

export default DesignService;