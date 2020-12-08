import React  from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import {Container} from '@material-ui/core'

import { Navbar, PrivateRoute, PublicRoute } from './components';
import Home from './routes/Home'
import Dashboard from './routes/Dashboard';
import Profile from './routes/Profile';
import Login from './routes/Login';
import Register from './routes/Register';
import PasswordReset from './routes/PasswordReset';
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
        <PrivateRoute path={PROFILE}>
          <Profile />
        </PrivateRoute>
      </Switch>
    </main>
  </Router>
)

export default App;
