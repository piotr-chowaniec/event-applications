import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import { FetchUserData } from './store/hooks';
import Navbar from './navbar/navbar.component';
import Notifications from './displayComponents/notifications';
import Register from './register/register.component';
import WelcomePage from './welcomePage.component';
import AccessDenied from './accessDenied.component';
import { Routes } from './routes';
import './style/styles.scss';

const Application = ({ history }) => {
  FetchUserData();

  return (
    <div id="event-applications">
      <Navbar history={history}/>
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
};

Application.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

const App = () => (
  <Switch>
    <Route exact path={Routes.ACCESS_DENIED} component={AccessDenied} />
    <Route component={Application} />
  </Switch>
);

export default App;
