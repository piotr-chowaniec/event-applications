import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'formik';
import { Button } from 'react-bootstrap';

import InputGroup from '../displayComponents/forms/inputGroupFormik';

const PasswordChangeForm = ({
  dirty,
}) => (
  <Form>
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
      Change Password
    </Button>
  </Form>
);

PasswordChangeForm.propTypes = {
  dirty: PropTypes.bool.isRequired,
};

export default PasswordChangeForm;
