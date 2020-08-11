import React from 'react';
import { Form, Field } from 'formik';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const RegisterForm = ({
  dirty,
}) => (
  <Form>
    <Field
      name="firstName"
      placeholder="First Name"
    />
    <Field
      name="lastName"
      placeholder="Last Name"
    />
    <Field
      name="email"
      placeholder="Email"
    />
    <Field
      name="password"
      type="password"
      placeholder="Password"
    />
    <Field
      name="confirmPassword"
      type="password"
      placeholder="Confirm Password"
    />
    <Button
      type="submit"
      block
      variant="outline-success"
      disabled={!dirty}
    >
      Register!
    </Button>
  </Form>
);

RegisterForm.propTypes = {
  dirty: PropTypes.bool.isRequired,
};

export default RegisterForm;
