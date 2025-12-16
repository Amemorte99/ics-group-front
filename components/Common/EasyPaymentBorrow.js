import React, { Component } from 'react';
import Link from 'next/link';

class EasyPaymentBorrow extends Component {
    render() {
        return (
            <section className="invoicing-area ptb-70">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="invoicing-content">
                                <h2>Votre partenaire pour une transformation digitale et énergétique réussie</h2>
                                <div className="bar"></div>
                                <p>ICS GROUPE vous accompagne avec des solutions innovantes en cybersécurité, énergies renouvelables, réseaux & télécommunications, analyse de données et consulting sur mesure.</p>
                                <p>De l’étude de vos besoins à la mise en œuvre et la maintenance, notre équipe d’experts certifiés assure une transition fluide, sécurisée et rentable, tout en respectant votre budget et vos objectifs écologiques.</p>

                     ß           <Link href="/contact">
                                    <a className="btn btn-primary">Nous Contacter</a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <div className="invoicing-image">
                                <div className="main-image">
                                    <img 
                                        src="/images/invoicing/invoicing-shape1.png" 
                                        className="animate__animated animate__zoomIn animate__delay-0.7s" 
                                        alt="image" 
                                    />
                                     
                                    <img 
                                        src="/images/invoicing/invoicing-shape2.png" 
                                        className="animate__animated animate__fadeInLeft animate__delay-0.1s" 
                                        alt="image" 
                                    />
                                   
                                    <img 
                                        src="/images/invoicing/invoicing-shape3.png" 
                                        className="animate__animated animate__fadeInLeft animate__delay-0.2s" 
                                        alt="image" 
                                    />
                                
                                    <img 
                                        src="/images/invoicing/invoicing-shape4.png" 
                                        className="animate__animated animate__fadeInRight animate__delay-1s" 
                                        alt="image" 
                                    />
                                </div>

                                <div className="main-mobile-image">
                                    <img 
                                        src="/images/invoicing/invoicing-main-pic.png" 
                                        className="animate__animated animate__zoomIn animate__delay-0.7s" 
                                        alt="image" 
                                    />
                                </div>

                                <div className="circle-image">
                                    <img src="/images/invoicing/invoicing-circle1.png" alt="image" />
                                    <img src="/images/invoicing/invoicing-circle2.png" alt="image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default EasyPaymentBorrow;