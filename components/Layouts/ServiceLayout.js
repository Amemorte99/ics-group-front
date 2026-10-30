import { useRouter } from "next/router";
import SEO from "../SEO";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageBannerContent from "../Common/PageBannerContent";
import { PAGE_SEO } from "../../lib/seoPages";

// title/caption (français) servent de repli ; les textes des trois langues viennent de lib/seoPages.js.
const ServiceLayout = ({ title, caption, children }) => {
  const router = useRouter();
  const copy = PAGE_SEO[router.pathname] || {};

  return (
    <>
      <SEO breadcrumb={[{ name: PAGE_SEO["/services"].heading, path: "/services" }, { name: copy.heading || title }]} />
      <Navbar />

      <PageBannerContent
        pageTitle={copy.heading || title}
        pageCaption={copy.caption || caption}
      />

      {children}

      <Footer />
    </>
  );
};

export default ServiceLayout;
