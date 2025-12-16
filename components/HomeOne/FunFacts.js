import React, { Component } from 'react';
import Link from 'next/link';

class FunFacts extends Component {
    render() {
        return (
            <section className="funfacts-area ptb-70 pt-0">
                <div className="container">
                    <div className="section-title">
                        <h2>Nous nous efforçons toujours de comprendre les attentes de nos clients</h2>
                        <div className="bar"></div>
                        <p>Chez ICS GROUPE, la satisfaction client est notre priorité. Nous mettons tout en œuvre pour proposer des solutions innovantes, sécurisées et parfaitement adaptées à vos besoins en transformation digitale, cybersécurité et énergies renouvelables.</p>
                    </div>

                    <div className="row">
                        <div className="col-lg-3 col-sm-3 col-md-3 col-6">
                            <div className="funfact">
                                <h3><span>180</span>K</h3>
                                <p>Downloaded</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-3 col-md-3 col-6">
                            <div className="funfact">
                                <h3><span>20</span>K</h3>
                                <p>Feedback</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-3 col-md-3 col-6">
                            <div className="funfact">
                                <h3><span>500</span>+</h3>
                                <p>Workers</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-3 col-md-3 col-6">
                            <div className="funfact">
                                <h3><span>70</span>+</h3>
                                <p>Contributors</p>
                            </div>
                        </div>
                    </div>

                    <div className="contact-cta-box">
                        <h3>Des questions à nous poser ?</h3>
                        <p>N’hésitez pas à nous contacter</p>

                        <Link href="/contact">
                            <a className="btn btn-primary">Nous Contacter</a>
                        </Link>
                    </div>

                    <div className="map-bg">
                        <img src="/images/map.png" alt="map" />
                    </div>
                </div>
            </section>
        );
    }
}

export default FunFacts;