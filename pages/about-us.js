import SEO from '../components/SEO';
import React, { Component } from 'react';
import Navbar from '../components/Layouts/Navbar';
import PageBannerContent from '../components/Common/PageBannerContent';
import AboutContent from '../components/AboutUs/AboutContent';
import TeamMember from '../components/AboutUs/TeamMember';
import PartnerContent from '../components/Common/PartnerContent';
import Footer from '../components/Layouts/Footer';
import Link from 'next/link';
import { I18nContext } from '../lib/i18n';

class AboutUs extends Component {
    static contextType = I18nContext;

    render() {
        const { tx } = this.context;
        return (
            <>
                <SEO path="/about-us" />
                <Navbar />

                <PageBannerContent 
                    pageTitle={{ fr: "À propos d'ICS GROUPE", en: 'About ICS GROUPE', ar: 'نبذة عن ICS GROUPE' }}
                    pageCaption={{ fr: 'Votre partenaire en transformation digitale et énergétique au Tchad', en: 'Your partner in digital and energy transformation in Chad', ar: 'شريككم في التحول الرقمي والطاقي في تشاد' }}
                />

                <AboutContent />

                <TeamMember />

                <PartnerContent />

                {/* Section CTA personnalisée - plus adaptée que AppDownload ou AccountCreate */}
                <section className="cta-area ptb-70 bg-f8f8f8">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-8 col-md-8">
                                <h2>{tx({ fr: 'Prêt à lancer votre projet avec nous ?', en: 'Ready to launch your project with us?', ar: 'هل أنتم مستعدون لإطلاق مشروعكم معنا؟' })}</h2>
                                <p>
                                    {tx({
                                        fr: 'Que ce soit pour un audit cybersécurité, une installation solaire, un nouveau site web ou une formation, notre équipe est à votre disposition pour vous accompagner dès aujourd’hui.',
                                        en: 'Whether it is a cybersecurity audit, a solar installation, a new website or training, our team is ready to support you today.',
                                        ar: 'سواء كان تدقيقًا للأمن السيبراني أو تركيبًا للطاقة الشمسية أو موقعًا جديدًا أو دورة تدريبية، فريقنا في خدمتكم اعتبارًا من اليوم.',
                                    })}
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-4 text-md-right text-center">
                                <Link href="/contact">
                                    <a className="btn btn-primary btn-lg">
                                        {tx({ fr: 'Nous contacter', en: 'Contact us', ar: 'تواصلوا معنا' })}
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </>
        );
    }
}

export default AboutUs;