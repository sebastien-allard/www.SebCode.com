import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { Trans, Translation } from "react-i18next";
import { getCurrentLanguage } from '../i18n';
import Loading from './Loading';
import { PageTitle } from './PageTitle';
import { JobItem } from './JobItem';
import Resume from '../data/Resume';
import CachedClient from '../services/CachedClient';

export default class Jobs extends Component {
    static displayName = Jobs.name;
    static cacheKey = CachedClient.jobsCacheKey;

    constructor(props) {
        super(props);
        var cache = sessionStorage.getItem(Jobs.cacheKey);
        this.state = {
            error: null,
            isLoaded: cache !== null,
            jobs: cache ? JSON.parse(cache) : /**/ Resume[getCurrentLanguage()].jobs /*/ [] //*/
            //isLoaded: true,
            //jobs: Resume[getCurrentLanguage()].jobs
        };
    }

    componentDidMount() {
        if (!this.state.isLoaded) {
            const client = new CachedClient();
            client.getJobs()
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            jobs: result
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
                                <title>{t('Expérience professionnelle')}</title>
                            </Helmet>
                    }
                </Translation>
     
                <PageTitle><Trans>Expérience professionnelle</Trans></PageTitle>

                <SwitchTransition mode="out-in">
                    <CSSTransition key={this.state.isLoaded} timeout={300} classNames="page">
                        {
                            this.state.isLoaded ?
                                (
                                    <div>
                                        {this.state.jobs.map((item) => (
                                            <JobItem key={item.id} item={item} />
                                        ))}
                                    </div>
                                )
                                : <Loading />
                        }
                    </CSSTransition>
                </SwitchTransition>

            </div>
        );
    }
}
