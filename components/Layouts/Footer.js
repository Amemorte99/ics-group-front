import React from 'react';
import Link from 'next/link';
import { useI18n } from '../../lib/i18n';

const Footer = () => {
    const { t } = useI18n();
    const currentYear = new Date().getFullYear();

        return (
            <footer className="footer-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-footer-widget">
                                <div className="logo">
                                    <Link href="/">
                                <a><img src="/images/logo-vert.png" alt="logo" style={{width:'150px', height:'100%',}}/></a>
                                    </Link>
                                    <p>{t('footer.about')}</p>
                                </div>
                                
                                <ul className="social-links">
                                    <li>
                                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-instagram"></i>
                                        </a> 
                                    </li>
                                    <li> 
                                        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-linkedin-in"></i>
                                        </a> 
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-footer-widget pl-5">
                                <h3>{t('footer.company')}</h3>
                                
                                <ul className="list">
                                    <li>
                                        <Link href="/about-us">
                                            <a>{t('nav.about')}</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/services">
                                            <a>{t('footer.ourServices')}</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/portfolio">
                                            <a>{t('nav.portfolio')}</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/blog">
                                            <a>{t('footer.news')}</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">
                                            <a>{t('common.contactUs')}</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-footer-widget">
                                <h3>{t('footer.support')}</h3>
                                
                                <ul className="list">
                                    <li>
                                        <Link href="/faq">
                                            <a>{t('footer.faq')}</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/privacy-policy">
                                            <a>{t('footer.privacy')}</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/terms-condition">
                                            <a>{t('footer.terms')}</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/services/consulting">
                                            <a>{t('svc.consulting')}</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact">
                                            <a>{t('nav.contact')}</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-footer-widget">
                                <h3>{t('footer.address')}</h3>
                                
                                <ul className="footer-contact-info">
                                    <li>
                                        <span className="me-1 mr-1">{t('footer.hq')}</span> 
                                        {t('footer.hqValue')}
                                    </li>
                                    <li>
                                        <span className="me-1 mr-1">{t('footer.email')}</span> 
                                        info@icsgroupe.com
                                    </li>
                                    <li>
                                        <span className="me-1 mr-1">{t('footer.phone')}</span> 
                                        <bdi dir="ltr">+235 64 78 88 31</bdi>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="copyright-area">
                        <p>© {currentYear} ICS GROUPE - {t('footer.rights')}</p>
                    </div>
                </div>
            </footer>
        );
};

export default Footer;