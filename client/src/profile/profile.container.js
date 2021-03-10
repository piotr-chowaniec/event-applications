import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { userSchemas } from '@common-packages/validators';

import routes from '../routes';
import { setUserData } from '../store/user/actions';
import { userDataSelector, userDisplayNameSelector } from '../store/user/selectors';
import { useFetchProfileData, useUpdateUser, useDeleteUser } from '../shared/api/hooks';
import { resetToken } from '../services/fetchService/tokenUtils';
import { userPropTypes } from '../shared/propTypes';
import Loading from '../displayComponents/loading.component';
import useModal from '../shared/hooks/useModal.hook';

import ProfileForm from './profileForm.component';

const initialUser = {
  firstName: '',
  lastName: '',
  email: '',
};

const ModalBody = (
  <>
    <h5>Dear User. Be careful.</h5>
    <p>
      Are you sure you want to remove your profile?
      Profile removal can&apos;t be undone.
    </p>
  </>
);

const Profile = ({
  history,

  user,
  userDisplayName,
  setUserData,
}) => {
  const { Modal, showModal } = useModal();
  const { call: fetchProfileData, isLoading: isFetchUserLoading } = useFetchProfileData();
  const { call: updateUser, isLoading: isUpdateProfileLoading } = useUpdateUser();
  const { call: deleteUser, isLoading: isDeleteProfileLoading } = useDeleteUser();

  const onFetchUserData = useCallback(async () => {
    const userData = await fetchProfileData();
    setUserData(userData);
  }, [fetchProfileData, setUserData]);

  useEffect(() => {
    onFetchUserData();
  }, [onFetchUserData]);

  const onUserUpdate = useCallback(async values => {
    await updateUser({ ...values, userId: user.id });
    await onFetchUserData();
  }, [updateUser, onFetchUserData, user.id]);

  const onProfileRemove = useCallback(async () => {
    await deleteUser({ userId: user.id });
    resetToken();
    setUserData();
    history.push(routes.MAIN.PATH);
  }, [deleteUser, setUserData, history, user.id]);

  const isLoading = isFetchUserLoading || isUpdateProfileLoading || isDeleteProfileLoading;
  const loadingMessage = useMemo(() => {
    if (isFetchUserLoading) {
      return 'Loading User data...';
    }
    if (isUpdateProfileLoading) {
      return 'Updating User data...';
    }
    if (isDeleteProfileLoading) {
      return 'Deleting User Data...';
    }
  }, [isFetchUserLoading, isUpdateProfileLoading, isDeleteProfileLoading]);

  return (
    <div id="page-content" className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-5">
          <div className="card text-center my-4">
            <div className="card-body">
              <Loading
                isLoading={isLoading}
                loadingMessage={loadingMessage}
              >
                <h3 className="card-title my-3">
                  {userDisplayName}
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
                    to={routes.PASSWORD.PATH}
                    className="btn btn-block btn-outline-warning my-3"
                  >
                    Change Password
                  </Link>
                  <Button
                    block
                    className="my-3"
                    variant="outline-danger"
                    onClick={showModal}
                    disabled={isLoading}
                  >
                    Remove Your Profile
                  </Button>
                </div>
              </Loading>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Remove Profile"
        body={ModalBody}
        confirmButtonDescription="Remove Profile permanently"
        onConfirm={onProfileRemove}
      />
    </div>
  );
};

Profile.propTypes = ({
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),

  user: userPropTypes,
  userDisplayName: PropTypes.string.isRequired,
  setUserData: PropTypes.func.isRequired,
});

export default connect(
  state => ({
    user: userDataSelector(state),
    userDisplayName: userDisplayNameSelector(state),
  }),
  {
    setUserData,
  },
)(Profile);
