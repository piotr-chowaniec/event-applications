import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { userSchemas } from '@common-packages/validators';

import routes from '../routes';
import { userDisplayNameSelector } from '../store/user/selectors';
import { useUpdatePassword } from '../store/hooks';
import InputGroup from '../displayComponents/forms/inputGroupFormik';

const initialPassword = {
  password: '',
  confirmPassword: '',
};

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

const PasswordChange = ({
  history,
  userDisplayName,
}) => {
  const { call: updatePassword } = useUpdatePassword();

  const onPasswordUpdate = useCallback(async values => {
    await updatePassword(values);
    history.push(routes.PROFILE.PATH);
  }, [updatePassword, history]);

  return (
    <div id="page-content" className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-5">
          <div className="card text-center my-4">
            <div className="card-body">
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
  userDisplayName: PropTypes.string.isRequired,
});

export default connect(
  state => ({
    userDisplayName: userDisplayNameSelector(state),
  }),
  null,
)(PasswordChange);
