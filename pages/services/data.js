import ServiceLayout from "../../components/Layouts/ServiceLayout";

const DataService = () => {
  return (
    <ServiceLayout
      title="Data Analysis"
      caption="Transformez vos données en décisions stratégiques"
    >
      <section className="container ptb-70 services-page">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h2>Analysez vos données pour prendre les meilleures décisions</h2>
            
            <p className="lead mb-4">
              « Analyser les données pour aider à la prise de décisions... »
            </p>

            <p>
              Notre service d’analyse de données prend en compte toute la complexité de vos données et vous aide notamment à :
            </p>

            <ul className="list-check">
              <li>Analyser de grands volumes de données provenant de sources disparates, sous diverses formes et types, en temps opportun</li>
              <li>Prendre rapidement des décisions éclairées pour élaborer des stratégies efficaces (amélioration de la chaîne d’approvisionnement, logistique, prise de décision tactique)</li>
              <li>Réaliser des économies grâce à l’efficacité accrue et à l’optimisation des processus commerciaux</li>
              <li>Mettre en place des techniques de gestion des risques plus éclairées basées sur des échantillons de données de grande taille</li>
              <li>Obtenir une meilleure connaissance du comportement, des demandes et des sentiments des consommateurs pour améliorer le développement de produits et les processus de gestion stratégique</li>
            </ul>

            <p className="mt-4">
              Grâce à notre expertise en Business Intelligence et visualisation de données, nous transformons vos données brutes en insights actionnables qui boostent votre performance globale.
            </p>
          </div>

          <div className="col-lg-6">
            <img 
              src="https://img.freepik.com/free-vector/data-analysis-concept-illustration_114360-916.jpg" 
              alt="Data Analysis ICS GROUPE - Transformation des données en insights stratégiques" 
              className="img-fluid rounded shadow" 
            />
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
};

export default DataService;