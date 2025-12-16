import React, { Component } from 'react';
import Link from 'next/link';

class AppDownloadContent extends Component {
    render() {
        return (
            <div className="app-download-area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="app-image">
                                <div className="main-image">
                                    <img src="/images/mobile-app1.png" className="wow fadeInLeft" data-wow-delay="0.6s" alt="Application mobile ICS GROUPE" />
                                    <img src="/images/mobile-app2.png" className="wow fadeInUp" data-wow-delay="0.9s" alt="Interface app ICS GROUPE" />
                                </div>

                                <div className="main-mobile-image">
                                    <img src="/images/main-mobile.png" className="wow fadeInUp" data-wow-delay="0.6s" alt="Application mobile ICS GROUPE" />
                                </div>

                                <div className="circle-img">
                                    <img src="/images/circle.png" alt="décoratif" />
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <div className="app-download-content">
                                <h2>Une application mobile pour gérer tous vos projets avec ICS GROUPE</h2>
                                <div className="bar"></div>
                                <p>Suivez en temps réel vos installations solaires, consultez vos audits cybersécurité, gérez vos réseaux et accédez à vos analyses de données où que vous soyez.</p>

                                <p>Notre application vous permet de rester connecté à vos projets, recevoir des alertes, demander une intervention ou consulter vos rapports en toute simplicité et sécurité.</p>

                                <div className="btn-box">
                                    <a href="https://www.apple.com/app-store/" className="app-store-btn" target="_blank" rel="noopener noreferrer">
                                        <i className="flaticon-apple"></i>
                                        Télécharger sur
                                        <span>App Store</span>
                                    </a>

                                    <a href="https://play.google.com/store/apps" className="play-store-btn" target="_blank" rel="noopener noreferrer">
                                        <i className="flaticon-play-store"></i>
                                        Télécharger sur
                                        <span>Google Play</span>
                                    </a> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AppDownloadContent;