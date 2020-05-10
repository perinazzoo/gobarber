import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';
import Moon from '~/components/Bg-moon';

import { Wrapper, Content } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Moon />
      <Header />
      <Content>{children}</Content>
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
