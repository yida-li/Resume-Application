import React, { Fragment } from 'react';

import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import About from './components/pages/About';
import Home from './components/pages/Home';
import ContactState from './context/contact/ContactState';

const App = () => {
  return (
    <ContactState>
    <Router>
      <Fragment>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/about' component={About} />
            <Route exact path='/' component={Home} />
          </Switch>
        </div>
      </Fragment>
    </Router>
    </ContactState>
  );
};

export default App;
