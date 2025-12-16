import React, { Component } from 'react';
import Link from '../../utils/ActiveLink';

class Navbar extends Component {
    _isMounted = false;
    state = {
        display: false,
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
        this._isMounted = false;
    }

    render() {
        const { collapsed } = this.state;
        const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

        return (
            <>
                <div id="navbar" className="navbar-area">
                    <div className="luvion-nav">
                        <div className="container">
                            <nav className="navbar navbar-expand-md navbar-light">
                                <Link href="/">
                                    <a className="navbar-brand">
                                        <img src="/images/logo.png" alt="logo" />
                                        <img src="/images/black-logo.png" alt="logo" />
                                    </a>
                                </Link>

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

                                <div className={classOne} id="navbarSupportedContent">
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <Link href="/" activeClassName="active">
                                                <a className="nav-link">Accueil</a>
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link href="/about-us" activeClassName="active">
                                                <a className="nav-link">À propos</a>
                                            </Link>
                                        </li>

                                        {/* Menu Services - Identique sur mobile et desktop */}
                                        <li className="nav-item">
                                            <Link href="/services">
                                                <a className="nav-link dropdown-toggle" onClick={e => e.preventDefault()}>
                                                    Services <i className="fas fa-chevron-down"></i>
                                                </a>
                                            </Link>
                                            <ul className="dropdown-menu">
                                                <li className="nav-item">
                                                    <Link href="/services/design" activeClassName="active">
                                                        <a className="nav-link">Design graphique</a>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link href="/services/web" activeClassName="active">
                                                        <a className="nav-link">Web & Applications</a>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link href="/services/cybersecurite" activeClassName="active">
                                                        <a className="nav-link">Cybersécurité</a>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link href="/services/energie" activeClassName="active">
                                                        <a className="nav-link">Énergies renouvelables</a>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link href="/services/reseaux" activeClassName="active">
                                                        <a className="nav-link">Réseaux & Télécoms</a>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link href="/services/data" activeClassName="active">
                                                        <a className="nav-link">Data Analysis</a>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link href="/services/consulting" activeClassName="active">
                                                        <a className="nav-link">Consulting & Formations</a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>

                                        <li className="nav-item">
                                            <Link href="/team" activeClassName="active">
                                                <a className="nav-link">Équipe</a>
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link href="/blog" activeClassName="active">
                                                <a className="nav-link">Blog</a>
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link href="/contact" activeClassName="active">
                                                <a className="nav-link">Contact</a>
                                            </Link>
                                        </li>
                                    </ul>

                                    <div className="others-options">
                                        <Link href="/contact">
                                            <a className="btn btn-primary">Nous contacter</a>
                                        </Link>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Navbar;