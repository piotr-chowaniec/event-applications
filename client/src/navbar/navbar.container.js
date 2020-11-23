import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

import routes from '../routes';
import { setUserData } from '../store/user/actions';
import { userDataSelector, userDisplayNameSelector } from '../store/user/selectors';
import { addSuccessNotification } from '../store/notifications/actions';
import { useLogin, useFetchUserData } from '../store/hooks';
import { resetToken } from '../utils/fetchService/tokenUtils';
import { userPropTypes } from '../shared/propTypes';

import NavbarLogin from './navbarLogin.component';
import NavbarAuthenticated from './navbarAuthenticated.component';

const renderNavbarButtons = () => null;

const MenuNavbar = ({
  history,

  user,
  userDisplayName,
  setUserData,
  addSuccessNotification,
}) => {
  const { call: loginUser } = useLogin();
  const { call: fetchUserData } = useFetchUserData();

  const handleUserLogin = useCallback(async values => {
    await loginUser(values);
    const userData = await fetchUserData();
    setUserData(userData);
  }, [loginUser, fetchUserData, setUserData]);

  const handleUserLogout = useCallback(() => {
    resetToken();
    setUserData();
    addSuccessNotification('Successfully logged out');
    history.push(routes.MAIN);
  }, [setUserData, addSuccessNotification, history]);

  const renderUserDropdown = useCallback(() => (
    user?.id
      ? <NavbarAuthenticated handleUserLogout={handleUserLogout} userDisplayName={userDisplayName}/>
      : <NavbarLogin handleUserLogin={handleUserLogin}/>
  ), [handleUserLogin, handleUserLogout, user, userDisplayName]);

  return (
    <Navbar bg="light" variant="light" expand="lg" fixed="top">
      <Container>
        <Link
          to={routes.MAIN}
          className="navbar-brand mr-5"
        >
          Event<strong>Application</strong>
        </Link>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse
          id="main-navbar"
          className="justify-content-between"
        >
          <Nav>
            {renderNavbarButtons()}
          </Nav>
          <Nav>
            {renderUserDropdown()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

MenuNavbar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),

  user: userPropTypes,
  userDisplayName: PropTypes.string.isRequired,
  setUserData: PropTypes.func.isRequired,
  addSuccessNotification: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    user: userDataSelector(state),
    userDisplayName: userDisplayNameSelector(state),
  }),
  {
    setUserData,
    addSuccessNotification,
  },
)(MenuNavbar);
