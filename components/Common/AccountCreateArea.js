import React, { Component } from 'react';
import Link from 'next/link';
import { I18nContext } from '../../lib/i18n';

class AccountCreateArea extends Component {
    static contextType = I18nContext;

    render() {
        const { tx, t } = this.context;
        return (
            <div className="account-create-area">
                <div className="container account-create-content">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <h2>{tx({ fr: 'Lancez votre projet avec ICS GROUPE en quelques minutes', en: 'Launch your project with ICS GROUPE in minutes', ar: 'أطلقوا مشروعكم مع ICS GROUPE في دقائق' })}</h2>
                            <p>{tx({ fr: 'Contactez-nous dès aujourd’hui pour un devis personnalisé !', en: 'Contact us today for a personalized quote!', ar: 'تواصلوا معنا اليوم للحصول على عرض سعر مخصص!' })}</p>
                        </div>
                        
                        <div className="col-lg-4">
                            <div className="create-account">
                                <Link href="/contact">
                                    <a className="btn btn-primary">{t('common.contactUs')}</a>
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