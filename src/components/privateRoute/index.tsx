import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom';

import {useFirebase} from '../../firebase'

const PrivateRoute = ({children, ...restProps} : RouteProps) => {
    const {user} = useFirebase()
    return (
        <Route {...restProps}>
            {user !== null ? children : <Redirect to='/'/>}
        </Route>
    )
}

export default PrivateRoute
