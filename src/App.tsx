import React  from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@material-ui/core'

import { theme } from './materialUI/theme'
import { Navigation, PrivateRoute, PublicRoute } from './containers';
import {
    Home,
    Dashboard,
    Profiles,
    Login,
    Register,
    PasswordReset,
    Messaging,
    Connections,
    NotFound404,
} from './routes';
import {
    HOME,
    LOGIN,
    REGISTER,
    DASHBOARD,
    PASSWORD_RESET,
    PROFILES,
    MESSAGING,
    CONNECTIONS,
} from './routes/routePaths';

const App = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
            <Navigation />
            <main style={{ paddingTop: '4.3rem' }}>
                <Switch>
                    <PublicRoute exact path={HOME}>
                        <Home />
                    </PublicRoute>
                    <PublicRoute exact path={LOGIN}>
                        <Login />
                    </PublicRoute>
                    <PublicRoute exact path={REGISTER}>
                        <Register />
                    </PublicRoute>
                    <PublicRoute exact path={PASSWORD_RESET}>
                        <PasswordReset />
                    </PublicRoute>
                    <PrivateRoute exact path={DASHBOARD}>
                        <Dashboard />
                    </PrivateRoute>
                    <PrivateRoute exact path={CONNECTIONS}>
                        <Connections />
                    </PrivateRoute>
                    <PrivateRoute path={MESSAGING}>
                        <Messaging />
                    </PrivateRoute>
                    <Route path={`${PROFILES}/:profileId`}>
                        <Profiles />
                    </Route>
                    <Route path='*'>
                        <NotFound404 />
                    </Route>
                </Switch>
            </main>
        </Router>
    </ThemeProvider>
);

export default App;
