import React, { Component } from 'react';
import Link from 'next/link';

const highlights = [
    { title: 'Cybersécurité', icon: 'fas fa-shield-alt' },
    { title: 'Énergies Renouvelables', icon: 'fas fa-solar-panel' },
    { title: 'Réseaux & Télécoms', icon: 'fas fa-network-wired' },
    { title: 'Développement Web', icon: 'fas fa-laptop-code' },
];

class EasyPaymentBorrow extends Component {
    render() {
        return (
            <section className="invoicing-area ptb-70">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="invoicing-content">
                                <h2>Votre partenaire pour une transformation digitale et énergétique réussie</h2>
                                <div className="bar"></div>
                                <p>ICS GROUPE vous accompagne avec des solutions innovantes en cybersécurité, énergies renouvelables, réseaux & télécommunications, analyse de données et consulting sur mesure.</p>
                                <p>De l’étude de vos besoins à la mise en œuvre et la maintenance, notre équipe d’experts certifiés assure une transition fluide, sécurisée et rentable, tout en respectant votre budget et vos objectifs écologiques.</p>

                                <Link href="/contact">
                                    <a className="btn btn-primary">Nous Contacter</a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <div className="highlights-panel">
                                <div className="highlights-grid">
                                    {highlights.map((item, index) => (
                                        <div key={index} className="highlight-card">
                                            <div className="highlight-icon">
                                                <i className={item.icon}></i>
                                            </div>
                                            <h4>{item.title}</h4>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    .highlights-panel {
                        padding: 20px;
                    }

                    .highlights-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 24px;
                    }

                    .highlight-card {
                        background: #ffffff;
                        border-radius: 16px;
                        padding: 36px 24px;
                        text-align: center;
                        box-shadow: 0 15px 40px rgba(10, 14, 39, 0.08);
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                    }

                    .highlight-card:hover {
                        transform: translateY(-6px);
                        box-shadow: 0 20px 50px rgba(73, 185, 109, 0.18);
                    }

                    .highlight-icon {
                        width: 64px;
                        height: 64px;
                        margin: 0 auto 18px;
                        border-radius: 16px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: linear-gradient(135deg, rgba(73, 185, 109, 0.12), rgba(128, 195, 83, 0.12));
                        color: #49B96D;
                        font-size: 26px;
                    }

                    .highlight-card h4 {
                        font-size: 16px;
                        font-weight: 600;
                        color: #0A0A2E;
                        margin: 0;
                    }

                    @media (max-width: 767px) {
                        .highlights-grid {
                            grid-template-columns: 1fr 1fr;
                            gap: 16px;
                        }

                        .highlight-card {
                            padding: 24px 16px;
                        }
                    }
                `}</style>
            </section>
        );
    }
}

export default EasyPaymentBorrow;