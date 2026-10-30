import React, { Component } from 'react';
import { I18nContext } from '../../lib/i18n';

class OurFeaturesContent extends Component {
    static contextType = I18nContext;

    render() {
        const { tx } = this.context;
        return (
            <section className="features-area ptb-70 bg-f6f4f8">
                <div className="container">
                    <div className="section-title">
                        <h2>{tx({ fr: 'Nos Atouts & Expertises', en: 'Our Strengths & Expertise', ar: 'مزايانا وخبراتنا' })}</h2>
                        <div className="bar"></div>
                        <p>{tx({
                            fr: 'ICS GROUPE met à votre service une expertise multisectorielle pour accompagner votre transformation digitale, sécuriser vos données et optimiser votre efficacité énergétique.',
                            en: 'ICS GROUPE puts multi-sector expertise at your service to support your digital transformation, secure your data and optimize your energy efficiency.',
                            ar: 'تضع ICS GROUPE خبرتها متعددة القطاعات في خدمتكم لمرافقة تحولكم الرقمي وتأمين بياناتكم وتحسين كفاءتكم في استخدام الطاقة.',
                        })}</p>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-sm-6 col-md-6">
                            <div className="single-features-box">
                                <div className="icon">
                                    <i className="flaticon-settings"></i> {/* Icône design/tools */}
                                </div>

                                <h3>{tx({ fr: 'Design & Communication', en: 'Design & Communication', ar: 'التصميم والاتصال' })}</h3>
                                <p>{tx({ fr: 'Supports visuels optimisés, positionnement marketing renforcé et contenus adaptés à votre public cible.', en: 'Optimized visual materials, stronger marketing positioning and content tailored to your target audience.', ar: 'مواد بصرية محسّنة وتموضع تسويقي أقوى ومحتوى يناسب جمهوركم المستهدف.' })}</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-md-6">
                            <div className="single-features-box">
                                <div className="icon bg-f78acb">
                                    <i className="flaticon-envelope-of-white-paper"></i> {/* Icône web/app */}
                                </div>

                                <h3>{tx({ fr: 'Développement Web & Mobile', en: 'Web & Mobile Development', ar: 'تطوير الويب والجوال' })}</h3>
                                <p>{tx({ fr: 'Sites web performants, applications mobiles et solutions digitales sur mesure pour votre présence en ligne.', en: 'High-performance websites, mobile apps and custom digital solutions for your online presence.', ar: 'مواقع عالية الأداء وتطبيقات جوال وحلول رقمية مخصصة لحضوركم على الإنترنت.' })}</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-md-6">
                            <div className="single-features-box">
                                <div className="icon bg-cdf1d8">
                                    <i className="flaticon-menu"></i> {/* Icône cybersécurité */}
                                </div>

                                <h3>{tx({ fr: 'Cybersécurité Avancée', en: 'Advanced Cybersecurity', ar: 'أمن سيبراني متقدم' })}</h3>
                                <p>{tx({ fr: 'Experts certifiés pour protéger vos données et renforcer la résilience face aux cybermenaces.', en: 'Certified experts to protect your data and strengthen resilience against cyber threats.', ar: 'خبراء معتمدون لحماية بياناتكم وتعزيز الصمود أمام التهديدات السيبرانية.' })}</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-md-6">
                            <div className="single-features-box">
                                <div className="icon bg-c679e3">
                                    <i className="flaticon-info"></i> {/* Icône énergie solaire */}
                                </div>

                                <h3>{tx({ fr: 'Énergies Renouvelables', en: 'Renewable Energy', ar: 'الطاقات المتجددة' })}</h3>
                                <p>{tx({ fr: 'Solutions solaires complètes : installation, maintenance et optimisation énergétique respectueuse du budget.', en: 'Complete solar solutions: installation, maintenance and budget-friendly energy optimization.', ar: 'حلول شمسية متكاملة: تركيب وصيانة وتحسين للطاقة يراعي الميزانية.' })}</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-md-6">
                            <div className="single-features-box">
                                <div className="icon bg-eb6b3d">
                                    <i className="flaticon-cursor"></i> {/* Icône réseau */}
                                </div>

                                <h3>{tx({ fr: 'Réseaux & Télécoms', en: 'Networks & Telecoms', ar: 'الشبكات والاتصالات' })}</h3>
                                <p>{tx({ fr: 'Interconnexion fiable, maintenance infrastructures et conseil pour une connectivité performante.', en: 'Reliable interconnection, infrastructure maintenance and advice for high-performance connectivity.', ar: 'ربط موثوق وصيانة للبنى التحتية واستشارات لاتصال عالي الأداء.' })}</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6 col-md-6">
                            <div className="single-features-box">
                                <div className="icon">
                                    <i className="flaticon-alarm"></i> {/* Icône base de données */}
                                </div>

                                <h3>{tx({ fr: 'Informatisation & Bases de Données', en: 'Computerization & Databases', ar: 'الرقمنة وقواعد البيانات' })}</h3>
                                <p>{tx({ fr: "Automatisation des systèmes d'information et gestion sécurisée de vos données pour plus d'efficacité.", en: 'Information system automation and secure data management for greater efficiency.', ar: 'أتمتة نظم المعلومات وإدارة آمنة لبياناتكم لمزيد من الكفاءة.' })}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default OurFeaturesContent;