import React from 'react';
import { Form, Field } from 'formik';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import Input from '../displayComponents/forms/inputFormik';

const RegisterForm = ({
  dirty,
}) => (
  <Form>
    <Field
      label="First name"
      name="firstName"
      placeholder="First Name"
      component={Input}
    />
    <Field
      label="Last name"
      name="lastName"
      placeholder="Last Name"
      component={Input}
    />
    <Field
      label="Email"
      name="email"
      placeholder="Email"
      component={Input}
    />
    <Button
      type="submit"
      block
      variant="outline-success"
      disabled={!dirty}
    >
      Submit
    </Button>
  </Form>
);

RegisterForm.propTypes = {
  dirty: PropTypes.bool.isRequired,
};

export default RegisterForm;
