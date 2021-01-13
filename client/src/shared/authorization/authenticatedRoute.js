import React from 'react';

import { userPropTypes } from '../../shared/propTypes';
import { userRoles } from '../../shared/constants';

import withUserData from './withUserDataHoc.container';
import ProtectedRoute from './protectedRoute.component';

const AuthenticatedRoute = ({
  user,
  ...props
}) => {
  const isAccessDenied = !Object.values(userRoles).includes(user?.role);

  return <ProtectedRoute isAccessDenied={isAccessDenied} {...props} />;
};

AuthenticatedRoute.propTypes = {
  user: userPropTypes,
};

export default withUserData(AuthenticatedRoute);


