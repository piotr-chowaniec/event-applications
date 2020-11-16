import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import { FetchUserData } from './store/hooks';
import Navbar from './navbar/navbar.container';
import Notifications from './displayComponents/notifications';
import AccessDenied from './accessDenied.component';
import WelcomePage from './welcomePage.component';
import Register from './register/register.component';
import Profile from './profile/profile.container';
import routes from './routes';
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
            <Route exact path={routes.REGISTER} component={Register}/>
            <Route exact path={routes.PROFILE} component={Profile}/>
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
    <Route exact path={routes.ACCESS_DENIED} component={AccessDenied} />
    <Route component={Application} />
  </Switch>
);

export default App;
