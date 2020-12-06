import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { RootStateOrAny, useSelector } from 'react-redux';

import { HOME } from '../../routes/routePaths'

const PrivateRoute = ({ children, ...restProps }: RouteProps) => {
    const auth = useSelector((state: RootStateOrAny) => state.firebase.auth);
    return (
        <Route {...restProps}>
            {!isEmpty(auth) ? children : <Redirect to={HOME} />}
        </Route>
    );
}

export default PrivateRoute
