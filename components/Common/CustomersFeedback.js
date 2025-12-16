import React, { Component } from 'react';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
    items: 1,
    loop: true,
    nav: true,
    dots: false,
    autoplayHoverPause: true,
    autoplay: true,
    margin: 0,
    navText: [
        "<i class='fas fa-chevron-left'></i>",
        "<i class='fas fa-chevron-right'></i>"
    ],
}

class CustomersFeedback extends Component {

    _isMounted = false;
    state = {
        display: false
    }

    componentDidMount() { 
        this._isMounted = true;
        this.setState({ display: true }) 
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <section className="feedback-area ptb-70 bg-f7fafd">
                <div className="container">
                    <div className="section-title">
                        <h2>Ce que nos clients disent de nous</h2>
                        <div className="bar"></div>
                        <p>La satisfaction de nos clients est au cœur de notre démarche. Découvrez les retours d’expérience de ceux qui nous ont fait confiance pour leurs projets en design, développement digital, cybersécurité, énergies renouvelables et réseaux télécoms.</p>
                    </div>

                    {this.state.display ? <OwlCarousel 
                        className="feedback-slides owl-carousel owl-theme"
                        {...options}
                    > 
                        <div className="item">
                            <div className="single-feedback">
                                <i className="fas fa-quote-left quote-icon"></i>
                                <p>
                                    <q>ICS GROUPE a su parfaitement comprendre nos besoins en communication visuelle. Les supports conçus ont boosté notre image de marque et nos argumentaires commerciaux font désormais la différence sur le terrain. Une équipe à l'écoute et très professionnelle !</q>
                                </p>

                                <div className="client-img">
                                    <img src="/images/clients/client1.jpg" alt="image" />
                                    <h3>Marie Dupont</h3>
                                    <span>Directrice Marketing</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="item">
                            <div className="single-feedback">
                                <i className="fas fa-quote-left quote-icon"></i>
                                <p>
                                    <q>Grâce à ICS GROUPE, notre site web et notre application mobile sont enfin modernes et performants. L’informatisation de nos systèmes nous fait gagner un temps précieux au quotidien. Je recommande vivement !</q>
                                </p>

                                <div className="client-img">
                                    <img src="/images/clients/client2.jpg" alt="image" />
                                    <h3>Pierre Martin</h3>
                                    <span>PDG d’une PME</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="item">
                            <div className="single-feedback">
                                <i className="fas fa-quote-left quote-icon"></i>
                                <p>
                                    <q>L’équipe cybersécurité d’ICS GROUPE nous a accompagnés dans l’audit et le renforcement de nos infrastructures. Nous abordons désormais la transformation digitale en toute sérénité. Expertise et réactivité au top !</q>
                                </p>

                                <div className="client-img">
                                    <img src="/images/clients/client3.jpg" alt="image" />
                                    <h3>Sophie Bernard</h3>
                                    <span>Responsable IT</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="item">
                            <div className="single-feedback">
                                <i className="fas fa-quote-left quote-icon"></i>
                                <p>
                                    <q>Installation complète de panneaux solaires avec un suivi personnalisé et un respect total du budget. Notre consommation énergétique a fortement baissé et l’équipe reste disponible pour la maintenance. Excellent service !</q>
                                </p>

                                <div className="client-img">
                                    <img src="/images/clients/client4.jpg" alt="image" />
                                    <h3>Thomas Leclerc</h3>
                                    <span>Propriétaire d’entreprise</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="item">
                            <div className="single-feedback">
                                <i className="fas fa-quote-left quote-icon"></i>
                                <p>
                                    <q>ICS GROUPE a interconnecté nos différents sites avec une liaison fiable et optimisé toute notre infrastructure réseau. La connectivité est enfin stable et performante. Un vrai partenaire de confiance.</q>
                                </p>

                                <div className="client-img">
                                    <img src="/images/clients/client5.jpg" alt="image" />
                                    <h3>Lucas Moreau</h3>
                                    <span>Administrateur Réseau</span>
                                </div>
                            </div>
                        </div>
                    </OwlCarousel> : ''}
                </div>
            </section>
        );
    }
}

export default CustomersFeedback;