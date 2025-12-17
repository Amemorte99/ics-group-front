import React, { Component } from 'react';
import Link from 'next/link';

class Footer extends Component {
    render() {
        let currentYear = new Date().getFullYear();
        return (
            <footer className="footer-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-footer-widget">
                                <div className="logo">
                                    <Link href="/">
                                <a><img src="/images/logo-primary.png" alt="logo" style={{width:'150px', height:'100%',}}/></a>
                                    </Link>
                                    <p>ICS GROUPE accompagne les entreprises et particuliers dans leurs projets de transformation digitale, cybersécurité, énergies renouvelables, réseaux & télécommunications, analyse de données et consulting. Des solutions innovantes, sécurisées et durables, adaptées à vos besoins et à votre budget.</p>
                                </div>
                                
                                <ul className="social-links">
                                    <li>
                                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-instagram"></i>
                                        </a> 
                                    </li>
                                    <li> 
                                        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-linkedin-in"></i>
                                        </a> 
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-footer-widget pl-5">
                                <h3>Entreprise</h3>
                                
                                <ul className="list">
                                    <li>
                                        <Link href="/about-us">
                                            <a>À propos</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/services">
                                            <a>Nos Services</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/features">
                                            <a>Nos Atouts</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/blog">
                                            <a>Actualités</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">
                                            <a>Nous Contacter</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-footer-widget">
                                <h3>Support</h3>
                                
                                <ul className="list">
                                    <li>
                                        <Link href="/faq">
                                            <a>FAQ</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/privacy-policy">
                                            <a>Politique de confidentialité</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/terms-condition">
                                            <a>Conditions générales</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/formations">
                                            <a>Formations</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">
                                            <a>Contact</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-footer-widget">
                                <h3>Adresse</h3>
                                
                                <ul className="footer-contact-info">
                                    <li>
                                        <span className="mr-1">Siège :</span> 
                                        Rue de Corniche, Sabangali, <br /> N'Djamena, Tchad
                                    </li>
                                    <li>
                                        <span className="mr-1">Email :</span> 
                                        info@icsgroupe.com
                                    </li>
                                    <li>
                                        <span className="mr-1">Téléphone :</span> 
                                        +235 64 78 88 31
                                    </li>
                                    <li>
                                        <span className="mr-1">Site web :</span> 
                                        www.icsgroupe.com
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="copyright-area">
                        <p>© {currentYear} ICS GROUPE - Tous droits réservés</p>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;