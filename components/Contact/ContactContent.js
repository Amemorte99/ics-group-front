import React, { Component } from 'react';
import ContactInfoContent from './ContactInfoContent';
import ContactForm from './ContactForm';

class ContactContent extends Component {
    render() {
        return (
            <>
                <div className="contact-area ptb-70">
                    <div className="container">
                        <div className="section-title">
                            <h2>Contactez-nous pour tout renseignement ou devis</h2>
                            <div className="bar"></div>
                            <p>Que ce soit pour un projet en cybersécurité, énergies renouvelables, réseaux & télécommunications, analyse de données ou une formation, notre équipe est à votre écoute. N’hésitez pas à nous écrire !</p>
                        </div>
                        <div className="row">
                            <div className="col-lg-5 col-md-12">
                                <ContactInfoContent />
                            </div>
                            <div className="col-lg-7 col-md-12">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                   
                    <div className="bg-map">
                        <img src="/images/bg-map.png" alt="Carte" />
                    </div>
                </div>
            </>
        );
    }
}

export default ContactContent;