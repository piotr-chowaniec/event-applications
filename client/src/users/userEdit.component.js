import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import { userSchemas } from '@common-packages/validators';

import { useFetchUserData, useUpdateUser, useDeleteUser } from '../store/hooks';
import Input from '../displayComponents/forms/inputFormik';
import Select from '../displayComponents/forms/selectFormik';
import useModal from '../shared/hooks/useModal';
import { getUserDisplayName } from '../shared/utils';

import { userRolesOptions } from './constants';

const initialUser = {
  firstName: '',
  lastName: '',
  email: '',
};

const ModalBody = (
  <>
    <h5>Dear Administrator. Be careful.</h5>
    <p>
      Are you sure you want to remove that user?
      User removal can&apos;t be undone.
    </p>
  </>
);

const UserEditForm = ({
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
    <Field
      label="Role"
      name="role"
      component={Select}
      options={userRolesOptions}
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

UserEditForm.propTypes = {
  dirty: PropTypes.bool.isRequired,
};

const UserEdit = ({
  history,
  match,
}) => {
  const { userId } = match.params;
  const { Modal, showModal } = useModal();
  const { call: fetchUserData, status: { data: user } } = useFetchUserData();
  const { call: updateUser } = useUpdateUser();
  const { call: deleteUser } = useDeleteUser();

  const onFetchUserData = useCallback(async () => {
    fetchUserData({ userId });
  }, [fetchUserData, userId]);

  useEffect(() => {
    onFetchUserData();
  }, [onFetchUserData]);

  const onUserUpdate = useCallback(async values => {
    await updateUser({ ...values, userId });
    history.goBack();
  }, [updateUser, history, userId]);

  const onUserRemove = useCallback(async () => {
    await deleteUser({ userId });
    history.goBack();
  }, [deleteUser, history, userId]);

  const onBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <div id="page-content" className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-5">
          <div className="card text-center my-4">
            <div className="card-body">
              <h3 className="card-title my-3">
                {getUserDisplayName(user)}
              </h3>
              <p><code className="text-muted">Change user data</code></p>
              <div className="text-left">
                <Formik
                  initialValues={user?.id ? user : initialUser}
                  validationSchema={userSchemas.updateUserSchema}
                  component={UserEditForm}
                  onSubmit={onUserUpdate}
                  enableReinitialize
                />
                <Button
                  block
                  variant="outline-warning"
                  className="my-3"
                  onClick={onBack}
                >
                  Cancel
                </Button>
                <Button
                  block
                  className="my-3"
                  variant="outline-danger"
                  onClick={showModal}
                >
                  Remove Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Remove User"
        body={ModalBody}
        confirmButtonDescription="Remove User permanently"
        onConfirm={onUserRemove}
      />
    </div>
  );
};

UserEdit.propTypes = ({
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }),
  }),
});

export default UserEdit;
