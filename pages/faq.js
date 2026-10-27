import SEO from '../components/SEO';
import React, { Component } from 'react';
import Navbar from '../components/Layouts/Navbar';
import PageBannerContent from '../components/Common/PageBannerContent';
import FaqContentArea from '../components/Faq/FaqContentArea';
import AccountCreateArea from '../components/Common/AccountCreateArea';
import Footer from '../components/Layouts/Footer';

class Faq extends Component {
    render() {
        return (
            <>
                <SEO title="Questions fréquentes" description="Réponses aux questions fréquentes sur les services d'ICS GROUPE : cybersécurité, énergie solaire, développement web, délais et accompagnement." path="/faq" />
                <Navbar />

                <PageBannerContent 
                    pageTitle="FAQ" 
                    pageCaption="Frequently Asked Questions" 
                />

                <FaqContentArea />

                <AccountCreateArea />

                <Footer />
            </>
        );
    }
}

export default Faq;