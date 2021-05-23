import React, { Component } from 'react';
import NavMenu from './NavMenu';
import { Main } from './Main';
import { Footer } from './Footer';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <React.Fragment>
                <NavMenu />
                <Main>
                    {this.props.children}
                </Main>
                <Footer />
            </React.Fragment>
        );
    }
}
