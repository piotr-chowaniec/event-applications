import React from 'react';

import { userPropTypes } from '../../shared/propTypes';
import { userRoles } from '../../shared/constants';

import withUserData from './withUserDataHoc.container';
import ProtectedRoute from './protectedRoute.component';

const AdminRoute = ({
  user,
  ...props
}) => {
  const isAccessDenied = user?.role !== userRoles.ADMIN;

  return <ProtectedRoute isAccessDenied={isAccessDenied} {...props} />;
};

AdminRoute.propTypes = {
  user: userPropTypes,
};

export default withUserData(AdminRoute);
