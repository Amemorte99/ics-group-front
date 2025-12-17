import ServiceLayout from "../../components/Layouts/ServiceLayout";

const MarketingService = () => {
  return (
    <ServiceLayout
      title="Marketing Digital"
      caption="Définissons une stratégie gagnante pour votre présence en ligne"
    >
      <section className="container ptb-70 services-page">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h2>Marketing Digital sur mesure</h2>
            
            <p>
              Nous collectons vos besoins et attentes. Puis nous les analysons en tenant compte des paramètres tels que la persona, la zone d’activité, l’étude du marché, la veille concurrentielle... pour définir une feuille de route claire.
            </p>

            <p>
              Au terme de cette étude, nous définissons trois (3) outils essentiels pour votre succès digital :
            </p>

            <ul className="list-check">
              <li>Le <strong>plan marketing</strong> : stratégie de positionnement qui va en droite ligne avec les comportements de la persona et les réalités du marché</li>
              <li>Les <strong>outils techniques et plateformes numériques</strong> : sélection des plateformes appropriées en fonction de vos produits, services et du profil de votre cible</li>
              <li>Les <strong>outils et indicateurs de performance</strong> : implémentation du plan d’action opérationnel avec suivi régulier et KPI pour évaluer et optimiser les stratégies</li>
            </ul>

            <p>
              Nous participons à l’implémentation et assurons un suivi continu pour garantir des résultats concrets et durables.
            </p>
          </div>

          <div className="col-lg-6">
            <img 
              src="https://img.freepik.com/free-vector/digital-marketing-team-with-laptops-light-bulb_1262-17389.jpg" 
              alt="Marketing Digital ICS GROUPE - Stratégie digitale personnalisée" 
              className="img-fluid rounded shadow" 
            />
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
};

export default MarketingService;