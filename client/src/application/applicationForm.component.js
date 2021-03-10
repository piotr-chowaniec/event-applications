import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Form, Field } from 'formik';

import Input from '../displayComponents/forms/inputFormik';

const ApplicationForm = ({
  dirty,
}) => (
  <Form>
    <Field
      name="eventDate"
      type="date"
      placeholder="Insert date"
      label="Choose event date you would like to participate"
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

ApplicationForm.propTypes = {
  dirty: PropTypes.bool.isRequired,
};

export default ApplicationForm;
