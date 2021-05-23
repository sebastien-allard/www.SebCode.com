import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { Trans, Translation } from "react-i18next";
import { getCurrentLanguage } from '../i18n';
import Loading from './Loading';
import { PageTitle } from './PageTitle';
import { TrainingItem } from './TrainingItem';
import Resume from '../data/Resume';
import CachedClient from '../services/CachedClient';

export default class Trainings extends Component {
    static displayName = Trainings.name;
    static cacheKey = CachedClient.trainingsCacheKey;

    constructor(props) {
        super(props);
        var cache = sessionStorage.getItem(Trainings.cacheKey);
        
        this.state = {
            error: null,
            isLoaded: cache !== null,
            trainings: cache ? JSON.parse(cache) : /**/ Resume[getCurrentLanguage()].trainings /*/ [] //*/
            //isLoaded: true,
            //trainings: Resume[getCurrentLanguage()].trainings
        };
    }

    componentDidMount() {
        if (!this.state.isLoaded) {
            const client = new CachedClient();
            client.getTrainings()
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            trainings: result
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
                                <title>{t('Formation')}</title>
                            </Helmet>
                    }
                </Translation>


                <PageTitle><Trans>Formation</Trans></PageTitle>

                <SwitchTransition mode="out-in">
                    <CSSTransition key={this.state.isLoaded} timeout={300} classNames="page">
                        {
                            this.state.isLoaded ?
                                (
                                    <div>
                                        {this.state.trainings.map((item) => (
                                            <TrainingItem key={item.id} item={item} />
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
