import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

import { Routes } from '../routes';

import NavbarLogin from './navbarLogin.component';
import { useLogin } from './apiHooks/useLogin';

const renderNavbarButtons = () => null;

const MenuNavbar = () => {
  const [loginUser] = useLogin();
  const handleUserLogin = useCallback(async values => {
    await loginUser(values);
  }, [loginUser]);

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
            <NavbarLogin
              handleUserLogin={handleUserLogin}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MenuNavbar;
