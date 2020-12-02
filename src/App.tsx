import React  from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Container} from '@material-ui/core'

import { Navbar, PrivateRoute } from './components';
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

const App = () => (
  <Router>
    <Navbar/>
    <Container style={{marginTop: '5rem'}}>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
        <PrivateRoute exact path='/dashboard'>
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </Container>
  </Router>
)

export default App;
