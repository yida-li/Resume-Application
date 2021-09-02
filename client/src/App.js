import React, { Fragment } from 'react';

import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Home from './components/pages/Home';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layout/Alerts';
const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar></Navbar>

              <div className='container'>
                <Alerts />
                <Switch>
                  <Route exact path='/' component={Home}></Route>
                  <Route exact path='/register' component={Register}></Route>
                  <Route exact path='/about' component={About} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
