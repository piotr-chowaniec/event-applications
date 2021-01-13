import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { NavDropdown } from 'react-bootstrap';
import { userSchemas } from '@common-packages/validators';

import routes from '../routes';

import NavbarLoginForm from './navbarLoginForm.component';

const login = {
  email: '',
  password: '',
};

const NavbarLogin = ({ handleUserLogin }) => (
  <NavDropdown
    alignRight
    id="navbarLogin"
    title="Login/Register"
  >
    <div className="px-4 py-3">
      <Formik
        initialValues={login}
        validationSchema={userSchemas.loginUserSchema}
        component={NavbarLoginForm}
        onSubmit={handleUserLogin}
      />
    </div>
    <NavDropdown.Divider />
    <Link className="dropdown-item" to={routes.REGISTER.PATH}>New around here? Register!</Link>
  </NavDropdown>
);

NavbarLogin.propTypes = {
  handleUserLogin: PropTypes.func.isRequired,
};

export default NavbarLogin;
