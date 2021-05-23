import React, { Component } from 'react';
import CardColumns from 'react-bootstrap/CardColumns';
import { Helmet } from 'react-helmet-async';
import { Trans, Translation } from "react-i18next";
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Resume from '../data/Resume';
import { getCurrentLanguage } from '../i18n';
import CachedClient from '../services/CachedClient';
import Loading from './Loading';
import { PageTitle } from './PageTitle';
import './Technologies.css';
import { TechnoRootItem } from './TechnoRootItem';

export default class Technologies extends Component {
    static displayName = Technologies.name;
    static cacheKey = CachedClient.technologiesCacheKey;

    constructor(props) {
        super(props);
        var cache = sessionStorage.getItem(Technologies.cacheKey);
        this.state = {
            error: null,
            isLoaded: cache !== null,
            technologies: cache ? JSON.parse(cache) : /**/ Resume[getCurrentLanguage()].technologies /*/ [] //*/
            //isLoaded: true,
            //technologies: Resume[getCurrentLanguage()].technologies
        };
    }

    componentDidMount() {
        if (!this.state.isLoaded) {
            const client = new CachedClient();
            client.getTechnologies()
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            technologies: result
                        });
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                );
        }
    }

    render() {
        return (
            <div>
                <Translation>
                    {
                        t =>
                        <Helmet>
                            <title>{t('Technologies')}</title>
                        </Helmet>
                    }
                </Translation>

                <PageTitle><Trans>Technologies</Trans></PageTitle>

                <SwitchTransition mode="out-in">
                    <CSSTransition key={this.state.isLoaded} timeout={300} classNames="page">
                        {
                            this.state.isLoaded ?
                                (
                                    <CardColumns className="technologyCards">
                                        {this.state.technologies.map((technology) => (
                                            <TechnoRootItem key={technology.id} technology={technology} />
                                        ))}
                                    </CardColumns>
                                )
                                : <Loading />
                        }
                    </CSSTransition>
                </SwitchTransition>

            </div>
        );
    }
}
