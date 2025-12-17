import Navbar from "./Navbar";
import Footer from "./Footer";
import PageBannerContent from "../Common/PageBannerContent";

const ServiceLayout = ({ title, caption, children }) => {
  return (
    <>
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
