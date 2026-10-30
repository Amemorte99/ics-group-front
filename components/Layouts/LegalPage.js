import React from 'react';
import SEO from '../SEO';
import Navbar from './Navbar';
import Footer from './Footer';
import PageBannerContent from '../Common/PageBannerContent';
import { useI18n } from '../../lib/i18n';

// Page de texte (politique de confidentialité, conditions d'utilisation) à partir de data/legal.js.
const LegalPage = ({ path, title, caption, content }) => {
  const { tx } = useI18n();

  return (
    <>
      <SEO path={path} />
      <Navbar />
      <PageBannerContent pageTitle={title} pageCaption={caption} />

      <div className="ptb-70">
        <div className="container">
          <div className="main-text-content">
            <p><em>{tx(content.updated)}</em></p>
            <p>{tx(content.intro)}</p>

            {content.sections.map((section, i) => (
              <section key={i}>
                <h3>{i + 1}. {tx(section.title)}</h3>
                {(section.paragraphs || []).map((p, j) => (
                  <p key={j}>{tx(p)}</p>
                ))}
                {section.items && (
                  <ul>
                    {section.items.map((item, j) => (
                      <li key={j}>{tx(item)}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LegalPage;
