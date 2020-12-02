import React, { ReactNode } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom';

import {useFirebase} from '../../firebase'

interface IProps extends RouteProps {
    children: ReactNode
}

const PrivateRoute = ({children, ...restProps} : IProps) => {
    const {user} = useFirebase()
    return (
        <Route {...restProps}>
            {user !== null ? children : <Redirect to='/'/>}
        </Route>
    )
}

export default PrivateRoute
