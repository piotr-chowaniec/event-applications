import 'bootstrap/dist/css/bootstrap.css';

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Switch, Route } from 'react-router-dom';

import Navbar from './navbar/navbar.container';
import Notifications from './displayComponents/notifications';
import WelcomePage from './welcomePage.component';
import Register from './register/register.component';
import Profile from './profile/profile.container';
import PasswordChange from './profile/passwordChange.container';
import Application from './application/application.component';
import Applications from './application/applications.component';
import ApplicationEdit from './application/applicationEdit.component';
import Users from './users/users.component';
import UserEdit from './users/userEdit.component';
import AdminRoute from './shared/authorization/adminRoute';
import AuthenticatedRoute from './shared/authorization/authenticatedRoute';
import AccessDenied from './shared/authorization/accessDenied.component';
import fetchUserData from './shared/hooks/fetchUserData.hook';
import routes from './routes';
import './style/styles.scss';

const EventApplications = ({ history }) => {
  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  fetchUserData();

  return (
    <div id="event-applications">
      <Navbar history={history}/>
      <section id="main-container">
        <Notifications />
        <div id="main-page" className="d-flex justify-content-center align-items-center">
          <div id="overlay" />
          <Switch >
            <Route exact path={routes.REGISTER.PATH} component={Register}/>
            <AuthenticatedRoute exact path={routes.PROFILE.PATH} component={Profile}/>
            <AuthenticatedRoute exact path={routes.PASSWORD.PATH} component={PasswordChange}/>
            <AuthenticatedRoute exact path={routes.APPLICATION.PATH} component={Application}/>
            <AuthenticatedRoute exact path={routes.APPLICATION_EDIT.PATH} component={ApplicationEdit}/>
            <AdminRoute exact path={routes.APPLICATIONS.PATH} component={Applications}/>
            <AdminRoute exact path={routes.USERS.PATH} component={Users}/>
            <AdminRoute exact path={routes.USER_EDIT.PATH} component={UserEdit}/>
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
