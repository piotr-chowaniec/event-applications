import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { userSchemas } from '@common-packages/validators';

import FaIcon from '../displayComponents/faIcon/faIcon.component';

import RegisterForm from './registerForm.component';
import { useRegister } from './apiHooks/useRegister';

const newAccount = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {
  const [registerUser] = useRegister();
  const submitRegisterForm = useCallback(async values => {
    await registerUser(values);
  }, [registerUser]);

  return (
    <div id="page-content" className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-5">
          <div className="card text-center my-4">
            <div className="card-body">
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

export default Register;
