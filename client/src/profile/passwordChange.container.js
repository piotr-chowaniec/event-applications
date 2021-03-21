import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { userSchemas } from '@common-packages/validators';

import routes from '../routes';
import { userDataSelector, userDisplayNameSelector } from '../store/user/selectors';
import { userPropTypes } from '../shared/propTypes';
import Loading from '../displayComponents/loading/loading.component';


import PasswordChangeForm from './passwordChangeForm.component';
import { useUpdatePassword } from './api/hooks';

const initialPassword = {
  password: '',
  confirmPassword: '',
};

const PasswordChange = ({
  history,

  user,
  userDisplayName,
}) => {
  const { call: updatePassword, isLoading } = useUpdatePassword();

  const onPasswordUpdate = useCallback(async values => {
    await updatePassword({ ...values, userId: user.id });
    history.push(routes.PROFILE.PATH);
  }, [updatePassword, history, user.id]);

  return (
    <div id="page-content" className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-5">
          <div className="card text-center my-4">
            <div className="card-body">
              <Loading isLoading={isLoading} />
              <h3 className="card-title my-3">
                {userDisplayName}
              </h3>
              <p><code className="text-muted">Change your password</code></p>
              <div className="text-left">
                <Formik
                  initialValues={initialPassword}
                  validationSchema={userSchemas.updatePasswordSchema}
                  component={PasswordChangeForm}
                  onSubmit={onPasswordUpdate}
                  enableReinitialize
                />
                <Link
                  to={routes.PROFILE.PATH}
                  className="btn btn-block btn-outline-danger my-3"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PasswordChange.propTypes = ({
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),

  user: userPropTypes,
  userDisplayName: PropTypes.string.isRequired,
});

export default connect(
  state => ({
    user: userDataSelector(state),
    userDisplayName: userDisplayNameSelector(state),
  }),
  null,
)(PasswordChange);
