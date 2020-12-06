import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { RootStateOrAny, useSelector } from 'react-redux';

import { DASHBOARD } from '../../routes/routePaths'

const PublicRoute = ({ children, ...restProps }: RouteProps) => {
    const auth = useSelector((state: RootStateOrAny) => state.firebase.auth);
    return (
        <Route {...restProps}>
            {isLoaded(auth) && !isEmpty(auth) ? <Redirect to={DASHBOARD} /> : children}
        </Route>
    );
}

export default PublicRoute