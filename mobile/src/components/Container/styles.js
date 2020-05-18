import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Content = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' && 'padding',
})`
  flex: 1;
  justify-content: center;
  padding: 0 35px;
`;
