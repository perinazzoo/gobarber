import styled from 'styled-components/native';

import Button from '~/components/Button';

export const LogoImage = styled.Image`
  margin-bottom: 65px;
  align-self: center;
`;

export const CustomText = styled.Text`
  font-family: 'Montserrat-Bold';
  font-size: 18px;
  color: #9583d1;
  margin: 15px 0;
  text-align: center;
`;

export const SignUpButton = styled(Button)`
  align-self: center;
  background-color: #7159c1;
  border-radius: 20px;
  position: absolute;
  width: 100%;
  bottom: 120px;
`;

export const SignInButton = styled(Button)`
  background-color: transparent;
  width: 100%;
  position: absolute;
  width: 100%;
  bottom: 50px;
  align-self: center;
  z-index: 1;
`;

export const ButtonBorder = styled.View`
  border: 2px solid #7159c1;
  border-radius: 20px;
  margin-top: 20px;
  position: absolute;
  width: 100%;
  bottom: 50px;
  align-self: center;
  height: 46px;
`;
