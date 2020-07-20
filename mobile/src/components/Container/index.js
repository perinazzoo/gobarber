import React from 'react';

import { Container, Content } from './styles';

export default function ContainerWrapper({ children }) {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
}
