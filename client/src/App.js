import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './navbar';
import WelcomePage from './welcomePage';
import './style/styles.scss';

const App = () => (
  <div id="event-applications">
    <Navbar />
    <section id="main-container">
      <div id="main-page" className="d-flex justify-content-center align-items-center">
        <div id="overlay" />
        <Switch >
          <Route component={WelcomePage} />
        </Switch>
      </div>
    </section>
  </div>
);

export default App;
