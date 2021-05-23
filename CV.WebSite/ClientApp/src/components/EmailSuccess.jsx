import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Trans } from "react-i18next";

export class EmailSuccess extends Component {
    static displayName = EmailSuccess.name;

    render() {

        return (
            <div className="vertical-center">
                <Container>
                    <Jumbotron className="text-center" >
                        <h1 className="display-4"><Trans>Merci de votre intérêt !</Trans></h1>
                        <hr className="my-2" />
                        <p className="lead"><Trans>Je communiquerai avec vous sous peu.</Trans></p>
                    </Jumbotron>
                </Container>
            </div>
        );
    }
}
