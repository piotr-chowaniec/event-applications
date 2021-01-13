import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import routes from '../routes';
import { userDataSelector, userDisplayNameSelector } from '../store/user/selectors';
import { userPropTypes } from '../shared/propTypes';
import useModal from '../shared/hooks/useModal.hook';
import { transformToDate } from '../displayComponents/formatters';

import { useDeleteApplication } from './api/hooks';

const ModalBody = (
  <>
    <h5>Dear User. Be careful.</h5>
    <p>
      Are you sure you want to remove your Event Application?
    </p>
  </>
);

const ApplicationCurrent = ({
  application,
  fetchApplication,

  user,
  userDisplayName,
}) => {
  const { Modal, showModal } = useModal();
  const { call: deleteApplication } = useDeleteApplication();

  const onApplicationRemove = useCallback(async () => {
    await deleteApplication({ applicationId: application?.id });
    await fetchApplication();
  }, [deleteApplication, fetchApplication, application]);

  return (
    <>
      <h3 className="card-title my-3">{`Welcome ${userDisplayName}`}</h3>
      <p><code className="text-muted">Your Event Application details</code></p>
      <div className="text-left">
        <dl className="row">
          <dt className="col-sm-4">First Name</dt>
          <dd className="col-sm-8">{user.firstName}</dd>

          <dt className="col-sm-4">Last Name</dt>
          <dd className="col-sm-8">{user.lastName}</dd>

          <dt className="col-sm-4">Email</dt>
          <dd className="col-sm-8">{user.email}</dd>

          <dt className="col-sm-4">Event Date</dt>
          <dd className="col-sm-8">{transformToDate(application.eventDate)}</dd>

          <dt className="col-sm-4">Created at</dt>
          <dd className="col-sm-8">{transformToDate(application.createdAt)}</dd>
        </dl>
      </div>
      <Link
        to={routes.APPLICATION_EDIT.compileRoute({ applicationId: application?.id })}
        className="btn btn-block btn-outline-info my-3"
      >
        Edit Your Event Application
      </Link>
      <Button
        block
        className="my-3"
        variant="outline-danger"
        onClick={showModal}
        disabled={false}
      >
        Remove Your Event Application
      </Button>
      <Modal
        title="Remove Event Application"
        body={ModalBody}
        confirmButtonDescription="Remove Event Application"
        onConfirm={onApplicationRemove}
      />
    </>
  );
};

ApplicationCurrent.propTypes = {
  application: PropTypes.shape({
    id: PropTypes.string.isRequired,
    eventDate: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }),
  fetchApplication: PropTypes.func.isRequired,

  user: userPropTypes.isRequired,
  userDisplayName: PropTypes.string.isRequired,
};

export default connect(
  state => ({
    user: userDataSelector(state),
    userDisplayName: userDisplayNameSelector(state),
  }),
  null,
)(ApplicationCurrent);
