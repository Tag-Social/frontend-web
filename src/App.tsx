import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RootStateOrAny, useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

import { theme } from './materialUI/theme';
import {
    Navigation,
    PrivateRoute,
    PublicRoute,
    Onboarding,
} from './containers';
import {
    Home,
    Dashboard,
    Profiles,
    Login,
    Register,
    PasswordReset,
    Messaging,
    Connections,
    Account,
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
    MY_ACCOUNT,
} from './routes/routePaths';

const App = () => {
    const profile = useSelector(
        ({ firebase: { profile } }: RootStateOrAny) => profile
    );
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Navigation />
                {profile.isLoaded && profile.onboarded === false ? (
                    <Onboarding />
                ) : (
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
                            <PrivateRoute path={MY_ACCOUNT}>
                                <Account />
                            </PrivateRoute>
                            <Route path={`${PROFILES}/:profileId`}>
                                <Profiles />
                            </Route>
                            <Route path='*'>
                                <NotFound404 />
                            </Route>
                        </Switch>
                    </main>
                )}
            </Router>
        </ThemeProvider>
    );
};

export default App;
