import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthConsumer } from './AuthContext';

export const PrivateRoute = ({component: Component, ...rest}) => (
  <AuthConsumer>
    {({user}) => (
      <Route {...rest} render={props => (
        typeof user !== 'undefined'
        ? <Component {...props} />
        : <Redirect to='/login' />
      )} />
    )}
  </AuthConsumer>
);

export const PublicRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => <Component {...props} />} />
);
