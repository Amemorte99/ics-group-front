import ServiceLayout from "../../components/Layouts/ServiceLayout";

const EnergieService = () => {
  return (
    <ServiceLayout
      title="Énergies Renouvelables"
      caption="Solutions solaires complètes pour réduire votre facture et votre empreinte carbone"
    >
      <section className="container ptb-70 services-page">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h2>Énergie solaire professionnelle et accessible</h2>
            
            <p>
              Panneaux solaires, fixations des panneaux solaires, régulateur solaire, batterie solaire, chargeur de batterie solaire, onduleur solaire 230V, onduleur chargeur 230V, convertisseur DC/DC, éclairage solaire, câbles et accessoires...
            </p>

            <p>
              Que ce soit par l’information, la formation, la conception, la vente, l’installation ou la maintenance de systèmes d’efficacité énergétique, ICS GROUPE offre à ses clients un service professionnel qualifié et adapté à leurs besoins particuliers.
            </p>

            <p>
              Nous étudions vos besoins dès le départ et y trouvons ensuite une solution rapidement, dans le respect de votre budget. Nos produits et services permettent aux entreprises et particuliers d’optimiser leur rendement énergétique, de réduire leur empreinte écologique, tout en maximisant leur retour sur investissement le plus rapidement possible, avec une équipe professionnelle, responsable et dynamique !
            </p>

            <ul className="list-check">
              <li>Étude personnalisée de vos besoins</li>
              <li>Solutions adaptées à votre budget</li>
              <li>Optimisation du rendement énergétique</li>
              <li>Réduction de l’empreinte écologique</li>
              <li>Retour sur investissement rapide</li>
              <li>Équipe dynamique et responsable</li>
              <li>Maintenance et formation incluses</li>
            </ul>
          </div>

          <div className="col-lg-6">
            <img 
              src="https://media.istockphoto.com/id/1363041155/vector/solar-panel-installation-and-solar-power-system-for-residential-house.jpg?s=612x612&w=0&k=20&c=3yIV2eIaN4Dr22cwb39CRbiDA66pn06wZvxOk36GAp8=" 
              alt="Énergies Renouvelables ICS GROUPE - Installation solaire complète" 
              className="img-fluid rounded shadow" 
            />
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
};

export default EnergieService;