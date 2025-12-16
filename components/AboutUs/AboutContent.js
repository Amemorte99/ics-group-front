import React, { Component } from 'react';
import dynamic from 'next/dynamic';
const ModalVideo = dynamic(() => import('react-modal-video'), {
    ssr: false
});

class AboutContent extends Component {

    state = {
        isOpen: false,
    }

    openModal = () => {
        this.setState({ isOpen: true });
    }

    render() {
        return (
            <div className="about-area ptb-70">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="about-content">
                                <span>Notre histoire et notre mission</span>
                                <h2>ICS GROUPE : Votre partenaire en transformation digitale et énergétique</h2>
                                <p>Basé à N'Djamena au Tchad, ICS GROUPE accompagne les entreprises et les particuliers dans leurs projets numériques et énergétiques avec des solutions innovantes, sécurisées et durables.</p>
                                <p>Nos domaines d’expertise incluent la cybersécurité (avec des experts certifiés ISO 27001, CISSP, etc.), les énergies renouvelables (systèmes solaires complets : panneaux, batteries, onduleurs…), les réseaux & télécommunications, l’analyse de données, ainsi que le consulting et les formations spécialisées avec transfert de compétences.</p>
                                <p>Nous étudions vos besoins dès le départ pour vous proposer des solutions rapides, adaptées à votre budget et respectueuses de l’environnement. Notre objectif : maximiser votre retour sur investissement tout en réduisant votre empreinte écologique.</p>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <div className="about-image">
                                <img 
                                    src="https://static.vecteezy.com/system/resources/previews/033/836/684/non_2x/digital-transformation-and-technological-revolution-concept-businessman-use-magnifying-search-missing-puzzle-and-surrounding-with-digital-icon-flat-modern-illustration-vector.jpg" 
                                    alt="ICS GROUPE - Transformation digitale et énergétique" 
                                />

                                <div
                                    onClick={(e) => { e.preventDefault(); this.openModal(); }}
                                    className="video-btn"
                                > 
                                    <i className="fas fa-play"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Changez l'ID de la vidéo YouTube quand vous aurez votre vidéo de présentation */}
                    {this.state.isOpen && (
                        <ModalVideo 
                            channel='youtube' 
                            isOpen={this.state.isOpen} 
                            videoId='szuchBiLrEM'  // À remplacer par votre vidéo
                            onClose={() => this.setState({ isOpen: false })} 
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default AboutContent;