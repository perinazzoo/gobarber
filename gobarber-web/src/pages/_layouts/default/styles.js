import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(
    0deg,
    rgba(59, 0, 88, 1) 0%,
    rgba(101, 0, 179, 1) 27%,
    rgba(155, 155, 255, 1) 100%
  );

  overflow-y: auto;
  position: relative;
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
`;
