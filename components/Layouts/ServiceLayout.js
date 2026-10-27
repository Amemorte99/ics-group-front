import SEO from "../SEO";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageBannerContent from "../Common/PageBannerContent";

const ServiceLayout = ({ title, caption, children }) => {
  return (
    <>
      <SEO
        title={title}
        description={caption}
        breadcrumb={[{ name: 'Services', path: '/services' }, { name: title }]}
      />
      <Navbar />

      <PageBannerContent
        pageTitle={title}
        pageCaption={caption}
      />

      {children}

      <Footer />
    </>
  );
};

export default ServiceLayout;
