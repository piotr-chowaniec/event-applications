import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { userDataSelector, userDisplayNameSelector } from '../../store/user/selectors';
import { userPropTypes } from '../../shared/propTypes';

const withUserData = WrappedComponent => {
  const UserDataProvider = ({ user, userDisplayName, ...rest }) => (
    <WrappedComponent
      user={user}
      userDisplayName={userDisplayName}
      {...rest}
    />
  );

  UserDataProvider.propTypes = {
    user: userPropTypes,
    userDisplayName: PropTypes.string.isRequired,
  };

  return connect(
    state => ({
      user: userDataSelector(state),
      userDisplayName: userDisplayNameSelector(state),
    }),
  )(UserDataProvider);
};

export default withUserData;
