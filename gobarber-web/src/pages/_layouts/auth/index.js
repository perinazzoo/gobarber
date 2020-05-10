import React from 'react';
import PropTypes from 'prop-types';

import Moon from '~/components/Bg-moon';

import { Wrapper, Content } from './styles';

export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      <Moon />
      <Content>{children}</Content>
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
