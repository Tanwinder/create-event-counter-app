import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/Auth/privateRoute'

import EventsPage from './components/Events/EventsPage';
import Auth from './components/Auth/Auth';
import UploadImages from './components/UploadImages/UploadImages'

const routesArr = () => ([
        {
            path: '/',
            component: EventsPage,
            exact: true
        },
        {
            path: '/events',
            component: EventsPage,
            exact: false
        },
        {
            path: '/login',
            component: Auth,
            exact: false
        },
        {
            path: '/counter',
            component: () => <h1>Counter Placeholder</h1>,
            exact: false,
            privatePath: true
        },
        {
            path: '/Employess',
            component: () => <h1>Employees Placeholder</h1>,
            exact: false,
            privatePath: true
        },
        {
            path: '/uploadimages',
            component: UploadImages,
            exact: false,
            privatePath: true
        },
        {
            path: '*',
            component: () => <h1>Not Found</h1>,
            exact: false
        },
    ]);
export const navsArr = [
    {
        path: '/events',
        name: "Events"
    },
    {
        path: '/counter',
        name: "Counter"
    },
    {
        path: '/Employess',
        name: "Employees"
    },
    {
        path: '/uploadimages',
        name: "UploadImages"
    }
]
export default () => {
    return (
        <Switch>
            {
                routesArr && routesArr().map( route => {
                    if(route?.privatePath) {
                        return <PrivateRoute key={route.path} path={route.path} exact={route.exact} component={route.component} /> 
                    }
                    return <Route key={route.path} path={route.path} exact={route.exact} component={route.component} />;
                })
            }
        </Switch>
    )
}