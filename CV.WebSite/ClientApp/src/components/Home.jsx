import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container';
import { Trans } from "react-i18next";
import './Home.css';

export default class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <div className="vertical-center">
                    <Container>
                        <div className="text-center" style={{ minHeight: "50%" }} >

                            <h1 className="">Sébastien Allard</h1>
                            <hr className="my-2" />
                            <p className="lead"><Trans>Développeur .NET Full stack</Trans> • Montréal</p>
                            <p className="lead">
                                <Button variant="outline-secondary" className="m-2 home-button" onClick={() => this.props.history.push('/technologies')}><Trans>Technologies</Trans></Button>
                                <Button variant="outline-secondary" className="m-2 home-button" onClick={() => this.props.history.push('/experience')}><Trans>Expérience</Trans></Button>
                                <Button variant="outline-secondary" className="m-2 home-button" onClick={() => this.props.history.push('/formation')}><Trans>Formation</Trans></Button>
                                <Button variant="outline-secondary" className="m-2 home-button" href="https://www.linkedin.com/in/s%C3%A9bastien-allard/" target="_blank">
                                    <svg version="1.1" width="20" height="20" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true">
                                        <title>LinkedIn</title>
                                        <path d="M365 1414h231v-694h-231v694zm246-908q-1-52-36-86t-93-34-94.5 34-36.5 86q0 51 35.5 85.5t92.5 34.5h1q59 0 95-34.5t36-85.5zm585 908h231v-398q0-154-73-233t-193-79q-136 0-209 117h2v-101h-231q3 66 0 694h231v-388q0-38 7-56 15-35 45-59.5t74-24.5q116 0 116 157v371zm468-998v960q0 119-84.5 203.5t-203.5 84.5h-960q-119 0-203.5-84.5t-84.5-203.5v-960q0-119 84.5-203.5t203.5-84.5h960q119 0 203.5 84.5t84.5 203.5z">
                                        </path>
                                    </svg>
                                </Button>
                                <Button variant="outline-secondary" className="m-2 home-button" href="https://github.com/sebastien-allard" target="_blank">
                                    <svg version="1.1" width="20" height="20" viewBox="0 0 16 16" className="octicon octicon-mark-github" fill="currentColor" aria-hidden="true">
                                        <title>GitHub</title>
                                        <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z">
                                        </path>
                                    </svg>
                                </Button>
                            </p>
                        </div>
                    </Container>
                </div>
                <CardDeck>
                    <Card>
                        <Card.Body>
                            <Card.Title><Trans>Savoir faire</Trans></Card.Title>
                            <Card.Text><Trans>Plus de 15 ans d'expérience en développement logiciel…</Trans></Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title><Trans>À l'écoute</Trans></Card.Title>
                            <Card.Text><Trans>Toujours à l'écoute du client et de ses idées…</Trans></Card.Text>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body>
                            <Card.Title><Trans>Proactif</Trans></Card.Title>
                            <Card.Text><Trans>À l'affût des changements technologiques qui peuvent bénéficier au client, au produit, et au développement…</Trans></Card.Text>
                        </Card.Body>
                    </Card>
                </CardDeck>
            </div>
        );
    }
}

