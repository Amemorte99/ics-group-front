import ServiceLayout from "../../components/Layouts/ServiceLayout";

const CyberService = () => {
  return (
    <ServiceLayout
      title="Cybersécurité"
      caption="Protégez votre entreprise contre les menaces numériques"
    >
      <section className="container ptb-70 services-page">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h2>Renforcez la résilience cybersécurité de votre entreprise</h2>
            
            <p>
              La transformation digitale s’accélère et offre de réelles opportunités de proposer des services à valeur ajoutée. Cependant, elle présente aussi de nombreuses menaces pour les entreprises avec l’ouverture des systèmes d’information vers de nouveaux partenaires.
            </p>

            <p>
              Abordez l’avenir des technologies en toute sérénité en maîtrisant les risques, dans un contexte où les cyberattaques et les fraudes internes sont de plus en plus nombreuses et ciblées.
            </p>

            <p>
              Avec une vision globale de la cybersécurité, <strong>ICS GROUPE</strong> met à votre disposition une équipe d’experts certifiés :
            </p>

            <ul className="list-check">
              <li>ISO 27001, ISO 27005</li>
              <li>CISM, CISSP</li>
              <li>Spécialistes en continuité d’activité (CBCP, CBCI, ISO 22301)</li>
              <li>Experts en investigation numérique (CCFP, CCE, CHFI, CFCE, GSFA, GSFE GIAC)</li>
            </ul>

            <p className="font-italic text-primary mt-4">
              « La résilience cybersécurité de nos clients est notre raison d’être ! »
            </p>
          </div>

          <div className="col-lg-6">
            <img 
              src="https://static.vecteezy.com/system/resources/previews/045/355/857/non_2x/cyber-security-icon-shield-with-padlock-icon-related-to-information-technology-flat-line-icon-style-technology-element-illustration-vector.jpg" 
              alt="Cybersécurité ICS GROUPE - Protection avancée des données" 
              className="img-fluid rounded shadow" 
            />
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
};

export default CyberService;