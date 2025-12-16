import React, { Component } from 'react';

class ServicesCard extends Component {
    render() {
        return (
            <>
                {/* 02. Design Graphique & Communication - Image à droite */}
                <div className="services-area ptb-70">
                    <div className="container-fluid p-0">
                        <div className="overview-box">
                            <div className="overview-content">
                                <div className="content left-content">
                                    <h2>Design Graphique & Communication</h2>
                                    <div className="bar"></div>
                                    <p>ICS GROUPE vous accompagne dans la conception de supports de communication optimisés, conformes aux normes marketing, avec des contenus visuels et textuels sur mesure pour renforcer votre image de marque et vos argumentaires commerciaux.</p>

                                    <ul className="services-list">
                                        <li><span><i className="flaticon-check-mark"></i> Création de logos & identités visuelles</span></li>
                                        <li><span><i className="flaticon-check-mark"></i> Supports print & digitaux (flyers, brochures, bannières)</span></li>
                                        <li><span><i className="flaticon-check-mark"></i> Optimisation du positionnement marketing</span></li>
                                        <li><span><i className="flaticon-check-mark"></i> Contenus adaptés à votre public cible</span></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="overview-image">
                                <div className="image">
                                    <img src="https://blog.tubikstudio.com/wp-content/uploads/2018/02/design_party_graphic_design_tubik.png" alt="Design Graphique & Communication" />
                                    <div className="circle-img">
                                        <img src="/images/circle.png" alt="décoratif" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 03. Site Web & Applications Mobiles - Image à gauche */}
                <div className="services-area ptb-70 bg-f7fafd">
                    <div className="container-fluid p-0">
                        <div className="overview-box">
                            <div className="overview-image">
                                <div className="image">
                                    <img src="https://static.vecteezy.com/system/resources/previews/005/877/690/non_2x/app-development-modern-flat-concept-for-web-banner-design-male-designer-works-with-mobile-application-at-laptop-coding-and-making-interface-layout-illustration-with-isolated-people-scene-vector.jpg" alt="Site Web & Apps Mobiles" />
                                    <div className="circle-img">
                                        <img src="/images/circle.png" alt="décoratif" />
                                    </div>
                                </div>
                            </div>

                            <div className="overview-content">
                                <div className="content">
                                    <h2>Site Web & Applications Mobiles</h2>
                                    <div className="bar"></div>
                                    <p>Nous développons des solutions digitales performantes : sites web responsive, applications mobiles natives ou hybrides, informatisation des systèmes d’information et gestion de bases de données.</p>

                                    <ul className="services-list">
                                        <li><span><i className="flaticon-check-mark"></i> Création de sites web sur mesure</span></li>
                                        <li><span><i className="flaticon-check-mark"></i> Développement d’applications mobiles</span></li>
                                        <li><span><i className="flaticon-check-mark"></i> Informatisation & automatisation</span></li>
                                        <li><span><i className="flaticon-check-mark"></i> Conception et gestion de bases de données</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 04. Cybersécurité - Image à droite */}
                <div className="services-area ptb-70">
                    <div className="container-fluid p-0">
                        <div className="overview-box">
                            <div className="overview-content">
                                <div className="content left-content">
                                    <h2>Cybersécurité</h2>
                                    <div className="bar"></div>
                                    <p>Renforcez la résilience de vos systèmes face aux cybermenaces grâce à nos experts certifiés (ISO 27001, CISSP, etc.) qui accompagnent, conseillent et déploient des solutions innovantes.</p>

                                    <ul className="services-list">
                                        <li><span><i className="flaticon-check-mark"></i> Audit & conseil en sécurité</span></li>
                                        <li><span><i className="flaticon-check-mark"></i> Déploiement de solutions de protection</span></li>
                                        <li><span><i className="flaticon-check-mark"></i> Continuité d’activité & investigation numérique</span></li>
                                        <li><span><i className="flaticon-check-mark"></i> Maîtrise des risques dans la transformation digitale</span></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="overview-image">
                                <div className="image">
                                    <img src="https://static.vecteezy.com/system/resources/previews/033/529/098/non_2x/cyber-security-icon-shield-with-padlock-and-network-icon-related-to-device-protect-computer-technology-flat-line-icon-style-simple-design-editable-vector.jpg" alt="Cybersécurité" />
                                    <div className="circle-img">
                                        <img src="/images/circle.png" alt="décoratif" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 05. Énergies Renouvelables - Image à gauche */}
                <div className="services-area ptb-70 bg-f7fafd">
                    <div className="container-fluid p-0">
                        <div className="overview-box">
                            <div className="overview-image">
                                <div className="image">
                                    <img src="https://static.vecteezy.com/system/resources/previews/005/389/923/non_2x/renewable-energy-sources-with-solar-panels-installed-in-the-field-the-concept-of-alternative-clean-energy-flat-illustration-vector.jpg" alt="Énergies Renouvelables" />
                                    <div className="circle-img">
                                        <img src="/images/circle.png" alt="décoratif" />
                                    </div>
                                </div>
                            </div>

                            <div className="overview-content">
                                <div className="content">
                                    <h2>Énergies Renouvelables</h2>
                                    <div className="bar"></div>
                                    <p>De l’étude à la maintenance, nous proposons des solutions solaires complètes adaptées à votre budget pour optimiser votre consommation et réduire votre empreinte écologique.</p>

                                    <ul className="services-list">
                                        <li><span><i className="flaticon-check-mark"></i> Vente & installation de panneaux solaires</span></li>
                                        <li><span><i className="flaticon-check-mark"></i> Batteries, onduleurs, régulateurs & accessoires</span></li>
                                        <li><span><i className="flaticon-check-mark"></i> Étude personnalisée & suivi</span></li>
                                        <li><span><i className="flaticon-check-mark"></i> Maintenance & formation</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 06. Réseaux & Télécommunications - Image à droite */}
                <div className="services-area ptb-70">
                    <div className="container-fluid p-0">
                        <div className="overview-box">
                            <div className="overview-content">
                                <div className="content left-content">
                                    <h2>Réseaux & Télécommunications</h2>
                                    <div className="bar"></div>
                                    <p>Nous concevons, déployons et maintenons des infrastructures réseaux fiables : interconnexion de sites, support FAI et conseil expert pour une connectivité optimale.</p>

                                    <ul className="services-list">
                                        <li><span><i className="flaticon-check-mark"></i> Interconnexion multisites</span></li>
                                        <li><span><i className="flaticon-check-mark"></i> Maintenance infrastructures internet</span></li>
                                        <li><span><i className="flaticon-check-mark"></i> Conseil & optimisation réseaux</span></li>
                                        <li><span><i className="flaticon-check-mark"></i> Solutions télécom sur mesure</span></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="overview-image">
                                <div className="image">
                                    <img src="https://media.istockphoto.com/id/2149328154/vector/lan-network-3d-diagram.jpg?s=612x612&w=0&k=20&c=0sWs7plVl8iAwxR1eNJVwWEROHpmzkNcM3BuGg4nQOg=" alt="Réseaux & Télécommunications" />
                                    <div className="circle-img">
                                        <img src="/images/circle.png" alt="décoratif" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ServicesCard;