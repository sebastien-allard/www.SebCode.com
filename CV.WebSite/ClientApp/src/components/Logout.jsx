import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import { Translation } from "react-i18next";


class Logout extends Component {
    static displayName = Logout.name;
    componentDidMount() {
        localStorage.removeItem("jwtToken");
        this.props.history.push("./admin");
    }

    render() {
        return (
            <Translation>
                {
                    t =>
                        <Helmet>
                            <title>{t('Déconnexion en cours')}</title>
                            <meta name="robots" content="noindex, nofollow" />
                        </Helmet>
                }
            </Translation>
        );
    }
}

export default withRouter(Logout);