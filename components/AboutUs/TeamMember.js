import React, { Component } from 'react';

class TeamMember extends Component {
    render() {
        return (
            <section className="team-area pt-70 pb-50 bg-f7fafd">
                <div className="container">
                    <div className="section-title">
                        <h2>Rencontrez notre équipe</h2>
                        <div className="bar"></div>
                        <p>Une équipe d’experts passionnés et certifiés, basée à N'Djamena, prête à accompagner vos projets en transformation digitale, cybersécurité, énergies renouvelables et réseaux.</p>
                    </div>

                    <div className="row">
                        {/* KOI-SONN MANES MANA */}
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-team-member">
                                <div className="member-image">
                                    <img src="https://thumbs.dreamstime.com/b/black-man-portrait-smile-laptop-desk-startup-construction-business-research-office-african-architect-entrepreneur-324169249.jpg" alt="KOI-SONN MANE MANA" />

                                    <ul className="social">
                                        <li><a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a></li>
                                        <li><a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                                    </ul>
                                </div>

                                <div className="member-content">
                                    <h3>Koi-Sonn Manes Mana</h3>
                                    <span>Architecte Logiciel & Ingénieur Développement</span>
                                </div>
                            </div>
                        </div>

                        {/* Abdelfara - Co-Fondateur */}
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-team-member">
                                <div className="member-image">
                                    <img src="https://www.shutterstock.com/image-photo/top-africanamerican-tax-advisor-smiling-600nw-2479011323.jpg" alt="Abdelfara" />

                                    <ul className="social">
                                        <li><a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a></li>
                                        <li><a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                                    </ul>
                                </div>

                                <div className="member-content">
                                    <h3>Abdelfara</h3>
                                    <span>Comptable & Co-Fondateur</span>
                                </div>
                            </div>
                        </div>

                        {/* Adam Hagar - Co-Fondateur */}
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-team-member">
                                <div className="member-image">
                                    <img src="https://img.freepik.com/premium-photo/portrait-african-american-man-as-software-engineer-looking-camera-while-posing-workplace-wi_236854-44703.jpg" alt="Adam Hagar" />

                                    <ul className="social">
                                        <li><a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a></li>
                                        <li><a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                                    </ul>
                                </div>

                                <div className="member-content">
                                    <h3>Adam Hagar</h3>
                                    <span>Ingénieur Informatique & Co-Fondateur</span>
                                </div>
                            </div>
                        </div>

                        {/* Frank */}
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-team-member">
                                <div className="member-image">
                                    <img src="https://thumbs.dreamstime.com/b/network-engineer-working-server-room-portrait-33910040.jpg" alt="Frank" />

                                    <ul className="social">
                                        <li><a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a></li>
                                        <li><a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                                    </ul>
                                </div>

                                <div className="member-content">
                                    <h3>Frank</h3>
                                    <span>Ingénieur Réseau</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default TeamMember;