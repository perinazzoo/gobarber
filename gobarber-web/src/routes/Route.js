import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function RouteWrapper({
  path,
  exact,
  component: Component,
  isPrivate,
}) {
  const signed = false;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/schedule" />;
  }

  return <Route path={path} exact={exact} component={Component} />;
}

RouteWrapper.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isPrivate: PropTypes.bool,
};

RouteWrapper.defaultProps = {
  exact: false,
  isPrivate: false,
};
