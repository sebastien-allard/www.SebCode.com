import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { Trans } from "react-i18next";
import i18n from 'i18next';
import { switchLanguage } from '../i18n';
import { LogoImg as Logo } from './LogoImg';
import './NavMenu.css';


class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    hideNavbar = () => {
        this.setState({
            collapsed: true
        });
    }

    handleOnNavSelect = () => {
        window.scrollTo(0, 0);
        this.hideNavbar();
    }

    handleOnLanguageSelect = () => {
        window.scrollTo(0, 0);
        this.hideNavbar();
        switchLanguage();
        //this.props.history.push(window.location);
        window.location.reload();
    }

    render() {
        return (
            <header>
                <Navbar bg="dark" sticky="top" style={{ position: "fixed", width: "100%" }} variant="dark"
                    expand="sm" expanded={!this.state.collapsed} className="border-bottom border-dark box-shadow">
                    <Container>
                        <Navbar.Brand as={Link} to="/">
                            <div className="d-inline-flex">
                                <div className="d-inline-block align-top">
                                    <Logo />
                                </div>
                                <div className="text-left">
                                    <div className="d-none d-md-block">
                                        <Trans>
                                            <div className="d-inline-block mr-1">
                                                Sébastien
                                            </div>
                                            <div className="d-inline-block">
                                                Allard
                                            </div>
                                        </Trans>
                                    </div>
                                    <div className="d-none d-lg-block text-muted">Développeur .NET Full stack</div>
                                </div>
                            </div>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={this.toggleNavbar} />
                        <Navbar.Collapse id="basic-navbar-nav" className="d-sm-inline-flex flex-sm-row-reverse">
                            <Nav className="">
                                <Nav.Item>
                                    <Nav.Link as={NavLink} className="text-light" onSelect={this.handleOnNavSelect} eventKey="technologies" to="/technologies"><Trans>Technologies</Trans></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={NavLink} className="text-light" onSelect={this.handleOnNavSelect} eventKey="experience" to="/experience"><Trans>Expérience</Trans></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={NavLink} className="text-light" onSelect={this.handleOnNavSelect} eventKey="formation" to="/formation"><Trans>Formation</Trans></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={NavLink} className="text-light" onSelect={this.handleOnNavSelect} eventKey="joindre" to="/joindre">
                                        <span className="d-inline d-sm-none mr-1"><Trans>Me joindre</Trans></span>
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-envelope" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <title><Trans>Me joindre</Trans></title>
                                            <path fillRule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                                        </svg>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link tag={NavLink} className="text-light" onSelect={this.hideNavbar} eventKey="download" href={i18n.t('/files/Sébastien Allard – CV – Développeur .NET.pdf')} target="_blank" download>
                                        <span className="d-inline d-sm-none mr-1"><Trans>Télécharger mon CV</Trans></span>
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-download" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <title><Trans>Télécharger mon CV</Trans></title>
                                            <path fillRule="evenodd" d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"></path>
                                            <path fillRule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"></path>
                                        </svg>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link tag={NavLink} className="text-light" onSelect={this.handleOnLanguageSelect} eventKey="language"><Trans>fr</Trans></Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}

export default withRouter(NavMenu);

