import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Trans } from "react-i18next";

export class Footer extends Component {
    static displayName = Footer.name;

    constructor(props) {
        super(props);
        this.state = {
            popoverOpen: false
        };
    }

    handleOnNavSelect = () => {
        window.scrollTo(0, 0);
    }

    setPopoverOpen(state) {
        this.setState({
            popoverOpen: state
        });
    }

    toggle = () => this.setPopoverOpen(!this.state.popoverOpen);

    render() {
        return (
            <footer className="footer">
                <Navbar bg="light" fixed="bottom" variant="light" className="border-top box-shadow">
                    <Container>
                        <Row noGutters={true} className="w-100">
                            <Col>
                                <OverlayTrigger placement="top" onToggle={this.toggle} overlay={
                                    <Tooltip target="TechInfo" placement="top" show={this.state.popoverOpen}>
                                        REACT, Bootstrap, jQuery, JavaScript, JSON, CSS, HTML5, .NET 5.0, C#, WebApi, Swagger, Entity Framework Core 5.0, Azure Database (MS SQL), Azure App Services, Azure AD B2C, Azure DevOps (CI/CD), Azure Service Domains, Git, SendGrid.
                                    </Tooltip>
                                }>
                                    <span id="TechInfo" className="text-muted">
                                        <svg width="1em" height="1em" viewBox="0 0 20 20" className="bi bi-info-circle mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <title>Information</title>
                                            <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
                                            <circle cx="8" cy="4.5" r="1" />
                                        </svg>
                                        <small><Trans>Technos du site…</Trans></small>
                                    </span>
                                </OverlayTrigger>
                            </Col>

                            <Col className="text-center">
                                <Nav.Link as={NavLink} className="text-muted p-0" onSelect={this.handleOnNavSelect} eventKey="admin" to="/admin"><small><Trans>Admin</Trans></small></Nav.Link>
                            </Col>

                            <Col className="text-right text-muted">
                                <small>© Sébastien Allard, {new Date().getFullYear()}</small>
                            </Col>
                        </Row>
                    </Container>
                </Navbar>
            </footer>
        );
    }
}
