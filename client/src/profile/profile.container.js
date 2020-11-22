import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { userSchemas } from '@common-packages/validators';

import routes from '../routes';
import { setUserData } from '../store/user/actions';
import { userDataSelector } from '../store/user/selectors';
import { useFetchUserData, useUpdateProfile } from '../store/hooks';
import { userPropTypes } from '../shared/propTypes';
import Input from '../displayComponents/forms/inputFormik';

const initialUser = {
  firstName: '',
  lastName: '',
  email: '',
};

const ProfileForm = ({
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

ProfileForm.propTypes = {
  dirty: PropTypes.bool.isRequired,
};

const Profile = ({
  user,
  setUserData,
}) => {
  const { call: fetchUserData } = useFetchUserData();
  const { call: updateProfile } = useUpdateProfile();

  const onFetchUserData = useCallback(async () => {
    const userData = await fetchUserData();
    setUserData(userData);
  }, [fetchUserData, setUserData]);

  useEffect(() => {
    onFetchUserData();
  }, [onFetchUserData]);

  const onUserUpdate = useCallback(async values => {
    await updateProfile(values);
    await onFetchUserData();
  }, [updateProfile, onFetchUserData]);

  return (
    <div id="page-content" className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-5">
          <div className="card text-center my-4">
            <div className="card-body">
              <h3 className="card-title my-3">
                {`${user.firstName} ${user.lastName} Profile Page`}
              </h3>
              <p><code className="text-muted">Change your profile data</code></p>
              <div className="text-left">
                <Formik
                  initialValues={user?.id ? user : initialUser}
                  validationSchema={userSchemas.updateProfileSchema}
                  component={ProfileForm}
                  onSubmit={onUserUpdate}
                  enableReinitialize
                />
                <Link
                  to={routes.PASSWORD}
                  className="btn btn-block btn-outline-warning my-3"
                >
                  Change Password
                </Link>
                <Button
                  block
                  variant="outline-danger"
                  className="my-3"
                >
                  Remove Your Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = ({
  user: userPropTypes,
  setUserData: PropTypes.func.isRequired,
});

export default connect(
  state => ({
    user: userDataSelector(state),
  }),
  {
    setUserData,
  },
)(Profile);
