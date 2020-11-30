import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import { applicationSchema } from '@common-packages/validators';

import Input from '../displayComponents/forms/inputFormik';
import { useCreateApplication } from '../store/hooks';

const newApplication = {
  eventDate: '',
};

const NewApplicationForm = ({
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

NewApplicationForm.propTypes = {
  dirty: PropTypes.bool.isRequired,
};

const NewApplication = ({
  fetchApplication,
}) => {
  const { call: createApplication } = useCreateApplication();

  const onApplicationCreate = useCallback(async values => {
    await createApplication(values);
    await fetchApplication();
  }, [createApplication, fetchApplication]);

  return (
    <>
      <h3 className="card-title my-3">Create new Event Application</h3>
      <div className="text-left">
        <Formik
          initialValues={newApplication}
          validationSchema={applicationSchema}
          component={NewApplicationForm}
          onSubmit={onApplicationCreate}
        />
      </div>
    </>
  );
};

NewApplication.propTypes = {
  fetchApplication: PropTypes.func.isRequired,
};

export default NewApplication;
