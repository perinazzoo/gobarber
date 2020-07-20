import styled from 'styled-components/native';

import Input from '~/components/Input';

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
