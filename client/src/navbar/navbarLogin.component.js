import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { NavDropdown, Button } from 'react-bootstrap';
import { userSchemas } from '@common-packages/validators';

import { Routes } from '../routes';
import Input from '../displayComponents/forms/inputFormik';

const login = {
  email: '',
  password: '',
};

const LoginForm = ({
  dirty,
}) => (
  <Form>
    <Field
      label="Email"
      name="email"
      placeholder="Email"
      component={Input}
    />
    <Field
      label="Password"
      name="password"
      type="password"
      placeholder="Password"
      component={Input}
    />
    <Button
      type="submit"
      block
      variant="primary"
      disabled={!dirty}
    >
      Login
    </Button>
  </Form>
);

LoginForm.propTypes = {
  dirty: PropTypes.bool.isRequired,
};

const NavbarLogin = ({ handleUserLogin }) => (
  <NavDropdown
    id="navbarLogin"
    title="Login/Register"
  >
    <div className="px-4 py-3">
      <Formik
        initialValues={login}
        validationSchema={userSchemas.loginUserSchema}
        component={LoginForm}
        onSubmit={handleUserLogin}
      />
    </div>
    <NavDropdown.Divider />
    <Link className="dropdown-item" to={Routes.REGISTER}>New around here? Register!</Link>
  </NavDropdown>
);

NavbarLogin.propTypes = {
  handleUserLogin: PropTypes.func.isRequired,
};

export default NavbarLogin;
