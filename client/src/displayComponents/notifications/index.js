import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';

import { successNotification, errorNotification } from '../../store/notifications/selectors';
import { removeSuccessNotification, removeErrorNotification } from '../../store/notifications/actions';

import styles from './styles.module.scss';

const Notifications = ({
  successNotification,
  removeSuccessNotification,

  errorNotification,
  removeErrorNotification,
}) => (
  <div className={styles.alerts}>
    <Alert
      variant="success"
      show={successNotification}
      onClose={removeSuccessNotification}
      dismissible
    >
      {successNotification}
    </Alert>
    <Alert
      variant="danger"
      show={errorNotification}
      onClose={removeErrorNotification}
      dismissible
    >
      {errorNotification}
    </Alert>
  </div>
);

Notifications.propTypes = {
  successNotification: PropTypes.string,
  removeSuccessNotification: PropTypes.func.isRequired,

  errorNotification: PropTypes.string,
  removeErrorNotification: PropTypes.func.isRequired,
};


export default connect(
  state => ({
    successNotification: successNotification(state),
    errorNotification: errorNotification(state),
  }),
  {
    removeSuccessNotification,
    removeErrorNotification,
  },
)(Notifications);
