import SEO from '../components/SEO';
import Link from 'next/link';
import Navbar from '../components/Layouts/Navbar';
import PageBannerContent from '../components/Common/PageBannerContent';
import AccountCreateArea from '../components/Common/AccountCreateArea';
import Footer from '../components/Layouts/Footer';
import { useI18n } from '../lib/i18n';
import { faq } from '../data/legal';

const Faq = () => {
  const { tx, t } = useI18n();

  return (
    <>
      <SEO path="/faq" />
      <Navbar />

      <PageBannerContent
        pageTitle={{ fr: 'Questions fréquentes', en: 'Frequently asked questions', ar: 'الأسئلة الشائعة' }}
        pageCaption={faq.intro}
      />

      <section className="ptb-70">
        <div className="container faq-wrapper">
          {faq.items.map((item, i) => (
            <details key={i} className="faq-item" open={i === 0}>
              <summary>{tx(item.q)}</summary>
              <p>{tx(item.a)}</p>
            </details>
          ))}

          <p className="faq-more">
            {tx({ fr: 'Vous ne trouvez pas votre réponse ?', en: "Can't find your answer?", ar: 'لم تجدوا إجابتكم؟' })}{' '}
            <Link href="/contact"><a>{t('common.contactUs')}</a></Link>
          </p>
        </div>
      </section>

      <AccountCreateArea />
      <Footer />

      <style jsx>{`
        .faq-wrapper { max-width: 860px; }
        .faq-item { border: 1px solid #e3ece5; border-radius: 12px; background: #fff; margin-bottom: 12px; padding: 0 20px; }
        .faq-item[open] { border-color: #49b96d; box-shadow: 0 6px 24px rgba(27, 94, 32, 0.07); }
        summary { cursor: pointer; padding: 18px 0; font-weight: 600; font-size: 17px; color: #1a1a2e; list-style-position: inside; }
        .faq-item p { margin: 0 0 18px; color: #4a4d5e; line-height: 1.7; }
        .faq-more { text-align: center; margin-top: 28px; color: #4a4d5e; }
        .faq-more a { color: #1b5e20; font-weight: 600; }
      `}</style>
    </>
  );
};

export default Faq;
