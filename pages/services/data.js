import ServiceLayout from "../../components/Layouts/ServiceLayout";

const DataService = () => {
  return (
    <ServiceLayout
      title="Data Analysis"
      caption="Exploitez vos données pour des décisions intelligentes"
    >
      <section className="container ptb-70">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h2>Analyse & valorisation des données</h2>
            <p>
              Nous transformons vos données brutes en informations
              stratégiques grâce à l’analyse, la visualisation et
              l’intelligence décisionnelle.
            </p>

            <ul>
              <li>Analyse de données et reporting</li>
              <li>Tableaux de bord interactifs</li>
              <li>Business Intelligence</li>
              <li>Data cleaning & préparation</li>
              <li>Aide à la décision</li>
            </ul>
          </div>

          <div className="col-lg-6">
            <img
              src="/images/services/data-analysis.png"
              alt="Data Analysis"
              className="img-fluid"
            />
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
};

export default DataService;
