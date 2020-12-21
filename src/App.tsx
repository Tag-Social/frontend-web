import React  from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Navbar, PrivateRoute, PublicRoute } from './components';
import {
  Home,
  Dashboard,
  Profiles,
  EditProfile,
  Login,
  Register,
  PasswordReset,
  NotFound404
} from './routes'
import { HOME, LOGIN, REGISTER, DASHBOARD, PASSWORD_RESET, PROFILES, EDIT_PROFILE } from './routes/routePaths'

const App = () => (
  <Router>
    <Navbar/>
    <main style={{ paddingTop: '5.3rem' }}>
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
        <PrivateRoute exact path={EDIT_PROFILE}>
          <EditProfile />
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
)

export default App;
