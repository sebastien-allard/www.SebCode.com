import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import { Trans, Translation } from "react-i18next";
import { AzureAD, AuthenticationState } from 'react-aad-msal';
import { authProvider } from '../services/authProvider';
import './Home.css';

export default class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            < >
                <Translation>
                    {
                        t =>
                            <Helmet>
                                <title>{t('Administration du site')}</title>
                                <meta name="robots" content="noindex, nofollow" />
                            </Helmet>
                    }
                </Translation>
                <AzureAD provider={authProvider} forceLogin={false}>
                    {
                        ({ login, logout, authenticationState, error, accountInfo }) => {
                            switch (authenticationState) {
                                case AuthenticationState.Authenticated:
                                    localStorage.setItem("jwtToken", accountInfo.jwtIdToken);
                                    return (
                                        <div>
                                            <div className="vertical-center">
                                                <Container>
                                                    <div className="text-center" style={{ minHeight: "50%" }} >
                                                        <h1 className=""><Trans>Administration du site</Trans></h1>
                                                        <hr className="my-2" />
                                                        <p className="lead"><Trans>Bienvenue</Trans> {accountInfo.account.name} !</p>
                                                        <p className="lead">
                                                            <Button variant="outline-secondary" className="m-2 home-button" onClick={() => this.props.history.push('/admin/technologies')}><Trans>Technologies</Trans></Button>
                                                            <Button variant="outline-secondary" className="m-2 home-button" onClick={() => this.props.history.push('/admin/experience')}><Trans>Expérience</Trans></Button>
                                                            <Button variant="outline-secondary" className="m-2 home-button" onClick={() => this.props.history.push('/admin/formation')}><Trans>Formation</Trans></Button>
                                                            <Button variant="outline-secondary" className="m-2 home-button" onClick={logout}><Trans>Déconnexion</Trans></Button>
                                                        </p>
                                                    </div>
                                                </Container>
                                            </div>
                                        </div>
                                    );
                                case AuthenticationState.Unauthenticated:
                                    return (
                                        <div>
                                            <div className="vertical-center">
                                                <Container>
                                                    <div className="text-center" style={{ minHeight: "50%" }} >
                                                        <h1 className=""><Trans>Administration du site</Trans></h1>
                                                        <hr className="my-2" />
                                                        <p className="lead">
                                                            {error && <span><Trans>Une erreur s'est produite pendant l'authentification, merci de réessayer !</Trans></span>}
                                                        </p>
                                                        <p className="lead">
                                                            <Button variant="outline-secondary" className="m-2 home-button" onClick={login}><Trans>Connexion</Trans></Button>
                                                        </p>
                                                    </div>
                                                </Container>
                                            </div>
                                            <CardDeck>
                                                <Card>
                                                    <Card.Body>
                                                        <Card.Title><Trans>Technologies</Trans></Card.Title>
                                                        <Card.Img src="../img/TechnologyEditor.png" />
                                                    </Card.Body>
                                                </Card>
                                                <Card>
                                                    <Card.Body>
                                                        <Card.Title><Trans>Expérience professionnelle</Trans></Card.Title>
                                                        <Card.Img src="../img/ExperienceEditor.png" />
                                                    </Card.Body>
                                                </Card>
                                                <Card>
                                                    <Card.Body>
                                                        <Card.Title><Trans>Formation</Trans></Card.Title>
                                                        <Card.Img src="../img/TrainingEditor.png" />
                                                    </Card.Body>
                                                </Card>
                                            </CardDeck>
                                        </div>
                                    );
                                case AuthenticationState.InProgress:
                                    return (
                                        <div>
                                            <div className="vertical-center">
                                                <Container>
                                                    <div className="text-center" style={{ minHeight: "50%" }} >
                                                        <h1 className=""><Trans>Administration du site</Trans></h1>
                                                        <hr className="my-2" />
                                                        <p className="lead"><Trans>Authentification en cours…</Trans></p>
                                                    </div>
                                                </Container>
                                            </div>
                                        </div>
                                    );
                                default:
                                    return (
                                        <div>
                                            <div className="vertical-center">
                                                <Container>
                                                    <div className="text-center" style={{ minHeight: "50%" }} >
                                                        <h1 className="">Administration du site</h1>
                                                        <hr className="my-2" />
                                                        <p className="lead">Situation inconnue !…</p>
                                                    </div>
                                                </Container>
                                            </div>
                                        </div>
                                    );
                            }
                        }
                    }
                </AzureAD>
            </>
        );
    }
}
