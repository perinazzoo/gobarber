import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';

import { store } from '~/store';

export default function RouteWrapper({
  path,
  exact,
  component: Component,
  isPrivate,
}) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/schedule" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      path={path}
      exact={exact}
      render={() => (
        <Layout>
          <Component />
        </Layout>
      )}
    />
  );
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
