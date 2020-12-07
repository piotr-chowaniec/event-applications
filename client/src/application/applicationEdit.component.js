import React, { useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { applicationSchema } from '@common-packages/validators';
import { parseISO, format } from 'date-fns';

import routes from '../routes';
import { useFetchApplication, useUpdateApplication } from '../store/hooks';

import ApplicationForm from './applicationForm.component';

const ApplicationEdit = ({
  history,
}) => {
  const { call: fetchApplication, status: { data: application } } = useFetchApplication();
  const { call: updateApplication } = useUpdateApplication();

  useEffect(() => {
    fetchApplication();
  }, [fetchApplication]);

  const onApplicationEdit = useCallback(async values => {
    await updateApplication(values);
    history.push(routes.APPLICATION.PATH);
  }, [history, updateApplication]);

  const initialValues = useMemo(() => (
    application?.eventDate
      ? {
        eventDate: format(parseISO(application?.eventDate), 'yyyy-MM-dd'),
      }
      : {
        eventDate: '',
      }
  ), [application]);


  return (
    <div id="page-content" className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-5">
          <div className="card text-center my-4">
            <div className="card-body">
              <h3 className="card-title my-3">Edit your Event Application</h3>
              <div className="text-left">
                {application?.id && <Formik
                  initialValues={initialValues}
                  validationSchema={applicationSchema}
                  component={ApplicationForm}
                  onSubmit={onApplicationEdit}
                  enableReinitialize
                />}
              </div>
              <Link
                to={routes.APPLICATION.PATH}
                className="btn btn-block btn-outline-danger my-3"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ApplicationEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default ApplicationEdit;
