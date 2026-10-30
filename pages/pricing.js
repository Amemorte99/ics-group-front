import SEO from '../components/SEO';
import React, { Component } from 'react';
import Navbar from '../components/Layouts/Navbar';
import PageBannerContent from '../components/Common/PageBannerContent';
import PricingCard from '../components/Pricing/PricingCard';
import AccountCreateArea from '../components/Common/AccountCreateArea';
import Footer from '../components/Layouts/Footer';

class Pricing extends Component {
    render() {
        return (
            <>
                <SEO path="/pricing" />
                <Navbar />

                <PageBannerContent 
                    pageTitle="Transparent Pricing" 
                    pageCaption="Borderless account pricing" 
                />

                <PricingCard />

                <AccountCreateArea />

                <Footer />
            </>
        );
    }
}

export default Pricing;