import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { RootStateOrAny, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core'

import { useStyles } from './styles'
import { HOME } from '../../routes/routePaths';

const PrivateRoute = ({ children, ...restProps }: RouteProps) => {
    const auth = useSelector((state: RootStateOrAny) => state.firebase.auth);
    const classes = useStyles()
    return (
        <Route {...restProps}>
            {!isLoaded(auth) ? (
                <div className={classes.root}>
                    <CircularProgress />
                </div>
            ) : isLoaded(auth) && !isEmpty(auth) ? (
                children
            ) : (
                        <Redirect to={HOME} />
                    )}
        </Route>
    );
};

export default PrivateRoute;
