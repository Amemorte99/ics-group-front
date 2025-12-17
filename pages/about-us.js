import React, { Component } from 'react';
import Navbar from '../components/Layouts/Navbar';
import PageBannerContent from '../components/Common/PageBannerContent';
import AboutContent from '../components/AboutUs/AboutContent';
import TeamMember from '../components/AboutUs/TeamMember';
import PartnerContent from '../components/Common/PartnerContent';
import Footer from '../components/Layouts/Footer';
import Link from 'next/link';

class AboutUs extends Component {
    render() {
        return (
            <>
                <Navbar />

                <PageBannerContent 
                    pageTitle="À propos d'ICS GROUPE" 
                    pageCaption="Votre partenaire en transformation digitale et énergétique au Tchad"
                />

                <AboutContent />

                <TeamMember />

                <PartnerContent />

                {/* Section CTA personnalisée - plus adaptée que AppDownload ou AccountCreate */}
                <section className="cta-area ptb-70 bg-f8f8f8">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-8 col-md-8">
                                <h2>Prêt à lancer votre projet avec nous ?</h2>
                                <p>
                                    Que ce soit pour un audit cybersécurité, une installation solaire, un nouveau site web ou une formation, 
                                    notre équipe est à votre disposition pour vous accompagner dès aujourd’hui.
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-4 text-md-right text-center">
                                <Link href="/contact">
                                    <a className="btn btn-primary btn-lg">
                                        Nous contacter
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </>
        );
    }
}

export default AboutUs;