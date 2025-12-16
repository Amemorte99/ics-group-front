import React, { Component } from 'react';

class ContactInfoContent extends Component {
    render() {
        return (
            <div className="contact-info">
                <ul>
                    <li>
                        <div className="icon">
                            <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <span>Adresse</span>
                        Rue de Corniche, Sabangali,<br />
                        N'Djamena, Tchad
                    </li>

                    <li>
                        <div className="icon">
                            <i className="fas fa-envelope"></i>
                        </div>
                        <span>Email</span> 
                        <a href="mailto:info@icsgroupe.com">info@icsgroupe.com</a>  
                    </li>

                    <li>
                        <div className="icon">
                            <i className="fas fa-phone-volume"></i>
                        </div>
                        <span>Téléphone</span> 
                        <a href="tel:+23564788831">+235 64 78 88 31</a>
                    </li>

                    <li>
                        <div className="icon">
                            <i className="fas fa-globe"></i>
                        </div>
                        <span>Site web</span> 
                        <a href="https://www.icsgroupe.com" target="_blank" rel="noopener noreferrer">
                            www.icsgroupe.com
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default ContactInfoContent;