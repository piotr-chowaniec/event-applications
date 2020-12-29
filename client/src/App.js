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
import Applications from './application/applications.component';
import ApplicationEdit from './application/applicationEdit.component';
import Users from './users/users.component';
import UserEdit from './users/userEdit.component';
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
            <Route exact path={routes.REGISTER.PATH} component={Register}/>
            <Route exact path={routes.PROFILE.PATH} component={Profile}/>
            <Route exact path={routes.PASSWORD.PATH} component={PasswordChange}/>
            <Route exact path={routes.APPLICATION.PATH} component={Application}/>
            <Route exact path={routes.APPLICATIONS.PATH} component={Applications}/>
            <Route exact path={routes.APPLICATION_EDIT.PATH} component={ApplicationEdit}/>
            <Route exact path={routes.USERS.PATH} component={Users}/>
            <Route exact path={routes.USER_EDIT.PATH} component={UserEdit}/>
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
    <Route exact path={routes.ACCESS_DENIED.PATH} component={AccessDenied} />
    <Route component={EventApplications} />
  </Switch>
);

export default App;
