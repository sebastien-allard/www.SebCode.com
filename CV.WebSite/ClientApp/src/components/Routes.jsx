import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AzureAD } from 'react-aad-msal';
import { authProvider } from '../services/authProvider';
import { CSSTransition } from 'react-transition-group';


//import Home from './Home';
//import Technologies from './Technologies';
//import Jobs from './Jobs';
//import Trainings from './Trainings';
//import Contact from './Contact';
//import Logout from './Logout';
//import NotFound from './NotFound';
//import Admin from './Admin';
//import AdminJobs from './AdminJobs';
//import AdminTrainings from './AdminTrainings';

const
    Home = lazy(() => import('./Home')),
    Technologies = lazy(() => import('./Technologies')),
    Jobs = lazy(() => import('./Jobs')),
    Trainings = lazy(() => import('./Trainings')),
    Contact = lazy(() => import('./Contact')),
    Admin = lazy(() => import('./Admin')),
    AdminTechnologies = lazy(() => import('./AdminTechnologies')),
    AdminJobs = lazy(() => import('./AdminJobs')),
    AdminTrainings = lazy(() => import('./AdminTrainings')),
    Logout = lazy(() => import('./Logout')),
    NotFound = lazy(() => import('./NotFound'));



const routes = [
    { path: '/', Component: Home },
    { path: '/technologies', Component: Technologies },
    { path: '/experience', Component: Jobs },
    { path: '/formation', Component: Trainings },
    { path: '/joindre', Component: Contact },
    //{ path: '/admin', Component: Admin },
    //{ path: '*', Component: NotFound }
]

const adminRoutes = [
    { path: '/technologies', Component: AdminTechnologies },
    { path: '/experience', Component: AdminJobs },
    { path: '/formation', Component: AdminTrainings }
]


//export default class Routes extends Component {
//    static displayName = Routes.name;
//    render() {
//        return (
//            <Switch>
//                <Route exact path='/' component={Home} />
//                <Route path='/technologies' component={Technologies} />
//                <Route path='/experience' component={Jobs} />
//                <Route path='/formation' component={Trainings} />
//                <Route path='/joindre' component={Contact} />
//                <Route path="*" component={NotFound} />
//            </Switch>
//        );
//    }
//}


export const Routes = ({ location, history }) => (
    <Switch>
        {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
                {({ match }) => (
                    <CSSTransition timeout={300} in={match != null} classNames="page" unmountOnExit>
                        <Component history={history} location={location} />
                    </CSSTransition>
                )}
            </Route>
        ))}

        <Route key='/admin' path='/admin' render={({ match: { url } }) => (
            < >
                <Route key={`${url}`} exact path={`${url}`} >
                    {({ match }) => {
                        return (
                            <CSSTransition timeout={300} in={match != null} classNames="page" unmountOnExit>
                                <Admin history={history} location={location} />
                            </CSSTransition>
                        );
                    }}
                </Route>
                <AzureAD provider={authProvider}>
                    {adminRoutes.map(({ path, Component }) => (
                        <Route key={`${url}${path}`} path={`${url}${path}`}>
                            {({ match }) => {
                                return (
                                    <CSSTransition timeout={300} in={match != null} classNames="page" unmountOnExit>
                                        <Component history={history} location={location} />
                                    </CSSTransition>
                                );
                            }}
                        </Route>
                    ))}
                </AzureAD>
            </>
        )}>
        </Route>

        <Route key="/logout" exact path="/logout">
            {({ match }) => (
                <CSSTransition timeout={300} in={match != null} classNames="page" unmountOnExit>
                    <Logout history={history} location={location} />
                </CSSTransition>
            )}
        </Route>

        <Route key="*" exact path="*">
            {({ match }) => (
                <CSSTransition timeout={300} in={match != null} classNames="page" unmountOnExit>
                    <NotFound history={history} location={location} />
                </CSSTransition>
            )}
        </Route>

    </Switch>
)

// For sitemap-builder.js
export default (
    <Switch>
        {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path} component={Component} />
        ))}
    </Switch>
)
