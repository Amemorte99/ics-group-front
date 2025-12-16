import React, { Component } from 'react';

class OurFeaturesContent extends Component {
    render() {
        return (
            <section className="features-area ptb-70 bg-f6f4f8">
                <div className="container">
                    <div className="section-title">
                        <h2>Nos Atouts & Expertises</h2>
                        <div className="bar"></div>
                        <p>ICS GROUPE met à votre service une expertise multisectorielle pour accompagner votre transformation digitale, sécuriser vos données et optimiser votre efficacité énergétique.</p>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-sm-6 col-md-6">
                            <div className="single-features-box">
                                <div className="icon">
                                    <i className="flaticon-settings"></i> {/* Icône design/tools */}
                                </div>

                                <h3>Design & Communication</h3>
                                <p>Supports visuels optimisés, positionnement marketing renforcé et contenus adaptés à votre public cible.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-md-6">
                            <div className="single-features-box">
                                <div className="icon bg-f78acb">
                                    <i className="flaticon-envelope-of-white-paper"></i> {/* Icône web/app */}
                                </div>

                                <h3>Développement Web & Mobile</h3>
                                <p>Sites web performants, applications mobiles et solutions digitales sur mesure pour votre présence en ligne.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-md-6">
                            <div className="single-features-box">
                                <div className="icon bg-cdf1d8">
                                    <i className="flaticon-menu"></i> {/* Icône cybersécurité */}
                                </div>

                                <h3>Cybersécurité Avancée</h3>
                                <p>Experts certifiés pour protéger vos données et renforcer la résilience face aux cybermenaces.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-md-6">
                            <div className="single-features-box">
                                <div className="icon bg-c679e3">
                                    <i className="flaticon-info"></i> {/* Icône énergie solaire */}
                                </div>

                                <h3>Énergies Renouvelables</h3>
                                <p>Solutions solaires complètes : installation, maintenance et optimisation énergétique respectueuse du budget.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-md-6">
                            <div className="single-features-box">
                                <div className="icon bg-eb6b3d">
                                    <i className="flaticon-cursor"></i> {/* Icône réseau */}
                                </div>

                                <h3>Réseaux & Télécoms</h3>
                                <p>Interconnexion fiable, maintenance infrastructures et conseil pour une connectivité performante.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-md-6">
                            <div className="single-features-box">
                                <div className="icon">
                                    <i className="flaticon-alarm"></i> {/* Icône base de données */}
                                </div>

                                <h3>Informatisation & Bases de Données</h3>
                                <p>Automatisation des systèmes d'information et gestion sécurisée de vos données pour plus d'efficacité.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default OurFeaturesContent;