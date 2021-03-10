import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'formik';
import { Button } from 'react-bootstrap';

import Input from '../displayComponents/forms/inputFormik';

const NavbarLoginForm = ({
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

NavbarLoginForm.propTypes = {
  dirty: PropTypes.bool.isRequired,
};

export default NavbarLoginForm;
