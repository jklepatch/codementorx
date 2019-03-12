import React from 'react';
import { AuthConsumer } from '../../AuthContext';
import IdeasContainer from './IdeasContainer';

const Ideas = () => (
  <AuthConsumer>
    {({api}) => (
      <IdeasContainer
        api={api}
      />
    )}
  </AuthConsumer>
);

export default Ideas;
