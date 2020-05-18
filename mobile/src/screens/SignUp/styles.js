import styled from 'styled-components/native';
import Input from '~/components/Input';

export const Content = styled.View`
  flex: 1;
  justify-content: center;
`;

export const LogoImage = styled.Image`
  align-self: center;
  margin-bottom: 50px;
  display: ${({ keyboardOpened }) => (keyboardOpened ? 'none' : 'flex')};
`;

export const SubTitle = styled.Text`
  font-family: 'Montserrat-Medium';
  font-size: 16px;
  color: #9583d1;
  margin-bottom: 30px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 20px;
`;

export const BgImage = styled.Image`
  width: 100%;
  z-index: -1;
  position: absolute;
  bottom: 0;
  left: 0;
`;
