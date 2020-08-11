import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

import { Routes } from '../routes';

const MenuNavbar = () => (
  <Navbar bg="light" variant="light" expand="lg" fixed="top">
    <Container>
      <Link
        to={Routes.MAIN}
        className="navbar-brand mr-5"
      >
        Event<strong>Application</strong>
      </Link>
      <Navbar.Toggle aria-controls="main-navbar" />
      <Navbar.Collapse id="main-navbar">
        <Nav className="mr-auto" />
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default MenuNavbar;
