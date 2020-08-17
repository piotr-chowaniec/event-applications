import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './navbar/navbar.component';
import Notifications from './displayComponents/notifications';
import Register from './register/register.component';
import WelcomePage from './welcomePage.component';
import { Routes } from './routes';
import './style/styles.scss';

const App = () => (
  <div id="event-applications">
    <Navbar />
    <section id="main-container">
      <Notifications />
      <div id="main-page" className="d-flex justify-content-center align-items-center">
        <div id="overlay" />
        <Switch >
          <Route
            exact
            path={Routes.REGISTER}
            component={Register}
          />
          <Route component={WelcomePage} />
        </Switch>
      </div>
    </section>
  </div>
);

export default App;
