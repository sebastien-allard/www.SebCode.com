import React, { Component } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { toast, Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';
import { Trans, Translation } from "react-i18next";
import { PageTitle } from './PageTitle';
import EmailForm from "./EmailForm";
import { EmailSuccess } from "./EmailSuccess";

export default class Contact extends Component {
    static displayName = Contact.name;

    constructor(props) {
        super(props);
        this.state = {
            emailSent: false
        };
    }

    handleEmailSent = () => {
        this.setState({ emailSent: true });
    }

    handleEmailError = () => {
        toast.error(
            <div>
                <Trans>Une erreur s'est produite.</Trans><br />
                <Trans>Veuillez réessayer un peu plus tard…</Trans>
            </div>, {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            transition: Slide,
            progress: 0,
        });
    }

    render() {
        return (
            <SwitchTransition mode="out-in">
                <CSSTransition key={this.state.emailSent} timeout={300} classNames="page" unmountOnExit>
                    <div>
                        {!this.state.emailSent
                            ? (
                                < >
                                    <Translation>
                                        {
                                            t =>
                                                <Helmet>
                                                    <title>{t('Me joindre par courriel')}</title>
                                                </Helmet>
                                        }
                                    </Translation>
              
                                    <PageTitle><Trans>Me joindre par courriel</Trans></PageTitle>

                                    <EmailForm onEmailSent={this.handleEmailSent} onEmailError={this.handleEmailError} />
                                    <ToastContainer />
                                </>
                            )
                            : (
                                < >
                                    <Translation>
                                        {
                                            t =>
                                                <Helmet>
                                                    <title>{t('Courriel envoyé !')}</title>
                                                </Helmet>
                                        }
                                    </Translation>
                                 
                                    <EmailSuccess />
                                </>
                            )}
                    </div>
                </CSSTransition>
            </SwitchTransition>
        );
    }
}
