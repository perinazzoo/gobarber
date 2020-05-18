import styled from 'styled-components/native';
import { Platform, Animated } from 'react-native';

import Input from '~/components/Input';

export const Content = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' && 'padding',
})`
  flex: 1;
  justify-content: center;
`;

export const LogoImage = styled(Animated.Image)`
  display: ${({ keyboardOpened }) => (keyboardOpened ? 'none' : 'flex')};
  margin-bottom: 50px;
  align-self: center;
`;

export const SubTitle = styled.Text`
  font-family: 'Montserrat-Medium';
  font-size: 16px;
  color: #9583d1;
  margin-bottom: 40px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 20px;
`;

export const SignLink = styled.View`
  position: relative;
  bottom: 10%;
  display: ${({ keyboardOpened }) => (keyboardOpened ? 'none' : 'flex')};
`;

export const BgImage = styled.Image`
  width: 100%;
  z-index: -1;
  position: absolute;
  bottom: 0;
  left: 0;
`;
