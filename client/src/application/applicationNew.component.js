import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { applicationSchema } from '@common-packages/validators';

import ApplicationForm from './applicationForm.component';
import { useCreateApplication } from './api/hooks';

const newApplication = {
  eventDate: '',
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
          component={ApplicationForm}
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
