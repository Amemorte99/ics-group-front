import React, { Component } from 'react';
import Link from 'next/link';

class FeaturedCard extends Component {
    render() {
        return (
            <div className="featured-boxes-area">
                <div className="container">
                    <div className="featured-boxes-inner">
                        <div className="row m-0">

                            {/* 02. Design Graphique et Communication */}
                            <div className="col-lg-3 col-sm-6 col-md-6 p-0">
                                <div className="single-featured-box">
                                    <div className="icon color-fb7756">
                                        <i className="flaticon-piggy-bank"></i>
                                    </div>
                                    <h3>Design Graphique & Communication</h3>
                                    <p>Conception de supports visuels optimisés, design graphique et renforcement de votre positionnement marketing.</p>
                                    <Link href="/services/design-graphique">
                                        <a className="read-more-btn">En savoir plus</a>
                                    </Link>
                                </div>
                            </div>

                            {/* 03. Site Web & Apps Mobiles */}
                            <div className="col-lg-3 col-sm-6 col-md-6 p-0">
                                <div className="single-featured-box">
                                    <div className="icon color-facd60">
                                        <i className="flaticon-data-encryption"></i>
                                    </div>
                                    <h3>Site Web & Applications Mobiles</h3>
                                    <p>Création de sites web, applications mobiles, informatisation des systèmes et gestion de bases de données.</p>
                                    <Link href="/services/web-apps">
                                        <a className="read-more-btn">En savoir plus</a>
                                    </Link>
                                </div>
                            </div>

                            {/* 04. Cybersécurité */}
                            <div className="col-lg-3 col-sm-6 col-md-6 p-0">
                                <div className="single-featured-box">
                                    <div className="icon color-1ac0c6">
                                        <i className="flaticon-wallet"></i>
                                    </div>
                                    <h3>Cybersécurité</h3>
                                    <p>Renforcement de la résilience face aux cybermenaces avec des experts certifiés et solutions innovantes.</p>
                                    <Link href="/services/cybersecurite">
                                        <a className="read-more-btn">En savoir plus</a>
                                    </Link>
                                </div>
                            </div>

                            {/* 05. Énergies Renouvelables */}
                            <div className="col-lg-3 col-sm-6 col-md-6 p-0">
                                <div className="single-featured-box">
                                    <div className="icon">
                                        <i className="flaticon-shield"></i>
                                    </div>
                                    <h3>Énergies Renouvelables</h3>
                                    <p>Solutions solaires complètes : vente, installation, maintenance et optimisation énergétique sur mesure.</p>
                                    <Link href="/services/energies-renouvelables">
                                        <a className="read-more-btn">En savoir plus</a>
                                    </Link>
                                </div>
                            </div>

                            {/* 06. Réseaux et Télécommunications
                            <div className="col-lg-3 col-sm-6 col-md-6 p-0">
                                <div className="single-featured-box">
                                    <div className="icon color-fb7756">
                                        <i className="flaticon-piggy-bank"></i>
                                    </div>
                                    <h3>Réseaux & Télécommunications</h3>
                                    <p>Interconnexion de sites, maintenance d'infrastructures et conseil pour des réseaux performants.</p>
                                    <Link href="/services/reseaux-telecom">
                                        <a className="read-more-btn">En savoir plus</a>
                                    </Link>
                                </div>
                            </div> */}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FeaturedCard;