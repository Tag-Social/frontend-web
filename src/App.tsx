import React  from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Navbar, PrivateRoute, PublicRoute } from './components';
import Home from './routes/Home'
import Dashboard from './routes/Dashboard';
import UserProfile from './routes/UserProfile';
import EditProfile from './routes/EditProfile';
import Login from './routes/Login';
import Register from './routes/Register';
import PasswordReset from './routes/PasswordReset';
import NotFound404 from './routes/NotFound404';
import { HOME, LOGIN, REGISTER, DASHBOARD, PASSWORD_RESET, PROFILE } from './routes/routePaths'

const App = () => (
  <Router>
    <Navbar/>
    <main style={{ paddingTop: '6rem' }}>
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
        <PrivateRoute exact path={PROFILE}>
          <EditProfile />
        </PrivateRoute>
        <Route path={`${PROFILE}/:profileId`}>
          <UserProfile />
        </Route>
        <Route path='*'>
          <NotFound404 />
        </Route>
      </Switch>
    </main>
  </Router>
)

export default App;
