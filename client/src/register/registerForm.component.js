import React from 'react';
import { Form, Field } from 'formik';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import InputGroup from '../displayComponents/forms/inputGroupFormik';

const RegisterForm = ({
  dirty,
}) => (
  <Form>
    <Field
      name="firstName"
      placeholder="First Name"
      icon={{ iconName: 'user' }}
      component={InputGroup}
    />
    <Field
      name="lastName"
      placeholder="Last Name"
      icon={{ iconName: 'user' }}
      component={InputGroup}
    />
    <Field
      name="email"
      placeholder="Email"
      icon={{ iconName: 'envelope' }}
      component={InputGroup}
    />
    <Field
      name="password"
      type="password"
      placeholder="Password"
      icon={{ iconName: 'lock' }}
      component={InputGroup}
    />
    <Field
      name="confirmPassword"
      type="password"
      placeholder="Confirm Password"
      icon={{ iconName: 'lock' }}
      component={InputGroup}
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
