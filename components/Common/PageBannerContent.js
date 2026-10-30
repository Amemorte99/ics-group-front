import React, { Component } from 'react';
import { I18nContext } from '../../lib/i18n';

class PageBannerContent extends Component {
    static contextType = I18nContext;

    render() {
        const { tx } = this.context;

        let { pageTitle, pageCaption } = this.props;

        return (
            <div className="page-title-area item-bg1">
                <div className="container">
                    <div className="page-title-content">
                        <h2>{tx(pageTitle)}</h2>
                        <p>{tx(pageCaption)}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageBannerContent;