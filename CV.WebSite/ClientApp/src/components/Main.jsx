import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';

export class Main extends Component {
    static displayName = Main.name;

    render() {
        return (
            <main>
                <Container>
                    {this.props.children}
                </Container>
            </main>
        );
    }
}
