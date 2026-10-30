import React, { Component } from 'react';
import { I18nContext } from '../../lib/i18n';
import dynamic from 'next/dynamic';
const ModalVideo = dynamic(() => import('react-modal-video'), {
    ssr: false
});

class AboutContent extends Component {
    static contextType = I18nContext;

    state = {
        isOpen: false,
    }

    openModal = () => {
        this.setState({ isOpen: true });
    }

    render() {
        const { tx } = this.context;
        return (
            <div className="about-area ptb-70">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="about-content">
                                <span>{tx({ fr: 'Notre histoire et notre mission', en: 'Our story and mission', ar: 'قصتنا ومهمتنا' })}</span>
                                <h2>{tx({ fr: 'ICS GROUPE : Votre partenaire en transformation digitale et énergétique', en: 'ICS GROUPE: your partner in digital and energy transformation', ar: 'ICS GROUPE: شريككم في التحول الرقمي والطاقي' })}</h2>
                                <p>{tx({ fr: "Basé à N'Djamena au Tchad, ICS GROUPE accompagne les entreprises et les particuliers dans leurs projets numériques et énergétiques avec des solutions innovantes, sécurisées et durables.", en: "Based in N'Djamena, Chad, ICS GROUPE supports businesses and individuals in their digital and energy projects with innovative, secure and sustainable solutions.", ar: 'مقرها إنجامينا في تشاد، ترافق ICS GROUPE الشركات والأفراد في مشاريعهم الرقمية والطاقية بحلول مبتكرة وآمنة ومستدامة.' })}</p>
                                <p>{tx({ fr: 'Nos domaines d’expertise incluent la cybersécurité (avec des experts certifiés ISO 27001, CISSP, etc.), les énergies renouvelables (systèmes solaires complets : panneaux, batteries, onduleurs…), les réseaux & télécommunications, l’analyse de données, ainsi que le consulting et les formations spécialisées avec transfert de compétences.', en: 'Our areas of expertise include cybersecurity (with certified experts in ISO 27001, CISSP, etc.), renewable energy (complete solar systems: panels, batteries, inverters…), networks & telecommunications, data analysis, as well as consulting and specialized training with skills transfer.', ar: 'تشمل مجالات خبرتنا الأمن السيبراني (بخبراء معتمدين في ISO 27001 وCISSP وغيرها) والطاقات المتجددة (أنظمة شمسية متكاملة: ألواح وبطاريات ومحوّلات…) والشبكات والاتصالات وتحليل البيانات، إضافة إلى الاستشارات والدورات المتخصصة مع نقل المهارات.' })}</p>
                                <p>{tx({ fr: 'Nous étudions vos besoins dès le départ pour vous proposer des solutions rapides, adaptées à votre budget et respectueuses de l’environnement. Notre objectif : maximiser votre retour sur investissement tout en réduisant votre empreinte écologique.', en: 'We study your needs from the start to offer fast solutions that fit your budget and respect the environment. Our goal: maximize your return on investment while reducing your environmental footprint.', ar: 'ندرس احتياجاتكم منذ البداية لنقترح حلولًا سريعة تناسب ميزانيتكم وتحترم البيئة. هدفنا: تعظيم عائد استثماركم مع تقليل بصمتكم البيئية.' })}</p>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <div className="about-image">
                                <img 
                                    src="https://static.vecteezy.com/system/resources/previews/033/836/684/non_2x/digital-transformation-and-technological-revolution-concept-businessman-use-magnifying-search-missing-puzzle-and-surrounding-with-digital-icon-flat-modern-illustration-vector.jpg" 
                                    alt={tx({ fr: "ICS GROUPE - Transformation digitale et énergétique", en: "ICS GROUPE - Digital and energy transformation", ar: "ICS GROUPE - التحول الرقمي والطاقي" })} 
                                />

                                <div
                                    onClick={(e) => { e.preventDefault(); this.openModal(); }}
                                    className="video-btn"
                                > 
                                    <i className="fas fa-play"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Changez l'ID de la vidéo YouTube quand vous aurez votre vidéo de présentation */}
                    {this.state.isOpen && (
                        <ModalVideo 
                            channel='youtube' 
                            isOpen={this.state.isOpen} 
                            videoId='szuchBiLrEM'  // À remplacer par votre vidéo
                            onClose={() => this.setState({ isOpen: false })} 
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default AboutContent;