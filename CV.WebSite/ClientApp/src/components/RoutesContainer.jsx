import React, { Suspense } from 'react';
import { withRouter } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import Loading from './Loading';
import { Routes } from './Routes';
import './RoutesContainer.css';

function RoutesContainer({ location, history }) {
     return (
        <TransitionGroup className="transition-group">
            <Suspense fallback={<Loading />}>
                <section className="route-section">
                     <Routes location={location} history={history} />
                </section>
            </Suspense>
        </TransitionGroup>
    );
}

export default withRouter(RoutesContainer);