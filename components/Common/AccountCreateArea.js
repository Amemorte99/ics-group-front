import React, { Component } from 'react';
import Link from 'next/link';

class AccountCreateArea extends Component {
    render() {
        return (
            <div className="account-create-area">
                <div className="container account-create-content">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <h2>Lancez votre projet avec ICS GROUPE en quelques minutes</h2>
                            <p>Contactez-nous dès aujourd’hui pour un devis personnalisé !</p>
                        </div>
                        
                        <div className="col-lg-4">
                            <div className="create-account">
                                <Link href="/contact">
                                    <a className="btn btn-primary">Nous Contacter</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AccountCreateArea;