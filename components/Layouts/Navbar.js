// components/Layouts/Navbar.js
import React, { Component } from 'react';
import Link from 'next/link';

class Navbar extends Component {
    state = {
        collapsed: true
    };

    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    componentDidMount() {
        let elementId = document.getElementById("navbar");

        document.addEventListener("scroll", () => {
            if (window.scrollY > 170) {
                elementId.classList.add("is-sticky");
            } else {
                elementId.classList.remove("is-sticky");
            }
        });

        window.scrollTo(0, 0);
    }

    componentWillUnmount() {
    }

    render() {
        const { collapsed } = this.state;

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
                                    onClick={this.toggleNavbar}
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
                                                    Accueil
                                                </a>
                                            </Link>
                                        </li>



                                        <li className="nav-item">
                                            <Link href="/about-us">
                                                <a className="nav-link">
                                                    À propos
                                                </a>
                                            </Link>
                                        </li>



                                        {/* Services Dropdown */}
                                        <li className="nav-item dropdown">

                                            <Link href="/services">
                                                <a className="nav-link dropdown-toggle">
                                                    Services 
                                                    <i className="fas fa-chevron-down"></i>
                                                </a>
                                            </Link>


                                            <ul className="dropdown-menu">

                                                <li>
                                                    <Link href="/services/marketing">
                                                        <a className="dropdown-item">
                                                            Marketing Digital
                                                        </a>
                                                    </Link>
                                                </li>


                                                <li>
                                                    <Link href="/services/design">
                                                        <a className="dropdown-item">
                                                            Design Graphique & Communication
                                                        </a>
                                                    </Link>
                                                </li>


                                                <li>
                                                    <Link href="/services/web">
                                                        <a className="dropdown-item">
                                                            Sites Web & Applications Mobiles
                                                        </a>
                                                    </Link>
                                                </li>


                                                <li>
                                                    <Link href="/services/cybersecurite">
                                                        <a className="dropdown-item">
                                                            Cybersécurité
                                                        </a>
                                                    </Link>
                                                </li>


                                                <li>
                                                    <Link href="/services/energie">
                                                        <a className="dropdown-item">
                                                            Énergies Renouvelables
                                                        </a>
                                                    </Link>
                                                </li>


                                                <li>
                                                    <Link href="/services/reseaux">
                                                        <a className="dropdown-item">
                                                            Réseaux & Télécommunications
                                                        </a>
                                                    </Link>
                                                </li>


                                                <li>
                                                    <Link href="/services/data">
                                                        <a className="dropdown-item">
                                                            Data Analysis
                                                        </a>
                                                    </Link>
                                                </li>


                                                <li>
                                                    <Link href="/services/consulting">
                                                        <a className="dropdown-item">
                                                            Consulting & Formations
                                                        </a>
                                                    </Link>
                                                </li>

                                            </ul>

                                        </li>




                                        <li className="nav-item">
                                            <Link href="/portfolio">
                                                <a className="nav-link">
                                                    Portfolio
                                                </a>
                                            </Link>
                                        </li>



                                        <li className="nav-item">
                                            <Link href="/blog">
                                                <a className="nav-link">
                                                    Blog
                                                </a>
                                            </Link>
                                        </li>



                                        <li className="nav-item">
                                            <Link href="/contact">
                                                <a className="nav-link">
                                                    Contact
                                                </a>
                                            </Link>
                                        </li>


                                    </ul>



                                    {/* Buttons */}
                                    <div className="others-options">


                                        <Link href="/admin">
                                            <a className="login-btn">
                                                <i className="flaticon-user"></i>
                                                Se connecter
                                            </a>
                                        </Link>


                                        <Link href="/contact">
                                            <a className="btn btn-primary">
                                                Nous contacter
                                            </a>
                                        </Link>


                                    </div>


                                </div>

                            </nav>

                        </div>
                    </div>
                </div>



                <style jsx>{`

                    .others-options {
                        display:flex;
                        align-items:center;
                        gap:12px;
                        margin-left:16px;
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
                            margin-left:0;
                            margin-top:12px;
                        }

                    }


                `}</style>


            </>
        );
    }
}


export default Navbar;