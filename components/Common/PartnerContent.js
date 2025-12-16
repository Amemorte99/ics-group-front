import React, { Component } from 'react';

class PartnerContent extends Component {
    render() {
        return (
            <div className="partner-area ptb-70">
                <div className="container">
                    <div className="section-title">
                        <h2>Nos partenaires de confiance</h2>
                        <div className="bar"></div>
                        <p>ICS GROUPE collabore avec des leaders mondiaux en cybersécurité, réseaux, énergies renouvelables et technologies pour vous offrir les meilleures solutions innovantes et certifiées.</p>
                    </div>

                    <div className="partner-inner">
                        <div className="row align-items-center">
                            {/* Huawei */}
                            <div className="single-partner-item">
                                <a href="https://www.huawei.com" target="_blank" rel="noopener noreferrer">
                                    <img src="https://cdn.vectorstock.com/i/500p/39/34/huawei-logo-brand-phone-symbol-red-with-name-white-vector-46213934.jpg" alt="Partenaire Huawei" />
                                </a>
                            </div>

                            {/* Cisco */}
                            <div className="single-partner-item">
                                <a href="https://www.cisco.com" target="_blank" rel="noopener noreferrer">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1200px-Cisco_logo_blue_2016.svg.png" alt="Partenaire Cisco" />
                                </a>
                            </div>

                            {/* Fortinet */}
                            <div className="single-partner-item">
                                <a href="https://www.fortinet.com" target="_blank" rel="noopener noreferrer">
                                    <img src="https://download.logo.wine/logo/Fortinet/Fortinet-Logo.wine.png" alt="Partenaire Fortinet" />
                                </a>
                            </div>

                            {/* Schneider Electric */}
                            <div className="single-partner-item">
                                <a href="https://www.se.com" target="_blank" rel="noopener noreferrer">
                                    <img src="https://logos-world.net/wp-content/uploads/2023/02/Schneider-Electric-Logo.png" alt="Partenaire Schneider Electric" />
                                </a>
                            </div>

                            {/* Victron Energy */}
                            <div className="single-partner-item">
                                <a href="https://www.victronenergy.com" target="_blank" rel="noopener noreferrer">
                                    <img src="https://s3-eu-west-1.amazonaws.com/tpd/logos/5fe2f2418dd76d0001f7c704/0x0.png" alt="Partenaire Victron Energy" />
                                </a>
                            </div>

                            {/* ISO 27001 */}
                            <div className="single-partner-item">
                                <a href="https://www.iso.org/standard/27001" target="_blank" rel="noopener noreferrer">
                                    <img src="https://codific.com/wp-content/uploads/2023/05/ISO-logo.png" alt="Certification ISO 27001" />
                                </a>
                            </div>

                            {/* Microsoft Partner */}
                            <div className="single-partner-item">
                                <a href="https://partner.microsoft.com" target="_blank" rel="noopener noreferrer">
                                    <img src="https://partner.microsoft.com/-/media/mssc/mpn/partner/marketing/badge.jpeg?h=433&iar=0&w=650&hash=5B1A3192DF4B6B2928187A6319C4110B" alt="Partenaire Microsoft" />
                                </a>
                            </div>

                            {/* Oracle Partner */}
                            <div className="single-partner-item">
                                <a href="https://www.oracle.com/partners" target="_blank" rel="noopener noreferrer">
                                    <img src="https://mma.prnewswire.com/media/2814553/I_care_o_prtnr_Logo.jpg?p=facebook" alt="Partenaire Oracle" />
                                </a>
                            </div>

                            {/* SolarEdge */}
                            <div className="single-partner-item">
                                <a href="https://www.solaredge.com" target="_blank" rel="noopener noreferrer">
                                    <img src="https://cdn-jiaid.nitrocdn.com/sBOmYoPflieFmyCBYUQxHgieeDkCXAdy/assets/images/optimized/rev-1a1179f/csesolarusa.com/wp-content/uploads/2023/06/SolarEdge-logo-2.png" alt="Partenaire SolarEdge" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PartnerContent;