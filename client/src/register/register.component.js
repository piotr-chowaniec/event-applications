import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { userSchemas } from '@common-packages/validators';

import routes from '../routes';
import FaIcon from '../displayComponents/faIcon/faIcon.component';
import { setUserData } from '../store/user/actions';
import { useFetchProfileData } from '../shared/api/hooks';
import Loading from '../displayComponents/loading/loading.component';

import RegisterForm from './registerForm.component';
import { useRegister } from './api/hooks';

const newAccount = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register = ({ history }) => {
  const dispatch = useDispatch();
  const {
    call: registerUser,
    isLoading: isRegistering,
  } = useRegister();
  const {
    call: fetchProfileData,
    isLoading: isFetchingProfile,
  } = useFetchProfileData();

  const submitRegisterForm = useCallback(async values => {
    await registerUser(values);
    const userData = await fetchProfileData();
    dispatch(setUserData(userData));
    history.push(routes.APPLICATION.PATH);
  }, [registerUser, fetchProfileData, dispatch, history]);

  const isLoading = isRegistering || isFetchingProfile;

  return (
    <div id="page-content" className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-5">
          <div className="card text-center my-4">
            <div className="card-body">
              <Loading isLoading={isLoading} />
              <FaIcon
                icon="user"
                size={100}
              />
              <h2 className="card-title my-3">Register</h2>
              <Formik
                initialValues={newAccount}
                validationSchema={userSchemas.registerUserSchema}
                component={RegisterForm}
                onSubmit={submitRegisterForm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default Register;
