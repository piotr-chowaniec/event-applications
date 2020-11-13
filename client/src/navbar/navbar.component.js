import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

import { Routes } from '../routes';
import { setUserData } from '../store/user/actions';
import { userDataSelector } from '../store/user/selectors';
import { addSuccessNotification } from '../store/notifications/actions';
import { useLogin, useFetchUserData } from '../store/hooks';
import { resetToken } from '../utils/fetchService/tokenUtils';

import NavbarLogin from './navbarLogin.component';
import NavbarAuthenticated from './navbarAuthenticated.component';
import { userPropTypes } from './propTypes';

const renderNavbarButtons = () => null;

const MenuNavbar = ({
  history,

  user,
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
    history.push(Routes.MAIN);
  }, [setUserData, addSuccessNotification, history]);

  const renderUserDropdown = useCallback(() => (
    user?.id
      ? <NavbarAuthenticated handleUserLogout={handleUserLogout} user={user}/>
      : <NavbarLogin handleUserLogin={handleUserLogin}/>
  ), [handleUserLogin, handleUserLogout, user]);

  return (
    <Navbar bg="light" variant="light" expand="lg" fixed="top">
      <Container>
        <Link
          to={Routes.MAIN}
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
  setUserData: PropTypes.func.isRequired,
  addSuccessNotification: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    user: userDataSelector(state),
  }),
  {
    setUserData,
    addSuccessNotification,
  },
)(MenuNavbar);
