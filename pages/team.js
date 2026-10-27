import SEO from '../components/SEO';
import React, { Component } from 'react';
import Navbar from '../components/Layouts/Navbar';
import PageBannerContent from '../components/Common/PageBannerContent';
import TeamMemberContent from '../components/Team/TeamMemberContent';
import AccountCreateArea from '../components/Common/AccountCreateArea';
import Footer from '../components/Layouts/Footer';

class Team extends Component {
    render() {
        return (
            <>
                <SEO title="Notre équipe" description="Rencontrez les experts d'ICS GROUPE en cybersécurité, énergies renouvelables, développement et réseaux." path="/team" />
                <Navbar />

                <PageBannerContent 
                    pageTitle="Team" 
                    pageCaption="Meet our expert team" 
                />

                <TeamMemberContent />

                <AccountCreateArea />

                <Footer />
            </>
        );
    }
}

export default Team;