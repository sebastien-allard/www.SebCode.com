import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Trans, Translation } from "react-i18next";

export default class NotFound extends Component {
    static displayName = NotFound.name;

    render() {
        return (
            <div className="vertical-center">
                <Translation>
                    {
                        t =>
                            <Helmet>
                                <title>{t('Page non-trouvée')}</title>
                                <meta name="robots" content="noindex, follow" />
                            </Helmet>
                    }
                </Translation>

                <Container>
                    <Jumbotron className="text-center" >
                        <h1 className="display-4"><Trans>Oups !</Trans></h1>
                        <hr className="my-2" />
                        <p className="lead"><Trans>Erreur 404 • Page non trouvée</Trans></p>
                    </Jumbotron>
                </Container>
            </div>
        );
    }
}
