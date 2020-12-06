import React  from 'react';
import { BrowserRouter as Router, Switch, } from "react-router-dom";
import {Container} from '@material-ui/core'

import { Navbar, PrivateRoute, PublicRoute } from './components';
import Home from './routes/Home'
import Login from './routes/Login';
import Register from './routes/Register';
import Dashboard from './routes/Dashboard';
import { HOME, LOGIN, REGISTER, DASHBOARD } from './routes/routePaths'

const App = () => (
  <Router>
    <Navbar/>
    <Container style={{marginTop: '5rem'}}>
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
        <PrivateRoute exact path={DASHBOARD}>
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </Container>
  </Router>
)

export default App;
