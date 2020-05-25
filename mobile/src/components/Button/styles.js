import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background-color: #7159c1;
  width: 100%;
  height: 46px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const Text = styled.Text`
  font-family: 'Montserrat-Bold';
  font-size: 16px;
  color: ${({ textColor }) => textColor || '#fff'};
`;
