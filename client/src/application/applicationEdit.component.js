import React, { useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Button } from 'react-bootstrap';
import { applicationSchema } from '@common-packages/validators';

import { transformToDate } from '../displayComponents/formatters';
import Loading from '../displayComponents/loading/loading.component';

import ApplicationForm from './applicationForm.component';
import { useFetchApplication, useUpdateApplication } from './api/hooks';

const ApplicationEdit = ({
  history,
  match,
}) => {
  const { applicationId } = match.params;
  const {
    call: fetchApplication,
    isLoading: isFetchingApplication,
    status: { data: application },
  } = useFetchApplication();
  const {
    call: updateApplication,
    isLoading: isUpdatingApplication,
  } = useUpdateApplication();

  useEffect(() => {
    fetchApplication({ applicationId });
  }, [fetchApplication, applicationId]);

  const onApplicationEdit = useCallback(async values => {
    await updateApplication({ ...values, applicationId });
    history.goBack();
  }, [updateApplication, history, applicationId]);

  const onBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const initialValues = useMemo(() => (
    application?.eventDate
      ? {
        eventDate: transformToDate(application?.eventDate, 'yyyy-MM-dd'),
      }
      : {
        eventDate: '',
      }
  ), [application]);

  const isLoading = isFetchingApplication || isUpdatingApplication;

  return (
    <div id="page-content" className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-5">
          <div className="card text-center my-4">
            <div className="card-body">
              <Loading isLoading={isLoading} />
              <h3 className="card-title my-3">Edit Event Application</h3>
              <div className="text-left">
                {application?.id && <Formik
                  initialValues={initialValues}
                  validationSchema={applicationSchema}
                  component={ApplicationForm}
                  onSubmit={onApplicationEdit}
                  enableReinitialize
                />}
              </div>
              <Button
                block
                variant="outline-danger"
                className="my-3"
                onClick={onBack}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ApplicationEdit.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      applicationId: PropTypes.string.isRequired,
    }),
  }),
};

export default ApplicationEdit;
