import React from 'react';
import Navbar from '../../components/Layouts/Navbar';
import Footer from '../../components/Layouts/Footer';
import PageBannerContent from '../../components/Common/PageBannerContent';
import PortfolioContent from '../../components/portfolio/PortfolioContent';

const PortfolioPage = () => {
  return (
    <>
      <Navbar />

      <PageBannerContent 
        pageTitle="Notre Portfolio" 
        pageCaption="Découvrez une sélection de nos réalisations récentes. Chaque projet témoigne de notre expertise, de notre engagement et de la satisfaction de nos clients à travers le Tchad et au-delà."
      />

      <PortfolioContent />

      <Footer />
    </>
  );
};

export default PortfolioPage;

