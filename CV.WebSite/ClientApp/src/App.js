import React, { Component } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout';
import RoutesContainer from './components/RoutesContainer';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    constructor(props, context) {
        super(props, context);
        this.componentCleanup = this.componentCleanup.bind(this);
    }

    componentCleanup() {
        sessionStorage.clear();
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.componentCleanup);
    }

    componentWillUnmount() {
        this.componentCleanup();
        window.removeEventListener('beforeunload', this.componentCleanup);
    }

    render() {
        return (
            <HelmetProvider>
                <Helmet
                    defaultTitle="Sébastien Allard • Développeur .NET Full stack • Montréal • Curriculum Vitæ"
                    titleTemplate="Sébastien Allard • %s">
                    <meta name="robots" content="noarchive" />
                </Helmet>
                <ToastContainer />
                <Layout>
                    <RoutesContainer />
                </Layout>
            </HelmetProvider>
        );
    }
}
