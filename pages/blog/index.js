import React from 'react';
import Navbar from '../../components/Layouts/Navbar';
import Footer from '../../components/Layouts/Footer';
import PageBannerContent from '../../components/Common/PageBannerContent';
import BlogContent from '../../components/blog/BlogContent';

const BlogPage = () => {
  return (
    <>
      <Navbar />

      <PageBannerContent 
        pageTitle="Notre Blog" 
        pageCaption="Découvrez nos derniers articles sur la cybersécurité, les solutions digitales et les bonnes pratiques pour protéger votre entreprise."
      />

      <BlogContent />

      <Footer />
    </>
  );
};

export default BlogPage;