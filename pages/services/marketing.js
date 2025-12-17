import ServiceLayout from "../../components/Layouts/ServiceLayout";

const MarketingService = () => {
  return (
    <ServiceLayout
      title="Marketing digital"
      caption="Stratégies digitales pour booster votre visibilité"
    >
      <section className="container ptb-70">
        <h2>Nos services de marketing digital</h2>
        <p>
          SEO, publicité en ligne, réseaux sociaux, branding digital.
        </p>
      </section>
    </ServiceLayout>
  );
};

export default MarketingService;
