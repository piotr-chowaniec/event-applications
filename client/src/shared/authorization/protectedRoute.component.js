import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import AccessDenied from './accessDenied.component';

const ProtectedRoute = ({
  path,
  exact = false,

  render,
  component: Component,

  isAccessDenied,

  ...routeRest
}) => {
  const routeRender = useCallback(props => {
    if (isAccessDenied) {
      return <AccessDenied />;
    }

    return Component
      ? <Component {...props}/>
      : render(props);
  }, [Component, render, isAccessDenied]);

  return (
    <Route
      exact={exact}
      path={path}
      render={routeRender}
      {...routeRest}
    />
  );
};

ProtectedRoute.propTypes = {
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired,

  render: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  isAccessDenied: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
