import 'bootstrap/dist/css/bootstrap.css';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Switch, Route } from 'react-router-dom';

import { FetchUserData } from './store/hooks';
import Navbar from './navbar/navbar.container';
import Notifications from './displayComponents/notifications';
import AccessDenied from './accessDenied.component';
import WelcomePage from './welcomePage.component';
import Register from './register/register.component';
import Profile from './profile/profile.container';
import PasswordChange from './profile/passwordChange';
import Application from './application/application.component';
import routes from './routes';
import './style/styles.scss';

const EventApplications = ({ history }) => {
  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  FetchUserData();

  return (
    <div id="event-applications">
      <Navbar history={history}/>
      <section id="main-container">
        <Notifications />
        <div id="main-page" className="d-flex justify-content-center align-items-center">
          <div id="overlay" />
          <Switch >
            <Route exact path={routes.REGISTER} component={Register}/>
            <Route exact path={routes.PROFILE} component={Profile}/>
            <Route exact path={routes.PASSWORD} component={PasswordChange}/>
            <Route exact path={routes.APPLICATION} component={Application}/>
            <Route component={WelcomePage} />
          </Switch>
        </div>
      </section>
    </div>
  );
};

EventApplications.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

const App = () => (
  <Switch>
    <Route exact path={routes.ACCESS_DENIED} component={AccessDenied} />
    <Route component={EventApplications} />
  </Switch>
);

export default App;
