import React from 'react';
import { Form, Field } from 'formik';
import PropTypes from 'prop-types';

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
    <button
      type="submit"
      className="btn btn-block btn-outline-success"
      disabled={!dirty}
    >
      Register!
    </button>
  </Form>
);

RegisterForm.propTypes = {
  dirty: PropTypes.bool.isRequired,
};

export default RegisterForm;
