import React, { Component } from 'react';
import Navbar from '../components/Layouts/Navbar';
import PageBannerContent from '../components/Common/PageBannerContent';
import ContactContent from '../components/Contact/ContactContent';
import Footer from '../components/Layouts/Footer';
import Link from 'next/link';

class Contact extends Component {
    render() {
        return (
            <>
                <Navbar />

                <PageBannerContent 
                    pageTitle="Contactez-nous" 
                    pageCaption="Besoin d’un devis, d’un conseil ou d’informations ? Nous sommes à votre écoute." 
                />

                <ContactContent />

                {/* Section CTA douce pour renforcer l'appel à l'action */}
                <section className="cta-contact-area ptb-80 bg-f8f8f8">
                    <div className="container">
                        <div className="text-center my-5">
                            <h2>Prêt à démarrer votre projet ?</h2>
                            <p className="lead mt-3 mb-4">
                                Que ce soit pour une installation solaire, un audit cybersécurité, un nouveau site web ou une formation, 
                                notre équipe vous répond dans les plus brefs délais.
                            </p>
                            <Link href="/contact">
                                <a className="btn btn-primary btn-lg ">
                                    Envoyer un message
                                </a>
                            </Link>
                        </div>
                    </div>
                </section>

                <Footer />
            </>
        );
    }
}

export default Contact;