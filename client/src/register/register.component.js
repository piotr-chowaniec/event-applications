import React, { useCallback } from 'react';
import { Formik } from 'formik';

import RegisterForm from './registerForm.component';

const newAccount = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {
  const submitRegisterForm = useCallback(async values => {
    console.log(values);
  }, []);

  return (
    <div id="page-content" className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-5">
          <div className="card text-center my-4">
            <div className="card-body">
              <p className="h3"><i className="fa fa-user fa-4x" /></p>
              <h2 className="card-title my-3">Register</h2>
              <Formik
                initialValues={newAccount}
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
