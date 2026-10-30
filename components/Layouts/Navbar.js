// components/Layouts/Navbar.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from '../../lib/i18n';

const Navbar = () => {
    const { t } = useI18n();
    const [collapsed, setCollapsed] = useState(true);
    const [servicesOpen, setServicesOpen] = useState(false);
    const toggleNavbar = () => setCollapsed(!collapsed);

    useEffect(() => {
        const navbar = document.getElementById('navbar');
        const onScroll = () => {
            if (!navbar) return;
            if (window.scrollY > 170) navbar.classList.add('is-sticky');
            else navbar.classList.remove('is-sticky');
        };
        document.addEventListener('scroll', onScroll);
        return () => document.removeEventListener('scroll', onScroll);
    }, []);

        const classOne = collapsed
            ? 'collapse navbar-collapse'
            : 'collapse navbar-collapse show';

        const classTwo = collapsed
            ? 'navbar-toggler navbar-toggler-right collapsed'
            : 'navbar-toggler navbar-toggler-right';

        return (
            <>
                <div id="navbar" className="navbar-area">
                    <div className="luvion-nav">
                        <div className="container">

                            <nav className="navbar navbar-expand-md navbar-light">

                                {/* Logo */}
                                <Link href="/">
                                    <a className="navbar-brand">
                                        <img 
                                            src="/images/lOGO-01.png" 
                                            alt="logo"
                                            style={{ width: '120px', height: 'auto' }}
                                        />

                                        <img 
                                            src="/images/lOGO-02.png" 
                                            alt="logo"
                                            style={{ width: '120px', height: 'auto' }}
                                        />
                                    </a>
                                </Link>


                                {/* Mobile button */}
                                <button
                                    onClick={toggleNavbar}
                                    className={classTwo}
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="icon-bar top-bar"></span>
                                    <span className="icon-bar middle-bar"></span>
                                    <span className="icon-bar bottom-bar"></span>
                                </button>



                                <div 
                                    className={classOne}
                                    id="navbarSupportedContent"
                                >

                                    <ul className="navbar-nav">


                                        <li className="nav-item">
                                            <Link href="/">
                                                <a className="nav-link">
                                                    {t('nav.home')}
                                                </a>
                                            </Link>
                                        </li>



                                        <li className="nav-item">
                                            <Link href="/about-us">
                                                <a className="nav-link">
                                                    {t('nav.about')}
                                                </a>
                                            </Link>
                                        </li>



                                        {/* Services Dropdown */}
                                        <li className={`nav-item dropdown ${servicesOpen ? 'open' : ''}`}>

                                            <Link href="/services">
                                                <a className="nav-link dropdown-toggle">
                                                    {t('nav.services')} 
                                                    <i className="fas fa-chevron-down"></i>
                                                </a>
                                            </Link>
                                            <button
                                                type="button"
                                                className="sub-toggle"
                                                aria-label={t('nav.services')}
                                                aria-expanded={servicesOpen}
                                                onClick={() => setServicesOpen(!servicesOpen)}
                                            >
                                                <i className="fas fa-chevron-down"></i>
                                            </button>


                                            <ul className="dropdown-menu">

                                                <li>
                                                    <Link href="/services/marketing">
                                                        <a className="dropdown-item">
                                                            {t('svc.marketing')}
                                                        </a>
                                                    </Link>
                                                </li>


                                                <li>
                                                    <Link href="/services/design">
                                                        <a className="dropdown-item">
                                                            {t('svc.design')}
                                                        </a>
                                                    </Link>
                                                </li>


                                                <li>
                                                    <Link href="/services/web">
                                                        <a className="dropdown-item">
                                                            {t('svc.web')}
                                                        </a>
                                                    </Link>
                                                </li>


                                                <li>
                                                    <Link href="/services/cybersecurite">
                                                        <a className="dropdown-item">
                                                            {t('svc.cyber')}
                                                        </a>
                                                    </Link>
                                                </li>


                                                <li>
                                                    <Link href="/services/energie">
                                                        <a className="dropdown-item">
                                                            {t('svc.energy')}
                                                        </a>
                                                    </Link>
                                                </li>


                                                <li>
                                                    <Link href="/services/reseaux">
                                                        <a className="dropdown-item">
                                                            {t('svc.network')}
                                                        </a>
                                                    </Link>
                                                </li>


                                                <li>
                                                    <Link href="/services/data">
                                                        <a className="dropdown-item">
                                                            {t('svc.data')}
                                                        </a>
                                                    </Link>
                                                </li>


                                                <li>
                                                    <Link href="/services/consulting">
                                                        <a className="dropdown-item">
                                                            {t('svc.consulting')}
                                                        </a>
                                                    </Link>
                                                </li>

                                            </ul>

                                        </li>




                                        <li className="nav-item">
                                            <Link href="/portfolio">
                                                <a className="nav-link">
                                                    {t('nav.portfolio')}
                                                </a>
                                            </Link>
                                        </li>



                                        <li className="nav-item">
                                            <Link href="/blog">
                                                <a className="nav-link">
                                                    {t('nav.blog')}
                                                </a>
                                            </Link>
                                        </li>





                                    </ul>



                                    {/* Buttons */}
                                    <div className="others-options">
                                        <LanguageSwitcher />

                                        {/* L'administration n'existe qu'en français : pas de préfixe de langue */}
                                        <Link href="/admin/login" locale={false}>
                                            <a className="login-btn">
                                                <i className="fas fa-user"></i>
                                                {t('nav.login')}
                                            </a>
                                        </Link>

                                        <Link href="/contact">
                                            <a className="btn btn-primary">
                                                {t('nav.contactUs')}
                                            </a>
                                        </Link>


                                    </div>


                                </div>

                            </nav>

                        </div>
                    </div>
                </div>



                <style jsx global>{`
                    /* Menu mobile : fond blanc (le modèle l'annulait avec !important), boutons empilés, sous-menu repliable */
                    .navbar-area .sub-toggle { display: none; }

                    /* Bouton Connexion : contour blanc sur la bannière, vert quand la barre est blanche */
                    .navbar-area .luvion-nav .navbar .others-options .login-btn {
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        padding: 9px 22px;
                        border: 2px solid rgba(255, 255, 255, 0.85);
                        border-radius: 50px;
                        background: transparent;
                        color: #fff;
                        font-weight: 600;
                        transition: all 0.25s ease;
                    }
                    .navbar-area .luvion-nav .navbar .others-options .login-btn i { color: inherit; }
                    .navbar-area .luvion-nav .navbar .others-options .login-btn:hover {
                        background: #fff;
                        border-color: #fff;
                        color: #1b5e20;
                    }
                    .navbar-area.is-sticky .luvion-nav .navbar .others-options .login-btn {
                        border-color: #1b5e20;
                        color: #1b5e20;
                    }
                    .navbar-area.is-sticky .luvion-nav .navbar .others-options .login-btn:hover {
                        background: #1b5e20;
                        color: #fff;
                    }

                    /* Pas de retour à la ligne dans le menu ; plus compact entre 992 et 1199 px */
                    .navbar-area .luvion-nav .navbar .navbar-nav .nav-item > a,
                    .navbar-area .luvion-nav .navbar .others-options a { white-space: nowrap; }

                    @media (min-width: 992px) and (max-width: 1199px) {
                        .navbar-area .luvion-nav .navbar .navbar-brand img { width: 100px !important; }
                        .navbar-area .luvion-nav .navbar .navbar-nav .nav-item > a { font-size: 14px; margin-left: 9px; margin-right: 9px; }
                        .navbar-area .luvion-nav .navbar .others-options { margin-inline-start: 6px; gap: 8px; }
                        .navbar-area .luvion-nav .navbar .others-options .login-btn { padding: 7px 14px; font-size: 14px; }
                        .navbar-area .luvion-nav .navbar .others-options .btn { padding: 10px 14px; font-size: 12px; }
                    }

                    @media (max-width: 991px) {
                        .navbar-area {
                            background-color: #fff !important;
                            padding-top: 10px !important;
                            padding-bottom: 10px !important;
                            box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
                        }
                        .navbar-area .navbar-brand img:nth-child(1) { display: none; }
                        .navbar-area .navbar-brand img:nth-child(2) { display: block; }
                        .navbar-area .navbar-toggler .icon-bar { background-color: #1b5e20; }
                        .navbar-area .luvion-nav .navbar .navbar-collapse { max-height: calc(100vh - 80px); overflow-y: auto; }
                        .navbar-area .luvion-nav .navbar .navbar-nav { max-height: none; overflow: visible; }
                        .navbar-area .luvion-nav .navbar .navbar-nav .nav-item a { color: #1a1a2e; }
                        .navbar-area .luvion-nav .navbar .navbar-nav .nav-item {
                            display: flex;
                            flex-wrap: wrap;
                            align-items: center;
                            justify-content: space-between;
                            border-bottom: 1px solid #f0f2f0;
                        }
                        .navbar-area .luvion-nav .navbar .navbar-nav .nav-item > a:first-child { flex: 1; }
                        .navbar-area .sub-toggle {
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                            width: 40px;
                            height: 36px;
                            border: 0;
                            background: transparent;
                            color: #1b5e20;
                            cursor: pointer;
                        }
                        .navbar-area .nav-item.open .sub-toggle i { transform: rotate(180deg); }
                        .navbar-area .luvion-nav .navbar .navbar-nav .nav-item .dropdown-menu {
                            display: none;
                            flex-basis: 100%;
                            width: 100%;
                            margin: 0 0 8px;
                            padding: 6px 0;
                            border: 0;
                            background: #f7faf8;
                            box-shadow: none;
                        }
                        .navbar-area .luvion-nav .navbar .navbar-nav .nav-item.open .dropdown-menu { display: block; }
                        .navbar-area .luvion-nav .navbar .navbar-nav .nav-item .dropdown-menu li a { color: #4a4d5e; padding: 8px 16px; }
                        .navbar-area .luvion-nav .navbar .others-options {
                            position: static;
                            display: flex;
                            flex-wrap: wrap;
                            align-items: center;
                            gap: 10px;
                            margin: 14px 0 6px;
                        }
                        .navbar-area .luvion-nav .navbar .others-options .login-btn { color: #1b5e20; border-color: #1b5e20; }
                        .navbar-area .luvion-nav .navbar .others-options .login-btn:hover { background: #1b5e20; color: #fff; }
                    }
                `}</style>

                <style jsx>{`

                    .others-options {
                        display:flex;
                        align-items:center;
                        gap:12px;
                        margin-inline-start:16px;
                    }


                    .login-btn {
                        display:inline-flex;
                        align-items:center;
                        gap:8px;
                        padding:8px 18px;
                        border-radius:50px;
                        font-size:14px;
                        font-weight:500;
                        color:#1B5E20;
                        background:rgba(27,94,32,.08);
                        transition:.3s;
                        text-decoration:none;
                    }


                    .login-btn:hover {
                        background:#1B5E20;
                        color:#fff;
                    }


                    .btn-primary {
                        display:inline-flex;
                        align-items:center;
                        padding:10px 24px;
                        border-radius:50px;
                        background:linear-gradient(135deg,#1B5E20,#4CAF50);
                        color:#fff;
                        text-decoration:none;
                    }


                    .dropdown-menu {
                        min-width:220px;
                        padding:8px 0;
                        border:none;
                        border-radius:12px;
                        box-shadow:0 10px 40px rgba(0,0,0,.08);
                    }


                    .dropdown-item {
                        padding:8px 20px;
                        color:#4a4d5e;
                    }


                    .dropdown-item:hover {
                        background:rgba(27,94,32,.06);
                        color:#1B5E20;
                    }


                    @media(max-width:992px){

                        .others-options {
                            margin-inline-start:0;
                            margin-top:12px;
                        }

                    }


                `}</style>


            </>
        );
};

export default Navbar;