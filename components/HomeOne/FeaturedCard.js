import React from 'react';
import Link from 'next/link';
import featuredServices from '../../data/featuredServices';

const FeaturedCard = ({ limit }) => {
    const servicesToShow = limit ? featuredServices.slice(0, limit) : featuredServices;

    return (
        <div className="featured-boxes-area">
            <div className="container">
                <div className="featured-boxes-inner">
                    <div className="row m-0">
                        {servicesToShow.map((service, index) => (
                            <div key={index} className="col-lg-3 col-sm-6 col-md-6 p-0 mb-4">  {/* ← Ajout de mb-4 ici */}
                                <div className="single-featured-box">
                                    <div className={`icon ${service.color || ''}`}>
                                        <i className={service.icon}></i>
                                    </div>

                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>

                                    <Link href={service.link}>
                                        <a className="read-more-btn">En savoir plus</a>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bouton "Voir tous" si limité */}
            {limit && (
                <div className="text-center mt-4">
                    <Link href="/services">
                        <a className="btn btn-primary">Voir tous les services →</a>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default FeaturedCard;